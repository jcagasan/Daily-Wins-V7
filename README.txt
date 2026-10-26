Daily Wins V10 — Configuration, Google Drive backup, and opt-in private cloud synchronization.

IMPORTANT: Existing data remains under dailyWins.v2. Keep the same GitHub Pages URL. Do not clear website data or reinstall as a troubleshooting step.

Configuration contains backup, privacy, and connected-list settings. Cloud sync is OFF until you connect with your private device key. No keys are included in these public files. An empty cloud cannot replace populated device data.

To migrate, choose Prepare migration backup, retain the downloaded JSON in a recoverable location, then choose Verify saved backup and migrate and select that exact saved file. Migration verifies the saved backup, full cloud payload, counts and typed IDs before enabling sync. If edits conflict, sync pauses and preserves both copies.

Google Drive authorization and the local phone PIN/unlock are retained. Midnight carry-forward and task moves preserve IDs, notes and extra fields. History now retains full daily task records as well as aggregate totals.

After an update, fully close the PWA and browser tabs using this site, then reopen. The service worker waits for existing windows to close before activation. Do not clear storage.

The backend is hosted separately on Cloudflare Workers Free + D1. ChatGPT requires a separately configured private MCP connection or custom GPT Action; this frontend does not call a model API. The PWA must be open and authorized to sync.

Previous working V9 source commit: 46a9dd3fa13584b8059de134b68fff53968fb105. Source rollback must keep dailyWins.v2 intact and does not automatically undo cloud edits.
