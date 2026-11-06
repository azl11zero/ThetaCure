'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Globe, Sparkles, ChevronRight } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from './LanguageContext';

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: t.nav_home, href: '/' },
    { label: t.nav_find_doctors, href: '/doctors' },
    { label: t.nav_diagnostics, href: '/diagnostics' },
    { label: t.nav_hospitals, href: '/hospitals' },
    { label: t.nav_health_tips, href: '/health-tips' },
    { label: t.nav_providers, href: '/provider' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo size="md" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3.5 py-2 text-[14px] font-medium transition-colors duration-150 rounded-lg group ${
                      active
                        ? 'text-[#D91F2B] font-semibold'
                        : 'text-gray-700 hover:text-gray-950 hover:bg-gray-50/80'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-[2.5px] bg-[#D91F2B] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition active:scale-95"
                title="Switch Language / ভাষা পরিবর্তন করুন"
              >
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                <span>{language === 'en' ? 'বাংলা' : 'EN'}</span>
              </button>

              {/* Quick Search Icon Button */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition active:scale-95"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Log In */}
              <Link
                href="/login"
                className="text-[14px] font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                {t.nav_login}
              </Link>

              {/* Sign Up Button */}
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-5 py-2 text-[13px] font-semibold text-white bg-[#D91F2B] hover:bg-[#C01823] rounded-full shadow-[0_2px_8px_rgba(217,31,43,0.25)] hover:shadow-[0_4px_14px_rgba(217,31,43,0.35)] active:scale-95 transition-all duration-150"
              >
                {t.nav_signup}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                className="px-2.5 py-1 text-xs font-semibold rounded-full border border-gray-200 text-gray-700"
              >
                {language === 'en' ? 'বাং' : 'EN'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-6 space-y-3 animate-fade-in">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                      active
                        ? 'text-[#D91F2B] bg-red-50/70 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[#D91F2B]" />}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-semibold text-gray-700 border border-gray-200 rounded-full hover:bg-gray-50"
              >
                {t.nav_login}
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-semibold text-white bg-[#D91F2B] rounded-full shadow hover:bg-[#C01823]"
              >
                {t.nav_signup}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm">
                <Search className="w-4 h-4 text-[#D91F2B]" />
                <span>Search ThetaCure</span>
              </div>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4">
              <input
                type="text"
                autoFocus
                placeholder="Search doctors, hospitals, diagnostic tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D91F2B] text-sm"
              />
            </div>

            <div className="mt-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Quick Shortcuts</p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/doctors?search=Internal%20Medicine"
                  onClick={() => setSearchModalOpen(false)}
                  className="text-xs bg-gray-100 hover:bg-red-50 hover:text-[#D91F2B] px-3 py-1.5 rounded-full transition"
                >
                  Internal Medicine
                </Link>
                <Link
                  href="/doctors?search=Cardiology"
                  onClick={() => setSearchModalOpen(false)}
                  className="text-xs bg-gray-100 hover:bg-red-50 hover:text-[#D91F2B] px-3 py-1.5 rounded-full transition"
                >
                  Cardiology
                </Link>
                <Link
                  href="/hospitals/united-hospital-dhaka"
                  onClick={() => setSearchModalOpen(false)}
                  className="text-xs bg-gray-100 hover:bg-red-50 hover:text-[#D91F2B] px-3 py-1.5 rounded-full transition"
                >
                  United Hospital, Dhaka
                </Link>
                <Link
                  href="/diagnostics?search=CBC"
                  onClick={() => setSearchModalOpen(false)}
                  className="text-xs bg-gray-100 hover:bg-red-50 hover:text-[#D91F2B] px-3 py-1.5 rounded-full transition"
                >
                  Complete Blood Count (CBC)
                </Link>
                <Link
                  href="/ai-doctor-finder"
                  onClick={() => setSearchModalOpen(false)}
                  className="text-xs bg-red-50 text-[#D91F2B] font-medium px-3 py-1.5 rounded-full transition flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> AI Symptom Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
