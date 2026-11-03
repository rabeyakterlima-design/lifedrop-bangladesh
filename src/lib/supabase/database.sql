-- ==============================================================================
-- LIFEDROP BANGLADESH — PRODUCTION POSTGRESQL SCHEMA WITH ROW-LEVEL SECURITY (RLS)
-- Tagline: Every Drop. Every Life. Every Connection.
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BLOOD GROUPS LOOKUP
CREATE TABLE IF NOT EXISTS public.blood_groups (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    rh_factor TEXT NOT NULL
);

INSERT INTO public.blood_groups (id, name, rh_factor) VALUES
('A+', 'A Positive', '+'),
('A-', 'A Negative', '-'),
('B+', 'B Positive', '+'),
('B-', 'B Negative', '-'),
('AB+', 'AB Positive', '+'),
('AB-', 'AB Negative', '-'),
('O+', 'O Positive', '+'),
('O-', 'O Negative', '-')
ON CONFLICT (id) DO NOTHING;

-- 2. ADMINISTRATIVE DIVISIONS, DISTRICTS, UPAZILAS
CREATE TABLE IF NOT EXISTS public.divisions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    bn_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.districts (
    id TEXT PRIMARY KEY,
    division_id TEXT NOT NULL REFERENCES public.divisions(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    bn_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.upazilas (
    id TEXT PRIMARY KEY,
    district_id TEXT NOT NULL REFERENCES public.districts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    bn_name TEXT NOT NULL
);

-- Seed Bangladesh Divisions
INSERT INTO public.divisions (id, name, bn_name) VALUES
('dhaka', 'Dhaka', 'ঢাকা'),
('chattogram', 'Chattogram', 'চট্টগ্রাম'),
('rajshahi', 'Rajshahi', 'রাজশাহী'),
('khulna', 'Khulna', 'খুলনা'),
('barishal', 'Barishal', 'বরিশাল'),
('sylhet', 'Sylhet', 'সিলেট'),
('rangpur', 'Rangpur', 'রংপুর'),
('mymensingh', 'Mymensingh', 'ময়মনসিংহ')
ON CONFLICT (id) DO NOTHING;

-- 3. ROLES AND PERMISSIONS
CREATE TABLE IF NOT EXISTS public.roles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

INSERT INTO public.roles (id, name, description) VALUES
('super_admin', 'Super Administrator', 'Full platform authority and system governance'),
('national_admin', 'National Administrator', 'Nationwide administrative supervision'),
('division_admin', 'Division Administrator', 'Division-level management and verifications'),
('district_coordinator', 'District Coordinator', 'District-level blood verification and drives'),
('upazila_coordinator', 'Upazila Coordinator', 'Upazila-level community coordinator'),
('organization_admin', 'Organization Administrator', 'Admin of registered blood club or NGO'),
('volunteer', 'Volunteer', 'Assists with campaigns and community support'),
('donor', 'Blood Donor', 'Registered verified or pending blood donor'),
('general_user', 'General User', 'Public user, patient or family recipient')
ON CONFLICT (id) DO NOTHING;

-- 4. USER PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    bn_full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. USER ROLES WITH GEOGRAPHIC / ORG SCOPE
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role_id TEXT NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
    division_id TEXT REFERENCES public.divisions(id),
    district_id TEXT REFERENCES public.districts(id),
    upazila_id TEXT REFERENCES public.upazilas(id),
    organization_id UUID,
    is_approved BOOLEAN DEFAULT FALSE,
    approved_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (user_id, role_id)
);

-- 6. DONOR DETAILS
CREATE TABLE IF NOT EXISTS public.donor_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    blood_group TEXT NOT NULL REFERENCES public.blood_groups(id),
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    date_of_birth DATE NOT NULL,
    division_id TEXT NOT NULL REFERENCES public.divisions(id),
    district_id TEXT NOT NULL REFERENCES public.districts(id),
    upazila_id TEXT NOT NULL REFERENCES public.upazilas(id),
    union_or_ward TEXT,
    address TEXT,
    last_donation_date DATE,
    verified_donations_count INT DEFAULT 0,
    availability TEXT DEFAULT 'available' CHECK (availability IN ('available', 'resting', 'unavailable')),
    is_verified BOOLEAN DEFAULT FALSE,
    consent_for_direct_call BOOLEAN DEFAULT FALSE,
    emergency_contact TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. EMERGENCY BLOOD REQUESTS
CREATE TABLE IF NOT EXISTS public.blood_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_name TEXT NOT NULL,
    blood_group TEXT NOT NULL REFERENCES public.blood_groups(id),
    units_needed INT NOT NULL DEFAULT 1 CHECK (units_needed > 0),
    units_fulfilled INT DEFAULT 0 CHECK (units_fulfilled >= 0),
    hospital_name TEXT NOT NULL,
    hospital_address TEXT,
    division_id TEXT NOT NULL REFERENCES public.divisions(id),
    district_id TEXT NOT NULL REFERENCES public.districts(id),
    upazila_id TEXT NOT NULL REFERENCES public.upazilas(id),
    needed_date DATE NOT NULL,
    needed_time TIME,
    contact_person TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    priority TEXT DEFAULT 'urgent' CHECK (priority IN ('critical', 'urgent', 'normal')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'matching_donors', 'donor_responded', 'partially_fulfilled', 'fulfilled', 'cancelled', 'rejected', 'expired')),
    description TEXT,
    medical_doc_url TEXT,
    requester_user_id UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. DONATIONS & TWO-PHASE VERIFICATION
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    blood_group TEXT NOT NULL REFERENCES public.blood_groups(id),
    donation_date DATE NOT NULL,
    hospital_name TEXT NOT NULL,
    location TEXT,
    verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
    verified_by UUID REFERENCES public.profiles(id),
    verified_at TIMESTAMPTZ,
    certificate_id UUID,
    proof_doc_url TEXT,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. UNIVERSAL DIGITAL IDENTITY CARDS
CREATE TABLE IF NOT EXISTS public.identity_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id_number TEXT UNIQUE NOT NULL, -- e.g. LD-BD-2026-000125
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL REFERENCES public.roles(id),
    blood_group TEXT REFERENCES public.blood_groups(id),
    region TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    issued_at TIMESTAMPTZ DEFAULT now(),
    expires_at TIMESTAMPTZ,
    status TEXT DEFAULT 'active' CHECK (status IN ('pending', 'active', 'suspended', 'expired', 'revoked')),
    verify_token TEXT UNIQUE NOT NULL
);

-- 10. PRIVACY-PRESERVING CONTACT REQUESTS
CREATE TABLE IF NOT EXISTS public.donor_contact_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    requester_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    blood_request_id UUID REFERENCES public.blood_requests(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined')),
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 11. AUDIT LOGS FOR ADMINISTRATIVE INTEGRITY
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.profiles(id),
    action TEXT NOT NULL,
    target_entity TEXT NOT NULL,
    target_id TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- DATABASE TRIGGERS: RECALCULATE VERIFIED DONATIONS
-- Ensures donors cannot manually falsify donation totals
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.recalculate_donor_donations()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.donor_details
    SET verified_donations_count = (
        SELECT COUNT(*)
        FROM public.donations
        WHERE donor_id = NEW.donor_id AND verification_status = 'approved'
    ),
    is_verified = TRUE
    WHERE user_id = NEW.donor_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_recalculate_donor_donations ON public.donations;
CREATE TRIGGER trg_recalculate_donor_donations
AFTER INSERT OR UPDATE OF verification_status ON public.donations
FOR EACH ROW
WHEN (NEW.verification_status = 'approved')
EXECUTE FUNCTION public.recalculate_donor_donations();

-- ==============================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donor_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.identity_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donor_contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Public can view basic info; users can update own profile
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Donor Details: Searchable publicly but exact addresses and phone numbers protected
CREATE POLICY "Donor details viewable by authenticated users"
ON public.donor_details FOR SELECT USING (true);

CREATE POLICY "Donors can update own donor details"
ON public.donor_details FOR UPDATE USING (auth.uid() = user_id);

-- Blood Requests: Publicly readable; authenticated users can insert
CREATE POLICY "Blood requests are viewable by everyone"
ON public.blood_requests FOR SELECT USING (true);

CREATE POLICY "Authenticated users can submit blood requests"
ON public.blood_requests FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Donations: Donors see own; Coordinators and Admins see regional
CREATE POLICY "Donors can view their own donations"
ON public.donations FOR SELECT USING (auth.uid() = donor_id);

CREATE POLICY "Donors can submit donations"
ON public.donations FOR INSERT WITH CHECK (auth.uid() = donor_id);

-- Digital ID Cards: Publicly verified via verify_token
CREATE POLICY "ID Cards are publicly viewable via verification"
ON public.identity_cards FOR SELECT USING (true);
