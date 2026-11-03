"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { donorService } from "@/lib/services/donorService";
import { idCardService } from "@/lib/services/idCardService";
import { 
  DIVISIONS, 
  DISTRICTS, 
  BLOOD_GROUPS, 
  BloodGroup 
} from "@/lib/bangladesh-data";
import { 
  Heart, 
  ShieldCheck, 
  UserCheck, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Lock, 
  FileCheck2,
  ArrowRight
} from "lucide-react";

export default function BecomeDonorPage() {
  const router = useRouter();
  const { language, t } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [bnFullName, setBnFullName] = useState("");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>("O+");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [dateOfBirth, setDateOfBirth] = useState("1998-01-01");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const [divisionId, setDivisionId] = useState("dhaka");
  const [districtId, setDistrictId] = useState("dhaka");
  const [upazilaId, setUpazilaId] = useState("dhanmondi");
  const [unionOrWard, setUnionOrWard] = useState("");
  const [address, setAddress] = useState("");

  const [lastDonationDate, setLastDonationDate] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [consentForDirectCall, setConsentForDirectCall] = useState(false);

  // Medical eligibility checkboxes
  const [weightConfirmed, setWeightConfirmed] = useState(false);
  const [healthConfirmed, setHealthConfirmed] = useState(false);
  const [policyConfirmed, setPolicyConfirmed] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [successCardToken, setSuccessCardToken] = useState<string | null>(null);

  const filteredDistricts = useMemo(() => {
    return DISTRICTS.filter((d) => d.divisionId === divisionId);
  }, [divisionId]);

  const filteredUpazilas = useMemo(() => {
    const dist = DISTRICTS.find((d) => d.id === districtId);
    return dist ? dist.upazilas : [];
  }, [districtId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weightConfirmed || !healthConfirmed || !policyConfirmed) {
      alert("Please confirm all medical eligibility conditions before registering.");
      return;
    }

    setSubmitting(true);

    try {
      const newDonor = await donorService.registerDonor({
        userId: `usr-${Date.now()}`,
        fullName,
        bnFullName: bnFullName || undefined,
        bloodGroup,
        gender,
        dateOfBirth,
        phone,
        email,
        emergencyContact,
        divisionId,
        districtId,
        upazilaId,
        unionOrWard,
        address,
        lastDonationDate: isFirstTime ? null : lastDonationDate || null,
        availability: "available",
        avatarUrl:
          gender === "female"
            ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
            : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
        consentForDirectCall,
      });

      // Issue Official Universal Digital ID Card
      const card = await idCardService.issueCard({
        userId: newDonor.userId,
        fullName: newDonor.fullName,
        role: "donor",
        bloodGroup: newDonor.bloodGroup,
        region: `${newDonor.districtId.toUpperCase()}, Bangladesh`,
        avatarUrl: newDonor.avatarUrl!,
      });

      setSuccessCardToken(card.verifyToken);
    } catch (err) {
      alert("Failed to complete donor registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E53945] flex items-center justify-center">
              <Heart className="w-7 h-7 fill-[#E53945]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                {language === "bn" ? "জাতীয় রক্তদাতা নিবন্ধন" : "National Voluntary Donor Onboarding"}
              </span>
              <h1 className="text-2xl font-black text-[#073B75]">
                {language === "bn" ? "রক্তদাতা হিসেবে নিবন্ধন করুন" : "Register as a Verified Blood Donor"}
              </h1>
            </div>
          </div>

          {successCardToken ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-[#16A34A] mx-auto animate-bounce" />
              <h2 className="text-2xl font-black text-[#073B75]">
                {language === "bn" ? "অভিনন্দন! আপনার ডোনার আইডি তৈরি হয়েছে" : "Welcome to LifeDrop Bangladesh!"}
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {language === "bn"
                  ? "আপনার ডিজিটাল আইডি কার্ড প্রস্তুত। আপনি এখন জাতীয় রক্তদাতা নেটওয়ার্কের একজন সক্রিয় সদস্য।"
                  : "Your universal digital identity card has been generated with a verifiable cryptographic QR code."}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={`/verify/id/${successCardToken}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#0878D1] hover:bg-[#073B75] shadow-md transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === "bn" ? "আমার ডিজিটাল আইডি কার্ড দেখুন" : "View My Digital ID Card"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/donor/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-[#073B75] bg-slate-100 hover:bg-slate-200 transition-all"
                >
                  <span>{language === "bn" ? "ডোনার ড্যাশবোর্ডে যান" : "Go to Donor Dashboard"}</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Personal Demographics */}
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  1. Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed Chowdhury"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      পুরো নাম (বাংলায়)
                    </label>
                    <input
                      type="text"
                      value={bnFullName}
                      onChange={(e) => setBnFullName(e.target.value)}
                      placeholder="যেমন: তানভীর আহমেদ চৌধুরী"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Blood Group *
                    </label>
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-bold text-red-600 focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    >
                      {BLOOD_GROUPS.map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Gender *
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as "male" | "female" | "other")}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number (BD) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1..."
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="donor@example.com"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Emergency Contact Number
                    </label>
                    <input
                      type="tel"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      placeholder="+880 1..."
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Regional Location in Bangladesh */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  2. Bangladesh Regional Location
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Division *
                    </label>
                    <select
                      value={divisionId}
                      onChange={(e) => {
                        setDivisionId(e.target.value);
                        setDistrictId("");
                        setUpazilaId("");
                      }}
                      className="w-full h-11 px-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    >
                      {DIVISIONS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {language === "bn" ? d.bnName : d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      District *
                    </label>
                    <select
                      value={districtId}
                      onChange={(e) => {
                        setDistrictId(e.target.value);
                        setUpazilaId("");
                      }}
                      className="w-full h-11 px-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    >
                      <option value="">Select District</option>
                      {filteredDistricts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {language === "bn" ? d.bnName : d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Upazila / Thana *
                    </label>
                    <select
                      value={upazilaId}
                      onChange={(e) => setUpazilaId(e.target.value)}
                      disabled={!districtId || filteredUpazilas.length === 0}
                      className="w-full h-11 px-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0878D1] focus:outline-none disabled:opacity-50"
                    >
                      <option value="">Select Upazila</option>
                      {filteredUpazilas.map((u) => (
                        <option key={u.id} value={u.id}>
                          {language === "bn" ? u.bnName : u.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Union / Ward
                    </label>
                    <input
                      type="text"
                      value={unionOrWard}
                      onChange={(e) => setUnionOrWard(e.target.value)}
                      placeholder="e.g. Ward 12"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Address Details
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Road / Area (Private & Encrypted)"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Donation History & Last Date */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  3. Donation Experience
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={isFirstTime}
                      onChange={(e) => setIsFirstTime(e.target.checked)}
                      className="rounded text-[#0878D1] h-4 w-4"
                    />
                    <span>{language === "bn" ? "আমি প্রথমবারের মতো রক্তদান করতে আগ্রহী" : "I am a first-time voluntary blood donor"}</span>
                  </label>

                  {!isFirstTime && (
                    <div className="max-w-xs">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Last Donation Date
                      </label>
                      <input
                        type="date"
                        value={lastDonationDate}
                        onChange={(e) => setLastDonationDate(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0878D1] focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Section 4: Privacy & Direct Call Consent */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  4. Privacy & Contact Consent
                </h3>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-700">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentForDirectCall}
                      onChange={(e) => setConsentForDirectCall(e.target.checked)}
                      className="mt-0.5 rounded text-[#16A34A] h-4 w-4 shrink-0"
                    />
                    <span>
                      <strong>Consent to show direct phone number:</strong> Allow emergency patients to view my mobile number immediately without waiting for contact approval. (If unchecked, patients must request contact approval first).
                    </span>
                  </label>
                </div>
              </div>

              {/* Section 5: Medical Eligibility Attestation */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  5. Medical Safety Attestation
                </h3>
                <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 space-y-2 text-xs text-slate-700">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={weightConfirmed}
                      onChange={(e) => setWeightConfirmed(e.target.checked)}
                      className="mt-0.5 rounded text-[#0878D1] h-4 w-4 shrink-0"
                    />
                    <span>I confirm my body weight is at least 45 kg and my age is between 18 and 60 years.</span>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={healthConfirmed}
                      onChange={(e) => setHealthConfirmed(e.target.checked)}
                      className="mt-0.5 rounded text-[#0878D1] h-4 w-4 shrink-0"
                    />
                    <span>I do not have any active blood transmissible infections (HIV, Hepatitis B/C, Malaria, Syphilis).</span>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={policyConfirmed}
                      onChange={(e) => setPolicyConfirmed(e.target.checked)}
                      className="mt-0.5 rounded text-[#0878D1] h-4 w-4 shrink-0"
                    />
                    <span>I understand and agree to the 90-day medical resting policy between consecutive whole blood donations.</span>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl font-bold text-sm text-white bg-[#0878D1] hover:bg-[#073B75] shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  <UserCheck className="w-5 h-5" />
                  <span>{submitting ? "Processing Registration..." : "Complete Registration & Issue My Digital ID"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
