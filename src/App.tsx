/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryPillars } from './components/CategoryPillars';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CredentialsSection } from './components/CredentialsSection';
import { ContactSection } from './components/ContactSection';
import {
  CertificateModal,
  DocumentModal,
  ProjectModal,
} from './components/Modals';
import { ClayCursor } from './components/ClayCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import {
  CredentialItem,
  DocumentKey,
  ProjectCategory,
  ProjectItem,
} from './data/portfolioData';

export default function App() {
  const mainScrollRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(
    ProjectCategory.ALL
  );
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [selectedCredential, setSelectedCredential] =
    useState<CredentialItem | null>(null);
  const [activeDoc, setActiveDoc] = useState<DocumentKey | null>(null);

  const handleSelectCategoryAndScroll = (category: ProjectCategory) => {
    setActiveCategory(category);
    const el = document.getElementById('karya');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative h-dvh overflow-hidden">
      {/* Top Viewport Clay Scroll Progress Bar */}
      <ScrollProgressBar scrollContainerRef={mainScrollRef} />

      {/* Custom Magnetic 3D Clay Cursor */}
      <ClayCursor />

      {/* Main Scroll-Snap Container */}
      <div
        ref={mainScrollRef}
        className="clay-scroll-container h-dvh overflow-y-auto overflow-x-hidden flex flex-col"
      >
        {/* Floating White Clay Pill Navigation */}
        <Navbar onOpenDocument={(docKey) => setActiveDoc(docKey)} />

        {/* Major Snapping Sections */}
        <main className="flex-1">
          <HeroSection
            onSelectCategoryAndScroll={handleSelectCategoryAndScroll}
            onOpenDocument={(docKey) => setActiveDoc(docKey)}
          />

          <CategoryPillars
            onSelectCategoryAndScroll={handleSelectCategoryAndScroll}
          />

          <ProjectsSection
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onSelectProject={(project) => setSelectedProject(project)}
          />

          <ExperienceSection />

          <CredentialsSection
            onOpenDocument={(docKey) => setActiveDoc(docKey)}
            onSelectCredential={(cred) => setSelectedCredential(cred)}
          />

          <ContactSection />
        </main>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenDocument={(docKey) => setActiveDoc(docKey)}
      />

      {/* Certificate Document Overlay Modal */}
      <CertificateModal
        credential={selectedCredential}
        onSelectCredential={(cred) => setSelectedCredential(cred)}
        onClose={() => setSelectedCredential(null)}
      />

      {/* Native PDF Preview & Download Modal */}
      <DocumentModal
        docKey={activeDoc}
        onClose={() => setActiveDoc(null)}
      />
    </div>
  );
}
