import React from 'react';
import Link from 'next/link';
import { ChevronRight, HelpCircle } from 'lucide-react';

export default function FaqPage() {
  const faqs = [
    {
      q: 'How does doctor booking work on ThetaCure?',
      a: 'You can discover verified physicians by specialty or hospital, choose an available date and time slot, and confirm your appointment with direct payment (bKash/Nagad/Card) or pay at the hospital chamber.'
    },
    {
      q: 'How are doctors and hospitals verified?',
      a: 'All physicians undergo identity and BMDC registration audits against official registries. Institutions are audited for valid DGHS licensing before receiving verification badges.'
    },
    {
      q: 'Can I book online video consultations?',
      a: 'Yes. Many doctors offer high-definition video consultations via encrypted WebRTC. You will receive an SMS link to join the consultation directly from your browser.'
    },
    {
      q: 'Are diagnostic test prices guaranteed?',
      a: 'Yes. ThetaCure partners directly with accredited diagnostic laboratories to ensure standardized rates without undisclosed surcharges.'
    },
    {
      q: 'What is the appointment cancellation and refund policy?',
      a: 'You can cancel or reschedule appointments up to 2 hours before the scheduled slot directly from your patient dashboard with a 100% refund.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">FAQs</span>
      </nav>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Frequently Asked Questions</h1>
        <p className="text-sm text-gray-500">Everything you need to know about using the ThetaCure healthcare platform.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-2">
            <h3 className="font-bold text-gray-900 text-base">{f.q}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
