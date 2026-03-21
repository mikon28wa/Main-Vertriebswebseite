// ============================================================
// API ROUTES – /api/checkout, /api/webhook, /api/license, etc.
// ============================================================

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { Bindings } from '../types'
import { getProductById } from '../lib/products'
import { createStripeClient, createCheckoutSession, retrieveCheckoutSession, verifyWebhookSignature, cancelSubscription, createCustomerPortalSession } from '../lib/stripe'
import { createLicense, getLicense, getCustomerLicenses, getLicenseBySessionId, updateLicenseStatus, linkSubscriptionToLicense, findLicenseBySubscriptionId, isLicenseValid } from '../lib/licenses'

const api = new Hono<{ Bindings: Bindings }>()

// CORS für Frontend
api.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-License-Key']
}))

// ─────────────────────────────────────────────────────────
// POST /api/checkout – Stripe Checkout Session erstellen
// Body: { productId: string, email: string }
// ─────────────────────────────────────────────────────────
api.post('/checkout', async (c) => {
  try {
    const { productId, email } = await c.req.json<{ productId: string; email: string }>()

    if (!productId || !email) {
      return c.json({ error: 'productId und email sind erforderlich' }, 400)
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return c.json({ error: 'Ungültige E-Mail-Adresse' }, 400)
    }

    const product = getProductById(productId)
    if (!product) {
      return c.json({ error: 'Produkt nicht gefunden' }, 404)
    }

    const stripe = createStripeClient(c.env.STRIPE_SECRET_KEY)
    const baseUrl = new URL(c.req.url).origin

    const session = await createCheckoutSession(stripe, product, email, baseUrl)

    return c.json({
      sessionId: session.id,
      url: session.url
    })
  } catch (err: any) {
    console.error('Checkout error:', err)
    return c.json({ error: err.message || 'Checkout fehlgeschlagen' }, 500)
  }
})

// ─────────────────────────────────────────────────────────
// GET /api/checkout/success?session_id=xxx
// Nach erfolgreicher Zahlung – Lizenz anlegen
// ─────────────────────────────────────────────────────────
api.get('/checkout/success', async (c) => {
  try {
    const sessionId = c.req.query('session_id')
    if (!sessionId) return c.json({ error: 'session_id fehlt' }, 400)

    // Prüfen ob Lizenz schon existiert (Doppelaufruf vermeiden)
    const existingLicense = await getLicenseBySessionId(c.env.KV, sessionId)
    if (existingLicense) {
      return c.json({ license: existingLicense })
    }

    const stripe = createStripeClient(c.env.STRIPE_SECRET_KEY)
    const session = await retrieveCheckoutSession(stripe, sessionId)

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      return c.json({ error: 'Zahlung nicht abgeschlossen' }, 402)
    }

    const productId = session.metadata?.productId
    const customerEmail = session.customer_email || session.metadata?.customerEmail
    if (!productId || !customerEmail) {
      return c.json({ error: 'Metadaten unvollständig' }, 400)
    }

    const product = getProductById(productId)
    if (!product) return c.json({ error: 'Produkt nicht gefunden' }, 404)

    const customerId = typeof session.customer === 'string'
      ? session.customer
      : session.customer?.id || ''

    const subscriptionId = typeof session.subscription === 'string'
      ? session.subscription
      : (session.subscription as any)?.id

    const license = await createLicense(c.env.KV, {
      productId,
      customerId,
      customerEmail,
      stripeSessionId: sessionId,
      stripeSubscriptionId: subscriptionId,
      pricingType: product.pricingType,
      status: 'active',
      expiresAt: undefined
    })

    // Abo-ID für späteres Webhook-Handling verknüpfen
    if (subscriptionId) {
      await linkSubscriptionToLicense(c.env.KV, subscriptionId, license.key)
    }

    return c.json({ license })
  } catch (err: any) {
    console.error('Success handler error:', err)
    return c.json({ error: err.message || 'Fehler beim Erstellen der Lizenz' }, 500)
  }
})

// ─────────────────────────────────────────────────────────
// POST /api/webhook – Stripe Webhook Events
// ─────────────────────────────────────────────────────────
api.post('/webhook', async (c) => {
  const signature = c.req.header('stripe-signature')
  if (!signature) return c.json({ error: 'Keine Signatur' }, 400)

  let event: any
  try {
    const payload = await c.req.text()
    event = await verifyWebhookSignature(payload, signature, c.env.STRIPE_WEBHOOK_SECRET)
  } catch (err: any) {
    console.error('Webhook signature error:', err)
    return c.json({ error: 'Ungültige Webhook-Signatur' }, 400)
  }

  try {
    switch (event.type) {

      // ── Abo erfolgreich bezahlt (monatlich/jährlich) ──
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object
        const subscriptionId = invoice.subscription
        if (!subscriptionId) break
        const license = await findLicenseBySubscriptionId(c.env.KV, subscriptionId)
        if (license) {
          await updateLicenseStatus(c.env.KV, license.key, 'active')
        }
        break
      }

      // ── Zahlung fehlgeschlagen ──
      case 'invoice.payment_failed': {
        const invoice = event.data.object
        const subscriptionId = invoice.subscription
        if (!subscriptionId) break
        const license = await findLicenseBySubscriptionId(c.env.KV, subscriptionId)
        if (license) {
          await updateLicenseStatus(c.env.KV, license.key, 'expired')
        }
        break
      }

      // ── Abo gekündigt ──
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        const license = await findLicenseBySubscriptionId(c.env.KV, subscription.id)
        if (license) {
          await updateLicenseStatus(c.env.KV, license.key, 'cancelled')
        }
        break
      }

      // ── Abo reaktiviert ──
      case 'customer.subscription.updated': {
        const subscription = event.data.object
        const license = await findLicenseBySubscriptionId(c.env.KV, subscription.id)
        if (license) {
          const newStatus = subscription.status === 'active' ? 'active' : 'expired'
          await updateLicenseStatus(c.env.KV, license.key, newStatus)
        }
        break
      }

      default:
        // Unbehandelte Events ignorieren
        break
    }

    return c.json({ received: true })
  } catch (err: any) {
    console.error('Webhook processing error:', err)
    return c.json({ error: 'Webhook-Verarbeitung fehlgeschlagen' }, 500)
  }
})

// ─────────────────────────────────────────────────────────
// GET /api/license/verify?key=XXXX-XXXX-XXXX-XXXX
// Lizenz prüfen + Produktzugriff
// ─────────────────────────────────────────────────────────
api.get('/license/verify', async (c) => {
  const key = c.req.query('key')
  if (!key) return c.json({ valid: false, error: 'Lizenzschlüssel fehlt' }, 400)

  const license = await getLicense(c.env.KV, key)
  if (!license) return c.json({ valid: false, error: 'Lizenz nicht gefunden' }, 404)

  const valid = isLicenseValid(license)
  const product = getProductById(license.productId)

  return c.json({
    valid,
    license: {
      key: license.key,
      productId: license.productId,
      productName: product?.name,
      pricingType: license.pricingType,
      status: license.status,
      createdAt: license.createdAt
    },
    // Bot-Konfiguration nur bei gültiger Lizenz zurückgeben
    ...(valid && product?.botConfig ? {
      botConfig: {
        systemPrompt: product.botConfig.systemPrompt,
        model: product.botConfig.model,
        welcomeMessage: product.botConfig.welcomeMessage
      }
    } : {}),
    // Download-URL nur bei gültiger Lizenz
    ...(valid && product?.downloadUrl ? { downloadUrl: product.downloadUrl } : {})
  })
})

// ─────────────────────────────────────────────────────────
// POST /api/license/lookup – alle Lizenzen per E-Mail
// Body: { email: string }
// ─────────────────────────────────────────────────────────
api.post('/license/lookup', async (c) => {
  const { email } = await c.req.json<{ email: string }>()
  if (!email) return c.json({ error: 'E-Mail fehlt' }, 400)

  const licenses = await getCustomerLicenses(c.env.KV, email)
  const result = licenses.map(l => {
    const product = getProductById(l.productId)
    return {
      key: l.key,
      productId: l.productId,
      productName: product?.name,
      productType: product?.type,
      pricingType: l.pricingType,
      status: l.status,
      createdAt: l.createdAt,
      valid: isLicenseValid(l)
    }
  })

  return c.json({ licenses: result })
})

// ─────────────────────────────────────────────────────────
// POST /api/portal – Stripe Kundenportal öffnen
// Body: { customerId: string }
// ─────────────────────────────────────────────────────────
api.post('/portal', async (c) => {
  try {
    const { customerId } = await c.req.json<{ customerId: string }>()
    if (!customerId) return c.json({ error: 'customerId fehlt' }, 400)

    const stripe = createStripeClient(c.env.STRIPE_SECRET_KEY)
    const baseUrl = new URL(c.req.url).origin
    const portalSession = await createCustomerPortalSession(stripe, customerId, `${baseUrl}/dashboard`)

    return c.json({ url: portalSession.url })
  } catch (err: any) {
    return c.json({ error: err.message }, 500)
  }
})

export default api
