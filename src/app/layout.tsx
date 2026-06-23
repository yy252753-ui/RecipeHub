import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/providers";
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${wantedSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body>
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
