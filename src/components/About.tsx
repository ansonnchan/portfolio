import { about } from "@/data/portfolio";
import GitHubContributionGraph from "@/components/GitHubContributionGraph";
import RichText from "@/components/RichText";

export default function About() {
  return (
    <section className="responsive-section scroll-fade scroll-mt-32 px-4 sm:px-6 lg:px-8" id="about">
      <div className="mx-auto max-w-7xl">
        <h2 className="responsive-heading mb-9 text-center font-black tracking-normal text-zinc-950 dark:text-white sm:mb-12">
          About Me
        </h2>

        <div className="grid gap-8 md:grid-cols-[0.82fr_1.18fr] md:gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-8">
          <aside className="surface-card mx-auto h-fit w-full max-w-md rounded-lg p-3 shadow-soft dark:shadow-soft-dark sm:p-4 md:max-w-none">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
              <img
                alt="Anson Chan profile"
                className="absolute inset-0 h-full w-full rounded-lg object-cover"
                src={about.profileImage}
              />
            </div>
          </aside>

          <div className="min-w-0 space-y-5 text-base leading-7 text-zinc-700 dark:text-zinc-300 sm:text-lg sm:leading-8">
            <div className="about-greeting-pop inline-flex">
              <div className="about-greeting-bubble relative inline-flex items-center rounded-lg border border-emerald-500/25 bg-white/90 px-5 py-3 shadow-soft dark:border-emerald-300/20 dark:bg-white/10 dark:shadow-soft-dark">
                <span className="about-greeting-spark about-greeting-spark-left" aria-hidden="true" />
                <span
                  aria-hidden="true"
                  className="about-greeting-wave mr-2 inline-block origin-bottom-right text-2xl sm:text-3xl"
                >
                  👋
                </span>
                <span className="text-2xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-3xl">
                  {about.greeting}
                </span>
                <span className="about-greeting-spark about-greeting-spark-right" aria-hidden="true" />
                <span className="about-greeting-tail" aria-hidden="true" />
              </div>
            </div>

            {about.paragraphs.map((paragraph, index) => (
              <p key={index}>
                <RichText segments={paragraph} />
              </p>
            ))}

            <p>{about.closing}</p>

            <GitHubContributionGraph />
          </div>
        </div>
      </div>
    </section>
  );
}
