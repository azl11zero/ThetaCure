'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Contact ThetaCure Care Team</h1>
        <p className="text-sm text-gray-500">We are here to assist with bookings, provider inquiries, and emergency guidance 24/7.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-card-subtle space-y-6">
          <h3 className="font-bold text-gray-900 text-lg">Helpline & Headquarters</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#D91F2B] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-gray-900">+880 9612-345678</p>
                <p className="text-xs text-gray-500">24/7 Patient Helpline across Bangladesh</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#D91F2B] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-gray-900">support@thetacure.com</p>
                <p className="text-xs text-gray-500">Response within 2 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#D91F2B] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-gray-900">Gulshan-2 Corporate Office</p>
                <p className="text-xs text-gray-500">Plot 15, Road 71, Gulshan, Dhaka 1212</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-card-subtle">
          {!submitted ? (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <h3 className="font-bold text-gray-900 text-lg">Send a Message</h3>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Your Name</label>
                <input required type="text" className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl" placeholder="Full name" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Mobile or Email</label>
                <input required type="text" className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl" placeholder="017XXXXXXXX or email" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                <textarea required rows={3} className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl" placeholder="How can we help?" />
              </div>
              <button type="submit" className="w-full py-2.5 bg-[#D91F2B] text-white text-xs font-semibold rounded-full hover:bg-[#C01823] transition">
                Send Inquiry
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-gray-900">Message Received</h4>
              <p className="text-xs text-gray-500">Our support specialist will reach out shortly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
