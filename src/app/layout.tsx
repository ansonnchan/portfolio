import type { Metadata } from "next";
import { Patrick_Hand } from "next/font/google";
import "./globals.css";

const patrickHand = Patrick_Hand({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-hand",
  weight: "400"
});

export const metadata: Metadata = {
  title: "Anson Chan's Portfolio",
  description:
    "A playful, recruiter-friendly software engineering internship portfolio for Anson Chan.",
  icons: {
    icon: "/assets/stickers/kaori-surprised.png",
    apple: "/assets/stickers/kaori-surprised.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={patrickHand.variable}>{children}</body>
    </html>
  );
}
