import { hero } from "@/data/portfolio";
import HeroJourneyRoute from "@/components/HeroJourneyRoute";
import TypewriterText from "@/components/TypewriterText";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden" id="top">
      <div className="relative mx-auto flex min-h-[100svh] max-w-5xl items-center justify-center px-5 pb-32 pt-28 sm:px-10 sm:pb-36 sm:pt-32">
        <div className="animate-reveal-up mx-auto w-full max-w-4xl text-center">
          <h1 className="text-zinc-950 dark:text-white">
            <span className="hero-greeting block text-[clamp(4.5rem,15vw,8.5rem)] leading-[0.82] text-emerald-700 dark:text-emerald-300">
              {hero.greeting}
            </span>
            <span className="mt-7 block text-[clamp(2.25rem,7vw,4.75rem)] font-black leading-[1.02] tracking-[-0.035em] sm:mt-9">
              {hero.title}
            </span>
          </h1>

          <div className="mt-9 text-sm leading-relaxed sm:mt-11 sm:text-base">
            <p className="font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              Recommended by
            </p>
            <p className="mt-1.5 font-semibold text-zinc-800 dark:text-zinc-200">
              {hero.recommendedBy}
            </p>
          </div>

          <p className="mt-9 min-h-8 text-[clamp(1.15rem,4vw,1.55rem)] font-semibold leading-8 text-zinc-700 dark:text-zinc-200 sm:mt-11">
            <TypewriterText phrases={hero.phrases} />
          </p>
          <HeroJourneyRoute />
        </div>
      </div>
      <a
        aria-label="Scroll to About section"
        className="homepage-down-button absolute bottom-8 left-1/2 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-black/10 bg-white/72 shadow-sm backdrop-blur-xl transition hover:border-emerald-600/30 dark:border-white/10 dark:bg-white/10 sm:flex"
        href="#about"
      >
        <span className="arrow-chevron" />
      </a>
    </section>
  );
}
