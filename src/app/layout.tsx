import type { Metadata, Viewport } from "next";
import { SkipLink } from "@/components/layout/SkipLink";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinSakhi - Your Money. Your Future. Your Confidence.",
  description:
    "Simple AI-powered financial guidance that helps you understand your money, build better habits, and plan for your future.",
};

export const viewport: Viewport = {
  themeColor: "#0F7264",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Noto Sans carries Telugu and Devanagari; Baloo 2 gives the friendly display voice. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Noto+Sans:wght@400;500;600;700&family=Noto+Sans+Telugu:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StoreProvider>
          <SkipLink />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
