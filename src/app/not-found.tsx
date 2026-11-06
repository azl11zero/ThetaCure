import React from 'react';
import Link from 'next/link';
import { Search, Home, Stethoscope, ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-white text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#D91F2B] font-bold text-2xl flex items-center justify-center mx-auto shadow-sm">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 bg-[#D91F2B] hover:bg-[#C01823] text-white font-medium text-xs rounded-full shadow transition flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/search"
            className="w-full sm:w-auto px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium text-xs rounded-full border border-gray-200 transition flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Healthcare</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
