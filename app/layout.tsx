import type { Metadata } from "next";
// todo: read about fonts load optimization
// fonts
import { Ysabeau_Infant, Rubik } from "next/font/google";
// css
import "./globals.css";
// components
import { Footer } from "@/components/Footer";

export const font = Rubik({
  subsets: ["latin", "cyrillic"],
  weight: "300",
});

// todo: read about metadata
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
