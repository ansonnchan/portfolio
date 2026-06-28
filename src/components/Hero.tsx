import { hero, socials } from "@/data/portfolio";
import HeroJourneyRoute from "@/components/HeroJourneyRoute";
import NowPlayingPlayer from "@/components/NowPlayingPlayer";
import TypewriterText from "@/components/TypewriterText";

type HeroProps = {
  isDark: boolean;
};

export default function Hero({ isDark: _isDark }: HeroProps) {
  return (
    <section className="relative overflow-hidden" id="top">
      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-6 py-24 sm:px-10 lg:grid-cols-[1fr_1fr] lg:px-12">
        <div className="animate-reveal-up mx-auto w-full max-w-[720px] text-left lg:relative lg:-top-12 lg:justify-self-end">
          <p className="premium-heading-depth text-3xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
            {hero.greeting} I’m
          </p>
          <h1 className="premium-heading-depth mt-5 whitespace-nowrap text-5xl font-black leading-[1.03] tracking-normal text-zinc-950 dark:text-white sm:text-6xl">
            <span className="text-emerald-700 dark:text-emerald-300">{hero.name}</span>{" "}
            <span className="inline-block align-baseline text-3xl text-zinc-800 dark:text-zinc-200 sm:text-4xl">
              ({hero.chineseName})
            </span>
          </h1>
          <p className="premium-heading-depth mt-7 min-h-12 text-3xl font-black tracking-normal text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            <TypewriterText phrases={hero.phrases} />
          </p>
          <HeroJourneyRoute />
        </div>

        <div className="relative mx-auto flex w-full max-w-[500px] flex-col items-center justify-center lg:justify-self-start">
          <span className="hero-character-backdrop" aria-hidden="true" />
          <video
            aria-label="Chibi Anson waving"
            autoPlay
            className="animate-float-soft relative z-10 h-auto max-h-[44vh] w-auto max-w-full object-contain sm:max-h-[56vh] lg:max-h-[52vh]"
            loop
            muted
            playsInline
            src={hero.video}
          />
          <div className="mt-5 grid w-full max-w-[15rem] grid-cols-3 gap-3 sm:max-w-[17rem]">
            {socials.map((social) => (
              <a
                aria-label={social.label}
                className="flex h-12 items-center justify-center rounded-lg border border-black/10 bg-white/80 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-600/30 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/8 dark:hover:bg-emerald-300/10"
                href={social.href}
                key={social.label}
                rel="noreferrer"
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              >
                <img alt="" className="h-6 w-6 object-contain" src={social.icon} />
              </a>
            ))}
          </div>
          <NowPlayingPlayer />
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
