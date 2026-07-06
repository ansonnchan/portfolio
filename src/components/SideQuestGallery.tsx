import { sideQuests } from "@/data/portfolio";

export default function SideQuestGallery() {
  return (
    <div className="mx-auto w-full max-w-[20rem] sm:max-w-[22rem] lg:ml-auto lg:mr-0 lg:max-w-[22rem]">
      {sideQuests.shows.map((show) => (
        <figure
          className="comic-card doodle-corner surface-card overflow-hidden p-3 transition hover:-translate-y-1"
          key={show.src}
        >
          <p className="mini-label mb-2 text-emerald-700 dark:text-emerald-300">
            side quest
          </p>
          <img
            alt={show.alt}
            className="aspect-[3/4] w-full rounded-md object-cover"
            loading="lazy"
            src={show.src}
          />
          <figcaption className="handwritten-display mt-3 text-center text-xl leading-6 text-zinc-700 dark:text-zinc-200">
            {show.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
