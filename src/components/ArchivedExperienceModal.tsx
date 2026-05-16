"use client";

import { useEffect } from "react";
import { archivedExperiences } from "@/data/portfolio";

type ArchivedExperienceModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ArchivedExperienceModal({
  isOpen,
  onClose
}: ArchivedExperienceModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-950/55 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
    >
      <button
        aria-label="Close archived experiences"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />
      <div className="surface-card relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-lg p-5 shadow-soft-dark sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
              Bonus lore
            </p>
            <h3 className="mt-2 text-3xl font-black tracking-normal text-zinc-950 dark:text-white">
              Archived Experiences
            </h3>
          </div>
          <button
            aria-label="Close modal"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-black text-zinc-800 transition hover:border-emerald-600/30 hover:text-emerald-700 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-emerald-300"
            onClick={onClose}
            type="button"
          >
            x
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          {archivedExperiences.map((experience) => (
            <article
              className="rounded-lg border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/6"
              key={`${experience.title}-${experience.dates}`}
            >
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-black/10 bg-white p-2 dark:border-white/10">
                  <img
                    alt={`${experience.title} logo`}
                    className="max-h-full max-w-full object-contain"
                    src={experience.image}
                  />
                </div>
                <div>
                  <h4 className="text-xl font-black tracking-normal text-zinc-950 dark:text-white">
                    {experience.title}
                    {experience.role ? (
                      <span className="text-zinc-500 dark:text-zinc-400">
                        {" "}
                        · {experience.role}
                      </span>
                    ) : null}
                  </h4>
                  <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    {experience.location} · {experience.dates}
                  </p>
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                {experience.bullets.map((bullet) => (
                  <li className="flex gap-3" key={bullet}>
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
