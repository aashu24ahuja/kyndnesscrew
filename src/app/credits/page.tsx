import type { Metadata } from "next";
import Link from "next/link";
import credits from "@/lib/photo-credits.json";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Photo credits — ${SITE.name}`,
};

export default function CreditsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 sm:px-8">
      <Link href="/" className="text-sm text-forest hover:text-pine">
        ← Back to {SITE.name}
      </Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-pine">Photo credits</h1>
      <p className="mt-4 text-muted">
        Photographs on this site come from Wikimedia Commons and Unsplash and are used under the licences
        listed below.
      </p>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {credits.map((c) => (
          <li key={c.file} className="py-4 text-sm">
            <a
              href={c.source}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-pine hover:text-forest"
            >
              {c.title}
            </a>
            <p className="mt-1 text-muted">
              {c.author || "Unknown author"} · {c.license}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
