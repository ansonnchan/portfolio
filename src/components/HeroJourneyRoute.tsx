const stops = [
  {
    city: "Hong Kong",
    flag: "🇭🇰",
    subtitle: "Born here",
    x: 14,
    y: 68
  },
  {
    city: "Adelaide",
    flag: "🇦🇺",
    subtitle: "Grew up here",
    x: 50,
    y: 28
  },
  {
    city: "Vancouver",
    flag: "🇨🇦",
    subtitle: "Studying here",
    x: 86,
    y: 66
  }
];

const routePath = "M 14 34 C 29 12, 42 10, 50 16 C 60 22, 72 36, 86 31";

export default function HeroJourneyRoute() {
  return (
    <div
      aria-label="Anson's journey from Hong Kong to Adelaide to Vancouver"
      className="hero-journey-route mt-6"
    >
      <div className="hero-journey-mobile" aria-hidden="true">
        <span>🇭🇰 Hong Kong</span>
        <span>→</span>
        <span>🇦🇺 Adelaide</span>
        <span>→</span>
        <span>🇨🇦 Vancouver</span>
      </div>

      <div className="hero-journey-map" aria-hidden="true">
        <svg className="hero-journey-svg" preserveAspectRatio="none" viewBox="0 0 100 50">
          <path
            className="hero-journey-path"
            d={routePath}
            pathLength="100"
          />
        </svg>

        {stops.map((stop) => (
          <span
            className="hero-journey-stop"
            key={stop.city}
            style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
          >
            <span className="hero-journey-flag">{stop.flag}</span>
            <span className="hero-journey-copy">
              <span className="hero-journey-city">{stop.city}</span>
              <span className="hero-journey-subtitle">{stop.subtitle}</span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
