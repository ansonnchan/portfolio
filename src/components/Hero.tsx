import { hero } from "@/data/portfolio";
import TopLeftWidgets from "@/components/TopLeftWidgets";
import TypewriterText from "@/components/TypewriterText";

type HeroProps = {
  isDark: boolean;
};

export default function Hero({ isDark: _isDark }: HeroProps) {
  return (
    <section className="relative overflow-hidden" id="top">
      <TopLeftWidgets />
      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-6 py-24 sm:px-10 lg:grid-cols-[1fr_1fr] lg:px-12">
        <div className="animate-reveal-up mx-auto w-full max-w-[720px] text-left lg:relative lg:-top-12 lg:justify-self-end">
          <p className="text-3xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
            {hero.greeting} I’m
          </p>
          <h1 className="mt-5 whitespace-nowrap text-5xl font-black leading-[1.03] tracking-normal text-zinc-950 dark:text-white sm:text-6xl">
            <span className="text-emerald-700 dark:text-emerald-300">{hero.name}</span>{" "}
            <span className="inline-block align-baseline text-3xl text-zinc-800 dark:text-zinc-200 sm:text-4xl">
              ({hero.chineseName})
            </span>
          </h1>
          <p className="mt-7 min-h-12 text-3xl font-black tracking-normal text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            <TypewriterText phrases={hero.phrases} />
          </p>
          <p aria-label="Hong Kong, Canada, Australia" className="mt-3 text-3xl tracking-normal sm:text-4xl">
            🇭🇰🇨🇦🇦🇺
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
        className="homepage-down-button absolute bottom-8 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-black/10 bg-white/72 shadow-sm backdrop-blur-xl transition hover:border-emerald-600/30 dark:border-white/10 dark:bg-white/10"
        href="#about"
      >
        <span className="arrow-chevron" />
      </a>
    </section>
  );
}
