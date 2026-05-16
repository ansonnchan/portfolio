"use client";

import { resumePath } from "@/data/portfolio";

type NavbarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  return (
    <header className="absolute right-4 top-4 z-40 sm:right-6 sm:top-6">
      <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/72 p-1.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#10140f]/72">
        <a
          className="inline-flex h-10 items-center gap-2 rounded-full bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700 dark:bg-white dark:text-[#10140f] dark:hover:bg-emerald-200"
          download
          href={resumePath}
        >
          <img alt="" className="h-4 w-4 invert dark:invert-0" src="/assets/download.png" />
          Resume
        </a>
        <button
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-zinc-800 transition hover:-translate-y-0.5 hover:border-emerald-500/40 dark:border-white/10 dark:bg-white/10 dark:text-white"
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
    </header>
  );
}
