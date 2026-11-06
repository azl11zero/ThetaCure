'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Building2,
  Stethoscope,
  ChevronRight,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

export default function AdminVerificationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [status, setStatus] = useState<'Under Review' | 'Verified' | 'Rejected'>('Under Review');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/admin" className="hover:text-gray-600 transition">Admin Portal</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">Verification #{resolvedParams.id}</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-card-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-50 text-[#D91F2B] text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>BMDC Verification Docket</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Provider Application: {resolvedParams.id}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">Submitted via ThetaCure Onboarding Portal</p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                status === 'Verified'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : status === 'Rejected'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">Clinical Credentials</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700">
            <div className="p-4 bg-gray-50 rounded-xl space-y-1">
              <span className="text-gray-400 font-medium block">Applicant Name</span>
              <span className="text-sm font-bold text-gray-900">Dr. Mehedi Hasan</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl space-y-1">
              <span className="text-gray-400 font-medium block">BMDC Registration No.</span>
              <span className="text-sm font-bold text-gray-900">BMDC-A-61204 (Active)</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl space-y-1">
              <span className="text-gray-400 font-medium block">Primary Specialty</span>
              <span className="text-sm font-bold text-gray-900">Pediatric Medicine</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl space-y-1">
              <span className="text-gray-400 font-medium block">Hospital Chamber</span>
              <span className="text-sm font-bold text-gray-900">Dhaka Shishu Hospital</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Verifications</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStatus('Rejected')}
              className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-full text-xs font-semibold transition"
            >
              Reject Application
            </button>
            <button
              onClick={() => setStatus('Verified')}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold shadow transition"
            >
              Approve & Issue Verified Badge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
