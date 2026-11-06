'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Building2,
  Calendar,
  CheckCircle2,
  XCircle,
  FileText,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';

export default function AdminPortalPage() {
  const [verifications, setVerifications] = useState([
    {
      id: 'VER-901',
      providerName: 'Dr. Mehedi Hasan',
      type: 'Doctor (Pediatrics)',
      bmdcNumber: 'A-61204',
      degrees: 'MBBS, DCH (Pediatrics)',
      hospital: 'Dhaka Shishu Hospital',
      status: 'Under Review',
      submittedDate: '28 Oct 2026',
    },
    {
      id: 'VER-902',
      providerName: 'Popular Diagnostic Centre, Dhanmondi',
      type: 'Diagnostic Centre',
      bmdcNumber: 'DGHS-LIC-4410',
      degrees: 'ISO 15189 Accredited Lab',
      hospital: 'Branch: Road 2, Dhanmondi',
      status: 'Under Review',
      submittedDate: '29 Oct 2026',
    },
    {
      id: 'VER-903',
      providerName: 'Dr. Nusrat Jahan',
      type: 'Doctor (Obs & Gynae)',
      bmdcNumber: 'A-51920',
      degrees: 'MBBS, FCPS',
      hospital: 'Square Hospital',
      status: 'Verified',
      submittedDate: '20 Oct 2026',
    }
  ]);

  const handleApprove = (id: string) => {
    setVerifications(
      verifications.map((v) => (v.id === id ? { ...v, status: 'Verified' } : v))
    );
  };

  const handleReject = (id: string) => {
    setVerifications(
      verifications.map((v) => (v.id === id ? { ...v, status: 'Rejected' } : v))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gray-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
            Administration Console
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold">ThetaCure Healthcare Platform Admin</h1>
          <p className="text-xs text-gray-400">
            Real-time compliance audit, BMDC doctor verification, and booking management across Bangladesh.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-xs font-bold">
            System Online • PostgreSQL Healthy
          </span>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle">
          <span className="text-xs font-semibold text-gray-400 block mb-1">Registered Patients</span>
          <div className="text-2xl font-bold text-gray-900">42,850</div>
          <span className="text-[11px] text-emerald-600 font-medium">↑ 8.2% this week</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle">
          <span className="text-xs font-semibold text-gray-400 block mb-1">Verified Doctors</span>
          <div className="text-2xl font-bold text-gray-900">1,240</div>
          <span className="text-[11px] text-gray-400">BMDC registry checked</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle">
          <span className="text-xs font-semibold text-gray-400 block mb-1">Verified Hospitals</span>
          <div className="text-2xl font-bold text-gray-900">48</div>
          <span className="text-[11px] text-gray-400">Accredited clinics & labs</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle">
          <span className="text-xs font-semibold text-gray-400 block mb-1">Total Bookings</span>
          <div className="text-2xl font-bold text-gray-900">18,320</div>
          <span className="text-[11px] text-[#D91F2B] font-semibold">98.4% fulfillment rate</span>
        </div>
      </div>

      {/* Provider Verification Queue */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-card-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Provider Verification Audit Queue</h3>
            <p className="text-xs text-gray-500">
              Only providers independently verified against BMDC/DGHS databases receive the ThetaCure verified badge.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-semibold uppercase">
                <th className="py-3 px-2">Audit ID</th>
                <th className="py-3 px-2">Provider Name</th>
                <th className="py-3 px-2">Type / Specialty</th>
                <th className="py-3 px-2">BMDC / License</th>
                <th className="py-3 px-2">Hospital Affiliation</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {verifications.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50/60 transition">
                  <td className="py-3 px-2 font-mono text-gray-500">{v.id}</td>
                  <td className="py-3 px-2 font-bold text-gray-900">{v.providerName}</td>
                  <td className="py-3 px-2 text-gray-600">{v.type}</td>
                  <td className="py-3 px-2 font-mono text-[#D91F2B] font-semibold">{v.bmdcNumber}</td>
                  <td className="py-3 px-2 text-gray-600">{v.hospital}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-0.5 rounded-full font-bold ${
                      v.status === 'Verified'
                        ? 'bg-emerald-50 text-emerald-700'
                        : v.status === 'Rejected'
                        ? 'bg-rose-50 text-rose-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    {v.status === 'Under Review' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleApprove(v.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(v.id)}
                          className="px-2.5 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 font-medium">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
