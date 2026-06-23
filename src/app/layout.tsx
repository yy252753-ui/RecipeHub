import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastProvider } from "@/components/toast-provider";
import "./globals.css";

const pretendard = localFont({
  src: [{ path: "../../public/fonts/PretendardVariable.woff2", weight: "100 900" }],
  display: "swap",
  variable: "--font-pretendard",
});

const wantedSans = localFont({
  src: [{ path: "../../public/fonts/WantedSansVariable.woff2", weight: "100 900" }],
  display: "swap",
  variable: "--font-wanted",
  preload: false,
});

export const metadata: Metadata = {
  title: "RecipeHub",
  description: "나만의 레시피를 기록하고 공유하는 레시피 커뮤니티",
  openGraph: {
    title: "RecipeHub",
    description: "나만의 레시피를 기록하고 공유하는 레시피 커뮤니티",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${wantedSans.variable}`}>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
