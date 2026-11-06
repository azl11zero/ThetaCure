'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Stethoscope,
  Building2,
  Calendar,
  Users,
  TrendingUp,
  FileCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function ProviderPortalLandingPage() {
  const [providerType, setProviderType] = useState<'doctor' | 'hospital'>('doctor');
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    bmdcOrLicense: '',
    phone: '',
    email: '',
    hospitalAffiliation: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#D91F2B] uppercase tracking-wider bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
          ThetaCure Provider Network
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          Join Bangladesh’s Premier Healthcare Network
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Connect with thousands of patients seeking specialized care. Manage chamber schedules, expand telemedicine consultations, and streamline diagnostic bookings.
        </p>

        <div className="pt-2 flex justify-center gap-4">
          <Link
            href="#register"
            className="px-6 py-3 bg-[#D91F2B] hover:bg-[#C01823] text-white font-medium text-sm rounded-full shadow transition"
          >
            Apply for Verification
          </Link>
          <Link
            href="/provider/dashboard"
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-sm rounded-full transition"
          >
            Open Provider Demo Portal
          </Link>
        </div>
      </div>

      {/* 3 Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-card-subtle space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#D91F2B] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Wider Patient Discovery</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Our AI-powered symptom matching guides patients directly to your relevant specialty without administrative clutter.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-card-subtle space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#D91F2B] flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Zero Double-Booking</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Real-time slot management for chamber visits and HD video consultations with instant SMS alerts to patients.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-card-subtle space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#D91F2B] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">BMDC Authenticity Badge</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Stand out with a verified practitioner badge, establishing patient trust with verified medical degrees and hospital affiliations.
          </p>
        </div>
      </div>

      {/* Registration & Application Form */}
      <div id="register" className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-gray-200 shadow-card-subtle space-y-6">
        <div className="border-b border-gray-100 pb-4">
          <h3 className="text-xl font-bold text-gray-900">Provider Registration Application</h3>
          <p className="text-xs text-gray-500 mt-1">
            Applications are manually audited against BMDC and DGHS healthcare registry records before verification is granted.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3 mb-4">
              <button
                type="button"
                onClick={() => setProviderType('doctor')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition ${
                  providerType === 'doctor'
                    ? 'border-[#D91F2B] bg-red-50 text-[#D91F2B]'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                Doctor / Specialist
              </button>
              <button
                type="button"
                onClick={() => setProviderType('hospital')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition ${
                  providerType === 'hospital'
                    ? 'border-[#D91F2B] bg-red-50 text-[#D91F2B]'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                Hospital / Diagnostic Centre
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {providerType === 'doctor' ? 'Doctor Full Name' : 'Hospital / Diagnostic Name'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={providerType === 'doctor' ? 'e.g. Dr. Kazi Shafiul Alam' : 'e.g. United Hospital'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D91F2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {providerType === 'doctor' ? 'BMDC Registration No.' : 'DGHS Health License No.'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. A-49210"
                  value={formData.bmdcOrLicense}
                  onChange={(e) => setFormData({ ...formData, bmdcOrLicense: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D91F2B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Official Mobile (+880) *</label>
                <input
                  type="tel"
                  required
                  placeholder="01712-XXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D91F2B]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Official Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="doctor@hospital.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D91F2B]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#D91F2B] hover:bg-[#C01823] text-white font-medium text-xs rounded-full shadow transition"
              >
                Submit Application for Audit
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-gray-900 text-lg">Application Submitted Successfully</h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Thank you, {formData.name}. Our provider verification team will verify your credentials with the BMDC/DGHS registry within 24–48 hours.
            </p>
            <Link
              href="/provider/dashboard"
              className="inline-block mt-2 px-5 py-2 text-xs font-semibold text-white bg-[#D91F2B] rounded-full"
            >
              Explore Provider Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
