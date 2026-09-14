import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

type TrackPayload = {
  partnerId: string;
  guideSlug?: string;
  action: "click" | "signup";
};

function isValidPayload(body: unknown): body is TrackPayload {
  if (!body || typeof body !== "object") return false;
  const { partnerId, action } = body as Record<string, unknown>;
  return (
    typeof partnerId === "string" &&
    partnerId.length > 0 &&
    (action === "click" || action === "signup")
  );
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { success: false, error: "partnerId and action are required" },
      { status: 400 },
    );
  }

  const trackingId = randomUUID();
  const event = {
    trackingId,
    partnerId: body.partnerId,
    guideSlug: body.guideSlug ?? null,
    action: body.action,
    timestamp: new Date().toISOString(),
    referrer: request.headers.get("referer") ?? null,
    userAgent: request.headers.get("user-agent") ?? null,
  };

  // Always log locally — this is the source of truth until an affiliate
  // tracking platform (Refersion, Tapfiliate, CJ) is wired up below.
  console.log("[affiliate:track]", event);

  const webhookUrl = process.env.AFFILIATE_TRACKING_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error("[affiliate:track] webhook forward failed", error);
    }
  }

  return NextResponse.json({ success: true, trackingId });
}
