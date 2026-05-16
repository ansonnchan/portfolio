"use client";

import { useEffect, useState } from "react";
import { navLinks, resumePath } from "@/data/portfolio";

type NavbarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

function useVancouverClock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Vancouver"
    });

    const updateTime = () => setTime(formatter.format(new Date()));
    updateTime();
    const interval = window.setInterval(updateTime, 30000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const currentTime = useVancouverClock();

  return (
    <header className="pointer-events-none fixed left-3 right-3 top-3 z-50 sm:left-5 sm:right-5">
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-3">
        <div className="pointer-events-auto flex min-w-0 flex-col gap-1">
          <p className="ml-3 text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
            Anson Chan
          </p>
          <nav
            aria-label="Main navigation"
            className="flex max-w-[calc(100vw-7.5rem)] items-center gap-1 overflow-x-auto rounded-full border border-black/10 bg-white/72 p-1.5 text-sm font-semibold text-zinc-700 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#10140f]/72 dark:text-zinc-200 md:max-w-none"
          >
            {navLinks.map((link) => (
              <a
                className="whitespace-nowrap rounded-full px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-300/10 dark:hover:text-emerald-300"
                href={link.href}
                key={link.label}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pointer-events-auto flex shrink-0 flex-col items-end gap-1">
          <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/72 p-1.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#10140f]/72">
            <a
              className="inline-flex h-10 items-center gap-2 rounded-full bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700 dark:bg-white dark:text-[#10140f] dark:hover:bg-emerald-200"
              download
              href={resumePath}
            >
              <img alt="" className="h-4 w-4 invert dark:invert-0" src="/assets/download.png" />
              <span className="hidden sm:inline">Resume</span>
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
          <div className="rounded-full border border-black/10 bg-white/72 px-3 py-1 text-xs font-bold text-zinc-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#10140f]/72 dark:text-zinc-300">
            Vancouver · {currentTime}
          </div>
        </div>
      </div>
    </header>
  );
}
