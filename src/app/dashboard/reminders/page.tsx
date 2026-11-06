'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Pill, Clock, Plus, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

export default function RemindersDashboardPage() {
  const [reminders, setReminders] = useState([
    { id: '1', medicine: 'Metformin 500mg', time: '08:30 AM (After Breakfast)', status: 'Active', prescribedBy: 'Dr. Farzana Ahmed' },
    { id: '2', medicine: 'Atorvastatin 10mg', time: '09:00 PM (Before Bed)', status: 'Active', prescribedBy: 'Prof. Dr. A. Rahman' },
    { id: '3', medicine: 'Follow-up Consultation', time: 'Tomorrow 10:00 AM', status: 'Scheduled', prescribedBy: 'United Hospital' },
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/dashboard" className="hover:text-gray-600 transition">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">Medication Reminders</span>
      </nav>

      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Daily Medication & Follow-up Alerts</h1>
          <p className="text-xs text-gray-500 mt-0.5">Automated SMS and push notifications for your prescribed doses.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reminders.map((rem) => (
          <div key={rem.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center">
                <Pill className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {rem.status}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 text-sm">{rem.medicine}</h4>
              <p className="text-xs text-gray-500 mt-0.5">Prescribed by {rem.prescribedBy}</p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600 pt-2 border-t border-gray-50">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{rem.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
