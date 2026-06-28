import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anson Chan's Portfolio",
  description:
    "A playful, recruiter-friendly software engineering internship portfolio for Anson Chan.",
  icons: {
    icon: "/assets/favicon.png",
    apple: "/assets/favicon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
