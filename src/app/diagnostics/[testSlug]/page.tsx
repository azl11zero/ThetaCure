'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  FlaskConical,
  Clock,
  AlertCircle,
  Star,
  CheckCircle2,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { DIAGNOSTIC_TESTS } from '@/lib/data';

export default function DiagnosticTestDetailPage({ params }: { params: Promise<{ testSlug: string }> }) {
  const resolvedParams = use(params);
  const test = DIAGNOSTIC_TESTS.find((t) => t.slug === resolvedParams.testSlug) || DIAGNOSTIC_TESTS[0];
  const [bookedProvider, setBookedProvider] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/diagnostics" className="hover:text-gray-600">Diagnostics</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">{test.name}</span>
      </nav>

      {bookedProvider && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-between text-xs font-semibold animate-fade-in">
          <span>✓ {test.name} appointment confirmed at {bookedProvider}. Confirmation SMS sent.</span>
          <button onClick={() => setBookedProvider(null)} className="underline">Dismiss</button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#D91F2B] bg-red-50 px-3 py-1 rounded-full uppercase">
            {test.category}
          </span>
          {test.fastingRequired && (
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Fasting Required
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{test.name}</h1>
        <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">{test.description}</p>

        <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 pt-3 border-t border-gray-100">
          <div>Sample Type: <strong className="text-gray-800">{test.sampleType || 'Clinical Sample'}</strong></div>
          <span>•</span>
          <div>Report Turnaround: <strong className="text-gray-800">{test.reportDeliveryTime}</strong></div>
        </div>
      </div>

      {/* Preparation Advice */}
      <div className="bg-rose-50/40 rounded-2xl p-6 border border-red-100 flex items-start gap-3 text-xs text-gray-700">
        <AlertCircle className="w-5 h-5 text-[#D91F2B] flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-gray-900 text-sm mb-1">Patient Preparation Guidance</h4>
          <p className="leading-relaxed">{test.preparation}</p>
        </div>
      </div>

      {/* Cross-Provider Comparison Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Compare Laboratory Rates Across Dhaka</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {test.providers.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-base">{p.hospitalName}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-semibold">{p.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">{p.branch}</p>
                <p className="text-xs text-emerald-700 font-semibold mt-2">✓ {p.earliestSlot}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-gray-900">৳{p.price.toLocaleString()}</span>
                  {p.originalPrice && (
                    <span className="text-xs text-gray-400 line-through ml-2">৳{p.originalPrice}</span>
                  )}
                </div>

                <button
                  onClick={() => setBookedProvider(p.hospitalName)}
                  className="px-5 py-2 bg-[#D91F2B] hover:bg-[#C01823] text-white text-xs font-semibold rounded-full shadow-sm transition"
                >
                  Book Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
