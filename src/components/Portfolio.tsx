"use client";

import { useEffect, useState } from "react";
import About from "@/components/About";
import ArchivedExperienceModal from "@/components/ArchivedExperienceModal";
import ExperienceCard from "@/components/ExperienceCard";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PetDogEgg from "@/components/PetDogEgg";
import PhotosSection from "@/components/PhotosSection";
import ProjectCard from "@/components/ProjectCard";
import SideQuestGallery from "@/components/SideQuestGallery";
import TopLeftWidgets from "@/components/TopLeftWidgets";
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
      <TopLeftWidgets />
      <Hero isDark={isDark} />

      <main>
        <About />

        <section className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8" id="experience">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col items-center gap-5 text-center">
              <h2 className="text-4xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
                Experience
              </h2>
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

        <section className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8" id="projects">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 text-center text-4xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
              Projects
            </h2>

            <div className="grid gap-5">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8" id="side-quests">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 text-center text-4xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
              Side Quests
            </h2>

            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <p className="text-lg leading-8 text-zinc-700 dark:text-zinc-300">
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
              <SideQuestGallery />
            </div>
          </div>
        </section>

        <PhotosSection />
      </main>

      <Footer />
      <PetDogEgg />
      <ArchivedExperienceModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
      />
    </div>
  );
}
