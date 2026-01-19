# Thai Tone Quiz - Progressive Web App

A beautiful, offline-capable Progressive Web App to help you master Thai tones through interactive quizzes with 800+ vocabulary words.

## ✨ Features

- 📱 **Progressive Web App** - Install on iOS/Android like a native app
- 🔄 **Smart Word Rotation** - No repeats until you've seen all words
- 📊 **Performance Tracking** - Get feedback every 20 questions
- 🎯 **4-Level Feedback System** - Poor, Good, Great, Brilliant
- 📴 **Offline Support** - Works without internet connection
- 🌍 **842 Vocabulary Words** - Comprehensive Thai vocabulary
- 🎨 **Beautiful UI** - Responsive design for all screen sizes

## 🚀 Quick Start

### Option 1: Deploy to GitHub Pages (Recommended)

1. **Create a new GitHub repository**
   ```bash
   # On GitHub, create a new repository called 'thai-tone-quiz'
   # Don't initialize with README (we already have one)
   ```

2. **Push this code to GitHub**
   ```bash
   cd thai-tone-quiz-pwa
   git init
   git add .
   git commit -m "Initial commit: Thai Tone Quiz PWA"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/thai-tone-quiz.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch and **/ (root)** folder
   - Click **Save**
   - Your app will be available at: `https://YOUR_USERNAME.github.io/thai-tone-quiz/`

4. **Wait 2-3 minutes** for GitHub to build and deploy your site

### Option 2: Local Development

1. **Start a local server**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Node.js
   npx serve .
   ```

2. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📱 Installing on iOS

1. Open the app in Safari
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add** in the top right
5. The app icon will appear on your home screen!

## 📱 Installing on Android

1. Open the app in Chrome
2. Tap the **menu** (three dots)
3. Tap **Add to Home Screen**
4. Tap **Add**
5. The app will be installed like a native app!

## 🔄 Updating Vocabulary

When you want to add new vocabulary or update existing words:

1. **Prepare your TSV file** with this format:
   ```
   Thai_word    English_meaning    romanization<sup>TONE</sup>
   ```
   - Tones: L (Low), M (Mid), R (Rising), F (Falling), H (High)
   - Example: `สวัสดี    hello    sa<sup>L</sup> wat<sup>L</sup> dee<sup>M</sup>`

2. **Run the conversion script**
   ```bash
   python scripts/convert_tsv_to_json.py your_new_vocab.tsv
   ```

3. **Deploy the update**
   ```bash
   git add data/vocabulary.json
   git commit -m "Update vocabulary"
   git push
   ```

4. **Users will get the update** automatically on their next visit!

## 📁 Project Structure

```
thai-tone-quiz-pwa/
├── index.html              # Main HTML file with PWA meta tags
├── app.js                  # React application code (uses React.createElement, no build step)
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline support
├── data/
│   └── vocabulary.json     # Vocabulary data (842 words)
├── scripts/
│   └── convert_tsv_to_json.py  # TSV → JSON converter
├── icons/                  # App icons (you need to add these)
└── README.md              # This file
```

## 🎨 Adding Icons

You need to create app icons in the following sizes:

- 72x72, 96x96, 128x128, 144x144, 152x152, 167x167, 180x180, 192x192, 384x384, 512x512

**Quick way to generate icons:**

1. Create a 512x512 PNG logo
2. Use a tool like [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator):
   ```bash
   npx pwa-asset-generator logo.png icons/ --background "#4F46E5"
   ```

Or use online tools:
- [PWA Builder Image Generator](https://www.pwabuilder.com/imageGenerator)
- [Favicon.io](https://favicon.io/)

Save all icons in the `icons/` folder.

## 🔧 Customization

### Change Theme Color

Edit `manifest.json`:
```json
{
  "theme_color": "#4F46E5",  // Change this hex color
  "background_color": "#EFF6FF"
}
```

### Adjust Feedback Thresholds

Edit `app.js` and modify the `getFeedbackLevel` function:
```javascript
function getFeedbackLevel(correctCount, totalCount) {
  const percentage = (correctCount / totalCount) * 100;
  if (percentage <= 40) return 'poor';     // 0-40%
  if (percentage <= 70) return 'good';     // 41-70%
  if (percentage <= 90) return 'great';    // 71-90%
  return 'brilliant';                       // 91-100%
}
```

### Change Feedback Frequency

Edit `app.js` in the `checkAnswers` function:
```javascript
// Show feedback every 20 questions
if ((totalScore.total + 1) % 20 === 0) {  // Change 20 to your desired number
  setShowFeedback(true);
}
```

## 📊 Vocabulary Data Format

The `data/vocabulary.json` file has this structure:

```json
{
  "vocab": [
    {
      "thai": "สวัสดี",
      "meaning": "hello; good morning; good afternoon; good evening",
      "syllables": [
        { "romanization": "sa", "tone": "L" },
        { "romanization": "wat", "tone": "L" },
        { "romanization": "dee", "tone": "M" }
      ]
    }
  ],
  "metadata": {
    "total_entries": 842,
    "skipped_entries": 2,
    "source_file": "NewVocab.tsv",
    "generated_at": "2025-01-19T...",
    "format_version": "1.0"
  }
}
```

## 🐛 Troubleshooting

### App not loading?
- Check browser console for errors (F12)
- Make sure you're using HTTPS or localhost
- Clear browser cache and reload

### Icons not showing?
- Add icon files to the `icons/` folder
- Icons must match the sizes in `manifest.json`

### Vocabulary not updating?
- Check that `data/vocabulary.json` exists
- Verify JSON is valid (use [JSONLint](https://jsonlint.com/))
- Clear service worker cache:
  - Chrome: Dev Tools → Application → Clear Storage
  - Safari: Settings → Safari → Clear History

### Service Worker issues?
- Unregister old service workers in browser dev tools
- Increment cache version in `service-worker.js`

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to:
- Add more vocabulary
- Improve the UI
- Add new features
- Fix bugs
- Translate to other languages

## 🙏 Credits

Created with ❤️ for Thai language learners worldwide.

---

**Happy Learning! สู้ๆ นะ! 🎉**
