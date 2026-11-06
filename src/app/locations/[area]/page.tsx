'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Building2,
  Stethoscope,
  Star,
  ChevronRight,
  ShieldCheck,
  Bed,
  PhoneCall
} from 'lucide-react';
import { HOSPITALS, DOCTORS } from '@/lib/data';

export default function LocationAreaHubPage({ params }: { params: Promise<{ area: string }> }) {
  const resolvedParams = use(params);
  const rawArea = decodeURIComponent(resolvedParams.area);
  const capitalizedArea = rawArea.charAt(0).toUpperCase() + rawArea.slice(1);

  const hospitals = HOSPITALS.filter(
    (h) => h.area.toLowerCase().includes(rawArea.toLowerCase()) || h.address.toLowerCase().includes(rawArea.toLowerCase())
  );

  const doctors = DOCTORS.filter(
    (d) => d.hospital.location.toLowerCase().includes(rawArea.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/hospitals" className="hover:text-gray-600">Locations</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">{capitalizedArea}, Dhaka</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#D91F2B] flex items-center justify-center flex-shrink-0">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-bold text-[#D91F2B] uppercase tracking-wider">Dhaka Healthcare Hub</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            Doctors & Hospitals in {capitalizedArea}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Verified healthcare facilities, specialist chambers, and diagnostic centres operating in the {capitalizedArea} zone.
          </p>
        </div>
      </div>

      {/* Hospitals Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Hospitals in {capitalizedArea} ({hospitals.length})</h2>
          <Link href="/map" className="text-xs font-semibold text-[#D91F2B] hover:underline">
            View on Interactive Map →
          </Link>
        </div>

        {hospitals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hospitals.map((hosp) => (
              <div key={hosp.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D91F2B] bg-red-50 px-2.5 py-0.5 rounded-full">
                      {hosp.category}
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold">{hosp.operatingHours}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mt-2">
                    <Link href={`/hospitals/${hosp.slug}`} className="hover:text-[#D91F2B] transition">
                      {hosp.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{hosp.address}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-600 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-bold">{hosp.rating}</span>
                  </div>
                  <span>•</span>
                  <div>{hosp.beds}</div>
                  <span>•</span>
                  <div>{hosp.phone}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href={`/hospitals/${hosp.slug}`}
                    className="py-2 text-center text-xs font-semibold text-white bg-[#D91F2B] hover:bg-[#C01823] rounded-full transition shadow-sm"
                  >
                    View Hospital Profile
                  </Link>
                  <a
                    href={`tel:${hosp.phone}`}
                    className="py-2 text-center text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 transition"
                  >
                    Call Hospital
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No partner hospitals recorded in this specific area yet.</p>
        )}
      </div>

      {/* Doctors Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Doctors Practicing in {capitalizedArea} ({doctors.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={doc.avatar} alt={doc.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">
                      <Link href={`/doctors/${doc.slug}`}>{doc.name}</Link>
                    </h4>
                    <p className="text-xs text-[#D91F2B] font-medium">{doc.specialty}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 line-clamp-1">{doc.hospital.name}</p>
                <div className="text-xs flex justify-between pt-1 border-t border-gray-100">
                  <span>Fee: <strong>৳{doc.fees.inPerson}</strong></span>
                  <span className="text-emerald-700 font-medium">Slot: {doc.nextAvailableSlot.formatted}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-2">
                <Link
                  href={`/doctors/${doc.slug}`}
                  className="py-1.5 text-center text-xs font-semibold text-gray-700 bg-gray-50 rounded-full border border-gray-200"
                >
                  Profile
                </Link>
                <Link
                  href={`/doctors/${doc.slug}/book`}
                  className="py-1.5 text-center text-xs font-semibold text-white bg-[#D91F2B] rounded-full"
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
