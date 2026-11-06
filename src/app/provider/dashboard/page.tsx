'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Users,
  Clock,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Plus,
  DollarSign
} from 'lucide-react';
import { DOCTORS } from '@/lib/data';

export default function ProviderDashboardPage() {
  const doctor = DOCTORS[0]; // Dr. Farzana Ahmed
  const [activeSlots, setActiveSlots] = useState([
    { time: '10:00 AM', status: 'Booked', patient: 'Sadia Rahman' },
    { time: '10:30 AM', status: 'Available', patient: '-' },
    { time: '11:00 AM', status: 'Booked', patient: 'Kazi Mohammad' },
    { time: '11:30 AM', status: 'Available', patient: '-' },
    { time: '12:00 PM', status: 'Available', patient: '-' },
    { time: '04:00 PM', status: 'Available', patient: '-' },
  ]);

  const [articles, setArticles] = useState([
    { title: 'Build a Balanced Diet for Lasting Health', views: '2,840', date: 'Oct 28, 2026' },
    { title: 'Everyday Habits to Stay Infection-Free', views: '1,490', date: 'Oct 25, 2026' },
  ]);

  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [showAddArticle, setShowAddArticle] = useState(false);

  const handlePublishArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleTitle) return;
    setArticles([{ title: newArticleTitle, views: '1', date: 'Just now' }, ...articles]);
    setNewArticleTitle('');
    setShowAddArticle(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-card-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> BMDC Verified
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {doctor.specialty} • {doctor.hospital.name} (Gulshan Chamber)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/doctors/${doctor.slug}`}
            className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition"
          >
            Preview Public Profile
          </Link>
          <button
            onClick={() => setShowAddArticle(!showAddArticle)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#D91F2B] hover:bg-[#C01823] rounded-full transition"
          >
            + Publish Health Tip
          </button>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold">Today Appointments</span>
            <Calendar className="w-4 h-4 text-[#D91F2B]" />
          </div>
          <div className="text-2xl font-bold text-gray-900">8</div>
          <p className="text-[11px] text-emerald-600 mt-1">2 upcoming morning slots</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold">Profile Views (30d)</span>
            <Users className="w-4 h-4 text-[#D91F2B]" />
          </div>
          <div className="text-2xl font-bold text-gray-900">4,190</div>
          <p className="text-[11px] text-emerald-600 mt-1">↑ 14% from last month</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold">Patient Rating</span>
            <ShieldCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">4.9 / 5.0</div>
          <p className="text-[11px] text-gray-400 mt-1">From 1,240 verified reviews</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold">Estimated Payout</span>
            <TrendingUp className="w-4 h-4 text-[#D91F2B]" />
          </div>
          <div className="text-2xl font-bold text-gray-900">৳64,000</div>
          <p className="text-[11px] text-gray-400 mt-1">Direct bank transfer weekly</p>
        </div>
      </div>

      {/* Main Grid: Slots & Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Chamber Schedule Management */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-gray-900 text-base">Tomorrow’s Slot Schedule (31 Oct)</h3>
              <p className="text-xs text-gray-500">United Hospital Chamber</p>
            </div>
            <button
              onClick={() => alert('New slot added')}
              className="text-xs font-semibold text-[#D91F2B] hover:underline"
            >
              + Add Custom Slot
            </button>
          </div>

          <div className="space-y-2">
            {activeSlots.map((slot, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50 text-xs"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="font-bold text-gray-800">{slot.time}</span>
                  <span className="text-gray-500">Patient: {slot.patient}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full font-semibold ${
                    slot.status === 'Booked' ? 'bg-red-50 text-[#D91F2B]' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {slot.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Published Educational Articles */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-gray-900 text-base">Your Published Health Tips</h3>
              <p className="text-xs text-gray-500">Educate patients and grow trust</p>
            </div>
          </div>

          {showAddArticle && (
            <form onSubmit={handlePublishArticle} className="p-3 bg-red-50/50 rounded-xl border border-red-100 space-y-2">
              <label className="block text-xs font-semibold text-gray-700">Article Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Managing Type 2 Diabetes During Ramadan..."
                value={newArticleTitle}
                onChange={(e) => setNewArticleTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#D91F2B] text-white text-xs font-semibold rounded-lg"
              >
                Publish Now
              </button>
            </form>
          )}

          <div className="space-y-3">
            {articles.map((art, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs space-y-1">
                <h4 className="font-bold text-gray-900 line-clamp-1">{art.title}</h4>
                <div className="flex items-center justify-between text-gray-400 pt-1">
                  <span>Published {art.date}</span>
                  <span>{art.views} reads</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
