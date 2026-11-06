import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Heart, Award, Users, CheckCircle2 } from 'lucide-react';
import Logo from '@/components/Logo';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <Logo size="lg" showSlogan={true} className="justify-center" />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4">
          Healthcare for Everyone.
        </h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          ThetaCure was founded with a singular purpose: to make healthcare in Bangladesh transparent, accessible, and dignified for every patient and family.
        </p>
      </div>

      <div className="relative aspect-[16/8] rounded-3xl overflow-hidden border border-gray-100 shadow-md">
        <Image
          src="/images/thetacure_brand_poster.png"
          alt="ThetaCure Mission"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-3">
          <h3 className="font-bold text-gray-900 text-lg">Our Mission</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            To eliminate the uncertainty and delays in discovering trusted doctors and transparent diagnostic pricing across Bangladesh.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle space-y-3">
          <h3 className="font-bold text-gray-900 text-lg">Strict Provider Verification</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Every physician on ThetaCure is independently validated against Bangladesh Medical and Dental Council (BMDC) records. We never fabricate ratings or hospital accreditations.
          </p>
        </div>
      </div>
    </div>
  );
}
