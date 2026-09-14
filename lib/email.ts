type SubscribeParams = {
  email: string;
  locale: "en" | "ar";
};

/**
 * Adds a subscriber via SendGrid when SENDGRID_API_KEY is configured.
 * Without a key (local dev, or before the account is set up), this just
 * logs — the API route still returns success so the form works end-to-end.
 */
export async function subscribeToNewsletter({ email, locale }: SubscribeParams): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const listId = process.env.SENDGRID_LIST_ID;

  if (!apiKey || !listId) {
    console.log("[email:subscribe] SendGrid not configured, logging only", { email, locale });
    return;
  }

  const response = await fetch("https://api.sendgrid.com/v3/marketing/contacts", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      list_ids: [listId],
      contacts: [
        {
          email,
          custom_fields: { locale },
        },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`SendGrid subscribe failed (${response.status}): ${detail}`);
  }
}
