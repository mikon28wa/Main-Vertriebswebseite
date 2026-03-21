// ============================================================
// PRODUKT-KATALOG – hier trägst du deine 90 Systemprompts /
// Produkte ein. Stripe Price IDs kommen aus deinem Dashboard.
// ============================================================

import type { Product } from '../types'

export const PRODUCTS: Product[] = [
  // ──────────────────────────────────────────────────────────
  // KI-BOTS (Systemprompt-basiert)
  // ──────────────────────────────────────────────────────────
  {
    id: 'bot-sales-coach',
    name: 'Sales Coach Bot',
    description: 'Dein persönlicher KI-Verkaufstrainer. Analysiert Einwände, optimiert Pitch-Texte und gibt dir Live-Coaching für Verkaufsgespräche.',
    type: 'bot',
    pricingType: 'one_time',
    price: 2900,
    currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_sales_coach',
    stripeProductId: 'prod_PLACEHOLDER_sales_coach',
    features: ['Einwandbehandlung', 'Pitch-Optimierung', 'Rollenspiel-Modus', 'Unbegrenzte Nutzung'],
    category: 'Vertrieb',
    badge: 'Bestseller',
    active: true,
    botConfig: {
      systemPrompt: 'Du bist ein erfahrener Verkaufstrainer mit 20 Jahren Erfahrung...',
      model: 'gpt-4o',
      temperature: 0.7,
      welcomeMessage: 'Willkommen! Ich bin dein Sales Coach. Wie kann ich dir heute helfen?',
      iframeAllowed: true
    }
  },
  {
    id: 'bot-content-creator',
    name: 'Content Creator Bot',
    description: 'Erstelle in Sekunden viralen Content für Social Media, Blogs und Newsletter. Mit Markenstimme und SEO-Optimierung.',
    type: 'bot',
    pricingType: 'subscription',
    price: 1900,
    currency: 'eur',
    interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_content_creator',
    stripeProductId: 'prod_PLACEHOLDER_content_creator',
    features: ['Social Media Posts', 'Blog-Artikel', 'Newsletter', 'SEO-optimiert', 'Unbegrenzte Generierungen'],
    category: 'Marketing',
    badge: 'Neu',
    active: true,
    botConfig: {
      systemPrompt: 'Du bist ein kreativer Content Stratege und Texter...',
      model: 'gpt-4o',
      temperature: 0.9,
      welcomeMessage: 'Hallo! Ich erstelle dir sofort packenden Content. Wofür brauchst du Text?',
      iframeAllowed: true
    }
  },
  {
    id: 'bot-customer-service',
    name: 'Kundenservice Bot',
    description: 'Automatisiere deinen Kundenservice. Beantwortet Anfragen professionell, eskaliert bei Bedarf und lernt deine FAQ.',
    type: 'bot',
    pricingType: 'subscription',
    price: 4900,
    currency: 'eur',
    interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_customer_service',
    stripeProductId: 'prod_PLACEHOLDER_customer_service',
    features: ['24/7 Verfügbar', 'FAQ-Training', 'Eskalations-Logik', 'Mehrsprachig', 'CRM-Integration'],
    category: 'Support',
    active: true,
    botConfig: {
      systemPrompt: 'Du bist ein freundlicher und lösungsorientierter Kundenservice-Mitarbeiter...',
      model: 'gpt-4o',
      temperature: 0.5,
      welcomeMessage: 'Guten Tag! Wie kann ich Ihnen helfen?',
      iframeAllowed: true
    }
  },
  {
    id: 'bot-business-analyst',
    name: 'Business Analyst Bot',
    description: 'Analysiert Geschäftsdaten, erstellt Reports und liefert strategische Handlungsempfehlungen.',
    type: 'bot',
    pricingType: 'one_time',
    price: 4900,
    currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_business_analyst',
    stripeProductId: 'prod_PLACEHOLDER_business_analyst',
    features: ['Datenanalyse', 'KPI-Reports', 'SWOT-Analyse', 'Strategieempfehlungen'],
    category: 'Strategie',
    active: true,
    botConfig: {
      systemPrompt: 'Du bist ein erfahrener Business Analyst mit MBA-Abschluss...',
      model: 'gpt-4o',
      temperature: 0.4,
      welcomeMessage: 'Ich analysiere deine Geschäftsdaten. Teile mir deine Zahlen mit!',
      iframeAllowed: true
    }
  },

  // ──────────────────────────────────────────────────────────
  // DIGITALE PRODUKTE (eBooks, Whitepapers)
  // ──────────────────────────────────────────────────────────
  {
    id: 'ebook-ki-marketing',
    name: 'KI-Marketing Masterguide',
    description: 'Das ultimative eBook über KI-gestütztes Marketing. 180 Seiten, praxiserprobte Strategien, 50 Prompt-Templates.',
    type: 'ebook',
    pricingType: 'one_time',
    price: 1900,
    currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_ebook_marketing',
    stripeProductId: 'prod_PLACEHOLDER_ebook_marketing',
    features: ['180 Seiten PDF', '50 Prompt-Templates', 'Sofort-Download', 'Updates inklusive'],
    category: 'Marketing',
    badge: 'Bestseller',
    downloadUrl: 'https://your-storage.com/ebooks/ki-marketing-masterguide.pdf',
    active: true
  },
  {
    id: 'whitepaper-chatbot-roi',
    name: 'Whitepaper: Chatbot ROI 2024',
    description: 'Wissenschaftlich fundiertes Whitepaper über den Return on Investment von KI-Chatbots im Unternehmen.',
    type: 'whitepaper',
    pricingType: 'one_time',
    price: 990,
    currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_whitepaper_roi',
    stripeProductId: 'prod_PLACEHOLDER_whitepaper_roi',
    features: ['45 Seiten PDF', 'Studien & Daten', 'ROI-Rechner', 'Case Studies'],
    category: 'Business',
    downloadUrl: 'https://your-storage.com/whitepapers/chatbot-roi-2024.pdf',
    active: true
  },

  // ──────────────────────────────────────────────────────────
  // VIDEO-SCHULUNGEN
  // ──────────────────────────────────────────────────────────
  {
    id: 'video-prompt-engineering',
    name: 'Prompt Engineering Kurs',
    description: '8-stündiger Videokurs: Lerne KI-Prompts wie ein Pro zu schreiben. Von Grundlagen bis zu fortgeschrittenen Techniken.',
    type: 'video',
    pricingType: 'one_time',
    price: 9900,
    currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_video_prompt',
    stripeProductId: 'prod_PLACEHOLDER_video_prompt',
    features: ['8 Stunden Video', '30 Lektionen', 'Übungsaufgaben', 'Zertifikat', 'Lifetime-Zugriff'],
    category: 'Schulung',
    badge: 'Neu',
    downloadUrl: 'https://your-lms.com/course/prompt-engineering',
    active: true
  },
  {
    id: 'video-chatbot-business',
    name: 'Chatbots für Ihr Business',
    description: 'Praxiskurs: Eigene KI-Chatbots ohne Programmierung erstellen und gewinnbringend einsetzen.',
    type: 'video',
    pricingType: 'subscription',
    price: 2900,
    currency: 'eur',
    interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_video_chatbot',
    stripeProductId: 'prod_PLACEHOLDER_video_chatbot',
    features: ['Neue Videos monatlich', 'Live-Sessions', 'Community-Zugang', 'Vorlagen-Bibliothek'],
    category: 'Schulung',
    downloadUrl: 'https://your-lms.com/course/chatbot-business',
    active: true
  },

  // ──────────────────────────────────────────────────────────
  // BUNDLE-ANGEBOTE
  // ──────────────────────────────────────────────────────────
  {
    id: 'bundle-starter',
    name: 'KI-Starter Bundle',
    description: 'Perfekter Einstieg: Sales Coach Bot + Marketing eBook + Prompt Engineering Grundkurs. 40% günstiger als Einzelkauf.',
    type: 'bundle',
    pricingType: 'one_time',
    price: 14900,
    currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_bundle_starter',
    stripeProductId: 'prod_PLACEHOLDER_bundle_starter',
    features: ['Sales Coach Bot (Lifetime)', 'KI-Marketing eBook', 'Prompt-Grundkurs', 'Persönliches Onboarding'],
    category: 'Bundle',
    badge: '40% Rabatt',
    active: true
  },
]

// Hilfsfunktionen
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id && p.active)
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(p => p.category === category && p.active)
}

export function getProductsByType(type: string): Product[] {
  return PRODUCTS.filter(p => p.type === type && p.active)
}

export function formatPrice(priceInCents: number, currency: string = 'eur'): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(priceInCents / 100)
}
