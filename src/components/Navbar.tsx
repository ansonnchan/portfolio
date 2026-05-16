"use client";

import { navLinks, resumePath } from "@/data/portfolio";

type NavbarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/86 backdrop-blur-xl dark:border-white/10 dark:bg-[#10140f]/86">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-3 md:contents">
          <a
            className="group inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:border-emerald-600/40 hover:bg-emerald-100 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-200 md:order-1"
            href="#top"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 transition group-hover:scale-125" />
            Anson.dev
          </a>

          <div className="flex shrink-0 items-center gap-2 md:order-3">
            <a
              className="inline-flex h-10 items-center gap-2 rounded-full border border-emerald-700/20 bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 dark:border-emerald-300/20 dark:bg-emerald-500 dark:text-[#10140f] dark:hover:bg-emerald-400"
              download
              href={resumePath}
            >
              <img alt="" className="h-4 w-4 invert dark:invert-0" src="/assets/download.png" />
              Resume
            </a>
            <button
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500/40 dark:border-white/10 dark:bg-white/10 dark:text-white"
              onClick={onToggleTheme}
              type="button"
            >
              <img
                alt=""
                className="h-5 w-5 dark:invert"
                src={
                  isDark
                    ? "/assets/light_mode_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
                    : "/assets/dark_mode_24dp_1F1F1F_FILL1_wght400_GRAD0_opsz24.svg"
                }
              />
            </button>
          </div>
        </div>

        <nav
          aria-label="Main navigation"
          className="flex gap-2 overflow-x-auto pb-1 text-sm font-medium text-zinc-600 dark:text-zinc-300 sm:justify-center sm:pb-0 md:order-2 md:mx-auto"
        >
          {navLinks.map((link) => (
            <a
              className="whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-zinc-900/5 hover:text-emerald-700 dark:hover:bg-white/10 dark:hover:text-emerald-300"
              download={link.download}
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
