type SectionHeadingProps = {
  subtitle: string;
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
      <p className="section-subtitle mt-2 text-zinc-400 dark:text-zinc-500">
        ({subtitle})
      </p>
    </header>
  );
}
