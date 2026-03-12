import "@/styles/globals.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "탈(TAL)",
  description: "전통연희 공연과 예술가를 발견하는 플랫폼",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "탈(TAL) | 전통연희 공연 플랫폼",
    description: "전통연희 공연과 예술가를 한곳에서 발견하세요",
    url: "https://tal-neon.vercel.app/",
    siteName: "탈(TAL)",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "탈 썸네일",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
