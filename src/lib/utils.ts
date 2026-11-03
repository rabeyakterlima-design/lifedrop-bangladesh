import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | Date | null | undefined): string {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatBanglaDate(dateString: string | Date | null | undefined): string {
  if (!dateString) return "প্রযোজ্য নয়";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "প্রযোজ্য নয়";
  
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const banglaMonths = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];
  
  const day = String(date.getDate()).split("").map(d => banglaDigits[parseInt(d, 10)]).join("");
  const month = banglaMonths[date.getMonth()];
  const year = String(date.getFullYear()).split("").map(d => banglaDigits[parseInt(d, 10)]).join("");
  
  return `${day} ${month}, ${year}`;
}
