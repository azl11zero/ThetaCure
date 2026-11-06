'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Building2,
  Stethoscope,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  ChevronRight,
  Clock
} from 'lucide-react';

export default function ProviderRegisterPage() {
  const router = useRouter();
  const [providerType, setProviderType] = useState<'doctor' | 'hospital'>('hospital');
  const [formData, setFormData] = useState({
    institutionName: '',
    licenseNumber: '',
    directorName: '',
    phone: '',
    email: '',
    address: '',
    bedCount: '250',
    emergency247: true,
    icuAvailable: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/provider" className="hover:text-gray-600 transition">Providers</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">Institution & Doctor Registration</span>
      </nav>

      <div className="border-b border-gray-100 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D91F2B] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Accreditation & Provider Onboarding</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Register Your Healthcare Facility
        </h1>
        <p className="text-xs text-gray-500">
          Partner with ThetaCure to connect your hospital, diagnostic lab, or medical center with patients across Bangladesh.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl p-8 border border-gray-200/90 shadow-card-subtle text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Application Submitted for BMDC / DGHS Review</h2>
          <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            Thank you for registering <span className="font-semibold text-gray-900">{formData.institutionName || 'your facility'}</span>. Our clinical onboarding verification team will review your DGHS license credentials within 24 business hours.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              href="/provider/dashboard"
              className="px-6 py-2.5 bg-[#D91F2B] hover:bg-[#C01823] text-white font-medium text-xs rounded-full shadow transition"
            >
              Preview Provider Portal
            </Link>
            <Link
              href="/"
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs rounded-full transition"
            >
              Return Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 border border-gray-200/90 shadow-card-subtle space-y-6">
          <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1.5 rounded-2xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setProviderType('hospital')}
              className={`py-2 rounded-xl transition flex items-center justify-center gap-2 ${
                providerType === 'hospital'
                  ? 'bg-white text-[#D91F2B] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Hospital / Diagnostic Center</span>
            </button>

            <button
              type="button"
              onClick={() => setProviderType('doctor')}
              className={`py-2 rounded-xl transition flex items-center justify-center gap-2 ${
                providerType === 'doctor'
                  ? 'bg-white text-[#D91F2B] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Independent Doctor / Consultant</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {providerType === 'hospital' ? 'Hospital / Clinic Legal Name' : 'Doctor Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.institutionName}
                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  placeholder={providerType === 'hospital' ? 'e.g. United Hospital Dhaka' : 'e.g. Dr. Maruf Allam Saran'}
                  className="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#D91F2B] rounded-xl text-sm focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {providerType === 'hospital' ? 'DGHS Registration / License Number' : 'BMDC Registration Number'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  placeholder={providerType === 'hospital' ? 'DGHS-HOSP-2024-9182' : 'BMDC-A-48291'}
                  className="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#D91F2B] rounded-xl text-sm focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Official Contact Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+880 1712-345678"
                  className="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#D91F2B] rounded-xl text-sm focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Official Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@hospital.com.bd"
                  className="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#D91F2B] rounded-xl text-sm focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Physical Address
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Plot 15, Road 71, Gulshan-2, Dhaka 1212"
                className="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#D91F2B] rounded-xl text-sm focus:outline-none transition"
              />
            </div>

            {providerType === 'hospital' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Total Bed Capacity
                  </label>
                  <input
                    type="number"
                    value={formData.bedCount}
                    onChange={(e) => setFormData({ ...formData, bedCount: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#D91F2B] rounded-xl text-sm focus:outline-none transition"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="emergency"
                    checked={formData.emergency247}
                    onChange={(e) => setFormData({ ...formData, emergency247: e.target.checked })}
                    className="w-4 h-4 text-[#D91F2B] rounded focus:ring-[#D91F2B]"
                  />
                  <label htmlFor="emergency" className="text-xs font-medium text-gray-700">
                    24/7 Emergency & Casualty
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="icu"
                    checked={formData.icuAvailable}
                    onChange={(e) => setFormData({ ...formData, icuAvailable: e.target.checked })}
                    className="w-4 h-4 text-[#D91F2B] rounded focus:ring-[#D91F2B]"
                  />
                  <label htmlFor="icu" className="text-xs font-medium text-gray-700">
                    ICU & CCU Facilities
                  </label>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Encrypted submission • Official verification required
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#D91F2B] hover:bg-[#C01823] text-white font-medium text-xs rounded-full shadow transition flex items-center gap-1.5"
              >
                <span>Submit Verification Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
