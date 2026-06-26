import { NextResponse } from "next/server";
import { githubActivity } from "@/data/portfolio";

type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

type GitHubContributionDay = {
  color: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
  date: string;
  weekday: number;
};

type GitHubContributionWeek = {
  contributionDays: GitHubContributionDay[];
  firstDay: string;
};

type GitHubContributionMonth = {
  firstDay: string;
  name: string;
  totalWeeks: number;
  year: number;
};

type GitHubGraphQLResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          months: GitHubContributionMonth[];
          totalContributions: number;
          weeks: GitHubContributionWeek[];
        };
      };
    } | null;
  };
  errors?: { message: string }[];
};

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const CACHE_SECONDS = 60 * 60;

const CONTRIBUTION_QUERY = `
  query GitHubContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          months {
            firstDay
            name
            totalWeeks
            year
          }
          weeks {
            firstDay
            contributionDays {
              color
              contributionCount
              contributionLevel
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.GITHUB_TOKEN ?? process.env.GITHUB_GRAPHQL_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GitHub token is not configured." },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  }

  const to = new Date();
  const from = new Date(to);
  from.setFullYear(to.getFullYear() - 1);

  try {
    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "ansonnchan-portfolio"
      },
      body: JSON.stringify({
        query: CONTRIBUTION_QUERY,
        variables: {
          from: from.toISOString(),
          login: githubActivity.username,
          to: to.toISOString()
        }
      })
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "GitHub contribution data is unavailable." },
        {
          status: response.status,
          headers: {
            "Cache-Control": "no-store"
          }
        }
      );
    }

    const payload = (await response.json()) as GitHubGraphQLResponse;

    if (payload.errors?.length) {
      return NextResponse.json(
        { error: "GitHub returned an error while loading contribution data." },
        {
          status: 502,
          headers: {
            "Cache-Control": "no-store"
          }
        }
      );
    }

    const calendar = payload.data?.user?.contributionsCollection.contributionCalendar;

    if (!calendar) {
      return NextResponse.json(
        { error: "GitHub user was not found." },
        {
          status: 404,
          headers: {
            "Cache-Control": "no-store"
          }
        }
      );
    }

    return NextResponse.json(
      {
        fetchedAt: to.toISOString(),
        profileUrl: githubActivity.profileUrl,
        username: githubActivity.username,
        ...calendar
      },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 24}`
        }
      }
    );
  } catch {
    return NextResponse.json(
      { error: "GitHub contribution data could not be loaded." },
      {
        status: 502,
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  }
}
