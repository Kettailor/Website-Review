import { NextResponse } from "next/server";

type NewsletterPayload = {
  name?: string;
  email?: string;
  interest?: string;
  language?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: NewsletterPayload;

  try {
    body = (await request.json()) as NewsletterPayload;
  } catch {
    return NextResponse.json(
      {
        message: "Dữ liệu gửi lên không hợp lệ.",
        messageEn: "Submitted data is invalid."
      },
      { status: 400 }
    );
  }

  const email = body.email?.trim().toLowerCase();
  const name = body.name?.trim() || "Khách quan tâm";
  const interest = body.interest?.trim() || "checklist";
  const language = body.language === "en" ? "en" : "vi";

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json(
      {
        message: "Vui lòng nhập email hợp lệ.",
        messageEn: "Please enter a valid email."
      },
      { status: 422 }
    );
  }

  const lead = {
    product: "UBPet C41 review",
    name,
    email,
    interest,
    language,
    source: "ubpet-c41-review-page",
    createdAt: new Date().toISOString()
  };

  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;

  if (webhookUrl) {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.NEWSLETTER_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.NEWSLETTER_WEBHOOK_TOKEN}` }
          : {})
      },
      body: JSON.stringify(lead),
      cache: "no-store"
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        {
          message: "Kết nối webhook đang gặp sự cố, vui lòng thử lại.",
          messageEn: "The webhook connection is unavailable. Please try again."
        },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({
    message: webhookUrl
      ? "Đã gửi yêu cầu tư vấn đến hệ thống."
      : "Đã ghi nhận yêu cầu. Cấu hình webhook để đồng bộ ra hệ thống bên ngoài.",
    messageEn: webhookUrl
      ? "Your request has been sent to the system."
      : "Your request has been recorded. Configure a webhook to sync it externally.",
    leadId: crypto.randomUUID()
  });
}
