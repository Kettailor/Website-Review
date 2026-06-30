import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://novasync-one.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NovaSync One - Trung tâm điều khiển nhà thông minh AI",
    template: "%s | NovaSync One"
  },
  description:
    "NovaSync One là thiết bị trung tâm nhà thông minh ứng dụng AI, kết nối Matter, bảo mật edge AI và đồng bộ dữ liệu với các nền tảng bên ngoài.",
  openGraph: {
    title: "NovaSync One - Smart Home Hub AI",
    description:
      "Điều khiển nhà thông minh, tối ưu năng lượng và kết nối dữ liệu bên ngoài trong một thiết bị AI nhỏ gọn.",
    url: siteUrl,
    siteName: "NovaSync One",
    images: [
      {
        url: "/images/nova-sync-one.png",
        width: 1792,
        height: 1024,
        alt: "NovaSync One smart home hub"
      }
    ],
    locale: "vi_VN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaSync One - Smart Home Hub AI",
    description:
      "Trung tâm điều khiển nhà thông minh với AI cục bộ, Matter và webhook dữ liệu ngoài.",
    images: ["/images/nova-sync-one.png"]
  }
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
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
