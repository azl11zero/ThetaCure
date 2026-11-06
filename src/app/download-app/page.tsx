'use client';

import React from 'react';
import Link from 'next/link';
import { Smartphone, Download, QrCode, CheckCircle2, ChevronRight, Apple, Play } from 'lucide-react';
import Logo from '@/components/Logo';

export default function DownloadAppPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">Download App</span>
      </nav>

      <div className="bg-gradient-to-tr from-gray-900 via-gray-800 to-black rounded-3xl p-8 sm:p-14 text-white overflow-hidden relative shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#D91F2B] animate-pulse" />
              <span>Mobile Experience • iOS & Android</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              ThetaCure in Your Pocket.
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg">
              Book doctor visits, monitor live queue tokens, store diagnostic lab reports securely, and access our AI health navigator anytime, anywhere.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* iOS Button */}
              <a
                href="#ios-beta"
                className="flex items-center gap-3 px-5 py-3 bg-white text-gray-900 rounded-2xl hover:bg-gray-100 transition shadow-lg font-semibold text-xs"
              >
                <Apple className="w-5 h-5 fill-current" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-500 uppercase leading-none">Download on</div>
                  <div className="text-sm font-bold">App Store (Beta)</div>
                </div>
              </a>

              {/* Android Button */}
              <a
                href="#android-beta"
                className="flex items-center gap-3 px-5 py-3 bg-white text-gray-900 rounded-2xl hover:bg-gray-100 transition shadow-lg font-semibold text-xs"
              >
                <div className="w-5 h-5 flex items-center justify-center font-bold text-emerald-600">▶</div>
                <div className="text-left">
                  <div className="text-[10px] text-gray-500 uppercase leading-none">Get it on</div>
                  <div className="text-sm font-bold">Google Play (APK)</div>
                </div>
              </a>
            </div>
          </div>

          {/* QR Code Card for Investor Testing */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center space-y-4">
            <div className="w-40 h-40 bg-white rounded-2xl p-3 mx-auto flex items-center justify-center shadow-md">
              {/* QR Code Illustration */}
              <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center text-gray-700">
                <QrCode className="w-16 h-16 text-gray-900 mb-1" />
                <span className="text-[10px] font-bold text-gray-800">Scan with Phone</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white text-sm">Instant Mobile Web Preview</h3>
              <p className="text-xs text-gray-300 mt-1">
                Scan this QR code with your mobile camera to test the ThetaCure responsive mobile app.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="font-bold text-gray-900 text-sm">Real-time Chamber Tokens</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Never waste hours in hospital waiting rooms. View live queue counts for your doctor and arrive exactly when it&apos;s your turn.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="font-bold text-gray-900 text-sm">Encrypted Health Locker</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Store digital prescriptions, CBC blood tests, and MRI scans in one place. Easily share them with visiting physicians via temporary QR code.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="font-bold text-gray-900 text-sm">Offline First Access</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Essential emergency contacts, hospital hotline numbers, and scheduled appointment slips stay cached offline even without internet connectivity.
          </p>
        </div>
      </div>
    </div>
  );
}
