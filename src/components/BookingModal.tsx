'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, Video, Building2, CheckCircle2, ShieldAlert, CreditCard } from 'lucide-react';
import { Doctor, ConsultationType } from '@/lib/types';

interface BookingModalProps {
  doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
  initialType?: ConsultationType;
}

export default function BookingModal({ doctor, isOpen, onClose, initialType = 'in-person' }: BookingModalProps) {
  const [consultationType, setConsultationType] = useState<ConsultationType>(initialType);
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 31 Oct');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM');
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientAge, setPatientAge] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Card' | 'Pay at Hospital'>('bKash');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>('');

  if (!isOpen) return null;

  const fee = consultationType === 'in-person' ? doctor.fees.inPerson : doctor.fees.online;

  const dates = [
    { label: 'Today, 30 Oct', available: false },
    { label: 'Tomorrow, 31 Oct', available: true },
    { label: 'Saturday, 1 Nov', available: true },
    { label: 'Sunday, 2 Nov', available: true },
  ];

  const timeSlots = [
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '04:00 PM',
    '04:30 PM',
    '05:00 PM',
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) {
      alert('Please fill in your name and mobile number.');
      return;
    }

    const newBookingId = 'TC-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(newBookingId);

    // Save appointment to localStorage so it syncs with patient dashboard
    const savedAppointments = JSON.parse(localStorage.getItem('thetacure_appointments') || '[]');
    const newAppointment = {
      id: newBookingId,
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
    localStorage.setItem('thetacure_appointments', JSON.stringify([newAppointment, ...savedAppointments]));

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="border-b border-gray-100 pb-4 mb-6">
              <span className="text-xs font-semibold text-[#D91F2B] uppercase tracking-wide">
                Book Consultation
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-1">{doctor.name}</h3>
              <p className="text-sm text-gray-500">{doctor.specialty} • {doctor.hospital.name}</p>
            </div>

            <form onSubmit={handleConfirm} className="space-y-5">
              {/* Consultation Type Toggle */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                  Select Consultation Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultationType('in-person')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition ${
                      consultationType === 'in-person'
                        ? 'border-[#D91F2B] bg-red-50 text-[#D91F2B]'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>In-Person (৳{doctor.fees.inPerson})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsultationType('online')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition ${
                      consultationType === 'online'
                        ? 'border-[#D91F2B] bg-red-50 text-[#D91F2B]'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>Online Video (৳{doctor.fees.online})</span>
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                  Choose Date
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d.label}
                      type="button"
                      disabled={!d.available}
                      onClick={() => setSelectedDate(d.label)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition ${
                        !d.available
                          ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                          : selectedDate === d.label
                          ? 'border-[#D91F2B] bg-[#D91F2B] text-white font-semibold'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                  Available Slots
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 text-xs font-medium rounded-lg border text-center transition ${
                        selectedSlot === slot
                          ? 'border-[#D91F2B] bg-red-50 text-[#D91F2B] font-bold'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient Details */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 font-medium mb-1">Patient Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sadia Rahman"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D91F2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 font-medium mb-1">Mobile Number (+880) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="01712-345678"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D91F2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 font-medium mb-1">Patient Age</label>
                  <input
                    type="number"
                    placeholder="e.g. 32"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#D91F2B]"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['bKash', 'Nagad', 'Card', 'Pay at Hospital'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-2 rounded-lg border text-xs font-medium text-center transition ${
                        paymentMethod === method
                          ? 'border-[#D91F2B] bg-red-50 text-[#D91F2B] font-semibold'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total & Submit */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">Total Consultation Fee</span>
                  <span className="text-xl font-bold text-gray-900">৳{fee}</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D91F2B] hover:bg-[#C01823] text-white font-medium rounded-full shadow-sm hover:shadow transition"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Booking Confirmation View */
          <div className="text-center py-6 space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                Appointment Confirmed
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Booking #{bookingId}</h3>
              <p className="text-sm text-gray-500 mt-1">
                SMS confirmation has been sent to {patientPhone}.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-left text-sm space-y-2 border border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-500">Doctor:</span>
                <span className="font-semibold text-gray-900">{doctor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date & Slot:</span>
                <span className="font-semibold text-gray-900">{selectedDate} at {selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Type:</span>
                <span className="font-semibold text-gray-900 capitalize">{consultationType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Location:</span>
                <span className="font-semibold text-gray-900">{doctor.hospital.name}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-500">Paid via:</span>
                <span className="font-semibold text-[#D91F2B]">{paymentMethod} (৳{fee})</span>
              </div>
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#D91F2B] hover:bg-[#C01823] text-white font-medium rounded-full shadow text-sm transition"
              >
                Done
              </button>
              <a
                href="/dashboard"
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-full text-sm transition"
              >
                Go to Dashboard
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
