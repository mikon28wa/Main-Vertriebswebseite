// ============================================================
// TYPES – zentrale Typdefinitionen für die gesamte Plattform
// ============================================================

export type ProductType = 'bot' | 'ebook' | 'whitepaper' | 'video' | 'bundle' | 'saas'
export type PricingType = 'one_time' | 'subscription'
export type SubscriptionInterval = 'month' | 'year'

export interface Product {
  id: string
  name: string
  description: string
  type: ProductType
  pricingType: PricingType
  price: number          // in Cent (z.B. 2900 = 29,00 €)
  currency: string       // 'eur'
  interval?: SubscriptionInterval
  stripePriceId: string  // Stripe Price ID – aus Dashboard oder .dev.vars
  stripeProductId: string
  features: string[]
  category: string
  thumbnail?: string
  downloadUrl?: string   // nur für digitale Produkte nach Kauf sichtbar
  botConfig?: BotConfig  // nur für Bot-Produkte
  badge?: string         // z.B. "Bestseller", "Neu"
  active: boolean
}

export interface BotConfig {
  systemPrompt: string
  model: string          // z.B. "gpt-4o"
  temperature: number
  welcomeMessage: string
  iframeAllowed: boolean
}

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
  expiresAt?: string     // null = unbegrenzt (Einmalkauf)
}

export interface CheckoutSession {
  productId: string
  customerEmail: string
  successUrl: string
  cancelUrl: string
}

export interface StripeWebhookEvent {
  type: string
  data: {
    object: Record<string, unknown>
  }
}

export type Bindings = {
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
  KV: KVNamespace
}
