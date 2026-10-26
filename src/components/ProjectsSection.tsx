import React from 'react';
import { ArrowUpRight, ExternalLink, Play } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  PROJECTS,
  ProjectCategory,
  ProjectItem,
} from '../data/portfolioData';

interface ProjectsSectionProps {
  activeCategory: ProjectCategory;
  onCategoryChange: (cat: ProjectCategory) => void;
  onSelectProject: (project: ProjectItem) => void;
}

const FILTER_TABS: { id: ProjectCategory; label: string }[] = [
  { id: ProjectCategory.ALL, label: `Semua Karya (${PROJECTS.length})` },
  { id: ProjectCategory.DESIGN, label: 'Desain, VR & Mobile' },
  { id: ProjectCategory.AI, label: 'AI & Data' },
  { id: ProjectCategory.DEV, label: 'Dev & QA' },
];

function getCardClayClass(cat: ProjectItem['category']): string {
  switch (cat) {
    case ProjectCategory.DESIGN:
      return 'clay-card-pink';
    case ProjectCategory.AI:
      return 'clay-card-purple';
    case ProjectCategory.DEV:
      return 'clay-card-tosca';
  }
}

function getBentoSpanClass(isAllTab: boolean, idx: number): string {
  if (!isAllTab) return '';
  if (idx === 0) return 'md:col-span-2 lg:col-span-2';
  if (idx === 3 || idx === 8) return 'lg:col-span-2';
  return '';
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  activeCategory,
  onCategoryChange,
  onSelectProject,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects =
    activeCategory === ProjectCategory.ALL
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const isAllTab = activeCategory === ProjectCategory.ALL;

  return (
    <section
      id="karya"
      className="clay-snap-section min-h-[calc(100dvh-5.75rem)] max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
    >
      {/* Header & Interactive Segmented Clay Filter */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-sm font-bold text-[#6D28D9] mb-1.5">
            Karya Interaktif & Studi Kasus
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-black text-[#191744] tracking-tight"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            Klik kartu untuk mencoba langsung{' '}
            <span className="text-[#6D28D9]">karya nyata di layar.</span>
          </h2>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div
          role="tablist"
          aria-label="Filter kategori karya"
          className="clay-recessed rounded-2xl p-1.5 inline-flex flex-wrap sm:flex-nowrap items-center gap-1.5 self-start lg:self-auto"
        >
          {FILTER_TABS.map((tab) => {
            const isSelected = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onCategoryChange(tab.id)}
                className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer clay-interactive ${
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

      {/* Dynamic Bento / Toy-Box Clay Grid with Continuous Floating Motion */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredProjects.map((project, idx) => {
          const spanClass = getBentoSpanClass(isAllTab, idx);
          const isWideCard = Boolean(spanClass);
          const floatDuration = 3.9 + (idx % 4) * 0.45;
          const floatDelay = (idx % 5) * 0.38;
          const floatAmplitude = isWideCard ? -7 : -9;
          const subtleTilt = idx % 2 === 0 ? 0.45 : -0.45;
          const primaryLiveLink = project.liveLinks?.[0];

          return (
            <motion.div
              key={project.id}
              layout={!prefersReducedMotion}
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: [0, floatAmplitude, 0],
                      rotate: [0, subtleTilt, 0, -subtleTilt * 0.5, 0],
                    }
              }
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
                      rotate: {
                        duration: floatDuration * 1.15,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                        delay: floatDelay,
                      },
                      layout: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                    }
              }
              className={`h-full ${spanClass}`}
            >
              <motion.div
                role="button"
                tabIndex={0}
                onClick={() => onSelectProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(project);
                  }
                }}
                whileHover={
                  prefersReducedMotion ? undefined : { scale: 1.018, y: -5 }
                }
                whileTap={
                  prefersReducedMotion ? undefined : { scale: 0.985, y: 2 }
                }
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                className={`${getCardClayClass(
                  project.category
                )} group w-full h-full text-left rounded-[40px] p-7 sm:p-8 text-white flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#191744]`}
              >
                <div>
                  {/* Top Corner Large Emoji Pedestal + Unboxed Category Kicker */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <motion.div
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { y: [0, -4, 0], scale: [1, 1.04, 1] }
                      }
                      transition={
                        prefersReducedMotion
                          ? undefined
                          : {
                              duration: floatDuration * 0.85,
                              repeat: Infinity,
                              repeatType: 'mirror',
                              ease: 'easeInOut',
                              delay: floatDelay + 0.2,
                            }
                      }
                      className="clay-emoji-pedestal w-20 h-20 rounded-[26px] flex items-center justify-center text-[2.6rem] shrink-0"
                    >
                      <span role="img" aria-hidden="true">
                        {project.emoji}
                      </span>
                    </motion.div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-white/90 whitespace-nowrap">
                        {project.categoryLabel} · {project.year}
                      </span>
                      <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight
                          className="w-5 h-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>

                  {/* Card Title & Subtitle */}
                  <h3
                    className={`font-display font-extrabold tracking-tight mb-2 ${
                      isWideCard
                        ? 'text-2xl sm:text-3xl'
                        : 'text-xl sm:text-2xl'
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-white/85 mb-3">
                    {project.role} · {project.organization}
                  </p>

                  <p
                    className={`text-sm sm:text-[15px] text-white/95 leading-relaxed mb-6 ${
                      isWideCard ? 'max-w-[64ch]' : ''
                    }`}
                  >
                    {project.summary}
                  </p>
                </div>

                {/* Bottom Action & Metrics Row */}
                <div className="pt-4 border-t border-white/25 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-white/95 tabular-nums">
                  {primaryLiveLink ? (
                    <>
                      <span className="inline-flex items-center gap-2 text-white">
                        <Play
                          className="w-3.5 h-3.5 fill-current shrink-0"
                          aria-hidden="true"
                        />
                        <span className="underline underline-offset-4 decoration-white/70 group-hover:decoration-white">
                          Pratinjau Karya & Studi Kasus
                        </span>
                      </span>

                      <a
                        href={primaryLiveLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/24 hover:bg-white/34 px-3.5 py-1.5 text-xs font-extrabold text-white transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Buka Live</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </>
                  ) : (
                    <>
                      <div>
                        {project.metrics
                          .slice(0, 2)
                          .map((m) => `${m.value} ${m.label}`)
                          .join(' · ')}
                      </div>
                      <span className="underline underline-offset-4 decoration-white/60 group-hover:decoration-white whitespace-nowrap shrink-0">
                        Baca Studi Kasus
                      </span>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
