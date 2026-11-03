import { BloodGroup } from "@/lib/bangladesh-data";

export type RoleName =
  | "super_admin"
  | "national_admin"
  | "division_admin"
  | "district_coordinator"
  | "upazila_coordinator"
  | "organization_admin"
  | "volunteer"
  | "donor"
  | "general_user";

export type RequestPriority = "critical" | "urgent" | "normal";

export type RequestStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "matching_donors"
  | "donor_responded"
  | "partially_fulfilled"
  | "fulfilled"
  | "cancelled"
  | "rejected"
  | "expired";

export type IDCardStatus = "pending" | "active" | "suspended" | "expired" | "revoked";

export type VerificationStatus = "pending" | "approved" | "rejected";

export type AvailabilityStatus = "available" | "resting" | "unavailable";

export interface UserProfile {
  id: string;
  fullName: string;
  bnFullName?: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  roles: RoleName[];
  createdAt: string;
}

export interface DonorProfile {
  id: string;
  userId: string;
  fullName: string;
  bnFullName?: string;
  bloodGroup: BloodGroup;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  phone: string;
  email: string;
  emergencyContact?: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  unionOrWard?: string;
  address?: string;
  lastDonationDate?: string | null;
  verifiedDonationsCount: number;
  availability: AvailabilityStatus;
  isVerified: boolean;
  avatarUrl?: string;
  consentForDirectCall: boolean;
  notes?: string;
  nextEligibleDate?: string | null;
  rating?: number;
  reviewCount?: number;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  unitsNeeded: number;
  unitsFulfilled: number;
  hospitalName: string;
  hospitalAddress: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  neededDate: string;
  neededTime?: string;
  contactPerson: string;
  contactPhone: string;
  secondaryPhone?: string;
  priority: RequestPriority;
  status: RequestStatus;
  description: string;
  medicalDocUrl?: string;
  createdAt: string;
  updatedAt: string;
  verifiedBy?: string;
  requesterUserId?: string;
}

export interface DonationRecord {
  id: string;
  donorId: string;
  donorName: string;
  bloodGroup: BloodGroup;
  donationDate: string;
  hospitalName: string;
  location: string;
  verificationStatus: VerificationStatus;
  verifiedBy?: string;
  verifiedByName?: string;
  verifiedAt?: string;
  certificateId?: string;
  proofDocumentUrl?: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface DigitalIDCard {
  id: string;
  cardIdNumber: string; // e.g. LD-BD-2026-000125
  userId: string;
  fullName: string;
  role: RoleName;
  bloodGroup?: BloodGroup;
  region: string;
  avatarUrl: string;
  issuedAt: string;
  expiresAt?: string;
  status: IDCardStatus;
  verifyToken: string; // Cryptographic unguessable token
}

export interface Volunteer {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  skills: string[];
  availability: "full_time" | "part_time" | "weekends" | "on_call";
  status: "pending" | "approved" | "rejected";
  completedTasksCount: number;
  joinedAt: string;
}

export interface BloodOrganization {
  id: string;
  name: string;
  bnName?: string;
  registrationNumber?: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  logoUrl?: string;
  isVerified: boolean;
  memberCount: number;
  campaignsCount: number;
  description: string;
}

export interface CertificateRecord {
  id: string;
  certificateNumber: string;
  recipientName: string;
  recipientId: string;
  type: "blood_donation" | "volunteer_service" | "coordinator_appointment" | "community_hero";
  issueDate: string;
  donationCount?: number;
  authorizedSignatory: string;
  verifyToken: string;
}
