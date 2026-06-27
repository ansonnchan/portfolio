"use client";

import { useEffect, useState } from "react";
import About from "@/components/About";
import ExperienceCard from "@/components/ExperienceCard";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import SideQuestGallery from "@/components/SideQuestGallery";
import { experiences, projects, sideQuests } from "@/data/portfolio";

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);

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
        <About isDark={isDark} />

        <section className="scroll-fade scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8" id="experience">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col items-center gap-5 text-center">
              <h2 className="text-4xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
                Experience
              </h2>
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

        <section className="scroll-fade scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8" id="projects">
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

        <section className="scroll-fade scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8" id="side-quests">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-10 text-center text-4xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
              Side Quests
            </h2>

            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
              <div className="mx-auto max-w-3xl lg:mx-0">
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
      </main>

      <Footer />
    </div>
  );
}
