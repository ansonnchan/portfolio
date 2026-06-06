const starterPrompts = [
  "Where is Anson interning this summer?",
  "What projects has Anson built?",
  "What tech stack does Anson use?",
  "What are Anson’s hobbies?"
];

type SuggestedPromptsProps = {
  disabled?: boolean;
  onSelect: (prompt: string) => void;
};

export default function SuggestedPrompts({ disabled = false, onSelect }: SuggestedPromptsProps) {
  return (
    <div className="grid gap-2">
      {starterPrompts.map((prompt) => (
        <button
          className="rounded-lg border border-emerald-600/18 bg-emerald-50/70 px-3 py-2 text-left text-xs font-semibold leading-5 text-emerald-900 transition hover:border-emerald-600/35 hover:bg-emerald-100/80 disabled:cursor-not-allowed disabled:opacity-60 dark:border-emerald-300/15 dark:bg-emerald-300/10 dark:text-emerald-100 dark:hover:bg-emerald-300/16"
          disabled={disabled}
          key={prompt}
          onClick={() => onSelect(prompt)}
          type="button"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
