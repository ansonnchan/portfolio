"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/portfolio";

function useVancouverClock() {
  const [clock, setClock] = useState({
    time: "--:--:-- PDT",
    date: "Saturday May 16"
  });

  useEffect(() => {
    const timeFormatter = new Intl.DateTimeFormat("en-CA", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "America/Vancouver",
      timeZoneName: "short"
    });
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "America/Vancouver"
    });

    const updateTime = () => {
      const now = new Date();
      setClock({
        time: timeFormatter.format(now),
        date: dateFormatter.format(now)
      });
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return clock;
}

export default function Navbar() {
  const clock = useVancouverClock();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5">
      <div className="relative mx-auto flex max-w-7xl items-start justify-between lg:justify-center">
        <button
          aria-controls="main-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/80 text-zinc-800 shadow-sm backdrop-blur-xl transition hover:bg-emerald-50 hover:text-emerald-700 dark:border-white/10 dark:bg-[#10140f]/80 dark:text-zinc-100 dark:hover:bg-emerald-300/10 dark:hover:text-emerald-300 lg:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          {isMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>

        <nav
          aria-label="Main navigation"
          className={`${isMenuOpen ? "flex" : "hidden"} pointer-events-auto absolute inset-x-0 top-14 flex-col gap-1 rounded-xl border border-black/10 bg-white/95 p-2 text-sm font-semibold text-zinc-700 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-[#10140f]/95 dark:text-zinc-200 lg:static lg:flex lg:max-w-none lg:flex-row lg:items-center lg:rounded-full lg:bg-white/72 lg:p-1.5 lg:shadow-sm lg:dark:bg-[#10140f]/72`}
          id="main-navigation"
        >
          {navLinks.map((link) => (
            <a
              className="min-h-11 whitespace-nowrap rounded-lg px-4 py-3 transition hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-300/10 dark:hover:text-emerald-300 lg:min-h-0 lg:rounded-full lg:px-3 lg:py-2"
              href={link.href}
              key={link.label}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="clock-note handwritten-display pointer-events-auto absolute right-0 top-0 min-w-[7.25rem] px-3 py-2 text-center text-zinc-700 dark:text-zinc-200">
          <p className="text-base leading-5">{clock.time}</p>
          <p className="mt-0.5 text-sm leading-4 text-zinc-500 dark:text-zinc-400">
            {clock.date}
          </p>
        </div>
      </div>
    </header>
  );
}
