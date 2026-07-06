import { hero } from "@/data/portfolio";
import HeroJourneyRoute from "@/components/HeroJourneyRoute";
import TypewriterText from "@/components/TypewriterText";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden" id="top">
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-center justify-center px-5 pb-32 pt-28 sm:px-8 sm:pb-36 sm:pt-32">
        <div className="animate-reveal-up mx-auto w-full max-w-7xl text-center">
          <h1 className="text-zinc-950 dark:text-white">
            <span className="hero-greeting block text-[clamp(4.5rem,15vw,8.5rem)] leading-[0.82] text-emerald-700 dark:text-emerald-300">
              {hero.greeting}
            </span>
            <span className="handwritten-display mt-7 block text-[clamp(2.5rem,5vw,4rem)] leading-[1.02] sm:mt-8 xl:whitespace-nowrap">
              {hero.title}
            </span>
          </h1>

          <div className="handwritten-display mt-7 text-zinc-700 dark:text-zinc-200 sm:mt-9">
            <p className="text-[clamp(1.4rem,4vw,1.8rem)] leading-8">I’m a</p>
            <p className="mt-1 min-h-11 text-[clamp(1.8rem,5vw,2.45rem)] leading-10">
              <TypewriterText phrases={hero.phrases} />
            </p>
          </div>
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
