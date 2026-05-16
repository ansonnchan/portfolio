"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { useState } from "react";
import type { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const stopRowToggle = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <article
      className="surface-card cursor-pointer rounded-lg p-5 shadow-soft transition hover:-translate-y-1 dark:shadow-soft-dark"
      onClick={toggleOpen}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="flex gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-black/10 bg-white p-2 dark:border-white/10">
          <img
            alt={`${project.title} icon`}
            className="max-h-full max-w-full object-contain"
            src={project.icon}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-2xl font-black tracking-normal text-zinc-950 dark:text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-zinc-700 dark:text-zinc-300 sm:text-base">
                {project.description}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <a
                aria-label={`${project.title} GitHub repository`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-800 transition hover:border-emerald-600/30 hover:text-emerald-700 dark:border-white/10"
                href={project.github}
                onClick={stopRowToggle}
                rel="noreferrer"
                target="_blank"
              >
                <img alt="" className="h-5 w-5 object-contain" src="/assets/about/github_icon.png" />
              </a>
              {project.live ? (
                <a
                  aria-label={`${project.title} live app`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-800 transition hover:border-emerald-600/30 hover:text-emerald-700 dark:border-white/10"
                  href={project.live}
                  onClick={stopRowToggle}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img alt="" className="h-5 w-5 object-contain" src="/assets/about/live_app.png" />
                </a>
              ) : null}
              <button
                aria-expanded={isOpen}
                aria-label={isOpen ? "Minimize project" : "Expand project"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-xl font-semibold text-zinc-800 transition hover:border-emerald-600/30 hover:text-emerald-700 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-emerald-300"
                onClick={(event) => {
                  stopRowToggle(event);
                  toggleOpen();
                }}
                type="button"
              >
                <span className={`arrow-chevron ${isOpen ? "arrow-chevron-up" : ""}`} />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                className="rounded-full border border-emerald-600/20 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-200"
                key={tech}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="mt-5 border-t border-black/10 pt-5 dark:border-white/10">
          <ul className="space-y-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300 sm:text-base">
            {project.details.map((detail) => (
              <li className="flex gap-3" key={detail}>
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {project.screenshots.map((screenshot) => (
              <img
                alt={`${project.title} screenshot`}
                className="aspect-video w-full rounded-lg border border-black/10 object-cover shadow-sm dark:border-white/10"
                key={screenshot}
                loading="lazy"
                src={screenshot}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
