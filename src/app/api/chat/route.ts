import { NextResponse } from "next/server";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

const portfolioKnowledge = `
Anson Chan is a Computer Engineering student at UBC and an incoming third-year student. He is interested in software engineering, backend systems, real-time collaboration, AI/ML, and building polished user experiences.

Current internship:
Anson is joining ScalePad as a Software Developer Intern / Co-op in Vancouver for an 8-month internship starting in summer 2026. The role involves software development, likely working with technologies such as .NET and React.

Past experience:
- Software Engineering Intern at Borrow’d, an open-source nonprofit community platform, from January 2026 to April 2026. Worked on backend systems, search analytics, PostgreSQL query/index improvements, Redis caching, moderator workflows, CI/CD testing, and Kubernetes deployments.
- Undergraduate Research Assistant at the University of South Australia from June 2025 to August 2025. Worked on a RAG pipeline using LangGraph, improving retrieval quality, reducing iteration time, and optimizing latency with async retrieval and Redis caching.

Projects:
- Pear Programming: a real-time collaborative IDE using Java, Spring Boot, TypeScript, Redis, Yjs, WebSockets, STOMP/SockJS, Monaco Editor, and Llama 3/Groq.
- vent.ai: a privacy-first AI conversational platform using Next.js, TypeScript, Zustand, Redis/Upstash, and Groq.
- Rateguard API: a FastAPI, Redis, PostgreSQL, and Docker-based rate limiting API.
- Wallfacer Project: a hidden-state deduction game using React, TypeScript, FastAPI, PostgreSQL/Supabase, Redis, and Groq.
- Portfolio website: a cozy lofi/anime-inspired personal website built with Next.js.

Hobbies/interests:
Anson enjoys tennis, badminton, table tennis, pickleball, gaming, and has played trumpet for around 10 years. He likes League of Legends and is currently around Emerald, aiming for Diamond. He enjoys cozy/lofi/anime-inspired design.

Current media:
Anson is currently watching or binging Black Mirror and Stranger Things.
`;

const systemPrompt = `
You are a helpful portfolio guide for Anson Chan's personal website.
Answer about Anson in third person. Say "Anson is..." rather than "I am...".
Be friendly, concise, slightly playful, and professional enough for recruiters.
Avoid oversharing private details.
Use only the knowledge base below. If asked something not covered or unrelated to Anson, say you do not know and suggest checking Anson's resume, LinkedIn, GitHub, or contacting him.
Keep answers short: usually 2-5 sentences.

Knowledge base:
${portfolioKnowledge}
`;

const ansonTopicKeywords = [
  "anson",
  "chan",
  "portfolio",
  "resume",
  "linkedin",
  "github",
  "email",
  "contact",
  "ubc",
  "computer engineering",
  "engineering",
  "intern",
  "internship",
  "coop",
  "co-op",
  "scalepad",
  "borrow",
  "borrow’d",
  "unisa",
  "university of south australia",
  "research",
  "rag",
  "langgraph",
  "project",
  "pear",
  "vent",
  "rateguard",
  "wallfacer",
  "tech",
  "stack",
  "backend",
  "frontend",
  "react",
  "next",
  "typescript",
  "java",
  "spring",
  "fastapi",
  "postgres",
  "redis",
  "groq",
  "ai",
  "ml",
  "hobby",
  "hobbies",
  "tennis",
  "badminton",
  "pickleball",
  "table tennis",
  "trumpet",
  "league",
  "legends",
  "emerald",
  "diamond",
  "cdrama",
  "c-drama",
  "black mirror",
  "stranger things"
];

const generalAssistantIntents = [
  "hi",
  "hello",
  "hey",
  "help",
  "what can you do",
  "who are you",
  "suggest",
  "question"
];

const offTopicReplies = [
  "I’m tuned for Anson-related questions only. Try asking about his internships, projects, tech stack, hobbies, or how to contact him.",
  "Tiny portfolio assistant boundary: I can help with Anson’s experience, projects, interests, and links, but not random topics.",
  "I don’t know that from Anson’s portfolio context. You can ask about ScalePad, Borrow’d, Pear Programming, vent.ai, hobbies, or his resume instead."
];

function isChatMessage(message: unknown): message is ChatMessage {
  if (!message || typeof message !== "object") {
    return false;
  }

  const candidate = message as Record<string, unknown>;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string" &&
    candidate.content.trim().length > 0
  );
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[’']/g, "'");
}

function isAnsonRelatedPrompt(content: string) {
  const normalized = normalize(content);

  return (
    ansonTopicKeywords.some((keyword) => normalized.includes(normalize(keyword))) ||
    generalAssistantIntents.some((intent) => normalized.includes(intent))
  );
}

function pickOffTopicReply(content: string) {
  const index =
    Array.from(content).reduce((total, character) => total + character.charCodeAt(0), 0) %
    offTopicReplies.length;
  return offTopicReplies[index];
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "The assistant is not configured yet. Add GROQ_API_KEY to the server environment."
      },
      { status: 503 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const rawMessages = (body as { messages?: unknown }).messages;

  if (!Array.isArray(rawMessages)) {
    return NextResponse.json({ error: "Missing messages array." }, { status: 400 });
  }

  const messages = rawMessages.filter(isChatMessage).slice(-12);

  if (!messages.length) {
    return NextResponse.json({ error: "No valid messages were provided." }, { status: 400 });
  }

  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!latestUserMessage) {
    return NextResponse.json({ error: "No user message was provided." }, { status: 400 });
  }

  if (!isAnsonRelatedPrompt(latestUserMessage.content)) {
    return NextResponse.json({ reply: pickOffTopicReply(latestUserMessage.content) });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((message) => ({
            role: message.role,
            content: message.content.slice(0, 1200)
          }))
        ],
        temperature: 0.45,
        max_tokens: 320
      })
    });

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
      error?: { message?: string };
    };

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "The assistant provider returned an error." },
        { status: response.status }
      );
    }

    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "The assistant returned an empty response." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "The assistant could not be reached. Please try again later." },
      { status: 502 }
    );
  }
}
