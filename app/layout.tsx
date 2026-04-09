import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LARPgen",
  description:
    "Craft the perfect tech persona post. Satire included, self-awareness optional.",
  openGraph: {
    title: "LARPgen",
    description:
      "Craft the perfect tech persona post. Satire included, self-awareness optional.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LARPgen",
    description:
      "Craft the perfect tech persona post. Satire included, self-awareness optional.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syne.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground font-sans relative">
        <div className="mesh-gradient" />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
