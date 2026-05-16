"use client";

import { useMemo, useState } from "react";

function daysUntilMayNine() {
  const today = new Date();
  const year = today.getMonth() > 4 || (today.getMonth() === 4 && today.getDate() > 9)
    ? today.getFullYear() + 1
    : today.getFullYear();
  const birthday = new Date(year, 4, 9);
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.ceil((birthday.getTime() - startOfToday.getTime()) / msPerDay));
}

type MiniWidgetProps = {
  title: string;
  icon: string;
  children: React.ReactNode;
};

function MiniWidget({ title, icon, children }: MiniWidgetProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <article className="surface-card w-full rounded-lg p-3 shadow-soft dark:shadow-soft-dark">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <img alt="" className="h-8 w-8 shrink-0 rounded-md object-contain" src={icon} />
          <p className="truncate text-xs font-black uppercase tracking-[0.16em] text-zinc-700 dark:text-zinc-200">
            {title}
          </p>
        </div>
        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? `Minimize ${title}` : `Expand ${title}`}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-black text-zinc-700 transition hover:border-emerald-600/30 hover:text-emerald-700 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-emerald-300"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          {isOpen ? "-" : "+"}
        </button>
      </div>
      {isOpen ? <div className="mt-3">{children}</div> : null}
    </article>
  );
}

export default function TopLeftWidgets() {
  const daysLeft = useMemo(() => daysUntilMayNine(), []);

  return (
    <div className="fixed left-3 top-28 z-40 flex w-[calc(100vw-1.5rem)] max-w-[19rem] flex-col gap-2 sm:left-5 sm:top-28">
      <MiniWidget title="Listening" icon="/assets/current_song.png">
        <div className="flex items-start gap-3">
          <img alt="Spotify" className="mt-1 h-5 w-5 shrink-0" src="/assets/spotify_logo.png" />
          <div>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Currently listening to
            </p>
            <p className="mt-1 text-sm font-bold leading-5 text-zinc-900 dark:text-white">
              《乌鸦说情话》by 季彦霖{" "}
              <span className="text-zinc-500 dark:text-zinc-400">(Ji Yanlin)</span>
            </p>
          </div>
        </div>
      </MiniWidget>

      <MiniWidget title="Birthday" icon="/assets/birthday.png">
        <p className="text-sm font-bold text-zinc-900 dark:text-white">
          {daysLeft === 0 ? "It’s birthday day :)" : `${daysLeft} days until May 9`}
        </p>
        <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
          Quietly accepting cake, coffee, and emotionally supportive debugging.
        </p>
      </MiniWidget>
    </div>
  );
}
