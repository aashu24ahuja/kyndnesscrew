import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NEED_TYPES, URGENCY } from "@/lib/site";

export type Report = {
  reference: string;
  submittedAt: string;
  needs: string[];
  location: string;
  landmark: string;
  description: string;
  people: number;
  urgency: string;
  reporter: { name: string; phone: string };
};

const needLabel = new Map<string, string>(NEED_TYPES.map((n) => [n.value, n.label]));
const urgencyLabel = new Map<string, string>(URGENCY.map((u) => [u.value, u.label]));

/**
 * Saves a report to the Google Sheet (via the Apps Script web app in
 * google-apps-script/Code.gs) when GOOGLE_SHEET_WEBHOOK_URL is set.
 * Without it, development falls back to data/reports.jsonl; production throws
 * so reports are never silently dropped.
 */
export async function saveReport(report: Report): Promise<void> {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEET_SECRET;

  if (url && secret) {
    await saveToSheet(url, secret, report);
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("GOOGLE_SHEET_WEBHOOK_URL and GOOGLE_SHEET_SECRET must be set in production");
  }

  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "reports.jsonl"), JSON.stringify(report) + "\n");
}

async function saveToSheet(url: string, secret: string, report: Report) {
  // Human-readable values so volunteers can work straight from the sheet.
  const row = {
    reference: report.reference,
    submittedAt: report.submittedAt,
    urgency: urgencyLabel.get(report.urgency) ?? report.urgency,
    needs: report.needs.map((n) => needLabel.get(n) ?? n).join(", "),
    location: report.location,
    landmark: report.landmark,
    description: report.description,
    people: report.people,
    reporterName: report.reporter.name,
    reporterPhone: report.reporter.phone,
  };

  // Apps Script answers with a redirect to the script output; fetch follows it.
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, row }),
    signal: AbortSignal.timeout(15_000),
    cache: "no-store",
  });

  const body = await res.text();
  let parsed: { ok?: boolean; error?: string } = {};
  try {
    parsed = JSON.parse(body);
  } catch {
    // Non-JSON means the web app isn't deployed for "Anyone" or the URL is wrong.
  }

  if (!res.ok || !parsed.ok) {
    throw new Error(
      `Google Sheet webhook failed (${res.status}): ${parsed.error ?? body.slice(0, 200)}`,
    );
  }
}
