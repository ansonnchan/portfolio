import { hero } from "@/data/portfolio";
import TypewriterText from "@/components/TypewriterText";

type HeroProps = {
  isDark: boolean;
};

export default function Hero({ isDark: _isDark }: HeroProps) {
  return (
    <section className="relative overflow-hidden" id="top">
      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-6 py-24 sm:px-10 lg:grid-cols-[1fr_1fr] lg:px-12">
        <div className="animate-reveal-up mx-auto w-full max-w-[620px] text-left lg:justify-self-end">
          <p className="text-3xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
            {hero.greeting}
          </p>
          <h1 className="mt-5 text-5xl font-black leading-[1.03] tracking-normal text-zinc-950 dark:text-white sm:text-6xl">
            I’m <span className="text-emerald-700 dark:text-emerald-300">{hero.name}</span>
          </h1>
          <p className="mt-7 min-h-12 text-3xl font-black tracking-normal text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            <TypewriterText phrases={hero.phrases} />
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-[500px] justify-center lg:justify-self-start">
          <video
            aria-label="Chibi Anson waving"
            autoPlay
            className="animate-float-soft h-auto max-h-[44vh] w-auto max-w-full object-contain sm:max-h-[56vh] lg:max-h-[62vh]"
            loop
            muted
            playsInline
            src={hero.video}
          />
        </div>
      </div>
      <a
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-black/10 bg-white/72 shadow-sm backdrop-blur-xl transition hover:-translate-x-1/2 hover:-translate-y-1 hover:border-emerald-600/30 dark:border-white/10 dark:bg-white/10"
        href="#about"
      >
        <span className="h-3 w-3 rotate-45 border-b-2 border-r-2 border-zinc-800 dark:border-white" />
      </a>
    </section>
  );
}
