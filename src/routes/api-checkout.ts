// ============================================================
// API-CHECKOUT-ROUTE
// Verantwortung: Stripe Checkout Sessions erstellen.
// Verbindet: stripe.ts + license-guard.ts + products.ts
// Kennt NICHT: ChatEngine, Sessions, Bot-Registry
// ============================================================

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { Bindings } from '../types'
import { getProductById } from '../lib/products'
import {
  createStripeClient,
  createCheckoutSession,
  retrieveCheckoutSession
} from '../lib/stripe'
import {
  createLicense,
  getLicenseByStripeSession
} from '../lib/license-guard'
import { resolveKV } from '../lib/kv-mock'

const checkoutRoute = new Hono<{ Bindings: Bindings }>()

checkoutRoute.use('/*', cors())

// ─────────────────────────────────────────────────────────
// POST /api/checkout
// Body: { productId: string, email: string }
// ─────────────────────────────────────────────────────────
checkoutRoute.post('/', async (c) => {
  const { productId, email } = await c.req.json<{ productId: string; email: string }>()

  if (!productId || !email) {
    return c.json({ error: 'productId und email erforderlich' }, 400)
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: 'Ungültige E-Mail-Adresse' }, 400)
  }

  const product = getProductById(productId)
  if (!product) return c.json({ error: 'Produkt nicht gefunden' }, 404)

  try {
    const stripe = createStripeClient(c.env.STRIPE_SECRET_KEY)
    const baseUrl = new URL(c.req.url).origin
    const session = await createCheckoutSession(stripe, product, email, baseUrl)
    return c.json({ sessionId: session.id, url: session.url })
  } catch (err: any) {
    console.error('Checkout error:', err.message)
    return c.json({ error: 'Checkout fehlgeschlagen' }, 500)
  }
})

// ─────────────────────────────────────────────────────────
// GET /api/checkout/success?session_id=xxx
// Lizenz nach Stripe-Zahlung erstellen
// ─────────────────────────────────────────────────────────
checkoutRoute.get('/success', async (c) => {
  const stripeSessionId = c.req.query('session_id')
  if (!stripeSessionId) return c.json({ error: 'session_id fehlt' }, 400)

  // Bereits verarbeitet?
  const existing = await getLicenseByStripeSession(resolveKV(c.env.KV), stripeSessionId)
  if (existing) return c.json({ license: sanitizeLicense(existing) })

  try {
    const stripe = createStripeClient(c.env.STRIPE_SECRET_KEY)
    const session = await retrieveCheckoutSession(stripe, stripeSessionId)

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      return c.json({ error: 'Zahlung nicht abgeschlossen' }, 402)
    }

    const productId = session.metadata?.productId
    const customerEmail = session.customer_email ?? session.metadata?.customerEmail ?? ''

    if (!productId || !customerEmail) {
      return c.json({ error: 'Metadaten unvollständig' }, 400)
    }

    const product = getProductById(productId)
    if (!product) return c.json({ error: 'Produkt nicht gefunden' }, 404)

    const customerId = resolveStripeId(session.customer)
    const subscriptionId = resolveStripeId(session.subscription)

    const license = await createLicense(resolveKV(c.env.KV), {
      productId,
      customerId,
      customerEmail,
      stripeSessionId,
      stripeSubscriptionId: subscriptionId,
      pricingType: product.pricingType,
      status: 'active',
      createdAt: new Date().toISOString(),
      expiresAt: undefined,
      lastChatAt: undefined
    })

    return c.json({
      license: sanitizeLicense(license),
      ...(product.downloadUrl ? { downloadUrl: product.downloadUrl } : {})
    })
  } catch (err: any) {
    console.error('Success handler error:', err.message)
    return c.json({ error: 'Lizenz-Erstellung fehlgeschlagen' }, 500)
  }
})

// ── Hilfsfunktionen ───────────────────────────────────────

function resolveStripeId(obj: unknown): string {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  if (typeof obj === 'object' && obj !== null && 'id' in obj) return (obj as any).id
  return ''
}

/** Nur öffentliche Felder zurückgeben */
function sanitizeLicense(l: any) {
  return {
    key: l.key,
    productId: l.productId,
    pricingType: l.pricingType,
    status: l.status,
    createdAt: l.createdAt
  }
}

export default checkoutRoute
