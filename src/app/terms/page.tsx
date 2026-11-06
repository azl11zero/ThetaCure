import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 text-sm text-gray-700 leading-relaxed">
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">Terms of Service</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions of Use</h1>
      <p className="text-xs text-gray-400">Last updated: October 2026 • ThetaCure Bangladesh Ltd.</p>

      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h2 className="text-base font-bold text-gray-900">1. Platform Scope</h2>
        <p>ThetaCure operates as an informational healthcare discovery and appointment scheduling intermediary connecting patients with healthcare providers in Bangladesh. ThetaCure is not a licensed medical practice and does not directly provide medical diagnoses.</p>

        <h2 className="text-base font-bold text-gray-900">2. Provider Verification and Credentials</h2>
        <p>Physicians listed on ThetaCure undergo administrative identity and BMDC registration audits. Verification badges signify verification of valid medical registration at the time of review.</p>

        <h2 className="text-base font-bold text-gray-900">3. Appointments and Cancellations</h2>
        <p>Patients may reschedule or cancel appointments up to 2 hours prior to the scheduled slot with full fee reimbursement. No-shows are subject to provider policy.</p>

        <h2 className="text-base font-bold text-gray-900">4. Applicable Laws</h2>
        <p>These terms are governed by the laws and regulations of the People’s Republic of Bangladesh.</p>
      </div>
    </div>
  );
}
