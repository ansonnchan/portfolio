import { NextResponse } from "next/server";

const CULTIVATION_KEY = "anson-total-cultivation";

type UpstashResult = {
  result?: unknown;
  error?: string;
};

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return { token, url };
}

async function redisCommand(command: unknown[]) {
  const config = getRedisConfig();

  if (!config) {
    return null;
  }

  const response = await fetch(config.url, {
    body: JSON.stringify(command),
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  if (!response.ok) {
    throw new Error(`Upstash request failed with ${response.status}`);
  }

  const data = (await response.json()) as UpstashResult;

  if (data.error) {
    throw new Error(data.error);
  }

  return data.result;
}

function parseCount(value: unknown) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

export async function GET() {
  try {
    if (!getRedisConfig()) {
      return NextResponse.json(
        { count: 0, persistent: false },
        { status: 503 }
      );
    }

    const result = await redisCommand(["GET", CULTIVATION_KEY]);

    return NextResponse.json({ count: parseCount(result), persistent: true });
  } catch {
    return NextResponse.json(
      { count: 0, persistent: false },
      { status: 503 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!getRedisConfig()) {
      return NextResponse.json(
        { count: 0, persistent: false },
        { status: 503 }
      );
    }

    const body = (await request.json().catch(() => ({}))) as {
      action?: string;
      count?: unknown;
    };

    if (body.action === "sync") {
      const localCount = parseCount(body.count);
      const currentCount = parseCount(await redisCommand(["GET", CULTIVATION_KEY]));
      const nextCount = Math.max(localCount, currentCount);
      await redisCommand(["SET", CULTIVATION_KEY, String(nextCount)]);
      return NextResponse.json({ count: nextCount, persistent: true });
    }

    const result = await redisCommand(["INCR", CULTIVATION_KEY]);

    return NextResponse.json({ count: parseCount(result), persistent: true });
  } catch {
    return NextResponse.json(
      { count: 0, persistent: false },
      { status: 503 }
    );
  }
}
