"use client";

import type { CSSProperties, KeyboardEvent } from "react";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "anson-total-cultivation";

const stages = ["Early Stage", "Middle Stage", "Late Stage", "Peak Stage"] as const;

const realms = [
  { name: "Mortal", threshold: 0 },
  { name: "Qi Refining", threshold: 10 },
  { name: "Foundation Establishment", threshold: 50 },
  { name: "Golden Core", threshold: 150 },
  { name: "Nascent Soul", threshold: 500 },
  { name: "Spirit Transformation", threshold: 1000 },
  { name: "Void Refining Realm", threshold: 2500 },
  { name: "Body Integration", threshold: 5000 },
  { name: "Mahayana", threshold: 10000 },
  { name: "Half-Immortal", threshold: 25000 },
  { name: "Immortal", threshold: 50000 }
] as const;

type Particle = {
  id: number;
  x: number;
  y: number;
  delay: number;
};

type CultivationResponse = {
  count: number;
  persistent: boolean;
};

function realmSuffix(realm: string) {
  if (realm === "Immortal" || realm.endsWith("Realm")) {
    return realm;
  }
  return `${realm} Realm`;
}

function getCultivationInfo(count: number) {
  const realmIndex = realms.reduce(
    (currentIndex, realm, index) => (count >= realm.threshold ? index : currentIndex),
    0
  );
  const current = realms[realmIndex];
  const nextRealm = realms[realmIndex + 1];

  if (!nextRealm) {
    return {
      realm: current.name,
      currentLabel: "Immortal",
      remainingToNextRealm: 0,
      stageIndex: 0,
      realmIndex,
      completed: true
    };
  }

  if (current.name === "Mortal") {
    return {
      realm: "Mortal",
      currentLabel: "Mortal",
      remainingToNextRealm: Math.max(0, nextRealm.threshold - count),
      stageIndex: -1,
      realmIndex,
      completed: false
    };
  }

  const realmSpan = nextRealm.threshold - current.threshold;
  const stageSpan = realmSpan / stages.length;
  const progressInRealm = count - current.threshold;
  const stageIndex = Math.min(stages.length - 1, Math.floor(progressInRealm / stageSpan));
  const stage = stages[stageIndex];

  return {
    realm: current.name,
    currentLabel: `${current.name} · ${stage}`,
    remainingToNextRealm: Math.max(0, nextRealm.threshold - count),
    stageIndex,
    realmIndex,
    completed: false
  };
}

async function syncCultivationCount(localCount: number) {
  const response = await fetch("/api/cultivation", {
    body: JSON.stringify({ action: "sync", count: localCount }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as CultivationResponse;
}

async function incrementCultivationCount() {
  const response = await fetch("/api/cultivation", {
    body: JSON.stringify({ action: "increment" }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as CultivationResponse;
}

export default function CultivationCounter() {
  const [count, setCount] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [glow, setGlow] = useState<"stage" | "realm" | null>(null);
  const [breakthrough, setBreakthrough] = useState("");

  const info = useMemo(() => getCultivationInfo(count), [count]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? Number.parseInt(stored, 10) : 0;
    const localCount = Number.isFinite(parsed) ? parsed : 0;

    setCount(localCount);
    setHasLoaded(true);

    let isCurrent = true;

    syncCultivationCount(localCount)
      .then((data) => {
        if (isCurrent && data?.persistent) {
          setCount(data.count);
        }
      })
      .catch(() => {
        // Keep the local count when remote persistence is unavailable.
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      window.localStorage.setItem(STORAGE_KEY, String(count));
    }
  }, [count, hasLoaded]);

  const createParticles = () => {
    const burst = Array.from({ length: 8 }, (_, index) => ({
      id: Date.now() + index,
      x: 20 + Math.random() * 58,
      y: 34 + Math.random() * 38,
      delay: Math.random() * 0.16
    }));

    setParticles((current) => [...current, ...burst]);
    window.setTimeout(() => {
      setParticles((current) => current.filter((particle) => !burst.some((item) => item.id === particle.id)));
    }, 950);
  };

  const cultivate = () => {
    if (info.completed) {
      createParticles();
      setGlow("stage");
      window.setTimeout(() => setGlow(null), 650);
      return;
    }

    const previous = getCultivationInfo(count);
    const nextCount = count + 1;
    const next = getCultivationInfo(nextCount);

    setCount(nextCount);
    createParticles();

    incrementCultivationCount()
      .then((data) => {
        if (data?.persistent) {
          setCount((current) => Math.max(current, data.count));
        }
      })
      .catch(() => {
        // The optimistic local click is already saved in localStorage.
      });

    if (next.realmIndex > previous.realmIndex) {
      setGlow("realm");
      setBreakthrough(`Breakthrough! ${realmSuffix(next.realm)}`);
      window.setTimeout(() => setBreakthrough(""), 1700);
      window.setTimeout(() => setGlow(null), 1100);
      return;
    }

    if (next.stageIndex > previous.stageIndex || next.currentLabel !== previous.currentLabel) {
      setGlow("stage");
      window.setTimeout(() => setGlow(null), 750);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      cultivate();
    }
  };

  return (
    <aside
      aria-label="Cultivation Counter easter egg"
      className="absolute bottom-3 left-3 z-40 w-[12rem] text-center sm:bottom-5 sm:left-5 sm:w-[14rem]"
    >
      {breakthrough ? (
        <div className="mb-2 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-black text-white shadow-sm">
          {breakthrough}
        </div>
      ) : null}

      <div className="space-y-1 text-xs font-black leading-5 text-zinc-800 drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)] dark:text-zinc-100 dark:drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
        <p>Total Cultivation: {count}</p>
        <p>
          Next Realm:{" "}
          {info.completed ? "Dao completed" : `${info.remainingToNextRealm} clicks`}
        </p>
      </div>

      <p className="mx-auto mt-2 w-fit rounded-full bg-emerald-100/85 px-3 py-1 text-[11px] font-black text-emerald-800 shadow-sm dark:bg-emerald-300/15 dark:text-emerald-200">
        Click me to help me cultivate faster
      </p>

      <div className="relative mx-auto mt-1 h-32 w-32 sm:h-36 sm:w-36">
        {particles.map((particle) => (
          <span
            className="qi-particle"
            key={particle.id}
            style={
              {
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`
              } as CSSProperties
            }
          />
        ))}
        <button
          aria-label="Click to cultivate"
          className={`cultivator-button absolute inset-0 flex items-center justify-center ${
            glow === "realm" ? "cultivator-realm-glow" : glow === "stage" ? "cultivator-stage-glow" : ""
          }`}
          onClick={cultivate}
          onKeyDown={handleKeyDown}
          type="button"
        >
          <img
            alt="Cultivator"
            className="cultivator-idle h-full w-full object-contain"
            src="/assets/eastereggs/cultivator.png"
          />
        </button>
      </div>

      <p className="text-xs font-black text-emerald-700 drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)] dark:text-emerald-300 dark:drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
        {info.currentLabel}
      </p>
    </aside>
  );
}
