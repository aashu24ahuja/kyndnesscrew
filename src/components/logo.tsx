import { SITE } from "@/lib/site";

export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="var(--forest)" />
      <path
        d="M20 30s-9-5.4-9-12.2A5 5 0 0 1 20 14.6a5 5 0 0 1 9 3.2C29 24.6 20 30 20 30Z"
        fill="var(--cream)"
      />
      <path d="M20 17.5c0 4 1.6 7 4.5 8.6" stroke="var(--leaf)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span
        className={`text-lg font-semibold tracking-tight whitespace-nowrap ${light ? "text-cream" : "text-pine"}`}
      >
        {SITE.name}
      </span>
    </span>
  );
}
