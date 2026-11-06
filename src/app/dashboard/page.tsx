'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  FileText,
  Users,
  Bell,
  Bookmark,
  Plus,
  Clock,
  Video,
  Building2,
  Trash2,
  Download,
  CheckCircle2,
  AlertCircle,
  Pill,
  ExternalLink
} from 'lucide-react';
import { INITIAL_APPOINTMENTS, FAMILY_MEMBERS, HEALTH_RECORDS, DOCTORS, HOSPITALS } from '@/lib/data';
import { Appointment, FamilyMember, HealthRecord } from '@/lib/types';

export default function PatientDashboardPage() {
  const [activeTab, setActiveTab] = useState<'appointments' | 'records' | 'family' | 'reminders' | 'saved'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(FAMILY_MEMBERS);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(HEALTH_RECORDS);
  const [newFamilyName, setNewFamilyName] = useState('');
  const [newFamilyRel, setNewFamilyRel] = useState('Child');
  const [showAddFamily, setShowAddFamily] = useState(false);

  useEffect(() => {
    // Sync with localStorage bookings created during this session
    const local = localStorage.getItem('thetacure_appointments');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAppointments([...parsed, ...INITIAL_APPOINTMENTS]);
        }
      } catch (e) {}
    }
  }, []);

  const handleCancelAppointment = (id: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      const updated = appointments.map((a) => (a.id === id ? { ...a, status: 'Cancelled' as const } : a));
      setAppointments(updated);
      localStorage.setItem('thetacure_appointments', JSON.stringify(updated));
    }
  };

  const handleAddFamilyMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFamilyName) return;
    const newMember: FamilyMember = {
      id: 'fam-' + Date.now(),
      name: newFamilyName,
      relationship: newFamilyRel,
      age: 28,
      gender: 'Unspecified',
      bloodGroup: 'B+',
    };
    setFamilyMembers([...familyMembers, newMember]);
    setNewFamilyName('');
    setShowAddFamily(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Patient Welcome Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-card-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#D91F2B] to-rose-500 text-white font-bold text-xl flex items-center justify-center shadow-md">
            SR
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, Sadia Rahman</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              ThetaCure Care ID: <span className="font-mono text-gray-700 font-semibold">TC-889104</span> • Dhaka, Bangladesh
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/doctors"
            className="px-5 py-2.5 bg-[#D91F2B] hover:bg-[#C01823] text-white text-xs font-semibold rounded-full shadow-sm transition"
          >
            + Book New Doctor
          </Link>
          <Link
            href="/diagnostics"
            className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-full border border-gray-200 transition"
          >
            Order Diagnostic Test
          </Link>
        </div>
      </div>

      {/* Dashboard Nav Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex items-center space-x-6 overflow-x-auto">
          {[
            { id: 'appointments', label: `Appointments (${appointments.length})` },
            { id: 'records', label: `Health Records (${healthRecords.length})` },
            { id: 'family', label: `Family Profiles (${familyMembers.length})` },
            { id: 'reminders', label: 'Health Reminders' },
            { id: 'saved', label: 'Saved Providers' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative py-3.5 text-sm font-medium transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#D91F2B] font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D91F2B] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab: Appointments */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-lg">My Appointments</h3>
            <span className="text-xs text-gray-400">Real-time status updates</span>
          </div>

          <div className="space-y-4">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                    <Image src={apt.doctorAvatar} alt={apt.doctorName} fill className="object-cover" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        apt.status === 'Confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {apt.status}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">#{apt.id}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-base">{apt.doctorName}</h4>
                    <p className="text-xs text-gray-500">{apt.doctorSpecialty} • {apt.hospitalName}</p>
                    <p className="text-xs text-gray-700 font-medium">Patient: {apt.patientName}</p>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-1.5 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
                    <Calendar className="w-4 h-4 text-[#D91F2B]" />
                    <span>{apt.date} at {apt.timeSlot}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Type: <strong className="text-gray-800 capitalize">{apt.consultationType}</strong> • Fee: ৳{apt.fee}
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    {apt.status === 'Confirmed' && (
                      <button
                        onClick={() => handleCancelAppointment(apt.id)}
                        className="px-3 py-1.5 text-xs text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition border border-gray-200"
                      >
                        Cancel Slot
                      </button>
                    )}
                    <button
                      onClick={() => alert(`Appointment #${apt.id} receipt downloaded.`)}
                      className="px-3.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Receipt
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Health Records */}
      {activeTab === 'records' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Digital Health Records & Prescriptions</h3>
              <p className="text-xs text-gray-500">Securely stored and organized by date</p>
            </div>
            <button
              onClick={() => alert('Secure file upload dialog opened. Select PDF or Image to upload prescription or diagnostic report.')}
              className="px-4 py-2 bg-[#D91F2B] text-white text-xs font-semibold rounded-full hover:bg-[#C01823] transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Upload Document
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {healthRecords.map((rec) => (
              <div key={rec.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#D91F2B] bg-red-50 px-2 py-0.5 rounded-full">
                      {rec.type}
                    </span>
                    <span className="text-[11px] text-gray-400">{rec.fileSize}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mt-2">{rec.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{rec.doctorOrHospital}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{rec.date}</p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => alert(`Opening secure preview for ${rec.title}`)}
                    className="text-xs font-semibold text-[#D91F2B] hover:underline flex items-center gap-1"
                  >
                    View Document <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => alert(`Downloading ${rec.title}`)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Family Profiles */}
      {activeTab === 'family' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Family Healthcare Profiles</h3>
              <p className="text-xs text-gray-500">Manage bookings and medical histories for your family members</p>
            </div>
            <button
              onClick={() => setShowAddFamily(!showAddFamily)}
              className="px-4 py-2 bg-[#D91F2B] text-white text-xs font-semibold rounded-full hover:bg-[#C01823] transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Member
            </button>
          </div>

          {showAddFamily && (
            <form onSubmit={handleAddFamilyMember} className="bg-gray-50 rounded-2xl p-5 border border-gray-200 flex flex-wrap gap-3 items-end">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Rahman"
                  value={newFamilyName}
                  onChange={(e) => setNewFamilyName(e.target.value)}
                  className="px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Relationship</label>
                <select
                  value={newFamilyRel}
                  onChange={(e) => setNewFamilyRel(e.target.value)}
                  className="px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white"
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#D91F2B] text-white text-xs font-semibold rounded-lg hover:bg-[#C01823]"
              >
                Save Profile
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {familyMembers.map((fam) => (
              <div key={fam.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card-subtle space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
                    {fam.relationship}
                  </span>
                  <span className="text-xs font-bold text-[#D91F2B]">{fam.bloodGroup}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">{fam.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Age: {fam.age} • {fam.gender}</p>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <Link
                    href={`/doctors`}
                    className="text-xs font-semibold text-[#D91F2B] hover:underline"
                  >
                    Book for {fam.name.split(' ')[0]} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Health Reminders */}
      {activeTab === 'reminders' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-4">
          <h3 className="font-bold text-gray-900 text-lg">Active Health Reminders</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-red-100 bg-rose-50/40 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Pill className="w-5 h-5 text-[#D91F2B] mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Blood Pressure Medication (Amlodipine 5mg)</h4>
                  <p className="text-xs text-gray-500">Every morning at 08:30 AM after breakfast</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#D91F2B]">Daily Active</span>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Follow-up Consultation with Dr. Farzana Ahmed</h4>
                  <p className="text-xs text-gray-500">Scheduled for 14 Nov 2026</p>
                </div>
              </div>
              <span className="text-xs font-medium text-gray-600">Upcoming</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Saved Providers */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <h3 className="font-bold text-gray-900 text-lg">Saved Doctors & Hospitals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOCTORS.slice(0, 2).map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={doc.avatar} alt={doc.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">
                      <Link href={`/doctors/${doc.slug}`}>{doc.name}</Link>
                    </h4>
                    <p className="text-xs text-gray-500">{doc.specialty}</p>
                  </div>
                </div>
                <Link
                  href={`/doctors/${doc.slug}`}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#D91F2B] hover:bg-[#C01823] rounded-full"
                >
                  Book
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
