# Vespacaution — Admin Panel

Internal management interface for the Vespacaution committee. Not linked publicly except via the "Au comité" link on the members page.

## What it does

The admin panel lets the committee manage:

| Section | Purpose | Storage |
|---|---|---|
| **💰 Caisse** | Track income and expenses | `localStorage` + Gist sync |
| **📁 Archives** | Upload and organize internal documents | `localStorage` + Gist sync |
| **📝 Éditeur** | Write and save internal text documents | `localStorage` + Gist sync |
| **🛠️ Modifier le site** | Edit blog articles (5 languages), members (5 languages), and special thanks | `localStorage` + Gist sync |
| **📊 Analytics** | Read-only view of Umami statistics | Umami share URL |

All content edits are **drafts** until you click **☁️ Sauvegarder**. Until then, they live only in your browser's `localStorage`.

## First-time setup

### 1. Configure the GitHub token

The admin panel needs a GitHub Personal Access Token (PAT) to save data to the Gist that all visitors read from.

**Create the token:**

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Fine-grained token"** (recommended) or **"Classic token"**
3. Give it a name like `vespacaution-admin-write`
4. **Scope** — pick the minimum:
   - **Fine-grained:** *Gists → Read and write* on the specific Gist `f4fe8523136960f0289660123aa32cb7`
   - **Classic:** check only `gist` scope
5. Set an expiration — 90 days is a good default. **Note the date somewhere** and rotate it before it expires.
6. Generate and **copy the token** (starts with `github_pat_...` or `ghp_...`)

**Insert the token in `index.html`:**

Find this line in the `<script>`:

```javascript
const GITHUB_TOKEN = "%%TOKEN_SECRET%%";
