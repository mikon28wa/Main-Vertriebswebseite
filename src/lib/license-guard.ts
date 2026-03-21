// ============================================================
// LICENSE-GUARD
// Verantwortung: Lizenzen verwalten und validieren.
// Kennt: License, PricingType (Typen), KV
// Kennt NICHT: Bots, Stripe-API, Sessions, HTTP
// ============================================================

import type { License, PricingType } from '../types'

// ── KV-Key-Schema ──────────────────────────────────────────
// license:{key}              → License JSON
// customer:{email}           → string[] (LicenseKeys)
// session_map:{stripeSession} → licenseKey (24h TTL)
// subscription:{subId}       → licenseKey

// ── Reine Funktion: Lizenzschlüssel generieren ────────────

export function generateLicenseKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return [4, 4, 4, 4]
    .map(len =>
      Array.from({ length: len }, () =>
        chars[Math.floor(Math.random() * chars.length)]
      ).join('')
    )
    .join('-')
}

// ── Reine Funktion: Lizenz-Gültigkeit prüfen ─────────────
// Keine I/O, kein KV → einfach testbar

export function isLicenseValid(license: License): boolean {
  if (license.status !== 'active') return false
  if (license.expiresAt && new Date(license.expiresAt) < new Date()) return false
  return true
}

// ── Lizenz erstellen ──────────────────────────────────────

export async function createLicense(
  kv: KVNamespace,
  params: Omit<License, 'key' | 'totalMessages'>
): Promise<License> {
  const key = generateLicenseKey()
  const license: License = { ...params, key, totalMessages: 0 }

  await kv.put(`license:${key}`, JSON.stringify(license))
  await addKeyToCustomerIndex(kv, params.customerEmail, key)
  await kv.put(`session_map:${params.stripeSessionId}`, key, { expirationTtl: 86400 })

  if (params.stripeSubscriptionId) {
    await kv.put(`subscription:${params.stripeSubscriptionId}`, key)
  }

  return license
}

// ── Lizenz lesen ─────────────────────────────────────────

export async function getLicense(
  kv: KVNamespace,
  licenseKey: string
): Promise<License | null> {
  const raw = await kv.get(`license:${licenseKey}`)
  return raw ? (JSON.parse(raw) as License) : null
}

// ── Lizenz-Status aktualisieren ───────────────────────────

export async function setLicenseStatus(
  kv: KVNamespace,
  licenseKey: string,
  status: License['status']
): Promise<void> {
  const license = await getLicense(kv, licenseKey)
  if (!license) return
  await kv.put(`license:${licenseKey}`, JSON.stringify({ ...license, status }))
}

// ── Nachrichten-Zähler erhöhen ────────────────────────────

export async function incrementMessageCount(
  kv: KVNamespace,
  licenseKey: string
): Promise<void> {
  const license = await getLicense(kv, licenseKey)
  if (!license) return
  await kv.put(`license:${licenseKey}`, JSON.stringify({
    ...license,
    totalMessages: (license.totalMessages ?? 0) + 1,
    lastChatAt: new Date().toISOString()
  }))
}

// ── Lizenz per Stripe-Session finden ─────────────────────

export async function getLicenseByStripeSession(
  kv: KVNamespace,
  stripeSessionId: string
): Promise<License | null> {
  const key = await kv.get(`session_map:${stripeSessionId}`)
  return key ? getLicense(kv, key) : null
}

// ── Lizenz per Abo-ID finden ──────────────────────────────

export async function getLicenseBySubscription(
  kv: KVNamespace,
  subscriptionId: string
): Promise<License | null> {
  const key = await kv.get(`subscription:${subscriptionId}`)
  return key ? getLicense(kv, key) : null
}

// ── Alle Lizenzen eines Kunden ────────────────────────────

export async function getLicensesByEmail(
  kv: KVNamespace,
  email: string
): Promise<License[]> {
  const keys = await getCustomerKeys(kv, email)
  const results = await Promise.all(keys.map(k => getLicense(kv, k)))
  return results.filter((l): l is License => l !== null)
}

// ── Interne Hilfsfunktionen ───────────────────────────────

async function addKeyToCustomerIndex(
  kv: KVNamespace,
  email: string,
  licenseKey: string
): Promise<void> {
  const existing = await getCustomerKeys(kv, email)
  if (!existing.includes(licenseKey)) {
    await kv.put(`customer:${email}`, JSON.stringify([...existing, licenseKey]))
  }
}

async function getCustomerKeys(
  kv: KVNamespace,
  email: string
): Promise<string[]> {
  const raw = await kv.get(`customer:${email}`)
  return raw ? (JSON.parse(raw) as string[]) : []
}
