import React from 'react';
import Link from 'next/link';
import { ChevronRight, Phone, Mail, MessageSquare, LifeBuoy } from 'lucide-react';

export default function HelpCentrePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">Help & Support</span>
      </nav>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">ThetaCure Help Centre</h1>
        <p className="text-sm text-gray-500">Need assistance with a booking or report? Our patient support specialists are available 24/7.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">Phone Hotline</h3>
          <p className="text-xs text-gray-500">+880 9612-345678 (24/7 Toll-Free)</p>
          <a href="tel:+8809612345678" className="inline-block text-xs font-semibold text-[#D91F2B] hover:underline">
            Call Customer Care →
          </a>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">Email Support</h3>
          <p className="text-xs text-gray-500">support@thetacure.com</p>
          <a href="mailto:support@thetacure.com" className="inline-block text-xs font-semibold text-[#D91F2B] hover:underline">
            Send an Email →
          </a>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">AI Chat Assistant</h3>
          <p className="text-xs text-gray-500">Instant answers regarding doctors and clinics</p>
          <Link href="/ai-assistant" className="inline-block text-xs font-semibold text-[#D91F2B] hover:underline">
            Open Chat Assistant →
          </Link>
        </div>
      </div>
    </div>
  );
}
