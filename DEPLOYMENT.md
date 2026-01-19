# Deployment Guide

Complete step-by-step guide to deploy your Thai Tone Quiz PWA to GitHub Pages.

## 📋 Prerequisites

- A GitHub account
- Git installed on your computer
- The thai-tone-quiz-pwa folder from Claude

## 🚀 Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Fill in the details:
   - **Repository name**: `thai-tone-quiz` (or any name you like)
   - **Description**: "Progressive Web App to learn Thai tones"
   - **Public** or **Private** (your choice, but Public is needed for free GitHub Pages)
   - **DO NOT** check "Add a README file" (we already have one)
4. Click **Create repository**

## 🔧 Step 2: Push Code to GitHub

Open Terminal (Mac/Linux) or Command Prompt (Windows) and run:

```bash
# Navigate to your project folder
cd path/to/thai-tone-quiz-pwa

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Thai Tone Quiz PWA"

# Rename branch to main
git branch -M main

# Add GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/thai-tone-quiz.git

# Push to GitHub
git push -u origin main
```

### If you get authentication errors:

**Option A: Use Personal Access Token (Recommended)**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Thai Tone Quiz")
4. Check the "repo" scope
5. Click "Generate token"
6. Copy the token (you won't see it again!)
7. When pushing, use the token as your password

**Option B: Use SSH**
1. Follow [GitHub's SSH guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
2. Use SSH URL instead: `git@github.com:YOUR_USERNAME/thai-tone-quiz.git`

## 📄 Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top navigation)
3. Click **Pages** (left sidebar)
4. Under "Source":
   - Select **GitHub Actions** (not "Deploy from a branch")
5. GitHub Actions will automatically deploy on every push!

## ⏳ Step 4: Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow running (yellow dot)
3. Wait 2-3 minutes for it to complete (green checkmark)
4. Once complete, your app is live!

## 🌐 Step 5: Access Your App

Your app will be available at:
```
https://YOUR_USERNAME.github.io/thai-tone-quiz/
```

For example, if your username is `john123` and repo is `thai-tone-quiz`:
```
https://john123.github.io/thai-tone-quiz/
```

## 📱 Step 6: Add Icons (Important!)

Right now, your app has no icons. To add them:

### Quick Method: Use an Icon Generator

1. Create or find a 512x512 PNG image for your app icon
   - Simple idea: Thai character "ท" on blue background
   - Use free design tools like [Canva](https://canva.com)

2. Use PWA Asset Generator:
   ```bash
   cd thai-tone-quiz-pwa
   npx pwa-asset-generator your-logo.png icons/ --background "#4F46E5"
   ```

3. Push the icons:
   ```bash
   git add icons/
   git commit -m "Add app icons"
   git push
   ```

### Manual Method:

1. Create icons in these sizes:
   - 72x72, 96x96, 128x128, 144x144, 152x152, 167x167, 180x180
   - 192x192, 384x384, 512x512
   - favicon-16x16, favicon-32x32

2. Save them in the `icons/` folder

3. Push to GitHub:
   ```bash
   git add icons/
   git commit -m "Add app icons"
   git push
   ```

## 🔄 Updating Your App

Whenever you make changes:

```bash
# Make your changes
# Then:

git add .
git commit -m "Description of your changes"
git push
```

GitHub Actions will automatically rebuild and deploy!

## 📊 Updating Vocabulary

When you have new vocabulary:

1. Prepare your TSV file with format:
   ```
   ThaiWord    Meaning    romanization<sup>TONE</sup>
   ```

2. Convert to JSON:
   ```bash
   python scripts/convert_tsv_to_json.py new-vocab.tsv
   ```

3. Deploy:
   ```bash
   git add data/vocabulary.json
   git commit -m "Update vocabulary"
   git push
   ```

## 🐛 Troubleshooting

### "remote: Permission denied"
- Check your GitHub username and password/token
- Make sure you have write access to the repository

### "This site can't be reached"
- Wait 5-10 minutes after deployment
- Check that GitHub Pages is enabled in Settings → Pages
- Verify the URL format: `username.github.io/repository-name`

### Actions workflow failing?
- Go to Actions tab and click on the failed workflow
- Check the error message
- Common issue: Make sure "GitHub Actions" is selected as source in Pages settings

### Icons not showing?
- Make sure icon files are in the `icons/` folder
- Check that filenames match those in `manifest.json`
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### App not updating after push?
- Clear browser cache
- Hard reload (Ctrl+Shift+R or Cmd+Shift+R)
- Wait a few minutes for GitHub to rebuild
- Check Actions tab to see if deployment completed

## 🎨 Custom Domain (Optional)

If you want to use your own domain (e.g., thai-quiz.com):

1. Buy a domain from a registrar (Namecheap, Google Domains, etc.)
2. In GitHub: Settings → Pages → Custom domain
3. Enter your domain and click Save
4. Add DNS records at your domain registrar:
   - Type: A
   - Name: @ (or www)
   - Value: GitHub Pages IPs (see GitHub docs)
5. Wait 24-48 hours for DNS propagation

## 🔒 HTTPS

GitHub Pages automatically provides HTTPS for your app. Make sure:
- "Enforce HTTPS" is checked in Settings → Pages
- This is important for PWA features to work!

## 📱 Testing on iOS

1. Open Safari on iPhone/iPad
2. Go to your GitHub Pages URL
3. Tap Share button → Add to Home Screen
4. The app installs like a native app!

## ✅ Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled (using GitHub Actions)
- [ ] Deployment workflow completed successfully
- [ ] App accessible at github.io URL
- [ ] Icons added and pushed
- [ ] Tested on mobile device
- [ ] PWA install works on iOS/Android

## 🎉 You're Done!

Your Thai Tone Quiz is now live and accessible to anyone in the world!

Share the URL with your friends and start learning Thai tones together! 🇹🇭

---

**Need help?** Check the main README.md or create an issue on GitHub.
