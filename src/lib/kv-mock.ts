// ============================================================
// KV-MOCK
// Verantwortung: In-Memory-KV für lokale Entwicklung.
// Wird NUR genutzt wenn c.env.KV nicht verfügbar ist.
// Kennt NICHT: Stripe, Bots, Lizenzen, HTTP
// ============================================================

// Einfache Map als KV-Ersatz
const store = new Map<string, { value: string; expiresAt?: number }>()

function isExpired(entry: { expiresAt?: number }): boolean {
  if (!entry.expiresAt) return false
  return Date.now() > entry.expiresAt
}

export const kvMock: KVNamespace = {
  async get(key: string): Promise<string | null> {
    const entry = store.get(key)
    if (!entry || isExpired(entry)) return null
    return entry.value
  },

  async put(
    key: string,
    value: string,
    options?: { expirationTtl?: number; expiration?: number }
  ): Promise<void> {
    let expiresAt: number | undefined
    if (options?.expirationTtl) {
      expiresAt = Date.now() + options.expirationTtl * 1000
    } else if (options?.expiration) {
      expiresAt = options.expiration * 1000
    }
    store.set(key, { value, expiresAt })
  },

  async delete(key: string): Promise<void> {
    store.delete(key)
  },

  async list(options?: {
    prefix?: string
    limit?: number
    cursor?: string
  }): Promise<KVNamespaceListResult<unknown, string>> {
    const prefix = options?.prefix ?? ''
    const limit = options?.limit ?? 1000
    const keys = [...store.keys()]
      .filter(k => k.startsWith(prefix) && !isExpired(store.get(k)!))
      .slice(0, limit)
      .map(name => ({ name, metadata: null as unknown }))
    return { keys, list_complete: true, cursor: '', cacheStatus: null }
  },

  // Weitere Methoden die von KVNamespace verlangt werden
  async getWithMetadata<T = unknown>(
    key: string
  ): Promise<KVNamespaceGetWithMetadataResult<string, T>> {
    const value = await (this as KVNamespace).get(key)
    return { value, metadata: null as T }
  }
} as unknown as KVNamespace

// ── Hilfsfunktion für Routes ──────────────────────────────
/** Gibt echtes KV zurück (Produktion) oder Mock (Entwicklung) */
export function resolveKV(kv: KVNamespace | undefined): KVNamespace {
  if (kv) return kv
  console.warn('[DEV] KV nicht verfügbar – nutze In-Memory-Mock')
  return kvMock
}
