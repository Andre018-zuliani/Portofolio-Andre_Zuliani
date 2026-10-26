import React, { useState } from 'react';
import { Eye, ExternalLink } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  CREDENTIALS,
  CredentialCategory,
  CredentialItem,
  DOCUMENTS,
  DocumentKey,
} from '../data/portfolioData';

interface CredentialsSectionProps {
  onOpenDocument: (docKey: DocumentKey) => void;
  onSelectCredential: (cred: CredentialItem) => void;
}

const CREDENTIAL_TABS: { id: CredentialCategory; label: string }[] = [
  { id: CredentialCategory.ALL, label: `Semua (${CREDENTIALS.length})` },
  { id: CredentialCategory.AI_CLOUD, label: 'Cloud, AI & Data' },
  { id: CredentialCategory.DEV_QA_NET, label: 'Dev, QA & Jaringan' },
  { id: CredentialCategory.DESIGN_LEAD, label: 'Desain, Bisnis & Kepemimpinan' },
];

function getCardStyle(theme: 'pink' | 'purple' | 'tosca'): string {
  switch (theme) {
    case 'pink':
      return 'clay-card-pink';
    case 'purple':
      return 'clay-card-purple';
    case 'tosca':
      return 'clay-card-tosca';
  }
}

export const CredentialsSection: React.FC<CredentialsSectionProps> = ({
  onOpenDocument,
  onSelectCredential,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<CredentialCategory>(
    CredentialCategory.ALL
  );

  const filteredCredentials =
    activeTab === CredentialCategory.ALL
      ? CREDENTIALS
      : CREDENTIALS.filter((item) => item.category === activeTab);

  return (
    <section
      id="sertifikasi"
      className="clay-snap-section min-h-[calc(100dvh-5.75rem)] max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-sm font-bold text-[#6D28D9] mb-1.5">
            Penghargaan & Sertifikasi Resmi
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-black text-[#191744] tracking-tight"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            Klik kartu mana pun untuk membuka{' '}
            <span className="text-[#6D28D9]">dokumen sertifikat asli.</span>
          </h2>
        </div>

        {/* Interactive Segmented Category Filter */}
        <div
          role="tablist"
          aria-label="Filter kategori sertifikasi"
          className="clay-recessed rounded-2xl p-1.5 inline-flex flex-wrap items-center gap-1.5 self-start lg:self-auto"
        >
          {CREDENTIAL_TABS.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer clay-interactive ${
                  isSelected
                    ? 'clay-btn-white text-[#191744]'
                    : 'text-[#4B487E] hover:text-[#191744]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Document Quick Vault (Real Uploaded CVs, Portfolio Deck & Hackathon PDF) */}
      <div className="clay-white rounded-[36px] p-6 sm:p-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <h3 className="font-display text-xl font-extrabold text-[#191744]">
            Berkas CV & Portofolio Lengkap
          </h3>
          <span className="text-xs font-semibold text-[#54508A]">
            Klik untuk membaca langsung di layar atau mengunduh PDF
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(DOCUMENTS) as DocumentKey[]).map((key) => {
            const doc = DOCUMENTS[key];
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => onOpenDocument(key)}
                className="clay-btn-white text-left rounded-[26px] p-4 sm:p-5 flex items-start gap-3.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D28D9]"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#E4ECFF] flex items-center justify-center text-2xl shrink-0">
                  <span role="img" aria-hidden="true">
                    {doc.emoji}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1.5">
                    <h4 className="font-display text-sm sm:text-base font-extrabold text-[#191744] truncate">
                      {doc.title}
                    </h4>
                    <ExternalLink
                      className="w-3.5 h-3.5 text-[#6D28D9] shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-xs text-[#4C4980] mt-1 leading-relaxed">
                    {doc.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clickable Toy-Box Colored Certificate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCredentials.map((cred, idx) => {
          const floatDuration = 4.0 + (idx % 4) * 0.4;
          const floatDelay = (idx % 5) * 0.35;
          const pageCount = cred.pages?.length ?? 2;

          return (
            <motion.div
              key={cred.id}
              layout={!prefersReducedMotion}
              animate={prefersReducedMotion ? undefined : { y: [0, -7, 0] }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: {
                        duration: floatDuration,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                        delay: floatDelay,
                      },
                      layout: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
                    }
              }
              className="h-full"
            >
              <motion.button
                type="button"
                onClick={() => onSelectCredential(cred)}
                whileHover={
                  prefersReducedMotion ? undefined : { scale: 1.02, y: -5 }
                }
                whileTap={
                  prefersReducedMotion ? undefined : { scale: 0.982, y: 2 }
                }
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                className={`${getCardStyle(
                  cred.theme
                )} group w-full h-full text-left rounded-[34px] p-6 sm:p-7 text-white flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#191744]`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="clay-emoji-pedestal w-15 h-15 rounded-[20px] flex items-center justify-center text-3xl shrink-0">
                      <span role="img" aria-hidden="true">
                        {cred.emoji}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-white/90 tabular-nums whitespace-nowrap">
                      {cred.year} ·{' '}
                      {cred.pages
                        ? `${pageCount} Lembar`
                        : 'Dokumen PDF'}
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-extrabold leading-snug mb-2">
                    {cred.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-white/85 mb-5">
                    {cred.issuer}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/25 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-white/95 tabular-nums truncate">
                    {cred.scoreOrDetail}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-white underline underline-offset-4 decoration-white/70 group-hover:decoration-white whitespace-nowrap shrink-0">
                    <Eye className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>Buka</span>
                  </span>
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
