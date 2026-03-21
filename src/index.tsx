// ============================================================
// HAUPTANWENDUNG – Hono App mit allen Routen
// ============================================================

import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { logger } from 'hono/logger'
import type { Bindings } from './types'

// ── Modulare API-Routen (jede mit eigener Verantwortung) ──
import chatRoute    from './routes/api-chat'
import checkoutRoute from './routes/api-checkout'
import licenseRoute  from './routes/api-license'
import webhookRoute  from './routes/api-webhook'

import { PRODUCTS, getProductById, formatPrice } from './lib/products'
import { getBotUIConfig, getAllBotIds } from './lib/bot-registry'

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', logger())

// Statische Dateien
app.use('/static/*', serveStatic({ root: './' }))

// ── API-Routen mounten ────────────────────────────────────
app.route('/api/chat',     chatRoute)
app.route('/api/checkout', checkoutRoute)
app.route('/api/license',  licenseRoute)
app.route('/api/webhook',  webhookRoute)

// ─────────────────────────────────────────────────────────
// Shared Layout
// ─────────────────────────────────────────────────────────
function layout(title: string, content: string, extraHead = ''): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} – KI-Systemprompts Marketplace</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
  ${extraHead}
  <style>
    .gradient-hero { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%); }
    .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    .badge-pulse { animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.7} }
    .btn-primary { background: linear-gradient(135deg, #6366f1, #8b5cf6); transition: all 0.2s; }
    .btn-primary:hover { background: linear-gradient(135deg, #4f46e5, #7c3aed); transform: scale(1.02); }
    .stripe-badge { background: #635bff; }
  </style>
</head>
<body class="bg-slate-50 font-sans antialiased">
  <!-- NAV -->
  <nav class="bg-slate-900 text-white sticky top-0 z-50 shadow-xl">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="/" class="flex items-center gap-2 text-xl font-bold">
        <i class="fas fa-robot text-indigo-400"></i>
        <span>KI<span class="text-indigo-400">Prompts</span>Pro</span>
      </a>
      <div class="hidden md:flex items-center gap-6 text-sm">
        <a href="/#products" class="hover:text-indigo-300 transition-colors">Produkte</a>
        <a href="/bots" class="hover:text-indigo-300 transition-colors">KI-Bots</a>
        <a href="/digital" class="hover:text-indigo-300 transition-colors">eBooks & Kurse</a>
        <a href="/dashboard" class="hover:text-indigo-300 transition-colors">Mein Bereich</a>
      </div>
      <div class="flex items-center gap-3">
        <a href="/dashboard" class="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <i class="fas fa-key mr-1"></i>Lizenzen
        </a>
      </div>
    </div>
  </nav>

  <main>
    ${content}
  </main>

  <!-- FOOTER -->
  <footer class="bg-slate-900 text-slate-400 py-12 mt-20">
    <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
      <div>
        <div class="text-white font-bold text-lg mb-3 flex items-center gap-2">
          <i class="fas fa-robot text-indigo-400"></i> KIPromptsPro
        </div>
        <p class="text-sm">90 professionelle KI-Systemprompts für Ihr Business.</p>
      </div>
      <div>
        <div class="text-white font-semibold mb-3">Produkte</div>
        <ul class="space-y-2 text-sm">
          <li><a href="/bots" class="hover:text-indigo-400 transition-colors">KI-Bots</a></li>
          <li><a href="/digital" class="hover:text-indigo-400 transition-colors">eBooks</a></li>
          <li><a href="/digital" class="hover:text-indigo-400 transition-colors">Kurse</a></li>
        </ul>
      </div>
      <div>
        <div class="text-white font-semibold mb-3">Support</div>
        <ul class="space-y-2 text-sm">
          <li><a href="/dashboard" class="hover:text-indigo-400 transition-colors">Lizenz prüfen</a></li>
          <li><a href="mailto:support@kiprompts.pro" class="hover:text-indigo-400 transition-colors">Kontakt</a></li>
        </ul>
      </div>
      <div>
        <div class="text-white font-semibold mb-3">Rechtliches</div>
        <ul class="space-y-2 text-sm">
          <li><a href="/impressum" class="hover:text-indigo-400 transition-colors">Impressum</a></li>
          <li><a href="/datenschutz" class="hover:text-indigo-400 transition-colors">Datenschutz</a></li>
          <li><a href="/agb" class="hover:text-indigo-400 transition-colors">AGB</a></li>
        </ul>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs">
      <span>© 2024 KIPromptsPro – Alle Rechte vorbehalten</span>
      <div class="flex items-center gap-2">
        <i class="fab fa-cc-stripe text-lg text-indigo-400"></i>
        <span>Sichere Zahlung via Stripe</span>
      </div>
    </div>
  </footer>
</body>
</html>`
}

// ─────────────────────────────────────────────────────────
// STARTSEITE
// ─────────────────────────────────────────────────────────
app.get('/', (c) => {
  const featuredProducts = PRODUCTS.filter(p => p.active && p.badge).slice(0, 6)
  const bots = PRODUCTS.filter(p => p.type === 'bot' && p.active).slice(0, 3)
  const digital = PRODUCTS.filter(p => ['ebook','whitepaper','video'].includes(p.type) && p.active).slice(0, 3)

  const productCard = (p: typeof PRODUCTS[0]) => `
    <div class="card-hover bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
      <div class="bg-gradient-to-br ${p.type === 'bot' ? 'from-indigo-500 to-purple-600' : p.type === 'video' ? 'from-rose-500 to-orange-500' : 'from-emerald-500 to-teal-600'} h-32 flex items-center justify-center">
        <i class="fas ${p.type === 'bot' ? 'fa-robot' : p.type === 'video' ? 'fa-play-circle' : p.type === 'ebook' ? 'fa-book' : 'fa-file-alt'} text-white text-5xl opacity-80"></i>
      </div>
      <div class="p-5">
        <div class="flex items-start justify-between mb-2">
          <span class="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600">${p.category}</span>
          ${p.badge ? `<span class="text-xs font-bold px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 badge-pulse">${p.badge}</span>` : ''}
        </div>
        <h3 class="font-bold text-slate-800 text-lg mt-2 mb-1">${p.name}</h3>
        <p class="text-slate-500 text-sm mb-4 line-clamp-2">${p.description}</p>
        <div class="flex items-center justify-between">
          <div>
            <span class="text-2xl font-bold text-indigo-600">${formatPrice(p.price, p.currency)}</span>
            ${p.pricingType === 'subscription' ? `<span class="text-slate-400 text-sm">/${p.interval === 'month' ? 'Monat' : 'Jahr'}</span>` : '<span class="text-slate-400 text-sm"> einmalig</span>'}
          </div>
          <a href="/product/${p.id}" class="btn-primary text-white px-4 py-2 rounded-xl text-sm font-semibold">
            Kaufen <i class="fas fa-arrow-right ml-1"></i>
          </a>
        </div>
      </div>
    </div>`

  const content = `
    <!-- HERO -->
    <section class="gradient-hero text-white py-24 px-4">
      <div class="max-w-5xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 bg-indigo-600/30 border border-indigo-500/40 px-4 py-2 rounded-full text-sm mb-6">
          <i class="fas fa-sparkles text-indigo-300"></i>
          <span>90 professionelle KI-Systemprompts</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          KI-Power für Ihr<br><span class="text-indigo-400">Business</span>
        </h1>
        <p class="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Einsatzbereite KI-Bots, eBooks, Videokurse und SaaS-Tools. 
          Sofortiger Zugriff nach Zahlung – sicher via Stripe.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#products" class="btn-primary px-8 py-4 rounded-2xl font-bold text-lg">
            <i class="fas fa-rocket mr-2"></i>Produkte entdecken
          </a>
          <a href="/dashboard" class="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all">
            <i class="fas fa-key mr-2"></i>Lizenz prüfen
          </a>
        </div>
        <!-- Trust Badges -->
        <div class="flex flex-wrap justify-center gap-6 mt-12 text-slate-400 text-sm">
          <div class="flex items-center gap-2"><i class="fas fa-shield-alt text-green-400"></i>SSL-verschlüsselt</div>
          <div class="flex items-center gap-2"><i class="fab fa-cc-stripe text-indigo-400"></i>Zahlung via Stripe</div>
          <div class="flex items-center gap-2"><i class="fas fa-bolt text-yellow-400"></i>Sofortiger Zugriff</div>
          <div class="flex items-center gap-2"><i class="fas fa-undo text-blue-400"></i>14 Tage Rückgaberecht</div>
        </div>
      </div>
    </section>

    <!-- KATEGORIEN -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-slate-800 mb-4">Was wir anbieten</h2>
        <p class="text-center text-slate-500 mb-12">Alles was Sie für KI-gestütztes Business brauchen</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          ${[
            { icon: 'fa-robot', label: 'KI-Bots', desc: '90 Systemprompts', color: 'bg-indigo-50 text-indigo-600', href: '/bots' },
            { icon: 'fa-book-open', label: 'eBooks & Guides', desc: 'Sofort-Download', color: 'bg-emerald-50 text-emerald-600', href: '/digital' },
            { icon: 'fa-play-circle', label: 'Videokurse', desc: 'HD-Schulungen', color: 'bg-rose-50 text-rose-600', href: '/digital' },
            { icon: 'fa-file-alt', label: 'Whitepapers', desc: 'B2B-Studien', color: 'bg-amber-50 text-amber-600', href: '/digital' },
          ].map(item => `
            <a href="${item.href}" class="card-hover ${item.color} rounded-2xl p-6 text-center">
              <i class="fas ${item.icon} text-4xl mb-3"></i>
              <div class="font-bold text-slate-800">${item.label}</div>
              <div class="text-slate-500 text-sm">${item.desc}</div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- PRODUKTE -->
    <section id="products" class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-slate-800 mb-4">Bestseller</h2>
        <p class="text-center text-slate-500 mb-12">Unsere meistgekauften Produkte</p>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${[...bots, ...digital].slice(0, 6).map(productCard).join('')}
        </div>
        <div class="text-center mt-10">
          <a href="/bots" class="inline-block mr-4 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
            Alle KI-Bots <i class="fas fa-arrow-right ml-2"></i>
          </a>
          <a href="/digital" class="inline-block bg-slate-200 hover:bg-slate-300 text-slate-800 px-8 py-3 rounded-xl font-semibold transition-colors">
            Alle Kurse & eBooks
          </a>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="py-16 px-4 bg-gradient-to-br from-slate-900 to-indigo-950 text-white">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">So einfach funktioniert es</h2>
        <p class="text-slate-300 mb-12">In 3 Schritten zum sofortigen KI-Zugriff</p>
        <div class="grid md:grid-cols-3 gap-8">
          ${[
            { step: '1', icon: 'fa-cart-shopping', title: 'Produkt wählen', desc: 'Wähle deinen KI-Bot, eBook oder Kurs und klicke auf Kaufen.' },
            { step: '2', icon: 'fa-credit-card', title: 'Sicher bezahlen', desc: 'Zahlung via Stripe – Kreditkarte, SEPA oder andere Methoden.' },
            { step: '3', icon: 'fa-key', title: 'Sofort nutzen', desc: 'Du erhältst deinen Lizenzschlüssel und hast sofortigen Zugriff.' },
          ].map(item => `
            <div class="bg-white/10 rounded-2xl p-8">
              <div class="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">${item.step}</div>
              <i class="fas ${item.icon} text-3xl text-indigo-400 mb-4 block"></i>
              <h3 class="font-bold text-lg mb-2">${item.title}</h3>
              <p class="text-slate-300 text-sm">${item.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>`

  return c.html(layout('Startseite', content))
})

// ─────────────────────────────────────────────────────────
// KI-BOTS Übersicht mit Kategorie-Filter und Suche
// ─────────────────────────────────────────────────────────
app.get('/bots', (c) => {
  const bots = PRODUCTS.filter(p => p.type === 'bot' && p.active)
  const categories = ['Alle', ...new Set(bots.map(p => p.category))]

  // Bot-Karten als JSON für Client-seitiges Filtern
  const botsJson = JSON.stringify(bots.map(p => ({
    id: p.id,
    name: p.name,
    shortDesc: p.shortDesc,
    description: p.description,
    category: p.category,
    badge: p.badge ?? '',
    pricingType: p.pricingType,
    interval: p.interval ?? '',
    price: formatPrice(p.price, p.currency),
    features: p.features.slice(0,3),
    avatarIcon: 'fa-robot'
  })))

  const content = `
    <section class="gradient-hero text-white py-16 px-4">
      <div class="max-w-5xl mx-auto text-center">
        <i class="fas fa-robot text-5xl text-indigo-400 mb-4 block"></i>
        <h1 class="text-4xl font-extrabold mb-4">KI-Bots Bibliothek</h1>
        <p class="text-slate-300 text-lg">Einsatzbereite Chatbots mit professionellen Systemprompts.</p>
        <p class="text-indigo-300 font-semibold mt-2">${bots.length} Bots in ${categories.length - 1} Kategorien</p>
      </div>
    </section>

    <section class="py-10 px-4 max-w-7xl mx-auto">

      <!-- Such- und Filterleiste -->
      <div class="bg-white rounded-2xl shadow-md p-6 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div class="relative flex-1 w-full">
          <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            id="bot-search"
            placeholder="Bot suchen (Name, Kategorie, Beschreibung)..."
            class="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            oninput="filterBots()"
          >
        </div>
        <div class="flex items-center gap-3 text-sm text-slate-500 flex-shrink-0">
          <span id="bot-count" class="font-semibold text-indigo-600">${bots.length}</span> Bots gefunden
        </div>
      </div>

      <!-- Kategorie-Tabs -->
      <div class="flex flex-wrap gap-2 mb-8" id="category-tabs">
        ${categories.map((cat, i) => `
          <button
            onclick="selectCategory('${cat}')"
            data-cat="${cat}"
            class="cat-tab px-4 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'}"
          >${cat === 'Alle' ? `<i class="fas fa-th mr-1"></i>` : ''}${cat}${i > 0 ? ` <span class="ml-1 text-xs opacity-70">(${bots.filter(b => b.category === cat).length})</span>` : ''}</button>
        `).join('')}
      </div>

      <!-- Bot-Karten Grid -->
      <div id="bot-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Wird durch JS befüllt -->
      </div>

      <!-- Keine Ergebnisse -->
      <div id="no-results" class="hidden text-center py-16">
        <i class="fas fa-search text-5xl text-slate-200 mb-4 block"></i>
        <p class="text-slate-500 text-lg">Kein Bot gefunden. Suchbegriff anpassen.</p>
      </div>

    </section>

    <script>
      const ALL_BOTS = ${botsJson}
      let activeCategory = 'Alle'
      let searchQuery = ''

      function renderBots(bots) {
        const grid = document.getElementById('bot-grid')
        const noResults = document.getElementById('no-results')
        const countEl = document.getElementById('bot-count')
        countEl.textContent = bots.length

        if (!bots.length) {
          grid.innerHTML = ''
          noResults.classList.remove('hidden')
          return
        }
        noResults.classList.add('hidden')
        grid.innerHTML = bots.map(p => \`
          <div class="card-hover bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
            <div class="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 flex justify-between items-start">
              <i class="fas fa-robot text-white text-4xl opacity-80"></i>
              <div class="text-right">
                \${p.badge ? \`<span class="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white">\${p.badge}</span>\` : ''}
                <div class="text-white/70 text-xs mt-2">\${p.pricingType === 'subscription' ? '<i class="fas fa-sync mr-1"></i>Abo' : '<i class="fas fa-infinity mr-1"></i>Einmalig'}</div>
              </div>
            </div>
            <div class="p-5">
              <span class="text-xs font-medium px-2 py-1 rounded-full bg-indigo-50 text-indigo-600">\${p.category}</span>
              <h3 class="font-bold text-slate-800 text-xl mt-3 mb-1">\${p.name}</h3>
              <p class="text-slate-500 text-sm mb-3 italic">\${p.shortDesc}</p>
              <ul class="space-y-1 mb-4">
                \${p.features.map(f => \`<li class="text-sm text-slate-600 flex items-center gap-2"><i class="fas fa-check text-green-500 text-xs"></i>\${f}</li>\`).join('')}
              </ul>
              <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <span class="text-2xl font-bold text-indigo-600">\${p.price}</span>
                  \${p.pricingType === 'subscription' ? \`<span class="text-slate-400 text-sm">/\${p.interval === 'month' ? 'Monat' : 'Jahr'}</span>\` : '<span class="text-slate-400 text-sm"> einmalig</span>'}
                </div>
                <a href="/product/\${p.id}" class="btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
                  Kaufen <i class="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
            </div>
          </div>
        \`).join('')
      }

      function filterBots() {
        searchQuery = document.getElementById('bot-search').value.toLowerCase()
        applyFilters()
      }

      function selectCategory(cat) {
        activeCategory = cat
        document.querySelectorAll('.cat-tab').forEach(btn => {
          const isSel = btn.dataset.cat === cat
          btn.className = 'cat-tab px-4 py-2 rounded-full text-sm font-medium transition-all ' +
            (isSel ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600')
        })
        applyFilters()
      }

      function applyFilters() {
        let result = ALL_BOTS
        if (activeCategory !== 'Alle') {
          result = result.filter(b => b.category === activeCategory)
        }
        if (searchQuery) {
          result = result.filter(b =>
            b.name.toLowerCase().includes(searchQuery) ||
            b.shortDesc.toLowerCase().includes(searchQuery) ||
            b.description.toLowerCase().includes(searchQuery) ||
            b.category.toLowerCase().includes(searchQuery)
          )
        }
        renderBots(result)
      }

      // Initial rendern
      renderBots(ALL_BOTS)
    </script>`

  return c.html(layout('KI-Bots', content))
})

// ─────────────────────────────────────────────────────────
// DIGITALE PRODUKTE (eBooks, Videos, Whitepapers)
// ─────────────────────────────────────────────────────────
app.get('/digital', (c) => {
  const products = PRODUCTS.filter(p => ['ebook','whitepaper','video','bundle'].includes(p.type) && p.active)

  const typeConfig: Record<string, { icon: string; color: string; label: string }> = {
    ebook: { icon: 'fa-book', color: 'from-emerald-500 to-teal-600', label: 'eBook' },
    whitepaper: { icon: 'fa-file-alt', color: 'from-amber-500 to-orange-500', label: 'Whitepaper' },
    video: { icon: 'fa-play-circle', color: 'from-rose-500 to-pink-600', label: 'Videokurs' },
    bundle: { icon: 'fa-layer-group', color: 'from-purple-500 to-indigo-600', label: 'Bundle' },
  }

  const content = `
    <section class="gradient-hero text-white py-16 px-4">
      <div class="max-w-5xl mx-auto text-center">
        <i class="fas fa-graduation-cap text-5xl text-indigo-400 mb-4 block"></i>
        <h1 class="text-4xl font-extrabold mb-4">eBooks, Kurse & Whitepapers</h1>
        <p class="text-slate-300 text-lg">Expertenwissen als Download oder Streaming. Sofortiger Zugriff nach Zahlung.</p>
      </div>
    </section>
    <section class="py-16 px-4 max-w-7xl mx-auto">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${products.map(p => {
          const tc = typeConfig[p.type] || typeConfig.ebook
          return `
          <div class="card-hover bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
            <div class="bg-gradient-to-br ${tc.color} p-6 flex justify-between items-start">
              <i class="fas ${tc.icon} text-white text-4xl opacity-80"></i>
              <div class="text-right">
                ${p.badge ? `<span class="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white">${p.badge}</span>` : ''}
                <div class="text-white/70 text-xs mt-2">${tc.label}</div>
              </div>
            </div>
            <div class="p-5">
              <span class="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600">${p.category}</span>
              <h3 class="font-bold text-slate-800 text-xl mt-3 mb-2">${p.name}</h3>
              <p class="text-slate-500 text-sm mb-4">${p.description}</p>
              <ul class="space-y-1 mb-4">
                ${p.features.slice(0,3).map(f => `<li class="text-sm text-slate-600 flex items-center gap-2"><i class="fas fa-check text-green-500 text-xs"></i>${f}</li>`).join('')}
              </ul>
              <div class="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <span class="text-2xl font-bold text-indigo-600">${formatPrice(p.price, p.currency)}</span>
                  ${p.pricingType === 'subscription' ? `<span class="text-slate-400 text-sm">/${p.interval === 'month' ? 'Monat' : 'Jahr'}</span>` : '<span class="text-slate-400 text-sm"> einmalig</span>'}
                </div>
                <a href="/product/${p.id}" class="btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
                  Kaufen <i class="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
            </div>
          </div>`
        }).join('')}
      </div>
    </section>`

  return c.html(layout('Digitale Produkte', content))
})

// ─────────────────────────────────────────────────────────
// PRODUKT-DETAILSEITE + CHECKOUT
// ─────────────────────────────────────────────────────────
app.get('/product/:id', (c) => {
  const id = c.req.param('id')
  const product = getProductById(id)

  if (!product) {
    return c.html(layout('Nicht gefunden', `
      <div class="max-w-xl mx-auto py-32 text-center">
        <i class="fas fa-search text-6xl text-slate-300 mb-6 block"></i>
        <h1 class="text-2xl font-bold text-slate-700 mb-4">Produkt nicht gefunden</h1>
        <a href="/" class="btn-primary text-white px-6 py-3 rounded-xl font-semibold">Zur Startseite</a>
      </div>`), 404)
  }

  const typeColors: Record<string, string> = {
    bot: 'from-indigo-500 to-purple-600',
    ebook: 'from-emerald-500 to-teal-600',
    whitepaper: 'from-amber-500 to-orange-500',
    video: 'from-rose-500 to-pink-600',
    bundle: 'from-purple-500 to-indigo-600',
    saas: 'from-blue-500 to-cyan-600'
  }
  const gradColor = typeColors[product.type] || 'from-indigo-500 to-purple-600'

  const content = `
    <div class="max-w-5xl mx-auto px-4 py-12">
      <a href="javascript:history.back()" class="text-indigo-600 hover:text-indigo-800 text-sm mb-6 inline-flex items-center gap-1">
        <i class="fas fa-arrow-left"></i> Zurück
      </a>
      <div class="grid md:grid-cols-5 gap-10">
        <!-- LEFT: Produkt-Info -->
        <div class="md:col-span-3">
          <div class="bg-gradient-to-br ${gradColor} rounded-2xl p-10 text-white text-center mb-6">
            <i class="fas ${product.type === 'bot' ? 'fa-robot' : product.type === 'video' ? 'fa-play-circle' : product.type === 'ebook' ? 'fa-book' : 'fa-file-alt'} text-8xl opacity-80 mb-4 block"></i>
            <span class="bg-white/20 px-3 py-1 rounded-full text-sm">${product.category}</span>
          </div>
          <h1 class="text-3xl font-extrabold text-slate-800 mb-3">${product.name}</h1>
          ${product.badge ? `<span class="inline-block bg-indigo-100 text-indigo-700 text-sm font-bold px-3 py-1 rounded-full mb-4">${product.badge}</span>` : ''}
          <p class="text-slate-600 text-lg mb-6">${product.description}</p>
          <div class="bg-slate-50 rounded-2xl p-6">
            <h3 class="font-bold text-slate-800 mb-4"><i class="fas fa-list-check text-indigo-500 mr-2"></i>Was du bekommst</h3>
            <ul class="space-y-3">
              ${product.features.map(f => `
                <li class="flex items-center gap-3 text-slate-700">
                  <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-check text-green-600 text-xs"></i>
                  </div>
                  ${f}
                </li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- RIGHT: Checkout Box -->
        <div class="md:col-span-2">
          <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sticky top-24">
            <div class="text-center mb-6">
              <div class="text-4xl font-extrabold text-indigo-600">${formatPrice(product.price, product.currency)}</div>
              ${product.pricingType === 'subscription'
                ? `<div class="text-slate-500 mt-1">pro ${product.interval === 'month' ? 'Monat' : 'Jahr'} – jederzeit kündbar</div>`
                : `<div class="text-slate-500 mt-1">einmalige Zahlung – lebenslanger Zugriff</div>`}
            </div>

            <!-- Checkout Form -->
            <form id="checkout-form" class="space-y-4">
              <input type="hidden" id="product-id" value="${product.id}">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">
                  <i class="fas fa-envelope mr-1 text-indigo-500"></i>E-Mail-Adresse
                </label>
                <input 
                  type="email" 
                  id="customer-email"
                  placeholder="ihre@email.de"
                  required
                  class="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
              </div>
              
              <button 
                type="submit" 
                id="checkout-btn"
                class="w-full btn-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg"
              >
                <i class="fas fa-lock mr-2"></i>
                ${product.pricingType === 'subscription' ? 'Abo starten' : 'Jetzt kaufen'}
              </button>

              <div id="checkout-error" class="hidden text-red-600 text-sm text-center bg-red-50 rounded-lg p-3"></div>
            </form>

            <!-- Trust Signals -->
            <div class="mt-6 space-y-2 text-xs text-slate-500">
              <div class="flex items-center gap-2"><i class="fab fa-stripe text-indigo-500 text-lg"></i>Sichere Zahlung via Stripe</div>
              <div class="flex items-center gap-2"><i class="fas fa-shield-alt text-green-500"></i>SSL-verschlüsselt & DSGVO-konform</div>
              <div class="flex items-center gap-2"><i class="fas fa-bolt text-yellow-500"></i>Sofortiger Zugriff nach Zahlung</div>
              <div class="flex items-center gap-2"><i class="fas fa-undo text-blue-500"></i>14 Tage Rückgaberecht</div>
              ${product.pricingType === 'subscription' ? '<div class="flex items-center gap-2"><i class="fas fa-times-circle text-slate-400"></i>Jederzeit kündbar</div>' : ''}
            </div>
          </div>
        </div>
      </div>
    </div>

    <script>
      document.getElementById('checkout-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        const btn = document.getElementById('checkout-btn')
        const errDiv = document.getElementById('checkout-error')
        const email = document.getElementById('customer-email').value.trim()
        const productId = document.getElementById('product-id').value

        if (!email) { errDiv.textContent = 'Bitte E-Mail eingeben'; errDiv.classList.remove('hidden'); return }

        btn.disabled = true
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Weiterleitung...'
        errDiv.classList.add('hidden')

        try {
          const res = await axios.post('/api/checkout', { productId, email })
          if (res.data.url) {
            window.location.href = res.data.url
          } else {
            throw new Error('Keine Checkout-URL erhalten')
          }
        } catch (err) {
          const msg = err.response?.data?.error || err.message || 'Fehler beim Checkout'
          errDiv.textContent = msg
          errDiv.classList.remove('hidden')
          btn.disabled = false
          btn.innerHTML = '<i class="fas fa-lock mr-2"></i>${product.pricingType === 'subscription' ? 'Abo starten' : 'Jetzt kaufen'}'
        }
      })
    </script>`

  return c.html(layout(product.name, content))
})

// ─────────────────────────────────────────────────────────
// SUCCESS PAGE
// ─────────────────────────────────────────────────────────
app.get('/success', async (c) => {
  const sessionId = c.req.query('session_id')

  const content = `
    <div class="max-w-2xl mx-auto px-4 py-24 text-center" id="success-container">
      <div class="bg-white rounded-3xl shadow-xl p-12" id="loading-state">
        <i class="fas fa-spinner fa-spin text-5xl text-indigo-500 mb-6 block"></i>
        <h1 class="text-2xl font-bold text-slate-700">Zahlung wird bestätigt...</h1>
      </div>
      <div class="bg-white rounded-3xl shadow-xl p-12 hidden" id="success-state">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-check text-green-600 text-3xl"></i>
        </div>
        <h1 class="text-3xl font-extrabold text-slate-800 mb-3">Zahlung erfolgreich!</h1>
        <p class="text-slate-500 mb-8">Dein Lizenzschlüssel wurde generiert. Bewahre ihn sicher auf.</p>
        
        <div class="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-6">
          <div class="text-indigo-600 font-semibold text-sm mb-2"><i class="fas fa-key mr-1"></i>Dein Lizenzschlüssel</div>
          <div id="license-key" class="font-mono text-2xl font-bold text-indigo-800 tracking-wider"></div>
          <button onclick="copyKey()" class="mt-3 text-xs text-indigo-600 hover:text-indigo-800 underline">
            <i class="fas fa-copy mr-1"></i>Kopieren
          </button>
        </div>

        <div id="product-info" class="text-slate-600 text-sm mb-6"></div>
        <div id="download-info" class="hidden bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <a id="download-link" href="#" class="text-green-700 font-semibold hover:text-green-900">
            <i class="fas fa-download mr-2"></i>Download / Zugriff
          </a>
        </div>

        <div class="flex gap-3 justify-center">
          <a href="/dashboard" class="btn-primary text-white px-6 py-3 rounded-xl font-semibold">
            <i class="fas fa-dashboard mr-2"></i>Meine Lizenzen
          </a>
          <a href="/" class="bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-xl font-semibold transition-colors">
            Weiter einkaufen
          </a>
        </div>
      </div>
      <div class="bg-white rounded-3xl shadow-xl p-12 hidden" id="error-state">
        <i class="fas fa-exclamation-triangle text-5xl text-amber-500 mb-6 block"></i>
        <h1 class="text-2xl font-bold text-slate-700 mb-3">Etwas ist schiefgelaufen</h1>
        <p id="error-message" class="text-slate-500 mb-6"></p>
        <a href="/" class="btn-primary text-white px-6 py-3 rounded-xl font-semibold">Zur Startseite</a>
      </div>
    </div>

    <script>
      const sessionId = '${sessionId || ''}'
      
      async function confirmPayment() {
        if (!sessionId) {
          showError('Keine Session-ID gefunden')
          return
        }
        try {
          const res = await axios.get('/api/checkout/success?session_id=' + sessionId)
          const { license } = res.data
          
          document.getElementById('license-key').textContent = license.key
          document.getElementById('product-info').innerHTML = 
            '<i class="fas fa-box mr-1"></i>Produkt: <strong>' + (license.productName || license.productId) + '</strong>'
          
          if (res.data.downloadUrl) {
            const dlInfo = document.getElementById('download-info')
            dlInfo.classList.remove('hidden')
            document.getElementById('download-link').href = res.data.downloadUrl
          }

          document.getElementById('loading-state').classList.add('hidden')
          document.getElementById('success-state').classList.remove('hidden')
        } catch (err) {
          showError(err.response?.data?.error || 'Lizenz konnte nicht abgerufen werden')
        }
      }

      function showError(msg) {
        document.getElementById('loading-state').classList.add('hidden')
        document.getElementById('error-message').textContent = msg
        document.getElementById('error-state').classList.remove('hidden')
      }

      function copyKey() {
        const key = document.getElementById('license-key').textContent
        navigator.clipboard.writeText(key).then(() => {
          alert('Lizenzschlüssel kopiert!')
        })
      }

      confirmPayment()
    </script>`

  return c.html(layout('Zahlung erfolgreich', content))
})

// ─────────────────────────────────────────────────────────
// CANCEL PAGE
// ─────────────────────────────────────────────────────────
app.get('/cancel', (c) => {
  const productId = c.req.query('product')
  const content = `
    <div class="max-w-xl mx-auto px-4 py-32 text-center">
      <div class="bg-white rounded-3xl shadow-xl p-12">
        <i class="fas fa-times-circle text-5xl text-slate-400 mb-6 block"></i>
        <h1 class="text-2xl font-bold text-slate-700 mb-3">Zahlung abgebrochen</h1>
        <p class="text-slate-500 mb-8">Kein Problem – du wurdest nicht belastet.</p>
        <div class="flex gap-3 justify-center">
          ${productId ? `<a href="/product/${productId}" class="btn-primary text-white px-6 py-3 rounded-xl font-semibold">Nochmals versuchen</a>` : ''}
          <a href="/" class="bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-xl font-semibold transition-colors">Zur Startseite</a>
        </div>
      </div>
    </div>`

  return c.html(layout('Zahlung abgebrochen', content))
})

// ─────────────────────────────────────────────────────────
// DASHBOARD – Lizenzübersicht & Zugriff
// ─────────────────────────────────────────────────────────
app.get('/dashboard', (c) => {
  const content = `
    <div class="max-w-4xl mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <i class="fas fa-key text-5xl text-indigo-500 mb-4 block"></i>
        <h1 class="text-3xl font-extrabold text-slate-800 mb-2">Mein Bereich</h1>
        <p class="text-slate-500">Lizenzen verwalten, Inhalte abrufen und Abos steuern</p>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 mb-8 border-b border-slate-200">
        <button onclick="showTab('lookup')" id="tab-lookup" class="tab-btn px-5 py-3 font-semibold text-sm border-b-2 border-indigo-600 text-indigo-600">
          <i class="fas fa-search mr-1"></i>Lizenzen suchen
        </button>
        <button onclick="showTab('verify')" id="tab-verify" class="tab-btn px-5 py-3 font-semibold text-sm border-b-2 border-transparent text-slate-500 hover:text-slate-700">
          <i class="fas fa-check-circle mr-1"></i>Lizenz prüfen
        </button>
      </div>

      <!-- Tab: E-Mail Lookup -->
      <div id="panel-lookup" class="tab-panel">
        <div class="bg-white rounded-2xl shadow-md p-8">
          <h2 class="font-bold text-slate-800 text-xl mb-4">Alle Lizenzen per E-Mail abrufen</h2>
          <div class="flex gap-3 mb-6">
            <input type="email" id="lookup-email" placeholder="ihre@email.de" 
              class="flex-1 border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <button onclick="lookupLicenses()" class="btn-primary text-white px-6 py-3 rounded-xl font-semibold">
              <i class="fas fa-search mr-1"></i>Suchen
            </button>
          </div>
          <div id="lookup-result"></div>
        </div>
      </div>

      <!-- Tab: Einzelne Lizenz prüfen -->
      <div id="panel-verify" class="tab-panel hidden">
        <div class="bg-white rounded-2xl shadow-md p-8">
          <h2 class="font-bold text-slate-800 text-xl mb-4">Lizenzschlüssel direkt prüfen</h2>
          <div class="flex gap-3 mb-6">
            <input type="text" id="verify-key" placeholder="XXXX-XXXX-XXXX-XXXX" 
              class="flex-1 border border-slate-300 rounded-xl px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <button onclick="verifyLicense()" class="btn-primary text-white px-6 py-3 rounded-xl font-semibold">
              <i class="fas fa-check mr-1"></i>Prüfen
            </button>
          </div>
          <div id="verify-result"></div>
        </div>
      </div>
    </div>

    <script>
      function showTab(name) {
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'))
        document.querySelectorAll('.tab-btn').forEach(b => {
          b.classList.remove('border-indigo-600', 'text-indigo-600')
          b.classList.add('border-transparent', 'text-slate-500')
        })
        document.getElementById('panel-' + name).classList.remove('hidden')
        const btn = document.getElementById('tab-' + name)
        btn.classList.add('border-indigo-600', 'text-indigo-600')
        btn.classList.remove('border-transparent', 'text-slate-500')
      }

      async function lookupLicenses() {
        const email = document.getElementById('lookup-email').value.trim()
        const resultDiv = document.getElementById('lookup-result')
        if (!email) { resultDiv.innerHTML = '<p class="text-red-500">Bitte E-Mail eingeben</p>'; return }

        resultDiv.innerHTML = '<div class="text-center py-4"><i class="fas fa-spinner fa-spin text-indigo-500 text-2xl"></i></div>'
        
        try {
          const res = await axios.post('/api/license/lookup', { email })
          const { licenses } = res.data
          
          if (!licenses.length) {
            resultDiv.innerHTML = '<div class="text-center py-8 text-slate-500"><i class="fas fa-inbox text-4xl mb-3 block"></i>Keine Lizenzen gefunden</div>'
            return
          }

          resultDiv.innerHTML = licenses.map(l => \`
            <div class="border border-slate-200 rounded-xl p-5 mb-4 \${l.valid ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-400 opacity-70'}">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <span class="font-bold text-slate-800">\${l.productName || l.productId}</span>
                  <span class="ml-2 text-xs px-2 py-0.5 rounded-full \${l.valid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">\${l.valid ? 'Aktiv' : 'Inaktiv'}</span>
                </div>
                <span class="text-xs text-slate-500">\${new Date(l.createdAt).toLocaleDateString('de-DE')}</span>
              </div>
              <div class="font-mono text-indigo-700 font-semibold text-lg mb-2">\${l.key}</div>
              <div class="text-xs text-slate-500">
                \${l.pricingType === 'subscription' ? '<i class="fas fa-sync mr-1"></i>Abonnement' : '<i class="fas fa-infinity mr-1"></i>Einmalkauf'} · 
                \${l.productType || ''}
              </div>
              \${l.valid ? \`<button onclick="openAccess('\${l.key}')" class="mt-3 btn-primary text-white text-xs px-4 py-2 rounded-lg font-medium">
                <i class="fas fa-external-link-alt mr-1"></i>Zugriff öffnen
              </button>\` : ''}
            </div>
          \`).join('')
        } catch (err) {
          resultDiv.innerHTML = '<p class="text-red-500">Fehler: ' + (err.response?.data?.error || err.message) + '</p>'
        }
      }

      async function verifyLicense() {
        const key = document.getElementById('verify-key').value.trim()
        const resultDiv = document.getElementById('verify-result')
        if (!key) { resultDiv.innerHTML = '<p class="text-red-500">Bitte Lizenzschlüssel eingeben</p>'; return }

        resultDiv.innerHTML = '<div class="text-center py-4"><i class="fas fa-spinner fa-spin text-indigo-500 text-2xl"></i></div>'

        try {
          const res = await axios.get('/api/license/verify?key=' + encodeURIComponent(key))
          const { valid, license, botConfig, downloadUrl } = res.data

          resultDiv.innerHTML = \`
            <div class="rounded-xl p-6 \${valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
              <div class="flex items-center gap-3 mb-4">
                <i class="fas \${valid ? 'fa-check-circle text-green-600' : 'fa-times-circle text-red-600'} text-3xl"></i>
                <div>
                  <div class="font-bold text-slate-800">\${valid ? 'Gültige Lizenz' : 'Ungültige Lizenz'}</div>
                  <div class="text-sm text-slate-500">\${license?.productName || ''}</div>
                </div>
              </div>
              \${valid && downloadUrl ? \`<a href="\${downloadUrl}" target="_blank" class="inline-block btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold mt-2"><i class="fas fa-download mr-1"></i>Inhalt öffnen</a>\` : ''}
              \${valid && botConfig ? \`<div class="mt-3 bg-white rounded-lg p-4 text-sm text-slate-700"><i class="fas fa-robot mr-1 text-indigo-500"></i>Bot-Konfiguration verfügbar – Willkommensnachricht: <em>\${botConfig.welcomeMessage}</em></div>\` : ''}
            </div>\`
        } catch (err) {
          resultDiv.innerHTML = '<div class="bg-red-50 border border-red-200 rounded-xl p-5 text-red-700"><i class="fas fa-times-circle mr-2"></i>' + (err.response?.data?.error || 'Lizenz nicht gefunden') + '</div>'
        }
      }

      async function openAccess(key) {
        try {
          const res = await axios.get('/api/license/verify?key=' + key)
          if (res.data.downloadUrl) window.open(res.data.downloadUrl, '_blank')
          else alert('Kein direkter Download – bitte Lizenzschlüssel für manuellen Zugriff verwenden: ' + key)
        } catch(e) { alert('Fehler beim Abrufen des Zugriffs') }
      }
    </script>`

  return c.html(layout('Mein Bereich', content))
})

// ─────────────────────────────────────────────────────────
// IMPRESSUM
// ─────────────────────────────────────────────────────────
app.get('/impressum', (c) => {
  const content = `
    <div class="max-w-3xl mx-auto px-4 py-16">
      <h1 class="text-3xl font-extrabold text-slate-800 mb-8">Impressum</h1>
      <div class="bg-white rounded-2xl shadow-md p-8 space-y-6 text-slate-700">
        <div>
          <h2 class="font-bold text-slate-800 text-lg mb-2">Angaben gemäß § 5 TMG</h2>
          <p>BlueBanana Studios<br>
          Inhaber: Michael Konradi<br>
          [Straße und Hausnummer]<br>
          [PLZ Ort], Deutschland</p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-lg mb-2">Kontakt</h2>
          <p>E-Mail: <a href="mailto:support@kiprompts.pro" class="text-indigo-600 hover:underline">support@kiprompts.pro</a></p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-lg mb-2">Umsatzsteuer-ID</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br>
          [Ihre USt-ID]</p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-lg mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>Michael Konradi<br>[Adresse wie oben]</p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-lg mb-2">Haftungsausschluss</h2>
          <p class="text-sm text-slate-600">Die KI-Bots auf dieser Plattform stellen keine Rechts-, Steuer-, Finanz- oder Medizinberatung dar. Für die bereitgestellten Inhalte übernehmen wir keine Gewähr. Bitte konsultieren Sie bei rechtlich relevanten Fragen immer einen zugelassenen Fachmann.</p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-lg mb-2">Streitschlichtung</h2>
          <p class="text-sm text-slate-600">Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" class="text-indigo-600 hover:underline">https://ec.europa.eu/consumers/odr</a>. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </div>
      </div>
    </div>`
  return c.html(layout('Impressum', content))
})

// ─────────────────────────────────────────────────────────
// DATENSCHUTZ
// ─────────────────────────────────────────────────────────
app.get('/datenschutz', (c) => {
  const content = `
    <div class="max-w-3xl mx-auto px-4 py-16">
      <h1 class="text-3xl font-extrabold text-slate-800 mb-8">Datenschutzerklärung</h1>
      <div class="bg-white rounded-2xl shadow-md p-8 space-y-6 text-slate-700 text-sm leading-relaxed">
        <div>
          <h2 class="font-bold text-slate-800 text-base mb-2">1. Verantwortlicher</h2>
          <p>BlueBanana Studios, Michael Konradi, E-Mail: support@kiprompts.pro</p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-base mb-2">2. Erhobene Daten</h2>
          <p>Wir erheben und verarbeiten folgende Daten:</p>
          <ul class="list-disc ml-5 mt-2 space-y-1">
            <li>E-Mail-Adresse (für Zahlungsabwicklung und Lizenzverwaltung)</li>
            <li>Zahlungsdaten (verarbeitet ausschließlich durch Stripe, Inc.)</li>
            <li>Chat-Nachrichten (verschlüsselt gespeichert, nur zur Sitzungskontinuität)</li>
            <li>Lizenzschlüssel und Nutzungsdaten</li>
          </ul>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-base mb-2">3. Zweck der Datenverarbeitung</h2>
          <p>Ihre Daten werden ausschließlich zur Vertragserfüllung (Lizenzausstellung, Zugriffskontrolle) und zur Zahlungsabwicklung verwendet. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.</p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-base mb-2">4. Stripe</h2>
          <p>Zahlungen werden über Stripe, Inc. (185 Berry Street, Suite 550, San Francisco, CA 94107, USA) abgewickelt. Stripe ist nach EU-US Data Privacy Framework zertifiziert. Datenschutzerklärung: <a href="https://stripe.com/de/privacy" target="_blank" class="text-indigo-600 hover:underline">stripe.com/de/privacy</a></p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-base mb-2">5. OpenAI / KI-Dienste</h2>
          <p>Chat-Anfragen werden an OpenAI's API übermittelt. Bitte senden Sie keine personenbezogenen Daten in Chat-Nachrichten. OpenAI Datenschutz: <a href="https://openai.com/privacy" target="_blank" class="text-indigo-600 hover:underline">openai.com/privacy</a></p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-base mb-2">6. Speicherdauer</h2>
          <p>Lizenzdaten werden bis zur Kündigung/Ablauf + 3 Jahre aufbewahrt (steuerrechtliche Pflichten). Chat-Sessions werden nach 30 Tagen automatisch gelöscht.</p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-base mb-2">7. Ihre Rechte</h2>
          <p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18) und Datenübertragbarkeit (Art. 20). Kontakt: support@kiprompts.pro</p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-base mb-2">8. Cookies</h2>
          <p>Wir verwenden keine Tracking-Cookies. Technisch notwendige Sitzungsdaten werden lokal im Browser gespeichert (localStorage).</p>
        </div>
      </div>
    </div>`
  return c.html(layout('Datenschutz', content))
})

// ─────────────────────────────────────────────────────────
// AGB
// ─────────────────────────────────────────────────────────
app.get('/agb', (c) => {
  const content = `
    <div class="max-w-3xl mx-auto px-4 py-16">
      <h1 class="text-3xl font-extrabold text-slate-800 mb-8">Allgemeine Geschäftsbedingungen</h1>
      <div class="bg-white rounded-2xl shadow-md p-8 space-y-6 text-slate-700 text-sm leading-relaxed">
        <div>
          <h2 class="font-bold text-slate-800 text-base mb-2">§ 1 Geltungsbereich</h2>
          <p>Diese AGB gelten für alle Käufe über KIPromptsPro (BlueBanana Studios, Michael Konradi). Verbraucher im Sinne von § 13 BGB sind natürliche Personen, die die Verträge zu Zwecken abschließen, die überwiegend weder ihrer gewerblichen noch selbständigen beruflichen Tätigkeit zugerechnet werden können.</p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-base mb-2">§ 2 Vertragsgegenstand</h2>
          <p>Gegenstand des Vertrags ist die entgeltliche Überlassung von KI-Chatbot-Systemprompts (Software/digitale Inhalte) sowie digitaler Produkte (eBooks, Whitepapers, Videokurse) als Einmalkauf oder Abonnement.</p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-base mb-2">§ 3 Preise und Zahlung</h2>
          <p>Alle Preise sind Endpreise inkl. MwSt. Die Zahlung erfolgt über Stripe. Bei Abonnements wird der Betrag monatlich/jährlich automatisch eingezogen. Abonnements können jederzeit zum Ende des Abrechnungszeitraums gekündigt werden.</p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-base mb-2">§ 4 Widerrufsrecht</h2>
          <p>Sie haben das Recht, diesen Vertrag binnen 14 Tagen ohne Angabe von Gründen zu widerrufen. <strong>Das Widerrufsrecht erlischt vorzeitig</strong>, wenn wir mit der Ausführung des Vertrags begonnen haben und Sie ausdrücklich zugestimmt haben, dass wir mit der Ausführung beginnen, bevor die Widerrufsfrist abgelaufen ist. Beim Kauf erteilen Sie durch Anklicken des Kaufen-Buttons diese ausdrückliche Zustimmung.</p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-base mb-2">§ 5 Lizenz und Nutzungsrechte</h2>
          <p>Mit dem Kauf erhalten Sie ein nicht-exklusives, nicht übertragbares Nutzungsrecht für den persönlichen oder geschäftlichen Gebrauch. Eine Weitergabe, Weiterveräußerung oder öffentliche Zugänglichmachung der Inhalte ist untersagt.</p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-base mb-2">§ 6 Haftungsbeschränkung</h2>
          <p>Die KI-generierten Antworten ersetzen keine professionelle Rechts-, Steuer- oder Medizinberatung. Wir haften nicht für Schäden, die durch fehlerhafte KI-Ausgaben entstehen. Die Haftung ist auf Vorsatz und grobe Fahrlässigkeit beschränkt.</p>
        </div>
        <div>
          <h2 class="font-bold text-slate-800 text-base mb-2">§ 7 Anwendbares Recht</h2>
          <p>Es gilt deutsches Recht. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Anbieters.</p>
        </div>
      </div>
    </div>`
  return c.html(layout('AGB', content))
})

// ─────────────────────────────────────────────────────────
// BOT-CHAT-SEITE  /bot/:botId?key=XXXX-XXXX-XXXX-XXXX
// Widget wird client-seitig initialisiert nach Lizenzprüfung
// ─────────────────────────────────────────────────────────
app.get('/bot/:botId', (c) => {
  const botId = c.req.param('botId')
  const licenseKey = c.req.query('key') ?? ''

  const product = getProductById(botId)
  if (!product || product.type !== 'bot') {
    return c.html(layout('Nicht gefunden', `
      <div class="max-w-xl mx-auto py-32 text-center">
        <i class="fas fa-robot text-6xl text-slate-300 mb-6 block"></i>
        <h1 class="text-2xl font-bold text-slate-700 mb-4">Bot nicht gefunden</h1>
        <a href="/bots" class="btn-primary text-white px-6 py-3 rounded-xl font-semibold">Zur Bot-Bibliothek</a>
      </div>`), 404)
  }

  // UI-Config für die Seite (kein systemPrompt!)
  const uiConf = getBotUIConfig(botId)

  const content = `
    <div class="max-w-4xl mx-auto px-4 py-10">
      <a href="/bots" class="text-indigo-600 hover:text-indigo-800 text-sm mb-6 inline-flex items-center gap-1">
        <i class="fas fa-arrow-left"></i> Alle Bots
      </a>

      <!-- Lizenz-Gate: wird client-seitig geprüft -->
      <div id="license-gate" class="${licenseKey ? 'hidden' : ''}">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-10 text-center max-w-md mx-auto">
          <i class="fas fa-lock text-5xl text-indigo-400 mb-5 block"></i>
          <h2 class="text-2xl font-bold text-slate-800 mb-3">Lizenzschlüssel erforderlich</h2>
          <p class="text-slate-500 mb-6">Gib deinen Lizenzschlüssel ein um ${product.name} zu nutzen.</p>
          <div class="flex gap-2">
            <input type="text" id="key-input"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              class="flex-1 border border-slate-300 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <button onclick="activateBot()" class="btn-primary text-white px-5 py-3 rounded-xl font-semibold">
              <i class="fas fa-unlock mr-1"></i>Öffnen
            </button>
          </div>
          <p id="key-error" class="text-red-500 text-sm mt-3 hidden"></p>
          <div class="mt-6 pt-6 border-t border-slate-100">
            <p class="text-slate-500 text-sm">Noch keine Lizenz?</p>
            <a href="/product/${botId}" class="text-indigo-600 font-semibold hover:underline text-sm">
              ${product.name} kaufen →
            </a>
          </div>
        </div>
      </div>

      <!-- Chat-Interface (nach Lizenzprüfung sichtbar) -->
      <div id="chat-area" class="${licenseKey ? '' : 'hidden'}">
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Bot-Info Sidebar -->
          <div class="md:col-span-1">
            <div class="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden sticky top-24">
              <div class="bg-gradient-to-br ${uiConf?.avatarColor ?? 'from-indigo-500 to-purple-600'} p-6 text-center text-white">
                <i class="fas ${uiConf?.avatarIcon ?? 'fa-robot'} text-5xl mb-3 block opacity-90"></i>
                <div class="font-bold text-lg">${product.name}</div>
                <div class="text-white/70 text-xs mt-1">${product.category}</div>
              </div>
              <div class="p-4">
                <p class="text-slate-600 text-sm mb-4">${product.shortDesc}</p>
                <div class="space-y-2">
                  ${product.useCases.slice(0,4).map(uc =>
                    `<div class="text-xs text-slate-500 flex items-start gap-2">
                      <i class="fas fa-angle-right text-indigo-400 mt-0.5 flex-shrink-0"></i>${uc}
                    </div>`
                  ).join('')}
                </div>
                <div class="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
                  <div class="flex items-center gap-1 mb-1">
                    <i class="fas fa-microchip text-indigo-300"></i>
                    Modell: ${uiConf?.model ?? 'GPT-4o'}
                  </div>
                  <div class="flex items-center gap-1">
                    <i class="fas fa-key text-indigo-300"></i>
                    <span id="key-display">Lizenz wird geprüft...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat-Widget -->
          <div class="md:col-span-2" style="height:640px">
            <div id="chat-widget-container" class="h-full"></div>
          </div>
        </div>
      </div>
    </div>

    <script src="/static/chat-widget.js"></script>
    <script>
      const PRE_KEY = '${licenseKey}'
      const BOT_ID = '${botId}'
      let currentKey = PRE_KEY

      // Wenn Key in URL → direkt verifizieren
      if (PRE_KEY) { verifyAndInit(PRE_KEY) }

      async function activateBot() {
        const key = document.getElementById('key-input').value.trim()
        const errEl = document.getElementById('key-error')
        if (!key) { errEl.textContent = 'Bitte Schlüssel eingeben'; errEl.classList.remove('hidden'); return }
        errEl.classList.add('hidden')
        currentKey = key
        verifyAndInit(key)
      }

      async function verifyAndInit(key) {
        try {
          const res = await fetch('/api/license/verify?key=' + encodeURIComponent(key))
          const data = await res.json()

          if (!data.valid) {
            showKeyError(data.error || 'Ungültige Lizenz')
            return
          }

          if (data.license.productId !== BOT_ID) {
            showKeyError('Diese Lizenz gilt für: ' + data.license.productName)
            return
          }

          // Lizenz gültig → Chat initialisieren
          document.getElementById('license-gate').classList.add('hidden')
          document.getElementById('chat-area').classList.remove('hidden')
          document.getElementById('key-display').textContent = key.slice(0,4) + '-****-****-' + key.slice(-4)

          const ui = data.botUI || {}
          new ChatWidget('chat-widget-container', {
            botId: BOT_ID,
            licenseKey: key,
            botName: '${product.name}',
            welcomeMessage: ui.welcomeMessage || 'Hallo! Wie kann ich helfen?',
            placeholder: ui.placeholder || 'Nachricht eingeben...',
            avatarIcon: ui.avatarIcon || 'fa-robot',
            avatarColor: ui.avatarColor || 'from-indigo-500 to-purple-600'
          })
        } catch {
          showKeyError('Verbindungsfehler. Bitte versuche es erneut.')
        }
      }

      function showKeyError(msg) {
        const errEl = document.getElementById('key-error')
        if (errEl) { errEl.textContent = msg; errEl.classList.remove('hidden') }
        document.getElementById('license-gate').classList.remove('hidden')
        document.getElementById('chat-area').classList.add('hidden')
      }
    </script>`

  return c.html(layout(product.name, content,
    `<script src="https://cdn.tailwindcss.com"></script>`
  ))
})

export default app
