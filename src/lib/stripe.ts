// ============================================================
// STRIPE MODULE – Checkout Sessions & Webhook Handling
// Unterstützt: Einmalkauf (payment) + Abonnement (subscription)
// ============================================================

import Stripe from 'stripe'
import type { Product } from '../types'

export function createStripeClient(secretKey: string): Stripe {
  return new Stripe(secretKey, {
    apiVersion: '2025-02-24.acacia',
    httpClient: Stripe.createFetchHttpClient()
  })
}

// ─────────────────────────────────────────────────────────
// Checkout Session erstellen
// ─────────────────────────────────────────────────────────
export async function createCheckoutSession(
  stripe: Stripe,
  product: Product,
  customerEmail: string,
  baseUrl: string
): Promise<Stripe.Checkout.Session> {
  const isSubscription = product.pricingType === 'subscription'

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: isSubscription ? 'subscription' : 'payment',
    payment_method_types: ['card'],
    customer_email: customerEmail,
    line_items: [
      {
        price: product.stripePriceId,
        quantity: 1
      }
    ],
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cancel?product=${product.id}`,
    metadata: {
      productId: product.id,
      productName: product.name,
      productType: product.type,
      pricingType: product.pricingType
    },
    // Rechnungsadresse für Steuer/EU-MwSt
    billing_address_collection: 'auto',
    // Automatische Steuerberechnung (Stripe Tax aktivieren im Dashboard)
    // automatic_tax: { enabled: true },
    allow_promotion_codes: true,
    locale: 'de'
  }

  // Bei Abonnements: Probezeit optional aktivieren
  if (isSubscription) {
    (sessionParams as any).subscription_data = {
      metadata: {
        productId: product.id,
        customerEmail
      }
      // trial_period_days: 7  // ← Kommentar entfernen für Testzeitraum
    }
  } else {
    // Einmalkauf: sofortige Lieferung per E-Mail
    (sessionParams as any).payment_intent_data = {
      metadata: {
        productId: product.id,
        customerEmail
      }
    }
  }

  return stripe.checkout.sessions.create(sessionParams)
}

// ─────────────────────────────────────────────────────────
// Checkout Session abrufen (nach Redirect)
// ─────────────────────────────────────────────────────────
export async function retrieveCheckoutSession(
  stripe: Stripe,
  sessionId: string
): Promise<Stripe.Checkout.Session> {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['customer', 'subscription', 'payment_intent']
  })
}

// ─────────────────────────────────────────────────────────
// Webhook-Signatur verifizieren
// ─────────────────────────────────────────────────────────
export async function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<Stripe.Event> {
  const stripe = new Stripe('dummy', {
    apiVersion: '2025-02-24.acacia',
    httpClient: Stripe.createFetchHttpClient()
  })
  return stripe.webhooks.constructEventAsync(payload, signature, secret)
}

// ─────────────────────────────────────────────────────────
// Abonnement kündigen
// ─────────────────────────────────────────────────────────
export async function cancelSubscription(
  stripe: Stripe,
  subscriptionId: string
): Promise<Stripe.Subscription> {
  return stripe.subscriptions.cancel(subscriptionId)
}

// ─────────────────────────────────────────────────────────
// Kundenportal-Session erstellen (Self-Service)
// ─────────────────────────────────────────────────────────
export async function createCustomerPortalSession(
  stripe: Stripe,
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl
  })
}
