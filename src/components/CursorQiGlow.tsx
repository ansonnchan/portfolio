"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type QiParticle = {
  id: number;
  x: number;
  y: number;
};

function shouldDisableCursorGlow() {
  const hasFineHoverPointer = window.matchMedia("(any-hover: hover) and (any-pointer: fine)").matches;

  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !hasFineHoverPointer
  );
}

export default function CursorQiGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const cursor = useRef({ x: -120, y: -120 });
  const eased = useRef({ x: -120, y: -120 });
  const frameRef = useRef<number | null>(null);
  const lastParticleAt = useRef(0);
  const particleId = useRef(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const [particles, setParticles] = useState<QiParticle[]>([]);

  useEffect(() => {
    setIsEnabled(!shouldDisableCursorGlow());
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    const animate = () => {
      eased.current.x += (cursor.current.x - eased.current.x) * 0.12;
      eased.current.y += (cursor.current.y - eased.current.y) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${eased.current.x}px, ${eased.current.y}px, 0) translate(-50%, -50%)`;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      cursor.current = { x: event.clientX, y: event.clientY };

      const now = performance.now();
      if (now - lastParticleAt.current < 180 || Math.random() > 0.28) {
        return;
      }

      lastParticleAt.current = now;
      const particle = {
        id: particleId.current,
        x: event.clientX + (Math.random() - 0.5) * 10,
        y: event.clientY + (Math.random() - 0.5) * 10
      };
      particleId.current += 1;

      setParticles((current) => [...current.slice(-5), particle]);
      window.setTimeout(() => {
        setParticles((current) => current.filter((item) => item.id !== particle.id));
      }, 1200);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div aria-hidden="true" className="cursor-qi-layer">
      <div className="cursor-qi-glow" ref={glowRef} />
      {particles.map((particle) => (
        <span
          className="cursor-qi-particle"
          key={particle.id}
          style={
            {
              "--cursor-qi-x": `${particle.x}px`,
              "--cursor-qi-y": `${particle.y}px`
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
