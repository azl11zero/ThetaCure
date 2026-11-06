'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  BookOpen,
  Clock,
  User,
  ArrowRight,
  Mail,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { HEALTH_TIPS } from '@/lib/data';

export default function HealthTipsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Tips');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = [
    'All Tips',
    'Nutrition',
    'Fitness',
    'Mental Health',
    'Sleep',
    'Lifestyle',
    'Disease Prevention',
    'Women\'s Health',
    'Men\'s Health',
  ];

  const featuredTips = HEALTH_TIPS.filter((t) => t.isFeatured);

  const filteredTips = useMemo(() => {
    if (selectedCategory === 'All Tips') return HEALTH_TIPS;
    return HEALTH_TIPS.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Top Banner (Faithfully Matching Health Tips UI Reference) */}
      <section className="bg-gradient-to-r from-gray-50 via-rose-50/20 to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-bold text-[#D91F2B] uppercase tracking-wider bg-red-100/60 px-3 py-1 rounded-full">
                Health Tips
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Simple Tips for a Healthier You
              </h1>
              <p className="text-base text-gray-600 max-w-xl leading-relaxed">
                Expert-backed advice on everyday health, prevention, and better living.
              </p>
            </div>

            <div className="md:col-span-4 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-sm hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80"
                alt="Health & Wellness"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills Matching Reference */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-red-50 text-[#D91F2B] border border-[#D91F2B] font-bold shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured This Week Section (Matching Reference) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Featured This Week</h2>
          <button onClick={() => setSelectedCategory('All Tips')} className="text-xs font-semibold text-[#D91F2B] hover:underline flex items-center">
            View All <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTips.map((tip) => (
            <Link
              key={tip.id}
              href={`/health-tips/${tip.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-card-subtle hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
                <Image src={tip.image} alt={tip.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[#D91F2B]">
                  {tip.category}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-base group-hover:text-[#D91F2B] transition line-clamp-2">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{tip.excerpt}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>{tip.readTime}</span>
                  <span className="text-[#D91F2B] font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                    Read Article →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Health Tips Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Latest Health Tips</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => (
            <Link
              key={tip.id}
              href={`/health-tips/${tip.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-card-subtle hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
                <Image src={tip.image} alt={tip.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-gray-700">
                  {tip.category}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#D91F2B] transition line-clamp-2">
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
          ))}
        </div>
      </section>

      {/* Newsletter Subscription Banner (Matching UI Reference) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-rose-50/50 border border-red-100 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-red-100 text-[#D91F2B] flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Get Health Tips in Your Inbox
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Subscribe to receive expert health tips, updates, and wellness guides.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="px-4 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 focus:border-[#D91F2B] rounded-full focus:outline-none w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#D91F2B] hover:bg-[#C01823] text-white font-medium text-xs sm:text-sm rounded-full transition shadow-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
        {subscribed && (
          <div className="mt-3 text-center text-xs font-semibold text-emerald-700 bg-emerald-50 py-2 rounded-xl">
            ✓ Thank you! You have subscribed to ThetaCure health tips.
          </div>
        )}
      </section>
    </div>
  );
}
