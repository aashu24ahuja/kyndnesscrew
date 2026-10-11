"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { Logo } from "./logo";
import { ArrowIcon, CloseIcon, InstagramIcon, MenuIcon } from "./icons";

const LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#who-we-help", label: "Who we help" },
  { href: "#our-work", label: "Our work" },
  // { href: "#crew", label: "Crew" },
  { href: "#get-involved", label: "Get involved" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-18 w-full max-w-[88rem] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" aria-label={`${SITE.name} home`} onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] text-muted transition-colors hover:text-forest"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            className="hidden size-10 items-center justify-center rounded-full border border-line text-forest transition-colors hover:border-forest sm:flex"
          >
            <InstagramIcon className="size-5" />
          </a>
          <a
            href="#report"
            className="hidden rounded-full bg-forest px-5 py-2.5 text-sm font-medium whitespace-nowrap text-cream transition-colors hover:bg-pine sm:inline-block"
          >
            Report a need
          </a>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border border-line text-pine lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-cream lg:hidden">
          <ul className="mx-auto flex max-w-[88rem] flex-col px-5 pt-2 pb-5 sm:px-8">
            {LINKS.map((l) => (
              <li key={l.href} className="border-b border-line">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-lg text-ink hover:text-forest"
                >
                  {l.label}
                  <ArrowIcon className="size-4 text-muted" />
                </a>
              </li>
            ))}
            <li className="mt-5 grid grid-cols-[1fr_auto] gap-3">
              <a
                href="#report"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-full bg-forest px-6 py-3.5 font-medium text-cream"
              >
                Report someone in need
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${SITE.instagramHandle}`}
                className="flex size-[3.25rem] items-center justify-center rounded-full border border-line text-forest"
              >
                <InstagramIcon className="size-5" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
