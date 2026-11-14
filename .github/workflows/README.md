
---

## `.github/workflows/admin-cache-bust.yml`

This workflow runs on every push to `main` that touches `/apps/admin/`. It doesn't change anything functionally — the SW is stateless — but it does two useful things:

1. **Touches the `sw.js` file mtime** so browsers detect a change and re-fetch assets (some older browsers only re-check SW when the file's byte content differs — adding a timestamp comment forces that).
2. **Optionally sends a build notification** to a webhook (commented out by default).

```yaml
name: Admin — Refresh Service Worker

on:
  push:
    branches: [main]
    paths:
      - 'apps/admin/**'
  workflow_dispatch: # allow manual trigger from the Actions tab

jobs:
  touch-sw:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Bump SW timestamp comment
        run: |
          SW_PATH="apps/admin/sw.js"
          if [ ! -f "$SW_PATH" ]; then
            echo "::warning::$SW_PATH not found — nothing to bump"
            exit 0
          fi

          # Remove any existing build marker line
          grep -v '^// build:' "$SW_PATH" > "$SW_PATH.tmp" || cp "$SW_PATH" "$SW_PATH.tmp"
          mv "$SW_PATH.tmp" "$SW_PATH"

          # Append a new marker with current UTC timestamp
          echo "// build: $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> "$SW_PATH"

          echo "New marker appended to $SW_PATH"

      - name: Commit bumped SW
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add apps/admin/sw.js

          if git diff --staged --quiet; then
            echo "No changes to commit — SW untouched"
          else
            git commit -m "chore(admin): bump SW build marker [skip ci]"
            git push
          fi

      # ── Optional: notify a webhook ─────────────────────────────────
      # Uncomment and add `WEBHOOK_URL` to Settings → Secrets if you want
      # a Discord/Slack notification whenever admin assets change.
      #
      # - name: Send webhook notification
      #   if: success()
      #   run: |
      #     curl -X POST "${{ secrets.WEBHOOK_URL }}" \
      #       -H "Content-Type: application/json" \
      #       -d '{"content":"🛠️ Admin assets updated on main"}'
