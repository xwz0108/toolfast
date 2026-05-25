## What is Browser Fingerprinting?

Browser fingerprinting identifies users based on their browser's unique configuration — screen resolution, installed fonts, plugins, timezone, and dozens of other signals.

### How It Works

When you visit a website, your browser reveals:
- User agent string
- Screen resolution and color depth
- Installed fonts
- Timezone and language
- WebGL renderer info
- Canvas fingerprint
- Audio context fingerprint

### Why It Matters

Combined, these signals create a unique ID that can track you across websites — even without cookies.

### Privacy Score Factors

| Signal | Uniqueness |
|--------|-----------|
| Screen resolution | Medium |
| Installed fonts | High |
| WebGL fingerprint | Very High |
| Canvas fingerprint | Very High |

### How to Protect Yourself
1. Use a standard browser with default settings
2. Disable WebGL and Canvas where possible
3. Use privacy-focused browsers (Brave, Tor)
4. Install anti-fingerprinting extensions

[Check Your Fingerprint →](/tools/browser-fingerprint)
