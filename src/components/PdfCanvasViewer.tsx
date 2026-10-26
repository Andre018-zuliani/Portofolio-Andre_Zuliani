import React, { useEffect, useRef, useState } from 'react';
import { Loader2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { GlobalWorkerOptions, getDocument, type PDFDocumentProxy } from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

interface PdfCanvasViewerProps {
  url: string;
  title: string;
}

interface PdfPageCanvasProps {
  pdfDoc: PDFDocumentProxy;
  pageNumber: number;
  totalPages: number;
  targetWidth: number;
}

const PdfPageCanvas: React.FC<PdfPageCanvasProps> = ({
  pdfDoc,
  pageNumber,
  totalPages,
  targetWidth,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [renderedHeight, setRenderedHeight] = useState<number>(0);

  useEffect(() => {
    let isCancelled = false;
    let renderTask: { cancel: () => void; promise: Promise<void> } | null = null;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(pageNumber);
        if (isCancelled || !canvasRef.current) return;

        const unscaledViewport = page.getViewport({ scale: 1 });
        const cssScale = Math.max(0.4, targetWidth / unscaledViewport.width);
        const cssViewport = page.getViewport({ scale: cssScale });

        const dpr = Math.min(window.devicePixelRatio || 1, 2.25);
        const hiResViewport = page.getViewport({ scale: cssScale * dpr });

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.width = Math.floor(hiResViewport.width);
        canvas.height = Math.floor(hiResViewport.height);
        canvas.style.width = `${Math.floor(cssViewport.width)}px`;
        canvas.style.height = `${Math.floor(cssViewport.height)}px`;
        setRenderedHeight(Math.floor(cssViewport.height));

        renderTask = page.render({
          canvasContext: context,
          canvas,
          viewport: hiResViewport,
        });

        await renderTask.promise;
      } catch (err: unknown) {
        const errorName = (err as { name?: string })?.name;
        if (errorName !== 'RenderingCancelledException' && !isCancelled) {
          console.error(`Gagal merender halaman ${pageNumber}:`, err);
        }
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdfDoc, pageNumber, targetWidth]);

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className="bg-white rounded-[20px] overflow-hidden shadow-[0_14px_30px_-8px_rgba(68,94,184,0.28)] border border-[#D4E0FF] transition-all"
        style={{
          minHeight: renderedHeight > 0 ? `${renderedHeight}px` : '320px',
        }}
      >
        <canvas
          ref={canvasRef}
          aria-label={`Halaman ${pageNumber} dari ${totalPages}`}
          className="block max-w-full h-auto"
        />
      </div>
      <span className="mt-2.5 text-xs font-bold text-[#4A4682] tabular-nums">
        Halaman {pageNumber} dari {totalPages}
      </span>
    </div>
  );
};

export const PdfCanvasViewer: React.FC<PdfCanvasViewerProps> = ({
  url,
  title,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(720);
  const [zoomMultiplier, setZoomMultiplier] = useState<number>(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const available = Math.max(280, el.clientWidth - 48);
      setContainerWidth(Math.min(available, 820));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isCancelled = false;
    let activeTask: ReturnType<typeof getDocument> | null = null;

    setIsLoading(true);
    setErrorMsg(null);
    setPdfDoc(null);
    setNumPages(0);
    setZoomMultiplier(1);

    const loadPdfBytes = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const buffer = await response.arrayBuffer();
        if (isCancelled) return;

        activeTask = getDocument({
          data: new Uint8Array(buffer),
          cMapPacked: true,
        });

        const loadedPdf = await activeTask.promise;
        if (isCancelled) {
          await activeTask.destroy();
          return;
        }
        setPdfDoc(loadedPdf);
        setNumPages(loadedPdf.numPages);
        setIsLoading(false);
      } catch (err) {
        if (!isCancelled) {
          console.error('Gagal memuat berkas PDF:', err);
          setErrorMsg(
            'Berkas PDF tidak dapat dimuat saat ini. Silakan gunakan tombol Unduh PDF di bagian atas.'
          );
          setIsLoading(false);
        }
      }
    };

    void loadPdfBytes();

    return () => {
      isCancelled = true;
      if (activeTask) {
        void activeTask.destroy();
      }
    };
  }, [url]);

  const effectiveWidth = Math.round(containerWidth * zoomMultiplier);

  return (
    <div className="flex flex-col flex-1 min-h-0 rounded-[26px] bg-[#DCE6FF] border border-[#C6D5FF] overflow-hidden">
      {/* Viewer Toolbar: Page Count & Zoom Controls */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white/80 backdrop-blur-sm border-b border-[#C6D5FF]">
        <span className="text-xs font-bold text-[#3B3870] truncate">
          {isLoading
            ? `Memuat ${title}...`
            : numPages > 0
            ? `${numPages} Halaman · Gulir ke bawah untuk membaca`
            : title}
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() =>
              setZoomMultiplier((z) => Math.max(0.65, Number((z - 0.2).toFixed(2))))
            }
            disabled={isLoading || zoomMultiplier <= 0.65}
            aria-label="Perkecil tampilan PDF"
            className="clay-btn-white w-8 h-8 rounded-full flex items-center justify-center text-[#191744] disabled:opacity-45 cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" aria-hidden="true" />
          </button>

          <span className="text-xs font-extrabold text-[#191744] tabular-nums px-2 min-w-[3.5rem] text-center">
            {Math.round(zoomMultiplier * 100)}%
          </span>

          <button
            type="button"
            onClick={() =>
              setZoomMultiplier((z) => Math.min(2.0, Number((z + 0.2).toFixed(2))))
            }
            disabled={isLoading || zoomMultiplier >= 2.0}
            aria-label="Perbesar tampilan PDF"
            className="clay-btn-white w-8 h-8 rounded-full flex items-center justify-center text-[#191744] disabled:opacity-45 cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" aria-hidden="true" />
          </button>

          {zoomMultiplier !== 1 && (
            <button
              type="button"
              onClick={() => setZoomMultiplier(1)}
              aria-label="Atur ulang ukuran tampilan"
              className="clay-btn-white px-2.5 h-8 rounded-full inline-flex items-center gap-1 text-[11px] font-bold text-[#6D28D9] cursor-pointer ml-1"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Canvas Pages Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 sm:p-6 space-y-6"
      >
        {isLoading && (
          <div className="h-full min-h-[280px] flex flex-col items-center justify-center gap-3 text-[#3B3870]">
            <Loader2 className="w-8 h-8 animate-spin text-[#6D28D9]" />
            <p className="text-sm font-bold">Merender halaman dokumen...</p>
          </div>
        )}

        {errorMsg && !isLoading && (
          <div className="h-full min-h-[240px] flex items-center justify-center text-center px-6">
            <p className="text-sm font-bold text-[#3B3870] max-w-md">
              {errorMsg}
            </p>
          </div>
        )}

        {!isLoading &&
          !errorMsg &&
          pdfDoc &&
          Array.from({ length: numPages }, (_, idx) => idx + 1).map(
            (pageNum) => (
              <PdfPageCanvas
                key={pageNum}
                pdfDoc={pdfDoc}
                pageNumber={pageNum}
                totalPages={numPages}
                targetWidth={effectiveWidth}
              />
            )
          )}
      </div>
    </div>
  );
};
