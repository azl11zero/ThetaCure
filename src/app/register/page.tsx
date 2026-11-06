'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-card-subtle space-y-6">
        <div className="text-center space-y-2">
          <Logo size="md" className="justify-center" />
          <h2 className="text-2xl font-bold text-gray-900 mt-2">Create Your Account</h2>
          <p className="text-xs text-gray-500">Sign up to manage appointments and family health records</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Sadia Rahman"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-[#D91F2B] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Mobile Number (+880)</label>
            <input
              type="tel"
              required
              placeholder="01712-345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-[#D91F2B] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#D91F2B] hover:bg-[#C01823] text-white font-medium text-sm rounded-full shadow transition"
          >
            Sign Up with OTP
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Already have an account?{' '}
          <Link href="/dashboard" className="font-semibold text-[#D91F2B] hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
