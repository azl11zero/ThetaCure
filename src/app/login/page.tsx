'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  User,
  Stethoscope,
  Building2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'patient' | 'doctor' | 'provider'>('patient');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Authentication successful! Redirecting to your portal...');

      setTimeout(() => {
        if (role === 'patient') {
          router.push('/dashboard');
        } else if (role === 'doctor') {
          router.push('/provider/dashboard');
        } else {
          router.push('/admin');
        }
      }, 900);
    }, 600);
  };

  const fillDemoAccount = (selectedRole: 'patient' | 'doctor' | 'provider') => {
    setRole(selectedRole);
    if (selectedRole === 'patient') {
      setIdentifier('+880 1712-345678');
      setPassword('demoPatient2026!');
    } else if (selectedRole === 'doctor') {
      setIdentifier('BMDC-A-48291');
      setPassword('demoDoctor2026!');
    } else {
      setIdentifier('admin@unitedhospital.com.bd');
      setPassword('demoHospital2026!');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/90 shadow-card-subtle">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Sign in to ThetaCure
          </h2>
          <p className="text-xs text-gray-500">
            For the Ones You Love. For the Care They Deserve.
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-2xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setRole('patient');
              setIdentifier('');
            }}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              role === 'patient'
                ? 'bg-white text-[#D91F2B] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Patient</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('doctor');
              setIdentifier('');
            }}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              role === 'doctor'
                ? 'bg-white text-[#D91F2B] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Doctor</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('provider');
              setIdentifier('');
            }}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              role === 'provider'
                ? 'bg-white text-[#D91F2B] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Hospital</span>
          </button>
        </div>

        {/* Demo Fast-Fill Pill for Investors */}
        <div className="bg-rose-50/70 border border-red-100 rounded-2xl p-3 text-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-700">
            <Sparkles className="w-3.5 h-3.5 text-[#D91F2B]" />
            <span className="font-medium">Investor Demo:</span>
          </div>
          <button
            type="button"
            onClick={() => fillDemoAccount(role)}
            className="text-[11px] font-bold text-[#D91F2B] hover:underline bg-white px-2.5 py-1 rounded-lg border border-red-200 shadow-2xs"
          >
            Auto-Fill {role === 'patient' ? 'Patient' : role === 'doctor' ? 'Dr. Maruf' : 'Hospital'}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              {role === 'patient'
                ? 'Mobile Number or Email'
                : role === 'doctor'
                ? 'BMDC Registration No. or Email'
                : 'Hospital Admin Email'}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={
                  role === 'patient'
                    ? '+880 1712-345678'
                    : role === 'doctor'
                    ? 'BMDC-A-48291'
                    : 'admin@hospital.com'
                }
                className="w-full pl-3.5 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100/60 focus:bg-white border border-gray-200 focus:border-[#D91F2B] rounded-xl text-sm focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-gray-700">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[11px] text-[#D91F2B] hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-3.5 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100/60 focus:bg-white border border-gray-200 focus:border-[#D91F2B] rounded-xl text-sm focus:outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#D91F2B] hover:bg-[#C01823] active:scale-98 text-white font-medium text-sm rounded-full shadow-[0_2px_10px_rgba(217,31,43,0.3)] transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to {role === 'patient' ? 'Dashboard' : role === 'doctor' ? 'Doctor Portal' : 'Admin'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {successMsg && (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Footer info */}
        <div className="pt-2 text-center text-xs text-gray-500 space-y-3">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#D91F2B] font-semibold hover:underline">
              Register now
            </Link>
          </p>
          <div className="text-[11px] text-gray-400">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-gray-600">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
