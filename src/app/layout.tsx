import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "LifeDrop Bangladesh — Every Drop. Every Life. Every Connection.",
  description:
    "National Blood Donation Network & Management Platform for Bangladesh. Connecting blood donors, patients, hospitals, volunteers, and blood clubs across all 8 divisions and 64 districts.",
  keywords: [
    "Blood Donation Bangladesh",
    "LifeDrop Bangladesh",
    "Emergency Blood BD",
    "Dhaka Blood Donor",
    "Chittagong Blood",
    "Sylhet Blood Donor",
    "রক্তদান বাংলাদেশ",
    "জরুরি রক্ত",
  ],
  authors: [{ name: "LifeDrop Bangladesh Foundation" }],
  openGraph: {
    title: "LifeDrop Bangladesh — National Blood Donation Network",
    description: "Every Drop. Every Life. Every Connection. এক ফোঁটা রক্ত, বাঁচুক একটি প্রাণ।",
    type: "website",
    locale: "bn_BD",
    alternateLocale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="icon" href="/images/logo/lifedrop-logo.png" />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#14213D] antialiased selection:bg-[#0878D1] selection:text-white">
        <LanguageProvider>
          <Suspense fallback={<div className="h-20 bg-white border-b border-slate-200" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
