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
      <body className={`min-h-screen flex flex-col justify-between ${font.className}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
