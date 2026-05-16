import { about, socials } from "@/data/portfolio";
import RichText from "@/components/RichText";

export default function About() {
  return (
    <section className="scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8" id="about">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
          About Me
        </h2>

        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <aside className="surface-card h-fit rounded-lg p-4 shadow-soft dark:shadow-soft-dark">
            <div className="overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
              <img
                alt="Anson Chan profile"
                className="aspect-square w-full object-cover"
                src={about.profileImage}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {socials.map((social) => (
                <a
                  aria-label={social.label}
                  className="flex h-12 items-center justify-center rounded-lg border border-black/10 bg-white/80 transition hover:-translate-y-0.5 hover:border-emerald-600/30 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/8 dark:hover:bg-emerald-300/10"
                  href={social.href}
                  key={social.label}
                  rel="noreferrer"
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                >
                  <img alt="" className="h-6 w-6 object-contain" src={social.icon} />
                </a>
              ))}
            </div>
          </aside>

          <div className="space-y-5 text-base leading-8 text-zinc-700 dark:text-zinc-300 sm:text-lg">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index}>
                <RichText segments={paragraph} />
              </p>
            ))}

            <figure className="rounded-lg border border-emerald-600/20 bg-emerald-50 p-6 text-zinc-900 shadow-sm dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-white">
              <blockquote>
                <p className="text-2xl font-black tracking-normal text-emerald-800 dark:text-emerald-200 sm:text-3xl">
                  {about.quote.original}
                </p>
                <p className="mt-3 text-base italic leading-7 text-zinc-700 dark:text-zinc-200">
                  “{about.quote.translation}”
                </p>
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                — {about.quote.attribution}
              </figcaption>
            </figure>

            <p>{about.closing}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
