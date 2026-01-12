# TalkEasy

A beautiful English learning practice app with Duolingo-style UI. Built with pure HTML, CSS, and JavaScript — no frameworks, no build tools.

![TalkEasy](https://img.shields.io/badge/PWA-Ready-f43f5e) ![Static](https://img.shields.io/badge/Hosting-GitHub%20Pages-181717)

## Features

- **Learn Tab**: Duolingo-style lesson path with progress tracking
- **Talk Tab**: Practice sessions with voice chat interface
- **Profile Tab**: Stats, charts, and achievements
- **Voice Chat**: Speech-to-text and text-to-speech support
- **Dark Mode**: Toggle between light and dark themes
- **PWA Support**: Install as a standalone app, works offline
- **Mobile-First**: Designed for iPhone Pro Max dimensions (430×932)

## Tech Stack

- Pure HTML5, CSS3, JavaScript (ES6+)
- No frameworks, no dependencies, no build step
- Web Speech API for voice features
- Service Worker for offline caching
- ~1000 lines of code total

## Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/TalkEasy.git
cd TalkEasy

# Start a local server
python -m http.server 8000
# or
npx serve
```

Open `http://localhost:8000` in your browser.

### Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Push the code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/TalkEasy.git
   git push -u origin main
   ```
3. Go to **Settings** → **Pages** → Source: **Deploy from a branch** → **main** → **/ (root)**
4. Your app will be live at `https://YOUR_USERNAME.github.io/TalkEasy`

## File Structure

```
TalkEasy/
├── index.html              # Main app structure
├── css/
│   └── styles.css          # All styling (FluentFlow-inspired)
├── js/
│   ├── data.js             # Lessons, sessions, achievements data
│   └── app.js              # App logic, navigation, voice features
├── assets/
│   └── icon.svg            # App icon (rose gradient)
├── manifest.webmanifest    # PWA manifest
├── sw.js                   # Service worker
└── README.md               # This file
```

## UI Design

The UI is based on **FluentFlow AI** design:
- Clean white/dark backgrounds
- Rose (#f43f5e) and purple (#a855f7) accent colors
- Inter font family
- Rounded corners (16px-48px)
- Subtle shadows and borders
- iPhone Pro Max viewport (430×932)

## Voice Features

### Speech-to-Text
Click the microphone button to speak. Your speech is converted to text using the browser's Web Speech API (works best in Chrome/Edge).

### Text-to-Speech
AI responses are automatically read aloud using the browser's Speech Synthesis API.

## Browser Support

- Chrome 90+ ✅
- Edge 90+ ✅
- Safari 15+ ✅
- Firefox 90+ ⚠️ (limited speech recognition)

## Customization

### Change Colors
Edit `css/styles.css` and search for:
- `#f43f5e` (rose - primary)
- `#a855f7` (purple - secondary)
- `#10b981` (emerald - success)
- `#f59e0b` (amber - warning)

### Add Lessons
Edit `js/data.js` and modify the `LESSONS` array.

### Change Avatar
Replace the DiceBear URL in `index.html` with your preferred avatar service.

## License

MIT License - Free to use and modify.

---

Built with ❤️ for English learners
