"use client";

import { useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { EmailButton } from "@/components/EmailButton";
import { Icon } from "@/components/icons";
import { TurnstileWidget, turnstileEnabled } from "@/components/TurnstileWidget";
import { contact } from "@/data/site";
import { useSecureForm } from "@/lib/useSecureForm";

const FIELD =
  "mt-2 min-h-12 w-full rounded-2xl border border-line bg-sand/50 px-4 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

/** The download request form: not on the Play Store yet, so a request here gets the build by email. */
export function ApkRequestForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { token, setToken, resetSignal, status, message, failed, submit } =
    useSecureForm("/api/apk-request");
  const [challengeMessage, setChallengeMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const sent = await submit(
      {
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        device: String(data.get("device") ?? ""),
        website: String(data.get("website") ?? ""),
      },
      "Request received. We will email the current build to you within a day.",
    );

    if (sent) {
      // The one number that matters on this site: a request that actually landed.
      track("App request");
      formRef.current?.reset();
    }
  }

  if (!turnstileEnabled) {
    return (
      <div className="rounded-4xl border border-line bg-surface p-5 sm:p-6">
        <h2 className="text-xl font-semibold">Request the Android app</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          The online form is being prepared. Copy our address or call and we will send the current build straight away.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <EmailButton label="Copy our email address" />
          <a
            href={contact.phoneHref}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-ink"
          >
            Call {contact.phone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-4xl border border-line bg-surface p-5 sm:p-6">
      <h2 className="text-xl font-semibold">Request the Android app</h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
        Leave an email address and a little about your phone. We reply with the current build and the two steps to
        install it.
      </p>

      <form ref={formRef} className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="apk-website">Leave this field empty</label>
          <input id="apk-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Your name
            <input
              name="name"
              type="text"
              autoComplete="name"
              maxLength={80}
              minLength={2}
              required
              className={FIELD}
              placeholder="Name"
            />
          </label>

          <label className="block text-sm font-medium">
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              className={FIELD}
              placeholder="you@example.com"
            />
          </label>
        </div>

        <label className="block text-sm font-medium">
          Phone model or Android version <span className="font-normal text-muted">(optional)</span>
          <input
            name="device"
            type="text"
            maxLength={120}
            autoComplete="off"
            className={FIELD}
            placeholder="Samsung Galaxy A54 or similar"
          />
        </label>

        <TurnstileWidget
          action="apk_request"
          onToken={setToken}
          resetSignal={resetSignal}
          onFailure={() => setChallengeMessage("Verification did not load. Refresh the page or email us instead.")}
        />

        <button
          type="submit"
          disabled={!token || status === "sending"}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e86000] disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
        >
          {status === "sending" ? "Sending..." : status === "sent" ? "Send another request" : "Send my request"}
          {status !== "sending" && <Icon name="arrow" className="h-4 w-4" />}
        </button>

        <p
          aria-live="polite"
          role={failed ? "alert" : "status"}
          className={`text-sm leading-relaxed ${failed ? "text-cocoa" : "text-leaf"}`}
        >
          {message || challengeMessage}
        </p>

        <p className="max-w-xl text-xs leading-relaxed text-muted">
          We use these details only to reply to this request. Nothing is added to a mailing list.
        </p>
      </form>
    </div>
  );
}
