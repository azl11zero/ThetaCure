import React from 'react';
import Link from 'next/link';
import { Stethoscope, HeartPulse, Activity, Users, Brain, Baby, Sparkles, Eye, ShieldCheck, ChevronRight } from 'lucide-react';
import { SPECIALTIES, DOCTORS } from '@/lib/data';

export default function SpecialtiesDirectoryPage() {
  const iconMap: Record<string, any> = {
    Stethoscope,
    HeartPulse,
    Activity,
    Users,
    Brain,
    Baby,
    Sparkles,
    Eye,
    ShieldCheck,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Medical Specialties</h1>
        <p className="text-sm text-gray-500 mt-1 max-w-2xl">
          Discover verified healthcare departments and connect with certified consultants across Bangladesh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SPECIALTIES.map((spec) => {
          const IconComp = iconMap[spec.icon] || Stethoscope;
          const doctorsInSpec = DOCTORS.filter((d) => d.specialty.includes(spec.name));

          return (
            <Link
              key={spec.id}
              href={`/specialties/${spec.slug}`}
              className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-gray-300 shadow-card-subtle hover:shadow-card-hover transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#D91F2B] flex items-center justify-center group-hover:bg-[#D91F2B] group-hover:text-white transition-colors">
                  <IconComp className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#D91F2B] transition">
                    {spec.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{spec.description}</p>
                </div>

                <div className="space-y-1.5 pt-2">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Common Conditions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {spec.commonConditions.map((cond, i) => (
                      <span key={i} className="text-[11px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-100">
                        {cond}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-700">{spec.doctorCount}+ Specialists</span>
                <span className="text-[#D91F2B] font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                  View Doctors <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
