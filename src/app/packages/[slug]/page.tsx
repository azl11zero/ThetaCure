'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  CheckCircle2,
  Calendar,
  Building2,
  Clock,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { HOSPITALS } from '@/lib/data';

export default function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const allPackages = HOSPITALS.flatMap((h) =>
    h.packages.map((p) => ({ ...p, hospitalName: h.name, hospitalSlug: h.slug, phone: h.phone }))
  );
  const pkg = allPackages.find((p) => p.slug === resolvedParams.slug) || allPackages[0];

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/packages" className="hover:text-gray-600">Health Packages</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">{pkg.title}</span>
      </nav>

      {bookingConfirmed && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-between text-xs font-semibold animate-fade-in">
          <span>✓ Booking inquiry confirmed for {pkg.title}. A care manager will contact you within 15 minutes.</span>
          <button onClick={() => setBookingConfirmed(false)} className="underline">Dismiss</button>
        </div>
      )}

      {/* Hero Banner */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-4">
        <span className="text-xs font-bold text-[#D91F2B] uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full">
          Preventive Screening Package
        </span>

        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{pkg.title}</h1>
        <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">{pkg.description}</p>

        <div className="flex items-center gap-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
          <Building2 className="w-4 h-4 text-gray-400" />
          <span>Provided by: <strong>{pkg.hospitalName}</strong></span>
        </div>
      </div>

      {/* Inclusions & Booking Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <h2 className="font-bold text-gray-900 text-lg">Package Clinical Parameters</h2>
          <div className="space-y-3">
            {pkg.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 sticky top-24">
          <h3 className="font-bold text-gray-900 text-sm">Package Pricing</h3>
          <div>
            <div className="text-3xl font-bold text-gray-900">৳{pkg.price.toLocaleString()}</div>
            {pkg.originalPrice && (
              <div className="text-xs text-gray-400 line-through mt-0.5">Regular: ৳{pkg.originalPrice.toLocaleString()}</div>
            )}
          </div>

          <p className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-lg">
            Save up to 20% compared to individual test bookings.
          </p>

          <button
            onClick={() => setBookingConfirmed(true)}
            className="w-full py-3 bg-[#D91F2B] hover:bg-[#C01823] text-white text-xs font-bold rounded-full shadow transition"
          >
            Book This Package Now
          </button>

          <a
            href={`tel:${pkg.phone}`}
            className="block w-full py-2.5 text-center text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 transition"
          >
            Call for Inquiries
          </a>
        </div>
      </div>
    </div>
  );
}
