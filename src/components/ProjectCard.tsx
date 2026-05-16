"use client";

import { useState } from "react";
import type { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(Boolean(project.defaultOpen));

  return (
    <article className="surface-card flex h-full flex-col overflow-hidden rounded-lg shadow-soft transition hover:-translate-y-1 dark:shadow-soft-dark">
      <div className="relative border-b border-black/10 bg-zinc-100 dark:border-white/10 dark:bg-white/5">
        <img
          alt={`${project.title} preview`}
          className="aspect-[16/9] w-full object-cover"
          src={project.image}
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black tracking-normal text-zinc-950 dark:text-white">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
              {project.description}
            </p>
          </div>
          <button
            aria-expanded={isOpen}
            aria-label={isOpen ? "Minimize project" : "Expand project"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-xl font-semibold text-zinc-800 transition hover:border-emerald-600/30 hover:text-emerald-700 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-emerald-300"
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            {isOpen ? "−" : "+"}
          </button>
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

        {isOpen && (
          <ul className="mt-5 space-y-3 border-t border-black/10 pt-5 text-sm leading-7 text-zinc-700 dark:border-white/10 dark:text-zinc-300">
            {project.details.map((detail) => (
              <li className="flex gap-3" key={detail}>
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          <a
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:-translate-y-0.5 hover:border-emerald-600/30 hover:text-emerald-700 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-emerald-300"
            href={project.github}
            rel="noreferrer"
            target="_blank"
          >
            <img alt="" className="h-4 w-4" src="/assets/about/github_icon.png" />
            GitHub
          </a>
          {project.live && (
            <a
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700 dark:bg-white dark:text-[#10140f] dark:hover:bg-emerald-200"
              href={project.live}
              rel="noreferrer"
              target="_blank"
            >
              <img alt="" className="h-4 w-4" src="/assets/about/live_app.png" />
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
