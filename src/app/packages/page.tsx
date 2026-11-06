import React from 'react';
import Link from 'next/link';
import { HeartPulse, CheckCircle2, ChevronRight, Activity, ShieldCheck } from 'lucide-react';
import { HOSPITALS } from '@/lib/data';

export default function HealthPackagesPage() {
  const allPackages = HOSPITALS.flatMap((h) =>
    h.packages.map((p) => ({ ...p, hospitalName: h.name, hospitalSlug: h.slug }))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Preventive Health Checkup Packages</h1>
        <p className="text-sm text-gray-500 mt-1 max-w-2xl">
          Comprehensive wellness screenings bundled at subsidized rates across accredited hospitals in Dhaka.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#D91F2B] uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded-full">
                  Health Screening
                </span>
                <span className="text-xs text-gray-400">{pkg.hospitalName}</span>
              </div>

              <h3 className="font-bold text-gray-900 text-lg mt-2">{pkg.title}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{pkg.description}</p>

              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold text-gray-700">Included Tests & Reviews:</p>
                {pkg.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xl font-bold text-gray-900">৳{pkg.price.toLocaleString()}</span>
                {pkg.originalPrice && (
                  <span className="text-xs text-gray-400 line-through ml-2">৳{pkg.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <Link
                href={`/packages/${pkg.slug}`}
                className="px-5 py-2 bg-[#D91F2B] hover:bg-[#C01823] text-white text-xs font-semibold rounded-full shadow-sm transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
