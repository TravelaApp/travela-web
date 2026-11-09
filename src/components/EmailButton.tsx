"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { contact } from "@/data/site";

const BUTTON =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e86000]";

/** Email as an action without the dead end: a bare mailto: opens an empty tab when no mail app is set up, so the address is copied to the clipboard and shown for manual use. */
export function EmailButton({
  label = "Copy email address",
  showAddress = true,
  className = BUTTON,
}: {
  label?: string;
  showAddress?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2_500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-2">
      <button type="button" onClick={copyAddress} className={className}>
        <Icon name={copied ? "check" : "mail"} className="h-4 w-4" />
        {copied ? "Address copied" : label}
      </button>
      {showAddress && <span className="text-sm text-muted">{contact.email}</span>}
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </span>
  );
}
