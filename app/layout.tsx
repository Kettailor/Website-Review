import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ubpet-c41-review.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Review máy dọn vệ sinh mèo UBPet C41",
    template: "%s | UBPet C41 Review"
  },
  description:
    "Review máy dọn vệ sinh mèo UBPet C41: giá, cabin 106L, cửa 20cm, cảm biến an toàn, app UBPET-ASIA, video review và checklist trước khi mua.",
  openGraph: {
    title: "Review máy dọn vệ sinh mèo UBPet C41",
    description:
      "Đánh giá UBPet C41 dựa trên thông số Helipet, video liên quan và tiêu chí review máy dọn vệ sinh tự động trên web.",
    url: siteUrl,
    siteName: "UBPet C41 Review",
    images: [
      {
        url: "/images/ubpet-c41/ubpet-c41-hero.png",
        width: 840,
        height: 840,
        alt: "Máy dọn vệ sinh mèo UBPet C41"
      }
    ],
    locale: "vi_VN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Review máy dọn vệ sinh mèo UBPet C41",
    description:
      "Có nên mua UBPet C41? Xem điểm mạnh, điểm cần cân nhắc, video review và thông số quan trọng.",
    images: ["/images/ubpet-c41/ubpet-c41-hero.png"]
  }
};

export const viewport: Viewport = {
  themeColor: "#f4f7f4",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
