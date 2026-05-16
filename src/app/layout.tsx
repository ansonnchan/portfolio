import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anson Chan",
  description:
    "A playful, recruiter-friendly software engineering internship portfolio for Anson Chan.",
  icons: {
    icon: "/assets/favicon.png",
    apple: "/assets/favicon.png"
  }
};

const themeScript = `
(() => {
  try {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  } catch (_) {}
})();
`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
