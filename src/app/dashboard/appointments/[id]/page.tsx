'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  Video,
  FileText,
  Printer,
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  User,
  ArrowLeft
} from 'lucide-react';
import { INITIAL_APPOINTMENTS, DOCTORS } from '@/lib/data';

export default function AppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const appointment =
    INITIAL_APPOINTMENTS.find((a) => a.id === resolvedParams.id) || INITIAL_APPOINTMENTS[0];
  const doctor = DOCTORS.find((d) => d.name === appointment.doctorName) || DOCTORS[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/dashboard" className="hover:text-gray-600 transition">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">Appointment #{appointment.id}</span>
      </nav>

      {/* Main Appointment Slip */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-card-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Confirmed Booking</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Appointment Token #{appointment.tokenNumber || 'TK-12'}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">Booking ID: {appointment.id}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-[#D91F2B] text-white rounded-full text-xs font-semibold shadow hover:bg-[#C01823] transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Doctor and Chamber Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50/70 rounded-2xl p-5 border border-gray-100 space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Practitioner</h3>
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                <Image src={doctor.avatar} alt={doctor.name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">
                  <Link href={`/doctors/${doctor.slug}`} className="hover:text-[#D91F2B] transition">
                    {appointment.doctorName}
                  </Link>
                </h4>
                <p className="text-xs text-[#D91F2B]">{appointment.doctorSpecialty || doctor.specialty}</p>
                <p className="text-xs text-gray-500">{doctor.hospital.name}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50/70 rounded-2xl p-5 border border-gray-100 space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Schedule & Venue</h3>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D91F2B]" />
                <span className="font-semibold">{appointment.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D91F2B]" />
                <span>{appointment.timeSlot || '10:30 AM'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#D91F2B]" />
                <span>{appointment.consultationType || 'in-person'} Consultation • {appointment.hospitalName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Details & Instructions */}
        <div className="bg-rose-50/40 rounded-2xl p-5 border border-red-100 space-y-3 text-xs text-gray-700">
          <h3 className="font-bold text-gray-900 text-sm">Chamber Instructions for Patient</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Please arrive 15 minutes prior to your allocated slot for vitals recording (BP, pulse, weight).</li>
            <li>Bring any previous diagnostic reports or prescription files with you.</li>
            <li>Free follow-up consultation is available within 7 days of this visit.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
