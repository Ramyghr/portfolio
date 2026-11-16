import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile, SITE_URL } from "@/lib/profile";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const title = `${profile.name} — ${profile.headline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${profile.name}` },
  description: profile.description,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [
    "Ramy Gharbi",
    "FinTech Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "Software Engineer",
    "Algorithmic Trading",
    "LangGraph",
    "Reinforcement Learning",
    "FastAPI",
    "Next.js",
    "ESPRIT",
    "Tunisia",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description: profile.description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
