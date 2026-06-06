export type AssistantChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatMessageProps = {
  message: AssistantChatMessage;
};

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-lg px-3 py-2 text-sm leading-6 shadow-sm ${
          isUser
            ? "bg-zinc-950 text-white dark:bg-emerald-300 dark:text-zinc-950"
            : "border border-black/10 bg-white/90 text-zinc-800 dark:border-white/10 dark:bg-white/10 dark:text-zinc-100"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
