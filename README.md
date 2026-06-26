# Main-Vertriebswebseite

> **Verkaufsplattform für alle Produkte** – Eine zentrale, moderne E-Commerce-Plattform für den Verkauf von Software, digitalen Produkten und Dienstleistungen.

---

## 📌 Über das Projekt

Die **Main-Vertriebswebseite** ist eine **vollständige Verkaufsplattform**, die es dir ermöglicht, alle deine Produkte (Software, E-Books, Kurse, SaaS-Lösungen, etc.) an einem Ort anzubieten. Die Plattform ist **responsiv**, **benutzerfreundlich** und **erweiterbar**, um den Anforderungen moderner Online-Verkäufe gerecht zu werden.

### ✨ Features
- **Produktkatalog**: Übersichtliche Darstellung aller Produkte mit Kategorien, Suchfunktion und Filteroptionen.
- **Zahlungsabwicklung**: Integration von Zahlungsanbietern wie **Stripe, PayPal oder Banküberweisung**.
- **Benutzerverwaltung**: Registrierung, Login und Profilverwaltung für Kunden.
- **Bestellhistorie**: Kunden können ihre Bestellungen einsehen und verwalten.
- **Admin-Dashboard**: Verwaltung von Produkten, Bestellungen und Kunden.
- **Responsive Design**: Optimiert für Desktop, Tablet und mobile Geräte.
- **SEO-freundlich**: Suchmaschinenoptimierte Struktur für bessere Sichtbarkeit.

---

## 🚀 Schnellstart

### Voraussetzungen
- **Node.js** (Version 18 oder höher)
- **npm** oder **yarn** (Paketmanager)
- **Git** (für die Versionskontrolle)
- **Hosting-Dienst** (z. B. Vercel, Netlify, Cloudflare Pages, oder ein eigener Server)

### Installation

1. **Repository klonen**:
   ```bash
   git clone https://github.com/mikon28wa/Main-Vertriebswebseite.git
   cd Main-Vertriebswebseite
   ```

2. **Abhängigkeiten installieren**:
   ```bash
   npm install
   ```

3. **Umgebungsvariablen konfigurieren**:
   - Erstelle eine `.env`-Datei im Projektverzeichnis.
   - Füge die erforderlichen Variablen hinzu (z. B. API-Schlüssel für Zahlungsanbieter, Datenbankverbindungen).
   - Beispiel:
     ```env
     STRIPE_SECRET_KEY=dein_stripe_secret_key
     DATABASE_URL=deine_datenbank_url
     ```

4. **Lokale Entwicklung starten**:
   ```bash
   npm run dev
   ```
   Die Anwendung ist dann unter `http://localhost:3000` erreichbar.

---

## 📂 Projektstruktur

```
Main-Vertriebswebseite/
├── public/              # Statische Dateien (Bilder, Fonts, etc.)
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── components/      # Wiederverwendbare UI-Komponenten
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ProductCard.tsx
│   ├── pages/           # Seiten der Anwendung
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Checkout.tsx
│   │   ├── Dashboard.tsx
│   │   └── Admin.tsx
│   ├── styles/          # CSS/Styling-Dateien
│   │   ├── globals.css
│   │   └── theme.css
│   ├── utils/           # Hilfsfunktionen und Utilities
│   │   ├── api.ts
│   │   └── helpers.ts
│   ├── types/           # TypeScript-Typdefinitionen
│   │   └── index.ts
│   ├── App.tsx          # Hauptkomponente der Anwendung
│   └── main.tsx         # Einstiegspunkt der Anwendung
├── .env.example         # Beispiel für Umgebungsvariablen
├── .gitignore           # Git-Ignore-Regeln
├── package.json         # Projektabhängigkeiten und Skripte
├── tsconfig.json        # TypeScript-Konfiguration
└── README.md            # Diese Datei
```

---

## 🛠️ Anpassung

### Produkte hinzufügen
1. **Neues Produkt erstellen**:
   - Füge ein neues Objekt im `products`-Array in `src/utils/products.ts` hinzu.
   - Beispiel:
     ```typescript
     {
       id: "produkt-id",
       name: "Produktname",
       description: "Beschreibung des Produkts",
       price: 29.99,
       category: "Software",
       image: "/images/produktbild.jpg",
       available: true,
     }
     ```

2. **Kategorien verwalten**:
   - Passe die Kategorien in `src/utils/categories.ts` an.

### Design anpassen
- **Farben und Stile**: Bearbeite die Dateien in `src/styles/` (z. B. `globals.css` oder `theme.css`).
- **Komponenten**: Passe die UI-Komponenten in `src/components/` an.

---

## 🌐 Hosting-Optionen

| Anbieter | Anleitung | Kosten |
|----------|-----------|--------|
| **Vercel** | [Dokumentation](https://vercel.com/docs) | Kostenlos (mit Premium-Optionen) |
| **Netlify** | [Dokumentation](https://docs.netlify.com/) | Kostenlos (mit Premium-Optionen) |
| **Cloudflare Pages** | [Dokumentation](https://developers.cloudflare.com/pages/) | Kostenlos |
| **Eigener Server** | Node.js/Express oder statisches Hosting | Abhängig vom Anbieter |

### Deployment mit Vercel
1. **Repository mit Vercel verbinden**:
   - Erstelle ein Konto auf [Vercel](https://vercel.com/).
   - Importiere das Repository `Main-Vertriebswebseite`.
   - Vercel erkennt automatisch die Einstellungen und schlägt eine Konfiguration vor.

2. **Umgebungsvariablen hinzufügen**:
   - Füge die erforderlichen Umgebungsvariablen (z. B. `STRIPE_SECRET_KEY`) in den Vercel-Projekteinstellungen hinzu.

3. **Bereitstellen**:
   - Klicke auf **Deploy**. Die Anwendung wird automatisch gebaut und bereitgestellt.

---

## 🤝 Beitrag leisten

Beiträge sind willkommen! Falls du Verbesserungen oder Erweiterungen vorschlagen möchtest:

1. **Fork** das Repository.
2. **Feature-Branch erstellen** (`git checkout -b feature/neue-funktion`).
3. **Änderungen committen** (`git commit -m "Füge neue Funktion hinzu"`).
4. **Branch pushen** (`git push origin feature/neue-funktion`).
5. **Pull Request öffnen**.

---

## 📄 Lizenz

Dieses Projekt steht unter der **MIT-Lizenz**. Siehe [LICENSE](LICENSE) für weitere Informationen.

---

## 📞 Support

- **Fragen oder Probleme?** Öffne ein [Issue](https://github.com/mikon28wa/Main-Vertriebswebseite/issues) in diesem Repository.
- **Kontakt**: [Michael Konradi](https://github.com/mikon28wa) (Projektverantwortlicher).

---

## 🏗️ Technologien

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express (falls benötigt)
- **Zahlungsabwicklung**: Stripe, PayPal
- **Datenbank**: Firebase, Supabase oder MongoDB (optional)
- **Hosting**: Vercel, Netlify, Cloudflare Pages