import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VTech Todo App",
  description:
    "A modern todo app built with Next.js, Supabase, and TypeScript. Realtime sync, edit, delete, and more.",
  keywords: [
    "todo",
    "next.js",
    "supabase",
    "typescript",
    "vtech challenge",
    "realtime app",
  ],
  authors: [{ name: "Ly Makara", url: "https://github.com/lymakara-dev" }],
  creator: "Ly Makara",
  openGraph: {
    title: "VTech Todo App",
    description: "Realtime-enabled Todo App using Supabase and Next.js.",
    url: "https://todo-app-nextjs-liard-five.vercel.app",
    siteName: "VTech Todo App",
    images: [
      {
        url: "https://todo-app-nextjs-liard-five.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "VTech Todo App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
