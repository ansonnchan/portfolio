import About from "@/components/About";
import ExperienceCard from "@/components/ExperienceCard";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import NowPlayingPlayer from "@/components/NowPlayingPlayer";
import ProjectCard from "@/components/ProjectCard";
import ResumeSection from "@/components/ResumeSection";
import SideQuestGallery from "@/components/SideQuestGallery";
import { experiences, projects, sideQuests } from "@/data/portfolio";

export default function Portfolio() {
  return (
    <div className="portfolio-shell min-h-screen text-[var(--foreground)]">
      <Navbar />
      <Hero />

      <main>
        <About />

        <section className="responsive-section scroll-fade scroll-mt-24 px-4 sm:px-6 lg:px-8" id="experience">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col items-center gap-5 text-center">
              <h2 className="section-heading responsive-heading text-zinc-950 dark:text-white">
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

        <section className="responsive-section scroll-fade scroll-mt-24 px-4 sm:px-6 lg:px-8" id="projects">
          <div className="mx-auto max-w-7xl">
            <h2 className="section-heading responsive-heading mb-9 text-center text-zinc-950 dark:text-white sm:mb-10">
              Projects
            </h2>

            <div className="grid gap-5">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        <ResumeSection />

        <section className="responsive-section scroll-fade scroll-mt-24 px-4 sm:px-6 lg:px-8" id="side-quests">
          <div className="mx-auto max-w-6xl">
            <h2 className="section-heading responsive-heading mb-9 text-center text-zinc-950 dark:text-white sm:mb-10">
              Side Quests
            </h2>

            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
              <div className="mx-auto max-w-3xl lg:mx-0">
                <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300 sm:text-lg sm:leading-8">
                  {sideQuests.intro}
                </p>
                <ul className="mt-6 space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300 sm:leading-8">
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
      <NowPlayingPlayer />
    </div>
  );
}
