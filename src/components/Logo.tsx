import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSlogan?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showSlogan = false, className = '' }: LogoProps) {
  const heights = {
    sm: 32,
    md: 40,
    lg: 56,
  };

  const h = heights[size];
  const w = Math.round(h * 5.25);

  return (
    <Link href="/" className={`inline-flex flex-col group select-none ${className}`}>
      <div className="relative flex items-center transition-transform duration-200 group-hover:scale-[1.02]">
        <Image
          src="/images/thetacure_logo_horizontal_clean.png"
          alt="ThetaCure — Healthcare for Everyone"
          width={w}
          height={h}
          priority
          className="object-contain"
          style={{ height: `${h}px`, width: 'auto' }}
        />
      </div>

      {showSlogan && (
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[12px] font-medium text-gray-500 italic">
            For the Ones You Love. For the Care They Deserve.
          </span>
          <span className="h-px bg-red-200 flex-1" />
        </div>
      )}
    </Link>
  );
}
