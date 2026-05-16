"use client";

import { useMemo, useState } from "react";

const messages = [
  "tail wag detected",
  "debugging morale +1",
  "good dog, good code",
  "Diamond queue confidence rising",
  "critical pet threshold reached"
];

export default function PetDogEgg() {
  const [pets, setPets] = useState(0);
  const message = useMemo(
    () => (pets === 0 ? "pet?" : messages[(pets - 1) % messages.length]),
    [pets]
  );

  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
      <button
        aria-label="Pet the dog"
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/82 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-emerald-600/30 dark:border-white/10 dark:bg-[#10140f]/82"
        onClick={() => setPets((current) => current + 1)}
        type="button"
      >
        <span className="relative h-7 w-7 rounded-full border-2 border-zinc-800 bg-amber-100 dark:border-white dark:bg-amber-200">
          <span className="absolute -left-1 top-1 h-3 w-2 -rotate-12 rounded-full bg-zinc-800 dark:bg-white" />
          <span className="absolute -right-1 top-1 h-3 w-2 rotate-12 rounded-full bg-zinc-800 dark:bg-white" />
          <span className="absolute left-2 top-3 h-1 w-1 rounded-full bg-zinc-900" />
          <span className="absolute right-2 top-3 h-1 w-1 rounded-full bg-zinc-900" />
          <span className="absolute left-1/2 top-4 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-zinc-900" />
        </span>
      </button>
      {pets > 0 ? (
        <div className="rounded-full border border-black/10 bg-white/82 px-3 py-2 text-xs font-bold text-zinc-700 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#10140f]/82 dark:text-zinc-200">
          {message} · {pets}
        </div>
      ) : null}
    </div>
  );
}
