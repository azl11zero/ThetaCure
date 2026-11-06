# ThetaCure — Healthcare for Everyone

> **"For the Ones You Love. For the Care They Deserve."**

ThetaCure is a production-oriented healthcare discovery, navigation, booking, and provider-management platform designed for Bangladesh.

---

## 🌟 Key Capabilities

### 1. Visual & Brand Identity
- **Brand Emblem & Logo**: Red medical cross with patient & physician silhouettes connected by a curved ribbon swoosh, paired with the official slogan: *"For the Ones You Love. For the Care They Deserve."*
- **Design Tokens**: Faithful implementation of the ThetaCure white-dominant aesthetic, charcoal typography, and fully-saturated ThetaCure Red (`#D91F2B`) used strictly for primary CTAs and key indicators.
- **Language Switcher**: Instant bilingual support between English (`EN`) and Bangla (`বাংলা`).

### 2. Clinical Discovery & Navigation
- **Homepage (`/`)**: Interactive 3-tab search engine (Find a Doctor, Diagnostic Test, Find a Hospital), 4 value-proposition cards, expert health tips, and mobile app showcase.
- **Doctor Directory (`/doctors`)**: Multi-specialty filtering, sorting by rating, fee, and experience, BMDC registration verification badges, and next available slot indicators.
- **Doctor Profile (`/doctors/[slug]`)**: Complete digital presence matching the approved Dr. Farzana Ahmed reference with Overview, Schedule, Reviews, and Health Tips tabs, plus consultation fee breakdowns.
- **Hospital Directory (`/hospitals`) & Profile (`/hospitals/[slug]`)**: Digital mini-websites featuring beds, departments, emergency facilities, icon doctors, diagnostic services, and wellness packages.
- **Diagnostics & Price Comparison (`/diagnostics`)**: Cross-provider laboratory price transparency for blood tests, imaging, and radiology with preparation instructions and report turn-around times.
- **Health Tips (`/health-tips`)**: Categorized wellness articles with author doctor profiles, takeaways, and newsletter subscription.

### 3. AI Doctor Finder (`/ai-doctor-finder`)
- Conversational symptom assessment questionnaire (body area, duration, severity, age group).
- Clinical specialty matching and emergency triage guidance (with 24/7 helpline and 999 escalation).
- Nearby BMDC-verified doctor recommendations with transparent ranking criteria.

### 4. Patient & Provider Portals
- **Patient Dashboard (`/dashboard`)**: Appointment management, family member healthcare profiles, medication reminders, and digital health records.
- **Provider Portal (`/provider` & `/provider/dashboard`)**: Registration with BMDC license submission, weekly slot scheduling, analytics, and health tip publishing.
- **Admin Portal (`/admin`)**: Real-time provider verification audit queue and platform metrics.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v22)
- npm

### Installation
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Architecture

```
├── public/
│   └── images/               # Extracted high-res ThetaCure brand assets & photos
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Global shell with Header & Footer
│   │   ├── page.tsx          # Homepage matching approved design reference
│   │   ├── doctors/          # Doctor directory & profile pages
│   │   ├── hospitals/        # Hospital directory & mini-website profiles
│   │   ├── diagnostics/      # Diagnostic tests & price comparison
│   │   ├── health-tips/      # Health advice & educational articles
│   │   ├── ai-doctor-finder/ # AI symptom guidance engine
│   │   ├── dashboard/        # Patient care dashboard
│   │   ├── provider/         # Provider portal & chamber management
│   │   └── admin/            # Verification & platform analytics
│   ├── components/           # Logo, Header, Footer, BookingModal, LanguageContext
│   └── lib/                  # TypeScript types, seed dataset, translations
└── supabase/
    └── schema.sql            # PostgreSQL schema with RLS policies
```
