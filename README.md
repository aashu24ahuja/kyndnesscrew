# kyndnesscrew
A community-driven platform to identify and assist underprivileged individuals. Provides an intake system to collect reports of people in need for on-the-ground evaluation.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without Supabase settings, reports are written to `data/reports.jsonl` (git-ignored).

## Report intake (Supabase)

Reports from the form are inserted into the `reports` table in Supabase.

1. In the Supabase dashboard, open **SQL Editor**, paste [`supabase/migrations/20261011000000_create_reports.sql`](supabase/migrations/20261011000000_create_reports.sql) and run it.
2. Set the environment variables (in `.env.local` locally, and in your hosting provider for production):

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   ```

3. Submit a test report; it appears in **Table Editor → reports** with status `new`.

Row-level security lets the public key **insert** reports only — nobody can read, change or delete them through the site's key. The team triages in the Table Editor using the `status` (`new`, `assigned`, `visited`, `helped`, `closed`), `volunteer` and `notes` columns. Reports include reporters' phone numbers, so only invite verified volunteers to the Supabase project.

Without Supabase settings, development writes reports to `data/reports.jsonl`; production refuses submissions rather than losing them.
