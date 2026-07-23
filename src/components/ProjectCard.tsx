"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { useState } from "react";
import type { Project } from "@/data/portfolio";
import CardGallery from "@/components/CardGallery";

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
      className="comic-card doodle-corner surface-card cursor-pointer p-4 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/35 sm:p-5"
      onClick={toggleOpen}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="card-icon">
          <img
            alt={`${project.title} icon`}
            className="max-h-full max-w-full object-contain"
            src={project.icon}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <div className="min-w-0">
              <h3 className="text-xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-2xl">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-zinc-700 dark:text-zinc-300 sm:text-base">
                {project.description}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <a
                aria-label={`${project.title} GitHub repository`}
                className="icon-control"
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
                  className="icon-control"
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
                className="icon-control text-xl font-semibold"
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
                className="sticker-tag px-3 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-200"
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

          <CardGallery gallery={project.gallery} />
        </div>
      )}
    </article>
  );
}
