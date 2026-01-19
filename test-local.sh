#!/bin/bash

# Local Test Server für Thai Tone Quiz PWA
# Startet einen lokalen Webserver zum Testen vor dem Deployment

echo "🚀 Starting local test server for Thai Tone Quiz PWA..."
echo ""
echo "📋 Test Checklist:"
echo "  ✓ App lädt ohne Fehler"
echo "  ✓ Vocabulary wird geladen (842 Wörter)"
echo "  ✓ Quiz funktioniert (Tone-Auswahl, Check, Next)"
echo "  ✓ Service Worker registriert sich"
echo "  ✓ Keine Console-Fehler"
echo ""
echo "🌐 Server wird gestartet..."
echo ""

# Prüfe welche Option verfügbar ist
if command -v python3 &> /dev/null; then
    echo "✅ Using Python 3 http.server"
    echo "📍 Open: http://localhost:8000"
    echo "🛑 Press Ctrl+C to stop"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Using Python 2 http.server"
    echo "📍 Open: http://localhost:8000"
    echo "🛑 Press Ctrl+C to stop"
    echo ""
    python -m SimpleHTTPServer 8000
elif command -v php &> /dev/null; then
    echo "✅ Using PHP built-in server"
    echo "📍 Open: http://localhost:8000"
    echo "🛑 Press Ctrl+C to stop"
    echo ""
    php -S localhost:8000
elif command -v npx &> /dev/null; then
    echo "✅ Using Node.js http-server (via npx)"
    echo "📍 Open: http://localhost:8080"
    echo "🛑 Press Ctrl+C to stop"
    echo ""
    npx --yes http-server -p 8080 -c-1
else
    echo "❌ No suitable server found!"
    echo ""
    echo "Install one of:"
    echo "  - Python 3: brew install python3 (macOS)"
    echo "  - Node.js: brew install node (macOS)"
    echo "  - PHP: brew install php (macOS)"
    echo ""
    echo "Or use: npx http-server (requires Node.js)"
    exit 1
fi
