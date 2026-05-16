import { photos } from "@/data/portfolio";

const rotations = [
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-2",
  "-rotate-3",
  "rotate-1",
  "rotate-3",
  "-rotate-1",
  "rotate-2"
];

export default function PhotosSection() {
  return (
    <section className="scroll-fade scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8" id="photos">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center text-4xl font-black tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
          {photos.title}
        </h2>

        <div className="mx-auto max-w-5xl text-center">
          <p className="text-base leading-8 text-zinc-700 dark:text-zinc-300 sm:text-lg">
            {photos.intro}
          </p>

          <figure className="mt-8 rounded-lg border border-emerald-600/20 bg-emerald-50 p-6 text-zinc-900 shadow-sm dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-white">
            <blockquote className="text-lg font-semibold leading-8 sm:text-xl">
              “{photos.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm font-bold text-zinc-600 dark:text-zinc-300">
              — {photos.attribution}
            </figcaption>
          </figure>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {photos.gallery.map((photo, index) => (
            <figure
              className={`rounded-sm bg-white p-3 pb-5 shadow-soft transition hover:-translate-y-1 hover:rotate-0 dark:bg-zinc-100 ${
                rotations[index % rotations.length]
              }`}
              key={photo.src}
            >
              <img
                alt={photo.caption}
                className="aspect-square w-full object-cover"
                loading="lazy"
                src={photo.src}
              />
              <figcaption className="mt-4 text-center font-mono text-sm font-semibold lowercase text-zinc-700">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
