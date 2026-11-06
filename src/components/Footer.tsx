'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Heart, Phone, Mail, MapPin, Shield } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200 mt-20 pt-16 pb-12 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-gray-100">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-gray-500 max-w-sm text-[14px] leading-relaxed">
              ThetaCure connects patients across Bangladesh with trusted doctors, verified hospitals, and standardized diagnostic services.
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Company Slogan</p>
              <p className="text-sm font-medium text-gray-800 italic">
                &ldquo;For the Ones You Love. For the Care They Deserve.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg w-fit border border-emerald-100">
              <Shield className="w-4 h-4" />
              <span>BMDC Registered Physicians & Verified Clinics</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-[15px]">Patients</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/doctors" className="hover:text-[#D91F2B] transition">Find Doctors</Link>
              </li>
              <li>
                <Link href="/hospitals" className="hover:text-[#D91F2B] transition">Hospitals & Clinics</Link>
              </li>
              <li>
                <Link href="/diagnostics" className="hover:text-[#D91F2B] transition">Diagnostic Tests</Link>
              </li>
              <li>
                <Link href="/ai-doctor-finder" className="hover:text-[#D91F2B] transition font-medium text-[#D91F2B]">
                  ✨ AI Doctor Finder
                </Link>
              </li>
              <li>
                <Link href="/health-tips" className="hover:text-[#D91F2B] transition">Health Tips & Articles</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#D91F2B] transition">Patient Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* For Providers */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-[15px]">Providers & Partners</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/provider" className="hover:text-[#D91F2B] transition">Join as a Doctor</Link>
              </li>
              <li>
                <Link href="/provider/register" className="hover:text-[#D91F2B] transition">Register Hospital</Link>
              </li>
              <li>
                <Link href="/provider/dashboard" className="hover:text-[#D91F2B] transition">Provider Portal</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#D91F2B] transition">Platform Administration</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D91F2B] transition">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-[15px]">Support</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D91F2B] mt-0.5 flex-shrink-0" />
                <span>+880 9612-345678 (24/7 Helpline)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D91F2B] mt-0.5 flex-shrink-0" />
                <span>support@thetacure.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D91F2B] mt-0.5 flex-shrink-0" />
                <span>Gulshan-2, Dhaka 1212, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} ThetaCure Bangladesh Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-gray-600 transition">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-gray-600 transition">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-gray-600 transition">Medical Disclaimer</Link>
          </div>
          <p className="flex items-center gap-1 text-gray-400">
            Carefully crafted for <span className="font-medium text-gray-600">Bangladesh Healthcare</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
