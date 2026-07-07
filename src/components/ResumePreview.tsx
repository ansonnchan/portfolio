"use client";

import type {
  PDFDocumentLoadingTask,
  PDFDocumentProxy,
  PDFPageProxy,
  RenderTask
} from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";

type ResumePreviewProps = {
  pdfPath: string;
};

type ResumeLink = {
  height: number;
  href: string;
  left: number;
  top: number;
  width: number;
};

type LinkAnnotation = {
  rect?: number[];
  subtype?: string;
  unsafeUrl?: string;
  url?: string;
};

export default function ResumePreview({ pdfPath }: ResumePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [links, setLinks] = useState<ResumeLink[]>([]);
  const [previewSize, setPreviewSize] = useState({ height: 0, width: 0 });
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let isCancelled = false;
    let animationFrame = 0;
    let loadingTask: PDFDocumentLoadingTask | null = null;
    let pdf: PDFDocumentProxy | null = null;
    let page: PDFPageProxy | null = null;
    let renderTask: RenderTask | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const renderPage = async () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;

      if (!canvas || !container || !page || isCancelled) {
        return;
      }

      if (renderTask) {
        renderTask.cancel();

        try {
          await renderTask.promise;
        } catch {
          // A resize intentionally cancels the previous render.
        }
      }

      const baseViewport = page.getViewport({ scale: 1 });
      const availableWidth = Math.max(container.clientWidth, 280);
      const cssScale = availableWidth / baseViewport.width;
      const outputScale = Math.min(window.devicePixelRatio || 1, 2);
      const cssViewport = page.getViewport({ scale: cssScale });
      const renderViewport = page.getViewport({ scale: cssScale * outputScale });

      canvas.width = Math.floor(renderViewport.width);
      canvas.height = Math.floor(renderViewport.height);
      canvas.style.width = `${Math.floor(cssViewport.width)}px`;
      canvas.style.height = `${Math.floor(cssViewport.height)}px`;

      const canvasContext = canvas.getContext("2d");

      if (!canvasContext) {
        throw new Error("Canvas rendering is unavailable.");
      }

      renderTask = page.render({
        canvas,
        canvasContext,
        viewport: renderViewport
      });
      await renderTask.promise;

      if (!isCancelled) {
        const annotations = (await page.getAnnotations({
          intent: "display"
        })) as LinkAnnotation[];
        const nextLinks = annotations.flatMap((annotation) => {
          const href = annotation.url ?? annotation.unsafeUrl;

          if (
            annotation.subtype !== "Link" ||
            !href ||
            !annotation.rect ||
            annotation.rect.length !== 4
          ) {
            return [];
          }

          const [x1, y1] = cssViewport.convertToViewportPoint(
            annotation.rect[0],
            annotation.rect[1]
          );
          const [x2, y2] = cssViewport.convertToViewportPoint(
            annotation.rect[2],
            annotation.rect[3]
          );

          return [
            {
              height: Math.abs(y2 - y1),
              href,
              left: Math.min(x1, x2),
              top: Math.min(y1, y2),
              width: Math.abs(x2 - x1)
            }
          ];
        });

        setLinks(nextLinks);
        setPreviewSize({
          height: Math.floor(cssViewport.height),
          width: Math.floor(cssViewport.width)
        });
        setStatus("ready");
      }
    };

    const queueRender = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        void renderPage();
      });
    };

    const loadResume = async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/assets/pdf.worker.min.mjs";

        loadingTask = pdfjs.getDocument({ url: pdfPath });
        pdf = await loadingTask.promise;
        page = await pdf.getPage(1);

        await renderPage();

        if (!isCancelled && containerRef.current) {
          resizeObserver = new ResizeObserver(queueRender);
          resizeObserver.observe(containerRef.current);
        }
      } catch (error) {
        if (
          !isCancelled &&
          (!(error instanceof Error) || error.name !== "RenderingCancelledException")
        ) {
          setStatus("error");
        }
      }
    };

    void loadResume();

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      renderTask?.cancel();
      page?.cleanup();
      void loadingTask?.destroy();
    };
  }, [pdfPath]);

  return (
    <div
      className="resume-canvas-shell relative mx-auto max-h-[36rem] w-full max-w-[62rem] overflow-y-auto sm:max-h-[42rem]"
      ref={containerRef}
    >
      {status === "loading" && (
        <div
          aria-label="Loading resume preview"
          className="aspect-[8.5/11] w-full animate-pulse bg-zinc-100 dark:bg-white/5"
          role="status"
        />
      )}

      {status === "error" ? (
        <div className="flex min-h-72 flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="font-semibold text-zinc-700 dark:text-zinc-200">
            The resume preview could not be loaded.
          </p>
          <a
            className="text-sm font-semibold text-emerald-700 underline underline-offset-4 dark:text-emerald-300"
            href={pdfPath}
            rel="noreferrer"
            target="_blank"
          >
            Open the PDF instead
          </a>
        </div>
      ) : (
        <div
          className={`${status === "ready" ? "relative mx-auto block" : "hidden"}`}
          style={previewSize}
        >
          <canvas
            aria-label="Preview of Anson Chan's resume"
            className="block bg-white"
            ref={canvasRef}
            role="img"
          />
          <div
            aria-label="Clickable links in resume"
            className="pointer-events-none absolute inset-0"
            role="group"
          >
            {links.map((link, index) => (
              <a
                aria-label={`Open ${link.href}`}
                className="resume-annotation-link absolute"
                href={link.href}
                key={`${link.href}-${index}`}
                rel="noreferrer"
                style={{
                  height: link.height,
                  left: link.left,
                  top: link.top,
                  width: link.width
                }}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
