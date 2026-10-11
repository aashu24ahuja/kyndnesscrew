"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NEED_TYPES, URGENCY } from "@/lib/site";

export type ReportState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Partial<Record<"needs" | "location" | "description" | "consent", string>>;
  reference?: string;
};

const needValues = new Set<string>(NEED_TYPES.map((n) => n.value));
const urgencyValues = new Set<string>(URGENCY.map((u) => u.value));

function text(formData: FormData, key: string, max: number) {
  return String(formData.get(key) ?? "").trim().slice(0, max);
}

export async function submitReport(
  _prev: ReportState,
  formData: FormData,
): Promise<ReportState> {
  const needs = formData.getAll("needs").map(String).filter((n) => needValues.has(n));
  const location = text(formData, "location", 300);
  const landmark = text(formData, "landmark", 200);
  const description = text(formData, "description", 2000);
  const people = Math.min(Math.max(Number(formData.get("people")) || 1, 1), 500);
  const urgencyRaw = text(formData, "urgency", 20);
  const urgency = urgencyValues.has(urgencyRaw) ? urgencyRaw : "week";
  const reporterName = text(formData, "name", 100);
  const reporterPhone = text(formData, "phone", 20);
  const consent = formData.get("consent") === "on";

  const errors: ReportState["errors"] = {};
  if (needs.length === 0) errors.needs = "Pick at least one kind of help.";
  if (location.length < 3) errors.location = "Tell us where they can be found.";
  if (description.length < 10)
    errors.description = "A sentence or two helps our volunteers find and help them.";
  if (!consent) errors.consent = "Please confirm before submitting.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "A few details are missing.", errors };
  }

  const reference = `KC-${Date.now().toString(36).toUpperCase()}`;
  const record = {
    reference,
    submittedAt: new Date().toISOString(),
    needs,
    location,
    landmark,
    description,
    people,
    urgency,
    reporter: { name: reporterName, phone: reporterPhone },
    status: "pending-evaluation",
  };

  // Local file store for now; swap for a database before deploying.
  try {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "reports.jsonl"), JSON.stringify(record) + "\n");
  } catch (err) {
    console.error("Failed to store report", err);
    return {
      status: "error",
      message: "We couldn't save your report. Please try again in a moment.",
    };
  }

  return { status: "success", reference };
}
