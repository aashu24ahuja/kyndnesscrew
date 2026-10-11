import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — Saw someone in need? Tell us.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const assets = join(process.cwd(), "assets");
const [semiBold, regular, photo] = await Promise.all([
  readFile(join(assets, "Lexend-SemiBold.woff")),
  readFile(join(assets, "Lexend-Regular.woff")),
  readFile(join(assets, "og-photo.jpg"), "base64"),
]);

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0d3b24",
          fontFamily: "Lexend",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${photo}`}
          width={1200}
          height={630}
          alt=""
          style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, rgba(13,59,36,0.96) 0%, rgba(13,59,36,0.8) 45%, rgba(13,59,36,0.15) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="64" height="64" viewBox="0 0 40 40">
              <rect width="40" height="40" rx="12" fill="#146c3c" />
              <path
                d="M20 30s-9-5.4-9-12.2A5 5 0 0 1 20 14.6a5 5 0 0 1 9 3.2C29 24.6 20 30 20 30Z"
                fill="#fbfaf4"
              />
              <path
                d="M20 17.5c0 4 1.6 7 4.5 8.6"
                stroke="#2f9e5b"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <span style={{ fontSize: 36, fontWeight: 600, color: "#fbfaf4" }}>{SITE.name}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                fontSize: 76,
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: -2,
                color: "#fbfaf4",
              }}
            >
              <span>Saw someone in need?&nbsp;</span>
              <span style={{ color: "#f4c35a" }}>Tell us.</span>
            </div>
            <div style={{ marginTop: 24, fontSize: 30, color: "rgba(251,250,244,0.85)" }}>
              Report a person in need. Our volunteers check on the ground.
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 24, color: "rgba(251,250,244,0.7)" }}>
            {SITE.instagramHandle}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Lexend", data: regular, style: "normal", weight: 400 },
        { name: "Lexend", data: semiBold, style: "normal", weight: 600 },
      ],
    },
  );
}
