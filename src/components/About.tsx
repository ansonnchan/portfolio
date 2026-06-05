import { about } from "@/data/portfolio";
import RichText from "@/components/RichText";

type AboutProps = {
  isDark: boolean;
};

export default function About({ isDark }: AboutProps) {
  return (
    <section className="scroll-fade scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8" id="about">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
          About Me
        </h2>

        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <aside className="surface-card h-fit rounded-lg p-4 shadow-soft dark:shadow-soft-dark">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
              <img
                alt="Anson Chan profile"
                className={`absolute inset-0 h-full w-full rounded-lg object-cover transition-opacity duration-500 ${
                  isDark ? "opacity-0" : "opacity-100"
                }`}
                src={about.profileImage}
              />
              <img
                alt="Anson Chan profile in dark mode"
                className={`absolute inset-0 h-full w-full rounded-lg object-cover transition-opacity duration-500 ${
                  isDark ? "opacity-100" : "opacity-0"
                }`}
                src={about.darkProfileImage}
              />
            </div>
          </aside>

          <div className="space-y-5 text-base leading-8 text-zinc-700 dark:text-zinc-300 sm:text-lg">
            <div className="about-greeting-pop inline-flex">
              <div className="about-greeting-bubble relative inline-flex items-center rounded-lg border border-emerald-500/25 bg-white/90 px-5 py-3 shadow-soft dark:border-emerald-300/20 dark:bg-white/10 dark:shadow-soft-dark">
                <span className="about-greeting-spark about-greeting-spark-left" aria-hidden="true" />
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

            <div className="!mt-28 flex sm:!mt-36">
              <div className="relative inline-flex max-w-full items-center gap-3 rounded-lg border border-emerald-500/25 bg-emerald-50/80 pb-3 pl-32 pr-4 pt-4 text-sm leading-6 shadow-soft transition-colors duration-300 hover:border-emerald-500/45 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:shadow-soft-dark sm:min-h-24 sm:pl-44 sm:pr-5 sm:text-base">
                <img
                  alt="Chibi Ahri sitting on the duo queue banner ledge"
                  className="pointer-events-none absolute -left-1 -top-20 h-32 w-32 object-contain drop-shadow-lg sm:-left-2 sm:-top-28 sm:h-40 sm:w-40"
                  src="/assets/league/ahri_transparent.png"
                />
                <span className="min-w-0">
                  <span className="block text-[0.68rem] font-black uppercase tracking-normal text-emerald-700 dark:text-emerald-300">
                    duo queue distress signal
                  </span>
                  <span className="block font-semibold text-zinc-800 dark:text-zinc-100">
                    {about.rankedAside}
                  </span>
                </span>
                <span className="hidden shrink-0 rounded-md border border-emerald-600/20 bg-white/70 px-2.5 py-1 text-xs font-black text-emerald-800 dark:border-emerald-300/20 dark:bg-white/10 dark:text-emerald-200 sm:inline-flex">
                  Emerald {"->"} Diamond
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
