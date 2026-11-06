'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  FlaskConical,
  Clock,
  AlertCircle,
  CheckCircle2,
  Filter,
  Building2,
  Star,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { DIAGNOSTIC_TESTS } from '@/lib/data';

export default function DiagnosticsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookingTestSuccess, setBookingTestSuccess] = useState<string | null>(null);

  const categories = ['All', 'Blood tests', 'Imaging', 'Radiology', 'Pathology'];

  const filteredTests = useMemo(() => {
    return DIAGNOSTIC_TESTS.filter((t) => {
      const matchSearch =
        search === '' ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === 'All' || t.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [search, selectedCategory]);

  const handleBookTest = (testName: string, providerName: string, price: number) => {
    const bookingId = 'LAB-' + Math.floor(100000 + Math.random() * 900000);
    setBookingTestSuccess(`${testName} booked at ${providerName} (৳${price}). Booking #${bookingId}`);
    setTimeout(() => setBookingTestSuccess(null), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Diagnostics & Test Price Comparison
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl">
          Compare diagnostic test prices across accredited laboratories and hospitals in Dhaka. View preparation requirements and get reports delivered digitally.
        </p>
      </div>

      {bookingTestSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-between animate-fade-in text-sm font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{bookingTestSuccess}</span>
          </div>
          <button onClick={() => setBookingTestSuccess(null)} className="text-xs underline text-emerald-700">Dismiss</button>
        </div>
      )}

      {/* Search Bar & Category Pills */}
      <div className="space-y-4">
        <div className="relative max-w-xl">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search test name (e.g. CBC, HbA1c, Ultrasound, MRI)..."
            className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-[#D91F2B] shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-[#D91F2B] text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat === 'All' ? 'All Diagnostic Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Test List with Cross-Provider Comparison */}
      <div className="space-y-6">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-card-subtle space-y-5"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#D91F2B] uppercase tracking-wide bg-red-50 px-2.5 py-0.5 rounded-full">
                    {test.category}
                  </span>
                  {test.fastingRequired && (
                    <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Fasting Required
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{test.name}</h3>
                <p className="text-xs text-gray-500 max-w-2xl">{test.description}</p>
              </div>

              <div className="flex items-center gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Report in: <strong className="text-gray-800">{test.reportDeliveryTime}</strong></span>
                </div>
              </div>
            </div>

            {/* Preparation Instruction Banner */}
            <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 flex items-start gap-2 border border-gray-100">
              <AlertCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <span><strong>Preparation Advice:</strong> {test.preparation}</span>
            </div>

            {/* Price Comparison Table Across Providers */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Provider Price Comparison & Availability
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {test.providers.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 bg-white shadow-sm flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{p.hospitalName}</h4>
                        <div className="flex items-center gap-1 text-[11px] text-gray-600">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span>{p.rating}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-400">{p.branch}</p>
                      <p className="text-[11px] text-emerald-700 font-medium mt-1">✓ {p.earliestSlot}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div>
                        <span className="text-base font-bold text-gray-900">৳{p.price.toLocaleString()}</span>
                        {p.originalPrice && (
                          <span className="text-xs text-gray-400 line-through ml-1.5">৳{p.originalPrice}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleBookTest(test.name, p.hospitalName, p.price)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#D91F2B] hover:bg-[#C01823] rounded-full transition shadow-sm"
                      >
                        Book Test
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
