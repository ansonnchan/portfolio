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
      className="comic-card doodle-corner surface-card cursor-pointer p-4 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/35 sm:p-5"
      onClick={toggleOpen}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="card-icon">
          <img
            alt={`${experience.organization} logo`}
            className="max-h-full max-w-full object-contain"
            src={experience.image}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {experience.eyebrow ? (
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                  {experience.eyebrow}
                </p>
              ) : null}
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
              className="icon-control shrink-0 text-xl font-semibold"
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
