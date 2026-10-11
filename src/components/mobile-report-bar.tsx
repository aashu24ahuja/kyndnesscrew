"use client";

import { useEffect, useState } from "react";
import { ArrowIcon } from "./icons";

// Phone-only call to action pinned to the bottom of the screen. Hidden while
// the hero (which has its own button) or the report form itself is on screen.
export function MobileReportBar() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [reportVisible, setReportVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const report = document.getElementById("report");
    if (!hero || !report) return;

    const heroObserver = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), {
      rootMargin: "0px 0px -40% 0px",
    });
    const reportObserver = new IntersectionObserver(([e]) => setReportVisible(e.isIntersecting));
    heroObserver.observe(hero);
    reportObserver.observe(report);
    return () => {
      heroObserver.disconnect();
      reportObserver.disconnect();
    };
  }, []);

  const show = !heroVisible && !reportVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <a
        href="#report"
        tabIndex={show ? 0 : -1}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-base font-medium text-cream transition-colors hover:bg-pine"
      >
        Report someone in need <ArrowIcon className="size-5" />
      </a>
    </div>
  );
}
