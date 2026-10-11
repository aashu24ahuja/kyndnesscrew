import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

export type Report = {
  reference: string;
  needs: string[];
  location: string;
  landmark: string;
  description: string;
  people: number;
  urgency: string;
  reporter: { name: string; phone: string };
};

/**
 * Saves a report to the Supabase `reports` table (see supabase/migrations).
 * Without Supabase settings, development falls back to data/reports.jsonl;
 * production throws so reports are never silently dropped.
 */
export async function saveReport(report: Report): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (url && key) {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    // Insert-only: the anon role has no select policy, so don't ask for the row back.
    const { error } = await supabase.from("reports").insert({
      reference: report.reference,
      needs: report.needs,
      location: report.location,
      landmark: report.landmark || null,
      description: report.description,
      people: report.people,
      urgency: report.urgency,
      reporter_name: report.reporter.name || null,
      reporter_phone: report.reporter.phone || null,
    });
    if (error) throw new Error(`Supabase insert failed: ${error.code} ${error.message}`);
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY must be set");
  }

  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(dir, "reports.jsonl"),
    JSON.stringify({ ...report, submittedAt: new Date().toISOString() }) + "\n",
  );
}
