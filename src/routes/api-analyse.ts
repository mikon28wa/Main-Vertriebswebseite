// ============================================================
// API-ANALYSE-ROUTE
// Verantwortung: Analysen kaufen + Zugang prüfen (Paywall).
// Verbindet: analyse-registry.ts + stripe.ts + license-guard.ts
// Kennt NICHT: ChatEngine, Bot-Registry, Sessions
// ============================================================

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import Stripe from 'stripe'
import type { Bindings } from '../types'
import { getAnalyseById } from '../lib/analyse-registry'
import {
  createStripeClient,
  retrieveCheckoutSession
} from '../lib/stripe'
import {
  createLicense,
  getLicense,
  getLicenseByStripeSession,
  isLicenseValid
} from '../lib/license-guard'
import { resolveKV } from '../lib/kv-mock'

const analyseRoute = new Hono<{ Bindings: Bindings }>()

analyseRoute.use('/*', cors())

// ─────────────────────────────────────────────────────────
// POST /api/analyse/checkout
// Stripe Checkout für eine Analyse starten
// Body: { analyseId: string, email: string }
// ─────────────────────────────────────────────────────────
analyseRoute.post('/checkout', async (c) => {
  const { analyseId, email } = await c.req.json<{ analyseId: string; email: string }>()

  if (!analyseId || !email) {
    return c.json({ error: 'analyseId und email erforderlich' }, 400)
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: 'Ungültige E-Mail-Adresse' }, 400)
  }

  const analyse = getAnalyseById(analyseId)
  if (!analyse) return c.json({ error: 'Analyse nicht gefunden' }, 404)

  try {
    const stripe = createStripeClient(c.env.STRIPE_SECRET_KEY)
    const baseUrl = new URL(c.req.url).origin

    // Analyse-spezifischer Checkout (success_url zeigt auf /analyse-success)
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: analyse.stripePriceId, quantity: 1 }],
      success_url: `${baseUrl}/analyse-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/analyse/${analyse.id}`,
      metadata: {
        productId: analyse.id,
        productName: analyse.title,
        productType: 'analyse',
        pricingType: 'one_time',
        customerEmail: email
      },
      payment_intent_data: {
        metadata: { productId: analyse.id, customerEmail: email }
      },
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      locale: 'de'
    })
    return c.json({ sessionId: session.id, url: session.url })
  } catch (err: any) {
    console.error('Analyse-Checkout error:', err.message)
    return c.json({ error: 'Checkout fehlgeschlagen' }, 500)
  }
})

// ─────────────────────────────────────────────────────────
// GET /api/analyse/access?analyseId=xxx&licenseKey=yyy
// Prüft ob Lizenz für diese Analyse gültig ist
// ─────────────────────────────────────────────────────────
analyseRoute.get('/access', async (c) => {
  const analyseId = c.req.query('analyseId')
  const licenseKey = c.req.query('licenseKey')

  if (!analyseId || !licenseKey) {
    return c.json({ hasAccess: false, error: 'analyseId und licenseKey erforderlich' }, 400)
  }

  const analyse = getAnalyseById(analyseId)
  if (!analyse) return c.json({ hasAccess: false, error: 'Analyse nicht gefunden' }, 404)

  try {
    const kv = resolveKV(c.env.KV)
    const license = await getLicense(kv, licenseKey.toUpperCase())

    if (!license) {
      return c.json({ hasAccess: false, error: 'Lizenzschlüssel nicht gefunden' })
    }

    if (license.productId !== analyseId) {
      return c.json({ hasAccess: false, error: 'Lizenz gilt nicht für diese Analyse' })
    }

    if (!isLicenseValid(license)) {
      return c.json({ hasAccess: false, error: 'Lizenz abgelaufen oder deaktiviert' })
    }

    // Zugang gewähren: Inhalt zurückgeben
    return c.json({
      hasAccess: true,
      contentHtml: analyse.contentHtml,
      title: analyse.title,
      lastUpdated: analyse.lastUpdated
    })
  } catch (err: any) {
    console.error('Analyse access error:', err.message)
    return c.json({ hasAccess: false, error: 'Fehler beim Prüfen der Lizenz' }, 500)
  }
})

// ─────────────────────────────────────────────────────────
// GET /api/analyse/success?session_id=xxx
// Lizenz nach Stripe-Zahlung für Analyse erstellen
// ─────────────────────────────────────────────────────────
analyseRoute.get('/success', async (c) => {
  const stripeSessionId = c.req.query('session_id')
  if (!stripeSessionId) return c.json({ error: 'session_id fehlt' }, 400)

  const kv = resolveKV(c.env.KV)

  // Bereits verarbeitet?
  const existing = await getLicenseByStripeSession(kv, stripeSessionId)
  if (existing) return c.json({ license: sanitizeLicense(existing) })

  try {
    const stripe = createStripeClient(c.env.STRIPE_SECRET_KEY)
    const session = await retrieveCheckoutSession(stripe, stripeSessionId)

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      return c.json({ error: 'Zahlung nicht abgeschlossen' }, 402)
    }

    const analyseId = session.metadata?.productId
    const customerEmail = session.customer_email ?? session.metadata?.customerEmail ?? ''

    if (!analyseId || !customerEmail) {
      return c.json({ error: 'Metadaten unvollständig' }, 400)
    }

    const analyse = getAnalyseById(analyseId)
    if (!analyse) return c.json({ error: 'Analyse nicht gefunden' }, 404)

    const customerId = resolveStripeId(session.customer)

    const license = await createLicense(kv, {
      productId: analyseId,
      customerId,
      customerEmail,
      stripeSessionId,
      pricingType: 'one_time',
      status: 'active',
      createdAt: new Date().toISOString(),
      expiresAt: undefined,
      lastChatAt: undefined
    })

    return c.json({ license: sanitizeLicense(license) })
  } catch (err: any) {
    console.error('Analyse success handler error:', err.message)
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

function sanitizeLicense(l: any) {
  return {
    key: l.key,
    productId: l.productId,
    pricingType: l.pricingType,
    status: l.status,
    createdAt: l.createdAt
  }
}

export default analyseRoute
