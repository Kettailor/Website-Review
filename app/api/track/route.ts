import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, label, metadata } = body;

    // Log the tracked behavior on the server console
    console.log(`[BEHAVIOR_TRACKER] Event: ${action} | Label: ${label}`, {
      metadata,
      ip: request.headers.get("x-forwarded-for") || "127.0.0.1",
      userAgent: request.headers.get("user-agent") || "Unknown"
    });

    const webhookUrl = process.env.BEHAVIOR_WEBHOOK_URL || process.env.NEWSLETTER_WEBHOOK_URL;
    
    // If a webhook is configured in environment, forward the tracking payload
    if (webhookUrl) {
      try {
        const payload = {
          event: "user_behavior",
          action,
          label,
          metadata,
          source: "ubpet-c41-review-page",
          timestamp: new Date().toISOString()
        };

        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          cache: "no-store"
        });

        if (!response.ok) {
          console.error(`[BEHAVIOR_TRACKER] Webhook forward failed with status: ${response.status}`);
        }
      } catch (webhookErr) {
        console.error("[BEHAVIOR_TRACKER] Webhook forward error", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Behavior recorded successfully.",
      synced: !!webhookUrl
    });
  } catch (error) {
    console.error("Error in tracking route", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
