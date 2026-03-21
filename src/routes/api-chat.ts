// ============================================================
// API-CHAT-ROUTE
// Verantwortung: Chat-Anfragen orchestrieren.
// Verbindet: bot-registry + chat-engine + session-store + license-guard
// Kennt NICHT: Stripe, Produkt-Katalog
// ============================================================

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { Bindings, ChatMessage } from '../types'
import { botExists, getBotConfigInternal } from '../lib/bot-registry'
import { runChatEngine } from '../lib/chat-engine'
import { createSession, loadSession, appendMessages, sessionBelongsToLicense } from '../lib/session-store'
import { getLicense, isLicenseValid, incrementMessageCount } from '../lib/license-guard'
import { resolveKV } from '../lib/kv-mock'

const chatRoute = new Hono<{ Bindings: Bindings }>()

chatRoute.use('/*', cors())

// ─────────────────────────────────────────────────────────
// POST /api/chat
// Body: { botId, licenseKey, userMessage, sessionId? }
// ─────────────────────────────────────────────────────────
chatRoute.post('/', async (c) => {
  // 1. Eingabe lesen
  const body = await c.req.json<{
    botId: string
    licenseKey: string
    userMessage: string
    sessionId?: string
  }>()

  const { botId, licenseKey, userMessage, sessionId } = body

  // 2. Pflichtfelder prüfen (reine Validierung)
  if (!botId || !licenseKey || !userMessage?.trim()) {
    return c.json({ error: 'botId, licenseKey und userMessage sind Pflichtfelder' }, 400)
  }

  if (userMessage.length > 4000) {
    return c.json({ error: 'Nachricht zu lang (max. 4000 Zeichen)' }, 400)
  }

  // 3. Bot prüfen (nur Existenz, kein Systemprompt raus)
  if (!botExists(botId)) {
    return c.json({ error: 'Bot nicht gefunden' }, 404)
  }

  const kv = resolveKV(c.env.KV)

  // 4. Lizenz prüfen
  const license = await getLicense(kv, licenseKey)
  if (!license) {
    return c.json({ error: 'Lizenz nicht gefunden' }, 403)
  }

  if (!isLicenseValid(license)) {
    return c.json({ error: `Lizenz ist ${license.status}` }, 403)
  }

  // 5. Lizenz muss zum Bot passen
  if (license.productId !== botId) {
    return c.json({ error: 'Lizenz gilt nicht für diesen Bot' }, 403)
  }

  // 6. Session laden oder neu erstellen
  let session = sessionId
    ? await loadSession(kv, sessionId)
    : null

  // Session-Integrität: gehört sie zur Lizenz?
  if (session && !sessionBelongsToLicense(session, licenseKey)) {
    return c.json({ error: 'Session-Zuordnung ungültig' }, 403)
  }

  if (!session) {
    session = await createSession(kv, botId, licenseKey)
  }

  // 7. Bot-Konfiguration intern holen (systemPrompt bleibt server-seitig)
  const botConfig = getBotConfigInternal(botId)
  if (!botConfig) {
    return c.json({ error: 'Bot-Konfiguration nicht verfügbar' }, 500)
  }

  // 8. Neue User-Nachricht zum Verlauf hinzufügen
  const userMsg: ChatMessage = {
    role: 'user',
    content: userMessage.trim(),
    timestamp: Date.now()
  }

  const historyWithNewMessage = [...session.messages, userMsg]

  // 9. KI-Engine aufrufen (kennt keine Lizenzen)
  let engineOutput
  try {
    engineOutput = await runChatEngine(
      { config: botConfig, history: historyWithNewMessage },
      {
        openai: c.env.OPENAI_API_KEY,
        anthropic: c.env.ANTHROPIC_API_KEY,
        mistral: c.env.MISTRAL_API_KEY
      }
    )
  } catch (err: any) {
    console.error('ChatEngine Fehler:', err.message)
    return c.json({ error: 'KI-Antwort fehlgeschlagen. Bitte versuche es erneut.' }, 502)
  }

  // 10. Assistant-Antwort bauen
  const assistantMsg: ChatMessage = {
    role: 'assistant',
    content: engineOutput.reply,
    timestamp: Date.now()
  }

  // 11. Session und Lizenz-Statistiken aktualisieren
  await appendMessages(kv, session.sessionId, [userMsg, assistantMsg])
  await incrementMessageCount(kv, licenseKey)

  // 12. Antwort senden (kein systemPrompt, keine internen Daten)
  return c.json({
    reply: engineOutput.reply,
    sessionId: session.sessionId,
    usage: { totalTokens: engineOutput.totalTokens }
  })
})

// ─────────────────────────────────────────────────────────
// GET /api/chat/history?sessionId=xxx&licenseKey=xxx
// Gibt Chat-Verlauf zurück (ohne systemPrompt)
// ─────────────────────────────────────────────────────────
chatRoute.get('/history', async (c) => {
  const sessionId = c.req.query('sessionId')
  const licenseKey = c.req.query('licenseKey')

  if (!sessionId || !licenseKey) {
    return c.json({ error: 'sessionId und licenseKey erforderlich' }, 400)
  }

  const session = await loadSession(resolveKV(c.env.KV), sessionId)
  if (!session) return c.json({ error: 'Session nicht gefunden' }, 404)

  if (!sessionBelongsToLicense(session, licenseKey)) {
    return c.json({ error: 'Zugriff verweigert' }, 403)
  }

  // Nur user/assistant Nachrichten zurückgeben (kein system)
  const publicMessages = session.messages
    .filter(m => m.role !== 'system')
    .map(m => ({ role: m.role, content: m.content, timestamp: m.timestamp }))

  return c.json({
    sessionId: session.sessionId,
    botId: session.botId,
    messages: publicMessages,
    totalMessages: session.totalMessages
  })
})

export default chatRoute
