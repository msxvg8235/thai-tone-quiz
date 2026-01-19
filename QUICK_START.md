# 🚀 QUICK START - Thai Tone Quiz PWA

## ⚡ 3 Steps to Deploy (5 minutes!)

### Step 1: Unzip & Upload to GitHub

```bash
# Unzip the file
unzip thai-tone-quiz-pwa.zip
cd thai-tone-quiz-pwa

# Initialize git
git init
git add .
git commit -m "Initial commit: Thai Tone Quiz PWA"

# Create repository on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/thai-tone-quiz.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Source", select **GitHub Actions**
4. Done!

### Step 3: Wait & Access

Wait 2-3 minutes, then visit:
```
https://YOUR_USERNAME.github.io/thai-tone-quiz/
```

## 📱 Install on Phone

**iOS:**
1. Open in Safari
2. Tap Share → Add to Home Screen

**Android:**
1. Open in Chrome
2. Tap Menu → Add to Home Screen

## ✅ What's Included

- ✅ Complete PWA (842 Thai words)
- ✅ All 12 icons (generated & included!)
- ✅ Service worker (offline support)
- ✅ GitHub Actions (auto-deploy)
- ✅ Update script (for new vocabulary)
- ✅ Full documentation

## 🔄 Update Vocabulary Later

```bash
# Create a TSV file with format:
# Thai_word    Meaning    romanization<sup>TONE</sup>

# Convert to JSON:
python scripts/convert_tsv_to_json.py new-vocab.tsv

# Deploy:
git add data/vocabulary.json
git commit -m "Update vocabulary"
git push
```

## 📚 Full Documentation

- **DEPLOYMENT.md** - Detailed deployment guide
- **README.md** - Complete documentation
- **PROJECT_OVERVIEW.md** - Feature overview
- **scripts/README.md** - Vocabulary update guide

## 🎉 That's It!

Your Thai Tone Quiz is ready to use!

**Questions?** Check the documentation files or open an issue on GitHub.

---

**Happy Learning! สู้ๆ! 🇹🇭**
