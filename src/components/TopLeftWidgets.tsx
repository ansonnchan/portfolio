"use client";

import { useEffect, useState } from "react";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getNextBirthday() {
  const now = new Date();
  const birthdayThisYear = new Date(now.getFullYear(), 4, 9, 0, 0, 0, 0);
  return now < birthdayThisYear
    ? birthdayThisYear
    : new Date(now.getFullYear() + 1, 4, 9, 0, 0, 0, 0);
}

function getCountdown(): Countdown {
  const now = new Date();
  const target = getNextBirthday();
  const totalSeconds = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
}

export default function TopLeftWidgets() {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const tick = () => setCountdown(getCountdown());
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <aside className="absolute left-3 top-3 z-40 max-w-[calc(100vw-1.5rem)] rounded-lg border border-black/10 bg-white/72 px-3 py-2 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#10140f]/72 sm:left-5 sm:top-4">
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
        birthday.exe
      </p>
      <p className="mt-1 max-w-[16rem] text-xs font-bold leading-5 text-zinc-700 dark:text-zinc-200 sm:max-w-none">
        {countdown.days} days, {countdown.hours} hours, {countdown.minutes} minutes,{" "}
        {countdown.seconds} seconds
      </p>
    </aside>
  );
}
