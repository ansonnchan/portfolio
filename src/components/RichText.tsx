import type { RichSegment } from "@/data/portfolio";

type RichTextProps = {
  segments: RichSegment[];
};

export default function RichText({ segments }: RichTextProps) {
  return (
    <>
      {segments.map((segment, index) => (
        <span
          className={
            segment.highlight
              ? "font-semibold text-emerald-700 dark:text-emerald-300"
              : undefined
          }
          key={`${segment.text}-${index}`}
        >
          {segment.text}
        </span>
      ))}
    </>
  );
}
