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
            {about.paragraphs.map((paragraph, index) => (
              <p key={index}>
                <RichText segments={paragraph} />
              </p>
            ))}

            <p>{about.closing}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
