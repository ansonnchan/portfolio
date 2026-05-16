import { socials } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 px-4 py-12 dark:border-white/10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
        <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
          Anson Chan © 2026
        </p>
        <div className="flex items-center justify-center gap-3">
          {socials.map((social) => (
            <a
              aria-label={social.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition hover:-translate-y-0.5 hover:border-emerald-600/30 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/10 dark:hover:bg-emerald-300/10"
              href={social.href}
              key={social.label}
              rel="noreferrer"
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
            >
              <img alt="" className="h-5 w-5 object-contain" src={social.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
