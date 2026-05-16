"use client";

import { useEffect, useState } from "react";
import About from "@/components/About";
import ArchivedExperienceModal from "@/components/ArchivedExperienceModal";
import ExperienceCard from "@/components/ExperienceCard";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import SideQuestGallery from "@/components/SideQuestGallery";
import { experiences, projects, sideQuests } from "@/data/portfolio";

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const handleToggleTheme = () => {
    setIsDark((current) => {
      const next = !current;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar isDark={isDark} onToggleTheme={handleToggleTheme} />
      <Hero isDark={isDark} />

      <main>
        <About />

        <section className="scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8" id="experience">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
                  Experience
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
                  Places I’ve shipped, researched, and survived.
                </h2>
              </div>
              <button
                className="w-fit rounded-full border border-emerald-600/25 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-800 transition hover:-translate-y-0.5 hover:bg-emerald-100 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-200 dark:hover:bg-emerald-300/15"
                onClick={() => setIsArchiveOpen(true)}
                type="button"
              >
                Archived Experiences
              </button>
            </div>

            <div className="grid gap-5">
              {experiences.map((experience) => (
                <ExperienceCard
                  experience={experience}
                  key={`${experience.title}-${experience.organization}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8" id="projects">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
                Projects
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
                The stuff recruiters probably came here for.
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8" id="side-quests">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
                  Side Quests
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
                  Proof of grass-touching.
                </h2>
                <p className="mt-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
                  {sideQuests.intro}
                </p>
                <ul className="mt-6 space-y-4 text-base leading-8 text-zinc-700 dark:text-zinc-300">
                  {sideQuests.bullets.map((bullet) => (
                    <li className="flex gap-3" key={bullet}>
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-card h-fit rounded-lg p-4 shadow-soft dark:shadow-soft-dark">
                <SideQuestGallery />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ArchivedExperienceModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
      />
    </div>
  );
}
