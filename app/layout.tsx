import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AppProvider } from "./components/providers";
import { ToastContainer } from "./components/toast";
import { BehaviorTracker } from "./components/behavior-tracker";
import { CartDrawer } from "./components/cart-drawer";
import { Chatbot } from "./components/chatbot";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap"
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap"
});

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
        url: "/images/ubpet-c41/ubpet-c41-hero-cutout.png",
        width: 1600,
        height: 1600,
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
    images: ["/images/ubpet-c41/ubpet-c41-hero-cutout.png"]
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf8f3" },
    { media: "(prefers-color-scheme: dark)", color: "#081511" }
  ],
  colorScheme: "light dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-lang="vi" data-theme="light" className={`${plusJakartaSans.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <AppProvider>
          {children}
          <CartDrawer />
          <Chatbot />
          <ToastContainer />
          <BehaviorTracker />
        </AppProvider>
        <Analytics />
      </body>
    </html>
  );
}
