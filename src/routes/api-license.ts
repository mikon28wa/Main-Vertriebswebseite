// ============================================================
// API-LICENSE-ROUTE
// Verantwortung: Lizenz-Abfragen und Bot-UI-Konfiguration.
// Verbindet: license-guard + bot-registry + products
// Kennt NICHT: Stripe, ChatEngine, Sessions
// ============================================================

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { Bindings } from '../types'
import { getLicense, getLicensesByEmail, isLicenseValid } from '../lib/license-guard'
import { getBotUIConfig } from '../lib/bot-registry'
import { getProductById } from '../lib/products'
import { resolveKV } from '../lib/kv-mock'

const licenseRoute = new Hono<{ Bindings: Bindings }>()

licenseRoute.use('/*', cors())

// ─────────────────────────────────────────────────────────
// GET /api/license/verify?key=XXXX-XXXX-XXXX-XXXX
// Gibt Lizenz-Status + öffentliche Bot-UI-Config zurück
// KEIN systemPrompt in der Antwort!
// ─────────────────────────────────────────────────────────
licenseRoute.get('/verify', async (c) => {
  const key = c.req.query('key')?.trim()
  if (!key) return c.json({ valid: false, error: 'Lizenzschlüssel fehlt' }, 400)

  const license = await getLicense(resolveKV(c.env.KV), key)
  if (!license) return c.json({ valid: false, error: 'Lizenz nicht gefunden' }, 404)

  const valid = isLicenseValid(license)
  const product = getProductById(license.productId)

  // Bot-UI-Config nur zurückgeben wenn Lizenz gültig (kein systemPrompt!)
  const botUI = valid && product?.type === 'bot'
    ? getBotUIConfig(license.productId)
    : null

  return c.json({
    valid,
    license: {
      key: license.key,
      productId: license.productId,
      productName: product?.name ?? license.productId,
      productType: product?.type,
      pricingType: license.pricingType,
      status: license.status,
      createdAt: license.createdAt,
      totalMessages: license.totalMessages
    },
    botUI,  // UI-Felder: welcomeMessage, placeholder, avatarIcon, etc.
    ...(valid && product?.downloadUrl ? { downloadUrl: product.downloadUrl } : {})
  })
})

// ─────────────────────────────────────────────────────────
// POST /api/license/lookup
// Body: { email: string }
// Alle Lizenzen eines Kunden auflisten
// ─────────────────────────────────────────────────────────
licenseRoute.post('/lookup', async (c) => {
  const { email } = await c.req.json<{ email: string }>()
  if (!email) return c.json({ error: 'E-Mail fehlt' }, 400)

  const licenses = await getLicensesByEmail(resolveKV(c.env.KV), email)

  const result = licenses.map(l => {
    const product = getProductById(l.productId)
    return {
      key: l.key,
      productId: l.productId,
      productName: product?.name ?? l.productId,
      productType: product?.type,
      category: product?.category,
      pricingType: l.pricingType,
      status: l.status,
      valid: isLicenseValid(l),
      createdAt: l.createdAt,
      totalMessages: l.totalMessages,
      lastChatAt: l.lastChatAt
    }
  })

  return c.json({ licenses: result, count: result.length })
})

export default licenseRoute
