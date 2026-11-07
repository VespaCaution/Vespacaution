# 🐝 AlvearCheck v1.3

**AlvearCheck** is a Progressive Web App (PWA) for beekeepers to track their apiaries and hives. It runs in the browser, can be installed on a phone, and works with voice commands in 5 languages.

---

## ✨ Features

- **Apiary Management:** Create apiaries with a name, orientation, and GPS coordinates.
- **Hive Tracking:** For each hive, record:
  - Number of male frames, honey frames, and brood frames.
  - Queen color (blue, white, yellow, red, green).
  - Number of varroa mites.
  - Swarm risk (with automatic 14-day alert).
  - Free-form remarks.
- **Visit History:** Every save creates a timestamped visit entry. Export visits as CSV.
- **Swarm Alerts:** If a hive is marked "at risk", a ⚠️ warning appears after 14 days.
- **AI Voice Dictation:** Use the microphone to fill forms and navigate the app. Powered by Groq (Whisper + LLM).
- **Cloud Sync:** Data is stored in Supabase and synced across devices.
- **Biometric Login:** Sign in with Face ID / fingerprint via Passkeys.
- **Multi-language:** English, French, German, Italian, and Romansh.
- **PWA:** Installable on Android and iOS. Works offline (after first load).
- **Pull-to-Refresh Disabled:** Prevents accidental page reloads on mobile.

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (single `index.html`).
- **Backend:** [Supabase](https://supabase.com/) (Auth + PostgreSQL database).
- **AI:** [Groq](https://groq.com/) (Whisper for transcription, Llama/Qwen for form understanding).
- **PWA:** `manifest.json` + `sw.js` (service worker).

---

## 🚀 Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/AlvearCheck.git
cd AlvearCheck
