import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  Play,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  CREDENTIALS,
  CredentialItem,
  DOCUMENTS,
  DocumentKey,
  ProjectCategory,
  ProjectItem,
} from '../data/portfolioData';
import { PdfCanvasViewer } from './PdfCanvasViewer';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenDocument: (docKey: DocumentKey) => void;
}

function getHeaderBannerClass(cat: ProjectItem['category']): string {
  switch (cat) {
    case ProjectCategory.DESIGN:
      return 'clay-card-pink';
    case ProjectCategory.AI:
      return 'clay-card-purple';
    case ProjectCategory.DEV:
      return 'clay-card-tosca';
  }
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenDocument,
}) => {
  const hasLiveLinks = Boolean(project?.liveLinks && project.liveLinks.length > 0);
  const [activeTab, setActiveTab] = useState<'preview' | 'case_study'>('preview');
  const [liveLinkIdx, setLiveLinkIdx] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    if (!project) return;
    const hasLinks = Boolean(project.liveLinks && project.liveLinks.length > 0);
    setActiveTab(hasLinks ? 'preview' : 'case_study');
    setLiveLinkIdx(0);
    setIframeLoading(true);
  }, [project?.id]);

  useEffect(() => {
    setIframeLoading(true);
  }, [liveLinkIdx, activeTab]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const activeLiveLink = hasLiveLinks
    ? project.liveLinks![liveLinkIdx] ?? project.liveLinks![0]
    : null;

  const secondaryEmbedIndex = hasLiveLinks
    ? project.liveLinks!.findIndex((lnk, i) => i !== liveLinkIdx && Boolean(lnk.embedUrl))
    : -1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#191744]/55 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`clay-white w-full ${
          hasLiveLinks
            ? 'max-w-5xl h-[92vh] flex flex-col'
            : 'max-w-2xl max-h-[90vh] overflow-y-auto my-auto'
        } rounded-[38px] p-4 sm:p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Colored Clay Header Banner */}
        <div
          className={`${getHeaderBannerClass(
            project.category
          )} rounded-[28px] p-5 sm:p-6 text-white mb-4 shrink-0`}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0 flex-1">
              <div className="clay-emoji-pedestal w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] flex items-center justify-center text-3xl sm:text-4xl shrink-0">
                <span role="img" aria-hidden="true">
                  {project.emoji}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white/90 mb-0.5">
                  {project.categoryLabel} · {project.organization} · {project.year}
                </p>
                <h3
                  id="modal-project-title"
                  className="font-display text-xl sm:text-2xl font-black leading-tight"
                >
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-white/90 mt-0.5">
                  {project.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {activeLiveLink && (
                <a
                  href={activeLiveLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#191744] hover:bg-[#F4F7FF] px-4 py-2 text-xs font-extrabold shadow-sm transition-transform hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <span>Buka di Tab Baru</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6D28D9]" aria-hidden="true" />
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup detail karya"
                className="w-10 h-10 rounded-full bg-white/25 hover:bg-white/35 flex items-center justify-center text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs when Live Links Exist */}
          {hasLiveLinks && (
            <div className="mt-4 pt-3.5 border-t border-white/25 flex flex-wrap items-center justify-between gap-3">
              <div
                role="tablist"
                aria-label="Mode tampilan karya"
                className="inline-flex items-center gap-1.5 rounded-2xl bg-black/15 p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'preview'}
                  onClick={() => setActiveTab('preview')}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-extrabold cursor-pointer transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-white text-[#191744]'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                  <span>Pratinjau Karya Live</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'case_study'}
                  onClick={() => setActiveTab('case_study')}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-extrabold cursor-pointer transition-colors ${
                    activeTab === 'case_study'
                      ? 'bg-white text-[#191744]'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Studi Kasus & Metrik</span>
                </button>
              </div>

              {/* Multi-link Switcher (e.g., 360 VR Tour vs Lab VR Portal) */}
              {project.liveLinks!.length > 1 && activeTab === 'preview' && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.liveLinks!.map((lnk, idx) => (
                    <button
                      key={lnk.url}
                      type="button"
                      onClick={() => setLiveLinkIdx(idx)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                        liveLinkIdx === idx
                          ? 'bg-white text-[#191744]'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {idx + 1}. {lnk.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* BODY: EITHER LIVE INTERACTIVE PREVIEW OR CASE STUDY */}
        {hasLiveLinks && activeTab === 'preview' && activeLiveLink ? (
          <div className="flex-1 min-h-0 flex flex-col rounded-[26px] bg-[#DCE6FF] border border-[#C6D5FF] overflow-hidden">
            {activeLiveLink.embedUrl ? (
              <div className="relative flex-1 min-h-0 bg-white">
                {iframeLoading && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#EEF3FF]">
                    <Loader2
                      className="w-8 h-8 text-[#6D28D9] animate-spin"
                      aria-hidden="true"
                    />
                    <p className="text-xs sm:text-sm font-bold text-[#363366]">
                      Memuat pratinjau langsung {activeLiveLink.label}...
                    </p>
                  </div>
                )}

                <iframe
                  key={activeLiveLink.embedUrl}
                  src={activeLiveLink.embedUrl}
                  title={`${project.title} — ${activeLiveLink.label}`}
                  allow="camera; microphone; fullscreen; xr-spatial-tracking; accelerometer; gyroscope; autoplay"
                  allowFullScreen
                  onLoad={() => setIframeLoading(false)}
                  className="w-full h-full border-0 block bg-white"
                />
              </div>
            ) : (
              /* Custom 360° VR Spatial Launchpad (Prevents Cloudflare X-Frame-Options Blocked Frame) */
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex items-center justify-center">
                <div className="clay-white max-w-xl w-full rounded-[32px] p-6 sm:p-8 text-center">
                  <div className="w-20 h-20 rounded-[26px] clay-card-pink text-white text-4xl flex items-center justify-center mx-auto mb-5">
                    <Compass className="w-10 h-10" aria-hidden="true" />
                  </div>

                  <p className="text-xs font-extrabold text-[#6D28D9] mb-1.5">
                    Pengalaman Spasial Interaktif 360°
                  </p>
                  <h4 className="font-display text-2xl font-black text-[#191744] mb-3">
                    {activeLiveLink.label}
                  </h4>
                  <p className="text-sm text-[#434073] leading-relaxed mb-6">
                    {activeLiveLink.note ??
                      'Aplikasi tur virtual 360° ini menggunakan engine panorama WebGL layar penuh agar Anda dapat memutar sudut pandang ruangan laboratorium dan mengeksplorasi titik peralatan secara leluasa.'}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={activeLiveLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clay-btn-purple inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-extrabold text-white"
                    >
                      <span>Mulai Tur Virtual 360° Sekarang</span>
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>

                    {secondaryEmbedIndex >= 0 && (
                      <button
                        type="button"
                        onClick={() => setLiveLinkIdx(secondaryEmbedIndex)}
                        className="clay-btn-white inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-xs sm:text-sm font-extrabold text-[#191744] cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 text-[#6D28D9] fill-current" aria-hidden="true" />
                        <span>
                          Lihat {project.liveLinks![secondaryEmbedIndex].label}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Helper Bar */}
            <div className="px-4 py-2.5 bg-white/90 border-t border-[#C6D5FF] flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-[#47447A] truncate">
                {activeLiveLink.note ??
                  `Menampilkan karya asli: ${activeLiveLink.label}`}
              </span>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('case_study')}
                  className="font-extrabold text-[#6D28D9] hover:text-[#4C1D95] underline underline-offset-4 cursor-pointer"
                >
                  Baca Studi Kasus Lengkap
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={hasLiveLinks ? 'flex-1 overflow-y-auto pr-1' : ''}>
            {/* Metrics Strip */}
            <div className="clay-recessed rounded-[24px] p-4 sm:p-5 grid grid-cols-3 gap-4 mb-6 text-center">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-display text-lg sm:text-xl font-black text-[#191744] tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-[#4D4982] mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Case Study Content */}
            <div className="space-y-5 px-1">
              <div>
                <h4 className="font-display text-base font-extrabold text-[#191744] mb-1.5">
                  Tantangan & Konteks
                </h4>
                <p className="text-sm sm:text-[15px] text-[#363366] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div>
                <h4 className="font-display text-base font-extrabold text-[#191744] mb-1.5">
                  Solusi & Eksekusi Peran ({project.role})
                </h4>
                <p className="text-sm sm:text-[15px] text-[#363366] leading-relaxed">
                  {project.solution}
                </p>
              </div>

              <div>
                <h4 className="font-display text-base font-extrabold text-[#191744] mb-2">
                  Sorotan Dampak Utama
                </h4>
                <ul className="space-y-2 text-sm text-[#3E3B70]">
                  {project.highlights.map((item) => (
                    <li key={item} className="leading-relaxed">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#DCE5FF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs font-bold text-[#524E8A]">
                  Perangkat & Metode: {project.tools.join(' · ')}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  {activeLiveLink && (
                    <a
                      href={activeLiveLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clay-btn-white inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-extrabold text-[#191744] whitespace-nowrap"
                    >
                      <span>Buka Karya Live</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#6D28D9]" aria-hidden="true" />
                    </a>
                  )}

                  {project.documentRef && (
                    <button
                      type="button"
                      onClick={() => {
                        const ref = project.documentRef!;
                        onClose();
                        onOpenDocument(ref);
                      }}
                      className="clay-btn-purple inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-white whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <FileText className="w-4 h-4" aria-hidden="true" />
                      <span>Lihat Bukti di Dokumen</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface CertificateModalProps {
  credential: CredentialItem | null;
  onSelectCredential: (cred: CredentialItem) => void;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  credential,
  onSelectCredential,
  onClose,
}) => {
  const [pageIdx, setPageIdx] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [imgFailed, setImgFailed] = useState(false);
  const [downloadState, setDownloadState] = useState<
    'idle' | 'downloading' | 'done'
  >('idle');

  useEffect(() => {
    setPageIdx(0);
    setZoom(1);
    setImgFailed(false);
    setDownloadState('idle');
  }, [credential?.id]);

  useEffect(() => {
    setImgFailed(false);
  }, [pageIdx]);

  useEffect(() => {
    if (!credential) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [credential, onClose]);

  if (!credential) return null;

  const currentCredIndex = CREDENTIALS.findIndex((c) => c.id === credential.id);
  const prevCred =
    currentCredIndex > 0
      ? CREDENTIALS[currentCredIndex - 1]
      : CREDENTIALS[CREDENTIALS.length - 1];
  const nextCred =
    currentCredIndex < CREDENTIALS.length - 1
      ? CREDENTIALS[currentCredIndex + 1]
      : CREDENTIALS[0];

  const hasImagePages = Boolean(credential.pages && credential.pages.length > 0);
  const activePage = hasImagePages ? credential.pages![pageIdx] : null;
  const downloadTargetUrl =
    credential.pdfUrl ?? activePage?.imageUrl ?? '';

  const handleDownload = async () => {
    if (!downloadTargetUrl || downloadState === 'downloading') return;
    setDownloadState('downloading');
    try {
      const response = await fetch(downloadTargetUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = credential.downloadFileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
      setDownloadState('done');
      setTimeout(() => setDownloadState('idle'), 2000);
    } catch {
      const fallbackLink = document.createElement('a');
      fallbackLink.href = downloadTargetUrl;
      fallbackLink.download = credential.downloadFileName;
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      fallbackLink.remove();
      setDownloadState('idle');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-cert-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#191744]/55 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="clay-white w-full max-w-4xl rounded-[36px] p-4 sm:p-6 flex flex-col h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-3 border-b border-[#DCE5FF]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-[#E4ECFF] flex items-center justify-center text-2xl shrink-0">
              <span role="img" aria-hidden="true">
                {credential.emoji}
              </span>
            </div>
            <div className="min-w-0">
              <h3
                id="modal-cert-title"
                className="font-display text-base sm:text-xl font-extrabold text-[#191744] truncate"
              >
                {credential.title}
              </h3>
              <p className="text-xs font-medium text-[#524E8A] truncate">
                {credential.issuer} · {credential.year} · {credential.scoreOrDetail}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownload}
              className="clay-btn-purple inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs font-bold text-white whitespace-nowrap cursor-pointer"
            >
              {downloadState === 'downloading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Mengunduh...</span>
                </>
              ) : downloadState === 'done' ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Tersimpan</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Unduh Dokumen</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup dokumen sertifikat"
              className="clay-btn-white w-10 h-10 rounded-full flex items-center justify-center text-[#191744] cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Viewer Body: High-Res Image Pages OR PDF Canvas */}
        {hasImagePages && activePage ? (
          <div className="flex flex-col flex-1 min-h-0 rounded-[26px] bg-[#DCE6FF] border border-[#C6D5FF] overflow-hidden">
            {/* Multi-Page Switcher & Zoom Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-white/85 backdrop-blur-sm border-b border-[#C6D5FF]">
              <div className="flex flex-wrap items-center gap-1.5">
                {credential.pages!.length > 1 ? (
                  credential.pages!.map((pg, idx) => (
                    <button
                      key={pg.imageUrl}
                      type="button"
                      onClick={() => setPageIdx(idx)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                        pageIdx === idx
                          ? 'bg-[#6D28D9] text-white'
                          : 'bg-[#E8EEFF] text-[#3B3870] hover:bg-[#DCE6FF]'
                      }`}
                    >
                      {idx + 1}. {pg.label}
                    </button>
                  ))
                ) : (
                  <span className="text-xs font-bold text-[#3B3870]">
                    {activePage.label}
                  </span>
                )}
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setZoom((z) => Math.max(0.6, Number((z - 0.25).toFixed(2))))
                  }
                  disabled={zoom <= 0.6}
                  aria-label="Perkecil gambar sertifikat"
                  className="clay-btn-white w-8 h-8 rounded-full flex items-center justify-center text-[#191744] disabled:opacity-45 cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" aria-hidden="true" />
                </button>

                <span className="text-xs font-extrabold text-[#191744] tabular-nums px-2 min-w-[3.5rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setZoom((z) => Math.min(2.25, Number((z + 0.25).toFixed(2))))
                  }
                  disabled={zoom >= 2.25}
                  aria-label="Perbesar gambar sertifikat"
                  className="clay-btn-white w-8 h-8 rounded-full flex items-center justify-center text-[#191744] disabled:opacity-45 cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" aria-hidden="true" />
                </button>

                {zoom !== 1 && (
                  <button
                    type="button"
                    onClick={() => setZoom(1)}
                    className="clay-btn-white px-2.5 h-8 rounded-full inline-flex items-center gap-1 text-[11px] font-bold text-[#6D28D9] cursor-pointer ml-1"
                  >
                    <RotateCcw className="w-3 h-3" aria-hidden="true" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Certificate Image Canvas Area */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-start justify-center">
              {!imgFailed ? (
                <div
                  className="bg-white rounded-[20px] p-2 sm:p-3 shadow-[0_18px_36px_-10px_rgba(68,94,184,0.32)] border border-[#D4E0FF] transition-all duration-150 my-auto"
                  style={{
                    width: `${Math.round(zoom * 100)}%`,
                    maxWidth: `${Math.round(780 * zoom)}px`,
                  }}
                >
                  <img
                    src={activePage.imageUrl}
                    alt={`${credential.title} — ${activePage.label}`}
                    referrerPolicy="no-referrer"
                    onError={() => setImgFailed(true)}
                    className="w-full h-auto rounded-[14px] block select-none"
                  />
                </div>
              ) : credential.pdfUrl ? (
                <div className="w-full h-full flex flex-col">
                  <PdfCanvasViewer
                    url={credential.pdfUrl}
                    title={credential.title}
                  />
                </div>
              ) : (
                <div className="my-auto clay-white rounded-[28px] p-8 text-center max-w-md">
                  <div className="text-4xl mb-3">{credential.emoji}</div>
                  <h4 className="font-display text-lg font-extrabold text-[#191744] mb-1">
                    {credential.title}
                  </h4>
                  <p className="text-xs text-[#4C4980]">
                    {credential.issuer} · {credential.scoreOrDetail}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <PdfCanvasViewer
            url={credential.pdfUrl!}
            title={credential.title}
          />
        )}

        {/* Footer Prev / Next Certificate Switcher */}
        <div className="pt-3 mt-3 border-t border-[#DCE5FF] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onSelectCredential(prevCred)}
            className="clay-btn-white inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-[#191744] whitespace-nowrap cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
            <span>Sebelumnya</span>
          </button>

          <span className="text-xs font-bold text-[#524E8A] tabular-nums hidden sm:inline">
            Sertifikat {currentCredIndex + 1} dari {CREDENTIALS.length}
          </span>

          <button
            type="button"
            onClick={() => onSelectCredential(nextCred)}
            className="clay-btn-white inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-[#191744] whitespace-nowrap cursor-pointer"
          >
            <span>Berikutnya</span>
            <ChevronRight className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface DocumentModalProps {
  docKey: DocumentKey | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  docKey,
  onClose,
}) => {
  const [downloadState, setDownloadState] = useState<
    'idle' | 'downloading' | 'done'
  >('idle');

  useEffect(() => {
    setDownloadState('idle');
    if (!docKey) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [docKey, onClose]);

  if (!docKey) return null;
  const doc = DOCUMENTS[docKey];

  const handleDownloadPdf = async () => {
    if (downloadState === 'downloading') return;
    setDownloadState('downloading');
    try {
      const response = await fetch(doc.url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = doc.downloadFileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
      setDownloadState('done');
      setTimeout(() => setDownloadState('idle'), 2200);
    } catch {
      const fallbackLink = document.createElement('a');
      fallbackLink.href = doc.url;
      fallbackLink.download = doc.downloadFileName;
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      fallbackLink.remove();
      setDownloadState('idle');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-doc-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#191744]/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="clay-white w-full max-w-4xl rounded-[36px] p-4 sm:p-6 flex flex-col h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header + Blob Download */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-3 border-b border-[#DCE5FF]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-[#E4ECFF] flex items-center justify-center text-2xl shrink-0">
              <span role="img" aria-hidden="true">
                {doc.emoji}
              </span>
            </div>
            <div className="min-w-0">
              <h3
                id="modal-doc-title"
                className="font-display text-base sm:text-xl font-extrabold text-[#191744] truncate"
              >
                {doc.title}
              </h3>
              <p className="text-xs text-[#524E8A] truncate">{doc.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="clay-btn-purple inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs font-bold text-white whitespace-nowrap cursor-pointer"
            >
              {downloadState === 'downloading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Mengunduh...</span>
                </>
              ) : downloadState === 'done' ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Berhasil Diunduh</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Unduh PDF</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup pratinjau dokumen"
              className="clay-btn-white w-10 h-10 rounded-full flex items-center justify-center text-[#191744] cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Native Canvas PDF Renderer */}
        <PdfCanvasViewer url={doc.url} title={doc.title} />
      </div>
    </div>
  );
};
