/**
 * Adds a signup to the launch waitlist contact list.
 *
 * This module is imported only by server route handlers, so the Brevo API key is
 * read from the server environment and never shipped to the browser.
 */
export async function addToWaitlist(input: { email: string; name?: string }): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_WAITLIST_LIST_ID);

  if (!apiKey || !process.env.BREVO_WAITLIST_LIST_ID || !Number.isFinite(listId)) return false;

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: input.email,
        attributes: { FIRSTNAME: input.name },
        listIds: [listId],
        updateEnabled: true,
      }),
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Brevo rejected a waitlist contact", { status: response.status });
      return false;
    }

    return true;
  } catch (error) {
    console.error("Brevo waitlist request failed", {
      errorType: error instanceof Error ? error.name : "UnknownError",
    });
    return false;
  }
}
