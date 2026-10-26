import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { CATEGORY_PILLARS, ProjectCategory } from '../data/portfolioData';

interface CategoryPillarsProps {
  onSelectCategoryAndScroll: (category: ProjectCategory) => void;
}

export const CategoryPillars: React.FC<CategoryPillarsProps> = ({
  onSelectCategoryAndScroll,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="tentang"
      className="clay-snap-section min-h-[calc(100dvh-5.75rem)] flex flex-col justify-center max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
        <div>
          <p className="text-sm font-bold text-[#6D28D9] mb-1.5">
            Tiga Pilar Keahlian Utama
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-black text-[#191744] tracking-tight"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            Kombinasi desain imersif, kecerdasan buatan,{' '}
            <span className="text-[#6D28D9]">dan rekayasa mutu.</span>
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#444175] max-w-[44ch] font-medium">
          Berangkat dari fondasi Teknik Informatika dan manajemen proyek TI, setiap solusi dibangun agar menyenangkan dipakai sekaligus tangguh di balik layar.
        </p>
      </div>

      {/* Toy-Box Trio: Pink (Desain), Purple (AI), Tosca (Dev/QA) with continuous subtle Framer Motion floating */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {CATEGORY_PILLARS.map((pillar, index) => {
          const floatDuration = 3.8 + index * 0.45;
          const floatDelay = index * 0.55;
          const tiltDirection = index % 2 === 0 ? 0.55 : -0.55;

          return (
            <motion.div
              key={pillar.id}
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: [0, -9, 0],
                      rotate: [0, tiltDirection, 0, -tiltDirection * 0.6, 0],
                    }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: floatDuration,
                      repeat: Infinity,
                      repeatType: 'mirror',
                      ease: 'easeInOut',
                      delay: floatDelay,
                    }
              }
              className="h-full"
            >
              <motion.button
                type="button"
                onClick={() => onSelectCategoryAndScroll(pillar.id)}
                whileHover={
                  prefersReducedMotion ? undefined : { scale: 1.022, y: -5 }
                }
                whileTap={
                  prefersReducedMotion ? undefined : { scale: 0.98, y: 2 }
                }
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                className={`${pillar.clayClass} group w-full h-full text-left rounded-[38px] p-7 sm:p-8 text-white flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#191744]`}
              >
                <div>
                  {/* Large Emoji Visual Anchor at Top Corner with subtle secondary bob */}
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
                              delay: floatDelay + 0.25,
                            }
                      }
                      className="clay-emoji-pedestal w-18 h-18 rounded-[24px] flex items-center justify-center text-4xl shrink-0"
                    >
                      <span role="img" aria-hidden="true">
                        {pillar.emoji}
                      </span>
                    </motion.div>
                    <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="w-5 h-5 text-white" aria-hidden="true" />
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-extrabold tracking-tight mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-white/95 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Clean Unboxed Metadata */}
                <div className="pt-4 border-t border-white/25 text-xs font-bold text-white/90">
                  {pillar.meta}
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
