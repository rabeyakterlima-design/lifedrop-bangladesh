"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, ShieldCheck, PhoneCall, Mail, MapPin, Award, CheckCircle } from "lucide-react";

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#073B75] text-white pt-16 pb-8 border-t border-blue-900">
      {/* Top Banner: Together for a Blood-Safe Bangladesh */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-blue-800/80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-blue-900/60 to-[#0878D1]/30 p-6 md:p-8 rounded-2xl border border-blue-700/50">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center p-2 backdrop-blur-xs">
              <Heart className="w-8 h-8 text-[#E53945] fill-[#E53945]" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                {language === "bn" ? "নিরাপদ রক্তে সুস্থ বাংলাদেশ" : "Together for a Blood-Safe Bangladesh"}
              </h3>
              <p className="text-blue-200 text-sm mt-1">
                {language === "bn"
                  ? "এক ফোঁটা রক্তে একটি জীবন বেঁচে যেতে পারে। আজই যোগ দিন আমাদের জাতীয় রক্তদান নেটওয়ার্কে।"
                  : "Every drop of blood holds the power to save a human life. Connect with verified donors nationwide."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href="/become-donor"
              className="w-full md:w-auto text-center px-6 py-3 rounded-xl font-bold text-white bg-[#16A34A] hover:bg-[#087443] transition-all shadow-md"
            >
              {language === "bn" ? "রক্তদাতা হিসেবে যুক্ত হোন" : "Join as a Life Saver"}
            </Link>
            <Link
              href="/blood-requests/new"
              className="w-full md:w-auto text-center px-5 py-3 rounded-xl font-bold text-white bg-[#E53945] hover:bg-red-700 transition-all shadow-md"
            >
              {language === "bn" ? "জরুরি রক্তের আবেদন" : "Emergency Request"}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative h-12 w-48 bg-white p-2 rounded-lg">
            <Image
              src="/images/logo/lifedrop-logo.png"
              alt="LifeDrop Bangladesh"
              fill
              className="object-contain p-1"
            />
          </div>
          <p className="text-blue-200 text-sm leading-relaxed max-w-sm">
            {language === "bn"
              ? "লাইফড্রপ বাংলাদেশ — দেশের প্রথম সমন্বিত ডিজিটাল রক্তদান নেটওয়ার্ক। ৮টি বিভাগ ও ৬৪টি জেলার সকল হাসপাতাল এবং রক্তদাতাদের একটি একক বিশ্বস্ত প্ল্যাটফর্মে রূপান্তর।"
              : "LifeDrop Bangladesh is the authoritative national digital blood donation network, bridging hospitals, patients, verified donors, and volunteer clubs nationwide."}
          </p>
          <div className="flex items-center gap-2 text-xs text-blue-200 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span>{language === "bn" ? "সারাদেশব্যাপী ৮ বিভাগ ও ৬৪ জেলা কভারেজ" : "Active in 8 Divisions & 64 Districts"}</span>
          </div>
          <div className="pt-2 text-xs text-blue-300">
            <p className="italic">“{t.tagline}”</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold tracking-wider uppercase text-blue-200 mb-4">
            {language === "bn" ? "মূল নেভিগেশন" : "Quick Links"}
          </h4>
          <ul className="space-y-2.5 text-sm text-blue-200">
            <li>
              <Link href="/find-donors" className="hover:text-white transition-colors">
                {t.nav.findDonors}
              </Link>
            </li>
            <li>
              <Link href="/blood-requests" className="hover:text-white transition-colors">
                {t.nav.bloodRequests}
              </Link>
            </li>
            <li>
              <Link href="/become-donor" className="hover:text-white transition-colors">
                {t.nav.becomeDonor}
              </Link>
            </li>
            <li>
              <Link href="/organizations" className="hover:text-white transition-colors">
                {t.nav.organizations}
              </Link>
            </li>
            <li>
              <Link href="/volunteers" className="hover:text-white transition-colors">
                {t.nav.volunteers}
              </Link>
            </li>
            <li>
              <Link href="/campaigns" className="hover:text-white transition-colors">
                {t.nav.campaigns}
              </Link>
            </li>
          </ul>
        </div>

        {/* Verification & Trust */}
        <div>
          <h4 className="text-sm font-bold tracking-wider uppercase text-blue-200 mb-4">
            {language === "bn" ? "যাচাইকরণ ও তথ্য" : "Verification & Trust"}
          </h4>
          <ul className="space-y-2.5 text-sm text-blue-200">
            <li>
              <Link href="/verify/id" className="hover:text-white flex items-center gap-1.5 transition-colors">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{language === "bn" ? "ডিজিটাল আইডি যাচাই" : "Verify Digital ID"}</span>
              </Link>
            </li>
            <li>
              <Link href="/verify/certificate" className="hover:text-white flex items-center gap-1.5 transition-colors">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>{language === "bn" ? "সনদপত্র যাচাই" : "Verify Certificate"}</span>
              </Link>
            </li>
            <li>
              <Link href="/guidelines" className="hover:text-white transition-colors">
                {t.nav.guidelines}
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="hover:text-white transition-colors">
                {t.nav.howItWorks}
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                {language === "bn" ? "সাধারণ জিজ্ঞাসা (FAQ)" : "FAQ"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Governance */}
        <div>
          <h4 className="text-sm font-bold tracking-wider uppercase text-blue-200 mb-4">
            {language === "bn" ? "জরুরি সহায়তা ও যোগাযোগ" : "Emergency & Support"}
          </h4>
          <ul className="space-y-3 text-sm text-blue-200">
            <li className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#E53945]" />
              <span>+880 9612-000000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-300" />
              <span>help@lifedrop.bd</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-300 mt-0.5 shrink-0" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="pt-2">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded bg-blue-900 hover:bg-blue-800 text-blue-100 border border-blue-700"
              >
                <span>{language === "bn" ? "প্রশাসক ও সমন্বয়কারী লগইন" : "Coordinator & Admin Portal"}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Medical & Legal Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-blue-900/80 text-xs text-blue-300 space-y-3">
        <p className="leading-relaxed bg-blue-950/60 p-4 rounded-xl border border-blue-800/40">
          <strong className="text-white">
            {language === "bn" ? "চিকিৎসাগত ও স্বাস্থ্যসতর্কতা:" : "Medical Disclaimer:"}
          </strong>{" "}
          {language === "bn"
            ? "লাইফড্রপ বাংলাদেশ একটি স্বেচ্ছাসেবী ডিজিটাল সংযোগ প্ল্যাটফর্ম। রক্তগ্রহণের পূর্বে অনুমোদিত হাসপাতাল ও ব্লাড ব্যাংকে বাধ্যতামূলকভাবে রক্তদাতার ক্রস-ম্যাচিং এবং স্ক্রিনিং (এইচআইভি, হেপাটাইটিস বি ও সি, ম্যালেরিয়া এবং সিফিলিস) সম্পন্ন করতে হবে।"
            : "LifeDrop Bangladesh is a civic community platform connecting voluntary donors with patients. Prior to transfusion, hospitals and accredited blood banks must perform standard cross-matching and infectious disease mandatory screening."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-blue-400 pt-2">
          <p>© 2026 LifeDrop Bangladesh. {language === "bn" ? "সর্বস্বত্ব সংরক্ষিত।" : "All rights reserved."}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {language === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {language === "bn" ? "ব্যবহারের শর্তাবলী" : "Terms & Conditions"}
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              {language === "bn" ? "যোগাযোগ" : "Contact"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
