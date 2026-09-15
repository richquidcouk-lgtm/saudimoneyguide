type SubscribeParams = { email: string; locale: "en" | "ar" };
export class NewsletterUnavailableError extends Error {}

/** SendGrid accepts contact imports asynchronously; acceptance is not delivery. */
export async function subscribeToNewsletter({ email, locale }: SubscribeParams): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const listId = process.env.SENDGRID_LIST_ID;
  if (!apiKey || !listId) throw new NewsletterUnavailableError("Newsletter is not configured");
  // SendGrid expects a generated custom field ID, not the field's display name.
  const localeFieldId = process.env.SENDGRID_LOCALE_FIELD_ID;
  const response = await fetch("https://api.sendgrid.com/v3/marketing/contacts", {
    method: "PUT",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    signal: AbortSignal.timeout(10000),
    body: JSON.stringify({
      list_ids: [listId],
      contacts: [{ email, ...(localeFieldId ? { custom_fields: { [localeFieldId]: locale } } : {}) }],
    }),
  });
  if (!response.ok) throw new Error(`SendGrid subscribe failed (${response.status})`);
  const data = await response.json();
  if (typeof data?.job_id !== "string" || !data.job_id) throw new Error("SendGrid did not accept the contact import");
}
