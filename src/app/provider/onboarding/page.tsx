'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Building2,
  Stethoscope,
  CheckCircle2,
  Upload,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export default function ProviderOnboardingWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/provider" className="hover:text-gray-600 transition">Providers</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">Onboarding Wizard</span>
      </nav>

      {/* Progress Steps Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-card-subtle">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[
            { num: 1, label: 'Profile Setup' },
            { num: 2, label: 'BMDC / DGHS Verification' },
            { num: 3, label: 'Chamber Slots & Fees' },
            { num: 4, label: 'Go Live' },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-1.5 text-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  step === s.num
                    ? 'bg-[#D91F2B] text-white shadow-md'
                    : step > s.num
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </div>
              <span className="text-[11px] font-medium text-gray-700 hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Container */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200/90 shadow-card-subtle space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Step 1: Practitioner Credentials</h2>
            <p className="text-xs text-gray-500">Enter your clinical degrees, primary specialty, and clinical bio.</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  defaultValue="Dr. Maruf Allam Saran"
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Degrees & Fellowships</label>
                <input
                  type="text"
                  defaultValue="MBBS, MD, DM (Cardiology), PhD, DSc, FCPS, FRCP, FACC, FESC"
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Step 2: Upload BMDC Registration Document</h2>
            <p className="text-xs text-gray-500">Provide official proof of current BMDC registration in Bangladesh.</p>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center space-y-3">
              <Upload className="w-10 h-10 text-gray-400 mx-auto" />
              <p className="text-xs text-gray-600 font-medium">Click or drag certificate PDF / image here</p>
              <p className="text-[10px] text-gray-400">Supported formats: PDF, JPG, PNG (Max 10 MB)</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Step 3: Consultation Chambers & Pricing</h2>
            <p className="text-xs text-gray-500">Set weekly consultation timings and patient visit charges.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">In-Person Consultation Fee (৳)</label>
                <input
                  type="number"
                  defaultValue={1000}
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Online Video Consultation Fee (৳)</label>
                <input
                  type="number"
                  defaultValue={800}
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">You Are Ready to Publish!</h2>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              Your profile is verified and synchronized with the ThetaCure search directory. Patients can now discover your chamber and book appointments.
            </p>
          </div>
        )}

        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="px-5 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-30"
          >
            Previous
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 bg-[#D91F2B] hover:bg-[#C01823] text-white text-xs font-semibold rounded-full shadow transition flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <Link
              href="/provider/dashboard"
              className="px-6 py-2.5 bg-[#D91F2B] hover:bg-[#C01823] text-white text-xs font-semibold rounded-full shadow transition"
            >
              Enter Provider Dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
