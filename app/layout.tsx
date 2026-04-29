import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Texas Aspire — Premed Mentorship at UT Austin",
  description:
    "Free, accessible, practical premed mentorship at UT Austin. No applications, no dues, no interviews.",
  openGraph: {
    title: "Texas Aspire — Premed Mentorship at UT Austin",
    description:
      "Free, accessible, practical premed mentorship at UT Austin. No applications, no dues, no interviews.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Texas Aspire — Premed Mentorship at UT Austin",
    description:
      "Free, accessible, practical premed mentorship at UT Austin. No applications, no dues, no interviews.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <LenisProvider />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
