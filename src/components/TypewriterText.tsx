"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  phrases: string[];
  className?: string;
  typingMs?: number;
  deletingMs?: number;
  pauseMs?: number;
};

export default function TypewriterText({
  phrases,
  className,
  typingMs = 72,
  deletingMs = 42,
  pauseMs = 3000
}: TypewriterTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) {
      return undefined;
    }

    const phrase = phrases[phraseIndex];
    const isPhraseComplete = displayText === phrase;
    const isPhraseCleared = displayText === "";

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting && isPhraseComplete) {
          setIsDeleting(true);
          return;
        }

        if (isDeleting && isPhraseCleared) {
          setIsDeleting(false);
          setPhraseIndex((current) => (current + 1) % phrases.length);
          return;
        }

        const nextLength = displayText.length + (isDeleting ? -1 : 1);
        setDisplayText(phrase.slice(0, nextLength));
      },
      !isDeleting && isPhraseComplete ? pauseMs : isDeleting ? deletingMs : typingMs
    );

    return () => window.clearTimeout(timeout);
  }, [deletingMs, displayText, isDeleting, pauseMs, phraseIndex, phrases, typingMs]);

  return (
    <span className={className} aria-live="polite">
      {displayText}
      <span className="typewriter-caret" aria-hidden="true">
        |
      </span>
    </span>
  );
}
