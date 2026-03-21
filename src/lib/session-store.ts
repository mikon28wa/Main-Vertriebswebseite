// ============================================================
// SESSION-STORE
// Verantwortung: Chat-Sessions in KV lesen und schreiben.
// Kennt: ChatSession, ChatMessage (Typen)
// Kennt NICHT: Bots, Lizenzen, Stripe, HTTP
// ============================================================

import type { ChatSession, ChatMessage } from '../types'

// ── KV-Key-Schema ──────────────────────────────────────────
// session:{sessionId}  → ChatSession JSON
// Kein globaler State – alle Funktionen bekommen KV als Parameter

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30  // 30 Tage

// ── Reine Hilfsfunktion: neue Session-ID ──────────────────

export function generateSessionId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).slice(2, 8)
  return `sess_${timestamp}_${random}`
}

// ── Session erstellen ─────────────────────────────────────

export async function createSession(
  kv: KVNamespace,
  botId: string,
  licenseKey: string
): Promise<ChatSession> {
  const session: ChatSession = {
    sessionId: generateSessionId(),
    botId,
    licenseKey,
    messages: [],
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    totalMessages: 0
  }
  await kv.put(
    `session:${session.sessionId}`,
    JSON.stringify(session),
    { expirationTtl: SESSION_TTL_SECONDS }
  )
  return session
}

// ── Session laden ─────────────────────────────────────────

export async function loadSession(
  kv: KVNamespace,
  sessionId: string
): Promise<ChatSession | null> {
  const raw = await kv.get(`session:${sessionId}`)
  if (!raw) return null
  return JSON.parse(raw) as ChatSession
}

// ── Nachricht anhängen und Session speichern ──────────────

export async function appendMessages(
  kv: KVNamespace,
  sessionId: string,
  newMessages: ChatMessage[]
): Promise<void> {
  const session = await loadSession(kv, sessionId)
  if (!session) throw new Error(`Session ${sessionId} nicht gefunden`)

  session.messages.push(...newMessages)
  session.totalMessages = session.messages.filter(m => m.role === 'user').length
  session.lastActivity = new Date().toISOString()

  await kv.put(
    `session:${sessionId}`,
    JSON.stringify(session),
    { expirationTtl: SESSION_TTL_SECONDS }
  )
}

// ── Session löschen ───────────────────────────────────────

export async function deleteSession(
  kv: KVNamespace,
  sessionId: string
): Promise<void> {
  await kv.delete(`session:${sessionId}`)
}

// ── Session-Zugehörigkeit prüfen ──────────────────────────
// Sicherstellen dass die Session zur Lizenz gehört

export function sessionBelongsToLicense(
  session: ChatSession,
  licenseKey: string
): boolean {
  return session.licenseKey === licenseKey
}
