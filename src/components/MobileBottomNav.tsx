'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Stethoscope, Sparkles, MapPin, User } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const navItems = [
    {
      label: language === 'bn' ? 'হোম' : 'Home',
      href: '/',
      icon: Home,
    },
    {
      label: language === 'bn' ? 'ডাক্তার' : 'Doctors',
      href: '/doctors',
      icon: Stethoscope,
    },
    {
      label: language === 'bn' ? 'এআই' : 'AI Care',
      href: '/ai-assistant',
      icon: Sparkles,
      highlight: true,
    },
    {
      label: language === 'bn' ? 'ম্যাপ' : 'Map',
      href: '/map',
      icon: MapPin,
    },
    {
      label: language === 'bn' ? 'প্রোফাইল' : 'Account',
      href: '/dashboard',
      icon: User,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition duration-150 relative ${
                active ? 'text-[#D91F2B]' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {item.highlight ? (
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-[#D91F2B] flex items-center justify-center shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#D91F2B] rounded-full animate-ping" />
                </div>
              ) : (
                <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              )}
              <span className={`text-[10px] mt-0.5 font-medium ${active ? 'font-bold text-[#D91F2B]' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
