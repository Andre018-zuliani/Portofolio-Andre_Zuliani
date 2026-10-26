import React from 'react';
import { Download } from 'lucide-react';
import { DocumentKey } from '../data/portfolioData';

interface NavbarProps {
  onOpenDocument: (docKey: DocumentKey) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDocument }) => {
  return (
    <div className="sticky top-4 z-40 px-4 sm:px-6 lg:px-8 pt-1">
      {/* Strictly adheres to 3-Zone Top Bar Contract inside floating white clay pill with light-blue shadow */}
      <header className="clay-nav-pill max-w-[1160px] mx-auto rounded-full px-5 sm:px-7 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#beranda"
          className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-[#191744] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C3AED] rounded-lg"
        >
          Andre Zuliani
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#3B3870]"
        >
          <a
            href="#tentang"
            className="hover:text-[#7C3AED] transition-colors underline-offset-8 hover:underline whitespace-nowrap shrink-0"
          >
            Tentang
          </a>
          <a
            href="#karya"
            className="hover:text-[#7C3AED] transition-colors underline-offset-8 hover:underline whitespace-nowrap shrink-0"
          >
            Karya
          </a>
          <a
            href="#pengalaman"
            className="hover:text-[#7C3AED] transition-colors underline-offset-8 hover:underline whitespace-nowrap shrink-0"
          >
            Pengalaman
          </a>
          <a
            href="#sertifikasi"
            className="hover:text-[#7C3AED] transition-colors underline-offset-8 hover:underline whitespace-nowrap shrink-0"
          >
            Sertifikasi
          </a>
          <a
            href="#kontak"
            className="hover:text-[#7C3AED] transition-colors underline-offset-8 hover:underline whitespace-nowrap shrink-0"
          >
            Kontak
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onOpenDocument('cv')}
            className="clay-btn-purple inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED]"
          >
            <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Lihat CV</span>
          </button>
        </div>
      </header>
    </div>
  );
};
