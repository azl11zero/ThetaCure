'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  ShieldCheck,
  Building2,
  Video,
  Calendar,
  Clock,
  CheckCircle2,
  CreditCard,
  ArrowLeft
} from 'lucide-react';
import { DOCTORS } from '@/lib/data';
import { ConsultationType } from '@/lib/types';

export default function DoctorBookingPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const doctor = DOCTORS.find((d) => d.slug === resolvedParams.slug) || DOCTORS[0];

  const [consultationType, setConsultationType] = useState<ConsultationType>('in-person');
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 31 Oct');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Card' | 'Pay at Hospital'>('bKash');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const fee = consultationType === 'in-person' ? doctor.fees.inPerson : doctor.fees.online;

  const dates = [
    { label: 'Today, 30 Oct', available: false },
    { label: 'Tomorrow, 31 Oct', available: true },
    { label: 'Saturday, 1 Nov', available: true },
    { label: 'Sunday, 2 Nov', available: true },
  ];

  const timeSlots = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '04:00 PM', '04:30 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const ref = 'TC-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);

    // Save to local storage for patient dashboard
    const saved = JSON.parse(localStorage.getItem('thetacure_appointments') || '[]');
    const newApt = {
      id: ref,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorAvatar: doctor.avatar,
      hospitalName: doctor.hospital.name,
      consultationType,
      patientName,
      patientPhone,
      patientAge,
      date: selectedDate,
      timeSlot: selectedSlot,
      fee,
      status: 'Confirmed',
      paymentMethod,
      createdAt: new Date().toISOString().split('T')[0],
    };
    localStorage.setItem('thetacure_appointments', JSON.stringify([newApt, ...saved]));

    setIsSuccess(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/doctors" className="hover:text-gray-600">Doctors</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/doctors/${doctor.slug}`} className="hover:text-gray-600">{doctor.name}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">Book Appointment</span>
      </nav>

      {!isSuccess ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Form */}
          <div className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-[#D91F2B] uppercase tracking-wider">Appointment Booking</span>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">Book Consultation with {doctor.name}</h1>
              <p className="text-xs text-gray-500 mt-0.5">{doctor.specialty} • {doctor.hospital.name}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Selection */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">1. Consultation Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultationType('in-person')}
                    className={`p-4 rounded-2xl border text-sm font-semibold flex items-center justify-center gap-2 transition ${
                      consultationType === 'in-person'
                        ? 'border-[#D91F2B] bg-red-50 text-[#D91F2B]'
                        : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>In-Person Chamber (৳{doctor.fees.inPerson})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsultationType('online')}
                    className={`p-4 rounded-2xl border text-sm font-semibold flex items-center justify-center gap-2 transition ${
                      consultationType === 'online'
                        ? 'border-[#D91F2B] bg-red-50 text-[#D91F2B]'
                        : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>Online Video (৳{doctor.fees.online})</span>
                  </button>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">2. Choose Consultation Date</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d.label}
                      type="button"
                      disabled={!d.available}
                      onClick={() => setSelectedDate(d.label)}
                      className={`p-3 rounded-xl border text-xs font-medium transition ${
                        !d.available
                          ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                          : selectedDate === d.label
                          ? 'bg-[#D91F2B] text-white border-[#D91F2B] font-bold shadow-sm'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">3. Select Time Slot</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 rounded-xl border text-xs font-medium transition ${
                        selectedSlot === slot
                          ? 'border-[#D91F2B] bg-red-50 text-[#D91F2B] font-bold'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient Info */}
              <div className="space-y-4 pt-3 border-t border-gray-100">
                <label className="block text-xs font-semibold text-gray-700 uppercase">4. Patient Details</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Patient Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sadia Rahman"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Mobile Phone (+880) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="01712-345678"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">5. Payment Method</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['bKash', 'Nagad', 'Card', 'Pay at Hospital'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPaymentMethod(m)}
                      className={`py-2 rounded-xl border text-xs font-medium transition ${
                        paymentMethod === m
                          ? 'border-[#D91F2B] bg-red-50 text-[#D91F2B] font-bold'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#D91F2B] hover:bg-[#C01823] text-white font-bold text-sm rounded-full shadow transition"
              >
                Confirm Appointment (৳{fee})
              </button>
            </form>
          </div>

          {/* Right Summary */}
          <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 sticky top-24">
            <h3 className="font-bold text-gray-900 text-sm">Booking Summary</h3>
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image src={doctor.avatar} alt={doctor.name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-gray-900">{doctor.name}</h4>
                <p className="text-[11px] text-[#D91F2B]">{doctor.specialty}</p>
                <p className="text-[10px] text-gray-400">{doctor.hospital.name}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Date:</span>
                <strong className="text-gray-900">{selectedDate}</strong>
              </div>
              <div className="flex justify-between">
                <span>Time Slot:</span>
                <strong className="text-gray-900">{selectedSlot}</strong>
              </div>
              <div className="flex justify-between">
                <span>Type:</span>
                <strong className="text-gray-900 capitalize">{consultationType}</strong>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="text-sm font-bold text-gray-900">Total Consultation Fee:</span>
                <span className="text-lg font-bold text-[#D91F2B]">৳{fee}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Confirmation Screen */
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-gray-200 shadow-lg text-center space-y-5 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Appointment Confirmed</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">Reference #{bookingRef}</h2>
            <p className="text-xs text-gray-500 mt-1">
              SMS booking confirmation sent to {patientPhone}.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 text-left text-xs space-y-2 border border-gray-100">
            <div className="flex justify-between"><span className="text-gray-500">Doctor:</span><strong className="text-gray-900">{doctor.name}</strong></div>
            <div className="flex justify-between"><span className="text-gray-500">Date & Slot:</span><strong className="text-gray-900">{selectedDate} at {selectedSlot}</strong></div>
            <div className="flex justify-between"><span className="text-gray-500">Location:</span><strong className="text-gray-900">{doctor.hospital.name}</strong></div>
            <div className="flex justify-between"><span className="text-gray-500">Patient:</span><strong className="text-gray-900">{patientName}</strong></div>
            <div className="flex justify-between pt-2 border-t border-gray-200"><span className="text-gray-500">Payment:</span><strong className="text-[#D91F2B]">{paymentMethod} (৳{fee})</strong></div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <Link href="/dashboard" className="px-6 py-2.5 bg-[#D91F2B] hover:bg-[#C01823] text-white text-xs font-semibold rounded-full shadow">
              Go to Patient Dashboard
            </Link>
            <Link href="/" className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-full">
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
