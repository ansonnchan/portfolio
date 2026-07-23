import type { ImageGallery } from "@/data/portfolio";

type CardGalleryProps = {
  gallery: ImageGallery;
};

export default function CardGallery({ gallery }: CardGalleryProps) {
  if (gallery.images.length === 0) {
    return null;
  }

  return (
    <section
      aria-label={gallery.title ?? "Image gallery"}
      className="mt-5"
      onClick={(event) => event.stopPropagation()}
    >
      {gallery.title ? (
        <h4 className="mb-3 text-sm font-black uppercase tracking-[0.14em] text-zinc-700 dark:text-zinc-200">
          {gallery.title}
        </h4>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        {gallery.images.map((image) => (
          <figure
            className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900"
            key={image.src}
          >
            <img
              alt={image.alt}
              className="aspect-video w-full object-cover"
              loading="lazy"
              src={image.src}
            />
            {image.caption ? (
              <figcaption className="px-3 py-2 text-center text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
