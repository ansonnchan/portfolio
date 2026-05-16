"use client";

import { useMemo, useState } from "react";

function daysUntilMayNine() {
  const today = new Date();
  const birthdayYear =
    today.getMonth() > 4 || (today.getMonth() === 4 && today.getDate() > 9)
      ? today.getFullYear() + 1
      : today.getFullYear();
  const birthday = new Date(birthdayYear, 4, 9);
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.ceil((birthday.getTime() - startOfToday.getTime()) / msPerDay));
}

export default function TopLeftWidgets() {
  const [isOpen, setIsOpen] = useState(false);
  const daysLeft = useMemo(() => daysUntilMayNine(), []);

  return (
    <article className="absolute left-4 top-28 z-30 w-[calc(100vw-2rem)] max-w-[18rem] rounded-lg border border-black/10 bg-white/72 p-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#10140f]/72 sm:left-6 sm:top-28">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <img alt="" className="h-8 w-8 shrink-0 rounded-md object-contain" src="/assets/birthday.png" />
          <p className="truncate text-xs font-black uppercase tracking-[0.16em] text-zinc-700 dark:text-zinc-200">
            Birthday Countdown
          </p>
        </div>
        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Minimize birthday countdown" : "Expand birthday countdown"}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-black text-zinc-700 transition hover:border-emerald-600/30 hover:text-emerald-700 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-emerald-300"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          {isOpen ? "∧" : "∨"}
        </button>
      </div>

      {isOpen ? (
        <div className="mt-3">
          <p className="text-sm font-bold text-zinc-900 dark:text-white">
            {daysLeft === 0 ? "Birthday unlocked today :)" : `${daysLeft} days until May 9`}
          </p>
          <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            Quietly accepting cake, coffee, and emotionally supportive debugging.
          </p>
        </div>
      ) : null}
    </article>
  );
}
