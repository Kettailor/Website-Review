import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

type NewsletterPayload = {
  name?: string;
  email?: string;
  interest?: string;
  language?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const leadsFilePath = path.join(process.cwd(), "leads.json");

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
  const name = body.name?.trim() || "Khách hàng";
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

  // 1. Save contact info to leads.json (Backend storage requirement)
  const newLead = {
    id: crypto.randomUUID(),
    product: "UBPet C41 review",
    name,
    email,
    interest,
    language,
    source: "ubpet-c41-review-page",
    createdAt: new Date().toISOString()
  };

  try {
    let currentLeads = [];
    try {
      const fileData = await fs.readFile(leadsFilePath, "utf8");
      currentLeads = JSON.parse(fileData);
    } catch {
      currentLeads = [];
    }
    currentLeads.push(newLead);
    await fs.writeFile(leadsFilePath, JSON.stringify(currentLeads, null, 2), "utf8");
  } catch (err) {
    console.error("Lỗi ghi file leads.json: ", err);
  }

  // 2. Automated email response using nodemailer
  let transporter;
  let isEthereal = false;
  let testAccountUrl = "";

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  try {
    if (smtpHost && smtpUser && smtpPass) {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort || 587),
        secure: smtpPort === "465",
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });
    } else {
      isEthereal = true;
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    }

    const subject = language === "en"
      ? `[UBPet C41 Review] Your Requested Pre-Buy Checklist & Setup Guide`
      : `[UBPet C41 Review] Tài liệu Checklist & Hướng dẫn lắp đặt máy dọn vệ sinh`;

    const htmlContent = language === "en" ? `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Inter', sans-serif; background-color: #f5f3ef; color: #1c1e21; margin: 0; padding: 20px; }
          .container { max-width: 600px; background: #ffffff; border-radius: 12px; padding: 30px; margin: 0 auto; border: 1px solid rgba(28, 30, 33, 0.08); box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
          .header { text-align: center; border-bottom: 1px solid #eae6df; padding-bottom: 20px; }
          .header h1 { font-size: 1.5rem; color: #1c1e21; margin: 0; }
          .header span { color: #d4af37; font-weight: bold; }
          .content { padding: 20px 0; line-height: 1.6; }
          .checklist-item { background: #faf8f5; border-left: 4px solid #d4af37; padding: 12px; margin: 15px 0; border-radius: 0 8px 8px 0; }
          .checklist-title { font-weight: bold; margin-bottom: 4px; }
          .footer { text-align: center; font-size: 0.8rem; color: #6b7278; border-top: 1px solid #eae6df; padding-top: 20px; margin-top: 20px; }
          .button { display: inline-block; background-color: #d4af37; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank you, <span>${name}</span>!</h1>
            <p>Your UBPet C41 Checklist is ready</p>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for submitting your contact request on our UBPet C41 Review website. Here is the safety & setup checklist you requested:</p>
            
            <div class="checklist-item">
              <div class="checklist-title">1. Placement & Gravity Sensor</div>
              <div>Always place the machine on a flat, hard floor. Do not place it on thick carpets or mats, as this will interfere with the weight sensors and safety systems.</div>
            </div>

            <div class="checklist-item">
              <div class="checklist-title">2. Cat Litter Selection</div>
              <div>Use fast-clumping clay (bentonite) litter. Avoid using lightweight wood-based litters or long tofu pellets (they don't clump fast enough or may clog the filter grid).</div>
            </div>

            <div class="checklist-item">
              <div class="checklist-title">3. Cat Introduction Period</div>
              <div>If your cat is scared, leave the machine powered off for the first 2-3 days. Place some of their old litter inside to help them get familiar with the new cabin.</div>
            </div>

            <p>For more detailed technical reviews and live price updates, visit our homepage:</p>
            <center>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://ubpet-c41-review.vercel.app'}" class="button">Visit Homepage</a>
            </center>
          </div>
          <div class="footer">
            <p>UBPet C41 Review Team &copy; 2026. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    ` : `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Inter', sans-serif; background-color: #f5f3ef; color: #1c1e21; margin: 0; padding: 20px; }
          .container { max-width: 600px; background: #ffffff; border-radius: 12px; padding: 30px; margin: 0 auto; border: 1px solid rgba(28, 30, 33, 0.08); box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
          .header { text-align: center; border-bottom: 1px solid #eae6df; padding-bottom: 20px; }
          .header h1 { font-size: 1.5rem; color: #1c1e21; margin: 0; }
          .header span { color: #d4af37; font-weight: bold; }
          .content { padding: 20px 0; line-height: 1.6; }
          .checklist-item { background: #faf8f5; border-left: 4px solid #d4af37; padding: 12px; margin: 15px 0; border-radius: 0 8px 8px 0; }
          .checklist-title { font-weight: bold; margin-bottom: 4px; }
          .footer { text-align: center; font-size: 0.8rem; color: #6b7278; border-top: 1px solid #eae6df; padding-top: 20px; margin-top: 20px; }
          .button { display: inline-block; background-color: #d4af37; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Cảm ơn bạn, <span>${name}</span>!</h1>
            <p>Tài liệu Checklist UBPet C41 của bạn đã sẵn sàng</p>
          </div>
          <div class="content">
            <p>Chào ${name},</p>
            <p>Cảm ơn bạn đã đăng ký tư vấn tại trang web đánh giá UBPet C41. Dưới đây là tài liệu checklist trước khi mua và hướng dẫn vận hành an toàn dành cho bạn:</p>
            
            <div class="checklist-item">
              <div class="checklist-title">1. Vị trí đặt máy & Cảm biến lực</div>
              <div>Hãy đặt máy trên sàn phẳng và cứng. Không đặt trên thảm dày hoặc đệm xốp vì sẽ làm sai lệch cảm biến đo trọng lượng và hệ thống chống kẹt an toàn.</div>
            </div>

            <div class="checklist-item">
              <div class="checklist-title">2. Lựa chọn loại cát phù hợp</div>
              <div>Nên sử dụng cát đất sét bentonite vón cục nhanh. Hạn chế sử dụng cát gỗ siêu nhẹ hoặc cát đậu nành dạng hạt dài (hạt to có thể khó lọt lưới lọc cát bẩn).</div>
            </div>

            <div class="checklist-item">
              <div class="checklist-title">3. Hướng dẫn mèo làm quen</div>
              <div>Nếu mèo nhút nhát, hãy tắt điện nguồn máy dọn trong 2-3 ngày đầu. Hãy rắc một chút cát cũ của mèo vào cabin để tạo mùi quen thuộc giúp mèo dễ vào hơn.</div>
            </div>

            <p>Để theo dõi bài viết chi tiết đầy đủ và xem giá bán tốt nhất, vui lòng truy cập trang chủ của chúng tôi:</p>
            <center>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://ubpet-c41-review.vercel.app'}" class="button">Truy cập Trang chủ</a>
            </center>
          </div>
          <div class="footer">
            <p>Đội ngũ UBPet C41 Review &copy; 2026. Bảo lưu mọi quyền.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: smtpUser ? `"UBPet Review" <${smtpUser}>` : '"UBPet Review" <noreply@ethereal.email>',
      to: email,
      subject: subject,
      html: htmlContent
    });

    if (isEthereal) {
      testAccountUrl = nodemailer.getTestMessageUrl(info) || "";
    }
  } catch (mailError) {
    console.error("Lỗi tự động gửi mail: ", mailError);
  }

  // 3. Webhook sync
  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.NEWSLETTER_WEBHOOK_TOKEN
            ? { Authorization: `Bearer ${process.env.NEWSLETTER_WEBHOOK_TOKEN}` }
            : {})
        },
        body: JSON.stringify(newLead),
        cache: "no-store"
      });
    } catch (e) {
      console.error("Lỗi đồng bộ webhook: ", e);
    }
  }

  return NextResponse.json({
    message: isEthereal
      ? "Đã lưu thông tin liên hệ và gửi mail phản hồi thành công."
      : "Đã lưu thông tin liên hệ và gửi mail phản hồi tới hòm thư của bạn.",
    messageEn: isEthereal
      ? "Contact details saved and response email sent successfully."
      : "Contact details saved and response email sent to your inbox.",
    leadId: newLead.id,
    previewUrl: testAccountUrl || null
  });
}
