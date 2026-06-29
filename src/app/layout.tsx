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
    "Portfolio of Imadh Hussain, a Full Stack Software Engineer specializing in React, Next.js, and Laravel. Building scalable web solutions.",
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
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "Imadh Hussain | Full Stack Software Engineer",
    description:
      "Portfolio of Imadh Hussain, a Full Stack Software Engineer specializing in React, Next.js, and Laravel. Building scalable web solutions.",
    url: "https://imadh.com",
    siteName: "Imadh Hussain Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imadh Hussain | Full Stack Software Engineer",
    description:
      "Portfolio of Imadh Hussain, a Full Stack Software Engineer specializing in React, Next.js, and Laravel. Building scalable web solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Imadh Hussain",
              "url": "https://imadh.com/",
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
