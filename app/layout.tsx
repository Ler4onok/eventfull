export const revalidate = 0;
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
// todo: read about fonts load optimization
// fonts
import { Poppins } from "next/font/google";
// css
import "./globals.css";
// components
import { Footer } from "@/components/Footer";
// analytics
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// todo: read about metadata
export const metadata: Metadata = {
  title: "Eventfull Madeira",
  description: "Centralized event platform in Madeira",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Eventfull Madeira</title>
        <link rel="canonical" href="https://evenfull-madeira.com" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <body
        className={`min-h-screen flex flex-col justify-between ${font.className}`}
      >
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
