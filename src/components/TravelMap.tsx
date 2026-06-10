"use client";

import { geoNaturalEarth1, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { useMemo, useState } from "react";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldMap from "world-atlas/countries-110m.json";
import { travel } from "@/data/portfolio";

type CountryProperties = {
  name: string;
};

type CountryFeature = Feature<Geometry, CountryProperties> & {
  id?: string | number;
};

const mapWidth = 1000;
const mapHeight = 520;

const visitedCountryNamesById = new Map([
  ["036", "Australia"],
  ["124", "Canada"],
  ["840", "United States"],
  ["484", "Mexico"],
  ["360", "Bali"],
  ["156", "China"],
  ["458", "Malaysia"],
  ["392", "Japan"],
  ["410", "South Korea"],
  ["764", "Thailand"],
  ["826", "United Kingdom"]
]);

const placeMarkers: { name: string; coordinates: [number, number] }[] = [
  { name: "Bali", coordinates: [115.1889, -8.4095] },
  { name: "Hong Kong", coordinates: [114.1694, 22.3193] }
];

const regions = ["North America", "Asia", "Europe", "Oceania"];

const topology = worldMap as unknown as Topology<{
  countries: GeometryCollection<CountryProperties>;
}>;

const countryFeatures = (
  feature<CountryProperties>(topology, topology.objects.countries) as FeatureCollection<
    Geometry,
    CountryProperties
  >
).features as CountryFeature[];

const projection = geoNaturalEarth1()
  .scale(184)
  .translate([mapWidth / 2, mapHeight / 2 + 22]);

const pathGenerator = geoPath(projection);

function getCountryId(country: CountryFeature) {
  return String(country.id ?? "").padStart(3, "0");
}

function groupedCountries() {
  return regions.map((region) => ({
    region,
    countries: travel.countries.filter((country) => country.region === region)
  }));
}

export default function TravelMap() {
  const [activePlace, setActivePlace] = useState<string | null>(null);
  const countryGroups = useMemo(groupedCountries, []);
  const visitedCount = travel.countries.length;
  const tooltipWidth = activePlace ? Math.max(132, activePlace.length * 9.6) : 0;

  return (
    <section className="scroll-fade scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8" id="travel-map">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
            {travel.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            {travel.subtitle}
          </p>
        </div>

        <div className="surface-card overflow-hidden rounded-lg p-4 shadow-soft dark:shadow-soft-dark sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 text-sm font-bold text-zinc-600 dark:text-zinc-300 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                {visitedCount}
              </span>{" "}
              places visited
            </div>
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded bg-emerald-600" />
                Visited
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded bg-zinc-200 dark:bg-zinc-700" />
                Not yet visited
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded bg-zinc-300 dark:bg-zinc-600" />
                Hover
              </span>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <svg
              aria-label="World map showing countries Anson has visited"
              className="min-w-[54rem]"
              role="img"
              viewBox={`0 0 ${mapWidth} ${mapHeight}`}
            >
              <rect className="fill-transparent" height={mapHeight} width={mapWidth} />
              <g>
                {countryFeatures.map((country) => {
                  const id = getCountryId(country);
                  const visitedName = visitedCountryNamesById.get(id);
                  const isVisited = Boolean(visitedName);
                  const label = visitedName ?? country.properties.name;
                  const isActive = activePlace === label;
                  const countryPath = pathGenerator(country);
                  const countryClasses = isVisited
                    ? isActive
                      ? "fill-emerald-500 dark:fill-emerald-300"
                      : "fill-emerald-600 hover:fill-emerald-500 dark:fill-emerald-400 dark:hover:fill-emerald-300"
                    : isActive
                      ? "fill-zinc-300 dark:fill-zinc-600"
                      : "fill-zinc-200 hover:fill-zinc-300 dark:fill-zinc-700 dark:hover:fill-zinc-600";

                  if (!countryPath) {
                    return null;
                  }

                  return (
                    <path
                      aria-label={label}
                      className={`cursor-pointer stroke-white stroke-[1.1] transition-colors focus:outline-none dark:stroke-[#10140f] ${countryClasses}`}
                      d={countryPath}
                      key={id}
                      onBlur={() => setActivePlace(null)}
                      onClick={() => setActivePlace(label)}
                      onFocus={() => setActivePlace(label)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setActivePlace(label);
                        }
                      }}
                      onMouseEnter={() => setActivePlace(label)}
                      onMouseLeave={() => setActivePlace(null)}
                      role="button"
                      tabIndex={0}
                    >
                      <title>{label}</title>
                    </path>
                  );
                })}
              </g>

              {placeMarkers.map((place) => {
                const point = projection(place.coordinates);

                if (!point) {
                  return null;
                }

                return (
                  <circle
                    aria-label={place.name}
                    className={`cursor-pointer stroke-white stroke-[2] transition-colors ${
                      activePlace === place.name
                        ? "fill-emerald-500 dark:fill-emerald-300"
                        : "fill-emerald-600 hover:fill-emerald-500 dark:fill-emerald-400 dark:hover:fill-emerald-300"
                    }`}
                    cx={point[0]}
                    cy={point[1]}
                    key={place.name}
                    onBlur={() => setActivePlace(null)}
                    onClick={() => setActivePlace(place.name)}
                    onFocus={() => setActivePlace(place.name)}
                    onMouseEnter={() => setActivePlace(place.name)}
                    onMouseLeave={() => setActivePlace(null)}
                    r="4.5"
                    role="button"
                    tabIndex={0}
                  >
                    <title>{place.name}</title>
                  </circle>
                );
              })}

              {activePlace ? (
                <g pointerEvents="none">
                  <rect
                    className="fill-emerald-50 stroke-emerald-600/20 dark:fill-emerald-950 dark:stroke-emerald-300/20"
                    height="34"
                    rx="8"
                    strokeWidth="1"
                    width={tooltipWidth}
                    x={mapWidth / 2 - tooltipWidth / 2}
                    y="22"
                  />
                  <text
                    className="fill-emerald-800 text-[15px] font-black dark:fill-emerald-200"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    x={mapWidth / 2}
                    y="40"
                  >
                    {activePlace}
                  </text>
                </g>
              ) : null}
            </svg>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
              Countries Visited
            </h3>
          </div>

          <div className="mx-auto mt-6 grid max-w-4xl gap-6 text-center sm:grid-cols-2">
            {countryGroups.map((group) => (
              <div key={group.region}>
                <h4 className="text-base font-black text-emerald-700 dark:text-emerald-300">
                  {group.region}
                </h4>
                <p className="mt-2 text-sm font-semibold leading-7 text-zinc-700 dark:text-zinc-300">
                  {group.countries.map((country) => country.name).join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
