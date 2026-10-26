import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EDUCATION_LIST, EXPERIENCES } from '../data/portfolioData';

function getAccentEmojiBg(theme: 'pink' | 'purple' | 'tosca'): string {
  switch (theme) {
    case 'pink':
      return 'clay-card-pink';
    case 'purple':
      return 'clay-card-purple';
    case 'tosca':
      return 'clay-card-tosca';
  }
}

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="pengalaman"
      className="clay-snap-section min-h-[calc(100dvh-5.75rem)] max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
    >
      {/* Section Heading */}
      <div className="mb-10">
        <p className="text-sm font-bold text-[#6D28D9] mb-1.5">
          Rekam Jejak Profesional & Akademik
        </p>
        <h2
          className="font-display text-3xl sm:text-4xl font-black text-[#191744] tracking-tight"
          style={{ textWrap: 'balance' } as React.CSSProperties}
        >
          Pengalaman lintas QA, manajemen proyek BUMN,{' '}
          <span className="text-[#6D28D9]">dan riset imersif.</span>
        </h2>
      </div>

      {/* Professional Experience Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-12">
        {EXPERIENCES.map((exp) => (
          <article
            key={exp.id}
            className="clay-white rounded-[38px] p-7 sm:p-8 flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Colored Clay Emoji Toy Block + Period Metadata */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div
                  className={`${getAccentEmojiBg(
                    exp.theme
                  )} w-16 h-16 rounded-[22px] flex items-center justify-center text-3xl shrink-0`}
                >
                  <span role="img" aria-hidden="true">
                    {exp.emoji}
                  </span>
                </div>
                <div className="text-right text-xs font-bold text-[#524E8A] tabular-nums">
                  <div>{exp.period}</div>
                  <div className="font-medium text-[#6B679E] mt-0.5">
                    {exp.location}
                  </div>
                </div>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#191744] mb-1">
                {exp.role}
              </h3>
              <p className="text-sm font-bold text-[#6D28D9] mb-4">
                {exp.company}
              </p>

              <p className="text-sm sm:text-[15px] text-[#363366] leading-relaxed mb-5">
                {exp.summary}
              </p>

              <ul className="space-y-2.5 text-sm text-[#434073] mb-6">
                {exp.achievements.map((point) => (
                  <li key={point} className="leading-relaxed">
                    • {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#DCE5FF] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-[#191744] tabular-nums">
                {exp.metrics}
              </span>

              {exp.links && exp.links.length > 0 && (
                <div className="flex flex-wrap items-center gap-3">
                  {exp.links.map((lnk) => (
                    <a
                      key={lnk.url}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-[#6D28D9] hover:text-[#4C1D95] underline underline-offset-4"
                    >
                      <span>{lnk.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Academic Background Strip */}
      <div className="clay-white rounded-[38px] p-7 sm:p-9">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7 pb-5 border-b border-[#DCE5FF]">
          <div>
            <p className="text-xs font-bold text-[#6D28D9] mb-1">
              Fondasi Pendidikan
            </p>
            <h3 className="font-display text-2xl font-extrabold text-[#191744]">
              Latar Belakang Akademik & Studi Independen
            </h3>
          </div>
          <span className="text-xs sm:text-sm font-bold text-[#47447A] tabular-nums">
            2021 – 2025 · Lulusan Cum Laude
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EDUCATION_LIST.map((edu, index) => (
            <div
              key={edu.degree}
              className={`${
                index > 0 ? 'md:border-l md:border-[#DCE5FF] md:pl-8' : ''
              }`}
            >
              <p className="text-xs font-bold text-[#5B4BC4] tabular-nums mb-1.5">
                {edu.period} · {edu.badge}
              </p>
              <h4 className="font-display text-xl font-extrabold text-[#191744] mb-1">
                {edu.degree}
              </h4>
              <p className="text-sm font-semibold text-[#363366] mb-3">
                {edu.institution}
              </p>
              <p className="text-sm text-[#49467C] leading-relaxed">
                {edu.details}
              </p>
              {edu.link && (
                <a
                  href={edu.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-xs font-extrabold text-[#6D28D9] hover:text-[#4C1D95] underline underline-offset-4"
                >
                  <span>{edu.link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
