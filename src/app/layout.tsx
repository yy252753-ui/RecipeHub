import type { Metadata } from "next";
import { ToastProvider } from "@/components/toast-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "RecipeHub",
  description: "나만의 레시피를 기록하고 공유하는 레시피 커뮤니티",
  openGraph: {
    title: "RecipeHub",
    description: "나만의 레시피를 기록하고 공유하는 레시피 커뮤니티",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
