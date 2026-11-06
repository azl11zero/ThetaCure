'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Building2,
  FlaskConical,
  Calendar,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { DOCTORS, HOSPITALS, DIAGNOSTIC_TESTS, HEALTH_TIPS } from '@/lib/data';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || searchParams.get('search') || '';
  const initialType = searchParams.get('type') || 'all';

  const [query, setQuery] = useState(initialQ);
  const [activeTab, setActiveTab] = useState<'all' | 'doctors' | 'hospitals' | 'tests' | 'tips'>(initialType as any);

  const filteredDoctors = useMemo(() => {
    if (!query) return DOCTORS;
    const q = query.toLowerCase();
    return DOCTORS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.hospital.name.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredHospitals = useMemo(() => {
    if (!query) return HOSPITALS;
    const q = query.toLowerCase();
    return HOSPITALS.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q) ||
        h.area.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredTests = useMemo(() => {
    if (!query) return DIAGNOSTIC_TESTS;
    const q = query.toLowerCase();
    return DIAGNOSTIC_TESTS.filter(
      (t) => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredTips = useMemo(() => {
    if (!query) return HEALTH_TIPS;
    const q = query.toLowerCase();
    return HEALTH_TIPS.filter(
      (tip) => tip.title.toLowerCase().includes(q) || tip.category.toLowerCase().includes(q)
    );
  }, [query]);

  const totalResults =
    filteredDoctors.length + filteredHospitals.length + filteredTests.length + filteredTips.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Search Healthcare</h1>
        <div className="relative max-w-2xl">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search doctors, hospitals, diagnostic tests, or health tips..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-[#D91F2B]"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex items-center space-x-6 overflow-x-auto">
          {[
            { id: 'all', label: `All Results (${totalResults})` },
            { id: 'doctors', label: `Doctors (${filteredDoctors.length})` },
            { id: 'hospitals', label: `Hospitals (${filteredHospitals.length})` },
            { id: 'tests', label: `Diagnostics (${filteredTests.length})` },
            { id: 'tips', label: `Health Tips (${filteredTips.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 text-xs sm:text-sm font-semibold transition border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#D91F2B] text-[#D91F2B]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Content */}
      <div className="space-y-8">
        {/* Doctors Section */}
        {(activeTab === 'all' || activeTab === 'doctors') && filteredDoctors.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-bold text-gray-900 text-lg">Doctors & Specialists</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredDoctors.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/doctors/${doc.slug}`}
                  className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-gray-300 shadow-sm transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image src={doc.avatar} alt={doc.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#D91F2B] transition">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-[#D91F2B]">{doc.specialty}</p>
                      <p className="text-[11px] text-gray-400">{doc.hospital.name}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#D91F2B] transition" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Hospitals Section */}
        {(activeTab === 'all' || activeTab === 'hospitals') && filteredHospitals.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-bold text-gray-900 text-lg">Hospitals & Clinics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHospitals.map((hosp) => (
                <Link
                  key={hosp.id}
                  href={`/hospitals/${hosp.slug}`}
                  className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-gray-300 shadow-sm transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base group-hover:text-[#D91F2B] transition">
                        {hosp.name}
                      </h3>
                      <p className="text-xs text-gray-500">{hosp.category} • {hosp.area}, Dhaka</p>
                      <p className="text-xs text-emerald-700 font-medium mt-0.5">{hosp.operatingHours}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#D91F2B] transition" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Diagnostic Tests Section */}
        {(activeTab === 'all' || activeTab === 'tests') && filteredTests.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-bold text-gray-900 text-lg">Diagnostic Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTests.map((test) => (
                <Link
                  key={test.id}
                  href={`/diagnostics/${test.slug}`}
                  className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-gray-300 shadow-sm transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#D91F2B] transition">
                        {test.name}
                      </h3>
                      <p className="text-xs text-gray-400">{test.category} • {test.reportDeliveryTime}</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">From ৳{test.providers[0].price}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Health Tips Section */}
        {(activeTab === 'all' || activeTab === 'tips') && filteredTips.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-bold text-gray-900 text-lg">Health Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredTips.map((tip) => (
                <Link
                  key={tip.id}
                  href={`/health-tips/${tip.slug}`}
                  className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-gray-300 shadow-sm transition space-y-2 group"
                >
                  <span className="text-[11px] font-bold text-[#D91F2B] uppercase">{tip.category}</span>
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#D91F2B] transition line-clamp-2">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1">{tip.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-gray-400">Loading search results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
