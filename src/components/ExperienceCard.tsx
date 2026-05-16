"use client";

import { useState } from "react";
import type { Experience } from "@/data/portfolio";
import RichText from "@/components/RichText";

type ExperienceCardProps = {
  experience: Experience;
};

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(Boolean(experience.defaultOpen));

  return (
    <article className="surface-card rounded-lg p-5 shadow-soft transition hover:-translate-y-1 dark:shadow-soft-dark">
      <div className="flex gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-black/10 bg-white p-2 dark:border-white/10 dark:bg-white">
          <img
            alt={`${experience.organization} logo`}
            className="max-h-full max-w-full object-contain"
            src={experience.image}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              {experience.eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                  {experience.eyebrow}
                </p>
              ) : null}
              <h3 className="text-2xl font-black tracking-normal text-zinc-950 dark:text-white">
                {experience.title}{" "}
                <span className="text-zinc-500 dark:text-zinc-400">
                  @ {experience.organization}
                </span>
              </h3>
            </div>
            <button
              aria-expanded={isOpen}
              aria-label={isOpen ? "Minimize experience" : "Expand experience"}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-xl font-semibold text-zinc-800 transition hover:border-emerald-600/30 hover:text-emerald-700 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-emerald-300"
              onClick={() => setIsOpen((current) => !current)}
              type="button"
            >
              {isOpen ? "−" : "+"}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <span className="rounded-full bg-zinc-900/5 px-3 py-1 dark:bg-white/10">
              {experience.dates}
            </span>
            <span className="rounded-full bg-zinc-900/5 px-3 py-1 dark:bg-white/10">
              {experience.location}
            </span>
          </div>
        </div>
      </div>

      {isOpen && (
        <ul className="mt-5 space-y-3 border-t border-black/10 pt-5 text-sm leading-7 text-zinc-700 dark:border-white/10 dark:text-zinc-300 sm:text-base">
          {experience.bullets.map((bullet, index) => (
            <li className="flex gap-3" key={index}>
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>
                <RichText segments={bullet} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
