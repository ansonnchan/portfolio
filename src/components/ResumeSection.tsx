import { Download, ExternalLink } from "lucide-react";

const resumePath = "/assets/resume.pdf";

export default function ResumeSection() {
  return (
    <section
      className="responsive-section scroll-fade scroll-mt-24 px-4 sm:px-6 lg:px-8"
      id="resume"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="section-heading responsive-heading mb-3 text-center text-zinc-950 dark:text-white">
          Resume
        </h2>
        <p className="mini-label mb-9 text-center text-emerald-700 dark:text-emerald-300 sm:mb-10">
          the one-page version
        </p>

        <div className="comic-card surface-card overflow-hidden p-3 sm:p-5">
          <iframe
            className="h-[68vh] min-h-[30rem] w-full rounded-lg border border-black/10 bg-white dark:border-white/10 sm:min-h-[38rem] lg:min-h-[46rem]"
            loading="lazy"
            src={`${resumePath}#view=FitH`}
            title="Anson Chan resume PDF preview"
          />

          <div className="flex flex-col gap-4 px-1 pb-1 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Last updated May 2026
            </p>

            <div className="flex flex-wrap gap-2">
              <a
                className="comic-action inline-flex min-h-11 items-center gap-2 px-4 text-sm font-semibold"
                href={resumePath}
                rel="noreferrer"
                target="_blank"
              >
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
                Open PDF
              </a>
              <a
                className="comic-action comic-action-primary inline-flex min-h-11 items-center gap-2 px-4 text-sm font-semibold"
                download="Anson_Chan_Resume.pdf"
                href={resumePath}
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
