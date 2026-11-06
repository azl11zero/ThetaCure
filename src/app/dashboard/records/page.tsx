'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, Upload, ShieldCheck, ChevronRight, Plus } from 'lucide-react';
import { HEALTH_RECORDS } from '@/lib/data';
import { HealthRecord } from '@/lib/types';

export default function RecordsDashboardPage() {
  const [records, setRecords] = useState<HealthRecord[]>(HEALTH_RECORDS);
  const [filterType, setFilterType] = useState<string>('All');

  const filtered = filterType === 'All' ? records : records.filter(r => r.type === filterType);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/dashboard" className="hover:text-gray-600 transition">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">Health Records Locker</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted Health Vault</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Prescriptions & Diagnostic Reports</h1>
          <p className="text-xs text-gray-500 mt-0.5">Access lab results, MRI summaries, and verified doctor prescriptions.</p>
        </div>

        <button
          onClick={() => alert('Secure file upload selector opened. Choose PDF or JPG reports from your device.')}
          className="px-4 py-2 bg-[#D91F2B] hover:bg-[#C01823] text-white rounded-full text-xs font-semibold shadow flex items-center gap-1.5 transition whitespace-nowrap"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Report</span>
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Diagnostic Report', 'Prescription', 'Discharge Summary'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              filterType === tab
                ? 'bg-red-50 text-[#D91F2B] border border-[#D91F2B]'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-card-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-300 transition"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{record.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {record.doctorOrHospital}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-1">
                  <span>{record.date}</span>
                  <span>•</span>
                  <span className="font-mono">{record.fileSize}</span>
                  <span>•</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded font-medium">Verified Facility</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <a
                href="/images/thetacure_logo_horizontal_clean.png"
                download={`${record.title.toLowerCase().replace(/\s+/g, '_')}.pdf`}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-full text-xs font-medium flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Report</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
