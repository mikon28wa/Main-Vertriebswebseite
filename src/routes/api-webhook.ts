// ============================================================
// API-WEBHOOK-ROUTE
// Verantwortung: Stripe-Webhook-Events verarbeiten.
// Verbindet: stripe.ts + license-guard
// Kennt NICHT: Bots, ChatEngine, Sessions, Produkt-Katalog
// ============================================================

import { Hono } from 'hono'
import type { Bindings } from '../types'
import { verifyWebhookSignature } from '../lib/stripe'
import {
  getLicenseBySubscription,
  setLicenseStatus
} from '../lib/license-guard'
import { resolveKV } from '../lib/kv-mock'

const webhookRoute = new Hono<{ Bindings: Bindings }>()

// Kein CORS für Webhooks – kommt direkt von Stripe

// ─────────────────────────────────────────────────────────
// POST /api/webhook
// ─────────────────────────────────────────────────────────
webhookRoute.post('/', async (c) => {
  const signature = c.req.header('stripe-signature')
  if (!signature) return c.json({ error: 'Keine Signatur' }, 400)

  let event: any
  try {
    const payload = await c.req.text()
    event = await verifyWebhookSignature(payload, signature, c.env.STRIPE_WEBHOOK_SECRET)
  } catch {
    return c.json({ error: 'Ungültige Webhook-Signatur' }, 400)
  }

  // Jedes Event wird von einer eigenen Funktion verarbeitet
  try {
    await handleWebhookEvent(resolveKV(c.env.KV), event)
    return c.json({ received: true })
  } catch (err: any) {
    console.error('Webhook-Verarbeitung fehlgeschlagen:', err.message)
    return c.json({ error: 'Verarbeitung fehlgeschlagen' }, 500)
  }
})

// ── Event-Handler (pure Dispatch-Logik) ───────────────────

async function handleWebhookEvent(kv: KVNamespace, event: any): Promise<void> {
  switch (event.type) {
    case 'invoice.payment_succeeded':
      await onPaymentSucceeded(kv, event.data.object)
      break
    case 'invoice.payment_failed':
      await onPaymentFailed(kv, event.data.object)
      break
    case 'customer.subscription.deleted':
      await onSubscriptionCancelled(kv, event.data.object)
      break
    case 'customer.subscription.updated':
      await onSubscriptionUpdated(kv, event.data.object)
      break
    default:
      // Unbekannte Events ignorieren (kein Fehler)
      break
  }
}

// ── Einzelne Event-Handler ────────────────────────────────

async function onPaymentSucceeded(kv: KVNamespace, invoice: any): Promise<void> {
  const license = await getLicenseBySubscription(kv, invoice.subscription)
  if (license) await setLicenseStatus(kv, license.key, 'active')
}

async function onPaymentFailed(kv: KVNamespace, invoice: any): Promise<void> {
  const license = await getLicenseBySubscription(kv, invoice.subscription)
  if (license) await setLicenseStatus(kv, license.key, 'expired')
}

async function onSubscriptionCancelled(kv: KVNamespace, subscription: any): Promise<void> {
  const license = await getLicenseBySubscription(kv, subscription.id)
  if (license) await setLicenseStatus(kv, license.key, 'cancelled')
}

async function onSubscriptionUpdated(kv: KVNamespace, subscription: any): Promise<void> {
  const license = await getLicenseBySubscription(kv, subscription.id)
  if (!license) return
  const newStatus = subscription.status === 'active' ? 'active' : 'expired'
  await setLicenseStatus(kv, license.key, newStatus)
}

export default webhookRoute
