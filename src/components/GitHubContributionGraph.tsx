"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

type ContributionDay = {
  color: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
  date: string;
  weekday: number;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
  firstDay: string;
};

type ContributionMonth = {
  firstDay: string;
  name: string;
  totalWeeks: number;
  year: number;
};

type ContributionCalendar = {
  fetchedAt: string;
  months: ContributionMonth[];
  profileUrl: string;
  totalContributions: number;
  username: string;
  weeks: ContributionWeek[];
  year: number;
};

type NormalizedContributionDay = ContributionDay & {
  isFuture: boolean;
  isOutsideYear: boolean;
};

type NormalizedContributionWeek = {
  contributionDays: NormalizedContributionDay[];
  firstDay: string;
};

type MonthSpan = {
  name: string;
  span: number;
  startColumn: number;
};

type LoadState =
  | { status: "loading" }
  | { status: "success"; calendar: ContributionCalendar }
  | { status: "error" };

type TooltipPosition = {
  left: number;
  top: number;
};

const levelClasses: Record<ContributionLevel, string> = {
  NONE: "bg-zinc-200/80 dark:bg-white/10",
  FIRST_QUARTILE: "bg-emerald-200 dark:bg-emerald-900",
  SECOND_QUARTILE: "bg-emerald-400 dark:bg-emerald-700",
  THIRD_QUARTILE: "bg-emerald-600 dark:bg-emerald-500",
  FOURTH_QUARTILE: "bg-emerald-800 dark:bg-emerald-300"
};

const legendLevels: ContributionLevel[] = [
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE"
];
const futureDayClass = "bg-zinc-100 dark:bg-white/5";
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const weekdayLabels = [
  { label: "Mon", row: 2 },
  { label: "Wed", row: 4 },
  { label: "Fri", row: 6 }
];

const numberFormatter = new Intl.NumberFormat("en-US");
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  weekday: "short",
  year: "numeric"
});
const lastUpdatedFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit"
});
const tooltipMonthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long"
});

function getContributionLabel(day: ContributionDay) {
  const contributions =
    day.contributionCount === 1 ? "1 contribution" : `${day.contributionCount} contributions`;

  return `${contributions} on ${dateFormatter.format(new Date(`${day.date}T00:00:00`))}`;
}

function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  if (day % 10 === 1) {
    return "st";
  }

  if (day % 10 === 2) {
    return "nd";
  }

  if (day % 10 === 3) {
    return "rd";
  }

  return "th";
}

function getContributionTooltipLabel(day: ContributionDay) {
  const date = new Date(`${day.date}T00:00:00`);
  const dayOfMonth = date.getDate();
  const contributions =
    day.contributionCount === 0
      ? "No contributions"
      : day.contributionCount === 1
        ? "1 contribution"
        : `${day.contributionCount} contributions`;

  return `${contributions} on ${tooltipMonthFormatter.format(date)} ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)}.`;
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + days);

  return nextDate;
}

function getWeekStart(date: Date) {
  return addDays(date, -date.getDay());
}

function getWeekEnd(date: Date) {
  return addDays(date, 6 - date.getDay());
}

function getWeekIndex(gridStart: Date, date: Date) {
  const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;

  return Math.floor((getWeekStart(date).getTime() - gridStart.getTime()) / millisecondsPerWeek);
}

function getNormalizedCalendar(calendar: ContributionCalendar) {
  const contributionDaysByDate = new Map(
    calendar.weeks.flatMap((week) => week.contributionDays).map((day) => [day.date, day])
  );
  const yearStart = new Date(calendar.year, 0, 1);
  const yearEnd = new Date(calendar.year, 11, 31);
  const gridStart = getWeekStart(yearStart);
  const gridEnd = getWeekEnd(yearEnd);
  const todayKey = toDateKey(new Date(calendar.fetchedAt));
  const weeks: NormalizedContributionWeek[] = [];

  for (let weekStart = gridStart; weekStart <= gridEnd; weekStart = addDays(weekStart, 7)) {
    const contributionDays = Array.from({ length: 7 }, (_, weekday) => {
      const date = addDays(weekStart, weekday);
      const dateKey = toDateKey(date);
      const isOutsideYear = date.getFullYear() !== calendar.year;
      const existingDay = contributionDaysByDate.get(dateKey);

      return {
        color: existingDay?.color ?? "",
        contributionCount: existingDay?.contributionCount ?? 0,
        contributionLevel: existingDay?.contributionLevel ?? "NONE",
        date: dateKey,
        isFuture: !isOutsideYear && dateKey > todayKey,
        isOutsideYear,
        weekday
      } satisfies NormalizedContributionDay;
    });

    weeks.push({
      contributionDays,
      firstDay: toDateKey(weekStart)
    });
  }

  return {
    gridStart,
    weeks,
    year: calendar.year
  };
}

function getMonthSpans(gridStart: Date, weekCount: number, year: number): MonthSpan[] {
  return monthNames.map((name, index) => {
    const monthStart = new Date(year, index, 1);
    const nextMonthStart = index === 11 ? null : new Date(year, index + 1, 1);
    const startColumn = getWeekIndex(gridStart, monthStart) + 1;
    const nextStartColumn = nextMonthStart
      ? getWeekIndex(gridStart, nextMonthStart) + 1
      : weekCount + 1;

    return {
      name,
      span: Math.max(nextStartColumn - startColumn, 1),
      startColumn
    };
  });
}

function SkeletonGraph() {
  return (
    <div className="overflow-x-auto pb-2">
      <div
        aria-hidden="true"
        className="grid w-max animate-pulse grid-flow-col grid-rows-7 gap-[3px]"
      >
        {Array.from({ length: 371 }, (_, index) => (
          <span
            className="h-[var(--github-day-size)] w-[var(--github-day-size)] rounded-[3px] bg-zinc-200/80 dark:bg-white/10"
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default function GitHubContributionGraph() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [activeDay, setActiveDay] = useState<NormalizedContributionDay | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadContributions() {
      try {
        const response = await fetch("/api/github-contributions", {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("Could not load GitHub contributions.");
        }

        const calendar = (await response.json()) as ContributionCalendar;
        setState({ calendar, status: "success" });
      } catch (error) {
        if (!controller.signal.aborted) {
          setState({ status: "error" });
        }
      }
    }

    loadContributions();

    return () => controller.abort();
  }, []);

  const calendar = state.status === "success" ? state.calendar : null;
  const normalizedCalendar = useMemo(
    () => (calendar ? getNormalizedCalendar(calendar) : null),
    [calendar]
  );
  const monthSpans = useMemo(
    () =>
      normalizedCalendar
        ? getMonthSpans(
            normalizedCalendar.gridStart,
            normalizedCalendar.weeks.length,
            normalizedCalendar.year
          )
        : [],
    [normalizedCalendar]
  );

  const showDayTooltip = (
    day: NormalizedContributionDay,
    target: HTMLButtonElement
  ) => {
    const bounds = target.getBoundingClientRect();
    const tooltipHalfWidth = Math.min(140, (window.innerWidth - 16) / 2);
    setActiveDay(day);
    setTooltipPosition({
      left: Math.min(
        window.innerWidth - tooltipHalfWidth - 8,
        Math.max(tooltipHalfWidth + 8, bounds.left + bounds.width / 2)
      ),
      top: bounds.top - 8
    });
  };

  const hideDayTooltip = () => {
    setActiveDay(null);
    setTooltipPosition(null);
  };

  return (
    <section
      aria-label="GitHub contribution graph"
      className="comic-card mx-auto mt-10 w-full max-w-5xl min-w-0 overflow-hidden bg-white/80 p-4 backdrop-blur transition-colors duration-300 hover:border-emerald-500/35 dark:bg-white/10 sm:mt-12 sm:p-5"
      style={{ "--github-day-size": "clamp(0.52rem, 1.05vw, 0.68rem)" } as CSSProperties}
    >
      {state.status === "loading" && <SkeletonGraph />}

      {state.status === "error" && (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-sm font-semibold text-zinc-600 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300">
          GitHub activity is unavailable right now.
        </div>
      )}

      {calendar && normalizedCalendar && (
        <>
          <header className="relative grid gap-1 text-center text-zinc-600 dark:text-zinc-300 md:min-h-9 md:items-start">
            <h3 className="handwritten-display text-2xl text-zinc-900 dark:text-white sm:text-3xl">
              GitHub Contributions
            </h3>
            <p className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.12em] md:absolute md:right-0 md:top-1 md:text-right sm:text-sm">
              {numberFormatter.format(calendar.totalContributions)} contributions in{" "}
              {calendar.year}
            </p>
          </header>

          <div className="mt-4 overflow-x-auto pb-1">
            <div className="mx-auto w-max min-w-max px-2">
              <div
                className="ml-9 grid gap-[3px]"
                style={{
                  gridTemplateColumns: `repeat(${normalizedCalendar.weeks.length}, var(--github-day-size))`
                }}
              >
                {monthSpans.map((month) => (
                  <span
                    className="truncate text-[10px] font-semibold leading-4 text-zinc-500 dark:text-zinc-400"
                    key={month.name}
                    style={{ gridColumn: `${month.startColumn} / span ${month.span}` }}
                  >
                    {month.name}
                  </span>
                ))}
              </div>

              <div className="mt-1 grid grid-cols-[2rem_auto] gap-x-2">
                <div className="grid grid-rows-7 gap-[3px] text-[10px] font-semibold leading-[var(--github-day-size)] text-zinc-500 dark:text-zinc-400">
                  {weekdayLabels.map((weekday) => (
                    <span key={weekday.label} style={{ gridRow: weekday.row }}>
                      {weekday.label}
                    </span>
                  ))}
                </div>

                <div
                  aria-label={`${numberFormatter.format(calendar.totalContributions)} GitHub contributions in ${calendar.year}`}
                  className="grid w-max grid-flow-col grid-rows-7 gap-[3px]"
                  role="group"
                >
                  {normalizedCalendar.weeks.flatMap((week) =>
                    week.contributionDays.map((day) => {
                      if (day.isOutsideYear) {
                        return (
                          <span
                            aria-hidden="true"
                            className="h-[var(--github-day-size)] w-[var(--github-day-size)]"
                            key={`${week.firstDay}-${day.weekday}`}
                          />
                        );
                      }

                      const dayClass = day.isFuture
                        ? futureDayClass
                        : levelClasses[day.contributionLevel];

                      const isActive = activeDay?.date === day.date;

                      return (
                        <button
                          aria-label={getContributionLabel(day)}
                          className={`h-[var(--github-day-size)] w-[var(--github-day-size)] rounded-[3px] border border-black/5 transition hover:scale-125 hover:ring-2 hover:ring-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-white/10 ${dayClass} ${
                            isActive ? "ring-2 ring-emerald-500/50" : ""
                          }`}
                          key={day.date}
                          onBlur={hideDayTooltip}
                          onClick={(event) => showDayTooltip(day, event.currentTarget)}
                          onFocus={(event) => showDayTooltip(day, event.currentTarget)}
                          onMouseEnter={(event) =>
                            showDayTooltip(day, event.currentTarget)
                          }
                          onMouseLeave={(event) => {
                            if (event.currentTarget !== document.activeElement) {
                              hideDayTooltip();
                            }
                          }}
                          type="button"
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-3 flex flex-col items-start justify-between gap-3 uppercase text-zinc-600 dark:text-zinc-300 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-baseline gap-2 text-left">
              <p className="text-xs font-semibold sm:text-sm">Last updated</p>
              <time
                className="text-sm font-semibold text-zinc-900 dark:text-white"
                dateTime={calendar.fetchedAt}
              >
                {lastUpdatedFormatter.format(new Date(calendar.fetchedAt))}
              </time>
            </div>

            <div
              aria-label="Contribution intensity from less to more"
              className="flex shrink-0 items-center gap-1.5 text-xs font-semibold sm:justify-end"
            >
              <span className="mr-0.5">Less</span>
              <span aria-hidden="true" className="flex gap-1">
                {legendLevels.map((level) => (
                  <span
                    className={`h-2.5 w-2.5 rounded-[3px] border border-black/5 dark:border-white/10 ${levelClasses[level]}`}
                    key={level}
                  />
                ))}
              </span>
              <span className="ml-0.5">More</span>
            </div>
          </footer>
        </>
      )}

      {activeDay &&
        tooltipPosition &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[100] max-w-[calc(100vw-1rem)] -translate-x-1/2 -translate-y-full whitespace-normal rounded-lg bg-zinc-900 px-4 py-2 text-center text-sm font-semibold text-white shadow-lg"
            role="tooltip"
            style={{
              left: tooltipPosition.left,
              top: tooltipPosition.top
            }}
          >
            {getContributionTooltipLabel(activeDay)}
            <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-zinc-900" />
          </div>,
          document.body
        )}
    </section>
  );
}
