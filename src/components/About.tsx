import { about, socials } from "@/data/portfolio";
import GitHubContributionGraph from "@/components/GitHubContributionGraph";
import RichText from "@/components/RichText";

export default function About() {
  return (
    <section className="responsive-section scroll-fade scroll-mt-32 px-4 sm:px-6 lg:px-8" id="about">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-heading responsive-heading mb-9 text-center text-zinc-950 dark:text-white sm:mb-12">
          About Me
        </h2>

        <div className="grid gap-8 md:grid-cols-[0.82fr_1.18fr] md:gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-8">
          <aside className="comic-card surface-card mx-auto h-fit w-full max-w-md p-3 sm:p-4 md:max-w-none">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
              <img
                alt="Anson Chan profile"
                className="absolute inset-0 h-full w-full rounded-lg object-cover"
                src={about.profileImage}
              />
            </div>
            <nav
              aria-label="Anson's social links"
              className="flex items-center justify-center gap-3 px-2 pb-1 pt-4"
            >
              {socials.map((social) => (
                <a
                  aria-label={social.label}
                  className="social-sticker handwritten-display inline-flex h-11 items-center justify-center gap-2 px-3 text-lg text-zinc-800 transition hover:-translate-y-0.5 hover:border-emerald-600/35 hover:bg-emerald-50 dark:text-zinc-100 dark:hover:bg-emerald-300/10"
                  href={social.href}
                  key={social.label}
                  rel="noreferrer"
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  title={social.label}
                >
                  <img alt="" className="h-5 w-5 object-contain" src={social.icon} />
                  <span className="hidden sm:inline md:hidden lg:inline">{social.label}</span>
                </a>
              ))}
            </nav>
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
                <span className="handwritten-display text-3xl text-zinc-950 dark:text-white sm:text-4xl">
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
          </div>
        </div>

        <GitHubContributionGraph />
      </div>
    </section>
  );
}
