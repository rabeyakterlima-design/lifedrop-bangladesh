"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const { language } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: language === "bn" ? "রক্ত দিলে কি কোনো শারীরিক ক্ষতি বা দুর্বলতা হয়?" : "Does donating blood cause physical weakness or health harm?",
      a: language === "bn"
        ? "না। একজন সুস্থ মানুষের শরীরে প্রায় ৫ থেকে ৬ লিটার রক্ত থাকে, যার মাত্র ১ ব্যাগ (৩৫০-৪৫০ মিলি) গ্রহণ করা হয়। শরীরের প্লাজমা বা তরল অংশ ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং লোহিত রক্তকণিকা কয়েক সপ্তাহের মধ্যে প্রাকৃতিকভাবে পূরণ হয়ে যায়।"
        : "No. A healthy adult possesses approximately 5 to 6 liters of blood. A standard donation takes only 350-450 mL (less than 8%). Your fluid plasma replenishes within 24 to 48 hours, and red blood cells regenerate within a few weeks.",
    },
    {
      q: language === "bn" ? "পরপর দুইবার রক্তদানের মাঝে কতদিন বিরতি দিতে হবে?" : "What is the mandatory waiting period between consecutive donations?",
      a: language === "bn"
        ? "বাংলাদেশে স্বাস্থ্য অধিদপ্তরের (DGHS) নির্দেশনা অনুযায়ী পুরুষ ও নারী উভয়ের ক্ষেত্রেই পরপর দুইবার হোল ব্লাড (Whole Blood) দানের মাঝে ন্যূনতম ৯০ দিন বা ৩ মাস বিরতি বাধ্যতামূলক।"
        : "In Bangladesh, according to DGHS standards, a minimum waiting interval of 90 days (3 calendar months) is mandatory between consecutive whole blood donations to safeguard your iron reserves.",
    },
    {
      q: language === "bn" ? "রক্তদাতার ফোন নম্বর সরাসরি কেন দেখানো হয় না?" : "Why is donor contact information not displayed publicly by default?",
      a: language === "bn"
        ? "রক্তদাতাদের ব্যক্তিগত গোপনীয়তা রক্ষা এবং অনাকাঙ্ক্ষিত কল বা তথ্য অপব্যবহার রোধে লাইফড্রপ বাংলাদেশ ডাবল অপ্ট-ইন প্রটোকল অনুসরণ করে। তবে রক্তদাতা চাইলে নিজেই সরাসরি কল সুবিধা সক্রিয় রাখতে পারেন।"
        : "To safeguard our donors from aggressive cold-calling, marketing spam, and data brokers, phone numbers are masked behind a privacy consent gate. If a donor explicitly opts into direct calls, their verified number is revealed.",
    },
    {
      q: language === "bn" ? "জরুরি রাতে (যেমন রাত ২টায়) রক্ত প্রয়োজন হলে কী করণীয়?" : "What should I do if blood is required in the middle of the night (e.g. 2 AM)?",
      a: language === "bn"
        ? "তাৎক্ষণিকভাবে আমাদের 'জরুরি রক্তের আবেদন' পেজে পোস্ট করুন এবং 'Critical' প্রায়োরিটি সিলেক্ট করুন। একইসাথে আপনার জেলা ও বিভাগের অন-কল ভলান্টিয়ার কো-অর্ডিনেটরকে ফোন করুন।"
        : "Post an urgent request immediately on the Emergency Blood Requests board with 'Critical' priority. In critical midnight emergencies, nearby available donors on standby receive immediate high-priority alerts.",
    },
    {
      q: language === "bn" ? "ডিজিটাল আইডি কার্ড এবং কিউআর কোডের সুবিধা কী?" : "What is the benefit of the Universal Digital ID Card and QR code?",
      a: language === "bn"
        ? "প্রত্যেক রক্তদাতা ও সমন্বয়কারী একটি অফিশিয়াল ক্রিপ্টোগ্রাফিক কিউআর কোডসহ আইডি কার্ড পান। দেশের যেকোনো হাসপাতাল বা ব্লাড ব্যাংক এটি স্ক্যান করে তাৎক্ষণিকভাবে রক্তদাতার সঠিক গ্রুপ ও রক্তদানের সত্যতা যাচাই করতে পারে।"
        : "Every donor receives a tamper-evident digital identity card. Any hospital in Bangladesh can scan the QR code to verify the donor's genuine blood group, verified donations count, and resting eligibility.",
    },
    {
      q: language === "bn" ? "রক্ত কেনাবেচা কি লাইফড্রপে অনুমোদিত?" : "Is selling or buying blood permitted on LifeDrop?",
      a: language === "bn"
        ? "সম্পূর্ণ নিষিদ্ধ। লাইফড্রপ বাংলাদেশ শতভাগ স্বেচ্ছাসেবী এবং অ-বাণিজ্যিক প্ল্যাটফর্ম। রক্ত কেনাবেচা করা বাংলাদেশ আইনে দণ্ডনীয় অপরাধ।"
        : "Strictly prohibited. LifeDrop Bangladesh is 100% voluntary and humanitarian. Buying or selling blood is a punishable criminal offense under the laws of Bangladesh.",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0878D1] text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h1 className="text-3xl font-black text-[#073B75]">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-xs text-slate-500">
            Answers to common questions regarding blood donation, safety, and LifeDrop Bangladesh.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-[#0878D1]"
                >
                  <span>{f.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#0878D1] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
