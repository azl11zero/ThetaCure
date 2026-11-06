'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ShieldCheck,
  Star,
  Clock,
  Calendar,
  Building2,
  Video,
  Bookmark,
  Share2,
  CheckCircle2,
  GraduationCap,
  MapPin,
  ChevronRight,
  ArrowLeft,
  FileText
} from 'lucide-react';
import { DOCTORS, HOSPITALS, HEALTH_TIPS } from '@/lib/data';
import BookingModal from '@/components/BookingModal';
import { useLanguage } from '@/components/LanguageContext';

export default function DoctorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { t } = useLanguage();
  const targetSlug = resolvedParams.slug === 'dr-farzana-ahmed' ? 'dr-maruf-allam-saran' : resolvedParams.slug;
  const doctor = DOCTORS.find((d) => d.slug === targetSlug) || DOCTORS[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'reviews' | 'health-tips'>('overview');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const doctorArticles = HEALTH_TIPS.filter(tip => tip.author.name === doctor.name);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    const saved = JSON.parse(localStorage.getItem('thetacure_saved_doctors') || '[]');
    if (!isSaved) {
      localStorage.setItem('thetacure_saved_doctors', JSON.stringify([...saved, doctor.id]));
    } else {
      localStorage.setItem('thetacure_saved_doctors', JSON.stringify(saved.filter((id: string) => id !== doctor.id)));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation matching UI reference */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/doctors" className="hover:text-gray-600 transition">Find Doctors</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">{doctor.name}</span>
      </nav>

      {/* Main Doctor Profile Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-card-subtle">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Doctor Photo */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100 shadow-sm">
              <Image
                src={doctor.avatar}
                alt={doctor.name}
                fill
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Doctor Info */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-[#D91F2B] text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Doctor (BMDC {doctor.bmdcNumber})</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                {doctor.name}
              </h1>

              <p className="text-sm font-medium text-gray-500">{doctor.degrees}</p>
              <p className="text-sm font-semibold text-[#D91F2B]">{doctor.specialty}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-gray-900">{doctor.rating}</span>
                  <span className="text-gray-400">({doctor.reviewCount.toLocaleString()} reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 font-medium">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{doctor.experienceYears}+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-row md:flex-col items-center md:items-end gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="flex-1 md:flex-initial px-6 py-2.5 bg-[#D91F2B] hover:bg-[#C01823] text-white font-medium text-sm rounded-full shadow-sm hover:shadow transition flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className={`p-2.5 rounded-full border text-xs font-medium transition flex items-center gap-1.5 ${
                  isSaved
                    ? 'border-[#D91F2B] bg-red-50 text-[#D91F2B]'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
                title="Save Doctor"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#D91F2B]' : ''}`} />
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save Doctor'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-medium transition flex items-center gap-1.5"
                title="Share Profile"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share Profile'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section Tabs (Overview, Schedule, Reviews, Health Tips) */}
      <div className="border-b border-gray-200">
        <div className="flex items-center space-x-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'schedule', label: 'Schedule' },
            { id: 'reviews', label: `Reviews (${doctor.reviews?.length || 0})` },
            { id: 'health-tips', label: `Health Tips (${doctorArticles.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative py-3.5 text-sm font-medium transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#D91F2B] font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D91F2B] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Tab Specific Content */}
        <div className="lg:col-span-8 space-y-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-3">
                <h3 className="font-bold text-gray-900 text-base">About</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{doctor.about}</p>
              </div>

              {/* Areas of Expertise */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-3">
                <h3 className="font-bold text-gray-900 text-base">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.areasOfExpertise.map((area) => (
                    <span
                      key={area}
                      className="text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education & Qualifications */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#D91F2B]" />
                  <h3 className="font-bold text-gray-900 text-base">Education & Training</h3>
                </div>
                <div className="space-y-3">
                  {doctor.education.map((edu, idx) => (
                    <div key={idx} className="border-l-2 border-red-200 pl-3 py-0.5">
                      <h4 className="text-sm font-semibold text-gray-800">{edu.degree}</h4>
                      <p className="text-xs text-gray-500">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Working At Hospital Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#D91F2B]" />
                  <h3 className="font-bold text-gray-900 text-base">Working At</h3>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{doctor.hospital.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{doctor.hospital.location}</p>
                  </div>
                  <Link
                    href={`/hospitals/${doctor.hospital.slug}`}
                    className="text-xs font-semibold text-[#D91F2B] hover:underline flex items-center"
                  >
                    View Hospital <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-6">
              <h3 className="font-bold text-gray-900 text-lg">Weekly Consultation Schedule</h3>
              <div className="space-y-4">
                {doctor.schedule.map((sch, i) => (
                  <div key={i} className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-semibold text-gray-900 text-sm">{sch.day}</span>
                      <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded bg-white text-gray-600 border border-gray-200 capitalize">
                        {sch.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sch.slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setIsBookingOpen(true)}
                          className="px-2.5 py-1 text-xs bg-white hover:bg-red-50 hover:text-[#D91F2B] hover:border-red-200 border border-gray-200 rounded-lg text-gray-700 transition"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Patient Reviews & Feedback</h3>
                  <p className="text-xs text-gray-500">Verified consultations conducted via ThetaCure</p>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-gray-900 text-sm">{doctor.rating}</span>
                  <span className="text-xs text-gray-500">/ 5.0</span>
                </div>
              </div>

              <div className="space-y-4">
                {doctor.reviews?.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 text-sm">{rev.patientName}</span>
                        {rev.verifiedVisit && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Verified Visit
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{rev.date}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'health-tips' && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-6">
              <h3 className="font-bold text-gray-900 text-lg">Health Articles by {doctor.name}</h3>
              {doctorArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {doctorArticles.map((art) => (
                    <Link
                      key={art.id}
                      href={`/health-tips/${art.slug}`}
                      className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 bg-gray-50 hover:bg-white transition space-y-2 group"
                    >
                      <span className="text-[11px] font-semibold text-[#D91F2B] uppercase">{art.category}</span>
                      <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#D91F2B] transition line-clamp-2">
                        {art.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{art.excerpt}</p>
                      <div className="text-xs text-gray-400 pt-1">{art.readTime} • {art.publishedDate}</div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No published articles yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Sticky Booking & Fee Cards (Matching UI Reference) */}
        <div className="lg:col-span-4 space-y-5 sticky top-28">
          {/* Next Available Slot Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-4">
            <div className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
              <Calendar className="w-4 h-4 text-[#D91F2B]" />
              <span>Next Available Slot</span>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                <span>{doctor.nextAvailableSlot.date}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{doctor.nextAvailableSlot.time}</span>
              </div>
            </div>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full py-3 bg-[#D91F2B] hover:bg-[#C01823] text-white font-medium text-sm rounded-full shadow transition text-center"
            >
              Book Appointment
            </button>
          </div>

          {/* Consultation Fee Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-4">
            <h4 className="font-semibold text-gray-900 text-sm">Consultation Fee</h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span>In-Person</span>
                </div>
                <span className="font-bold text-gray-900">৳{doctor.fees.inPerson}</span>
              </div>

              <div className="flex items-center justify-between text-sm py-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Video className="w-4 h-4 text-gray-400" />
                  <span>Online (Video)</span>
                </div>
                <span className="font-bold text-gray-900">৳{doctor.fees.online}</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 italic">
              Includes 7-day free follow-up review for diagnostic report interpretation.
            </p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        doctor={doctor}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
