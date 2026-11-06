'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  Calendar,
  Layers,
  ShieldCheck,
  HeartPulse,
  ArrowRight,
  ChevronRight,
  Star,
  Sparkles,
  PhoneCall,
  Activity,
  Check,
  Stethoscope,
  FlaskConical,
  Building2,
  Clock,
  Play,
  ArrowUpRight
} from 'lucide-react';
import { DOCTORS, HOSPITALS, DIAGNOSTIC_TESTS, HEALTH_TIPS } from '@/lib/data';
import { useLanguage } from '@/components/LanguageContext';
import BookingModal from '@/components/BookingModal';
import { Doctor } from '@/lib/types';

export default function HomePage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'doctor' | 'diagnostic' | 'hospital'>('doctor');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Dhaka');
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'doctor') {
      router.push(`/doctors?search=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`);
    } else if (activeTab === 'diagnostic') {
      router.push(`/diagnostics?search=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`);
    } else {
      router.push(`/hospitals?search=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-8 sm:pb-16 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-rose-100/30 via-red-50/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading, Subtitle & Interactive Search Box */}
            <div className="lg:col-span-7 space-y-7">
              <div className="space-y-3.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#D91F2B] text-xs font-semibold border border-red-100/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D91F2B] animate-pulse" />
                  <span>Healthcare for Everyone • Bangladesh</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold tracking-tight text-[#111827] leading-[1.12]">
                  Your Health, <br />
                  <span className="text-[#D91F2B]">Simplified.</span>
                </h1>

                <p className="text-base sm:text-lg text-[#475569] max-w-xl leading-relaxed">
                  {t.hero_subtitle}
                </p>
              </div>

              {/* Search Card with 3 Tabs (Direct match to UI reference) */}
              <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(17,24,39,0.06)] border border-[#E5E7EB] p-4 sm:p-6 transition-all duration-200 hover:border-gray-300">
                {/* Search Mode Tabs */}
                <div className="flex items-center gap-1.5 border-b border-gray-100 pb-3 mb-4 overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setActiveTab('doctor')}
                    className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-150 whitespace-nowrap ${
                      activeTab === 'doctor'
                        ? 'bg-red-50 text-[#D91F2B] shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Stethoscope className="w-4 h-4" />
                    <span>{t.tab_find_doctor}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('diagnostic')}
                    className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-150 whitespace-nowrap ${
                      activeTab === 'diagnostic'
                        ? 'bg-red-50 text-[#D91F2B] shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <FlaskConical className="w-4 h-4" />
                    <span>{t.tab_diagnostic_test}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('hospital')}
                    className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-150 whitespace-nowrap ${
                      activeTab === 'hospital'
                        ? 'bg-red-50 text-[#D91F2B] shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>{t.tab_find_hospital}</span>
                  </button>
                </div>

                {/* Form Controls */}
                <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
                  {/* Search Query Input */}
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        activeTab === 'doctor'
                          ? t.search_doctor_placeholder
                          : activeTab === 'diagnostic'
                          ? t.search_test_placeholder
                          : t.search_hospital_placeholder
                      }
                      className="w-full pl-10 pr-4 py-3 text-sm text-gray-900 bg-gray-50/80 hover:bg-gray-100/60 focus:bg-white border border-gray-200 focus:border-[#D91F2B] rounded-xl focus:outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>

                  {/* Location Dropdown */}
                  <div className="relative w-full sm:w-44">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full appearance-none pl-9 pr-8 py-3 text-sm font-medium text-gray-700 bg-gray-50/80 hover:bg-gray-100/60 border border-gray-200 focus:border-[#D91F2B] rounded-xl focus:outline-none cursor-pointer transition"
                    >
                      <option value="Dhaka">Dhaka</option>
                      <option value="Gulshan">Gulshan</option>
                      <option value="Banani">Banani</option>
                      <option value="Dhanmondi">Dhanmondi</option>
                      <option value="Uttara">Uttara</option>
                      <option value="Mirpur">Mirpur</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Sylhet">Sylhet</option>
                    </select>
                    <ChevronRight className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                  </div>

                  {/* Red Search Submit Button with Arrow */}
                  <button
                    type="submit"
                    className="w-full sm:w-13 sm:h-12 px-4 py-3 sm:p-0 flex items-center justify-center bg-[#D91F2B] hover:bg-[#C01823] active:scale-95 text-white rounded-xl shadow-[0_2px_10px_rgba(217,31,43,0.3)] hover:shadow-[0_4px_14px_rgba(217,31,43,0.4)] transition-all flex-shrink-0"
                    aria-label="Submit Search"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>

                {/* Popular Keywords shortcut */}
                <div className="mt-3.5 flex items-center gap-2 text-xs text-gray-400 flex-wrap">
                  <span className="font-medium text-gray-500">Popular:</span>
                  <Link href="/doctors?search=Cardiology" className="hover:text-[#D91F2B] transition-colors underline decoration-gray-200">
                    Cardiologist
                  </Link>
                  <span>•</span>
                  <Link href="/doctors?search=Internal%20Medicine" className="hover:text-[#D91F2B] transition-colors underline decoration-gray-200">
                    Internal Medicine
                  </Link>
                  <span>•</span>
                  <Link href="/diagnostics?search=CBC" className="hover:text-[#D91F2B] transition-colors underline decoration-gray-200">
                    CBC Blood Test
                  </Link>
                  <span>•</span>
                  <Link href="/hospitals/united-hospital-dhaka" className="hover:text-[#D91F2B] transition-colors underline decoration-gray-200">
                    United Hospital
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Doctor Image Matching UI Design Reference */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px] aspect-[4/4.4] rounded-3xl overflow-hidden bg-gradient-to-tr from-rose-50 via-gray-50/80 to-white border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex items-end justify-center group">
                <Image
                  src="/images/hero_doctor.jpg"
                  alt="Dr. Maruf Allam Saran - Senior Consultant Cardiologist"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Top Badge: Featured Cardiologist */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-full px-3.5 py-1.5 border border-white/70 shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-gray-800">Featured Cardiologist</span>
                </div>

                {/* Floating Verified Doctor Badge with Credentials */}
                <Link
                  href="/doctors/dr-maruf-allam-saran"
                  className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/70 shadow-xl flex items-center justify-between gap-3 group/doc hover:bg-white transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-[#D91F2B] flex-shrink-0 font-bold text-xs">
                      ★ 5.0
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h5 className="text-xs sm:text-sm font-bold text-gray-900 truncate group-hover/doc:text-[#D91F2B] transition">
                          Dr. Maruf Allam Saran
                        </h5>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-semibold flex-shrink-0">
                          BMDC Verified
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate">
                        Senior Consultant Cardiologist • United Hospital
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 bg-red-50 text-[#D91F2B] px-3 py-1.5 rounded-xl text-xs font-bold group-hover/doc:bg-[#D91F2B] group-hover/doc:text-white transition">
                    Book
                  </div>
                </Link>
              </div>

              {/* Floating Second Doctor Card: Dr. Sadia Islam Prome (Gastroenterologist) */}
              <Link
                href="/doctors/dr-sadia-islam-prome"
                className="hidden sm:flex absolute -bottom-5 -left-4 lg:-left-10 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-gray-200/90 shadow-2xl items-center gap-3 hover:border-red-200 hover:scale-105 transition-all group/sadia z-20 max-w-[270px]"
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                  <Image
                    src="/images/dr_sadia.jpg"
                    alt="Dr. Sadia Islam Prome"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-[#D91F2B] flex items-center gap-1">
                    <span>Gastroenterologist</span>
                    <span className="text-amber-500">★ 4.9</span>
                  </div>
                  <div className="text-xs font-bold text-gray-900 truncate group-hover/sadia:text-[#D91F2B] transition">
                    Dr. Sadia Islam Prome
                  </div>
                  <div className="text-[10px] text-gray-500 truncate">
                    United Hospital, Dhaka
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Feature Proposition Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Book Appointments */}
          <Link
            href="/doctors"
            className="group bg-white rounded-2xl p-6 border border-gray-200/90 hover:border-gray-300 shadow-[0_2px_8px_rgba(17,24,39,0.04)] hover:shadow-[0_10px_25px_rgba(17,24,39,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-red-50 flex items-center justify-center text-gray-700 group-hover:text-[#D91F2B] transition-colors mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 group-hover:text-[#D91F2B] transition">
              {t.card_book_appointments}
            </h3>
            <p className="text-xs text-gray-500">Instant slots with senior specialists</p>
          </Link>

          {/* Card 2: Compare Test Prices */}
          <Link
            href="/diagnostics"
            className="group bg-white rounded-2xl p-6 border border-gray-200/90 hover:border-gray-300 shadow-[0_2px_8px_rgba(17,24,39,0.04)] hover:shadow-[0_10px_25px_rgba(17,24,39,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-red-50 flex items-center justify-center text-gray-700 group-hover:text-[#D91F2B] transition-colors mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 group-hover:text-[#D91F2B] transition">
              {t.card_compare_test_prices}
            </h3>
            <p className="text-xs text-gray-500">Transparent rates across diagnostic labs</p>
          </Link>

          {/* Card 3: Verified Doctors & Hospitals */}
          <Link
            href="/hospitals"
            className="group bg-white rounded-2xl p-6 border border-gray-200/90 hover:border-gray-300 shadow-[0_2px_8px_rgba(17,24,39,0.04)] hover:shadow-[0_10px_25px_rgba(17,24,39,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-red-50 flex items-center justify-center text-gray-700 group-hover:text-[#D91F2B] transition-colors mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 group-hover:text-[#D91F2B] transition">
              {t.card_verified_doctors}
            </h3>
            <p className="text-xs text-gray-500">Authentic credentials and verified facilities</p>
          </Link>

          {/* Card 4: Check Symptoms with AI */}
          <Link
            href="/ai-doctor-finder"
            className="group bg-gradient-to-b from-white to-red-50/30 rounded-2xl p-6 border border-red-100 hover:border-[#D91F2B]/40 shadow-[0_2px_8px_rgba(17,24,39,0.04)] hover:shadow-[0_10px_25px_rgba(17,24,39,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center text-center relative overflow-hidden"
          >
            <span className="absolute top-2.5 right-2.5 bg-[#D91F2B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              AI
            </span>
            <div className="w-12 h-12 rounded-xl bg-red-100/60 group-hover:bg-[#D91F2B] flex items-center justify-center text-[#D91F2B] group-hover:text-white transition-colors mb-4">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 group-hover:text-[#D91F2B] transition">
              {t.card_check_symptoms}
            </h3>
            <p className="text-xs text-gray-500">Find right specialty based on symptoms</p>
          </Link>
        </div>
      </section>

      {/* Health Tips from Our Experts (Exact Match to Homepage Reference) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              {t.sec_health_tips}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Simple, expert-backed guidance for your daily wellness</p>
          </div>
          <Link
            href="/health-tips"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#D91F2B] hover:underline group"
          >
            <span>{t.sec_view_all}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tip Card 1 */}
          <Link
            href="/health-tips/build-a-balanced-diet-for-lasting-health"
            className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
          >
            <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
                alt="Stay Hydrated for Better Health"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#D91F2B]">
                Nutrition
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#D91F2B] transition line-clamp-2">
                  Stay Hydrated for Better Health
                </h4>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                  Why daily optimal hydration clears brain fog and aids essential metabolic performance.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                <span>By Dr. Maruf Allam Saran</span>
                <span className="flex items-center text-[#D91F2B] font-semibold group-hover:translate-x-1 transition-transform">
                  Read <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* Tip Card 2 */}
          <Link
            href="/health-tips/simple-ways-to-reduce-daily-stress"
            className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
          >
            <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80"
                alt="Simple Daily Habits for a Healthier Life"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[11px] font-bold text-emerald-700">
                Gastro & Lifestyle
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#D91F2B] transition line-clamp-2">
                  Simple Daily Habits for a Healthier Life
                </h4>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                  Actionable nutritional digestion rituals and hydration routines to reset gut health.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                <span>By Dr. Sadia Islam Prome</span>
                <span className="flex items-center text-[#D91F2B] font-semibold group-hover:translate-x-1 transition-transform">
                  Read <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* Tip Card 3 */}
          <Link
            href="/health-tips/better-sleep-for-a-healthier-you"
            className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
          >
            <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80"
                alt="The Importance of Quality Sleep"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[11px] font-bold text-blue-700">
                Sleep
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-[#D91F2B] transition line-clamp-2">
                  The Importance of Quality Sleep
                </h4>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                  How circadian alignment protects blood pressure and boosts daytime cognitive focus.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                <span>By Prof. Dr. A. Rahman</span>
                <span className="flex items-center text-[#D91F2B] font-semibold group-hover:translate-x-1 transition-transform">
                  Read <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Our Icon Doctors Section (As Featured in Hospital/Home Reference) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{t.sec_popular_doctors}</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Renowned professors and specialized clinicians</p>
          </div>
          <Link
            href="/doctors"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#D91F2B] hover:underline group"
          >
            <span>{t.sec_view_all}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DOCTORS.slice(0, 3).map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl p-5 border border-gray-200/90 hover:border-gray-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                    <Image
                      src={doc.avatar}
                      alt={doc.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[15px] hover:text-[#D91F2B] transition">
                      <Link href={`/doctors/${doc.slug}`}>{doc.name}</Link>
                    </h3>
                    <p className="text-xs text-[#D91F2B] font-semibold">{doc.specialty}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-gray-800">{doc.rating}</span>
                      <span>({doc.reviewCount})</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50/80 rounded-xl p-3 text-xs space-y-1 mb-4 border border-gray-100">
                  <div className="flex justify-between text-gray-600">
                    <span>Hospital:</span>
                    <span className="font-medium text-gray-800 truncate max-w-[170px]">{doc.hospital.name}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Consultation:</span>
                    <span className="font-bold text-gray-900">৳{doc.fees.inPerson}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                <Link
                  href={`/doctors/${doc.slug}`}
                  className="w-full text-center py-2 text-xs font-semibold text-gray-700 bg-gray-100/80 hover:bg-gray-200 rounded-full transition"
                >
                  {t.btn_view_profile}
                </Link>
                <button
                  onClick={() => setSelectedDoctorForBooking(doc)}
                  className="w-full text-center py-2 text-xs font-semibold text-white bg-[#D91F2B] hover:bg-[#C01823] active:scale-95 rounded-full transition shadow-sm"
                >
                  {t.btn_book_appointment}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Tests & Health Packages Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Popular Tests & Diagnostics */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg tracking-tight">{t.sec_popular_tests}</h3>
                <p className="text-xs text-gray-500">Standardized pricing at accredited labs</p>
              </div>
              <Link href="/diagnostics" className="text-xs font-semibold text-[#D91F2B] hover:underline flex items-center">
                View All Tests <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </div>

            <div className="space-y-2">
              {DIAGNOSTIC_TESTS.slice(0, 4).map((test) => (
                <Link
                  key={test.id}
                  href={`/diagnostics?search=${encodeURIComponent(test.name)}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-50 text-[#D91F2B] flex items-center justify-center flex-shrink-0">
                      <FlaskConical className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 group-hover:text-[#D91F2B] transition">
                        {test.name}
                      </h4>
                      <p className="text-[11px] text-gray-400">{test.sampleType || 'Lab Sample'} • {test.reportDeliveryTime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900 text-sm">৳{test.providers[0].price.toLocaleString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Health Packages */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg tracking-tight">{t.sec_health_packages}</h3>
                <p className="text-xs text-gray-500">Comprehensive preventive health checkups</p>
              </div>
              <Link href="/hospitals/united-hospital-dhaka#packages" className="text-xs font-semibold text-[#D91F2B] hover:underline flex items-center">
                View Packages <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Package 1 */}
              <div className="bg-gradient-to-b from-red-50/40 to-white rounded-xl p-4 border border-red-100/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-2 text-[#D91F2B]">
                    <HeartPulse className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Executive</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Executive Health Checkup</h4>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">A complete wellness screening for adults with essential tests.</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">৳12,500</span>
                    <span className="text-xs text-gray-400 line-through">৳15,000</span>
                  </div>
                  <Link
                    href="/hospitals/united-hospital-dhaka#packages"
                    className="block w-full py-2 text-center text-xs font-semibold text-[#D91F2B] bg-white border border-[#D91F2B] hover:bg-red-50 rounded-full transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Package 2 */}
              <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-2 text-rose-600">
                    <Activity className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Cardiac</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Cardiac Health Package</h4>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">Heart health assessment with ECG, Echo, and senior doctor review.</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">৳8,500</span>
                    <span className="text-xs text-gray-400 line-through">৳10,500</span>
                  </div>
                  <Link
                    href="/hospitals/united-hospital-dhaka#packages"
                    className="block w-full py-2 text-center text-xs font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-full transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Promotion Banner (Matching UI Reference) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gray-50 via-red-50/25 to-gray-50 rounded-3xl p-6 sm:p-10 border border-gray-200/90 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            {/* Mockup Phone Graphic */}
            <div className="relative w-20 h-36 bg-[#111827] rounded-2xl border-4 border-gray-800 shadow-xl flex flex-col items-center justify-center p-2 flex-shrink-0">
              <div className="w-6 h-1 bg-gray-700 rounded-full mb-3" />
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-[#D91F2B]">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-[8px] font-bold text-white mt-1">ThetaCure</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                {t.app_banner_title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-md mt-1 leading-relaxed">
                {t.app_banner_subtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* App Store button */}
            <Link
              href="/download-app?platform=ios"
              className="flex items-center gap-2.5 px-4 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 active:scale-95 transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.92-1 .04-2.16.66-2.82 1.43-.59.67-1.1 1.77-.96 2.82 1.11.09 2.21-.56 2.84-1.33z" />
              </svg>
              <div className="text-left text-xs leading-tight">
                <span className="text-[10px] text-gray-300 block">Download on</span>
                <span className="font-semibold text-sm">App Store</span>
              </div>
            </Link>

            {/* Google Play button */}
            <Link
              href="/download-app?platform=android"
              className="flex items-center gap-2.5 px-4 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 active:scale-95 transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.054 2.054 0 01-.61-.954V2.768c.112-.37.332-.705.609-.954zm11.233 11.235l2.298 2.298-11.45 6.44 9.152-8.738zm2.298-2.098l3.155 1.774c.957.538.957 1.419 0 1.957l-3.155 1.775-2.098-2.754 2.098-2.752zm-2.298-2.098L5.69 2.115l11.45 6.44-2.298 2.298z" />
              </svg>
              <div className="text-left text-xs leading-tight">
                <span className="text-[10px] text-gray-300 block">GET IT ON</span>
                <span className="font-semibold text-sm">Google Play</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Modal Instance */}
      {selectedDoctorForBooking && (
        <BookingModal
          doctor={selectedDoctorForBooking}
          isOpen={true}
          onClose={() => setSelectedDoctorForBooking(null)}
        />
      )}
    </div>
  );
}
