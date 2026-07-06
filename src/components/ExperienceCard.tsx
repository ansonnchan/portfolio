"use client";

import type { KeyboardEvent } from "react";
import { useState } from "react";
import type { Experience } from "@/data/portfolio";
import RichText from "@/components/RichText";

type ExperienceCardProps = {
  experience: Experience;
};

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(Boolean(experience.defaultOpen));
  const toggleOpen = () => setIsOpen((current) => !current);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleOpen();
    }
  };

  return (
    <article
      className="comic-card doodle-corner surface-card cursor-pointer p-4 transition hover:-translate-y-1 sm:p-5"
      onClick={toggleOpen}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-black/10 bg-white p-2 dark:border-white/10 dark:bg-white sm:h-16 sm:w-16">
          <img
            alt={`${experience.organization} logo`}
            className="max-h-full max-w-full object-contain"
            src={experience.image}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="mini-label mb-1 text-emerald-700 dark:text-emerald-300">
                {experience.eyebrow ?? "work log"}
              </p>
              <h3 className="text-xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-2xl">
                {experience.title}{" "}
                <span className="text-zinc-500 dark:text-zinc-400">
                  @ {experience.organization}
                </span>
              </h3>
            </div>
            <button
              aria-expanded={isOpen}
              aria-label={isOpen ? "Minimize experience" : "Expand experience"}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-xl font-semibold text-zinc-800 transition hover:border-emerald-600/30 hover:text-emerald-700 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-emerald-300 sm:h-10 sm:w-10"
              onClick={(event) => {
                event.stopPropagation();
                toggleOpen();
              }}
              type="button"
            >
              <span className={`arrow-chevron ${isOpen ? "arrow-chevron-up" : ""}`} />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <span className="sticker-tag px-3 py-1">
              {experience.dates}
            </span>
            <span className="sticker-tag px-3 py-1">
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
