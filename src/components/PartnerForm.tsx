"use client";

import { useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/icons";
import { TurnstileWidget, turnstileEnabled } from "@/components/TurnstileWidget";
import { contact } from "@/data/site";
import { useSecureForm } from "@/lib/useSecureForm";

const FIELD =
  "mt-2 min-h-12 w-full rounded-2xl border border-line bg-sand/50 px-4 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

const PARTNER_TYPES = [
  { id: "travel", label: "Travel / tours & guides" },
  { id: "car-hire", label: "Car hire" },
  { id: "other", label: "Other" },
] as const;

export function PartnerForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { token, setToken, resetSignal, status, message, failed, submit } = useSecureForm("/api/partners");
  const [challengeMessage, setChallengeMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const sent = await submit(
      {
        company: String(data.get("company") ?? ""),
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        partnerType: String(data.get("partnerType") ?? ""),
        websitePublic: String(data.get("websitePublic") ?? ""),
        message: String(data.get("message") ?? ""),
        website: String(data.get("website") ?? ""),
      },
      "Enquiry sent. We will reply from admin@travelaapp.co.ke.",
    );

    if (sent) formRef.current?.reset();
  }

  if (!turnstileEnabled) {
    return (
      <div className="rounded-4xl border border-line bg-surface p-7 sm:p-9">
        <h2 className="text-xl font-semibold">Partner enquiry</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          The form is being prepared. Email us directly at {contact.partnersEmail} with your company name, services and counties you cover.
        </p>
        <a
          href={`mailto:${contact.partnersEmail}?subject=Travela%20partner%20enquiry`}
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e86000]"
        >
          <Icon name="mail" className="h-4 w-4" />
          Email {contact.partnersEmail}
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-4xl border border-line bg-surface p-7 sm:p-9">
      <h2 className="text-xl font-semibold">Partner enquiry</h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
        Tell us who you are and what you offer. Messages go straight to {contact.partnersEmail}.
      </p>

      <form ref={formRef} className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="partners-website-honeypot">Leave this field empty</label>
          <input id="partners-website-honeypot" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <label className="block text-sm font-medium">
          Company or brand name
          <input
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={120}
            minLength={2}
            required
            className={FIELD}
            placeholder="Your company"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
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
            Work email
            <input
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              className={FIELD}
              placeholder="you@company.co.ke"
            />
          </label>
        </div>

        <label className="block text-sm font-medium">
          Partner type
          <select name="partnerType" defaultValue="travel" className={`${FIELD} appearance-none`}>
            {PARTNER_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium">
          Website or social link
          <span className="font-normal text-muted"> (optional)</span>
          <input
            name="websitePublic"
            type="url"
            maxLength={500}
            className={FIELD}
            placeholder="https://"
          />
        </label>

        <label className="block text-sm font-medium">
          About your services
          <textarea
            name="message"
            required
            minLength={20}
            maxLength={2000}
            rows={6}
            className={`${FIELD} resize-y py-3 leading-relaxed`}
            placeholder="Counties you serve, fleet size, tour types, pricing model, or anything we should know."
          />
        </label>

        <TurnstileWidget
          action="partners"
          onToken={setToken}
          resetSignal={resetSignal}
          onFailure={() => setChallengeMessage("Verification did not load. Refresh the page or email us instead.")}
        />

        <button
          type="submit"
          disabled={!token || status === "sending"}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e86000] disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
        >
          {status === "sending" ? "Sending..." : status === "sent" ? "Send another enquiry" : "Send enquiry"}
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
          We use your details only to review the partnership. Nothing is added to a mailing list.
        </p>
      </form>
    </div>
  );
}