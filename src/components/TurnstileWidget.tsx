"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          action: string;
          theme: "light";
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

/** False when no challenge key is configured, so forms can offer email instead. */
export const turnstileEnabled = SITE_KEY.length > 0;

/**
 * Cloudflare's invisible-friendly challenge. The token it produces is single
 * use, so the parent bumps `resetSignal` after every attempt to arm a new one.
 */
export function TurnstileWidget({
  action,
  onToken,
  onFailure,
  resetSignal = 0,
}: {
  action: string;
  onToken: (token: string) => void;
  onFailure?: () => void;
  resetSignal?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const tokenRef = useRef(onToken);
  const failureRef = useRef(onFailure);
  const previousReset = useRef(resetSignal);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    tokenRef.current = onToken;
    failureRef.current = onFailure;
  }, [onToken, onFailure]);

  useEffect(() => {
    if (!SITE_KEY || !scriptReady || !containerRef.current || !window.turnstile) return;

    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      action,
      theme: "light",
      callback: (value) => tokenRef.current(value),
      "expired-callback": () => tokenRef.current(""),
      "error-callback": () => {
        tokenRef.current("");
        failureRef.current?.();
      },
    });
    widgetIdRef.current = widgetId;

    return () => {
      if (widgetIdRef.current) window.turnstile?.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [scriptReady, action]);

  useEffect(() => {
    if (previousReset.current === resetSignal) return;
    previousReset.current = resetSignal;
    if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
  }, [resetSignal]);

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} aria-label="Complete the security check" />
      {!scriptReady && <p className="text-xs text-muted">Loading the security check...</p>}
    </>
  );
}
