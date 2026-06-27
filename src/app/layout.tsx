import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Imadh Hussain | Full Stack Software Engineer",
  description:
    "Portfolio of Imadh Hussain — Full-Stack Developer and Software Engineering student specialising in React, Next.js, Flutter, Laravel, and Firebase. VP at APIIT FCS.",
  keywords: [
    "Imadh Hussain",
    "Full Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "Flutter",
    "Laravel",
    "Portfolio",
  ],
  authors: [{ name: "Imadh Hussain", url: "https://imadh.com" }],
  openGraph: {
    title: "Imadh Hussain | Full Stack Software Engineer",
    description:
      "Full-Stack Developer building scalable web and mobile applications.",
    url: "https://imadh.com",
    siteName: "Imadh Hussain Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imadh Hussain | Full Stack Software Engineer",
    description:
      "Full-Stack Developer building scalable web and mobile applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
