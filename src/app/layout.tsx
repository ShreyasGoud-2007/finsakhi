import type { Metadata, Viewport } from "next";
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]
                     focus:rounded-xl focus:bg-brand-700 focus:px-4 focus:py-3 focus:text-white focus:font-semibold"
        >
          Skip to main content
        </a>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
