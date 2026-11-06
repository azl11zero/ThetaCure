'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Clock, User, ArrowRight } from 'lucide-react';
import { HEALTH_TIPS } from '@/lib/data';

export default function HealthTipCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const rawCat = decodeURIComponent(resolvedParams.category);
  const tips = HEALTH_TIPS.filter(
    (t) => t.category.toLowerCase().replace(/[^a-z0-9]/g, '-') === rawCat.toLowerCase().replace(/[^a-z0-9]/g, '-')
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/health-tips" className="hover:text-gray-600">Health Tips</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium capitalize">{rawCat}</span>
      </nav>

      <div>
        <span className="text-xs font-bold text-[#D91F2B] uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full">
          Category
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-2 capitalize">{rawCat} Articles & Advice</h1>
        <p className="text-sm text-gray-500 mt-1">
          Evidence-based articles published by verified consultants and nutritionists.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.length > 0 ? (
          tips.map((tip) => (
            <Link
              key={tip.id}
              href={`/health-tips/${tip.slug}`}
              className="bg-white rounded-3xl border border-gray-200 hover:border-gray-300 shadow-sm transition flex flex-col justify-between overflow-hidden group"
            >
              <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
                <Image src={tip.image} alt={tip.title} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-base group-hover:text-[#D91F2B] transition line-clamp-2">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tip.excerpt}</p>
                </div>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>{tip.publishedDate}</span>
                  <span>{tip.readTime}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          HEALTH_TIPS.slice(0, 3).map((tip) => (
            <Link
              key={tip.id}
              href={`/health-tips/${tip.slug}`}
              className="bg-white rounded-3xl border border-gray-200 hover:border-gray-300 shadow-sm transition flex flex-col justify-between overflow-hidden group"
            >
              <div className="relative aspect-[16/10] w-full bg-gray-100">
                <Image src={tip.image} alt={tip.title} fill className="object-cover" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#D91F2B] transition">{tip.title}</h3>
                <p className="text-xs text-gray-400">{tip.readTime}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
