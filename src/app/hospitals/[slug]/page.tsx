'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  Navigation,
  Bookmark,
  Share2,
  Calendar,
  Bed,
  Users,
  FlaskConical,
  Clock,
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  Activity,
  HeartHandshake,
  CheckCircle2,
  Building2,
  PhoneCall
} from 'lucide-react';
import { HOSPITALS, DOCTORS, DIAGNOSTIC_TESTS } from '@/lib/data';
import BookingModal from '@/components/BookingModal';
import { Doctor } from '@/lib/types';
import { useLanguage } from '@/components/LanguageContext';

export default function HospitalProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { t } = useLanguage();
  const hospital = HOSPITALS.find((h) => h.slug === resolvedParams.slug) || HOSPITALS[0];

  const [activeTab, setActiveTab] = useState<
    'overview' | 'doctors' | 'diagnostics' | 'services' | 'packages' | 'reviews' | 'gallery'
  >('overview');

  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Doctors affiliated with this hospital
  const hospitalDoctors = DOCTORS.filter((d) => d.hospital.slug === hospital.slug || d.hospital.id === hospital.id);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/hospitals" className="hover:text-gray-600 transition">Find Hospitals</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">{hospital.name}</span>
      </nav>

      {/* Hospital Hero Banner Card (Faithfully matching Reference Image) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-card-subtle overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-2xl border border-gray-100 p-2 flex items-center justify-center bg-white shadow-sm flex-shrink-0">
                <Building2 className="w-10 h-10 text-[#D91F2B]" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-[#D91F2B] text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Hospital</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  {hospital.name}
                </h1>
                <p className="text-sm font-medium text-gray-500">{hospital.category}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-gray-900">{hospital.rating}</span>
                    <span className="text-gray-400">({hospital.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 font-medium text-gray-700">
                    <Bed className="w-4 h-4 text-gray-400" />
                    <span>{hospital.beds}</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 text-xs text-gray-500 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span>{hospital.address}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={() => {
                  if (hospitalDoctors.length > 0) setSelectedDoctorForBooking(hospitalDoctors[0]);
                }}
                className="px-5 py-2.5 bg-[#D91F2B] hover:bg-[#C01823] text-white font-medium text-xs rounded-full shadow-sm transition flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <a
                href={`tel:${hospital.phone}`}
                className="px-4 py-2.5 border border-gray-200 hover:border-gray-300 bg-white text-gray-700 font-medium text-xs rounded-full transition flex items-center gap-2 hover:bg-gray-50"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#D91F2B]" />
                <span>Call Now</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(hospital.name + ' ' + hospital.address)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 border border-gray-200 hover:border-gray-300 bg-white text-gray-700 font-medium text-xs rounded-full transition flex items-center gap-2 hover:bg-gray-50"
              >
                <Navigation className="w-3.5 h-3.5 text-gray-500" />
                <span>Get Directions</span>
              </a>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2.5 rounded-full border text-xs font-medium transition flex items-center gap-1.5 ${
                  isSaved ? 'border-[#D91F2B] bg-red-50 text-[#D91F2B]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
                title="Save Hospital"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#D91F2B]' : ''}`} />
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-medium transition flex items-center gap-1.5"
                title="Share Profile"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Right Building Image */}
          <div className="lg:col-span-5 relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-gray-100 shadow-md">
            <Image
              src={hospital.coverImage}
              alt={hospital.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Hospital Tabs (Overview, Doctors, Tests & Diagnostics, Services, Packages, Reviews, Gallery) */}
      <div className="border-b border-gray-200">
        <div className="flex items-center space-x-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'doctors', label: `Doctors (${hospitalDoctors.length})` },
            { id: 'diagnostics', label: 'Tests & Diagnostics' },
            { id: 'services', label: 'Services' },
            { id: 'packages', label: `Packages (${hospital.packages.length})` },
            { id: 'reviews', label: 'Reviews' },
            { id: 'gallery', label: 'Gallery' },
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

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* 4 Feature Highlights Cards Matching Reference */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center mb-3">
                <Bed className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">24/7 Emergency Care</h4>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">Advanced Diagnostics</h4>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">Experienced Specialists</h4>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center mb-3">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">Patient-Centric Care</h4>
            </div>
          </div>

          {/* About Hospital & Key Facilities side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* About & Stats */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-2">About {hospital.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{hospital.about}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-100 text-center">
                <div className="p-2 bg-gray-50 rounded-xl">
                  <div className="text-base font-bold text-gray-900">{hospital.beds}</div>
                  <div className="text-[10px] text-gray-400 uppercase font-semibold">Beds</div>
                </div>
                <div className="p-2 bg-gray-50 rounded-xl">
                  <div className="text-base font-bold text-gray-900">{hospital.doctorCount}+</div>
                  <div className="text-[10px] text-gray-400 uppercase font-semibold">Doctors</div>
                </div>
                <div className="p-2 bg-gray-50 rounded-xl">
                  <div className="text-base font-bold text-gray-900">{hospital.testCount}+</div>
                  <div className="text-[10px] text-gray-400 uppercase font-semibold">Tests</div>
                </div>
                <div className="p-2 bg-gray-50 rounded-xl">
                  <div className="text-base font-bold text-[#D91F2B]">24/7</div>
                  <div className="text-[10px] text-gray-400 uppercase font-semibold">Services</div>
                </div>
              </div>
            </div>

            {/* Key Facilities List */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-4">
              <h3 className="font-bold text-gray-900 text-base">Key Facilities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hospital.keyFacilities.map((fac, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#D91F2B] flex-shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Our Icon Doctors Section inside Hospital Profile */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Our Icon Doctors</h3>
                <p className="text-xs text-gray-500">Renowned consultants practicing at {hospital.name}</p>
              </div>
              <button
                onClick={() => setActiveTab('doctors')}
                className="text-xs font-semibold text-[#D91F2B] hover:underline flex items-center"
              >
                View All Doctors <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {hospitalDoctors.slice(0, 3).map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-gray-300 shadow-card-subtle transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image src={doc.avatar} alt={doc.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs group-hover:text-[#D91F2B] transition line-clamp-1">
                        <Link href={`/doctors/${doc.slug}`}>{doc.name}</Link>
                      </h4>
                      <p className="text-[11px] text-gray-500 line-clamp-1">{doc.specialty}</p>
                      <div className="flex items-center gap-1 text-[11px] text-gray-700 mt-0.5">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="font-semibold">{doc.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/doctors/${doc.slug}`}
                    className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 group-hover:text-[#D91F2B] transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Tests & Diagnostics and Health Packages Rows */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-bold text-gray-900 text-base">Popular Tests & Diagnostics</h3>
                <button onClick={() => setActiveTab('diagnostics')} className="text-xs text-[#D91F2B] font-semibold hover:underline">
                  View All Tests →
                </button>
              </div>

              <div className="space-y-3">
                {DIAGNOSTIC_TESTS.slice(0, 4).map((test) => (
                  <div key={test.id} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50">
                    <span className="font-medium text-gray-800">{test.name}</span>
                    <span className="font-bold text-gray-900">৳{test.providers[0].price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-bold text-gray-900 text-base">Health Packages</h3>
                <button onClick={() => setActiveTab('packages')} className="text-xs text-[#D91F2B] font-semibold hover:underline">
                  View All Packages →
                </button>
              </div>

              <div className="space-y-3">
                {hospital.packages.map((pkg) => (
                  <div key={pkg.id} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xs">{pkg.title}</h4>
                      <p className="text-[11px] text-gray-500 line-clamp-1">{pkg.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900 text-sm">৳{pkg.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location & Contact Section with Map Preview (Matching UI Reference) */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Location & Contact</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D91F2B] mt-0.5 flex-shrink-0" />
                  <span>{hospital.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#D91F2B] flex-shrink-0" />
                  <span>{hospital.phone} (General Enquiries)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#D91F2B] flex-shrink-0" />
                  <span>24/7 Open • Emergency & Casualty Always Ready</span>
                </div>
              </div>

              {/* Map Preview Card */}
              <div className="relative aspect-[16/7] rounded-xl overflow-hidden border border-gray-200 bg-emerald-50 flex items-center justify-center p-4">
                <div className="text-center space-y-1">
                  <div className="w-8 h-8 rounded-full bg-[#D91F2B] text-white flex items-center justify-center mx-auto shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-gray-800">{hospital.name}</p>
                  <p className="text-[11px] text-gray-500">{hospital.area}, Dhaka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Doctors Tab */}
      {activeTab === 'doctors' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hospitalDoctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image src={doc.avatar} alt={doc.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">
                    <Link href={`/doctors/${doc.slug}`}>{doc.name}</Link>
                  </h4>
                  <p className="text-xs text-[#D91F2B]">{doc.specialty}</p>
                  <p className="text-xs text-gray-500">{doc.degrees}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs py-2 border-t border-gray-100">
                <span className="text-gray-500">Consultation: ৳{doc.fees.inPerson}</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">Available</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={`/doctors/${doc.slug}`}
                  className="w-full text-center py-2 text-xs font-semibold text-gray-700 bg-gray-50 rounded-full border border-gray-200 hover:bg-gray-100 transition"
                >
                  View Profile
                </Link>
                <button
                  onClick={() => setSelectedDoctorForBooking(doc)}
                  className="w-full text-center py-2 text-xs font-semibold text-white bg-[#D91F2B] hover:bg-[#C01823] rounded-full transition"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Diagnostics Tab */}
      {activeTab === 'diagnostics' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-4">
          <h3 className="font-bold text-gray-900 text-lg">Diagnostic Tests Available at {hospital.name}</h3>
          <div className="divide-y divide-gray-100">
            {DIAGNOSTIC_TESTS.map((test) => (
              <div key={test.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 text-base">{test.name}</h4>
                  <p className="text-xs text-gray-500">{test.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                    <span>Sample: {test.sampleType}</span>
                    <span>•</span>
                    <span>Report Time: {test.reportDeliveryTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-lg font-bold text-gray-900">৳{test.providers[0].price.toLocaleString()}</span>
                  <Link
                    href={`/diagnostics?search=${encodeURIComponent(test.name)}`}
                    className="px-4 py-2 text-xs font-semibold text-[#D91F2B] bg-red-50 hover:bg-red-100 rounded-full transition"
                  >
                    Book Test
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Packages Tab */}
      {activeTab === 'packages' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hospital.packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#D91F2B] uppercase tracking-wider">Screening Package</span>
                <h4 className="text-xl font-bold text-gray-900 mt-1">{pkg.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{pkg.description}</p>

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-gray-700">What is included:</p>
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-gray-900">৳{pkg.price.toLocaleString()}</span>
                  {pkg.originalPrice && (
                    <span className="text-xs text-gray-400 line-through ml-2">৳{pkg.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <Link
                  href={`/packages/${pkg.id}`}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#D91F2B] hover:bg-[#C01823] rounded-full transition shadow inline-block"
                >
                  Book Package
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
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
