"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";

/** How far down the page, in pixels, before the button shows itself. */
const SHOW_AFTER = 600;

/** A quiet back-to-top button that fades in after the first screen. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-[0_18px_40px_-18px_rgba(17,17,17,0.5)] transition-all duration-300 hover:border-ink sm:bottom-8 sm:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <Icon name="arrow" className="h-5 w-5 -rotate-90" />
    </button>
  );
}
