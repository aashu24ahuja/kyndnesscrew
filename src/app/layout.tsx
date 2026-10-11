import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SITE.name} — Report someone in need`,
  description: SITE.description,
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
