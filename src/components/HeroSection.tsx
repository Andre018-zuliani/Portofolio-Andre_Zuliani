import React, { useState } from 'react';
import { ArrowDownRight, FileText } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  DocumentKey,
  HERO_METRICS,
  PROFILE_DATA,
  ProjectCategory,
} from '../data/portfolioData';

interface HeroSectionProps {
  onSelectCategoryAndScroll: (category: ProjectCategory) => void;
  onOpenDocument: (docKey: DocumentKey) => void;
}

type StudioMode = 'qa' | 'ai' | 'vr';

const STUDIO_MODES: Record<
  StudioMode,
  {
    label: string;
    emoji: string;
    cardTheme: string;
    title: string;
    caption: string;
    statLeft: string;
    statRight: string;
    filterTarget: ProjectCategory;
  }
> = {
  qa: {
    label: 'QA & Dev',
    emoji: '🧪',
    cardTheme: 'clay-card-tosca',
    title: 'Cypress, Playwright & K6',
    caption: 'Menguji 40 skenario transaksi & simulasi beban 500 Virtual Users tanpa kompromi.',
    statLeft: 'p95 185ms Normal',
    statRight: '95% Pass Rate',
    filterTarget: ProjectCategory.DEV,
  },
  ai: {
    label: 'AI & Data',
    emoji: '🤖',
    cardTheme: 'clay-card-purple',
    title: 'Azure AI-102 & Analitik',
    caption: 'Integrasi model bahasa isyarat real-time SiLa & riset 14.752 kampanye Kickstarter.',
    statLeft: 'Skor AI-900: 931',
    statRight: 'Skor AI-102: 854',
    filterTarget: ProjectCategory.AI,
  },
  vr: {
    label: 'Desain & PM',
    emoji: '🎨',
    cardTheme: 'clay-card-pink',
    title: 'VR 360° & Agile Scrum',
    caption: 'Merancang tur imersif laboratorium PT PLN & alur UI/UX–UAT bersama 35 stakeholder.',
    statLeft: '90% Skor Evaluasi',
    statRight: '6 Scrum Sprint',
    filterTarget: ProjectCategory.DESIGN,
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCategoryAndScroll,
  onOpenDocument,
}) => {
  const [activeStudio, setActiveStudio] = useState<StudioMode>('ai');
  const prefersReducedMotion = useReducedMotion();
  const currentMode = STUDIO_MODES[activeStudio];

  return (
    <section
      id="beranda"
      className="clay-snap-section min-h-[calc(100dvh-5.75rem)] flex flex-col justify-center max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-12"
    >
      {/* 2-Column Split Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left Column: Bold Navy & Purple Typography + Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <p className="text-sm sm:text-base font-bold text-[#5B4BC4] mb-3 tracking-normal">
            Halo, saya Andre Zuliani · Tangerang, Banten
          </p>

          <h1
            className="font-display font-black tracking-tight leading-[1.06] text-[clamp(2.35rem,4.6vw,4rem)] text-[#191744] mb-5"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {PROFILE_DATA.headlineNavy}{' '}
            <span className="text-[#6D28D9] block sm:inline">
              {PROFILE_DATA.headlinePurple}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#363366] leading-relaxed max-w-[60ch] mb-8 font-medium">
            {PROFILE_DATA.leadBio}
          </p>

          {/* Primary & Secondary Tactile Clay Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#karya"
              className="clay-btn-purple inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm sm:text-base font-bold text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D28D9]"
            >
              <span>Jelajahi Karya</span>
              <ArrowDownRight className="w-5 h-5 shrink-0" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => onOpenDocument('portfolio')}
              className="clay-btn-white inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm sm:text-base font-bold text-[#191744] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D28D9]"
            >
              <FileText className="w-4 h-4 text-[#6D28D9] shrink-0" aria-hidden="true" />
              <span>Buka Dek Portofolio</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive 3D Soft Clay Toy Console & Character Showcase */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="clay-white rounded-[40px] p-6 sm:p-7 h-full flex flex-col justify-between">
            {/* Top Sculpted 3D Clay Character + Floating Toy Elements */}
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-4">
                {/* Custom 3D Soft Clay Avatar SVG */}
                <motion.div
                  animate={
                    prefersReducedMotion ? undefined : { y: [0, -5, 0] }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : {
                          duration: 3.6,
                          repeat: Infinity,
                          repeatType: 'mirror',
                          ease: 'easeInOut',
                        }
                  }
                  className="w-20 h-20 rounded-[26px] shrink-0 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(155deg, #c7d7ff 0%, #93b4ff 100%)',
                    boxShadow:
                      '0 12px 24px -6px rgba(96, 135, 255, 0.42), inset 0 4px 8px rgba(255,255,255,0.75), inset 0 -5px 10px rgba(59, 92, 204, 0.25)',
                  }}
                >
                  <svg
                    viewBox="0 0 120 120"
                    className="w-18 h-18"
                    role="img"
                    aria-label="Ilustrasi 3D clay Andre Zuliani"
                  >
                    <defs>
                      <radialGradient id="claySkin" cx="38%" cy="32%" r="65%">
                        <stop offset="0%" stopColor="#FFE0C8" />
                        <stop offset="68%" stopColor="#F3B893" />
                        <stop offset="100%" stopColor="#D99268" />
                      </radialGradient>
                      <radialGradient id="clayHair" cx="35%" cy="25%" r="70%">
                        <stop offset="0%" stopColor="#3B3561" />
                        <stop offset="100%" stopColor="#191736" />
                      </radialGradient>
                      <linearGradient id="clayHoodie" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#5B21B6" />
                      </linearGradient>
                    </defs>
                    {/* Hoodie Shoulders */}
                    <path
                      d="M20 118 C22 88, 98 88, 100 118 Z"
                      fill="url(#clayHoodie)"
                    />
                    {/* Hoodie Collar Strings */}
                    <rect x="49" y="95" width="4" height="16" rx="2" fill="#EDE9FE" />
                    <rect x="67" y="95" width="4" height="16" rx="2" fill="#EDE9FE" />
                    {/* Neck */}
                    <rect x="50" y="74" width="20" height="16" rx="8" fill="url(#claySkin)" />
                    {/* Ears */}
                    <circle cx="31" cy="58" r="8" fill="url(#claySkin)" />
                    <circle cx="89" cy="58" r="8" fill="url(#claySkin)" />
                    {/* Head */}
                    <rect x="33" y="30" width="54" height="52" rx="26" fill="url(#claySkin)" />
                    {/* Soft Clay Hair */}
                    <path
                      d="M31 48 C30 24, 52 16, 68 20 C84 20, 92 32, 89 48 C83 37, 69 34, 55 36 C43 37, 36 42, 31 48 Z"
                      fill="url(#clayHair)"
                    />
                    {/* Friendly Eyes */}
                    <circle cx="48" cy="54" r="4.2" fill="#191744" />
                    <circle cx="46.8" cy="52.6" r="1.4" fill="#FFFFFF" />
                    <path
                      d="M67 54 Q72 49 77 54"
                      stroke="#191744"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Warm Cheek Blush */}
                    <ellipse cx="42" cy="63" rx="5" ry="2.8" fill="#FB7185" opacity="0.45" />
                    <ellipse cx="78" cy="63" rx="5" ry="2.8" fill="#FB7185" opacity="0.45" />
                    {/* Smile */}
                    <path
                      d="M51 66 Q60 73 69 66"
                      stroke="#191744"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </motion.div>

                <div>
                  <h2 className="font-display text-xl font-extrabold text-[#191744]">
                    Kotak Mainan Digital
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4B487E] font-medium">
                    Pilih fokus keahlian untuk mengintip sorotan
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Segmented Mode Switcher (Functional Buttons) */}
            <div
              role="tablist"
              aria-label="Pilih fokus keahlian Andre"
              className="clay-recessed rounded-2xl p-1.5 grid grid-cols-3 gap-1.5 mb-5"
            >
              {(Object.keys(STUDIO_MODES) as StudioMode[]).map((key) => {
                const item = STUDIO_MODES[key];
                const isSelected = activeStudio === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveStudio(key)}
                    className={`rounded-xl py-2 px-3 text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer clay-interactive ${
                      isSelected
                        ? 'clay-btn-white text-[#191744]'
                        : 'text-[#4B487E] hover:text-[#191744]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Toy Card Preview matching selected category color (Pink / Purple / Tosca) with Continuous Floating */}
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, -6, 0], rotate: [0, 0.35, 0, -0.35, 0] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 4.1,
                      repeat: Infinity,
                      repeatType: 'mirror',
                      ease: 'easeInOut',
                    }
              }
            >
              <motion.button
                type="button"
                onClick={() => onSelectCategoryAndScroll(currentMode.filterTarget)}
                whileHover={
                  prefersReducedMotion ? undefined : { scale: 1.018, y: -3 }
                }
                whileTap={
                  prefersReducedMotion ? undefined : { scale: 0.985, y: 1 }
                }
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                className={`${currentMode.cardTheme} w-full text-left rounded-[30px] p-6 text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191744]`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="clay-emoji-pedestal w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                    <span role="img" aria-hidden="true">
                      {currentMode.emoji}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-white/90 whitespace-nowrap">
                    Klik untuk filter karya →
                  </span>
                </div>

                <h3 className="font-display text-xl font-extrabold mb-1.5">
                  {currentMode.title}
                </h3>
                <p className="text-sm text-white/95 leading-relaxed mb-4">
                  {currentMode.caption}
                </p>

                {/* Unboxed Metadata with Typographic Separator */}
                <div className="pt-3 border-t border-white/25 flex items-center gap-2 text-xs font-bold text-white/95 tabular-nums">
                  <span>{currentMode.statLeft}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentMode.statRight}</span>
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Quantitative Proof Row Below Hero Split */}
      <div className="mt-8 clay-white rounded-[34px] px-6 py-6 sm:px-8 sm:py-7">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {HERO_METRICS.map((metric, idx) => (
            <div
              key={metric.value}
              className={`${
                idx > 0 ? 'lg:border-l lg:border-[#D6E1FF] lg:pl-7' : ''
              }`}
            >
              <div className="font-display text-2xl sm:text-3xl font-black text-[#191744] tabular-nums tracking-tight mb-1">
                {metric.value}
              </div>
              <p className="text-xs sm:text-sm font-medium text-[#47447A] leading-snug">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
