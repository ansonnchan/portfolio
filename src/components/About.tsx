import { about } from "@/data/portfolio";
import GitHubContributionGraph from "@/components/GitHubContributionGraph";
import RichText from "@/components/RichText";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section className="responsive-section scroll-fade scroll-mt-24 px-4 sm:px-6 lg:px-8" id="about">
      <div className="mx-auto max-w-7xl">
        <SectionHeading subtitle="the lore" title="About Me" />

        <div className="grid gap-9 md:grid-cols-[0.82fr_1.18fr] md:gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <aside className="comic-card surface-card mx-auto h-fit w-full max-w-md p-3 sm:p-4 md:max-w-none">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
              <img
                alt="Anson Chan profile"
                className="absolute inset-0 h-full w-full rounded-lg object-cover"
                src={about.profileImage}
              />
            </div>
          </aside>

          <div className="min-w-0 space-y-5 text-base leading-7 text-zinc-700 dark:text-zinc-300 sm:text-lg sm:leading-8">
            <div className="about-note handwritten-display inline-flex items-center gap-2 text-3xl text-zinc-950 dark:text-white sm:text-4xl">
              <span aria-hidden="true">👋</span>
              <span>{about.greeting}</span>
            </div>

            {about.paragraphs.map((paragraph, index) => (
              <p key={index}>
                <RichText segments={paragraph} />
              </p>
            ))}

            <p>{about.closing}</p>
          </div>
        </div>

        <GitHubContributionGraph />
      </div>
    </section>
  );
}
