import About from "@/components/About";
import ExperienceCard from "@/components/ExperienceCard";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import NowPlayingPlayer from "@/components/NowPlayingPlayer";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import SideQuestGallery from "@/components/SideQuestGallery";
import SideQuestList from "@/components/SideQuestList";
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
            <SectionHeading
              subtitle="places I've had the luxury of working at"
              title="Experience"
            />

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
            <SectionHeading
              subtitle="things I’ve built in my free time"
              title="Projects"
            />

            <div className="grid gap-5">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="responsive-section scroll-fade scroll-mt-24 px-4 sm:px-6 lg:px-8" id="side-quests">
          <div className="mx-auto max-w-6xl">
            <SectionHeading title="Side Quests" />

            <div className="side-quest-layout mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
              <div className="mx-auto max-w-3xl lg:mx-0">
                <SideQuestList bullets={sideQuests.bullets} />
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
