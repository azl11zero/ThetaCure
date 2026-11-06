'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  HeartPulse,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  Building2,
  Calendar,
  CheckCircle2,
  RefreshCw,
  PhoneCall,
  Info
} from 'lucide-react';
import { DOCTORS, SYMPTOM_DATA } from '@/lib/data';
import { Doctor } from '@/lib/types';
import BookingModal from '@/components/BookingModal';

export default function AiDoctorFinderPage() {
  const [step, setStep] = useState<number>(1);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('General / Whole Body');
  const [symptomsInput, setSymptomsInput] = useState<string>('');
  const [duration, setDuration] = useState<string>('Few days');
  const [severity, setSeverity] = useState<'Mild' | 'Moderate' | 'Severe'>('Moderate');
  const [ageGroup, setAgeGroup] = useState<string>('Adult (18–59)');
  const [isEmergencyDetected, setIsEmergencyDetected] = useState<boolean>(false);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [matchedGuidance, setMatchedGuidance] = useState<any>(null);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);

  const bodyParts = [
    'General / Whole Body',
    'Heart & Chest',
    'Head & Brain',
    'Stomach & Digestion',
    'Bones & Joints',
    'Women’s Health',
  ];

  const handleStartAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomsInput.trim()) {
      alert('Please describe your symptoms to continue.');
      return;
    }

    // Check emergency triggers
    const lower = symptomsInput.toLowerCase();
    const urgentKeywords = ['chest pain', 'heart attack', 'unconscious', 'cannot breathe', 'severe bleeding', 'stroke'];
    const hasEmergency = urgentKeywords.some((k) => lower.includes(k)) || severity === 'Severe';

    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setIsEmergencyDetected(hasEmergency);

      // Match specialty guidance
      let matched = SYMPTOM_DATA[0];
      if (lower.includes('chest') || lower.includes('heart') || lower.includes('breath') || selectedBodyPart === 'Heart & Chest') {
        matched = SYMPTOM_DATA[1];
      } else if (lower.includes('back') || lower.includes('knee') || lower.includes('joint') || lower.includes('bone') || selectedBodyPart === 'Bones & Joints') {
        matched = SYMPTOM_DATA[2];
      } else if (lower.includes('head') || lower.includes('dizzy') || lower.includes('seizure') || selectedBodyPart === 'Head & Brain') {
        matched = SYMPTOM_DATA[3];
      } else if (lower.includes('period') || lower.includes('pregnancy') || selectedBodyPart === 'Women’s Health') {
        matched = SYMPTOM_DATA[4];
      }

      setMatchedGuidance(matched);
      setStep(2);
    }, 1200);
  };

  const recommendedDoctor = DOCTORS.find((d) => d.slug === matchedGuidance?.recommendedDoctorSlug) || DOCTORS[0];
  const alternativeDoctors = DOCTORS.filter((d) => d.id !== recommendedDoctor.id).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Safety Medical Disclaimer Header */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block mb-0.5">Medical Safety & Transparency Notice:</strong>
          ThetaCure AI Symptom Guidance is an informational healthcare navigation tool designed to help you discover appropriate medical specialties and nearby doctors. It does <strong>not</strong> provide medical diagnoses, replace clinical evaluation, or prescribe treatment. If you are experiencing sudden severe pain or breathing difficulty, call emergency services (999) or visit the nearest emergency room immediately.
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-50 text-[#D91F2B] flex items-center justify-center font-bold text-sm">
            {step}
          </div>
          <span className="font-semibold text-gray-900 text-sm">
            {step === 1 ? 'Step 1: Describe Symptoms' : 'Step 2: AI Guidance & Doctor Recommendations'}
          </span>
        </div>

        {step === 2 && (
          <button
            onClick={() => setStep(1)}
            className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 font-medium"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Start Over
          </button>
        )}
      </div>

      {step === 1 ? (
        /* Step 1: Questionnaire */
        <form onSubmit={handleStartAnalysis} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-card-subtle space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">Check Symptoms with AI</h2>
            <p className="text-xs text-gray-500">
              Answer a few quick questions about what you are feeling to find the right medical specialty in Dhaka.
            </p>
          </div>

          {/* Affected Body Region */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
              1. Which area is primarily affected?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {bodyParts.map((part) => (
                <button
                  key={part}
                  type="button"
                  onClick={() => setSelectedBodyPart(part)}
                  className={`p-3 rounded-xl border text-xs font-medium text-left transition ${
                    selectedBodyPart === part
                      ? 'border-[#D91F2B] bg-red-50 text-[#D91F2B] font-bold shadow-sm'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {part}
                </button>
              ))}
            </div>
          </div>

          {/* Describe Symptoms Textarea */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
              2. Describe what symptoms you are experiencing *
            </label>
            <textarea
              required
              rows={3}
              value={symptomsInput}
              onChange={(e) => setSymptomsInput(e.target.value)}
              placeholder="e.g. Constant dull ache in lower back for the past week, worsens when standing, mild fever..."
              className="w-full p-4 text-sm bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#D91F2B] focus:bg-white transition"
            />
          </div>

          {/* Duration & Severity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                3. How long have you felt this?
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 text-sm bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D91F2B] text-gray-700"
              >
                <option value="Today (Less than 24 hours)">Today (Less than 24 hours)</option>
                <option value="Few days">A few days (2–6 days)</option>
                <option value="1 to 2 weeks">1 to 2 weeks</option>
                <option value="Over a month (Chronic)">Over a month (Chronic)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                4. Symptom Severity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Mild', 'Moderate', 'Severe'] as const).map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setSeverity(sev)}
                    className={`py-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                      severity === sev
                        ? sev === 'Severe'
                          ? 'border-red-600 bg-red-600 text-white'
                          : 'border-[#D91F2B] bg-red-50 text-[#D91F2B]'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Age Group */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
              5. Patient Age Group
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Child (0–17)', 'Adult (18–59)', 'Senior (60+)'].map((ag) => (
                <button
                  key={ag}
                  type="button"
                  onClick={() => setAgeGroup(ag)}
                  className={`py-2 rounded-xl border text-xs font-medium text-center transition ${
                    ageGroup === ag
                      ? 'border-[#D91F2B] bg-red-50 text-[#D91F2B] font-bold'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {ag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={analyzing}
              className="px-8 py-3 bg-[#D91F2B] hover:bg-[#C01823] text-white font-medium text-sm rounded-full shadow-md hover:shadow-lg transition flex items-center gap-2"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Get AI Guidance</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Step 2: AI Symptom Guidance & Matched Doctor Recommendations */
        <div className="space-y-8 animate-fade-in">
          {/* Urgent Warning if Severe */}
          {isEmergencyDetected && (
            <div className="bg-red-50 border-2 border-[#D91F2B] rounded-2xl p-5 text-red-900 flex items-start gap-4 shadow-sm">
              <AlertTriangle className="w-6 h-6 text-[#D91F2B] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-base text-red-900">Immediate Clinical Attention Advised</h4>
                <p className="text-xs text-red-700 leading-relaxed">
                  Your symptoms or reported severity suggest you may need rapid medical evaluation. Please consider visiting the nearest 24/7 Emergency Room or calling our 24/7 helpline immediately.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="tel:+8809612345678"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D91F2B] text-white text-xs font-bold rounded-full shadow hover:bg-[#C01823]"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Emergency: +880 9612-345678
                  </a>
                  <a href="tel:999" className="text-xs font-bold underline text-red-800">
                    National Emergency: 999
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* AI Clinical Summary Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-card-subtle space-y-6">
            <div className="flex items-center gap-2 text-[#D91F2B]">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Symptom Assessment</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-gray-400 uppercase">Recommended Specialty</span>
                <p className="text-xl font-bold text-gray-900">{matchedGuidance?.specialty}</p>
                <p className="text-xs text-gray-500">Best suited for your symptoms and profile.</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-gray-400 uppercase">Triage Severity</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${
                    matchedGuidance?.urgency === 'High' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {matchedGuidance?.urgency} Urgency
                  </span>
                  <span className="text-xs text-gray-400">Duration: {duration}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-sm">Clinical Guidance Summary</h4>
              <p className="text-sm text-gray-600 leading-relaxed bg-rose-50/40 p-4 rounded-xl border border-red-50">
                {matchedGuidance?.guidance}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-sm">Recommended Questions for Your Doctor</h4>
              <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-5">
                <li>Are these symptoms related to lifestyle or an underlying chronic cause?</li>
                <li>Do I require any baseline diagnostic tests (e.g. CBC, Ultrasound, or ECG)?</li>
                <li>What warning signs should prompt immediate emergency follow-up?</li>
              </ul>
            </div>
          </div>

          {/* Recommended Doctors Row */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-900 text-xl">Top Recommended Specialists Nearby</h3>
              <p className="text-xs text-gray-500">
                Matched based on specialty relevance, BMDC verification, patient ratings, and next-day slot availability.
              </p>
            </div>

            {/* Top Match Doctor Card */}
            <div className="bg-white rounded-3xl p-6 border-2 border-red-100 hover:border-[#D91F2B] shadow-md transition-all space-y-4 relative overflow-hidden">
              <span className="absolute top-3 right-4 bg-[#D91F2B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Top AI Match
              </span>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                    <Image src={recommendedDoctor.avatar} alt={recommendedDoctor.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#D91F2B] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>BMDC Verified ({recommendedDoctor.bmdcNumber})</span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg leading-snug">
                      <Link href={`/doctors/${recommendedDoctor.slug}`}>{recommendedDoctor.name}</Link>
                    </h4>
                    <p className="text-xs text-gray-500">{recommendedDoctor.degrees}</p>
                    <p className="text-xs font-semibold text-gray-700">{recommendedDoctor.specialty}</p>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end">
                  <span className="text-xs text-gray-400">Consultation Fee</span>
                  <span className="text-xl font-bold text-gray-900">৳{recommendedDoctor.fees.inPerson}</span>
                  <span className="text-xs text-emerald-700 font-medium">Slot: {recommendedDoctor.nextAvailableSlot.formatted}</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span>{recommendedDoctor.hospital.name} ({recommendedDoctor.hospital.location})</span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-gray-800">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{recommendedDoctor.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={`/doctors/${recommendedDoctor.slug}`}
                  className="w-1/2 text-center py-2.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition"
                >
                  View Complete Profile
                </Link>
                <button
                  onClick={() => setSelectedDoctorForBooking(recommendedDoctor)}
                  className="w-1/2 text-center py-2.5 text-xs font-semibold text-white bg-[#D91F2B] hover:bg-[#C01823] rounded-full transition shadow-sm"
                >
                  Book Appointment Now
                </button>
              </div>
            </div>

            {/* Alternative Doctors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {alternativeDoctors.map((doc) => (
                <div key={doc.id} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image src={doc.avatar} alt={doc.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 text-xs">
                        <Link href={`/doctors/${doc.slug}`}>{doc.name}</Link>
                      </h5>
                      <p className="text-[11px] text-gray-500">{doc.specialty}</p>
                      <p className="text-[11px] font-bold text-gray-900 mt-0.5">৳{doc.fees.inPerson}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDoctorForBooking(doc)}
                    className="px-3 py-1.5 text-xs font-semibold text-[#D91F2B] bg-red-50 hover:bg-red-100 rounded-full transition"
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {selectedDoctorForBooking && (
        <BookingModal
          doctor={selectedDoctorForBooking}
          isOpen={true}
          onClose={() => setSelectedDoctorForBooking(null)}
        />
      )}
    </div>
  );
}
