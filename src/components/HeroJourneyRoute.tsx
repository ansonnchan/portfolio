"use client";

import { useEffect, useRef, useState } from "react";

const stops = [
  { flag: "🇭🇰", x: 16, y: 66 },
  { flag: "🇦🇺", x: 50, y: 30 },
  { flag: "🇨🇦", x: 84, y: 62 }
];

export default function HeroJourneyRoute() {
  const routeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const route = routeRef.current;
    if (!route) {
      return;
    }

    const heroSection = route.closest("section");
    if (!heroSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.18 }
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-label="Anson's journey from Hong Kong to Adelaide to Vancouver"
      className={`hero-journey-route mt-4 ${isVisible ? "is-visible" : "is-paused"}`}
      ref={routeRef}
    >
      <div className="hero-journey-mobile" aria-hidden="true">
        <span>🇭🇰</span>
        <span>→</span>
        <span>- - -</span>
        <span>✈</span>
        <span>- - -</span>
        <span>🇦🇺</span>
        <span>→</span>
        <span>- - -</span>
        <span>🇨🇦</span>
      </div>

      <div className="hero-journey-map" aria-hidden="true">
        <svg className="hero-journey-svg" viewBox="0 0 100 48" preserveAspectRatio="none">
          <path
            className="hero-journey-path"
            d="M 16 32 C 28 12, 40 9, 50 15 S 70 36, 84 29"
          />
        </svg>

        <span className="hero-journey-plane">✈</span>

        {stops.map((stop) => (
          <span
            className="hero-journey-flag"
            key={stop.flag}
            style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
          >
            {stop.flag}
          </span>
        ))}
      </div>
    </div>
  );
}
