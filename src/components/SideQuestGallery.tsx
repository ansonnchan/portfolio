import { sideQuests } from "@/data/portfolio";

export default function SideQuestGallery() {
  return (
    <div className="mx-auto w-full max-w-[20rem] sm:max-w-[22rem] lg:ml-auto lg:mr-0 lg:max-w-[22rem]">
      {sideQuests.shows.map((show) => (
        <figure
          className="surface-card overflow-hidden rounded-lg p-3 shadow-soft transition hover:-translate-y-1 dark:shadow-soft-dark"
          key={show.src}
        >
          <img
            alt={show.alt}
            className="aspect-[3/4] w-full rounded-md object-cover"
            loading="lazy"
            src={show.src}
          />
          <figcaption className="mt-3 text-center text-sm font-bold leading-6 text-zinc-700 dark:text-zinc-200">
            {show.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
