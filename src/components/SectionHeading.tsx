import { ReactNode } from "react";

type SectionHeadingProps = {
  subtitle?: ReactNode;
  title: string;
};

export default function SectionHeading({
  subtitle,
  title
}: SectionHeadingProps) {
  return (
    <header className="section-intro text-center">
      <h2 className="section-heading responsive-heading text-zinc-950 dark:text-white">
        {title}
      </h2>
      {subtitle ? (
        <p className="section-lead mt-3 text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}