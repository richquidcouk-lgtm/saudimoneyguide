import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter, NewsletterUnavailableError } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { email: rawEmail, locale } = (body ?? {}) as { email?: unknown; locale?: unknown };
  const email = typeof rawEmail === "string" ? rawEmail.trim() : rawEmail;

  if (typeof email !== "string" || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
  }

  const safeLocale = locale === "ar" ? "ar" : "en";

  try {
    await subscribeToNewsletter({ email, locale: safeLocale });
  } catch (error) {
    if (error instanceof NewsletterUnavailableError) {
      return NextResponse.json({ success: false, error: "Newsletter temporarily unavailable" }, { status: 503 });
    }
    console.error("[email:subscribe] provider request failed");
    return NextResponse.json(
      { success: false, error: "Subscription failed, please try again" },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, message: "Subscription request accepted" }, { status: 202 });
}
