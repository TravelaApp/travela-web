"use client";

import { useRef, useState, type FormEvent } from "react";
import { EmailButton } from "@/components/EmailButton";
import { Icon } from "@/components/icons";
import { TurnstileWidget, turnstileEnabled } from "@/components/TurnstileWidget";
import { contact } from "@/data/site";
import { useSecureForm } from "@/lib/useSecureForm";

const FIELD =
  "mt-2 min-h-12 w-full rounded-2xl border border-line bg-sand/50 px-4 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

const TOPICS = [
  "A place is wrong or missing",
  "Something is broken in the app",
  "An event listing",
  "Account or sign-in help",
  "Something else",
];

/** Posts a message straight to support, so nobody has to open a mail client. */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { token, setToken, resetSignal, status, message, failed, submit } = useSecureForm("/api/contact");
  const [challengeMessage, setChallengeMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const sent = await submit(
      {
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        topic: String(data.get("topic") ?? ""),
        message: String(data.get("message") ?? ""),
        website: String(data.get("website") ?? ""),
      },
      "Message sent. We will reply to your email.",
    );

    if (sent) formRef.current?.reset();
  }

  if (!turnstileEnabled) {
    return (
      <div className="rounded-4xl border border-line bg-surface p-7 sm:p-9">
        <h2 className="text-xl font-semibold">Send us a message</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          The online form is being prepared. Copy our address or call us and we will pick it up from there.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
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
    <div className="rounded-4xl border border-line bg-surface p-7 sm:p-9">
      <h2 className="text-xl font-semibold">Send us a message</h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
        Corrections travel furthest. Tell us the county and the place and we will check it.
      </p>

      <form ref={formRef} className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="contact-website">Leave this field empty</label>
          <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

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
          What is it about?
          <select name="topic" defaultValue={TOPICS[0]} className={`${FIELD} appearance-none`}>
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium">
          Your message
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={2000}
            rows={6}
            className={`${FIELD} resize-y py-3 leading-relaxed`}
            placeholder="Name the county and the place plus anything that needs changing."
          />
        </label>

        <TurnstileWidget
          action="contact"
          onToken={setToken}
          resetSignal={resetSignal}
          onFailure={() => setChallengeMessage("Verification did not load. Refresh the page or email us instead.")}
        />

        <button
          type="submit"
          disabled={!token || status === "sending"}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e86000] disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
        >
          {status === "sending" ? "Sending..." : status === "sent" ? "Send another message" : "Send message"}
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
          We use your details only to reply. Nothing is added to a mailing list.
        </p>
      </form>
    </div>
  );
}
