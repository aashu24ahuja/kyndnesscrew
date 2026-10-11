# kyndnesscrew
A community-driven platform to identify and assist underprivileged individuals. Provides an intake system to collect reports of people in need for on-the-ground evaluation.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without Google Sheet settings, reports are written to `data/reports.jsonl` (git-ignored).

## Report intake (Google Sheet)

Reports from the form are added as rows to a Google Sheet through a small Apps Script web app.

1. Create a Google Sheet (e.g. "Kindness Crew reports") with the account that should own the data.
2. In the sheet, open **Extensions → Apps Script**, replace the contents of `Code.gs` with [`google-apps-script/Code.gs`](google-apps-script/Code.gs), and save.
3. Generate a long random secret (for example `openssl rand -hex 32`). In Apps Script open **Project Settings → Script properties**, add a property named `SECRET` with that value.
4. Click **Deploy → New deployment**, choose type **Web app**, set **Execute as: Me** and **Who has access: Anyone**, then deploy and authorise. Copy the web app URL (ends in `/exec`).
5. Set the environment variables (in `.env.local` for local testing, and in your hosting provider for production):

   ```
   GOOGLE_SHEET_WEBHOOK_URL=<web app URL>
   GOOGLE_SHEET_SECRET=<the same secret>
   ```

6. Submit a test report on the site. A **Reports** tab appears with a header row; "Needs help today" rows are highlighted. Volunteers can use the **Status**, **Volunteer** and **Notes** columns.

Reports contain reporters' phone numbers, so share the sheet only with verified volunteers. If you edit `Code.gs` later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.

In production, the site refuses to accept reports if the sheet isn't configured, so nothing is silently lost.
