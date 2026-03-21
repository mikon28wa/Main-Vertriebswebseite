# KIPromptsPro – Marketplace für KI-Systemprompts

## Projektübersicht
Vollständige E-Commerce-Plattform für den Verkauf von KI-Bots, eBooks, Videokursen, Whitepapers und SaaS-Produkten – mit integriertem Stripe-Zahlungsmodul und Lizenzverwaltung.

## Live-URL (Sandbox)
🔗 https://3000-igymclsj1nhsoe9s9xydr-3844e1b6.sandbox.novita.ai

---

## Implementierte Features

### ✅ Stripe Zahlungsmodul
- **Einmalkäufe** (`payment` mode) mit lebenslangem Zugriff
- **Abonnements** (`subscription` mode) monatlich/jährlich, jederzeit kündbar
- Automatische Checkout-Session-Erstellung via Stripe API
- Webhook-Handler für alle relevanten Stripe-Events
- Stripe Kundenportal (Self-Service für Abo-Verwaltung)

### ✅ Produkttypen
| Typ | Beschreibung |
|-----|-------------|
| `bot` | KI-Bots mit Systemprompt-Konfiguration |
| `ebook` | eBooks als PDF-Download |
| `whitepaper` | B2B-Studien und Analysen |
| `video` | Videokurse (Streaming/LMS-Link) |
| `bundle` | Gebündelte Produktpakete |
| `saas` | SaaS-Produktzugänge (vorbereitet) |

### ✅ Lizenzsystem (Cloudflare KV)
- Automatische Generierung von Lizenzschlüsseln (Format: `XXXX-XXXX-XXXX-XXXX`)
- Speicherung in Cloudflare KV mit E-Mail-Index
- Statusverwaltung: `active` / `cancelled` / `expired`
- Abonnement-ID-Mapping für Webhook-Updates

### ✅ Seiten & Routen
| URL | Beschreibung |
|-----|-------------|
| `/` | Startseite mit Herobereich und Featured Products |
| `/bots` | KI-Bot Bibliothek |
| `/digital` | eBooks, Kurse, Whitepapers |
| `/product/:id` | Produktdetailseite mit Checkout-Formular |
| `/success` | Erfolgsseite nach Zahlung (zeigt Lizenzschlüssel) |
| `/cancel` | Abbruchseite |
| `/dashboard` | Lizenzübersicht & Verifizierung |

### ✅ API-Endpunkte
| Endpunkt | Methode | Beschreibung |
|----------|---------|-------------|
| `/api/checkout` | POST | Stripe Checkout Session erstellen |
| `/api/checkout/success` | GET | Lizenz nach Zahlung generieren |
| `/api/webhook` | POST | Stripe Webhook Handler |
| `/api/license/verify` | GET | Einzelne Lizenz prüfen |
| `/api/license/lookup` | POST | Alle Lizenzen per E-Mail abrufen |
| `/api/portal` | POST | Stripe Kundenportal öffnen |

---

## Dateisstruktur
```
webapp/
├── src/
│   ├── index.tsx          # Hauptapp + alle Frontend-Seiten
│   ├── routes/api.ts      # Alle API-Endpunkte
│   ├── lib/
│   │   ├── stripe.ts      # Stripe-Modul (Checkout, Webhooks, Portal)
│   │   ├── licenses.ts    # Lizenzverwaltung (KV-Storage)
│   │   └── products.ts    # Produktkatalog (hier Produkte eintragen)
│   └── types/index.ts     # TypeScript-Typdefinitionen
├── .dev.vars              # Lokale Secrets (NICHT in Git)
├── wrangler.jsonc         # Cloudflare-Konfiguration
└── ecosystem.config.cjs   # PM2-Konfiguration
```

---

## Setup-Anleitung

### 1. Stripe konfigurieren

```bash
# Stripe Dashboard: https://dashboard.stripe.com
# Test-Keys aus: https://dashboard.stripe.com/test/apikeys
```

Lokale Entwicklung – `.dev.vars` befüllen:
```
STRIPE_SECRET_KEY=sk_test_DEIN_KEY
STRIPE_WEBHOOK_SECRET=whsec_DEIN_SECRET
```

### 2. Produkte in Stripe anlegen
1. Stripe Dashboard → Products → Add Product
2. Price ID (`price_xxx`) kopieren
3. In `src/lib/products.ts` bei `stripePriceId` eintragen

### 3. Cloudflare KV-Namespace erstellen

```bash
npx wrangler kv:namespace create webapp_KV
npx wrangler kv:namespace create webapp_KV --preview
```

KV-IDs in `wrangler.jsonc` eintragen (Kommentar entfernen):
```jsonc
"kv_namespaces": [
  {
    "binding": "KV",
    "id": "DEINE_PRODUCTION_KV_ID",
    "preview_id": "DEINE_PREVIEW_KV_ID"
  }
]
```

### 4. Stripe Webhook einrichten

```bash
# Lokal testen mit Stripe CLI:
stripe listen --forward-to localhost:3000/api/webhook

# Webhook-Secret in .dev.vars eintragen
```

Produktions-Webhook:
- URL: `https://dein-projekt.pages.dev/api/webhook`
- Events: `checkout.session.completed`, `invoice.payment_succeeded`, `invoice.payment_failed`, `customer.subscription.deleted`, `customer.subscription.updated`

### 5. Deployment zu Cloudflare Pages

```bash
npm run build
npx wrangler pages project create webapp --production-branch main
npx wrangler pages deploy dist --project-name webapp

# Secrets setzen:
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name webapp
npx wrangler pages secret put STRIPE_WEBHOOK_SECRET --project-name webapp
```

---

## Produkte hinzufügen

Neue Produkte in `src/lib/products.ts` im Array `PRODUCTS` eintragen:

```typescript
{
  id: 'bot-mein-neuer-bot',          // Eindeutige ID
  name: 'Mein neuer Bot',
  description: 'Beschreibung...',
  type: 'bot',                        // bot|ebook|whitepaper|video|bundle|saas
  pricingType: 'one_time',            // one_time | subscription
  price: 2900,                        // Preis in Cent (29,00 €)
  currency: 'eur',
  stripePriceId: 'price_xxx',        // Aus Stripe Dashboard
  stripeProductId: 'prod_xxx',
  features: ['Feature 1', 'Feature 2'],
  category: 'Kategoriename',
  active: true,
  botConfig: {                        // Nur für type: 'bot'
    systemPrompt: 'Dein Systemprompt...',
    model: 'gpt-4o',
    temperature: 0.7,
    welcomeMessage: 'Hallo!',
    iframeAllowed: true
  }
}
```

---

## Tech Stack
- **Framework**: Hono 4 (Cloudflare Workers)
- **Build**: Vite 6
- **Deployment**: Cloudflare Pages
- **Zahlung**: Stripe (Checkout Sessions + Webhooks)
- **Storage**: Cloudflare KV (Lizenzen)
- **Frontend**: Tailwind CSS (CDN) + FontAwesome

## Status: ✅ Bereit für Deployment
