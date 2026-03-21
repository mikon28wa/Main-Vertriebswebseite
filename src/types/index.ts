// ============================================================
// TYPES – Nur Typdefinitionen. Keine Logik, keine Imports.
// Jedes Modul importiert von hier, aber nichts anderes.
// ============================================================

// ── Produkt-Typen ──────────────────────────────────────────
export type ProductType = 'bot' | 'ebook' | 'whitepaper' | 'video' | 'bundle' | 'saas' | 'analyse'
export type PricingType = 'one_time' | 'subscription'
export type SubscriptionInterval = 'month' | 'year'

export type BotCategory =
  | 'Programmierung'
  | 'Recht'
  | 'Kunst & Kreativität'
  | 'Business & Marketing'
  | 'Content & Text'
  | 'Finanzen & Steuern'
  | 'Analyse & Recherche'
  | 'Datenwerkzeuge'
  | 'Gesundheit & Lifestyle'
  | 'Sprache & Übersetzung'
  | 'Bildung'
  | 'KI-Tools'
  | 'Analysen'
  | 'Sonstiges'

// ── Analyse-Eintrag (eigenständiger Typ, kein Bot) ────────
export type AnalyseCategory =
  | 'Marktanalyse'
  | 'Technologie'
  | 'Recht & Compliance'
  | 'Finanzanalyse'
  | 'KI & Automatisierung'
  | 'Business & Strategie'
  | 'Gesellschaft & Trends'
  | 'Sonstiges'

export interface AnalyseEntry {
  id: string
  title: string                // Themenüberschrift
  shortDesc: string            // Kurzbeschreibung Scope
  fullDesc: string             // Ausführliche Beschreibung (Preview hinter Paywall)
  category: AnalyseCategory
  lastUpdated: string          // ISO-Datum  z.B. '2025-01-15'
  pageCount?: number           // Umfang in Seiten
  price: number                // in Cent
  currency: string
  stripePriceId: string
  stripeProductId: string
  badge?: string
  active: boolean
  contentHtml: string          // Vollständiger HTML-Inhalt (nur nach Kauf sichtbar)
  previewHtml?: string         // Öffentlicher Teaser
}

export type AIProvider = 'openai' | 'anthropic' | 'mistral'

// ── Chat-Typen ─────────────────────────────────────────────
export type ChatRole = 'system' | 'user' | 'assistant'

export interface ChatMessage {
  role: ChatRole
  content: string
  timestamp?: number
}

export interface ChatSession {
  sessionId: string
  botId: string
  licenseKey: string
  messages: ChatMessage[]
  createdAt: string
  lastActivity: string
  totalMessages: number
}

// ── Bot-Konfiguration ──────────────────────────────────────
export interface BotConfig {
  systemPrompt: string      // NIEMALS ans Frontend senden
  provider: AIProvider
  model: string
  temperature: number
  maxTokens: number
  welcomeMessage: string
  placeholder: string
  avatarIcon: string        // FontAwesome Klasse, z.B. 'fa-robot'
  avatarColor: string       // Tailwind Gradient, z.B. 'from-indigo-500 to-purple-600'
  streamResponse: boolean
  contextWindow: number     // Anzahl Nachrichten im Kontext (1–20)
}

// ── Produkt ────────────────────────────────────────────────
export interface Product {
  id: string
  name: string
  description: string
  shortDesc: string         // 1 Satz für Karten-Ansicht
  type: ProductType
  pricingType: PricingType
  price: number             // in Cent
  currency: string
  interval?: SubscriptionInterval
  stripePriceId: string
  stripeProductId: string
  features: string[]
  useCases: string[]
  targetAudience: string
  category: BotCategory
  badge?: string
  active: boolean
  botConfig?: BotConfig     // nur für type === 'bot'
  downloadUrl?: string      // nur für ebook/video/whitepaper
}

// ── Lizenz ────────────────────────────────────────────────
export interface License {
  key: string
  productId: string
  customerId: string
  customerEmail: string
  stripeSessionId: string
  stripeSubscriptionId?: string
  pricingType: PricingType
  status: 'active' | 'cancelled' | 'expired'
  createdAt: string
  expiresAt?: string
  totalMessages: number
  lastChatAt?: string
}

// ── API Request/Response ───────────────────────────────────
export interface ChatRequest {
  botId: string
  licenseKey: string
  userMessage: string
  sessionId?: string
}

export interface ChatApiResponse {
  reply: string
  sessionId: string
  usage?: { totalTokens: number }
}

// ── Cloudflare Bindings ────────────────────────────────────
export type Bindings = {
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
  OPENAI_API_KEY: string
  ANTHROPIC_API_KEY: string
  MISTRAL_API_KEY: string
  KV: KVNamespace
}
