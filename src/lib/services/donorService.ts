import { DonorProfile } from "@/types";
import { BloodGroup } from "@/lib/bangladesh-data";

// Initial realistic database state (Can be seeded or connected directly to Supabase)
let DONORS_STORE: DonorProfile[] = [
  {
    id: "donor-001",
    userId: "usr-001",
    fullName: "Rabeya Akter Lima",
    bnFullName: "রাবেয়া আক্তার লিমা",
    bloodGroup: "O+",
    gender: "female",
    dateOfBirth: "1998-05-14",
    phone: "+880 1712-345678",
    email: "rabeya.lima@lifedrop.bd",
    divisionId: "chattogram",
    districtId: "chattogram",
    upazilaId: "panchlaish",
    unionOrWard: "Ward 8",
    address: "Probartak Circle, Panchlaish",
    lastDonationDate: "2026-09-20",
    verifiedDonationsCount: 3,
    availability: "available",
    isVerified: true,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    consentForDirectCall: false, // Privacy protection enabled
    notes: "Regular blood donor at Chittagong Medical College Hospital.",
    nextEligibleDate: "2026-12-20",
    rating: 4.9,
    reviewCount: 3,
  },
  {
    id: "donor-002",
    userId: "usr-002",
    fullName: "Tanvir Ahmed Chowdhury",
    bnFullName: "তানভীর আহমেদ চৌধুরী",
    bloodGroup: "A+",
    gender: "male",
    dateOfBirth: "1995-11-22",
    phone: "+880 1819-876543",
    email: "tanvir.ahmed@lifedrop.bd",
    divisionId: "dhaka",
    districtId: "dhaka",
    upazilaId: "dhanmondi",
    unionOrWard: "Ward 15",
    address: "Road 27, Dhanmondi",
    lastDonationDate: "2026-08-15",
    verifiedDonationsCount: 5,
    availability: "available",
    isVerified: true,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    consentForDirectCall: true,
    nextEligibleDate: "2026-11-15",
    rating: 5.0,
    reviewCount: 5,
  },
  {
    id: "donor-003",
    userId: "usr-003",
    fullName: "Nusrat Jahan Shanta",
    bnFullName: "নুসরাত জাহান শান্তা",
    bloodGroup: "B+",
    gender: "female",
    dateOfBirth: "2000-03-10",
    phone: "+880 1911-223344",
    email: "nusrat.shanta@lifedrop.bd",
    divisionId: "sylhet",
    districtId: "sylhet",
    upazilaId: "sylhet-sadar",
    unionOrWard: "Zindabazar",
    address: "Zindabazar Point",
    lastDonationDate: "2026-10-05",
    verifiedDonationsCount: 2,
    availability: "resting", // 90 days policy rest
    isVerified: true,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    consentForDirectCall: false,
    nextEligibleDate: "2027-01-05",
    rating: 4.8,
    reviewCount: 2,
  },
  {
    id: "donor-004",
    userId: "usr-004",
    fullName: "Mahmudul Hasan",
    bnFullName: "মাহমুদুল হাসান",
    bloodGroup: "AB+",
    gender: "male",
    dateOfBirth: "1993-07-18",
    phone: "+880 1612-998877",
    email: "mahmudul.hasan@lifedrop.bd",
    divisionId: "rajshahi",
    districtId: "rajshahi",
    upazilaId: "boalia",
    unionOrWard: "Shaheb Bazar",
    address: "Shaheb Bazar Zero Point",
    lastDonationDate: null,
    verifiedDonationsCount: 0,
    availability: "available",
    isVerified: false,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    consentForDirectCall: false,
    nextEligibleDate: null,
  },
  {
    id: "donor-005",
    userId: "usr-005",
    fullName: "Farhana Yasmin",
    bnFullName: "ফারহানা ইয়াসমিন",
    bloodGroup: "O-", // Rare blood group
    gender: "female",
    dateOfBirth: "1997-09-02",
    phone: "+880 1515-443322",
    email: "farhana.yasmin@lifedrop.bd",
    divisionId: "dhaka",
    districtId: "dhaka",
    upazilaId: "uttara",
    unionOrWard: "Sector 4",
    address: "Road 7, Sector 4, Uttara",
    lastDonationDate: "2026-06-11",
    verifiedDonationsCount: 4,
    availability: "available",
    isVerified: true,
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    consentForDirectCall: false,
    rating: 5.0,
    reviewCount: 4,
  },
];

export interface DonorSearchParams {
  bloodGroup?: BloodGroup | "";
  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  availability?: string;
  verifiedOnly?: boolean;
}

export const donorService = {
  async searchDonors(params: DonorSearchParams): Promise<DonorProfile[]> {
    return DONORS_STORE.filter((donor) => {
      if (params.bloodGroup && donor.bloodGroup !== params.bloodGroup) {
        return false;
      }
      if (params.divisionId && donor.divisionId !== params.divisionId) {
        return false;
      }
      if (params.districtId && donor.districtId !== params.districtId) {
        return false;
      }
      if (params.upazilaId && donor.upazilaId !== params.upazilaId) {
        return false;
      }
      if (params.availability && donor.availability !== params.availability) {
        return false;
      }
      if (params.verifiedOnly && !donor.isVerified) {
        return false;
      }
      return true;
    });
  },

  async getDonorById(id: string): Promise<DonorProfile | null> {
    return DONORS_STORE.find((d) => d.id === id || d.userId === id) || null;
  },

  async registerDonor(data: Omit<DonorProfile, "id" | "verifiedDonationsCount" | "isVerified">): Promise<DonorProfile> {
    const newDonor: DonorProfile = {
      ...data,
      id: `donor-${Date.now()}`,
      verifiedDonationsCount: 0,
      isVerified: false,
    };
    DONORS_STORE.unshift(newDonor);
    return newDonor;
  },

  async getAllDonors(): Promise<DonorProfile[]> {
    return [...DONORS_STORE];
  },

  async verifyDonor(donorId: string): Promise<boolean> {
    const donor = DONORS_STORE.find((d) => d.id === donorId);
    if (donor) {
      donor.isVerified = true;
      return true;
    }
    return false;
  },
};
