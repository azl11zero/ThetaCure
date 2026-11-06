'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  ShieldCheck,
  Star,
  Clock,
  Building2,
  Calendar,
  Stethoscope,
  HeartPulse,
  Activity,
  Users,
  Brain,
  Baby,
  Sparkles,
  Eye
} from 'lucide-react';
import { SPECIALTIES, DOCTORS, HOSPITALS } from '@/lib/data';

export default function SpecialtyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const specialty = SPECIALTIES.find((s) => s.slug === resolvedParams.slug) || SPECIALTIES[0];
  const doctors = DOCTORS.filter((d) => {
    const specLower = specialty.name.toLowerCase();
    const docSpec = d.specialty.toLowerCase();
    return (
      docSpec.includes(specLower) ||
      specLower.includes(docSpec) ||
      d.subSpecialties.some((sub) => sub.toLowerCase().includes(specialty.slug.replace('-', ' ')))
    );
  });

  const displayDoctors = doctors.length > 0 ? doctors : [DOCTORS[0]];

  const iconMap: Record<string, any> = { Stethoscope, HeartPulse, Activity, Users, Brain, Baby, Sparkles, Eye, ShieldCheck };
  const IconComp = iconMap[specialty.icon] || Stethoscope;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/specialties" className="hover:text-gray-600">Specialties</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">{specialty.name}</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gray-50 via-red-50/20 to-gray-50 rounded-3xl p-8 border border-gray-200 shadow-sm flex items-start gap-6">
        <div className="w-16 h-16 rounded-2xl bg-white text-[#D91F2B] border border-red-100 shadow-sm flex items-center justify-center flex-shrink-0">
          <IconComp className="w-8 h-8" />
        </div>
        <div>
          <span className="text-xs font-bold text-[#D91F2B] uppercase tracking-wider">Medical Department</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">{specialty.name} Specialists in Dhaka</h1>
          <p className="text-sm text-gray-600 mt-2 max-w-2xl leading-relaxed">{specialty.description}</p>
        </div>
      </div>

      {/* Specialists List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Available {specialty.name} Consultants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl p-5 border border-gray-200 hover:border-gray-300 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                    <Image src={doc.avatar} alt={doc.name} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#D91F2B] bg-red-50 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                      <ShieldCheck className="w-3 h-3" /> BMDC Verified
                    </span>
                    <h3 className="font-bold text-gray-900 text-sm mt-1">
                      <Link href={`/doctors/${doc.slug}`}>{doc.name}</Link>
                    </h3>
                    <p className="text-xs text-gray-500">{doc.degrees}</p>
                  </div>
                </div>

                <div className="text-xs text-gray-600 space-y-1 pt-2 border-t border-gray-100">
                  <p className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-gray-400" />
                    <span>{doc.hospital.name}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Slot: {doc.nextAvailableSlot.formatted}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-2 border-t border-gray-100">
                <Link
                  href={`/doctors/${doc.slug}`}
                  className="py-2 text-center text-xs font-semibold text-gray-700 bg-gray-50 rounded-full border border-gray-200 hover:bg-gray-100 transition"
                >
                  Profile
                </Link>
                <Link
                  href={`/doctors/${doc.slug}/book`}
                  className="py-2 text-center text-xs font-semibold text-white bg-[#D91F2B] hover:bg-[#C01823] rounded-full transition shadow-sm"
                >
                  Book Slot
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
