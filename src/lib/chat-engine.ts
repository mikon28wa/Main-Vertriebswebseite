// ============================================================
// CHAT-ENGINE
// Verantwortung: KI-API-Aufrufe ausführen.
// Kennt: BotConfig (Felder), ChatMessage
// Kennt NICHT: Lizenzen, Stripe, KV, HTTP-Routing, Produkte
// ============================================================

import type { BotConfig, ChatMessage, AIProvider } from '../types'

// ── Eingabe/Ausgabe dieses Moduls ──────────────────────────

export interface EngineInput {
  config: BotConfig
  history: ChatMessage[]   // Gesamter Verlauf inkl. neuer User-Nachricht
}

export interface EngineOutput {
  reply: string
  totalTokens: number
  provider: AIProvider
}

// ── Haupt-Funktion ─────────────────────────────────────────

export async function runChatEngine(
  input: EngineInput,
  apiKeys: Record<AIProvider, string>
): Promise<EngineOutput> {
  const { config, history } = input

  switch (config.provider) {
    case 'openai':
      return callOpenAI(config, history, apiKeys.openai)
    case 'anthropic':
      return callAnthropic(config, history, apiKeys.anthropic)
    case 'mistral':
      return callMistral(config, history, apiKeys.mistral)
    default:
      return callOpenAI(config, history, apiKeys.openai)
  }
}

// ── OpenAI ────────────────────────────────────────────────

async function callOpenAI(
  config: BotConfig,
  history: ChatMessage[],
  apiKey: string
): Promise<EngineOutput> {
  if (!apiKey) throw new Error('OPENAI_API_KEY nicht konfiguriert')

  // Kontext auf contextWindow begrenzen (letzte N Nachrichten)
  const trimmedHistory = trimHistory(history, config.contextWindow)

  const body = {
    model: config.model,
    temperature: config.temperature,
    max_tokens: config.maxTokens,
    messages: [
      { role: 'system', content: config.systemPrompt },
      ...trimmedHistory.map(m => ({ role: m.role, content: m.content }))
    ]
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`OpenAI Fehler ${res.status}: ${err}`)
  }

  const data = await res.json() as any
  return {
    reply: data.choices[0].message.content.trim(),
    totalTokens: data.usage?.total_tokens ?? 0,
    provider: 'openai'
  }
}

// ── Anthropic (Claude) ────────────────────────────────────

async function callAnthropic(
  config: BotConfig,
  history: ChatMessage[],
  apiKey: string
): Promise<EngineOutput> {
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY nicht konfiguriert')

  const trimmedHistory = trimHistory(history, config.contextWindow)

  // Anthropic trennt system-Prompt vom messages-Array
  const messages = trimmedHistory
    .filter(m => m.role !== 'system')
    .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }))

  const body = {
    model: config.model || 'claude-3-5-sonnet-20241022',
    max_tokens: config.maxTokens,
    temperature: config.temperature,
    system: config.systemPrompt,
    messages
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Anthropic Fehler ${res.status}: ${err}`)
  }

  const data = await res.json() as any
  return {
    reply: data.content[0].text.trim(),
    totalTokens: (data.usage?.input_tokens ?? 0) + (data.usage?.output_tokens ?? 0),
    provider: 'anthropic'
  }
}

// ── Mistral ───────────────────────────────────────────────

async function callMistral(
  config: BotConfig,
  history: ChatMessage[],
  apiKey: string
): Promise<EngineOutput> {
  if (!apiKey) throw new Error('MISTRAL_API_KEY nicht konfiguriert')

  const trimmedHistory = trimHistory(history, config.contextWindow)

  const body = {
    model: config.model || 'mistral-large-latest',
    temperature: config.temperature,
    max_tokens: config.maxTokens,
    messages: [
      { role: 'system', content: config.systemPrompt },
      ...trimmedHistory.map(m => ({ role: m.role, content: m.content }))
    ]
  }

  const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Mistral Fehler ${res.status}: ${err}`)
  }

  const data = await res.json() as any
  return {
    reply: data.choices[0].message.content.trim(),
    totalTokens: data.usage?.total_tokens ?? 0,
    provider: 'mistral'
  }
}

// ── Hilfsfunktion: Kontext begrenzen ──────────────────────
// Reine Funktion ohne Seiteneffekte

function trimHistory(messages: ChatMessage[], maxMessages: number): ChatMessage[] {
  if (messages.length <= maxMessages) return messages
  // Letzte N Nachrichten behalten (keine System-Nachrichten trimmen)
  return messages.slice(-maxMessages)
}
