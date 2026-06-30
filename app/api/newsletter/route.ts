import { NextResponse } from "next/server";

type NewsletterPayload = {
  name?: string;
  email?: string;
  interest?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: NewsletterPayload;

  try {
    body = (await request.json()) as NewsletterPayload;
  } catch {
    return NextResponse.json(
      { message: "Dữ liệu gửi lên không hợp lệ." },
      { status: 400 }
    );
  }

  const email = body.email?.trim().toLowerCase();
  const name = body.name?.trim() || "Khách quan tâm";
  const interest = body.interest?.trim() || "launch";

  if (!email || !emailPattern.test(email)) {
    return NextResponse.json(
      { message: "Vui lòng nhập email hợp lệ." },
      { status: 422 }
    );
  }

  const lead = {
    product: "NovaSync One",
    name,
    email,
    interest,
    source: "landing-page",
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
        { message: "Kết nối webhook đang gặp sự cố, vui lòng thử lại." },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({
    message: webhookUrl
      ? "Đã gửi đăng ký đến hệ thống của NovaSync."
      : "Đã ghi nhận đăng ký. Cấu hình webhook để đồng bộ ra hệ thống bên ngoài.",
    leadId: crypto.randomUUID()
  });
}
