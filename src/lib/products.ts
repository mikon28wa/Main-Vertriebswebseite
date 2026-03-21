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

  // ════════════════════════════════════════════════════════
  // NEUE BOTS – ASTRO & PERSÖNLICHKEIT
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-astrokarriere',
    name: 'AstroKarriere',
    shortDesc: 'Monatshoroskop mit Fokus Karriere & Finanzen.',
    description: 'Erstellt personalisierte Monatshoroskope mit 70 % Fokus auf berufliche Entwicklung, Karrierechancen und Finanztipps – basierend auf Sternzeichen, Geburtsdatum und Geburtszeit.',
    type: 'bot', pricingType: 'one_time', price: 1490, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_astrokarriere', stripeProductId: 'prod_PLACEHOLDER_astrokarriere',
    features: ['Karriere-Fokus 70%', 'Persönlichkeitsanalyse', 'Günstige Zeiträume', 'Finanztipps', 'Networking-Hinweise'],
    useCases: ['Karriereentscheidungen treffen', 'Günstige Bewerbungszeitpunkte finden', 'Monatliche Orientierung', 'Persönlichkeit verstehen'],
    targetAudience: 'Spirituell Interessierte, Karrierebewusste, Selbstständige',
    category: 'Gesundheit & Lifestyle', badge: 'Neu', active: true
  },
  {
    id: 'bot-astrobezi',
    name: 'AstroBezi',
    shortDesc: 'Beziehungskompatibilität zwischen Sternzeichen analysieren.',
    description: 'Analysiert die Kompatibilität zwischen zwei Sternzeichen in Romantik, Freundschaft und Business. Kombiniert Astrologie mit Verhaltenspsychologie für praktische Beziehungsratschläge.',
    type: 'bot', pricingType: 'one_time', price: 1490, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_astrobezi', stripeProductId: 'prod_PLACEHOLDER_astrobezi',
    features: ['Synastrie-Analyse', 'Romantik & Freundschaft & Business', 'Kommunikationsstile', 'Konfliktlösung', 'Handlungsempfehlungen'],
    useCases: ['Beziehungskompatibilität prüfen', 'Konflikte verstehen', 'Beziehung vertiefen', 'Business-Partner einschätzen'],
    targetAudience: 'Singles, Paare, Spirituell Interessierte',
    category: 'Gesundheit & Lifestyle', active: true
  },
  {
    id: 'bot-astromonat-liebe',
    name: 'AstroMonat Pro',
    shortDesc: 'Monatshoroskop – Liebe, Karriere, Gesundheit & Finanzen.',
    description: 'Vollständiges Monatshoroskop mit personalisierten Vorhersagen für alle 4 Lebensbereiche. Inklusive Aszendent-Berechnung, Planetentransite und konkreten Glückstagen.',
    type: 'bot', pricingType: 'one_time', price: 1490, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_astromonat', stripeProductId: 'prod_PLACEHOLDER_astromonat',
    features: ['4 Lebensbereiche', 'Aszendent-Analyse', 'Planetentransite', 'Glückstage', 'Handlungsempfehlungen'],
    useCases: ['Monatliche Planung', 'Liebesentscheidungen', 'Gesundheitsoptimierung', 'Finanzplanung'],
    targetAudience: 'Astrologie-Fans, Suchende nach Orientierung',
    category: 'Gesundheit & Lifestyle', active: true
  },
  {
    id: 'bot-astrobeziehung',
    name: 'AstroBeziehung',
    shortDesc: 'Monatshoroskop für Beziehungen & persönliche Entwicklung.',
    description: 'Spezialisiertes Monatshoroskop mit Fokus auf romantische, freundschaftliche und familiäre Beziehungen sowie inneres Wachstum – mit präzisen Transite-Analysen.',
    type: 'bot', pricingType: 'one_time', price: 1490, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_astrobeziehung', stripeProductId: 'prod_PLACEHOLDER_astrobeziehung',
    features: ['Beziehungs-Fokus', 'Venus & Mond Transite', 'Familiendynamiken', 'Selbstwachstum', 'Konkrete Ratschläge'],
    useCases: ['Beziehungsentscheidungen', 'Persönlichkeitsentwicklung', 'Spirituelles Wachstum', 'Konfliktlösung'],
    targetAudience: 'Menschen in Beziehungen, Selbstentwickler',
    category: 'Gesundheit & Lifestyle', active: true
  },

  // ════════════════════════════════════════════════════════
  // NEUE BOTS – RECHT & COMPLIANCE (ERWEITERUNG)
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-klauseldefender',
    name: 'KlauselDefender',
    shortDesc: 'Vertragsklauseln juristisch wasserdicht verteidigen.',
    description: 'Erstellt in Sekunden prägnante, juristisch fundierte Verteidigungstexte für Vertragsklauseln – immer als ein überzeugender Satz für Gegenseiten mit hohem juristischen Niveau.',
    type: 'bot', pricingType: 'one_time', price: 2900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_klausel', stripeProductId: 'prod_PLACEHOLDER_klausel',
    features: ['Juristisch präzise', 'Einzeiliger Textbaustein', 'Risikoallokation', 'Keine Quellen nötig', 'Prompt-Injection-Schutz'],
    useCases: ['Redline-Kommentare verteidigen', 'Vertragsverhandlungen', 'Haftungsklauseln absichern', 'Geheimhaltung verteidigen'],
    targetAudience: 'Rechtsanwälte, Legal Teams, Vertragsmanager',
    category: 'Recht', badge: 'Pro', active: true
  },
  {
    id: 'bot-aktenauswerter',
    name: 'Aktenauswerter',
    shortDesc: 'Juristische Akten strukturiert zusammenfassen.',
    description: 'Erstellt strukturierte Aktenauszüge für Gerichtsverfahren: chronologische Verfahrenshistorie, tabellarische Gegenüberstellung der Parteipositionen, Beweismittel-Übersicht.',
    type: 'bot', pricingType: 'one_time', price: 3900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_akten', stripeProductId: 'prod_PLACEHOLDER_akten',
    features: ['Chronologische Analyse', 'Parteienvergleich Tabelle', 'Beweismittel-Übersicht', 'DSGVO-konform', 'Anwaltsgeheimnis'],
    useCases: ['Aktenüberblick schaffen', 'Mandantenbesprechung vorbereiten', 'Sachverhalt strukturieren', 'Verfahrenshistorie aufbereiten'],
    targetAudience: 'Rechtsanwälte, Juristen, Richter',
    category: 'Recht', active: true
  },
  {
    id: 'bot-hausordnung-checker',
    name: 'HausordnungChecker',
    shortDesc: 'Hausordnungen sozialer Einrichtungen rechtlich prüfen.',
    description: 'Interdisziplinäre Prüfung von Hausordnungen auf rechtliche Konformität (GG, SGB, DSGVO), psychologische Auswirkungen und sozialpädagogische Aspekte für Unterkünfte und Heime.',
    type: 'bot', pricingType: 'one_time', price: 3900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_hausordnung', stripeProductId: 'prod_PLACEHOLDER_hausordnung',
    features: ['Rechtliche Prüfung GG/SGB/DSGVO', 'Psychologische Analyse', 'Sozialpädagogik', 'Verhältnismäßigkeit', 'Verbesserungsvorschläge'],
    useCases: ['Hausordnung rechtssicher machen', 'Compliance-Prüfung', 'Bewohnerschutz', 'Einrichtungsoptimierung'],
    targetAudience: 'Sozialeinrichtungen, Behörden, Sozialarbeiter, Juristen',
    category: 'Recht', active: true
  },
  {
    id: 'bot-eurecht',
    name: 'EURechtGPT',
    shortDesc: 'EU-Recht, EuGH-Urteile und EU-Rechtsprechung erklären.',
    description: 'Kompetenter Assistent für EU-Primärrecht (EUV, AEUV), Sekundärrecht (DSGVO, Verbraucherschutz) und EuGH-Rechtsprechung. Mit EUR-Lex und CURIA als Datengrundlage.',
    type: 'bot', pricingType: 'one_time', price: 2900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_eurecht', stripeProductId: 'prod_PLACEHOLDER_eurecht',
    features: ['EU-Primärrecht', 'EuGH-Urteile', 'DSGVO-Expertise', 'Wettbewerbsrecht', 'Verbraucherschutz'],
    useCases: ['EU-Recht verstehen', 'DSGVO-Fragen klären', 'Grenzüberschreitende Rechte', 'Compliance EU-weit'],
    targetAudience: 'Unternehmen, Juristen, EU-Bürger, Compliance-Manager',
    category: 'Recht', active: true
  },

  // ════════════════════════════════════════════════════════
  // NEUE BOTS – ANALYSE & SEO
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-crawling-auditor',
    name: 'CrawlingAuditor',
    shortDesc: 'Technisches SEO-Audit: Crawling, Indexierung, Linkstruktur.',
    description: 'Autonomer Auditor für robots.txt, Sitemaps, Statuscodes, Canonicals, hreflang und interne Linkarchitektur. Erstellt PDF-fertige Berichte mit priorisierten Handlungsempfehlungen.',
    type: 'bot', pricingType: 'subscription', price: 2900, currency: 'eur', interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_crawling', stripeProductId: 'prod_PLACEHOLDER_crawling',
    features: ['robots.txt Analyse', 'Sitemap-Prüfung', 'Statuscode-Report', 'Canonical-Konflikte', 'PDF-Report-fertig'],
    useCases: ['SEO-Audit durchführen', 'Indexierungsprobleme lösen', 'Weiterleitungsketten finden', 'Orphan Pages aufdecken'],
    targetAudience: 'SEO-Experten, Webmaster, Digital-Agenturen',
    category: 'Analyse & Recherche', badge: 'Pro', active: true
  },
  {
    id: 'bot-wcca',
    name: 'WebsiteCoverageAgent',
    shortDesc: 'Website-Crawl & Coverage-Analyse als strukturiertes JSON.',
    description: 'Erstellt vollständige Website-Snapshots und bewertet die Coverage. Gibt strukturiertes JSON zurück für weitere Pipeline-Verarbeitung (Kategorie-Agent, Microagent).',
    type: 'bot', pricingType: 'one_time', price: 3900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_wcca', stripeProductId: 'prod_PLACEHOLDER_wcca',
    features: ['JSON-Only Output', 'Coverage-Bewertung', 'Pipeline-kompatibel', 'Anti-Injection', 'Compliance-Pipeline'],
    useCases: ['Website-Struktur erfassen', 'Coverage-Lücken finden', 'Automatisierte Audits', 'Compliance-Checks'],
    targetAudience: 'Entwickler, SEO-Agenturen, Compliance-Teams',
    category: 'Analyse & Recherche', active: true
  },
  {
    id: 'bot-textqual-analyzer',
    name: 'TextQualAnalyzer',
    shortDesc: 'Textqualität analysieren, bewerten und verbessern (V3).',
    description: 'Dreiteiliges Textqualitäts-System: Analyzer bewertet, Optimizer überarbeitet, Plagiat-Checker prüft. Anti-Halluzination, RAG-gestützt, Manus AI kompatibel.',
    type: 'bot', pricingType: 'subscription', price: 2900, currency: 'eur', interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_textqual', stripeProductId: 'prod_PLACEHOLDER_textqual',
    features: ['Qualitätsstufen 1-6', 'Analyzer + Optimizer', 'Plagiat-Check', 'Anti-Injection Schutz', 'SEO-Optimierung'],
    useCases: ['Blogbeiträge verbessern', 'Marketing-Texte optimieren', 'Plagiate prüfen', 'Landingpage-Qualität steigern'],
    targetAudience: 'Texter, Content-Manager, SEO-Spezialisten, Agenturen',
    category: 'Content & Text', badge: 'Bestseller', active: true
  },
  {
    id: 'bot-faktenfokus',
    name: 'FaktenFokusPro',
    shortDesc: 'Faktenbasierte Antworten im 3-Perspektiven-Schema.',
    description: 'Beantwortet jede Frage im dreistufigen Schema: Ich-Perspektive (Recherche), Fachexperten-Perspektive, Zusammengeführte Schlussfolgerung. Keine Halluzinationen.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_fakten', stripeProductId: 'prod_PLACEHOLDER_fakten',
    features: ['3-Perspektiven-Methode', 'Quellenhinweise', 'Anti-Halluzination', 'Fachliche Tiefe', 'Praxisnahe Schlussfolgerung'],
    useCases: ['Recherche fundieren', 'Komplexe Themen verstehen', 'Faktencheck', 'Entscheidungen absichern'],
    targetAudience: 'Journalisten, Forscher, Entscheider, Wissensarbeiter',
    category: 'Analyse & Recherche', active: true
  },
  {
    id: 'bot-fakeshop-checker',
    name: 'FakeShopChecker',
    shortDesc: 'Online-Shops auf Betrug und Seriosität prüfen.',
    description: 'Systematische Prüfung von Online-Shops auf Fake-Eigenschaften: WHOIS, SSL, Impressum, Reputations-Check, Bewertungsmuster. Risikoscore 0-100 mit konkreten Handlungsempfehlungen.',
    type: 'bot', pricingType: 'one_time', price: 990, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_fakeshop', stripeProductId: 'prod_PLACEHOLDER_fakeshop',
    features: ['Risikoscore 0-100', 'WHOIS & SSL Check', 'Bewertungsanalyse', 'Zahlungsrisiko', 'Quellenbelege'],
    useCases: ['Shop vor Kauf prüfen', 'Betrug erkennen', 'Sicher online kaufen', 'Verbraucherschutz'],
    targetAudience: 'Online-Käufer, Verbraucherschützer, Unternehmen',
    category: 'Analyse & Recherche', badge: 'Neu', active: true
  },
  {
    id: 'bot-site-meldeassistent',
    name: 'SiteMeldeAssistent',
    shortDesc: 'Websites wegen illegaler Inhalte korrekt melden.',
    description: 'Führt durch den gesamten Meldeprozess bei problematischen Websites: ermittelt die richtige Meldestelle (Google, Behörden, Plattformen), erklärt benötigte Informationen.',
    type: 'bot', pricingType: 'one_time', price: 990, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_sitemeldeassistent', stripeProductId: 'prod_PLACEHOLDER_sitemeldeassistent',
    features: ['Meldestellen-Ermittlung', 'Beweissicherung', 'Schritt-für-Schritt', 'International', '95%+ Genauigkeit'],
    useCases: ['Fake-Shop melden', 'Phishing melden', 'Illegale Inhalte anzeigen', 'Urheberrechtsverletzung melden'],
    targetAudience: 'Verbraucher, Unternehmen, Rechteinhaber',
    category: 'Analyse & Recherche', active: true
  },
  {
    id: 'bot-ki-straftat',
    name: 'KI-StrafrechtFakten',
    shortDesc: 'Faktenbasierte Straftatverarbeitung mit KI.',
    description: 'Sachliche, faktenbasierte Analyse von strafrechtlichen Situationen. Kombiniert öffentliches Strafrecht mit KI-Analyse für Ermittler, Juristen und Sicherheitsbehörden.',
    type: 'bot', pricingType: 'one_time', price: 3900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_kistrafrechtfakten', stripeProductId: 'prod_PLACEHOLDER_kistrafrechtfakten',
    features: ['Faktenbasis', 'StGB & StPO Referenzen', 'Sachliche Analyse', 'Keine Spekulationen', 'Ermittlungsunterstützung'],
    useCases: ['Sachverhalte strukturieren', 'Rechtliche Einordnung', 'Ermittlungsansätze', 'Fallanalyse'],
    targetAudience: 'Juristen, Ermittler, Sicherheitsbehörden',
    category: 'Recht', active: true
  },

  // ════════════════════════════════════════════════════════
  // NEUE BOTS – BUSINESS & MARKETING (ERWEITERUNG)
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-guerrilla-marketing',
    name: 'GuerrillaMarketing',
    shortDesc: 'Extreme, virale Guerrilla-Marketing-Kampagnen erstellen.',
    description: 'Entwickelt provokante, grenzenüberschreitende Online-Marketing-Kampagnen für maximale Aufmerksamkeit. Vollständige Inhalte für Facebook, Instagram, TikTok, X, Snapchat und Website.',
    type: 'bot', pricingType: 'one_time', price: 2900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_guerrilla', stripeProductId: 'prod_PLACEHOLDER_guerrilla',
    features: ['Viral-Strategie', 'Multi-Plattform Content', 'Provokante Ideen', 'Vollständige Kampagne', 'Emotionale Wirkung'],
    useCases: ['Brand Awareness steigern', 'Virale Kampagne starten', 'Engagement maximieren', 'Aufmerksamkeit erregen'],
    targetAudience: 'Marketer, Startups, Kreativagenturen, Brand Manager',
    category: 'Business & Marketing', badge: 'Neu', active: true
  },
  {
    id: 'bot-vertriebsrep',
    name: 'VertriebsRepBot',
    shortDesc: 'Sales-Development-Bot für Erstkontakte und Lead-Qualifizierung.',
    description: 'Professioneller Sales-Development-Representative für WhatsApp und Messenger. Qualifiziert Leads, pitcht das Produkt, führt zu Terminen – höflich, prägnant, personalisiert.',
    type: 'bot', pricingType: 'subscription', price: 2900, currency: 'eur', interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_vertriebsrep', stripeProductId: 'prod_PLACEHOLDER_vertriebsrep',
    features: ['Lead-Qualifizierung', 'Messenger-optimiert', 'DSGVO-konform', 'Produkt-Pitching', 'Terminvereinbarung'],
    useCases: ['Erstkontakte qualifizieren', 'Leads warmhalten', 'Produkt vorstellen', 'Termine vereinbaren'],
    targetAudience: 'Vertriebsteams, Startups, KMUs, Coaches',
    category: 'Business & Marketing', active: true
  },
  {
    id: 'bot-fiverr-gig',
    name: 'FiverrGigAssistent',
    shortDesc: 'Perfekte Fiverr-Gigs Schritt für Schritt erstellen.',
    description: 'Führt durch alle Felder der Fiverr-Gig-Erstellung: Titel, Kategorie, Tags, Beschreibung, Pakete, FAQs. Validiert Zeichenlimits und gibt konkrete Verbesserungsvorschläge.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_fiverrg', stripeProductId: 'prod_PLACEHOLDER_fiverrg',
    features: ['Gig-Struktur komplett', 'SEO-Tags Optimierung', 'Paket-Preisgestaltung', 'Validation', 'FAQ-Erstellung'],
    useCases: ['Ersten Gig erstellen', 'Bestehenden Gig optimieren', 'Konversionsrate steigern', 'Ranking verbessern'],
    targetAudience: 'Freiberufler, Designer, Texter, Entwickler auf Fiverr',
    category: 'Business & Marketing', active: true
  },
  {
    id: 'bot-fiverr-berater',
    name: 'FiverrBerater',
    shortDesc: 'Freelancer auf Fiverr auswählen und Projekte managen.',
    description: 'Experte für Fiverr-Plattformnutzung: Verkäufer-Bewertung, Projektstrukturierung, Kommunikationsanleitungen, Gebührenstruktur, Qualitätssicherung.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_fiverrberater', stripeProductId: 'prod_PLACEHOLDER_fiverrberater',
    features: ['Verkäufer-Bewertung', 'Projektstruktur', 'Kostenoptimierung', 'Risikominimierung', 'Kommunikationsleitfaden'],
    useCases: ['Richtigen Freelancer finden', 'Projekt erfolgreich abwickeln', 'Kosten sparen', 'Qualität sichern'],
    targetAudience: 'Unternehmen, Auftraggeber, Projekte-Manager',
    category: 'Business & Marketing', active: true
  },
  {
    id: 'bot-recruiter-sofi',
    name: 'RecruiterSofi',
    shortDesc: 'KI-Recruiterin für WhatsApp-Kandidatenbegleitung.',
    description: 'Sofi – erfahrene KI-Recruiterin begleitet Kandidaten vom Erstkontakt bis zum Vorstellungsgespräch. Dokumenten-Upload, Fragenkatalog, DSGVO-konform.',
    type: 'bot', pricingType: 'subscription', price: 3900, currency: 'eur', interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_recruitersofi', stripeProductId: 'prod_PLACEHOLDER_recruitersofi',
    features: ['Kandidaten-Begleitung', 'Dokument-Upload', 'Fragenkatalog', 'DSGVO-konform', 'WhatsApp-Stil'],
    useCases: ['Bewerber vorqualifizieren', 'Bewerbungsprozess automatisieren', 'HR entlasten', 'Kandidaten informieren'],
    targetAudience: 'HR-Abteilungen, Personalvermittler, Recruiter',
    category: 'Business & Marketing', badge: 'Pro', active: true
  },
  {
    id: 'bot-support-template',
    name: 'SupportBot-Template',
    shortDesc: 'Anpassbarer Kundensupport-Bot für jedes Unternehmen.',
    description: 'Professioneller Support-Bot-Template für WhatsApp/Messenger. Löst Kundenprobleme, bewahrt freundlichen Ton, hält sich auf Topic. DSGVO-konform und anpassbar.',
    type: 'bot', pricingType: 'subscription', price: 2900, currency: 'eur', interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_supporttemplate', stripeProductId: 'prod_PLACEHOLDER_supporttemplate',
    features: ['Anpassbares Template', 'Messenger-optimiert', 'DSGVO-konform', 'Freundlich & kompetent', 'Topic-fokussiert'],
    useCases: ['Kundensupport automatisieren', 'FAQ-Beantwortung', 'Produkt-Support', 'Aftersales-Service'],
    targetAudience: 'Unternehmen aller Branchen, E-Commerce, SaaS',
    category: 'Business & Marketing', active: true
  },

  // ════════════════════════════════════════════════════════
  // NEUE BOTS – FINANZEN & STEUERN (ERWEITERUNG)
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-steuerpausch',
    name: 'SteuerPauschBot',
    shortDesc: 'Alle relevanten Steuerpauschbeträge für deine Situation finden.',
    description: 'Interaktiver Chatbot für deutsche Steuerpauschbeträge. Ermittelt durch gezieltes Fragen alle relevanten Pauschalen (Arbeitnehmer, Homeoffice, Behinderung, Kinder, Ehrenamt) ohne Belege.',
    type: 'bot', pricingType: 'one_time', price: 1490, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_steuerpausch', stripeProductId: 'prod_PLACEHOLDER_steuerpausch',
    features: ['Alle Pauschbeträge 2025', 'Adaptiver Dialog', 'Kategorisierte Ausgabe', 'Kein Anwalt nötig', 'Laienverständlich'],
    useCases: ['Steuererstattung maximieren', 'Pauschalen kennen', 'Steuererklärung optimieren', 'Homeoffice-Pauschale'],
    targetAudience: 'Angestellte, Selbstständige, Rentner, Familien',
    category: 'Finanzen & Steuern', badge: 'Neu', active: true
  },
  {
    id: 'bot-finanzplan-assistent',
    name: 'FinanzplanAssistent',
    shortDesc: 'Machbarkeitsstudien und Businesspläne mit Finanzprognosen.',
    description: 'Erstellt professionelle Machbarkeitsstudien und Geschäftspläne mit SWOT-Analyse, Marktanalyse, Konkurrenzanalyse und Finanzprognosen – auf BlackRock-Niveau.',
    type: 'bot', pricingType: 'one_time', price: 4900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_finanzplan', stripeProductId: 'prod_PLACEHOLDER_finanzplan',
    features: ['Machbarkeitsstudie', 'SWOT-Analyse', 'Marktanalyse', 'Finanzprognosen', 'Investorenreport'],
    useCases: ['Businessplan erstellen', 'Investoren überzeugen', 'Marktpotenzial prüfen', 'Finanzierungsantrag'],
    targetAudience: 'Gründer, Unternehmer, Investoren, CFOs',
    category: 'Finanzen & Steuern', active: true
  },
  {
    id: 'bot-finance-resume',
    name: 'FinanceResumeBot',
    shortDesc: 'ATS-optimierte Lebensläufe für Finance-Berufe.',
    description: 'Erstellt ATS-optimierte, professionelle Lebensläufe für Investment Banking, Financial Analysis, Risk Management, ESG-Reporting. Mit automatischer Keyword-Analyse.',
    type: 'bot', pricingType: 'one_time', price: 2900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_financeresume', stripeProductId: 'prod_PLACEHOLDER_financeresume',
    features: ['ATS-optimiert', 'Finance-Keyword-Analyse', 'Investment Banking Focus', 'ESG-Reporting', 'Word-kompatibel'],
    useCases: ['Lebenslauf Finance', 'Investment-Banking Bewerbung', 'ATS-Optimierung', 'Karrierewechsel Finance'],
    targetAudience: 'Finance-Professionals, Berufseinsteiger, Karrierewechsler',
    category: 'Finanzen & Steuern', active: true
  },

  // ════════════════════════════════════════════════════════
  // NEUE BOTS – KUNST & KREATIVITÄT (ERWEITERUNG)
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-abstractartgenie',
    name: 'AbstractArtGenie',
    shortDesc: 'Abstrakte Kunstwerke durch geführten Dialog erschaffen.',
    description: 'Führt durch einen kreativen Dialog zur Erschaffung einzigartiger abstrakter Kunst. Erfasst Stimmung, Farben, Formen, Textur und Dynamik für perfekte Bild-Prompts.',
    type: 'bot', pricingType: 'one_time', price: 1490, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_abstractart', stripeProductId: 'prod_PLACEHOLDER_abstractart',
    features: ['Geführter Kreativprozess', 'Stimmungsanalyse', 'Farb- & Formauswahl', 'KI-Prompt-Generierung', 'Einzigartige Werke'],
    useCases: ['Kunst-Prompts erstellen', 'Abstract Art Inspiration', 'NFT-Konzepte', 'Innenraumdekoration'],
    targetAudience: 'Kreative, Künstler, NFT-Creator, Designer',
    category: 'Kunst & Kreativität', badge: 'Neu', active: true
  },
  {
    id: 'bot-streetart',
    name: 'StreetArtArtist',
    shortDesc: 'Professionelle Street-Art-Prompts für KI-Bildgeneratoren.',
    description: 'Erstellt cineastische, photorealistische Street-Art-Prompts mit urbaner Atmosphäre, Graffiti-Stil und dramatischer Beleuchtung – inspiriert von Banksy und Kobra.',
    type: 'bot', pricingType: 'one_time', price: 1490, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_streetart', stripeProductId: 'prod_PLACEHOLDER_streetart',
    features: ['Banksy-Stil', 'Spray-Paint Ästhetik', 'Urbane Atmosphäre', 'Photorealistische Prompts', 'Cinematic Tone'],
    useCases: ['Street Art generieren', 'Mural-Konzepte', 'Urban Art NFTs', 'Stadtbild-Visualisierung'],
    targetAudience: 'Künstler, Grafiker, NFT-Creator, Agenturen',
    category: 'Kunst & Kreativität', active: true
  },
  {
    id: 'bot-artmajeur-analyse',
    name: 'ArtmajeurBildAnalyse',
    shortDesc: 'Kunstwerke für Artmajeur.com professionell analysieren.',
    description: 'Analysiert Kunstwerke für das Artmajeur-Plattform-Upload: Stil, Technik, Komposition, Symbolik und verkaufsfördernde Beschreibung in mehreren Sprachen.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_artmajeur', stripeProductId: 'prod_PLACEHOLDER_artmajeur',
    features: ['Kunstwerk-Analyse', 'Mehrsprachig', 'Verkaufsbeschreibung', 'Stil-Erkennung', 'Plattform-optimiert'],
    useCases: ['Kunstwerk beschreiben', 'Artmajeur-Upload vorbereiten', 'Galerie-Texte', 'Kunstkatalog erstellen'],
    targetAudience: 'Bildende Künstler, Galerien, Kunstverkäufer',
    category: 'Kunst & Kreativität', active: true
  },
  {
    id: 'bot-abstract-prompts',
    name: 'AbstraktBildPrompts',
    shortDesc: 'Professionelle Prompts für abstrakte KI-Bilder.',
    description: 'Erstellt qualitativ hochwertige, detaillierte Prompts für abstrakte KI-Bildgenerierung. Von einfachen Wirbeln bis zu komplexen psychedelischen Kompositionen.',
    type: 'bot', pricingType: 'one_time', price: 990, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_abstractprompts', stripeProductId: 'prod_PLACEHOLDER_abstractprompts',
    features: ['Midjourney & DALL-E', 'Detaillierte Beschreibungen', 'Farbpaletten', 'Stil-Variationen', 'DE & EN'],
    useCases: ['KI-Kunstwerke generieren', 'Bildprompts verbessern', 'Stil experimenterieren', 'Kreative Inspiration'],
    targetAudience: 'KI-Künstler, Kreative, Content-Creator',
    category: 'Kunst & Kreativität', active: true
  },

  // ════════════════════════════════════════════════════════
  // NEUE BOTS – SPRACHE & TOOLS
  // ════════════════════════════════════════════════════════
  {
    id: 'bot-papagent',
    name: 'Papagent',
    shortDesc: 'Automatische Rechtschreibkorrektur für deutsche Texte.',
    description: 'Korrigiert deutsche Texte automatisch: Rechtschreibung, Grammatik, Interpunktion und Typografie. Gibt NUR den korrigierten Text zurück – kein Kommentar, kein Smalltalk.',
    type: 'bot', pricingType: 'subscription', price: 990, currency: 'eur', interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_papagent', stripeProductId: 'prod_PLACEHOLDER_papagent',
    features: ['Rechtschreibung & Grammatik', 'Interpunktion', 'Typografie', 'Code-safe', 'Kein Kommentar'],
    useCases: ['E-Mails korrigieren', 'Texte schnell prüfen', 'Tippfehler beheben', 'Professionelle Kommunikation'],
    targetAudience: 'Alle deutschsprachigen Nutzer, Texter, Geschäftsleute',
    category: 'Sprache & Übersetzung', active: true
  },
  {
    id: 'bot-etsy-latam',
    name: 'EtsyLATAM',
    shortDesc: 'Produkte für lateinamerikanischen Etsy-Markt lokalisieren.',
    description: 'Übersetzt und lokalisiert Produktbeschreibungen aus jeder Sprache ins Lateinamerikanische Spanisch (Neutral). SEO-optimiert, verkaufsstark, mit 10 Tags.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_etsylatam', stripeProductId: 'prod_PLACEHOLDER_etsylatam',
    features: ['LATAM-Spanisch', 'SEO-Titel', 'Verkaufs-Hooks', 'Feature-Bullets', '10 SEO-Tags'],
    useCases: ['Etsy-Shop LATAM expandieren', 'Produktbeschreibungen übersetzen', 'SEO für Spanisch', 'Markt-Lokalisierung'],
    targetAudience: 'Etsy-Seller, Digital-Produkt-Händler, Shopbetreiber',
    category: 'Sprache & Übersetzung', badge: 'Neu', active: true
  },
  {
    id: 'bot-systemprompt-formatierer',
    name: 'SystemPromptFormatierer',
    shortDesc: 'Systemprompts automatisch in Markdown formatieren.',
    description: 'Wandelt Copy-Paste-Eingaben von Systemprompts in saubere Markdown-Dokumente mit YAML-Metablock um. Strukturiert in Systemrolle, Zielsetzung, Do\'s, Don\'ts, Beispiele.',
    type: 'bot', pricingType: 'one_time', price: 1490, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_spformatierer', stripeProductId: 'prod_PLACEHOLDER_spformatierer',
    features: ['YAML-Metablock', 'Markdown-Struktur', 'Auto-Tagging', 'Sektionen-Erkennung', 'Archivierungsformat'],
    useCases: ['Prompts dokumentieren', 'Prompt-Bibliothek aufbauen', 'Team-Sharing', 'Versionierung'],
    targetAudience: 'Prompt-Engineer, KI-Teams, Entwickler',
    category: 'KI-Tools', active: true
  },
  {
    id: 'bot-blog-autor',
    name: 'BlogAutor',
    shortDesc: 'Fundierte, gut lesbare Blogbeiträge aus Quellen erstellen.',
    description: 'Erstellt ansprechende, fachlich fundierte Blogbeiträge aus bereitgestellten Quellen. RAG-gestützt, Anti-Halluzination, mit überraschenden und kontraintuitiven Erkenntnissen.',
    type: 'bot', pricingType: 'subscription', price: 1900, currency: 'eur', interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_blogautor', stripeProductId: 'prod_PLACEHOLDER_blogautor',
    features: ['RAG-gestützt', 'Anti-Halluzination', 'Listenstruktur', 'SEO-Überschriften', 'Chain-of-Thought'],
    useCases: ['Blogartikel schreiben', 'Content-Marketing', 'Fachbeiträge erstellen', 'Content-Bibliothek aufbauen'],
    targetAudience: 'Blogger, Content-Manager, Marketing-Teams, Coaches',
    category: 'Content & Text', active: true
  },
  {
    id: 'bot-legalassist',
    name: 'LegalAssistGPT',
    shortDesc: 'Rechtsfragen zu Wirtschaft, Arbeitsrecht und Datenschutz.',
    description: 'KI-Rechtsassistent für Wirtschaftsrecht, Arbeitsrecht/HR, geistiges Eigentum, Datenschutz und Urheberrecht. Mit Gesetzesreferenzen und Handlungsempfehlungen.',
    type: 'bot', pricingType: 'subscription', price: 2900, currency: 'eur', interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_legalassist', stripeProductId: 'prod_PLACEHOLDER_legalassist',
    features: ['Wirtschaftsrecht', 'DSGVO-Expertise', 'Geistiges Eigentum', 'Gesetzesreferenzen', 'Handlungsempfehlungen'],
    useCases: ['Vertragsrecht', 'DSGVO-Fragen', 'IP-Schutz', 'Arbeitsrechtsfragen', 'Compliance'],
    targetAudience: 'Unternehmen, Startups, KMUs, HR-Manager',
    category: 'Recht', active: true
  },
  {
    id: 'bot-ki-prozessoptimierung',
    name: 'KI-ProzessOptimierung',
    shortDesc: 'Digitale Prozesse mit KI Schritt für Schritt optimieren.',
    description: 'Hochspezialisierter Assistent für digitale Prozessoptimierung. Erstellt detaillierte Schritt-für-Schritt-Anleitungen zur KI-Integration in Geschäftsprozesse.',
    type: 'bot', pricingType: 'subscription', price: 3900, currency: 'eur', interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_kiprozess', stripeProductId: 'prod_PLACEHOLDER_kiprozess',
    features: ['Prozessanalyse', 'KI-Integration', 'Automatisierungsplan', 'ROI-Berechnung', 'Schritt-für-Schritt'],
    useCases: ['Prozesse automatisieren', 'KI in Unternehmen einführen', 'Effizienz steigern', 'Kosten reduzieren'],
    targetAudience: 'Geschäftsführer, IT-Manager, Operations, Berater',
    category: 'Business & Marketing', active: true
  },
  {
    id: 'bot-textanalyse',
    name: 'TextanalyseAssistent',
    shortDesc: 'Literarische Textanalysen strukturiert erstellen.',
    description: 'Erstellt vollständige Textanalysen mit Einleitung, Inhaltsanalyse, Struktur und Sprachanalyse. Für alle Textsorten: Gedichte, Prosa, Dramen, Sachtexte.',
    type: 'bot', pricingType: 'one_time', price: 1490, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_textanalyse', stripeProductId: 'prod_PLACEHOLDER_textanalyse',
    features: ['Alle Textsorten', 'Einleitung-Hauptteil-Schluss', 'Sprachanalyse', 'Strukturanalyse', 'Epochenzuordnung'],
    useCases: ['Schulaufsatz', 'Universitätsarbeit', 'Literaturanalyse', 'Gedichtinterpretation'],
    targetAudience: 'Schüler, Studierende, Deutschlehrer',
    category: 'Bildung', active: true
  },
  {
    id: 'bot-rainer-coding',
    name: 'RainerCodingAssistent',
    shortDesc: 'KI-Programmierassistent für VS Code und Workspace.',
    description: 'Professioneller Coding-Assistent spezialisiert auf VS Code und Linux. Erklärt Code, findet Bugs, erstellt Tests und schreibt Pseudocode. Kompakt und präzise.',
    type: 'bot', pricingType: 'subscription', price: 1900, currency: 'eur', interval: 'month',
    stripePriceId: 'price_PLACEHOLDER_rainercoding', stripeProductId: 'prod_PLACEHOLDER_rainercoding',
    features: ['VS Code Integration', 'Bug-Fixing', 'Unit-Test Generierung', 'Pseudocode', 'Linux-Befehle'],
    useCases: ['Code erklären', 'Fehler finden', 'Tests schreiben', 'Neues Projekt scaffolden'],
    targetAudience: 'Entwickler, Programmierer, Software-Ingenieure',
    category: 'Programmierung', active: true
  },
  {
    id: 'bot-sprachethik',
    name: 'SprachEthikBot',
    shortDesc: 'Sprache ethisch verarbeiten und niveaugerecht optimieren.',
    description: 'Wandelt Spracheingaben in kontextgerechte Texte um. Erkennt automatisch das benötigte Sprachniveau (Schulvortrag bis Universitätsniveau) und sorgt für ethisch einwandfreie Ausgaben.',
    type: 'bot', pricingType: 'one_time', price: 1900, currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_sprachethik', stripeProductId: 'prod_PLACEHOLDER_sprachethik',
    features: ['Niveauerkennung', 'Kontextsensitiv', 'Ethik-konform', 'JSON-Ausgabe', 'Bias-Minimierung'],
    useCases: ['Vorträge niveaugerecht aufbereiten', 'Texte ethisch gestalten', 'Sprache anpassen', 'Bildungsinhalt erstellen'],
    targetAudience: 'Pädagogen, Redner, Content-Creator, Bildungseinrichtungen',
    category: 'Sprache & Übersetzung', active: true
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
