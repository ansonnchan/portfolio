const interestClasses: Record<string, string> = {
  Interstellar: "side-interest-interstellar",
  "Three-Body Problem": "side-interest-three-body",
  "Your Lie in April": "side-interest-your-lie"
};

const interestPattern = /(Your Lie in April|Interstellar|Three-Body Problem)/g;

type SideQuestListProps = {
  bullets: string[];
};

function renderBullet(bullet: string) {
  return bullet.split(interestPattern).map((part, index) => {
    const interestClass = interestClasses[part];

    if (!interestClass) {
      return part;
    }

    return (
      <button
        aria-label={`${part}. Focus or hover to reveal a visual detail.`}
        className={`side-interest ${interestClass}`}
        key={`${part}-${index}`}
        type="button"
      >
        {part}
      </button>
    );
  });
}

export default function SideQuestList({ bullets }: SideQuestListProps) {
  return (
    <ul className="space-y-4 text-base leading-7 text-zinc-700 dark:text-zinc-300 sm:leading-8">
      {bullets.map((bullet) => (
        <li className="flex gap-3" key={bullet}>
          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
          <span>{renderBullet(bullet)}</span>
        </li>
      ))}
    </ul>
  );
}
