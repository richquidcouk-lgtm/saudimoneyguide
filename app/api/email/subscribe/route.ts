import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { email, locale } = (body ?? {}) as { email?: unknown; locale?: unknown };

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
  }

  const safeLocale = locale === "ar" ? "ar" : "en";

  try {
    await subscribeToNewsletter({ email, locale: safeLocale });
  } catch (error) {
    console.error("[email:subscribe] failed", error);
    return NextResponse.json(
      { success: false, error: "Subscription failed, please try again" },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, message: "Check your email" });
}
