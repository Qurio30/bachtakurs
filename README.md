# KursApp - Moderne Lernplattform

Eine moderne React-basierte Web-Anwendung für Online-Kurse mit YouTube Video Integration und Chat-Funktion.

## 🚀 Features

### ✅ Authentifizierung
- **Login/Registrierung** - Sichere Benutzerauthentifizierung
- **Rollenbasierte Zugriffe** - Unterschiedliche Berechtigungen für Schüler und Lehrer
- **Demo-Zugänge** - Vordefinierte Test-Accounts

### ✅ Video-Integration
- **YouTube Einbettung** - Nahtlose Integration von YouTube Videos
- **Video-Player** - Custom Video Player mit Steuerung
- **Video-Kategorien** - Organisierte Bereiche (Mathematik, Physik, Chemie, etc.)

### ✅ Chat-System
- **Echtzeit-Chat** - Direkte Kommunikation zwischen Schülern und Lehrern
- **Datei-Upload** - Möglichkeit, Dateien zu teilen
- **Online-Status** - Anzeige der aktiven Benutzer
- **Nachrichten-Historie** - Persistente Chat-Verläufe

### ✅ Moderne UI/UX
- **Responsive Design** - Optimiert für Desktop und Mobile
- **Dark/Light Mode** - Anpassbare Benutzeroberfläche
- **Animationen** - Smooth Transitions mit Framer Motion
- **Accessibility** - Barrierefreie Bedienung

## 🛠️ Technologie-Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Animationen**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM
- **State Management**: React Context API

## 📦 Installation

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd kursapp
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```

4. **Anwendung öffnen**
   - Öffnen Sie http://localhost:3000 in Ihrem Browser

## 🔐 Demo-Zugänge

### Schüler-Account
- **E-Mail**: schueler@example.com
- **Passwort**: 123456

### Lehrer-Account
- **E-Mail**: lehrer@example.com
- **Passwort**: 123456

## 📱 Verwendung

### 1. Anmeldung
- Besuchen Sie die Anmeldeseite
- Verwenden Sie einen der Demo-Zugänge oder registrieren Sie sich neu

### 2. Dashboard
- Wählen Sie eine Kategorie aus (Mathematik, Physik, etc.)
- Durchsuchen Sie die verfügbaren Videos
- Klicken Sie auf ein Video, um es anzusehen

### 3. Chat
- Navigieren Sie zum Chat-Bereich
- Stellen Sie Fragen an Lehrer oder kommunizieren Sie mit anderen Schülern
- Teilen Sie Dateien für bessere Unterstützung

### 4. Profil
- Verwalten Sie Ihre Kontoinformationen
- Sehen Sie Ihre Lernstatistiken ein

## 🎯 Kursbereiche

Die App bietet verschiedene Fachbereiche:

- **📊 Mathematik** - Algebra, Geometrie, Analysis
- **⚛️ Physik** - Mechanik, Elektromagnetismus
- **🧪 Chemie** - Organische Chemie, Periodensystem
- **🧬 Biologie** - Zellbiologie, Genetik
- **📚 Deutsch** - Grammatik, Literatur
- **🇬🇧 Englisch** - Grammatik, Business English

## 🔧 Entwicklung

### Verfügbare Scripts

```bash
# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build

# Build in Vorschau anzeigen
npm run preview

# Linting
npm run lint
```

### Projektstruktur

```
src/
├── components/          # Wiederverwendbare UI-Komponenten
│   ├── CategoryCard.jsx
│   ├── ChatInput.jsx
│   ├── ChatMessage.jsx
│   ├── LoginForm.jsx
│   ├── Navigation.jsx
│   ├── OnlineUsers.jsx
│   ├── RegisterForm.jsx
│   ├── VideoCard.jsx
│   └── VideoPlayer.jsx
├── context/            # React Context für State Management
│   ├── AuthContext.jsx
│   └── ChatContext.jsx
├── data/               # Statische Daten und Konfiguration
│   └── courses.js
├── pages/              # Hauptseiten der Anwendung
│   ├── AuthPage.jsx
│   ├── ChatPage.jsx
│   ├── Dashboard.jsx
│   └── ProfilePage.jsx
├── App.jsx             # Hauptkomponente
├── main.jsx           # Einstiegspunkt
└── index.css          # Globale Styles
```

## 🚀 Deployment

### Vercel (Empfohlen)
1. Verbinden Sie Ihr GitHub Repository mit Vercel
2. Vercel erkennt automatisch die Vite-Konfiguration
3. Die App wird automatisch deployed

### Netlify
1. Erstellen Sie einen Build: `npm run build`
2. Laden Sie den `dist` Ordner zu Netlify hoch
3. Konfigurieren Sie die Redirects für SPA-Routing

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔮 Zukünftige Features

- [ ] **Echte Backend-Integration** - Node.js/Express API
- [ ] **WebSocket Chat** - Echtzeit-Kommunikation
- [ ] **Video-Fortschritt** - Tracking des Lernfortschritts
- [ ] **Quiz-System** - Interaktive Tests nach Videos
- [ ] **Zertifikate** - Abschlusszertifikate für Kurse
- [ ] **Mobile App** - React Native Version
- [ ] **Push-Benachrichtigungen** - Neue Nachrichten und Updates
- [ ] **Video-Kommentare** - Zeitbasierte Kommentare zu Videos

## 🤝 Beitragen

1. Fork das Repository
2. Erstellen Sie einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Pushen Sie zum Branch (`git push origin feature/AmazingFeature`)
5. Öffnen Sie einen Pull Request

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe `LICENSE` Datei für Details.

## 📞 Support

Bei Fragen oder Problemen:
- Erstellen Sie ein Issue im GitHub Repository
- Kontaktieren Sie das Entwicklungsteam

---

**Entwickelt mit ❤️ für moderne Bildung**
