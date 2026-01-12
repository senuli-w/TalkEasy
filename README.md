# TalkEasy

A minimal, static English learning practice app with a beautiful UI. No backend required, no build step needed.

## Features

- **Learn Tab**: Browse lesson path with progress tracking
- **Talk Tab**: View practice sessions ready to start
- **Profile Tab**: Track your learning statistics
- **Responsive Design**: Works perfectly on mobile and desktop
- **PWA Support**: Install as a standalone app, works offline
- **Dark Theme**: Beautiful gradient dark UI inspired by FluentFlow

## Technology

- Pure HTML5, CSS3, and JavaScript
- No frameworks, no build tools, no dependencies
- ~200 lines of CSS + ~50 lines of JS
- Service Worker for offline support

## Quick Start

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/TalkEasy.git
   cd TalkEasy
   ```

2. Open `index.html` in your browser or run a local server:
   ```bash
   python -m http.server 8000
   # or
   npx http-server
   ```

3. Visit `http://localhost:8000` and start exploring

### Deploy to GitHub Pages

1. Create a new repository named `YOUR_USERNAME.github.io` on GitHub
2. Clone it locally and add TalkEasy files
3. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
   git push -u origin main
   ```
4. Enable GitHub Pages in repository settings (if needed)
5. Visit `https://YOUR_USERNAME.github.io`

**That's it!** No build step, no configuration needed.

## File Structure

```
TalkEasy/
├── index.html              # Main HTML file with all 3 tabs
├── css/
│   └── styles.css          # All styling (dark gradient theme)
├── js/
│   └── app.js              # Tab navigation + PWA setup
├── assets/
│   └── icon.svg            # App icon
├── manifest.webmanifest    # PWA metadata
├── sw.js                   # Service Worker for offline
└── README.md               # This file
```

## How It Works

### Tab Navigation
Click any tab at the bottom (Learn/Talk/Profile) to switch between pages. Simple vanilla JavaScript handles the switching—no framework overhead.

### Offline Support
The Service Worker caches all static files on first visit. If you open the app without internet, it loads from cache.

### Install as App
Click the install button (top right on mobile) to add TalkEasy to your home screen as a standalone app.

## Customization

- **Colors**: Edit the gradient colors in `css/styles.css` (look for `#667eea`, `#764ba2`, `#0b1220`)
- **Content**: Edit lesson/session/profile content in `index.html`
- **Brand**: Replace the "T" logo in `assets/icon.svg`

## Performance

- **Initial Load**: ~50KB total size (HTML + CSS + JS + SVG)
- **Cached Load**: Instant (Service Worker)
- **Lighthouse Score**: 95+ (PWA ready)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)

## License

Free to use and modify.

## Questions?

This is a static site—there's nothing to configure, no API keys needed, no environment variables. Just clone, customize, and deploy!
