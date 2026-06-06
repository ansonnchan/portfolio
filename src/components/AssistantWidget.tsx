"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import ChatMessage, { type AssistantChatMessage } from "@/components/ChatMessage";
import SuggestedPrompts from "@/components/SuggestedPrompts";

const greetings = [
  "Hello",
  "你好",
  "Bonjour",
  "Hola",
  "Ciao",
  "Hallo",
  "こんにちは",
  "안녕하세요",
  "Olá",
  "Xin chào",
  "Sawubona",
  "Namaste",
  "مرحباً",
  "Привет",
  "Selamat pagi",
  "Kumusta"
];

const welcomeMessage: AssistantChatMessage = {
  role: "assistant",
  content:
    "Hi, I’m Anson’s portfolio assistant. Ask me about his experience, projects, stack, or hobbies."
};

export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isLauncherHovered, setIsLauncherHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<AssistantChatMessage[]>([welcomeMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasUserMessage = useMemo(
    () => messages.some((message) => message.role === "user"),
    [messages]
  );

  const launcherGreeting = prefersReducedMotion
    ? "Hello"
    : isLauncherHovered
      ? "Need info?"
      : greetings[greetingIndex];

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionQuery.matches);
    };

    updateMotionPreference();
    setGreetingIndex(Math.floor(Math.random() * greetings.length));

    motionQuery.addEventListener("change", updateMotionPreference);

    return () => motionQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isOpen || isLauncherHovered || prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setGreetingIndex((current) => (current + 1) % greetings.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [isLauncherHovered, isOpen, prefersReducedMotion]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [isOpen, messages, isLoading]);

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isLoading) {
      return;
    }

    const nextMessages: AssistantChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed }
    ];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: nextMessages.slice(-8)
        })
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "The assistant could not reply right now.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply || "Sorry, I could not answer that."
        }
      ]);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong while contacting the assistant.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <div
        className={`assistant-panel mb-3 w-[calc(100vw-2rem)] max-w-[23rem] overflow-hidden rounded-lg border border-black/10 bg-white/90 shadow-soft backdrop-blur-xl transition-opacity duration-300 dark:border-white/10 dark:bg-zinc-950/90 dark:shadow-soft-dark ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-3 dark:border-white/10">
          <div>
            <p className="text-sm font-black text-zinc-950 dark:text-white">Ask Anson</p>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Portfolio guide
            </p>
          </div>
          <button
            aria-label="Minimize assistant"
            className="rounded-md border border-black/10 px-2 py-1 text-xs font-black text-zinc-700 transition hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-200 dark:hover:bg-white/10"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            shoo
          </button>
        </div>

        <div className="max-h-[48vh] min-h-72 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((message, index) => (
            <ChatMessage key={`${message.role}-${index}-${message.content}`} message={message} />
          ))}

          {isLoading ? (
            <div className="flex justify-start">
              <div className="assistant-typing rounded-lg border border-black/10 bg-white/90 px-3 py-2 text-sm font-black text-emerald-700 dark:border-white/10 dark:bg-white/10 dark:text-emerald-300">
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-lg border border-red-500/20 bg-red-50 px-3 py-2 text-xs font-semibold leading-5 text-red-700 dark:border-red-300/20 dark:bg-red-300/10 dark:text-red-200">
              {error}
            </div>
          ) : null}

          {!hasUserMessage ? (
            <SuggestedPrompts disabled={isLoading} onSelect={(prompt) => void sendMessage(prompt)} />
          ) : null}

          <div ref={messagesEndRef} />
        </div>

        <form className="flex gap-2 border-t border-black/10 p-3 dark:border-white/10" onSubmit={handleSubmit}>
          <input
            aria-label="Ask Anson’s assistant a question"
            className="min-w-0 flex-1 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500/60 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-zinc-500"
            disabled={isLoading}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about Anson..."
            value={input}
          />
          <button
            className="rounded-lg bg-zinc-950 px-3 py-2 text-sm font-black text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-300 dark:text-zinc-950"
            disabled={isLoading || !input.trim()}
            type="submit"
          >
            Send
          </button>
        </form>
      </div>

      <div className="flex justify-end">
        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close Ask Anson assistant" : "Open Ask Anson assistant"}
          className="assistant-launcher group relative flex h-16 items-center gap-2 rounded-full border border-emerald-500/25 bg-white/90 px-2 py-2 shadow-soft backdrop-blur-xl transition-colors hover:border-emerald-500/45 dark:border-emerald-300/20 dark:bg-zinc-950/90 dark:shadow-soft-dark"
          onBlur={() => setIsLauncherHovered(false)}
          onClick={() => setIsOpen((current) => !current)}
          onFocus={() => setIsLauncherHovered(true)}
          onMouseEnter={() => setIsLauncherHovered(true)}
          onMouseLeave={() => setIsLauncherHovered(false)}
          type="button"
        >
          <span className="assistant-launcher-bubble hidden sm:inline-flex">
            <span className="assistant-launcher-greeting" key={launcherGreeting}>
              {launcherGreeting}
            </span>
          </span>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-300/10">
            <img
              alt=""
              className="h-12 w-12 object-contain drop-shadow-md"
              src="/assets/chatbot/ai_chatbot.png"
            />
          </span>
        </button>
      </div>
    </div>
  );
}
