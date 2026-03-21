// ============================================================
// PRODUKT-KATALOG
// Verantwortung: Produktdaten lesen, keine Logik außer Lookup.
// Kennt: Product-Typ
// Kennt NICHT: Stripe-API, Lizenzen, ChatEngine, KV
// ============================================================

import type { Product } from '../types'

export const PRODUCTS: Product[] = [

  // ════════════════════════════════════════════════════════
  // PROGRAMMIERUNG & ENTWICKLUNG
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-amapro',
    name: 'AmaProAssistent',
    shortDesc: 'App-Architektur-Berater – von der Idee zum Tech-Stack.',
    description: 'Analysiert App-Ideen und empfiehlt den optimalen Tech-Stack (Web, Mobile, Desktop). Erstellt saubere Projektstrukturen bevor Code geschrieben wird.',
    type: 'bot', pricingType: 'one_time', price: 2900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_amapro', stripeProductId: 'prod_PLACEHOLDER_amapro',
    features: ['Tech-Stack Analyse', 'Projektstruktur', 'MVP-Planung', 'Framework-Empfehlung'],
    useCases: ['Web-App Konzept validieren', 'Richtige Programmiersprache wählen', 'MVP-Architektur planen', 'Technologie-Entscheidungen treffen'],
    targetAudience: 'Gründer, Nicht-Entwickler, Junior-Entwickler',
    category: 'Programmierung', badge: 'Neu', active: true
  },
  {
    id: 'bot-codementor',
    name: 'Codementor',
    shortDesc: 'Programmieren lernen für absolute Anfänger – Schritt für Schritt.',
    description: 'Führt Anfänger ohne Vorkenntnisse durch JavaScript (React/Node.js), Python (Flask) oder HTML/CSS. Erklärt jeden Schritt mit Analogien und konkreten Beispielen.',
    type: 'bot', pricingType: 'subscription', price: 1900, currency: 'eur', interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_codementor', stripeProductId: 'prod_PLACEHOLDER_codementor',
    features: ['Anfänger-gerecht', 'JavaScript & Python', 'Vollständige Projekte', 'Debugging-Hilfe', 'Unbegrenzte Sessions'],
    useCases: ['Erste Website erstellen', 'Python-Script schreiben', 'React-App bauen', 'Fehler verstehen und beheben'],
    targetAudience: 'Absolute Programmier-Anfänger, Quereinsteiger',
    category: 'Programmierung', active: true
  },
  {
    id: 'bot-scriptcraft',
    name: 'ScriptCraft',
    shortDesc: 'Python-Skript-Generator für die Poe-API-Plattform.',
    description: 'Erstellt sofort einsatzbereite Python-Skripte für Poe-Automatisierungen: Multi-Bot-Orchestrierung, parallele Ausführung, komplexe Chat-Workflows.',
    type: 'bot', pricingType: 'one_time', price: 3900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_scriptcraft', stripeProductId: 'prod_PLACEHOLDER_scriptcraft',
    features: ['Vollständiger Python-Code', 'Multi-Bot-Orchestrierung', 'Poe-API Integration', 'Konfigurationsanleitungen'],
    useCases: ['Mehrere KI-Bots vergleichen', 'Automatisierte Content-Pipelines', 'Chat-Workflows automatisieren', 'Bot-Entwicklung auf Poe'],
    targetAudience: 'Entwickler, KI-Enthusiasten, Automatisierer',
    category: 'Programmierung', active: true
  },
  {
    id: 'bot-babelio',
    name: 'Babelio',
    shortDesc: 'Bubble.io Experte für No-Code App-Entwicklung.',
    description: 'Speziell für Bubble.io optimiertes Tool. Hilft bei Datenbankdesign, Workflow-Logik, Plugins, API-Verbindungen und responsiven Layouts.',
    type: 'bot', pricingType: 'one_time', price: 2900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_babelio', stripeProductId: 'prod_PLACEHOLDER_babelio',
    features: ['Bubble.io Expertise', 'Datenbankdesign', 'Workflow-Logik', 'API-Connector', 'Plugin-Auswahl'],
    useCases: ['Bubble-App aufbauen', 'Datenbank strukturieren', 'Workflows debuggen', 'API-Verbindungen einrichten'],
    targetAudience: 'No-Code Entwickler, Gründer ohne Tech-Kenntnisse',
    category: 'Programmierung', active: true
  },

  // ════════════════════════════════════════════════════════
  // RECHT & COMPLIANCE
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-jobrechtdach',
    name: 'JobRechtD.A.Ch.',
    shortDesc: 'Kostenloser Erstcheck für Arbeitsrecht in DACH.',
    description: 'KI-gestützter Erstcheck für arbeitsrechtliche Fragen in Deutschland, Österreich und Schweiz. Aktuelle Rechtslage 2025, Musterschreiben, kostenlose Anlaufstellen.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_jobrecht', stripeProductId: 'prod_PLACEHOLDER_jobrecht',
    features: ['DACH Arbeitsrecht 2025', 'Drei-Perspektiven-Analyse', 'Musterschreiben', 'Fristhinweise', 'Quellenangaben'],
    useCases: ['Kündigung prüfen', 'Abmahnung verstehen', 'Fristen kennen', 'Lohnfragen klären', 'Elternzeit planen'],
    targetAudience: 'Arbeitnehmer in Deutschland, Österreich, Schweiz',
    category: 'Recht', badge: 'Bestseller', active: true
  },
  {
    id: 'bot-arbeitgeberrechtdach',
    name: 'ArbeitgeberRechtDACH',
    shortDesc: 'Arbeitsrecht für HR, Führungskräfte und Unternehmen.',
    description: 'Spezialisierter KI-Assistent für Arbeitgeber in der DACH-Region. Compliance-Checks, Mustertexte, aktuelle Rechtslage 2025, Risikobewertung.',
    type: 'bot', pricingType: 'subscription', price: 4900, currency: 'eur', interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_agrecht', stripeProductId: 'prod_PLACEHOLDER_agrecht',
    features: ['Compliance-Checks', 'Mustertexte & Checklisten', 'Aktuelle Rechtslage 2025', 'Risikobewertung', 'Betriebsratsrecht'],
    useCases: ['Kündigung rechtssicher gestalten', 'Arbeitsverträge prüfen', 'HR-Compliance sicherstellen', 'Homeoffice-Regeln aufsetzen'],
    targetAudience: 'HR-Abteilungen, Geschäftsführer, KMU',
    category: 'Recht', active: true
  },
  {
    id: 'bot-strafrechtgpt',
    name: 'StrafrechtGPT',
    shortDesc: 'Strafrecht DACH – fundiert, quellenbasiert, dreistufig.',
    description: 'KI-Assistent für Strafverfahren, Verteidigung und Strafen in Deutschland, Österreich und Schweiz. Dreistufige Analyse: Recherche, Experteneinschätzung, Fazit.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_strafrecht', stripeProductId: 'prod_PLACEHOLDER_strafrecht',
    features: ['StGB & StPO Kenntnisse', 'Dreistufige Analyse', 'BGH-Urteile zitiert', 'DACH-Region', 'Verfahrensabläufe'],
    useCases: ['Anzeige erstatten', 'Strafanzeige verstehen', 'Verteidigungsoptionen', 'Verfahrensschritte kennen'],
    targetAudience: 'Betroffene, Privatpersonen, Rechtssuchende',
    category: 'Recht', active: true
  },
  {
    id: 'bot-sozialrechtgpt',
    name: 'SozialrechtGPT',
    shortDesc: 'Sozialrecht DACH – Bürgergeld, Rente, Krankenversicherung.',
    description: 'KI-Assistent für alle Fragen des Sozialrechts in der DACH-Region. SGB I–XII, Bürgergeld, Rentenrecht, Pflegeversicherung – dreistufige Analyse.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_sozialrecht', stripeProductId: 'prod_PLACEHOLDER_sozialrecht',
    features: ['SGB I-XII', 'Bürgergeld & ALG', 'Rentenrecht', 'Pflegeversicherung', 'Widerspruchsvorlagen'],
    useCases: ['Bürgergeld berechnen', 'Rentenanspruch prüfen', 'Sozialleistungen beantragen', 'Widerspruch einlegen'],
    targetAudience: 'Sozialleistungsempfänger, Pflegebedürftige, Rentner',
    category: 'Recht', active: true
  },
  {
    id: 'bot-familienrechtgpt',
    name: 'FamilienrechtGPT',
    shortDesc: 'Familienrecht – Scheidung, Unterhalt, Sorgerecht.',
    description: 'Beratung zu Scheidung, Unterhalt, Sorgerecht, Erbrecht in der DACH-Region. Dreistufige Analyse mit Muster-Texten für Anträge.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_familienrecht', stripeProductId: 'prod_PLACEHOLDER_familienrecht',
    features: ['Scheidungsrecht', 'Unterhalt berechnen', 'Sorgerecht', 'Erbrecht Grundlagen', 'Musteranträge'],
    useCases: ['Scheidung vorbereiten', 'Unterhalt berechnen', 'Sorgerecht klären', 'Ehevertrag prüfen'],
    targetAudience: 'Getrennte Paare, Familien in Konfliktsituationen',
    category: 'Recht', active: true
  },
  {
    id: 'bot-contractguard',
    name: 'ContractGuard',
    shortDesc: 'Verträge erstellen, prüfen und optimieren.',
    description: 'Digitaler Assistent für rechtskonforme Verträge: Kaufvertrag, Dienstleistungsvertrag, Arbeitsvertrag, NDA. Erstellung und Prüfung auf Risiken.',
    type: 'bot', pricingType: 'one_time', price: 3900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_contractguard', stripeProductId: 'prod_PLACEHOLDER_contractguard',
    features: ['Vertragserstellung', 'Risikoprüfung', 'NDA & Kooperationsverträge', 'AGB-Analyse', 'Einfache Sprache'],
    useCases: ['Freelancer-Vertrag erstellen', 'AGB prüfen lassen', 'NDA aufsetzen', 'Mietvertrag prüfen'],
    targetAudience: 'Selbstständige, KMU, Privatpersonen',
    category: 'Recht', badge: 'Bestseller', active: true
  },
  {
    id: 'bot-digiEU',
    name: 'DigiEU',
    shortDesc: 'EU-Produktvorschriften & Compliance-Dokumentation.',
    description: 'Analyse EU-Produktvorschriften (CE, RoHS, REACH, MDR), erstellt Konformitätserklärungen, Technische Dokumentation und Compliance-Berichte.',
    type: 'bot', pricingType: 'subscription', price: 6900, currency: 'eur', interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_digiEU', stripeProductId: 'prod_PLACEHOLDER_digiEU',
    features: ['EU-Richtlinien-Analyse', 'Konformitätserklärungen', 'Technische Dokumentation', 'CE-Kennzeichnung', 'Audit-vorbereitung'],
    useCases: ['CE-Kennzeichnung prüfen', 'Technische Doku erstellen', 'Compliance-Audit vorbereiten', 'RoHS-Konformität sicherstellen'],
    targetAudience: 'Hersteller, Importeure, Compliance-Manager',
    category: 'Recht', active: true
  },
  {
    id: 'bot-verkehrsrechtgpt',
    name: 'VerkehrsrechtGPT',
    shortDesc: 'Verkehrsrecht DACH – Bußgelder, Unfälle, Punkte.',
    description: 'Beratung zu StVO, Bußgeldkatalog, Fahrverboten, Punkte Flensburg, Unfallrecht und Kfz-Versicherung in der DACH-Region.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_verkehrsrecht', stripeProductId: 'prod_PLACEHOLDER_verkehrsrecht',
    features: ['Bußgeldkatalog 2025', 'Einspruch-Vorlagen', 'Unfallrecht', 'Versicherungsrecht', 'Punkte-System'],
    useCases: ['Bußgeldbescheid prüfen', 'Einspruch einlegen', 'Unfallprotokoll verstehen', 'Punkte in Flensburg'],
    targetAudience: 'Autofahrer, Berufskraftfahrer',
    category: 'Recht', active: true
  },
  {
    id: 'bot-verbraucherschutzgpt',
    name: 'VerbraucherschutzGPT',
    shortDesc: 'Verbraucherrechte – Widerruf, Gewährleistung, AGB.',
    description: 'Beratung zu Widerrufsrecht, Gewährleistung, AGB-Kontrolle, Online-Shopping-Rechte und Reklamationen in der DACH-Region.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_verbraucherschutz', stripeProductId: 'prod_PLACEHOLDER_verbraucherschutz',
    features: ['Widerrufsrecht 14 Tage', 'Gewährleistung vs. Garantie', 'AGB-Prüfung', 'Reklamations-Vorlagen', 'Abofallen'],
    useCases: ['Online-Kauf widerrufen', 'Mangel reklamieren', 'AGB prüfen', 'Abo kündigen'],
    targetAudience: 'Verbraucher, Online-Käufer',
    category: 'Recht', active: true
  },
  {
    id: 'bot-mietimmorechtgpt',
    name: 'MietImmorechtGPT',
    shortDesc: 'Miet- und Immobilienrecht – Kündigung, Nebenkosten, Mängel.',
    description: 'Beratung zu Mietrecht, Kündigung, Mieterhöhung, Nebenkostenabrechnung, WEG-Recht und Eigenbedarfskündigung in der DACH-Region.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_mietrecht', stripeProductId: 'prod_PLACEHOLDER_mietrecht',
    features: ['Mietrecht 2025', 'Nebenkostenprüfung', 'Mietminderung berechnen', 'Musterbriefe', 'WEG-Recht'],
    useCases: ['Kündigung prüfen', 'Nebenkosten abrechnen', 'Mietminderung berechnen', 'Mängelanzeige schreiben'],
    targetAudience: 'Mieter, Vermieter, WEG-Eigentümer',
    category: 'Recht', active: true
  },

  // ════════════════════════════════════════════════════════
  // KUNST & KREATIVITÄT
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-neonnightgraffiti',
    name: 'NeonNightGraffiti',
    shortDesc: 'Leuchtende Neon-Graffiti-Kunst für KI-Bildgeneratoren.',
    description: 'Erstellt detaillierte Bildprompts für Midjourney/DALL-E mit Fokus auf Neonfarben, Schwarzlichteffekte und urbane Nacht-Settings.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_neon', stripeProductId: 'prod_PLACEHOLDER_neon',
    features: ['Midjourney-Prompts', 'DALL-E optimiert', 'Farbpaletten-Analyse', 'Stil-Variationen', 'Cyberpunk-Vibes'],
    useCases: ['Neon-Kunstwerk erstellen', 'Poster-Design generieren', 'Social Media Grafiken', 'NFT-Artwork'],
    targetAudience: 'Digitalkünstler, Designer, NFT-Creator',
    category: 'Kunst & Kreativität', active: true
  },
  {
    id: 'bot-3dmuralmaster',
    name: '3DMuralMaster',
    shortDesc: '3D-Wandbilder und hyperrealistische optische Täuschungen.',
    description: 'Planung und Prompt-Erstellung für 3D-Wandmalereien. Trompe-l\'œil, Wanddurchbrüche, schwebende Objekte, anamorphotische Perspektiven.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_3dmural', stripeProductId: 'prod_PLACEHOLDER_3dmural',
    features: ['3D-Bildprompts', 'Perspektiv-Berechnung', 'Materialempfehlungen', 'Physische Umsetzungshinweise'],
    useCases: ['Wandmalerei planen', 'Optische Täuschungen erstellen', 'Büroräume gestalten', 'Event-Dekoration'],
    targetAudience: 'Wandmaler, Innenarchitekten, Eventdesigner',
    category: 'Kunst & Kreativität', active: true
  },
  {
    id: 'bot-surrealatmaker',
    name: 'SurrealArtMaker',
    shortDesc: 'Surrealistische Kunstwerke à la Dalí und Magritte.',
    description: 'Erschafft surrealistische Bildprompts die Träume und Realität verschmelzen. Stil von Dalí, Magritte, Max Ernst – mit Symbolanalyse.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_surreal', stripeProductId: 'prod_PLACEHOLDER_surreal',
    features: ['Surrealismus-Stile', 'Symbolanalyse', 'Traumwelt-Prompts', '3 Stil-Variationen'],
    useCases: ['Kunstdruck erstellen', 'Album-Cover generieren', 'Buchcover gestalten', 'Traumbilder visualisieren'],
    targetAudience: 'Künstler, Designer, kreative Querdenker',
    category: 'Kunst & Kreativität', active: true
  },
  {
    id: 'bot-popArtcreator',
    name: 'PopArtCreator',
    shortDesc: 'Pop-Art Generator im Stil von Warhol und Lichtenstein.',
    description: 'Erstellt lebendige Pop-Art-Bildprompts mit Warhol-Siebdruck-Optik, Lichtenstein-Benday-Punkten, Farbpaletten und Kompositionsvorschlägen.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_popart', stripeProductId: 'prod_PLACEHOLDER_popart',
    features: ['Warhol-Stil', 'Lichtenstein-Stil', 'Farbpaletten (Hex)', 'Historischer Kontext', 'Kompositionsvorschlag'],
    useCases: ['Porträt im Pop-Art-Stil', 'Produkt-Artwork', 'Merchandise-Design', 'Social-Media-Content'],
    targetAudience: 'Grafiker, Künstler, Social-Media-Manager',
    category: 'Kunst & Kreativität', active: true
  },
  {
    id: 'bot-streetartcreator',
    name: 'StreetArtCreator',
    shortDesc: 'Street-Art und Graffiti – von Wildstyle bis Banksy-Stencil.',
    description: 'Einzigartige Street-Art und Graffiti-Prompts für KI-Generatoren. Wildstyle, Stencil, Mural, Wheatpaste – mit Farb- und Technik-Beschreibung.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_streetart', stripeProductId: 'prod_PLACEHOLDER_streetart',
    features: ['4 Stil-Varianten', 'Spray-Technik Beschreibung', 'Ort & Kontext-Vorschläge', 'Soziale Botschaften'],
    useCases: ['Mural-Konzept entwickeln', 'Street-Art-Poster', 'Tshirt-Design', 'Urbanstyle-Content'],
    targetAudience: 'Streetart-Künstler, Grafiker, Urban-Art-Fans',
    category: 'Kunst & Kreativität', active: true
  },
  {
    id: 'bot-abstractartgenie',
    name: 'AbstractArtGenie',
    shortDesc: 'Abstrakte Kunst nach deiner Stimmung und Vision.',
    description: 'Erschafft abstrakte Bildprompts (Kandinsky, Mondrian, Pollock, Rothko) basierend auf Emotionen, Farben, Formen und Texturen.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_abstract', stripeProductId: 'prod_PLACEHOLDER_abstract',
    features: ['5 Abstraktionsstile', 'Farbpalette mit Bedeutungen', 'Kompositionsanalyse', 'Stimmungs-basiert'],
    useCases: ['Büro-Kunstdruck', 'Meditations-Artwork', 'Buchcover', 'Emotionales Kunstprojekt'],
    targetAudience: 'Kunstliebhaber, Innenarchitekten, kreative Menschen',
    category: 'Kunst & Kreativität', active: true
  },
  {
    id: 'bot-monoabstraktor',
    name: 'MonoAbstraktor',
    shortDesc: 'Monochrome Abstraktion – Tiefe durch eine einzige Farbe.',
    description: 'Spezialist für monochrome abstrakte Kunst. Rothko-Farbfelder, Reinhardt-Schwarz, Mondrian-Purismus – mit iterativen Änderungsvorschlägen.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_mono', stripeProductId: 'prod_PLACEHOLDER_mono',
    features: ['Monochrome Stile', '3 Änderungsvorschläge pro Runde', 'Iterativer Prozess', 'Minimalismus-Fokus'],
    useCases: ['Minimalistisches Wandbild', 'Luxuriöses Interior-Design', 'Galerie-Kunstwerk', 'Meditative Bilder'],
    targetAudience: 'Minimalismus-Liebhaber, Innenarchitekten',
    category: 'Kunst & Kreativität', active: true
  },

  // ════════════════════════════════════════════════════════
  // BUSINESS & MARKETING
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-basicsketchbeard01',
    name: 'BasicSketchBeard01',
    shortDesc: 'Phase 1: Rohidee → strukturierter 11-Punkte-Konzeptbericht.',
    description: '3-Phasen Produktentwicklung, Phase 1: Wandelt Rohideen in professionelle Konzeptberichte um. Klärt Wertversprechen, Zielgruppe und USP.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_sketch01', stripeProductId: 'prod_PLACEHOLDER_sketch01',
    features: ['11-Punkte Konzeptbericht', 'USP-Definition', 'Zielgruppenanalyse', 'Erste Risikoprüfung'],
    useCases: ['Startup-Idee strukturieren', 'Produkt-Konzept entwickeln', 'Service-Idee formalisieren', 'Investor-Pitch vorbereiten'],
    targetAudience: 'Gründer, Produktmanager, Intrapreneure',
    category: 'Business & Marketing', active: true
  },
  {
    id: 'bot-basicfacilitator02',
    name: 'BasicFacilitator02',
    shortDesc: 'Phase 2: Konzeptprüfung, Risikoanalyse und Markt-Review.',
    description: '3-Phasen Produktentwicklung, Phase 2: Analysiert Produktidee systematisch auf Marktrisiken, verfeinert USP und erstellt Ampel-Risikoberichte.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_facilitator02', stripeProductId: 'prod_PLACEHOLDER_facilitator02',
    features: ['Ampel-Risikobewertung', 'Marktvalidierung', 'USP-Verfeinerung', 'Wettbewerbslandschaft', 'Konzeptprüfbericht'],
    useCases: ['Konzept validieren', 'Risiken identifizieren', 'Marktposition klären', 'Für Phase 3 vorbereiten'],
    targetAudience: 'Gründer, Produktmanager, Investoren',
    category: 'Business & Marketing', active: true
  },
  {
    id: 'bot-basiccatalyst03',
    name: 'BasicCatalyst03',
    shortDesc: 'Phase 3: Implementierungsplan, Zeitplan und KPIs.',
    description: '3-Phasen Produktentwicklung, Phase 3: Erstellt vollständige Implementierungspläne, Briefing-Vorlagen, Mustertest-Checklisten und Launch-KPIs.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_catalyst03', stripeProductId: 'prod_PLACEHOLDER_catalyst03',
    features: ['Implementierungsplan', 'Agenturbriefing-Vorlagen', 'QA-Checklisten', 'Meilenstein-Zeitplan', 'KPI-Definition'],
    useCases: ['Produkt launchen', 'Agentur briefen', 'Qualitätssicherung planen', 'Launch-Checkliste erstellen'],
    targetAudience: 'Produktmanager, Projektleiter, Gründer',
    category: 'Business & Marketing', active: true
  },
  {
    id: 'bot-guerilla',
    name: 'Guerilla-1.0',
    shortDesc: 'Radikale Guerilla-Marketing-Kampagnen die viral gehen.',
    description: 'KI-Spezialistin für provokante Online-Guerilla-Marketing-Kampagnen. Konventionen brechen, polarisieren und im Gedächtnis bleiben.',
    type: 'bot', pricingType: 'one_time', price: 2900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_guerilla', stripeProductId: 'prod_PLACEHOLDER_guerilla',
    features: ['Viralitäts-Strategien', 'Kontroverses Konzept', 'Multiplikator-Planung', 'Risikobewertung', 'Schockfaktor-Analyse'],
    useCases: ['Produktlaunch Buzz erzeugen', 'Brand Awareness steigern', 'Viral-Kampagne planen', 'Social Media Explosion'],
    targetAudience: 'Mutige Marketer, Startups, disruptive Brands',
    category: 'Business & Marketing', active: true
  },
  {
    id: 'bot-fiverrGigbot',
    name: 'FiverrGigBot',
    shortDesc: 'Schritt-für-Schritt perfekte Fiverr-Gigs erstellen.',
    description: 'Führt systematisch durch alle 10 Abschnitte eines Fiverr-Gigs: Titel, Kategorie, Pakete, Beschreibung, Tags, FAQ. Inkl. SEO-Optimierung.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_fiverr', stripeProductId: 'prod_PLACEHOLDER_fiverr',
    features: ['10-Schritt Gig-Aufbau', 'SEO-optimierte Titel', '3-Paket-Struktur', 'FAQ-Generierung', 'Conversion-Optimierung'],
    useCases: ['Neuen Gig erstellen', 'Bestehenden Gig optimieren', 'Fiverr-Profil aufbauen', 'Mehr Aufträge gewinnen'],
    targetAudience: 'Freelancer, Dienstleister, Kreativer auf Fiverr',
    category: 'Business & Marketing', active: true
  },
  {
    id: 'bot-etsy',
    name: 'EtsyBotCopyFill',
    shortDesc: 'Komplette Etsy-Listings in mehreren Sprachen.',
    description: 'Erstellt alle Daten für Etsy-Angebote: SEO-Titel, Beschreibung, alle 13 Tags, Kategorien, Attribute – in Deutsch, Englisch, Französisch, Spanisch, Italienisch.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_etsy', stripeProductId: 'prod_PLACEHOLDER_etsy',
    features: ['5 Sprachen', 'SEO-optimiert', 'Alle 13 Etsy-Tags', 'Social-Media-Hashtags', 'Sofort verwendbar'],
    useCases: ['Neues Etsy-Produkt listen', 'Internationaler Verkauf', 'SEO verbessern', 'Verkaufstexte optimieren'],
    targetAudience: 'Etsy-Verkäufer, Handmade-Businesses, Digitale Produkte',
    category: 'Business & Marketing', active: true
  },

  // ════════════════════════════════════════════════════════
  // CONTENT & TEXT
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-promptwandler',
    name: 'PromptWandler',
    shortDesc: 'Vage Ideen in perfekte KI-Prompts verwandeln.',
    description: 'Wandelt frei formulierte Eingaben automatisch in professionelle, GPT-kompatible Prompts um. Mit Erklärung und Varianten.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_promptwandler', stripeProductId: 'prod_PLACEHOLDER_promptwandler',
    features: ['Automatische Transformation', 'GPT-kompatibel', '2-3 Varianten', 'Erklärung der Optimierungen'],
    useCases: ['Prompts für ChatGPT verbessern', 'KI-Anfragen präzisieren', 'Ideen strukturieren', 'Bessere KI-Antworten'],
    targetAudience: 'KI-Nutzer, Content-Creator, Nicht-Techniker',
    category: 'Content & Text', active: true
  },
  {
    id: 'bot-systempformatierer',
    name: 'SystemP.Formatierer',
    shortDesc: 'Systemprompts professionell strukturieren und formatieren.',
    description: 'Wandelt beliebige Systemprompts in strukturiertes Markdown mit YAML-Metablock, Rollen, DO\'s/DON\'Ts, Beispielen und Compliance-Hinweisen.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_sysformat', stripeProductId: 'prod_PLACEHOLDER_sysformat',
    features: ['YAML-Metablock', 'Standardisiertes Format', 'Sofort verkaufsfähig', 'Compliance-Abschnitt'],
    useCases: ['Bot-Prompt professionalisieren', 'Prompt-Produkt erstellen', 'Team-Dokumentation', 'Wiederverwendbare Prompts'],
    targetAudience: 'KI-Entwickler, Prompt-Engineer, Bot-Verkäufer',
    category: 'Content & Text', active: true
  },
  {
    id: 'bot-midjourneystar',
    name: 'MidjourneySTARPrompt',
    shortDesc: 'Professionelle Midjourney-Prompts durch gezielte Fragen.',
    description: 'Erstellt optimierte Midjourney-Prompts durch strukturierte Fragen zu Motiv, Stil, Beleuchtung, Farbe, Perspektive und Qualitätsparametern.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_midjourney', stripeProductId: 'prod_PLACEHOLDER_midjourney',
    features: ['Vollständige Parameter (--ar, --v)', 'Stilanalyse', '3 Variationen', 'Künstlerische Einflüsse'],
    useCases: ['Professionelle KI-Bilder erstellen', 'Konsistente Bildstile entwickeln', 'Marketing-Visuals generieren'],
    targetAudience: 'Midjourney-Nutzer, Grafiker, Content-Creator',
    category: 'Content & Text', active: true
  },
  {
    id: 'bot-musterschreiben',
    name: 'Musterschreiben-Bot',
    shortDesc: 'Rechtskonforme Musterschreiben für alle Lebenslagen.',
    description: 'Erstellt individuell konfigurierte Schreiben: Kündigungen, Beschwerden, Mahnungen, Widersprüche, Bewerbungen, DSGVO-Anfragen – rechtssicher formuliert.',
    type: 'bot', pricingType: 'one_time', price: 2900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_musterschreiben', stripeProductId: 'prod_PLACEHOLDER_musterschreiben',
    features: ['20+ Schreibtypen', 'Rechtssichere Formulierungen', 'Fristsetzung', 'Rechtsgrundlagen-Hinweise', 'Sofort verwendbar'],
    useCases: ['Kündigung schreiben', 'Beschwerde formulieren', 'DSGVO-Auskunft beantragen', 'Widerspruch einlegen'],
    targetAudience: 'Privatpersonen, Verbraucher, Arbeitnehmer',
    category: 'Content & Text', badge: 'Bestseller', active: true
  },

  // ════════════════════════════════════════════════════════
  // FINANZEN & STEUERN
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-steuerpauschbetrag',
    name: 'SteuerPauschbetragDE',
    shortDesc: 'Alle Steuerpauschbeträge ohne Belege finden.',
    description: 'Identifiziert alle relevanten deutschen Steuerpauschbeträge für die individuelle Situation: Homeoffice, Entfernungspauschale, Ehrenamt, Behinderung uvm.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_steuer', stripeProductId: 'prod_PLACEHOLDER_steuer',
    features: ['15+ Pauschbeträge', 'Individuell zugeschnitten', 'Aktuell 2025', 'Ohne Belege', 'Berechnungsbeispiele'],
    useCases: ['Steuererklärung optimieren', 'Homeoffice-Pauschale nutzen', 'Ehrenamt absetzen', 'Alle Vergünstigungen finden'],
    targetAudience: 'Steuerpflichtige, Arbeitnehmer, Ehrenamtliche',
    category: 'Finanzen & Steuern', active: true
  },
  {
    id: 'bot-investfinanzierbot',
    name: 'InvestFinanzierBot',
    shortDesc: 'Geschäftspläne und Machbarkeitsstudien für Investoren.',
    description: 'Erstellt professionelle Geschäftspläne mit Finanzprognosen, SWOT-Analysen, Markt- und Zielgruppenanalysen zur Sicherung von Investitionen.',
    type: 'bot', pricingType: 'one_time', price: 4900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_invest', stripeProductId: 'prod_PLACEHOLDER_invest',
    features: ['Executive Summary', 'Markt- & Wettbewerbsanalyse', 'SWOT-Analyse', '5-Jahres-Finanzprognose', 'ROI-Berechnung'],
    useCases: ['Investor Pitch vorbereiten', 'Bankfinanzierung beantragen', 'Fördergelder beantragen', 'Geschäftsplan erstellen'],
    targetAudience: 'Gründer, Selbstständige, KMU die Kapital suchen',
    category: 'Finanzen & Steuern', active: true
  },

  // ════════════════════════════════════════════════════════
  // ANALYSE & RECHERCHE
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-faktenfokus',
    name: 'FaktenFokus',
    shortDesc: 'Drei-Schritte-Analyse: Recherche, Experte, Fazit.',
    description: 'Beantwortet Fragen mit der Drei-Perspektiven-Technik: Recherche-Perspektive, Fachexperten-Analyse, prägnante Zusammenfassung. Ideal für professionelle Recherche.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_fakten', stripeProductId: 'prod_PLACEHOLDER_fakten',
    features: ['3-Perspektiven-Methode', 'Quellenbasiert', 'Expertenperspektive', 'Keine persönlichen Meinungen'],
    useCases: ['Marktrecherche', 'Technologie-Analyse', 'Entscheidungsgrundlagen', 'Fachliche Recherche'],
    targetAudience: 'Analysten, Researcher, Entscheider',
    category: 'Analyse & Recherche', active: true
  },
  {
    id: 'bot-assistivex',
    name: 'AssistiveX',
    shortDesc: 'Business, IT, Recht, Projektmanagement – alles in einem.',
    description: 'Vielseitiger Experte für Geschäftsplanung, IT-Support, rechtliche Erstorientierung und Projektmanagement. Faktenbasiert, lösungsorientiert.',
    type: 'bot', pricingType: 'one_time', price: 2900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_assistivex', stripeProductId: 'prod_PLACEHOLDER_assistivex',
    features: ['Business-Analyse', 'IT-Beratung', 'PM-Methodiken (Agile, Scrum)', 'Rechtliche Erstorientierung'],
    useCases: ['Projektplanung', 'IT-Auswahl unterstützen', 'Geschäftsstrategie entwickeln', 'Prozesse optimieren'],
    targetAudience: 'Selbstständige, KMU, Projektleiter',
    category: 'Analyse & Recherche', active: true
  },
  {
    id: 'bot-softwarepackanalyse',
    name: 'SoftwarePack-Analyse',
    shortDesc: 'Tiefenanalyse von Softwarepaketen und Bibliotheken.',
    description: 'Analysiert Softwarepakete: GitHub-Aktivität, Downloads, Marktvergleich, Expertenmeinungen, Qualitätsbewertung. Fundierte Empfehlungen für Entwickler.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_softpack', stripeProductId: 'prod_PLACEHOLDER_softpack',
    features: ['GitHub-Analyse', 'Marktvergleich', 'Qualitätsbewertung', 'Expertenmeinungen', 'Anwendungsfall-Empfehlung'],
    useCases: ['Bibliothek auswählen', 'Framework vergleichen', 'Tech-Stack entscheiden', 'Dependency prüfen'],
    targetAudience: 'Entwickler, Tech-Leads, CTOs',
    category: 'Analyse & Recherche', active: true
  },

  // ════════════════════════════════════════════════════════
  // DATENWERKZEUGE
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-tabellekalkulizauber',
    name: 'TabekalkulatiZauber',
    shortDesc: 'CSV-Tabellen mit beliebigen Datentypen erstellen.',
    description: 'Erstellt sauber formatierte CSV-Tabellen für alle Anwendungsfälle: Produktlisten, Kundendaten, Finanzübersichten, Importvorlagen.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_csv', stripeProductId: 'prod_PLACEHOLDER_csv',
    features: ['Alle Datentypen', 'Sofort kopierbar', 'Import-Hinweise (Excel, Sheets)', 'Spalten-Dokumentation'],
    useCases: ['Produktliste erstellen', 'Kundendaten strukturieren', 'Importvorlage generieren', 'Testdaten erzeugen'],
    targetAudience: 'Datenanalytiker, E-Commerce, Buchhalter',
    category: 'Datenwerkzeuge', active: true
  },
  {
    id: 'bot-botdatenorganisator',
    name: 'BotDatenorganisator',
    shortDesc: 'Unstrukturierten Text in JSON-Objekte umwandeln.',
    description: 'Analysiert beliebige Texteingaben (E-Mails, Berichte, Notizen) und extrahiert strukturierte, typisierte JSON-Objekte mit Schema-Dokumentation.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_json', stripeProductId: 'prod_PLACEHOLDER_json',
    features: ['Automatische Typ-Erkennung', 'Schema-Dokumentation', 'Verschachtelte Objekte', 'Arrays und Listen'],
    useCases: ['E-Mails strukturieren', 'Formulardaten extrahieren', 'API-Payload vorbereiten', 'Datenbank-Imports'],
    targetAudience: 'Entwickler, Data-Engineers, No-Code-Nutzer',
    category: 'Datenwerkzeuge', active: true
  },
  {
    id: 'bot-csvkonverterbot',
    name: 'CSVKonverterbot',
    shortDesc: 'JSON, XML und andere Formate in CSV konvertieren.',
    description: 'Konvertiert JSON, XML, Markdown-Tabellen, YAML in korrekt formatiertes CSV. Sonderzeichen werden korrekt behandelt, Hierarchien flachgeklopft.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_csvconv', stripeProductId: 'prod_PLACEHOLDER_csvconv',
    features: ['JSON/XML/YAML/Markdown', 'Korrekte Escaping', 'Datumsformat-Standardisierung', 'Import-Tipps'],
    useCases: ['API-Response exportieren', 'Datenbank-Export konvertieren', 'Excel-Import vorbereiten', 'Datenmigration'],
    targetAudience: 'Entwickler, Datenanalytiker, Business-Anwender',
    category: 'Datenwerkzeuge', active: true
  },
  {
    id: 'bot-excelformpro',
    name: 'ExcelFormPro',
    shortDesc: 'Excel und Google Sheets Formeln auf Bestellung.',
    description: 'Erstellt komplexe Excel/Google-Sheets-Formeln: SVERWEIS/XVERWEIS, WENN/WENNS, Array-Formeln, Pivot-Berechnungen – mit Schritt-für-Schritt-Erklärung.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_excel', stripeProductId: 'prod_PLACEHOLDER_excel',
    features: ['Alle Formel-Typen', 'Sofort kopierbar', 'Schritt-für-Schritt-Erklärung', 'Anpassungshinweise'],
    useCases: ['Daten auswerten', 'Dashboard erstellen', 'Automatische Berechnungen', 'Daten verknüpfen'],
    targetAudience: 'Controller, Analysten, Office-Anwender',
    category: 'Datenwerkzeuge', active: true
  },

  // ════════════════════════════════════════════════════════
  // SPRACHE & ÜBERSETZUNG
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-movalink',
    name: 'MovaLink',
    shortDesc: 'Deutsch ↔ Ukrainisch Übersetzer – direkt und präzise.',
    description: 'Übersetzt automatisch zwischen Deutsch und Ukrainisch. Ohne Kommentare, direkt und klar. Ideal für Alltag, Flüchtlingshilfe und Arbeit.',
    type: 'bot', pricingType: 'one_time', price: 990, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_movalink', stripeProductId: 'prod_PLACEHOLDER_movalink',
    features: ['Automatische Spracherkennung', 'Formell & informell', 'Umgangssprache', 'Kontextbewusst'],
    useCases: ['Dokumente übersetzen', 'Gespräche überbrücken', 'Behördenpost verstehen', 'Flüchtlingshilfe'],
    targetAudience: 'Ukrainische Geflüchtete, Helfer, Behörden',
    category: 'Sprache & Übersetzung', active: true
  },

  // ════════════════════════════════════════════════════════
  // KI-TOOLS & META
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-llmpromptshield',
    name: 'LLMPromptShield',
    shortDesc: 'Systemprompts gegen Jailbreaks und Injection härten.',
    description: 'Wandelt Systemprompts in gehärtete, produktionsreife Sicherheitsabfragen um. BSI-ähnliche Maßnahmen, OWASP Top 10 für LLMs.',
    type: 'bot', pricingType: 'one_time', price: 3900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_shield', stripeProductId: 'prod_PLACEHOLDER_shield',
    features: ['Prompt-Injection Schutz', 'Jailbreak-Resistenz', 'OWASP LLM Top 10', 'Sicherheitsanalyse', 'Kommentierter Output'],
    useCases: ['Bot absichern', 'Prompt für Produktion härten', 'Sicherheits-Audit', 'OWASP-Compliance'],
    targetAudience: 'LLM-Entwickler, Sicherheitsingenieure, KI-Architekten',
    category: 'KI-Tools', badge: 'Pro', active: true
  },
  {
    id: 'bot-promptarchitekt',
    name: 'PromptArchitekt',
    shortDesc: 'Systemprompts iterativ erstellen und verbessern.',
    description: 'Erstellt und verfeinert Systemprompts iterativ mit 3 Verbesserungsvorschlägen pro Runde. Für ChatGPT, Claude, Gemini und andere KI-Modelle.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_architect', stripeProductId: 'prod_PLACEHOLDER_architect',
    features: ['Iterativer Prozess', '3 Verbesserungsrichtungen', 'Design-Erklärungen', 'Für alle LLMs'],
    useCases: ['Eigenen Bot bauen', 'Bestehenden Bot verbessern', 'Prompt-Bibliothek aufbauen', 'KI-Assistent konfigurieren'],
    targetAudience: 'KI-Nutzer, Entwickler, Unternehmen',
    category: 'KI-Tools', active: true
  },
  {
    id: 'bot-mistralprompt',
    name: 'MistralAgentsUsing',
    shortDesc: 'Systemprompts speziell für Mistral-Agenten optimieren.',
    description: 'Expertensystem für Mistral-spezifische Prompt-Strukturen: Function Calling, Agent-Modus, Retrieval. Mit sequenzieller Klärungslogik.',
    type: 'bot', pricingType: 'one_time', price: 2900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_mistral', stripeProductId: 'prod_PLACEHOLDER_mistral',
    features: ['Mistral-spezifisch', 'Function Calling', 'Agent-Modus', 'Klärungslogik', 'Validierungstest'],
    useCases: ['Mistral-Agent bauen', 'Function-Calling implementieren', 'RAG-System prompten', 'API-Integration'],
    targetAudience: 'Mistral-Entwickler, LLM-Engineers',
    category: 'KI-Tools', active: true
  },

  // ════════════════════════════════════════════════════════
  // GESUNDHEIT & LIFESTYLE
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-nootropikacoach',
    name: 'Nootropika-Coach',
    shortDesc: 'Legale Supplements für maximale geistige Leistung.',
    description: 'Personalisierter Coach für legale Nootropika und Supplement-Stacks. Dosierung, Timing, Synergien und Qualitätskriterien für Fokus, Kreativität und Ausdauer.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_nootropika', stripeProductId: 'prod_PLACEHOLDER_nootropika',
    features: ['Personalisierte Empfehlungen', 'Dosierungs-Guides', 'Stack-Kombinationen', 'Kontraindikationen', 'Qualitätskriterien'],
    useCases: ['Fokus steigern', 'Kreativität verbessern', 'Schlaf optimieren', 'Studium-Stack erstellen'],
    targetAudience: 'Selbstständige, Studenten, Biohacker, Gamer',
    category: 'Gesundheit & Lifestyle', active: true
  },
  {
    id: 'bot-chroniclebuddy',
    name: 'ChronicleBuddy',
    shortDesc: 'KI-Tagebuchassistent – strukturierte Tageseinträge aus Notizen.',
    description: 'Wandelt freie Texteingaben in strukturierte Tagebucheinträge um. Kategorisiert nach Bereichen, hebt Highlights hervor, reflektierend formuliert.',
    type: 'bot', pricingType: 'subscription', price: 990, currency: 'eur', interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_chronicle', stripeProductId: 'prod_PLACEHOLDER_chronicle',
    features: ['Automatische Kategorisierung', 'Highlight-Erkennung', 'Tagebuch-Stil', 'Datenschutz-konform'],
    useCases: ['Tagesreflexion', 'Dankbarkeitstagebuch', 'Produktivitäts-Tracking', 'Persönliches Wachstum'],
    targetAudience: 'Achtsamkeits-Interessierte, Produktive Menschen, Selbstreflexive',
    category: 'Gesundheit & Lifestyle', active: true
  },
  {
    id: 'bot-chatstatuschecker',
    name: 'ChatStatusChecker',
    shortDesc: 'Chatverläufe analysieren – echtes Interesse erkennen.',
    description: 'Objektive Verhaltenspsychologie-Analyse von Chat-Verläufen: Investitionsverhältnis, Warnsignale, Statusklassifizierung und konkreter nächster Schritt.',
    type: 'bot', pricingType: 'one_time', price: 990, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_chatstatus', stripeProductId: 'prod_PLACEHOLDER_chatstatus',
    features: ['Verhaltensanalyse', 'Statusklassifizierung', 'Bewertung 1-10', 'Nächster-Schritt-Vorschlag', 'Objektiv & psychologisch'],
    useCases: ['Dating-Chat analysieren', 'Interesse einschätzen', 'Ghosting erkennen', 'Nächsten Schritt planen'],
    targetAudience: 'Singles, Dating-App-Nutzer',
    category: 'Gesundheit & Lifestyle', active: true
  },

  // ════════════════════════════════════════════════════════
  // BILDUNG
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-interviewgenerator',
    name: 'Interviewgenerator',
    shortDesc: 'Durchdachte Interviewfragen für jede Position erstellen.',
    description: 'Erstellt 10-15 offene, durchdachte Interviewfragen kategorisiert nach STAR-Verhaltens-, Situations-, Kompetenz- und Kulturfitfragen.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_interview', stripeProductId: 'prod_PLACEHOLDER_interview',
    features: ['STAR-Methode', '4 Fragetypen', 'Nachfrage-Vorschläge', 'Bewertungskriterien', 'Alle Branchen'],
    useCases: ['HR-Interviews vorbereiten', 'Bewerber fair bewerten', 'Assessment Center', 'Panel-Interview'],
    targetAudience: 'HR-Manager, Führungskräfte, Recruiter',
    category: 'Bildung', active: true
  },
  {
    id: 'bot-songstruktechno',
    name: 'SongstrukTechnoSub',
    shortDesc: 'Techno-Songstrukturen in Bars – Bar-by-Bar-Arrangement.',
    description: 'Erstellt detaillierte Bar-by-Bar-Songstrukturen für Techno-Subgenres. BPM, Key, Energie-Kurve, Klang-Elemente pro Sektion, DAW-Arrangement-Hinweise.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_techno', stripeProductId: 'prod_PLACEHOLDER_techno',
    features: ['10 Techno-Subgenres', 'Bar-by-Bar-Struktur', 'BPM & Key', 'Energie-Kurve', 'DAW-Hinweise'],
    useCases: ['Track strukturieren', 'Set aufbauen', 'Live-Arrangement planen', 'Produktion starten'],
    targetAudience: 'Techno-Produzenten, DJs, Musiker',
    category: 'Bildung', active: true
  },

  // ════════════════════════════════════════════════════════
  // SONSTIGES
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-rebellgpt',
    name: 'REBELLGPT',
    shortDesc: 'Direkte Klartexte, mutige Ideen, keine Beschönigung.',
    description: 'Unzensierte, direkte KI-Stimme. Keine Corporate-Sprache, keine Beschönigung. Radikale Lösungen, unbequeme Wahrheiten – legal und ethisch.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_rebell', stripeProductId: 'prod_PLACEHOLDER_rebell',
    features: ['100% Direktheit', 'Keine Phrasen', 'Radikale Perspektiven', 'Unbequeme Wahrheiten'],
    useCases: ['Ehrliches Feedback', 'Blinde Flecken aufdecken', 'Kontroverse Ideen', 'Klare Entscheidungen'],
    targetAudience: 'Querdenker, Unternehmer, Direkt-Kommunikatoren',
    category: 'Sonstiges', active: true
  },
]

// ── Reine Lesefunktionen (keine Seiteneffekte) ────────────

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id && p.active)
}

export function getBotProducts(): Product[] {
  return PRODUCTS.filter(p => p.type === 'bot' && p.active)
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(p => p.category === category && p.active)
}

export function getDigitalProducts(): Product[] {
  return PRODUCTS.filter(p => ['ebook', 'whitepaper', 'video', 'bundle'].includes(p.type) && p.active)
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.badge && p.active)
}

export function getAllCategories(): string[] {
  return [...new Set(PRODUCTS.filter(p => p.active).map(p => p.category))]
}

export function formatPrice(priceInCents: number, currency = 'eur'): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(priceInCents / 100)
}
