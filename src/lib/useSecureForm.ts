"use client";

import { useCallback, useState } from "react";

export type FormStatus = "idle" | "sending" | "sent";

/** Holds the challenge token, posts the fields, and returns a message the person can act on. */
export function useSecureForm(endpoint: string) {
  const [token, setToken] = useState("");
  const [resetSignal, setResetSignal] = useState(0);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);

  const armNewChallenge = useCallback(() => {
    setToken("");
    setResetSignal((value) => value + 1);
  }, []);

  const submit = useCallback(
    async (fields: Record<string, string>, successMessage: string) => {
      if (!token || status === "sending") return false;

      setStatus("sending");
      setMessage("");
      setFailed(false);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...fields, turnstileToken: token }),
        });
        const result = (await response.json()) as { ok?: boolean; error?: string };

        if (!response.ok || !result.ok) {
          setMessage(result.error ?? "We could not send that. Please try again.");
          setFailed(true);
          setStatus("idle");
          armNewChallenge();
          return false;
        }

        setMessage(successMessage);
        setFailed(false);
        setStatus("sent");
        armNewChallenge();
        return true;
      } catch {
        setMessage("We could not reach the server. Check your connection and try again.");
        setFailed(true);
        setStatus("idle");
        armNewChallenge();
        return false;
      }
    },
    [armNewChallenge, endpoint, status, token],
  );

  return { token, setToken, resetSignal, status, message, failed, submit, armNewChallenge };
}
