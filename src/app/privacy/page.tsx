import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, Database, FileText, ChevronRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">Privacy Policy</span>
      </nav>

      <div className="border-b border-gray-100 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D91F2B] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Patient Data Protection</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          ThetaCure Privacy Policy
        </h1>
        <p className="text-xs text-gray-500">
          Last revised: November 2026 • Compliant with Bangladesh ICT Act & Digital Healthcare Standards
        </p>
      </div>

      <div className="prose prose-sm max-w-none text-gray-700 space-y-6 leading-relaxed">
        <section className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-2xs space-y-3">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#D91F2B]" />
            1. Our Commitment to Your Health Privacy
          </h2>
          <p className="text-xs text-gray-600">
            ThetaCure operates under a strict principle of patient confidentiality. Your health records, diagnostic bookings, and doctor consultations belong exclusively to you. We do not sell, rent, or trade your personally identifiable health information to any third-party advertisers.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-2xs space-y-3">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-[#D91F2B]" />
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-5 text-xs text-gray-600 space-y-2">
            <li><strong>Account Details:</strong> Name, phone number (+880), email address, date of birth, and gender.</li>
            <li><strong>Medical Profile:</strong> Blood group, chronic conditions, medication history, and past lab reports uploaded to your secure locker.</li>
            <li><strong>Appointment & Diagnostic History:</strong> Booked specialists, selected hospital chambers, lab test requisitions, and token timestamps.</li>
            <li><strong>Technical Telemetry:</strong> Device identifiers, browser type, and approximate geo-location (solely when searching for nearby hospitals on `/map`).</li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-2xs space-y-3">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#D91F2B]" />
            3. How We Use and Share Information
          </h2>
          <p className="text-xs text-gray-600">
            Information is only shared with verified medical personnel (registered with the Bangladesh Medical and Dental Council - BMDC) and accredited diagnostic partners when you explicitly authorize an appointment or order a diagnostic sample collection.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-2xs space-y-3">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#D91F2B]" />
            4. Data Retention & Your Rights
          </h2>
          <p className="text-xs text-gray-600">
            You maintain full ownership of your records. You may export your complete medical timeline or permanently delete your account and associated diagnostic reports at any time directly through your <Link href="/dashboard" className="text-[#D91F2B] font-semibold hover:underline">Patient Dashboard</Link> or by contacting privacy@thetacure.com.
          </p>
        </section>
      </div>
    </div>
  );
}
