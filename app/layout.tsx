export const revalidate = 0;
export const dynamic = "force-dynamic";

import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width'
}

export const metadata: Metadata = {
  title:
    "Eventfull - Discover events in Madeira",
  description:
    "Find the best events, festivals, concerts, sports, and activities in Madeira! Eventfull Madeira makes it easy to explore what's happening around the island all year round.",
  metadataBase: new URL('https://eventfull-madeira.com'),
  openGraph: {
    title:
      "Eventfull - Discover events in Madeira",
    description:
      "Explore events, festivals, concerts, sports, and activities across Madeira Island.",
    images: new URL("https://images.unsplash.com/photo-1567351344506-b2e8a94e273b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Eventfull - Discover events in Madeira",
    description:
      "Find the best events, festivals, concerts, sports, and activities in Madeira! Eventfull Madeira makes it easy to explore what's happening around the island all year round.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="canonical" href='https://eventfull-madeira.com' />
        <link rel="icon" href="/favicon_eventfull.png" sizes="any" />
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
