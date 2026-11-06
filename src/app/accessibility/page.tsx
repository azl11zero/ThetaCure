import React from 'react';
import Link from 'next/link';
import { Eye, Volume2, Globe, Heart, ChevronRight } from 'lucide-react';

export default function AccessibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">Accessibility</span>
      </nav>

      <div className="border-b border-gray-100 pb-6 space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Accessibility at ThetaCure
        </h1>
        <p className="text-xs text-gray-500">
          Making healthcare guidance usable and accessible for every citizen in Bangladesh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center">
            <Volume2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">Voice Input & Speech Synthesis</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            ThetaCure features speech recognition (STT) and voice feedback (TTS) in both English and Bengali (বাংলা), enabling users with visual impairments or limited literacy to navigate care options easily.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">WCAG 2.2 AA Contrast Standards</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            All text elements, buttons, and clinical badges maintain high visual contrast ratios against backgrounds, ensuring comfortable readability under diverse lighting conditions and screen types.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">Bilingual Language Switcher</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Instantly toggle between English and Bengali across all interface headers, navigation drawers, and diagnostic descriptions.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D91F2B] flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">Keyboard Navigation & Screen Readers</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            All interactive modals, tab selectors, and search drawers are fully operable with keyboard tab indexing and ARIA accessibility labels.
          </p>
        </div>
      </div>
    </div>
  );
}
