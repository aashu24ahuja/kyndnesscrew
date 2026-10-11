/**
 * Kindness Crew — report intake web app.
 *
 * Paste this into the sheet's Extensions → Apps Script editor, set the SECRET
 * script property, and deploy as a web app (see README "Report intake").
 * The website POSTs { secret, row } here; each report becomes one row.
 */

const SHEET_NAME = "Reports";

const COLUMNS = [
  ["reference", "Reference"],
  ["submittedAt", "Submitted at"],
  ["urgency", "Urgency"],
  ["needs", "Needs"],
  ["location", "Location"],
  ["landmark", "Landmark"],
  ["description", "What they saw"],
  ["people", "People"],
  ["reporterName", "Reporter name"],
  ["reporterPhone", "Reporter phone"],
];

// Filled in by volunteers, not by the website.
const TEAM_COLUMNS = ["Status", "Volunteer", "Notes"];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("SECRET");
    if (!secret || body.secret !== secret) {
      return json({ ok: false, error: "unauthorized" });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getSheet();
      const row = body.row || {};
      const values = COLUMNS.map(([key]) => {
        if (key === "submittedAt") return new Date(row.submittedAt || Date.now());
        if (key === "people") return Number(row.people) || 1;
        return asText(row[key]);
      });
      sheet.appendRow(values.concat(["New", "", ""]));

      if (row.urgency === "Needs help today") {
        sheet.getRange(sheet.getLastRow(), 1, 1, COLUMNS.length + TEAM_COLUMNS.length)
          .setBackground("#fdf1d3");
      }
    } finally {
      lock.releaseLock();
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    const headers = COLUMNS.map(([, label]) => label).concat(TEAM_COLUMNS);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#d3e9d8");
    sheet.setFrozenRows(1);
    sheet.getRange("B:B").setNumberFormat("dd mmm yyyy, hh:mm");
  }
  return sheet;
}

// Keep user text as plain text: a leading = + - @ would otherwise be parsed as a formula.
function asText(value) {
  const s = value == null ? "" : String(value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
