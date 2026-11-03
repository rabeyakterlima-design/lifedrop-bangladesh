# LifeDrop Bangladesh (লাইফড্রপ বাংলাদেশ)
### *Every Drop. Every Life. Every Connection.*
### *এক ফোঁটা রক্ত, বাঁচুক একটি প্রাণ।*

---

## 🩸 Project Overview
**LifeDrop Bangladesh** is a complete, production-grade national digital blood donation network and management platform built specifically for the People's Republic of Bangladesh. The platform unifies blood donors, patients, accredited hospitals, regional coordinators, and humanitarian organizations across all **8 divisions and 64 districts**.

---

## 🎨 Brand Identity & Design System
- **Official Brand Colors:**
  - **Primary Blue:** `#0878D1` (Core brand, primary actions, navigation active states)
  - **Dark Blue:** `#073B75` (Hero sections, headers, high-contrast text)
  - **Primary Green:** `#16A34A` (Verified donor badges, success states, verified totals)
  - **Dark Green:** `#087443` (Dark green accents, high-contrast badges)
  - **Emergency Red:** `#E53945` (Reserved strictly for emergency requests and critical alerts)
  - **Background:** `#F8FAFC` (Clean healthcare SaaS background)
  - **Light Blue:** `#EFF6FF` (Subtle card fills, active states)
  - **Light Green:** `#F0FDF4` (Verified status chips)
  - **Text Primary:** `#14213D`
  - **Text Secondary:** `#64748B`

---

## ⚡ Tech Stack
- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5
- **Styling:** Tailwind CSS v4, Lucide React icons
- **Form Validation:** React Hook Form & Zod
- **Backend & Database:** Supabase PostgreSQL with Row Level Security (RLS)
- **Analytics:** Recharts (Nationwide trends & blood group distributions)
- **Identity & Cryptography:** Tamper-evident SHA-256 QR verification tokens
- **Internationalization:** First-class dual language support: **Bangla (বাংলা)** and **English (EN)**

---

## 🗺️ Route Architecture
| Route | Description |
| :--- | :--- |
| `/` | Polished Homepage with Hero, Live Search, Stats, Emergency Requests, and ID previews |
| `/find-donors` | Advanced nationwide search with cascading Division → District → Upazila selectors & privacy gate |
| `/blood-requests` | Live Emergency Blood Requests board with priority triage (Critical, Urgent, Normal) |
| `/blood-requests/new` | Emergency blood request submission form with hospital and clinical context |
| `/blood-requests/[id]` | Request detail, progress tracker, and direct donor response action |
| `/become-donor` | Comprehensive donor onboarding with DGHS/WHO eligibility attestation and ID card generation |
| `/verify/id/[token]` | Public digital identity card verification endpoint via scannable QR token |
| `/verify/id` | Manual digital ID verification lookup |
| `/verify/certificate` | Public award & service certificate verification endpoint |
| `/donor/dashboard` | Donor workspace with verified donation counts, 90-day waiting safeguard, and QR ID |
| `/admin/dashboard` | National and regional administrative portal with two-phase audit verifications |
| `/about` | Institutional governance, mission, and national blood network principles |
| `/guidelines` | Bangladesh DGHS and WHO blood donation criteria and deferral guidelines |
| `/organizations` | Directory of verified blood organizations (BDRCS, Sandhani, Badhan, Quantum, Police Blood Bank) |
| `/volunteers` | Volunteer registration and task coordination |
| `/campaigns` | Nationwide blood donation drives and camps |
| `/faq` | Comprehensive bilingual Frequently Asked Questions |
| `/contact` | 24/7 hotline and regional coordinator directory |
| `/privacy` | Data protection framework and double opt-in contact protocol |
| `/terms` | Terms of service and mandatory hospital screening disclaimer |
| `/auth/login` | Multi-role authentication with demo portal access |
| `/auth/register` | User and donor registration |

---

## 🚀 Quick Start Instructions

### 1. Set Active Workspace
It is recommended to set this directory as your active workspace:
```bash
cd C:\Users\UESR\.gemini\antigravity\scratch\lifedrop-bd
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Connect Supabase (Optional for Production Database)
1. Create a project at [supabase.com](https://supabase.com).
2. Run the SQL schema found in `src/lib/supabase/database.sql` in the Supabase SQL Editor.
3. Copy your project credentials into `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_role_key=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
*(Note: If Supabase credentials are not yet configured, LifeDrop Bangladesh operates automatically in interactive local mode with full CRUD, cascading geographical filters, and real QR token validation).*

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛡️ Security & Privacy Features
1. **Privacy-Preserving Contact Gate:** Donor phone numbers and exact street addresses are masked by default. Requesters must submit a contact request, which donors approve through a double opt-in system.
2. **Two-Phase Verification:** Donors cannot manually falsify donation totals. Verification is enforced strictly by authorized regional verifiers or database triggers.
3. **Cryptographic QR Tokens:** Digital ID cards use unguessable random tokens. The public verification endpoint exposes only verified credentials, keeping personal contact information private.
4. **Medical Resting Safeguard:** Enforces a configurable 90-day waiting period between consecutive whole blood donations in compliance with DGHS Bangladesh guidelines.

---
© 2026 LifeDrop Bangladesh Foundation. *Every Drop. Every Life. Every Connection.*
