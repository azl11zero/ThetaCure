'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';

export default function ForgotPasswordPage() {
  const [method, setMethod] = useState<'email' | 'phone'>('phone');
  const [destination, setDestination] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-200/90 shadow-card-subtle space-y-6">
        <div>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>

          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Reset Password
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Enter your verified mobile number or email address to receive password reset instructions.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Reset Link / OTP Dispatched</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We sent a 6-digit verification code to <span className="font-semibold text-gray-900">{destination}</span>. Check your SMS or email inbox to proceed.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-block px-5 py-2 bg-[#D91F2B] hover:bg-[#C01823] text-white rounded-full text-xs font-semibold shadow transition"
              >
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMethod('phone')}
                className={`py-1.5 rounded-lg transition ${
                  method === 'phone' ? 'bg-white text-[#D91F2B] shadow-sm' : 'text-gray-600'
                }`}
              >
                SMS Verification
              </button>
              <button
                type="button"
                onClick={() => setMethod('email')}
                className={`py-1.5 rounded-lg transition ${
                  method === 'email' ? 'bg-white text-[#D91F2B] shadow-sm' : 'text-gray-600'
                }`}
              >
                Email Link
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {method === 'phone' ? 'Registered Bangladeshi Mobile Number' : 'Registered Email Address'}
              </label>
              <input
                type={method === 'phone' ? 'tel' : 'email'}
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={method === 'phone' ? '+880 1712-345678' : 'you@example.com'}
                className="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 focus:border-[#D91F2B] rounded-xl text-sm focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#D91F2B] hover:bg-[#C01823] text-white font-medium text-xs rounded-full shadow transition flex items-center justify-center gap-1.5"
            >
              <span>Send Instructions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
