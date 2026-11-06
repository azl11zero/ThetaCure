import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ShieldAlert, PhoneCall, ChevronRight } from 'lucide-react';

export default function MedicalDisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">Medical Disclaimer</span>
      </nav>

      <div className="border-b border-gray-100 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>Clinical & Safety Advisory</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          ThetaCure Medical Disclaimer
        </h1>
        <p className="text-xs text-gray-500">
          Essential legal and clinical information regarding the use of ThetaCure digital health navigation.
        </p>
      </div>

      <div className="space-y-6 text-xs text-gray-700 leading-relaxed">
        {/* Emergency Alert Box */}
        <div className="bg-red-50/70 border border-red-200 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-[#D91F2B] font-bold text-sm">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <span>Emergency Situations Require Immediate Action</span>
          </div>
          <p className="text-gray-700">
            ThetaCure is <strong>NOT</strong> an emergency dispatch service. If you or someone you know is experiencing chest pain, difficulty breathing, acute trauma, sudden severe bleeding, poisoning, or stroke symptoms, do <strong>NOT</strong> wait for an online reply:
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="tel:999"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#D91F2B] text-white rounded-full font-bold text-xs shadow-sm hover:bg-[#C01823] transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call National Emergency 999</span>
            </a>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-full font-semibold text-xs hover:bg-gray-50 transition"
            >
              <span>Find Nearest Hospital on Map</span>
            </Link>
          </div>
        </div>

        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-3">
          <h2 className="text-sm font-bold text-gray-900">1. Not a Substitute for Professional Medical Advice</h2>
          <p className="text-gray-600">
            The content on ThetaCure, including health articles, AI-generated navigation suggestions, doctor profiles, and diagnostic descriptions, is provided for informational and logistical purposes only. It is not intended to be a substitute for direct clinical examination, professional medical diagnosis, or personalized treatment.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-3">
          <h2 className="text-sm font-bold text-gray-900">2. AI Health Navigator & Symptom Checker Scope</h2>
          <p className="text-gray-600">
            ThetaCure&apos;s AI Assistant helps you find appropriate medical specialties and accredited facilities. It does not issue official medical prescriptions or confirm final diagnostic conclusions. Any treatment decisions should be reached in direct consultation with a BMDC-registered medical doctor.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-gray-200 shadow-2xs space-y-3">
          <h2 className="text-sm font-bold text-gray-900">3. Doctor & Facility Accreditation</h2>
          <p className="text-gray-600">
            While ThetaCure verifies BMDC registration numbers and institutional accreditations at the time of provider onboarding, the independent medical judgment and clinical care delivered by the doctor remain the sole professional responsibility of that practitioner.
          </p>
        </section>
      </div>
    </div>
  );
}
