'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  MapPin,
  Building2,
  Star,
  ShieldCheck,
  Bed,
  Users,
  FlaskConical,
  ChevronRight,
  PhoneCall,
  Clock
} from 'lucide-react';
import { HOSPITALS } from '@/lib/data';

export default function HospitalsDirectoryPage() {
  const [search, setSearch] = useState('');
  const [selectedArea, setSelectedArea] = useState('All');

  const areas = ['All', 'Gulshan', 'Panthapath', 'Bashundhara', 'Dhanmondi', 'Uttara'];

  const filteredHospitals = useMemo(() => {
    return HOSPITALS.filter((hosp) => {
      const matchSearch =
        search === '' ||
        hosp.name.toLowerCase().includes(search.toLowerCase()) ||
        hosp.category.toLowerCase().includes(search.toLowerCase()) ||
        hosp.address.toLowerCase().includes(search.toLowerCase());

      const matchArea = selectedArea === 'All' || hosp.area === selectedArea;

      return matchSearch && matchArea;
    });
  }, [search, selectedArea]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Hospitals & Clinics</h1>
        <p className="text-sm text-gray-500 mt-1 max-w-2xl">
          Browse verified hospitals in Bangladesh, explore departments, check available beds, and book appointments directly.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-card-subtle flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hospital by name or specialty..."
            className="w-full pl-11 pr-4 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D91F2B] focus:bg-white transition"
          />
        </div>

        <div className="w-full sm:w-56">
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full px-3 py-2.5 text-sm bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D91F2B] font-medium text-gray-700 cursor-pointer"
          >
            <option value="All">All Locations (Dhaka)</option>
            {areas.filter(a => a !== 'All').map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredHospitals.map((hosp) => (
          <div
            key={hosp.id}
            className="bg-white rounded-3xl border border-gray-200 hover:border-gray-300 shadow-card-subtle hover:shadow-card-hover transition-all flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
                <Image src={hosp.coverImage} alt={hosp.name} fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#D91F2B] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg hover:text-[#D91F2B] transition">
                    <Link href={`/hospitals/${hosp.slug}`}>{hosp.name}</Link>
                  </h3>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">{hosp.category}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600 py-2 border-y border-gray-100">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-gray-900">{hosp.rating}</span>
                    <span className="text-gray-400">({hosp.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1 font-medium">
                    <Bed className="w-3.5 h-3.5 text-gray-400" />
                    <span>{hosp.beds}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{hosp.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{hosp.operatingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50/60 border-t border-gray-100 grid grid-cols-2 gap-2">
              <a
                href={`tel:${hosp.phone}`}
                className="w-full text-center py-2 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 rounded-full border border-gray-200 transition flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3 h-3 text-[#D91F2B]" />
                <span>Call</span>
              </a>
              <Link
                href={`/hospitals/${hosp.slug}`}
                className="w-full text-center py-2 text-xs font-semibold text-white bg-[#D91F2B] hover:bg-[#C01823] rounded-full transition shadow-sm"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
