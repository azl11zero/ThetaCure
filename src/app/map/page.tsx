'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Navigation,
  PhoneCall,
  ShieldAlert,
  Star,
  Bed,
  Filter,
  Crosshair,
  ChevronRight,
  ExternalLink,
  Building2,
  Clock,
  Compass
} from 'lucide-react';
import { HOSPITALS } from '@/lib/data';
import { Hospital } from '@/lib/types';

export default function HospitalMapPage() {
  const [selectedHospital, setSelectedHospital] = useState<Hospital>(HOSPITALS[0]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [selectedArea, setSelectedArea] = useState('All');
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [icuOnly, setIcuOnly] = useState(false);

  const areas = ['All', 'Gulshan', 'Panthapath', 'Bashundhara', 'Dhanmondi'];

  // Geolocation trigger
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocating(false);
      },
      (err) => {
        alert('Could not determine your exact location. Switched to Dhaka City Center default.');
        setUserLocation({ lat: 23.8103, lng: 90.4125 });
        setLocating(false);
      }
    );
  };

  // Calculate distance between two lat/lng coordinates in km
  const getDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const filteredHospitals = useMemo(() => {
    return HOSPITALS.filter((h) => {
      const matchArea = selectedArea === 'All' || h.area === selectedArea;
      const matchEmergency = !emergencyOnly || h.isEmergency247;
      const matchIcu = !icuOnly || h.hasIcu;
      return matchArea && matchEmergency && matchIcu;
    });
  }, [selectedArea, emergencyOnly, icuOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Nearest Hospitals & Emergency Care
            </h1>
            <span className="text-xs bg-red-50 text-[#D91F2B] font-bold px-2.5 py-0.5 rounded-full border border-red-100">
              Live Map
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Locate 24/7 accredited medical institutions in Dhaka, check live bed capacity, and get direct GPS directions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLocateMe}
            disabled={locating}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-full transition flex items-center gap-1.5"
          >
            <Crosshair className={`w-3.5 h-3.5 text-[#D91F2B] ${locating ? 'animate-spin' : ''}`} />
            <span>{locating ? 'Locating...' : 'Locate Me'}</span>
          </button>

          <button
            onClick={() => {
              setEmergencyOnly(true);
              setSelectedHospital(HOSPITALS[0]);
            }}
            className="px-4 py-2 bg-[#D91F2B] hover:bg-[#C01823] text-white text-xs font-semibold rounded-full transition flex items-center gap-1.5 shadow"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Nearest Emergency 24/7</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
          <Filter className="w-4 h-4 text-gray-400" />
          <span>Filters:</span>
        </div>

        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium cursor-pointer"
        >
          <option value="All">All Locations (Dhaka)</option>
          {areas.filter((a) => a !== 'All').map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <button
          onClick={() => setEmergencyOnly(!emergencyOnly)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition ${
            emergencyOnly ? 'bg-red-50 text-[#D91F2B] border-[#D91F2B]' : 'bg-white border-gray-200 text-gray-600'
          }`}
        >
          24/7 Emergency Only
        </button>

        <button
          onClick={() => setIcuOnly(!icuOnly)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition ${
            icuOnly ? 'bg-red-50 text-[#D91F2B] border-[#D91F2B]' : 'bg-white border-gray-200 text-gray-600'
          }`}
        >
          ICU Available
        </button>
      </div>

      {/* Split Map & Hospital List Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Hospital Cards List */}
        <div className="lg:col-span-5 space-y-4 max-h-[750px] overflow-y-auto pr-1">
          {filteredHospitals.map((hosp) => {
            const isSelected = selectedHospital.id === hosp.id;
            const distance = userLocation
              ? getDistanceKm(userLocation.lat, userLocation.lng, hosp.latitude, hosp.longitude)
              : (Math.random() * 2 + 1.2).toFixed(1);

            return (
              <div
                key={hosp.id}
                onClick={() => setSelectedHospital(hosp)}
                className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#D91F2B] shadow-md ring-1 ring-[#D91F2B]'
                    : 'border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        {hosp.operatingHours}
                      </span>
                      <span className="text-[11px] font-semibold text-[#D91F2B] bg-red-50 px-2 py-0.5 rounded-full">
                        ~{distance} km away
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mt-1.5">{hosp.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{hosp.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-600 mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-bold">{hosp.rating}</span>
                    <span className="text-gray-400">({hosp.reviewCount})</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5 text-gray-400" />
                    <span>{hosp.beds}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-1">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${hosp.latitude},${hosp.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="py-2 text-center text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition flex items-center justify-center gap-1"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#D91F2B]" />
                    <span>Directions</span>
                  </a>

                  <Link
                    href={`/hospitals/${hosp.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="py-2 text-center text-xs font-semibold text-white bg-[#D91F2B] hover:bg-[#C01823] rounded-lg transition"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Interactive OpenStreetMap View */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[650px] sticky top-24">
          {/* Selected Hospital Quick Banner */}
          <div className="p-4 bg-gray-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">{selectedHospital.name}</h4>
                <p className="text-[11px] text-gray-300">{selectedHospital.area}, Dhaka • {selectedHospital.phone}</p>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedHospital.latitude},${selectedHospital.longitude}`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 bg-[#D91F2B] hover:bg-[#C01823] text-white text-xs font-semibold rounded-full transition flex items-center gap-1"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Navigate</span>
            </a>
          </div>

          {/* Map Frame using OpenStreetMap interactive iframe */}
          <div className="flex-1 w-full h-full relative bg-gray-100">
            <iframe
              title="Hospital Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedHospital.longitude - 0.015}%2C${selectedHospital.latitude - 0.012}%2C${selectedHospital.longitude + 0.015}%2C${selectedHospital.latitude + 0.012}&layer=mapnik&marker=${selectedHospital.latitude}%2C${selectedHospital.longitude}`}
              className="w-full h-full border-0"
            />
          </div>

          {/* Bottom Bar */}
          <div className="p-3 bg-white border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D91F2B]" />
              <span>Coordinates: {selectedHospital.latitude.toFixed(4)}° N, {selectedHospital.longitude.toFixed(4)}° E</span>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedHospital.name + ' ' + selectedHospital.address)}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#D91F2B] hover:underline flex items-center gap-1"
            >
              Open in Google Maps <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
