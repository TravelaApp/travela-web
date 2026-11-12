"use client";

import { useRef, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { EmailButton } from "@/components/EmailButton";
import { Icon } from "@/components/icons";
import { TurnstileWidget, turnstileEnabled } from "@/components/TurnstileWidget";
import { COUNTIES } from "@/data/counties";
import { contact } from "@/data/site";
import { useSecureForm } from "@/lib/useSecureForm";

const FIELD =
  "mt-2 min-h-12 w-full rounded-2xl border border-line bg-sand/50 px-4 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

/** The launch waitlist: leave an email and hear the moment Travela is live on Google Play. */
export function WaitlistForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { token, setToken, resetSignal, status, message, failed, submit } =
    useSecureForm("/api/waitlist");
  const [challengeMessage, setChallengeMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const sent = await submit(
      {
        email: String(data.get("email") ?? ""),
        name: String(data.get("name") ?? ""),
        county: String(data.get("county") ?? ""),
        website: String(data.get("website") ?? ""),
      },
      "You are on the list. We will email you the moment Travela is live on Google Play.",
    );

    if (sent) {
      // The one number that matters on this site: a signup that actually landed.
      track("Waitlist signup");
      formRef.current?.reset();
    }
  }

  if (!turnstileEnabled) {
    return (
      <div className="rounded-4xl border border-line bg-surface p-5 sm:p-6">
        <h2 className="text-xl font-semibold">Join the waitlist</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          The online form is being prepared. Copy our address or call and we will let you know the moment Travela is
          live on Google Play.
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
      <h2 className="text-xl font-semibold">Join the waitlist</h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
        Leave an email address and we will tell you the moment Travela is live on Google Play.
      </p>

      <form ref={formRef} className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="waitlist-website">Leave this field empty</label>
          <input id="waitlist-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
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

          <label className="block text-sm font-medium">
            Your name <span className="font-normal text-muted">(optional)</span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              maxLength={80}
              className={FIELD}
              placeholder="Name"
            />
          </label>
        </div>

        <label className="block text-sm font-medium">
          County <span className="font-normal text-muted">(optional)</span>
          <select name="county" defaultValue="" className={FIELD}>
            <option value="">Prefer not to say</option>
            {COUNTIES.map((county) => (
              <option key={county.id} value={county.name}>
                {county.name}
              </option>
            ))}
          </select>
        </label>

        <TurnstileWidget
          action="waitlist"
          onToken={setToken}
          resetSignal={resetSignal}
          onFailure={() => setChallengeMessage("Verification did not load. Refresh the page or email us instead.")}
        />

        <button
          type="submit"
          disabled={!token || status === "sending"}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e86000] disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
        >
          {status === "sending" ? "Sending..." : status === "sent" ? "Add another email" : "Join the waitlist"}
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
          Joining means one launch email and nothing else. The{" "}
          <a
            href="/privacy#waitlist"
            className="underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
          >
            privacy policy
          </a>{" "}
          explains how your address is stored.
        </p>

        <p className="max-w-xl text-xs leading-relaxed text-muted">
          We use these details only to tell you when Travela is live on Google Play.
        </p>
      </form>
    </div>
  );
}
