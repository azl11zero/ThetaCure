'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  MapPin,
  Filter,
  Star,
  ShieldCheck,
  Calendar,
  Clock,
  ArrowUpDown,
  Building2,
  Video,
  X
} from 'lucide-react';
import { DOCTORS } from '@/lib/data';
import { Doctor } from '@/lib/types';
import BookingModal from '@/components/BookingModal';
import { useLanguage } from '@/components/LanguageContext';

export default function DoctorsDirectoryPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [consultationType, setConsultationType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'fee-asc' | 'experience'>('recommended');
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);

  const specialties = useMemo(() => {
    return ['All', ...Array.from(new Set(DOCTORS.map((d) => d.specialty)))];
  }, []);

  const locations = ['All', 'Gulshan', 'Panthapath', 'Bashundhara', 'Dhanmondi', 'Uttara'];

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      const matchSearch =
        search === '' ||
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
        doc.hospital.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.subSpecialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchSpecialty =
        selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;

      const matchLocation =
        selectedLocation === 'All' || doc.hospital.location.includes(selectedLocation);

      const matchType =
        consultationType === 'All' ||
        (consultationType === 'online' && doc.fees.online > 0) ||
        (consultationType === 'in-person' && doc.fees.inPerson > 0);

      return matchSearch && matchSpecialty && matchLocation && matchType;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'fee-asc') return a.fees.inPerson - b.fees.inPerson;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return 0; // recommended
    });
  }, [search, selectedSpecialty, selectedLocation, consultationType, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Heading */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Find Trusted Doctors
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl">
          Search BMDC-registered specialists, check chamber schedules, compare consultation fees, and book guaranteed appointment slots.
        </p>
      </div>

      {/* Main Search & Quick Filters Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-card-subtle flex flex-col md:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctor by name, specialty, or condition (e.g. Farzana, Diabetes)..."
            className="w-full pl-11 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D91F2B] focus:bg-white transition"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Location Filter */}
        <div className="w-full md:w-48">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D91F2B] font-medium text-gray-700 cursor-pointer"
          >
            <option value="All">All Areas (Dhaka)</option>
            {locations.filter(l => l !== 'All').map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="w-full md:w-48">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-3 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D91F2B] font-medium text-gray-700 cursor-pointer"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="rating">Highest Rated</option>
            <option value="fee-asc">Lowest Fee</option>
            <option value="experience">Most Experienced</option>
          </select>
        </div>
      </div>

      {/* Specialty Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {specialties.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedSpecialty === spec
                ? 'bg-[#D91F2B] text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {spec === 'All' ? 'All Specialties' : spec}
          </button>
        ))}
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 shadow-card-subtle hover:shadow-card-hover transition-all flex flex-col justify-between overflow-hidden"
          >
            <div className="p-5 space-y-4">
              {/* Doctor Header */}
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                  <Image
                    src={doc.avatar}
                    alt={doc.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#D91F2B]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>BMDC {doc.bmdcNumber}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base leading-tight hover:text-[#D91F2B] transition">
                    <Link href={`/doctors/${doc.slug}`}>{doc.name}</Link>
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1">{doc.degrees}</p>
                  <p className="text-xs font-semibold text-gray-700">{doc.specialty}</p>
                </div>
              </div>

              {/* Rating & Experience */}
              <div className="flex items-center justify-between text-xs text-gray-500 py-2 border-y border-gray-100">
                <div className="flex items-center gap-1 text-gray-800">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-bold">{doc.rating}</span>
                  <span className="text-gray-400">({doc.reviewCount})</span>
                </div>
                <div>{doc.experienceYears}+ Years Exp.</div>
              </div>

              {/* Hospital Affiliation & Slot */}
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-gray-600">
                  <Building2 className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-1">{doc.hospital.name}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg w-fit">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Next: {doc.nextAvailableSlot.formatted}</span>
                </div>
              </div>

              {/* Fees */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-gray-500">Consultation Fee</span>
                <span className="font-bold text-gray-900 text-sm">৳{doc.fees.inPerson}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 p-4 bg-gray-50/60 border-t border-gray-100">
              <Link
                href={`/doctors/${doc.slug}`}
                className="w-full text-center py-2 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 rounded-full border border-gray-200 transition"
              >
                View Profile
              </Link>
              <button
                onClick={() => setBookingDoctor(doc)}
                className="w-full text-center py-2 text-xs font-semibold text-white bg-[#D91F2B] hover:bg-[#C01823] rounded-full transition shadow-sm"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8 space-y-3">
          <p className="text-gray-500 text-base">No doctors matched your criteria.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedSpecialty('All');
              setSelectedLocation('All');
            }}
            className="text-sm font-semibold text-[#D91F2B] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Booking Modal */}
      {bookingDoctor && (
        <BookingModal
          doctor={bookingDoctor}
          isOpen={true}
          onClose={() => setBookingDoctor(null)}
        />
      )}
    </div>
  );
}
