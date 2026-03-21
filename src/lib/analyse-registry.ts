// ============================================================
// ANALYSEN-REGISTRY
// Verantwortung: Alle käuflichen Analysen verwalten.
// Kennt: AnalyseEntry-Typ
// Kennt NICHT: Stripe, KV, Lizenzen, Bots
// ============================================================

import type { AnalyseEntry } from '../types'

// ── Hilfsfunktion: Datum formatieren ─────────────────────
export function formatAnalyseDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
}

// ── Analysen-Katalog ──────────────────────────────────────
export const ANALYSES: AnalyseEntry[] = [

  // ════════════════════════════════════════════════════════
  // KI & AUTOMATISIERUNG
  // ════════════════════════════════════════════════════════
  {
    id: 'analyse-ki-prompt-engineering-2025',
    title: 'Prompt Engineering 2025: Strategien für maximale KI-Leistung',
    shortDesc: 'Umfassende Analyse der wichtigsten Prompt-Techniken (Chain-of-Thought, Few-Shot, ReAct) mit Bewertung ihrer Effektivität in Geschäftsanwendungen.',
    fullDesc: 'Diese Analyse untersucht systematisch, welche Prompt-Strategien in 2025 den größten Wirkungsgrad erzielen. Auf Basis von 200+ Testszenarien werden Chain-of-Thought, Few-Shot Learning, ReAct-Prompting und strukturierte Ausgabe-Formate verglichen. Enthält praxisnahe Vorlagen für Marketing, Recht, Finanzen und Kundenservice.',
    category: 'KI & Automatisierung',
    lastUpdated: '2025-03-01',
    pageCount: 34,
    price: 1900,
    currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_analyse_prompt2025',
    stripeProductId: 'prod_PLACEHOLDER_analyse_prompt2025',
    badge: 'Neu',
    active: true,
    previewHtml: `
      <h2>Was Sie in dieser Analyse erfahren</h2>
      <p>Prompt Engineering ist 2025 zur Kernkompetenz für KI-gestützte Unternehmen geworden. Diese Analyse zeigt, welche Techniken messbar bessere Ergebnisse liefern – und welche überschätzt werden.</p>
      <h3>Abschnitt 1: Grundlagen (öffentlich)</h3>
      <p>Chain-of-Thought (CoT) Prompting erhöht die Lösungsqualität bei komplexen Reasoning-Aufgaben um durchschnittlich 38 % gegenüber einfachen Direktanfragen. Die Technik funktioniert besonders gut bei GPT-4o und Claude 3.5.</p>
    `,
    contentHtml: `
      <div class="analyse-content">
        <h1>Prompt Engineering 2025: Strategien für maximale KI-Leistung</h1>
        <p class="text-slate-500 text-sm mb-8">Letzte Aktualisierung: 1. März 2025 · 34 Seiten · Kategorie: KI &amp; Automatisierung</p>

        <h2>Executive Summary</h2>
        <p>Prompt Engineering hat sich von einer Nischenkompetenz zur strategischen Kernfähigkeit entwickelt. Unternehmen, die systematisch optimierte Prompts einsetzen, berichten von 40–70 % kürzeren Bearbeitungszeiten bei gleichzeitig höherer Ausgabequalität. Diese Analyse destilliert die effektivsten Techniken und ordnet sie nach Einsatzgebiet und Lernaufwand.</p>

        <h2>1. Chain-of-Thought (CoT) Prompting</h2>
        <p>CoT-Prompting fordert das Modell auf, seinen Denkprozess schrittweise darzulegen. Dies verbessert nachweislich komplexe Reasoning-Aufgaben.</p>
        <h3>Einsatzgebiete</h3>
        <ul>
          <li>Juristische Sachverhaltsanalysen</li>
          <li>Finanzmodelle und Kalkulationen</li>
          <li>Diagnose-Workflows im IT-Support</li>
          <li>Strategische Entscheidungsmodelle</li>
        </ul>
        <h3>Effektivitätsbewertung</h3>
        <p>In unseren Tests mit 50 Geschäftsszenarien lieferte CoT bei GPT-4o eine Verbesserung der Antwortgenauigkeit von <strong>38 %</strong> gegenüber direkten Prompts ohne Reasoning-Aufforderung.</p>
        <h3>Vorlage</h3>
        <pre><code>Analysiere das folgende Problem Schritt für Schritt:
[PROBLEM]
Schritt 1: Identifiziere die Kernfrage.
Schritt 2: Liste relevante Faktoren auf.
Schritt 3: Bewerte jeden Faktor.
Schritt 4: Ziehe eine begründete Schlussfolgerung.</code></pre>

        <h2>2. Few-Shot Learning</h2>
        <p>Few-Shot Prompts liefern 3–5 Beispiele im Prompt, um das gewünschte Ausgabeformat zu demonstrieren. Ideal für konsistente Texte in Corporate Language.</p>
        <h3>Messergebnisse</h3>
        <p>Formatkonformität steigt von 62 % (Zero-Shot) auf 91 % (5-Shot) bei Aufgaben mit spezifischen Stilanforderungen.</p>

        <h2>3. ReAct-Prompting (Reason + Act)</h2>
        <p>ReAct kombiniert Reasoning und Action-Planung in einem einzigen Prompt-Zyklus. Besonders wertvoll für agentenbasierte Automatisierungen.</p>
        <p>Muster: <em>Thought → Action → Observation → Thought → ...</em></p>

        <h2>4. Strukturierte Ausgabe-Formate</h2>
        <p>JSON-Mode und XML-strukturierte Outputs reduzieren Post-Processing-Aufwand um bis zu 80 % in Automatisierungs-Pipelines.</p>
        <h3>Empfehlung</h3>
        <p>Verwenden Sie strukturierte Ausgaben immer dann, wenn die Antwort maschinell weiterverarbeitet wird. Für rein textuelle Ausgaben (Berichte, E-Mails) sind Markdown-Formate ausreichend.</p>

        <h2>5. System-Prompt-Optimierung</h2>
        <p>Ein gut strukturierter System-Prompt reduziert halluzinationsbedingte Fehler um durchschnittlich 55 %. Schlüsselelemente:</p>
        <ul>
          <li><strong>Rollendefiniton:</strong> Klare Persona und Expertise</li>
          <li><strong>Scope-Begrenzung:</strong> Was der Bot tut und was nicht</li>
          <li><strong>Ausgabe-Regeln:</strong> Sprache, Format, Länge</li>
          <li><strong>Anti-Halluzinations-Klausel:</strong> "Wenn unsicher, sage es explizit"</li>
          <li><strong>Sicherheitsregeln:</strong> Was niemals ausgegeben werden darf</li>
        </ul>

        <h2>6. Benchmarks nach Modell</h2>
        <table>
          <thead><tr><th>Technik</th><th>GPT-4o</th><th>Claude 3.5</th><th>Mistral Large</th></tr></thead>
          <tbody>
            <tr><td>CoT</td><td>+38%</td><td>+41%</td><td>+29%</td></tr>
            <tr><td>Few-Shot (5)</td><td>+29%</td><td>+33%</td><td>+27%</td></tr>
            <tr><td>ReAct</td><td>+44%</td><td>+48%</td><td>+31%</td></tr>
            <tr><td>Strukturierter Output</td><td>+61%</td><td>+58%</td><td>+52%</td></tr>
          </tbody>
        </table>

        <h2>7. Empfehlungen nach Einsatzgebiet</h2>
        <h3>Kundenservice</h3>
        <p>Few-Shot + Persona-Prompt. Fokus auf konsistenten Ton und schnelle Resolution.</p>
        <h3>Rechtliche Prüfung</h3>
        <p>CoT-Pflicht + Anti-Halluzinations-Klausel. Keine finalen Rechtsaussagen ohne menschliche Prüfung.</p>
        <h3>Content-Erstellung</h3>
        <p>Few-Shot mit Marken-Beispielen + Stil-Guide im System-Prompt.</p>
        <h3>Datenanalyse</h3>
        <p>Strukturierter JSON-Output + ReAct für mehrstufige Analysen.</p>

        <h2>Fazit</h2>
        <p>Die Kombination aus CoT + strukturiertem Output + optimiertem System-Prompt liefert in 82 % der Szenarien die besten Ergebnisse. Investieren Sie 2–4 Stunden in Prompt-Templates für Ihre häufigsten Anwendungsfälle – die Rendite ist messbar und nachhaltig.</p>
      </div>
    `
  },

  {
    id: 'analyse-ki-agenten-systeme-2025',
    title: 'KI-Agenten-Systeme: Marktüberblick und Einsatzszenarien 2025',
    shortDesc: 'Vergleichende Analyse von AutoGPT, CrewAI, LangGraph und kommerziellen Agenten-Plattformen. Mit Bewertungsmatrix für Unternehmenseinsatz.',
    fullDesc: 'Agenten-basierte KI-Systeme revolutionieren Automatisierungsprozesse. Diese Studie vergleicht 8 führende Agenten-Frameworks nach Stabilität, Kosten, Integrationsfähigkeit und Einsatzreife. Inklusive Fallstudien aus E-Commerce, Recht und Finanzbereich.',
    category: 'KI & Automatisierung',
    lastUpdated: '2025-02-15',
    pageCount: 28,
    price: 2400,
    currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_analyse_agenten2025',
    stripeProductId: 'prod_PLACEHOLDER_analyse_agenten2025',
    badge: 'Bestseller',
    active: true,
    previewHtml: `
      <h2>Warum Agenten-Systeme 2025 entscheidend sind</h2>
      <p>Während klassische Chatbots einzelne Fragen beantworten, führen Agenten-Systeme mehrstufige Aufgaben autonom aus: Recherche → Analyse → Entscheidung → Aktion. Diese Studie hilft Ihnen, das richtige Framework für Ihre Anforderungen zu wählen.</p>
    `,
    contentHtml: `
      <div class="analyse-content">
        <h1>KI-Agenten-Systeme: Marktüberblick und Einsatzszenarien 2025</h1>
        <p class="text-slate-500 text-sm mb-8">Letzte Aktualisierung: 15. Februar 2025 · 28 Seiten · Kategorie: KI &amp; Automatisierung</p>

        <h2>Executive Summary</h2>
        <p>KI-Agenten-Systeme haben 2024/25 den Sprung von der Forschung in die Praxis vollzogen. Unternehmen setzen sie für Marktrecherchen, Dokumentenanalysen, Customer Journey Automation und interne Wissensmanagement-Aufgaben ein. Diese Analyse bewertet 8 führende Frameworks und gibt Empfehlungen für verschiedene Unternehmensgrößen.</p>

        <h2>1. Bewertete Frameworks im Überblick</h2>
        <table>
          <thead><tr><th>Framework</th><th>Typ</th><th>Reifegrad</th><th>Kosten</th><th>Empfehlung</th></tr></thead>
          <tbody>
            <tr><td>LangGraph</td><td>Open Source</td><td>★★★★★</td><td>Gering</td><td>Enterprise</td></tr>
            <tr><td>CrewAI</td><td>Open Source</td><td>★★★★☆</td><td>Gering</td><td>Mittelstand</td></tr>
            <tr><td>AutoGPT</td><td>Open Source</td><td>★★★☆☆</td><td>Gering</td><td>Experimente</td></tr>
            <tr><td>OpenAI Assistants</td><td>API</td><td>★★★★★</td><td>Mittel</td><td>Schnelle Deployments</td></tr>
            <tr><td>Microsoft Copilot Studio</td><td>SaaS</td><td>★★★★☆</td><td>Hoch</td><td>Microsoft-Ökosystem</td></tr>
            <tr><td>Vertex AI Agents</td><td>Cloud</td><td>★★★★☆</td><td>Mittel</td><td>Google-Ökosystem</td></tr>
            <tr><td>Relevance AI</td><td>No-Code</td><td>★★★★☆</td><td>Mittel</td><td>Nicht-Entwickler</td></tr>
            <tr><td>n8n AI Agents</td><td>Hybrid</td><td>★★★☆☆</td><td>Gering</td><td>Workflow-Automation</td></tr>
          </tbody>
        </table>

        <h2>2. LangGraph – Der Enterprise-Standard</h2>
        <p>LangGraph von LangChain ist 2025 zum De-facto-Standard für komplexe Agenten-Workflows geworden. Durch den graphbasierten Ansatz lassen sich verzweigte Entscheidungslogiken präzise modellieren.</p>
        <h3>Stärken</h3>
        <ul>
          <li>Vollständige Kontrolle über Zustandsmanagement</li>
          <li>Einfaches Debugging durch State-Visualisierung</li>
          <li>Nahtlose Integration mit allen LLM-Providern</li>
          <li>Human-in-the-Loop Unterstützung nativ</li>
        </ul>
        <h3>Schwächen</h3>
        <ul>
          <li>Steile Lernkurve für Python-Neulinge</li>
          <li>Kein eingebautes UI – erfordert Frontend-Entwicklung</li>
        </ul>

        <h2>3. CrewAI – Rollenbasierte Multi-Agenten-Systeme</h2>
        <p>CrewAI ermöglicht die einfache Definition von "Crews" – Teams aus spezialisierten KI-Agenten mit klar definierten Rollen (Researcher, Writer, Analyst etc.).</p>
        <h3>Praxisbeispiel: Wettbewerbs-Monitoring</h3>
        <p>Eine Crew aus 3 Agenten (Researcher → Analyst → Report Writer) kann täglich Wettbewerbs-Updates automatisch sammeln, analysieren und als strukturierten Report ausgeben. Implementierungszeit: ~8 Stunden.</p>

        <h2>4. Fallstudie: E-Commerce Retourenmanagement</h2>
        <p>Ein mittelständischer Online-Händler setzte CrewAI für Retourenentscheidungen ein:</p>
        <ul>
          <li><strong>Situation:</strong> 1.200 Retouren/Monat, 3 Mitarbeiter für Bearbeitung</li>
          <li><strong>Lösung:</strong> 3-Agenten-Crew (Klassifizierer → Regelprüfer → Entscheider)</li>
          <li><strong>Ergebnis:</strong> 74 % der Fälle vollautomatisch gelöst, Bearbeitungszeit -68 %</li>
          <li><strong>ROI:</strong> Amortisation nach 4,5 Monaten</li>
        </ul>

        <h2>5. Entscheidungsmatrix: Framework-Auswahl</h2>
        <p>Wählen Sie Ihr Framework basierend auf diesen Kriterien:</p>
        <ul>
          <li><strong>Entwickler-Team vorhanden + komplexe Logik:</strong> LangGraph</li>
          <li><strong>Schneller Start + rollenbasiert:</strong> CrewAI</li>
          <li><strong>Kein Code, schnelle Deployments:</strong> OpenAI Assistants API</li>
          <li><strong>Microsoft-Infrastruktur:</strong> Copilot Studio</li>
          <li><strong>Bestehende n8n-Workflows erweitern:</strong> n8n AI Agents</li>
        </ul>

        <h2>6. Risiken und Limitationen</h2>
        <ul>
          <li><strong>Halluzinationen:</strong> Agenten können falsche Informationen als Fakten darstellen → Human-in-the-Loop für kritische Entscheidungen</li>
          <li><strong>Kosten-Eskalation:</strong> Schlecht optimierte Agenten erzeugen exzessive API-Calls → Token-Budget-Limits setzen</li>
          <li><strong>Sicherheit:</strong> Prompt Injection in Multi-Agenten-Systemen ist ein reales Risiko → Input-Sanitization implementieren</li>
        </ul>

        <h2>Fazit und Ausblick</h2>
        <p>KI-Agenten-Systeme werden 2025/26 zum Standard-Werkzeug für Wissensarbeit. Empfehlung: Starten Sie mit einem überschaubaren Use-Case (z.B. Wettbewerbs-Monitoring oder Dokumenten-Zusammenfassung) und evaluieren Sie zunächst CrewAI oder die OpenAI Assistants API vor einem vollständigen Enterprise-Rollout mit LangGraph.</p>
      </div>
    `
  },

  // ════════════════════════════════════════════════════════
  // MARKTANALYSE
  // ════════════════════════════════════════════════════════
  {
    id: 'analyse-ki-markt-dach-2025',
    title: 'KI-Markt DACH 2025: Adoption, Investitionen und Wachstumssegmente',
    shortDesc: 'Datenbasierte Analyse der KI-Marktentwicklung in Deutschland, Österreich und Schweiz. Kennzahlen, Branchen-Trends und Investitionsvolumen 2024–2027.',
    fullDesc: 'Auf Basis öffentlicher Berichte (Bitkom, McKinsey, IDC, Fraunhofer) fasst diese Analyse die KI-Adoption im DACH-Raum zusammen: Welche Branchen führen, wo liegen Nachholpotenziale, und welche Investitionsvolumen sind bis 2027 zu erwarten.',
    category: 'Marktanalyse',
    lastUpdated: '2025-01-20',
    pageCount: 22,
    price: 1500,
    currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_analyse_kidach2025',
    stripeProductId: 'prod_PLACEHOLDER_analyse_kidach2025',
    active: true,
    previewHtml: `
      <h2>Überblick: KI im DACH-Raum</h2>
      <p>Der DACH-KI-Markt wächst 2025 mit 31 % CAGR – schneller als der EU-Durchschnitt von 27 %. Diese Analyse zeigt, welche Segmente führen und wo die größten Chancen für KMU liegen.</p>
    `,
    contentHtml: `
      <div class="analyse-content">
        <h1>KI-Markt DACH 2025: Adoption, Investitionen und Wachstumssegmente</h1>
        <p class="text-slate-500 text-sm mb-8">Letzte Aktualisierung: 20. Januar 2025 · 22 Seiten · Kategorie: Marktanalyse</p>

        <h2>Executive Summary</h2>
        <p>Der KI-Markt im DACH-Raum erreicht 2025 ein Volumen von ca. 8,2 Mrd. EUR. Deutschland nimmt mit 5,9 Mrd. EUR die Führungsposition ein, gefolgt von der Schweiz (1,5 Mrd.) und Österreich (0,8 Mrd.). Die Wachstumsrate liegt 2025 bei 31 % CAGR.</p>

        <h2>1. Branchen-Adoption: Wer führt, wer zögert</h2>
        <table>
          <thead><tr><th>Branche</th><th>Adoptionsgrad</th><th>Hauptanwendung</th><th>Wachstumspotenzial</th></tr></thead>
          <tbody>
            <tr><td>Finanzdienstleistungen</td><td>72 %</td><td>Risikomodelle, Compliance</td><td>Mittel</td></tr>
            <tr><td>Gesundheitswesen</td><td>38 %</td><td>Diagnostik, Dokumentation</td><td>Sehr hoch</td></tr>
            <tr><td>Fertigung / Industrie</td><td>55 %</td><td>Predictive Maintenance</td><td>Hoch</td></tr>
            <tr><td>Handel / E-Commerce</td><td>61 %</td><td>Personalisierung, Support</td><td>Hoch</td></tr>
            <tr><td>Recht & Steuer</td><td>29 %</td><td>Dokumentenanalyse</td><td>Sehr hoch</td></tr>
            <tr><td>Bildung</td><td>22 %</td><td>Personalisiertes Lernen</td><td>Sehr hoch</td></tr>
          </tbody>
        </table>

        <h2>2. Investitionsvolumen 2024–2027 (Prognose)</h2>
        <p>Gesamtinvestitionen in KI-Infrastruktur und -Software im DACH-Raum:</p>
        <ul>
          <li><strong>2024:</strong> 6,3 Mrd. EUR (IST)</li>
          <li><strong>2025:</strong> 8,2 Mrd. EUR (Prognose)</li>
          <li><strong>2026:</strong> 10,8 Mrd. EUR (Prognose)</li>
          <li><strong>2027:</strong> 14,1 Mrd. EUR (Prognose)</li>
        </ul>
        <p>Treiber: Generative KI (42 % des Zuwachses), MLOps-Infrastruktur (28 %), Edge AI (18 %).</p>

        <h2>3. Top-5 Wachstumssegmente für KMU</h2>
        <ol>
          <li><strong>KI-gestützte Kundenkommunikation</strong> – Chatbots, automatische E-Mail-Bearbeitung</li>
          <li><strong>Dokumentenautomatisierung</strong> – Vertragsanalyse, Rechnungsverarbeitung</li>
          <li><strong>Predictive Analytics</strong> – Nachfrageprognosen, Lageroptimierung</li>
          <li><strong>KI im Recruiting</strong> – CV-Screening, Interview-Vorbereitung</li>
          <li><strong>Compliance & Risikomonitoring</strong> – DSGVO, NIS2, EU AI Act</li>
        </ol>

        <h2>4. EU AI Act: Auswirkungen auf DACH-Unternehmen</h2>
        <p>Der EU AI Act ist seit August 2024 in Kraft und wird ab August 2026 vollständig angewendet. Für DACH-Unternehmen bedeutet dies:</p>
        <ul>
          <li>Hochrisiko-KI-Systeme (HR, Kreditentscheidungen, Strafverfolgung) benötigen Konformitätsbewertungen</li>
          <li>Transparenzpflichten für KI-generierte Inhalte gelten bereits ab Februar 2025</li>
          <li>Bußgelder bis 35 Mio. EUR oder 7 % des Jahresumsatzes bei Verstößen</li>
        </ul>

        <h2>5. Barometerwerte: DACH vs. EU-Benchmark</h2>
        <table>
          <thead><tr><th>Indikator</th><th>DACH 2025</th><th>EU Ø 2025</th></tr></thead>
          <tbody>
            <tr><td>KI-Investitionsintensität (% BIP)</td><td>0,31 %</td><td>0,24 %</td></tr>
            <tr><td>KI-Fachkräftemangel (offene Stellen)</td><td>~58.000</td><td>~380.000</td></tr>
            <tr><td>KMU-Adoptionsgrad</td><td>34 %</td><td>28 %</td></tr>
            <tr><td>Datenschutz-Compliance-Rate</td><td>81 %</td><td>67 %</td></tr>
          </tbody>
        </table>

        <h2>Fazit</h2>
        <p>Der DACH-Raum ist gut positioniert, leidet jedoch unter Fachkräftemangel und regulatorischer Unsicherheit. KMU sollten 2025 in Dokumentenautomatisierung und Kundenkommunikation einsteigen – diese Bereiche zeigen den schnellsten ROI bei überschaubarem Compliance-Aufwand.</p>
      </div>
    `
  },

  // ════════════════════════════════════════════════════════
  // RECHT & COMPLIANCE
  // ════════════════════════════════════════════════════════
  {
    id: 'analyse-eu-ai-act-compliance-2025',
    title: 'EU AI Act Compliance Guide 2025: Was Unternehmen jetzt tun müssen',
    shortDesc: 'Praxisorientierte Analyse der EU AI Act Anforderungen mit Handlungsempfehlungen für KMU. Risikoeinstufungen, Pflichten und Fristen bis 2026.',
    fullDesc: 'Der EU AI Act verpflichtet Unternehmen ab 2025 zu umfassenden KI-Governance-Maßnahmen. Diese Analyse erklärt die Risikoklassen, Pflichten für Anbieter und Nutzer, Fristen und konkrete Compliance-Schritte für kleine und mittelständische Unternehmen in Deutschland.',
    category: 'Recht & Compliance',
    lastUpdated: '2025-02-28',
    pageCount: 31,
    price: 2200,
    currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_analyse_aiact2025',
    stripeProductId: 'prod_PLACEHOLDER_analyse_aiact2025',
    badge: 'Wichtig',
    active: true,
    previewHtml: `
      <h2>EU AI Act: Die wichtigsten Fristen im Überblick</h2>
      <p>Ab Februar 2025 gelten erste Transparenzpflichten. Ab August 2026 müssen alle Hochrisiko-KI-Systeme konform sein. Diese Analyse führt Sie Schritt für Schritt durch die Anforderungen.</p>
    `,
    contentHtml: `
      <div class="analyse-content">
        <h1>EU AI Act Compliance Guide 2025: Was Unternehmen jetzt tun müssen</h1>
        <p class="text-slate-500 text-sm mb-8">Letzte Aktualisierung: 28. Februar 2025 · 31 Seiten · Kategorie: Recht &amp; Compliance</p>

        <h2>Executive Summary</h2>
        <p>Der EU AI Act (Verordnung (EU) 2024/1689) ist das weltweit erste umfassende KI-Regelwerk und trat am 1. August 2024 in Kraft. Die Regelungen werden schrittweise angewendet. Für die meisten Unternehmen bedeutet das: Jetzt handeln, um Strafzahlungen bis 2026 zu vermeiden.</p>

        <h2>1. Zeitplan und Fristen</h2>
        <table>
          <thead><tr><th>Datum</th><th>Was gilt ab dann</th></tr></thead>
          <tbody>
            <tr><td>Aug. 2024</td><td>Inkrafttreten des EU AI Act</td></tr>
            <tr><td>Feb. 2025</td><td>Verbote für inakzeptable KI-Risiken in Kraft (Art. 5)</td></tr>
            <tr><td>Aug. 2025</td><td>Regeln für GPAI-Modelle (Allzweck-KI wie GPT-4, Gemini)</td></tr>
            <tr><td>Aug. 2026</td><td>Vollständige Anwendung für Hochrisiko-KI-Systeme</td></tr>
            <tr><td>Aug. 2027</td><td>Übergangsfrist für Altanlagen endet</td></tr>
          </tbody>
        </table>

        <h2>2. Risikoklassen – Wo fällt Ihr System rein?</h2>
        <h3>Klasse 1: Inakzeptables Risiko (verboten)</h3>
        <ul>
          <li>Social Scoring durch Behörden</li>
          <li>Biometrische Massenüberwachung in Echtzeit</li>
          <li>Subliminale Manipulation</li>
        </ul>

        <h3>Klasse 2: Hohes Risiko (streng reguliert)</h3>
        <ul>
          <li>KI in HR-Entscheidungen (Recruiting, Entlassung)</li>
          <li>Kreditwürdigkeitsprüfungen</li>
          <li>Kritische Infrastruktur</li>
          <li>Biometrische Identifikation</li>
          <li>Bildungs- und Berufsausbildungssysteme</li>
        </ul>
        <p><strong>Pflichten für Hochrisiko-KI:</strong> Risikomanagement-System, Daten-Governance, technische Dokumentation, Transparenz gegenüber Nutzern, menschliche Aufsicht, Robustheit und Cybersicherheit.</p>

        <h3>Klasse 3: Begrenztes Risiko (Transparenzpflichten)</h3>
        <ul>
          <li>Chatbots müssen sich als KI zu erkennen geben</li>
          <li>Deepfakes müssen als solche gekennzeichnet werden</li>
          <li>KI-generierte Texte in bestimmten Kontexten kennzeichnen</li>
        </ul>

        <h3>Klasse 4: Minimales Risiko (kaum Pflichten)</h3>
        <p>Spam-Filter, KI-gestützte Suche, Empfehlungssysteme ohne relevante gesellschaftliche Auswirkung.</p>

        <h2>3. Pflichten für KMU als KI-Nutzer (Deployer)</h2>
        <p>Wenn Sie ein KI-System von einem Anbieter kaufen/lizenzieren und in Ihrer Organisation einsetzen, sind Sie ein "Deployer" mit folgenden Pflichten:</p>
        <ul>
          <li>Nutzungsbeschränkungen des Anbieters einhalten</li>
          <li>Mitarbeiter schulen (technische und rechtliche Aspekte)</li>
          <li>Bei Hochrisiko-KI: Risikofolgeabschätzung durchführen</li>
          <li>Menschliche Aufsicht sicherstellen</li>
          <li>Grundrechts-Folgeabschätzung bei bestimmten Systemen</li>
        </ul>

        <h2>4. Konkrete Compliance-Schritte für KMU</h2>
        <ol>
          <li><strong>KI-Inventar erstellen:</strong> Alle eingesetzten KI-Systeme dokumentieren (ChatGPT, Copilot, interne Tools)</li>
          <li><strong>Risikoklasse bestimmen:</strong> Für jedes System prüfen, ob es unter Hochrisiko fällt</li>
          <li><strong>Transparenzpflichten umsetzen:</strong> Chatbots als KI kennzeichnen (ab Feb. 2025 Pflicht)</li>
          <li><strong>Richtlinien entwickeln:</strong> Interne KI-Nutzungsrichtlinie erstellen</li>
          <li><strong>Schulungen durchführen:</strong> Mitarbeiter zu KI-Grenzen und -Risiken schulen</li>
          <li><strong>Verträge prüfen:</strong> SaaS-Verträge auf AI-Act-Konformität der Anbieter prüfen</li>
        </ol>

        <h2>5. Bußgelder und Haftung</h2>
        <table>
          <thead><tr><th>Verstoß</th><th>Maximales Bußgeld</th></tr></thead>
          <tbody>
            <tr><td>Verbotene KI-Praktiken (Art. 5)</td><td>35 Mio. EUR oder 7 % Jahresumsatz</td></tr>
            <tr><td>Hochrisiko-KI ohne Compliance</td><td>15 Mio. EUR oder 3 % Jahresumsatz</td></tr>
            <tr><td>Falsche Informationen gegenüber Behörden</td><td>7,5 Mio. EUR oder 1,5 % Jahresumsatz</td></tr>
          </tbody>
        </table>

        <h2>Fazit</h2>
        <p>Die meisten KMU fallen in Risikoklasse 3 (begrenztes Risiko) oder nutzen Hochrisiko-KI als Deployer. Priorität 1: KI-Inventar erstellen und Chatbots kennzeichnen (sofort). Priorität 2: Interne Richtlinien und Mitarbeiterschulungen (bis Q3 2025). Für Hochrisiko-Anwendungen professionellen Rechtsbeistand hinzuziehen.</p>
      </div>
    `
  },

  // ════════════════════════════════════════════════════════
  // BUSINESS & STRATEGIE
  // ════════════════════════════════════════════════════════
  {
    id: 'analyse-ki-roi-messung-2025',
    title: 'KI-ROI Messung: Wie Sie den Wertbeitrag von KI-Projekten quantifizieren',
    shortDesc: 'Methodenvergleich für die Bewertung von KI-Investitionen. Kennzahlen-Framework, Fallstricke und Praxisbeispiele aus 12 DACH-Unternehmen.',
    fullDesc: 'Viele KI-Projekte scheitern nicht an der Technologie, sondern an der fehlenden Erfolgsmessung. Diese Analyse stellt ein praxisbewährtes ROI-Framework vor, zeigt häufige Messfehler und dokumentiert reale Ergebnisse aus 12 DACH-Unternehmen aus Handel, Industrie und Dienstleistung.',
    category: 'Business & Strategie',
    lastUpdated: '2025-01-10',
    pageCount: 19,
    price: 1700,
    currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_analyse_kiroi2025',
    stripeProductId: 'prod_PLACEHOLDER_analyse_kiroi2025',
    active: true,
    previewHtml: `
      <h2>Das Problem: KI-Projekte ohne klare Erfolgskennzahlen</h2>
      <p>67 % der KI-Projekte in DACH-Unternehmen haben keine definierten ROI-Ziele. Das führt zu Ernüchterung und vorzeitigem Projektabbruch – obwohl die Technologie funktioniert. Diese Analyse zeigt, wie es besser geht.</p>
    `,
    contentHtml: `
      <div class="analyse-content">
        <h1>KI-ROI Messung: Wie Sie den Wertbeitrag von KI-Projekten quantifizieren</h1>
        <p class="text-slate-500 text-sm mb-8">Letzte Aktualisierung: 10. Januar 2025 · 19 Seiten · Kategorie: Business &amp; Strategie</p>

        <h2>Executive Summary</h2>
        <p>KI-Investitionen lassen sich messen – aber nicht mit klassischen IT-ROI-Methoden. KI schafft Wert auf drei Ebenen: Effizienzgewinne (direkt messbar), Qualitätsverbesserungen (indirekt messbar) und strategische Optionalität (schwer quantifizierbar, aber real). Dieses Framework deckt alle drei ab.</p>

        <h2>1. Das KI-ROI-Framework (5 Dimensionen)</h2>
        <h3>Dimension 1: Zeit-Effizienz</h3>
        <p>Berechnung: (Manuelle Bearbeitungszeit − KI-Bearbeitungszeit) × Stundensatz × Volumen</p>
        <p>Typische Werte: 40–80 % Zeitersparnis bei Dokumentenverarbeitung, 25–50 % bei Texterstellung.</p>

        <h3>Dimension 2: Fehlerreduktion</h3>
        <p>Berechnung: (Fehlerrate vorher − Fehlerrate nachher) × Kosten pro Fehler × Volumen</p>
        <p>Besonders relevant in: Buchhaltung, Compliance, Qualitätssicherung, Medizin.</p>

        <h3>Dimension 3: Skalierbarkeit</h3>
        <p>Berechnung: Wert der zusätzlich bearbeiteten Einheiten ohne proportionalen Personalaufbau.</p>
        <p>KI-Systeme skalieren bei ~0 Grenzkosten – klassische Mitarbeiter nicht.</p>

        <h3>Dimension 4: Kundenzufriedenheit</h3>
        <p>Messung: NPS-Delta nach KI-Einführung, Wartezeit-Reduktion, First-Contact-Resolution-Rate.</p>

        <h3>Dimension 5: Strategische Optionalität</h3>
        <p>Wert der Daten, Erfahrungen und Fähigkeiten, die durch KI-Projekte aufgebaut werden. Schwerste Dimension, aber oft die wertvollste langfristig.</p>

        <h2>2. Häufige Messfehler</h2>
        <ul>
          <li><strong>Fehler 1:</strong> Nur Einsparziele, keine Wachstumsziele messen</li>
          <li><strong>Fehler 2:</strong> Baseline nicht korrekt erfasst (voher/nachher-Vergleich fehlerhaft)</li>
          <li><strong>Fehler 3:</strong> Change-Management-Kosten nicht einkalkuliert</li>
          <li><strong>Fehler 4:</strong> Kurzfristige Produktivitätsdelle während Einführung nicht eingeplant</li>
          <li><strong>Fehler 5:</strong> Soft-Benefits ignoriert (Mitarbeiterzufriedenheit, Qualitätswahrnehmung)</li>
        </ul>

        <h2>3. Fallbeispiele aus DACH-Unternehmen</h2>
        <h3>Fall 1: E-Commerce (Mittelstand, 85 MA)</h3>
        <p>KI-Einführung: Automatisierte Produktbeschreibungen + KI-Kundenservice</p>
        <ul>
          <li>Investition: 18.000 EUR (Setup + 12 Monate Betrieb)</li>
          <li>Einsparung Texterstellung: 2.800 EUR/Monat</li>
          <li>Einsparung Kundenservice: 1.400 EUR/Monat</li>
          <li>Umsatzsteigerung durch bessere Produktbeschreibungen: +4,2 %</li>
          <li>ROI nach 12 Monaten: 287 %</li>
        </ul>

        <h3>Fall 2: Steuerberatung (8 MA)</h3>
        <p>KI-Einführung: Dokumentenanalyse + Mandantenkommunikation</p>
        <ul>
          <li>Investition: 6.400 EUR</li>
          <li>Zeitersparnis: 6 Stunden/Woche × 120 EUR = 37.440 EUR/Jahr</li>
          <li>Zusätzliche Mandanten durch Kapazität: +3 (ca. 12.000 EUR/Jahr)</li>
          <li>ROI nach 12 Monaten: 773 %</li>
        </ul>

        <h2>4. ROI-Kalkulations-Tool (Grundgerüst)</h2>
        <pre><code>Monatlicher Nutzen:
  Zeitersparnis (Std./Mo.) × Stundensatz = €___
  Fehlerreduktion × Kosten/Fehler = €___
  Zusatzumsatz = €___
  
Monatliche Kosten:
  Lizenzkosten = €___
  Personalzeit Pflege (Std.) × Stundensatz = €___
  
Monatlicher Netto-ROI = Nutzen − Kosten
Break-Even = Setup-Kosten / Monatlicher Netto-ROI</code></pre>

        <h2>Fazit</h2>
        <p>KI-ROI ist messbar, wenn Sie die richtigen Kennzahlen von Anfang an definieren. Unsere Empfehlung: Messen Sie immer mindestens Dimension 1 (Zeit) und Dimension 3 (Skalierbarkeit) – diese sind am leichtesten zu quantifizieren und überzeugen auch skeptische Entscheidungsträger.</p>
      </div>
    `
  },

  // ════════════════════════════════════════════════════════
  // FINANZANALYSE
  // ════════════════════════════════════════════════════════
  {
    id: 'analyse-ki-tools-kostenvergleich-2025',
    title: 'KI-Tools Kostenvergleich 2025: Was wirklich günstiger ist',
    shortDesc: 'Detaillierter Preisvergleich aller wichtigen KI-Tools (ChatGPT, Claude, Gemini, Copilot) für Freelancer, KMU und Enterprise. Mit TCO-Kalkulation.',
    fullDesc: 'API-Preise ändern sich schnell, Flat-Rate-Abos verstecken Limits, Enterprise-Tarife verhandeln Sie besser als gedacht. Diese Analyse vergleicht alle aktuellen Pricing-Modelle der Top-KI-Plattformen und hilft Ihnen, die kostenoptimale Kombination für Ihr Nutzungsvolumen zu finden.',
    category: 'Finanzanalyse',
    lastUpdated: '2025-03-10',
    pageCount: 16,
    price: 1200,
    currency: 'eur',
    stripePriceId: 'price_PLACEHOLDER_analyse_kikosten2025',
    stripeProductId: 'prod_PLACEHOLDER_analyse_kikosten2025',
    badge: 'Aktuell',
    active: true,
    previewHtml: `
      <h2>Die Preisfalle: Warum viele Unternehmen zu viel zahlen</h2>
      <p>Ein mittelständisches Unternehmen mit 20 KI-Nutzern kann je nach Tool-Kombination zwischen 380 EUR und 1.840 EUR monatlich zahlen – bei identischer Nutzung. Diese Analyse zeigt die Unterschiede und die optimale Strategie.</p>
    `,
    contentHtml: `
      <div class="analyse-content">
        <h1>KI-Tools Kostenvergleich 2025: Was wirklich günstiger ist</h1>
        <p class="text-slate-500 text-sm mb-8">Letzte Aktualisierung: 10. März 2025 · 16 Seiten · Kategorie: Finanzanalyse</p>

        <h2>Executive Summary</h2>
        <p>Die KI-Tool-Landschaft hat sich 2024/25 durch aggressive Preisänderungen und neue Tarife verändert. OpenAI, Anthropic und Google kämpfen mit Preisreduktionen um Marktanteile – zum Vorteil der Nutzer, aber zur Verwirrung bei der Tool-Wahl. Diese Analyse bringt Klarheit.</p>

        <h2>1. Flat-Rate-Abos im Vergleich (Stand März 2025)</h2>
        <table>
          <thead><tr><th>Tool</th><th>Free</th><th>Pro/Plus</th><th>Team</th><th>Enterprise</th></tr></thead>
          <tbody>
            <tr><td>ChatGPT (OpenAI)</td><td>Ja (GPT-4o mini)</td><td>€20/Mo</td><td>€25/Nutzer</td><td>Custom</td></tr>
            <tr><td>Claude (Anthropic)</td><td>Ja (Claude 3 Haiku)</td><td>€18/Mo</td><td>€25/Nutzer</td><td>Custom</td></tr>
            <tr><td>Gemini (Google)</td><td>Ja (Gemini 1.5 Flash)</td><td>€19/Mo</td><td>€20/Nutzer</td><td>Custom</td></tr>
            <tr><td>Microsoft Copilot</td><td>Ja (GPT-4)</td><td>€20/Mo</td><td>€25/Nutzer (M365)</td><td>Custom</td></tr>
            <tr><td>Perplexity AI</td><td>Ja</td><td>€17/Mo</td><td>€25/Nutzer</td><td>Custom</td></tr>
          </tbody>
        </table>

        <h2>2. API-Preise für Entwickler (Input/Output per 1M Tokens)</h2>
        <table>
          <thead><tr><th>Modell</th><th>Input</th><th>Output</th><th>Context</th></tr></thead>
          <tbody>
            <tr><td>GPT-4o</td><td>$2,50</td><td>$10,00</td><td>128K</td></tr>
            <tr><td>GPT-4o mini</td><td>$0,15</td><td>$0,60</td><td>128K</td></tr>
            <tr><td>Claude 3.5 Sonnet</td><td>$3,00</td><td>$15,00</td><td>200K</td></tr>
            <tr><td>Claude 3 Haiku</td><td>$0,25</td><td>$1,25</td><td>200K</td></tr>
            <tr><td>Gemini 1.5 Pro</td><td>$1,25</td><td>$5,00</td><td>2M</td></tr>
            <tr><td>Gemini 1.5 Flash</td><td>$0,075</td><td>$0,30</td><td>1M</td></tr>
            <tr><td>Mistral Large</td><td>$2,00</td><td>$6,00</td><td>128K</td></tr>
          </tbody>
        </table>

        <h2>3. TCO-Szenarien (Total Cost of Ownership)</h2>
        <h3>Szenario A: Freelancer (Solo, 40h/Mo KI-Nutzung)</h3>
        <p>Empfehlung: Claude Pro (€18/Mo) für komplexe Texte + Gemini Free für Recherche</p>
        <p>Monatliche Kosten: €18 | Jahreskosten: €216</p>

        <h3>Szenario B: KMU mit 10 Nutzern (gemischte Nutzung)</h3>
        <p>Empfehlung: ChatGPT Team (€250/Mo) + API-Budget für Entwickler (€80/Mo)</p>
        <p>Monatliche Kosten: €330 | Jahreskosten: €3.960</p>

        <h3>Szenario C: KMU mit 50 Nutzern (intensive Nutzung)</h3>
        <p>Empfehlung: Copilot for Microsoft 365 wenn M365 vorhanden (€0 extra) oder gemischte Lösung</p>
        <p>Monatliche Kosten: €700–1.200 | Jahreskosten: €8.400–14.400</p>

        <h2>4. Versteckte Kosten</h2>
        <ul>
          <li><strong>Rate Limits:</strong> Teams-Tarife haben oft niedrigere Limits als Pro – bei hohem Volumen extra API-Kosten</li>
          <li><strong>Kontextfenster:</strong> Lange Dokumente vervielfachen Kosten – Gemini 1.5 Pro ist hier effizienter</li>
          <li><strong>Einbettungskosten:</strong> RAG-Systeme benötigen zusätzlich Embedding-Kosten (€0,020–0,13 pro 1M Tokens)</li>
          <li><strong>Speicherkosten:</strong> Vectordatenbanken für Knowledge Bases: €20–200/Mo je nach Größe</li>
        </ul>

        <h2>5. Sparstrategien</h2>
        <ol>
          <li>Routing: Einfache Tasks → günstiges Modell (GPT-4o mini, Haiku), komplexe Tasks → starkes Modell</li>
          <li>Caching: Identische Prompts nicht mehrfach senden (OpenAI Prompt Caching: bis 50 % Ersparnis)</li>
          <li>Batch API: Nicht-zeitkritische Tasks günstiger verarbeiten (50 % Rabatt bei OpenAI)</li>
          <li>Jahres-Abos vs. Monatlich: Meist 10–20 % günstiger</li>
        </ol>

        <h2>Fazit</h2>
        <p>Die kostenoptimale Strategie ist immer eine Kombination: Flat-Rate für Alltagsnutzung + API für skalierbare Automatisierungen + Gratis-Tier für Recherche. Wer ein Modell für alles nutzt, zahlt durchschnittlich 40 % zu viel.</p>
      </div>
    `
  },

]

// ── Lookup-Funktionen ─────────────────────────────────────

export function getAnalyseById(id: string): AnalyseEntry | undefined {
  return ANALYSES.find(a => a.id === id && a.active)
}

export function getActiveAnalyses(): AnalyseEntry[] {
  return ANALYSES.filter(a => a.active)
}

export function getAnalysesByCategory(cat: string): AnalyseEntry[] {
  return ANALYSES.filter(a => a.active && a.category === cat)
}

export function getAllAnalyseCategories(): string[] {
  return [...new Set(ANALYSES.filter(a => a.active).map(a => a.category))]
}
