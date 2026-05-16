"use client";

import { useState } from "react";

const idleDog = "/assets/eastereggs/dog-idle-transparent.webm";
const runningDog = "/assets/eastereggs/dog-run-transparent.webm";

export default function PetDogEgg() {
  const [pets, setPets] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handlePet = () => {
    if (isRunning) {
      return;
    }

    setPets((current) => current + 1);
    setIsRunning(true);
    window.setTimeout(() => setIsRunning(false), 4200);
  };

  return (
    <div className="fixed bottom-3 left-3 z-40 h-28 w-44 sm:bottom-5 sm:left-5 sm:h-32 sm:w-56">
      <div className="absolute bottom-0 left-0 h-16 w-16 sm:h-20 sm:w-20" aria-hidden="true">
        <div className="absolute bottom-0 left-1 h-11 w-14 rounded-b-md border border-black/10 bg-emerald-100 shadow-sm dark:border-white/10 dark:bg-emerald-900/50" />
        <div className="absolute bottom-8 left-0 h-11 w-16 rotate-45 rounded-sm border-l border-t border-black/10 bg-emerald-200 dark:border-white/10 dark:bg-emerald-700/60" />
        <div className="absolute bottom-0 left-6 h-8 w-5 rounded-t-full bg-zinc-900 dark:bg-zinc-950" />
      </div>

      <button
        aria-label="Pet the dog"
        className={`absolute bottom-2 left-12 h-20 w-24 transition sm:left-16 sm:h-24 sm:w-28 ${
          isRunning ? "animate-dog-run cursor-wait" : "hover:-translate-y-1"
        }`}
        disabled={isRunning}
        onClick={handlePet}
        type="button"
      >
        <video
          aria-hidden="true"
          autoPlay
          className="h-full w-full object-contain"
          key={isRunning ? "running-dog" : "idle-dog"}
          loop
          muted
          playsInline
          src={isRunning ? runningDog : idleDog}
        />
      </button>

      {pets > 0 ? (
        <p className="absolute -top-1 left-2 rounded-full border border-black/10 bg-white/82 px-3 py-1 text-xs font-bold text-zinc-700 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#10140f]/82 dark:text-zinc-200">
          dog has been petted {pets} {pets === 1 ? "time" : "times"}
        </p>
      ) : null}
    </div>
  );
}
