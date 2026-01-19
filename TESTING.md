# 🧪 Lokales Testen vor dem Deployment

Bevor du die App auf GitHub Pages deployst, solltest du sie lokal testen.

## ⚡ Schnellstart

### Option 1: Test-Script verwenden (Empfohlen)

```bash
./test-local.sh
```

Das Script erkennt automatisch, welcher Server verfügbar ist und startet ihn.

### Option 2: Manuell starten

#### Python 3 (meist schon installiert)
```bash
python3 -m http.server 8000
```
Dann öffne: http://localhost:8000

#### Python 2
```bash
python -m SimpleHTTPServer 8000
```

#### Node.js http-server
```bash
npx http-server -p 8080 -c-1
```
Dann öffne: http://localhost:8080

#### PHP
```bash
php -S localhost:8000
```

## ✅ Test-Checkliste

Öffne die Browser-Entwicklertools (F12) und prüfe:

### 1. Console-Tab
- [ ] Keine roten Fehler
- [ ] "SW registered: ServiceWorkerRegistration" erscheint
- [ ] Keine "Minified React error" Meldungen

### 2. Network-Tab
- [ ] `app.js` wird geladen (Status 200)
- [ ] `data/vocabulary.json` wird geladen (Status 200)
- [ ] `manifest.json` wird geladen (Status 200)
- [ ] `service-worker.js` wird geladen (Status 200)

### 3. Funktionalität
- [ ] App lädt (kein endloses "Loading...")
- [ ] Thai-Wörter werden angezeigt
- [ ] Tone-Buttons funktionieren
- [ ] "Check Answers" funktioniert
- [ ] "Next Word" funktioniert
- [ ] "Reset" funktioniert
- [ ] Score wird aktualisiert
- [ ] Feedback erscheint nach 20 Fragen

### 4. Service Worker
- [ ] Service Worker registriert sich (siehe Console)
- [ ] App funktioniert offline (nach erstem Laden)
- [ ] Cache wird erstellt (siehe Application → Cache Storage)

### 5. Mobile-Ansicht
- [ ] Responsive Design funktioniert
- [ ] Touch-Interaktionen funktionieren
- [ ] Icons werden angezeigt

## 🐛 Häufige Probleme

### "Loading..." bleibt stehen
- **Ursache**: `app.js` oder `vocabulary.json` wird nicht geladen
- **Lösung**: Prüfe Network-Tab, ob Dateien 404 sind
- **Lösung**: Prüfe, ob alle Dateien im richtigen Verzeichnis sind

### React Error #130
- **Ursache**: Falsche React-Komponenten-Verwendung
- **Lösung**: Sollte jetzt behoben sein (Lucide entfernt)

### Service Worker Fehler
- **Ursache**: Service Worker kann nicht registriert werden
- **Lösung**: Prüfe, ob `service-worker.js` existiert
- **Lösung**: Prüfe Console für spezifische Fehler

### Vocabulary wird nicht geladen
- **Ursache**: `data/vocabulary.json` fehlt oder ist ungültig
- **Lösung**: Prüfe, ob Datei existiert und gültiges JSON ist

## 🔍 Debug-Tipps

### Service Worker Cache löschen
1. Öffne DevTools (F12)
2. Gehe zu **Application** → **Service Workers**
3. Klicke **Unregister**
4. Gehe zu **Application** → **Storage** → **Clear site data**

### Hard Reload
- **Chrome/Edge**: Ctrl+Shift+R (Windows) oder Cmd+Shift+R (Mac)
- **Firefox**: Ctrl+F5 (Windows) oder Cmd+Shift+R (Mac)
- **Safari**: Cmd+Option+R

### Network Cache deaktivieren
1. Öffne DevTools (F12)
2. Gehe zu **Network**-Tab
3. Aktiviere **Disable cache**
4. Lade Seite neu

## 📱 Mobile Testing

### Chrome DevTools Device Mode
1. Öffne DevTools (F12)
2. Klicke auf Device-Toggle (oder Ctrl+Shift+M)
3. Wähle ein Gerät (z.B. iPhone 12)

### Auf echtem Gerät testen
1. Finde deine lokale IP-Adresse:
   ```bash
   # macOS/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Windows
   ipconfig
   ```
2. Starte Server mit dieser IP:
   ```bash
   python3 -m http.server 8000 --bind 0.0.0.0
   ```
3. Öffne auf deinem Handy: `http://[DEINE-IP]:8000`

## ✅ Wenn alles funktioniert

Wenn alle Tests erfolgreich sind:
1. ✅ Committe deine Änderungen
2. ✅ Pushe zu GitHub
3. ✅ Warte auf GitHub Pages Deployment
4. ✅ Teste nochmal auf der Live-URL

## 🚨 Wichtig

- **NIE** die App direkt als `file://` öffnen (Service Worker funktioniert nicht)
- **IMMER** einen lokalen Server verwenden
- **IMMER** die Console prüfen vor dem Deployment
