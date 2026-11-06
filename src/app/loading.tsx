import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-3 border-gray-200 border-t-[#D91F2B] rounded-full animate-spin" />
      <p className="text-xs font-medium text-gray-500">Loading ThetaCure...</p>
    </div>
  );
}
