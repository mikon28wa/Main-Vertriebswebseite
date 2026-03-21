// ============================================================
// LICENSE MANAGER – Lizenzen in Cloudflare KV speichern
// Format KV-Key: license:{key}
//         Index: customer:{email} → Array von License-Keys
// ============================================================

import type { License, Bindings } from '../types'

export function generateLicenseKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const segments = [4, 4, 4, 4]
  return segments
    .map(len =>
      Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    )
    .join('-')
}

export async function createLicense(
  kv: KVNamespace,
  params: Omit<License, 'key' | 'createdAt'>
): Promise<License> {
  const key = generateLicenseKey()
  const license: License = {
    ...params,
    key,
    createdAt: new Date().toISOString()
  }

  // Lizenz speichern
  await kv.put(`license:${key}`, JSON.stringify(license))

  // Kunden-Index aktualisieren
  const existingKeys = await getCustomerLicenseKeys(kv, params.customerEmail)
  existingKeys.push(key)
  await kv.put(`customer:${params.customerEmail}`, JSON.stringify(existingKeys))

  // Session-ID → Lizenz-Mapping (für Success-Page)
  await kv.put(`session:${params.stripeSessionId}`, key, { expirationTtl: 86400 })

  return license
}

export async function getLicense(kv: KVNamespace, licenseKey: string): Promise<License | null> {
  const data = await kv.get(`license:${licenseKey}`)
  if (!data) return null
  return JSON.parse(data) as License
}

export async function updateLicenseStatus(
  kv: KVNamespace,
  licenseKey: string,
  status: License['status']
): Promise<void> {
  const license = await getLicense(kv, licenseKey)
  if (!license) return
  license.status = status
  await kv.put(`license:${licenseKey}`, JSON.stringify(license))
}

export async function getCustomerLicenseKeys(
  kv: KVNamespace,
  email: string
): Promise<string[]> {
  const data = await kv.get(`customer:${email}`)
  if (!data) return []
  return JSON.parse(data) as string[]
}

export async function getCustomerLicenses(
  kv: KVNamespace,
  email: string
): Promise<License[]> {
  const keys = await getCustomerLicenseKeys(kv, email)
  const licenses: License[] = []
  for (const key of keys) {
    const license = await getLicense(kv, key)
    if (license) licenses.push(license)
  }
  return licenses
}

export async function getLicenseBySessionId(
  kv: KVNamespace,
  sessionId: string
): Promise<License | null> {
  const licenseKey = await kv.get(`session:${sessionId}`)
  if (!licenseKey) return null
  return getLicense(kv, licenseKey)
}

export async function findLicenseBySubscriptionId(
  kv: KVNamespace,
  subscriptionId: string
): Promise<License | null> {
  // KV hat keine direkte Query – wir speichern ein separates Mapping
  const licenseKey = await kv.get(`subscription:${subscriptionId}`)
  if (!licenseKey) return null
  return getLicense(kv, licenseKey)
}

export async function linkSubscriptionToLicense(
  kv: KVNamespace,
  subscriptionId: string,
  licenseKey: string
): Promise<void> {
  await kv.put(`subscription:${subscriptionId}`, licenseKey)
}

export function isLicenseValid(license: License): boolean {
  if (license.status !== 'active') return false
  if (license.expiresAt && new Date(license.expiresAt) < new Date()) return false
  return true
}
