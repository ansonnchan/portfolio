import { hero, resumePath } from "@/data/portfolio";
import TypewriterText from "@/components/TypewriterText";

type HeroProps = {
  isDark: boolean;
};

export default function Hero({ isDark }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden border-b border-black/5 dark:border-white/10"
      id="top"
    >
      <div className="soft-grid absolute inset-0 opacity-55" />
      <div className="relative mx-auto grid min-h-[calc(100vh-210px)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-14">
        <div className="animate-reveal-up">
          <div className="mb-6 inline-flex rounded-lg border border-emerald-600/20 bg-white/90 px-4 py-2 font-mono text-sm font-semibold text-emerald-700 shadow-sm dark:border-emerald-300/20 dark:bg-white/8 dark:text-emerald-300">
            {hero.greeting}
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-normal text-zinc-950 dark:text-white sm:text-6xl lg:text-7xl">
            I’m <span className="text-emerald-700 dark:text-emerald-300">{hero.name}</span>
          </h1>
          <p className="mt-6 min-h-12 text-2xl font-semibold text-zinc-700 dark:text-zinc-200 sm:text-3xl">
            <TypewriterText phrases={hero.phrases} />
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-300 sm:text-lg">
            Third-year Computer Engineering student at UBC, building useful software,
            chasing clean interfaces, and occasionally letting caffeine make architectural
            decisions.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700 dark:bg-white dark:text-[#10140f] dark:hover:bg-emerald-200"
              href="#projects"
            >
              View projects
            </a>
            <a
              className="rounded-full border border-black/10 bg-white/80 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:-translate-y-0.5 hover:border-emerald-600/30 hover:text-emerald-700 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-emerald-300"
              download
              href={resumePath}
            >
              Download resume
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[520px] justify-center lg:ml-auto">
          <div className="animate-float-soft inline-block overflow-hidden rounded-lg border border-black/10 bg-white shadow-soft dark:border-white/10 dark:bg-[#171d15] dark:shadow-soft-dark">
            <img
              alt="Anson Chan hero placeholder"
              className="h-auto max-h-[34vh] w-auto max-w-full object-contain sm:max-h-[48vh] lg:max-h-[56vh]"
              src={isDark ? hero.darkImage : hero.lightImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
