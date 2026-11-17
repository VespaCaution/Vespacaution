# 🐝 Vespacaution - Save the Bee (Mini-Game)

A lightweight, fully offline-capable HTML5 canvas game designed to replace the default browser "No Internet" screen (Chrome Dino / Edge offline) on the Vespacaution platform. 

---

## 🎮 Gameplay & Mechanics

- **Objective:** Collect as many flowers (🌻) as possible while dodging spike balls (🪨).
- **Controls:** 
  - **Mobile:** Swipe Left or Right to change lanes.
  - **Desktop:** Press `←` / `A` or `→` / `D` to change lanes.
- **Lives:** You start with 3 hearts (❤️❤️❤️). You lose a life if you hit a spike ball OR if you let a flower fall off the bottom of the screen.
- **Healing:** Collect 10 flowers to regain 1 heart (max 3 hearts).
- **Scoring:** Each flower gives **+10 points**. Hitting a spike ball deducts **-20 points** (score cannot go below 0).
- **Speed Levels:** The game features 3 speed levels that increase as your score gets higher (Level 2 at 100 points, Level 3 at 250 points).
- **Sharing:** When you get a Game Over, you can share your score using the native Web Share API (or copy it to clipboard on desktop).

---

## 🌍 Multi-Language Support

The game automatically detects the user's preferred language via the main site's `localStorage` key (`vespacaution_lang`). It supports 5 languages:
- 🇬🇧 English (`en`)
- 🇫🇷 French (`fr`)
- 🇩🇪 German (`de`)
- 🇮🇹 Italian (`it`)
- 🇨🇭 Romansh (`rm`)

---

## 📱 PWA & Offline Capabilities

This game is built as a **Progressive Web App (PWA)**. It can be installed directly to the home screen on iOS and Android.

### Files included:
1. `index.html` - The game engine, UI, and styling.
2. `manifest.json` - PWA manifest for installation.
3. `sw.js` - Service Worker to cache the game and assets for offline play.

### How the Offline Fallback Works:
When a user is on the main Vespacaution website and loses internet connection:
1. The browser attempts to fetch the requested page.
2. The main site's Service Worker catches the network failure.
3. Instead of showing the default Chrome Dino screen, it serves `/apps/bee-game/index.html`.
4. A message displays: *"This section is currently in maintenance, deleted, or you are offline."*
5. The user can play the game and click "← Back to Main Site" to try connecting again.

---

## 🎨 Dark Mode

The game fully respects the user's system preferences (`prefers-color-scheme`).
- **Light Mode:** Uses the standard Vespacaution gold and white theme.
- **Dark Mode:** Uses a deep grey/black theme with gold accents to reduce eye strain and blend perfectly with the main site's dark mode.

---

## 🛠️ Technical Details

- **Engine:** Pure HTML5 Canvas and Vanilla JavaScript (no external libraries required).
- **Styling:** CSS Variables for easy theme management.
- **Assets:** Uses native Emojis (🐝, 🌻, 🪨, ❤️) for graphics, meaning **zero external image downloads** are required. The game loads instantly, even on 2G connections.
- **Audio:** Currently muted by default to respect user privacy and avoid annoying sounds during offline usage.

---

## 🚀 How to integrate (For Developers)

If you are setting up the Service Worker on the main site, make sure your fallback route points to this game:

```javascript
const OFFLINE_URL = '/apps/bee-game/index.html';

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(OFFLINE_URL);
            })
        );
    }
});
