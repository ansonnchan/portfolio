"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { githubActivity } from "@/data/portfolio";

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
};

type LoadState =
  | { status: "loading" }
  | { status: "success"; calendar: ContributionCalendar }
  | { status: "error" };

const levelClasses: Record<ContributionLevel, string> = {
  NONE: "bg-zinc-200/80 dark:bg-white/10",
  FIRST_QUARTILE: "bg-emerald-200 dark:bg-emerald-900",
  SECOND_QUARTILE: "bg-emerald-400 dark:bg-emerald-700",
  THIRD_QUARTILE: "bg-emerald-600 dark:bg-emerald-500",
  FOURTH_QUARTILE: "bg-emerald-800 dark:bg-emerald-300"
};

const weekdayLabels = [
  { label: "Mon", row: 2 },
  { label: "Wed", row: 4 },
  { label: "Fri", row: 6 }
];

const numberFormatter = new Intl.NumberFormat("en-US");
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric"
});

function getContributionLabel(day: ContributionDay) {
  const contributions =
    day.contributionCount === 1 ? "1 contribution" : `${day.contributionCount} contributions`;

  return `${contributions} on ${dateFormatter.format(new Date(`${day.date}T00:00:00`))}`;
}

function getDayForWeekday(week: ContributionWeek, weekday: number) {
  return week.contributionDays.find((day) => day.weekday === weekday);
}

function getMonthSpans(months: ContributionMonth[], weekCount: number) {
  let remainingWeeks = weekCount;

  return months
    .map((month, index) => {
      const span =
        index === months.length - 1 ? remainingWeeks : Math.min(month.totalWeeks, remainingWeeks);

      remainingWeeks = Math.max(remainingWeeks - span, 0);

      return {
        ...month,
        span
      };
    })
    .filter((month) => month.span > 0);
}

function getCalendarStats(calendar: ContributionCalendar) {
  const days = calendar.weeks.flatMap((week) => week.contributionDays);
  const bestDay = days.reduce<ContributionDay | null>((best, day) => {
    if (!best || day.contributionCount > best.contributionCount) {
      return day;
    }

    return best;
  }, null);
  const activeDays = days.filter((day) => day.contributionCount > 0).length;

  return {
    activeDays,
    bestDay
  };
}

function SkeletonGraph() {
  return (
    <div className="mt-5 overflow-x-auto pb-2">
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
  const stats = useMemo(() => (calendar ? getCalendarStats(calendar) : null), [calendar]);
  const monthSpans = useMemo(
    () => (calendar ? getMonthSpans(calendar.months, calendar.weeks.length) : []),
    [calendar]
  );

  return (
    <section
      aria-label="GitHub contribution graph"
      className="!mt-10 rounded-lg border border-zinc-950/10 bg-white/80 p-4 shadow-soft backdrop-blur transition-colors duration-300 hover:border-emerald-500/35 dark:border-white/10 dark:bg-white/10 dark:shadow-soft-dark sm:p-5"
      style={{ "--github-day-size": "0.62rem" } as CSSProperties}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/10">
              <img alt="" className="h-5 w-5 object-contain dark:invert" src="/assets/about/github_icon.png" />
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-black leading-tight text-zinc-950 dark:text-white sm:text-xl">
                GitHub Contributions
              </h3>
              <a
                className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-100"
                href={githubActivity.profileUrl}
                rel="noreferrer"
                target="_blank"
              >
                @{githubActivity.username}
              </a>
            </div>
          </div>
        </div>

        {calendar && (
          <div className="grid grid-cols-3 gap-5 border-t border-black/10 pt-4 text-left dark:border-white/10 sm:min-w-72 sm:border-t-0 sm:pt-0">
            <div>
              <p className="text-base font-black leading-none text-zinc-950 dark:text-white">
                {numberFormatter.format(calendar.totalContributions)}
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                total
              </p>
            </div>
            <div>
              <p className="text-base font-black leading-none text-zinc-950 dark:text-white">
                {numberFormatter.format(stats?.activeDays ?? 0)}
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                active
              </p>
            </div>
            <div>
              <p className="text-base font-black leading-none text-zinc-950 dark:text-white">
                {numberFormatter.format(stats?.bestDay?.contributionCount ?? 0)}
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                best
              </p>
            </div>
          </div>
        )}
      </div>

      {state.status === "loading" && <SkeletonGraph />}

      {state.status === "error" && (
        <div className="mt-5 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-sm font-semibold text-zinc-600 dark:border-white/15 dark:bg-white/5 dark:text-zinc-300">
          GitHub activity is unavailable right now.
        </div>
      )}

      {calendar && (
        <div className="mt-5 overflow-x-auto pb-2">
          <div className="min-w-max">
            <div className="ml-9 grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${calendar.weeks.length}, var(--github-day-size))` }}>
              {monthSpans.map((month) => (
                <span
                  className="truncate text-[10px] font-semibold leading-4 text-zinc-500 dark:text-zinc-400"
                  key={`${month.name}-${month.year}-${month.firstDay}`}
                  style={{ gridColumn: `span ${month.span}` }}
                >
                  {month.name.slice(0, 3)}
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
                aria-label={`${numberFormatter.format(calendar.totalContributions)} GitHub contributions in the last year`}
                className="grid w-max grid-flow-col grid-rows-7 gap-[3px]"
                role="img"
              >
                {calendar.weeks.flatMap((week) =>
                  Array.from({ length: 7 }, (_, weekday) => {
                    const day = getDayForWeekday(week, weekday);

                    if (!day) {
                      return (
                        <span
                          aria-hidden="true"
                          className="h-[var(--github-day-size)] w-[var(--github-day-size)]"
                          key={`${week.firstDay}-${weekday}`}
                        />
                      );
                    }

                    return (
                      <span
                        aria-label={getContributionLabel(day)}
                        className={`h-[var(--github-day-size)] w-[var(--github-day-size)] rounded-[3px] border border-black/5 transition hover:scale-125 hover:ring-2 hover:ring-emerald-500/30 dark:border-white/10 ${levelClasses[day.contributionLevel]}`}
                        key={day.date}
                        title={getContributionLabel(day)}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
