'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Clock,
  Calendar,
  Share2,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  User,
  Building2,
  Bookmark
} from 'lucide-react';
import { HEALTH_TIPS, DOCTORS } from '@/lib/data';

export default function HealthTipDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const article = HEALTH_TIPS.find((t) => t.slug === resolvedParams.slug) || HEALTH_TIPS[0];
  const relatedArticles = HEALTH_TIPS.filter((t) => t.slug !== article.slug).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/health-tips" className="hover:text-gray-600 transition">Health Tips</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium truncate max-w-xs">{article.title}</span>
      </nav>

      {/* Article Header */}
      <div className="space-y-4">
        <span className="text-xs font-bold text-[#D91F2B] uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full">
          {article.category}
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
          {article.title}
        </h1>

        {/* Author Metadata Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-100 text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
              <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{article.author.name}</p>
              <p className="text-gray-400">{article.author.role} • {article.author.hospital}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.publishedDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Cover Image */}
      <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        <Image src={article.image} alt={article.title} fill className="object-cover" priority />
      </div>

      {/* Article Body */}
      <div className="prose prose-gray max-w-none text-base text-gray-700 leading-relaxed space-y-4">
        {article.content.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>

      {/* Key Takeaways Card */}
      <div className="bg-rose-50/50 rounded-2xl p-6 border border-red-100 space-y-3">
        <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D91F2B]" />
          Key Medical Takeaways
        </h3>
        <ul className="space-y-2">
          {article.keyTakeaways.map((takeaway, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-[#D91F2B] mt-0.5 flex-shrink-0" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Author Card & Booking CTA */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
            <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-base">{article.author.name}</h4>
            <p className="text-xs text-[#D91F2B] font-medium">{article.author.role}</p>
            <p className="text-xs text-gray-500 mt-0.5">{article.author.hospital}</p>
          </div>
        </div>

        <Link
          href={`/doctors`}
          className="px-6 py-2.5 bg-[#D91F2B] hover:bg-[#C01823] text-white font-medium text-xs rounded-full shadow-sm transition whitespace-nowrap"
        >
          Book Consultation
        </Link>
      </div>

      {/* Related Articles */}
      <div className="pt-8 border-t border-gray-200 space-y-6">
        <h3 className="font-bold text-gray-900 text-xl">Related Health Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <Link
              key={rel.id}
              href={`/health-tips/${rel.slug}`}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 p-4 space-y-3 transition shadow-sm"
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100">
                <Image src={rel.image} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <h4 className="font-bold text-gray-900 text-xs group-hover:text-[#D91F2B] transition line-clamp-2">
                {rel.title}
              </h4>
              <p className="text-[11px] text-gray-400">{rel.readTime}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
