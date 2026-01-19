# App Icons

This folder should contain app icons in the following sizes:

## Required Icon Sizes

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png (iOS)
- icon-167x167.png (iOS iPad)
- icon-180x180.png (iOS)
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png
- favicon-16x16.png
- favicon-32x32.png

## How to Generate Icons

### Option 1: Use PWA Asset Generator (Recommended)

1. Create a 512x512 PNG logo
2. Run:
   ```bash
   npx pwa-asset-generator logo.png icons/ --background "#4F46E5" --padding "10%"
   ```

### Option 2: Use Online Tools

- **PWA Builder**: https://www.pwabuilder.com/imageGenerator
- **Favicon Generator**: https://favicon.io/
- **App Icon Generator**: https://appicon.co/

### Option 3: Manual Creation

Use any image editor (Photoshop, GIMP, etc.) to resize your logo to each size.

## Design Tips

- Use a simple, recognizable design
- Make sure text/icons are visible at small sizes
- Consider using the Thai character "ท" or tonal marks
- Use the app's theme color (#4F46E5) as background
- Add some padding so the icon doesn't feel cramped

## Example Icon Ideas

1. **Thai Character**: Large "ท" on colored background
2. **Tone Waves**: Visual representation of the 5 tones
3. **Speech Bubble**: With Thai text inside
4. **Musical Notes**: Representing the melodic tones

## Quick Simple Icon (Placeholder)

If you need a quick placeholder, create a 512x512 image with:
- Background: #4F46E5 (indigo)
- Text: "ท" in white, large and centered
- Save as PNG

Then resize to all required sizes.
