// ============================================================
// CHAT-WIDGET – Frontend-Modul (Browser-seitig)
// Verantwortung: Chat-UI rendern und /api/chat aufrufen.
// Kennt: licenseKey, botId, sessionId
// Kennt NICHT: systemPrompts, interne API-Keys, KV
// ============================================================

class ChatWidget {
  constructor(containerId, options = {}) {
    this.containerId = containerId
    this.botId = options.botId || ''
    this.licenseKey = options.licenseKey || ''
    this.sessionId = options.sessionId || null
    this.botName = options.botName || 'KI-Assistent'
    this.welcomeMessage = options.welcomeMessage || 'Hallo! Wie kann ich helfen?'
    this.placeholder = options.placeholder || 'Nachricht eingeben...'
    this.avatarIcon = options.avatarIcon || 'fa-robot'
    this.avatarColor = options.avatarColor || 'from-indigo-500 to-purple-600'
    this.isLoading = false
    this.container = document.getElementById(containerId)
    if (this.container) this._render()
  }

  // ── UI aufbauen ──────────────────────────────────────────
  _render() {
    this.container.innerHTML = `
      <div class="flex flex-col h-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden" id="${this.containerId}-inner">
        <!-- Header -->
        <div class="bg-gradient-to-r ${this.avatarColor} p-4 flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <i class="fas ${this.avatarIcon} text-white text-lg"></i>
          </div>
          <div>
            <div class="text-white font-bold">${this.botName}</div>
            <div class="text-white/70 text-xs flex items-center gap-1">
              <span class="w-2 h-2 bg-green-400 rounded-full inline-block"></span> Online
            </div>
          </div>
          <button onclick="document.getElementById('${this.containerId}-history').innerHTML=''"
            class="ml-auto text-white/60 hover:text-white text-xs border border-white/30 px-2 py-1 rounded-lg transition-colors">
            <i class="fas fa-trash-alt mr-1"></i>Leeren
          </button>
        </div>
        <!-- Nachrichten -->
        <div id="${this.containerId}-history"
          class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50"
          style="min-height:300px; max-height:500px">
          ${this._welcomeBubble()}
        </div>
        <!-- Eingabe -->
        <div class="p-3 border-t border-slate-200 bg-white">
          <div class="flex gap-2">
            <textarea id="${this.containerId}-input"
              placeholder="${this.placeholder}"
              rows="1"
              class="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              style="max-height:120px; overflow-y:auto"
            ></textarea>
            <button id="${this.containerId}-send"
              class="bg-gradient-to-r ${this.avatarColor} text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-1"
              onclick="window.__widgets['${this.containerId}'].sendMessage()">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
          <div class="text-center mt-1">
            <span class="text-xs text-slate-400">
              <i class="fas fa-lock mr-1"></i>Lizenz: ${this.licenseKey.slice(0,4)}****
            </span>
          </div>
        </div>
      </div>`

    // Enter-Taste = Senden (Shift+Enter = neue Zeile)
    const input = this._input()
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        this.sendMessage()
      }
    })
    // Auto-resize Textarea
    input.addEventListener('input', () => {
      input.style.height = 'auto'
      input.style.height = Math.min(input.scrollHeight, 120) + 'px'
    })

    // Widget global registrieren
    window.__widgets = window.__widgets || {}
    window.__widgets[this.containerId] = this
  }

  // ── Nachricht senden ─────────────────────────────────────
  async sendMessage() {
    if (this.isLoading) return
    const input = this._input()
    const text = input.value.trim()
    if (!text) return

    input.value = ''
    input.style.height = 'auto'
    this._appendBubble('user', text)
    this._setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botId: this.botId,
          licenseKey: this.licenseKey,
          userMessage: text,
          sessionId: this.sessionId
        })
      })

      const data = await res.json()

      if (!res.ok) {
        this._appendBubble('error', data.error || 'Fehler beim Senden')
        return
      }

      this.sessionId = data.sessionId
      this._appendBubble('assistant', data.reply)
    } catch {
      this._appendBubble('error', 'Verbindungsfehler. Bitte versuche es erneut.')
    } finally {
      this._setLoading(false)
    }
  }

  // ── UI-Hilfsfunktionen ───────────────────────────────────
  _welcomeBubble() {
    return `<div class="flex gap-3">
      <div class="w-8 h-8 bg-gradient-to-br ${this.avatarColor} rounded-full flex items-center justify-center flex-shrink-0">
        <i class="fas ${this.avatarIcon} text-white text-xs"></i>
      </div>
      <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs shadow-sm">
        <p class="text-slate-700 text-sm">${this.welcomeMessage}</p>
      </div>
    </div>`
  }

  _appendBubble(role, content) {
    const history = document.getElementById(`${this.containerId}-history`)
    const isUser = role === 'user'
    const isError = role === 'error'

    const bubble = document.createElement('div')
    bubble.className = isUser ? 'flex gap-3 justify-end' : 'flex gap-3'

    if (isError) {
      bubble.innerHTML = `<div class="mx-auto bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-xl">
        <i class="fas fa-exclamation-triangle mr-1"></i>${this._escapeHtml(content)}</div>`
    } else if (isUser) {
      bubble.innerHTML = `
        <div class="bg-gradient-to-br ${this.avatarColor} text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-xs shadow-sm">
          <p class="text-sm whitespace-pre-wrap">${this._escapeHtml(content)}</p>
        </div>
        <div class="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
          <i class="fas fa-user text-slate-500 text-xs"></i>
        </div>`
    } else {
      bubble.innerHTML = `
        <div class="w-8 h-8 bg-gradient-to-br ${this.avatarColor} rounded-full flex items-center justify-center flex-shrink-0">
          <i class="fas ${this.avatarIcon} text-white text-xs"></i>
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 max-w-sm shadow-sm">
          <p class="text-slate-700 text-sm whitespace-pre-wrap">${this._formatMarkdown(content)}</p>
        </div>`
    }

    history.appendChild(bubble)
    history.scrollTop = history.scrollHeight
  }

  _setLoading(state) {
    this.isLoading = state
    const btn = document.getElementById(`${this.containerId}-send`)
    const history = document.getElementById(`${this.containerId}-history`)

    if (state) {
      btn.disabled = true
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
      const loader = document.createElement('div')
      loader.id = `${this.containerId}-loader`
      loader.className = 'flex gap-3'
      loader.innerHTML = `
        <div class="w-8 h-8 bg-gradient-to-br ${this.avatarColor} rounded-full flex items-center justify-center flex-shrink-0">
          <i class="fas ${this.avatarIcon} text-white text-xs"></i>
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
          <div class="flex gap-1 items-center h-5">
            <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay:0ms"></span>
            <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay:150ms"></span>
            <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay:300ms"></span>
          </div>
        </div>`
      history.appendChild(loader)
      history.scrollTop = history.scrollHeight
    } else {
      btn.disabled = false
      btn.innerHTML = '<i class="fas fa-paper-plane"></i>'
      const loader = document.getElementById(`${this.containerId}-loader`)
      if (loader) loader.remove()
    }
  }

  // Einfaches Markdown-Rendering (fett, code, listen)
  _formatMarkdown(text) {
    return this._escapeHtml(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-1 rounded text-xs font-mono">$1</code>')
      .replace(/^[-*] (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\n/g, '<br>')
  }

  _escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  _input() {
    return document.getElementById(`${this.containerId}-input`)
  }
}

// Global verfügbar machen
window.ChatWidget = ChatWidget
