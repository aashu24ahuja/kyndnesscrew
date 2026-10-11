import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

// Set NEXT_PUBLIC_SITE_URL in production so share images resolve to absolute URLs.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} — Report someone in need`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — Saw someone in need? Tell us.`,
    description: SITE.description,
    url: "/",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Saw someone in need? Tell us.`,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#146c3c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Extensions (e.g. ColorZilla) inject attributes on <html>/<body> before hydration.
    <html
      lang="en"
      className={`${lexend.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
