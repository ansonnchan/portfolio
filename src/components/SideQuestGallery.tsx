"use client";

import { useEffect, useState } from "react";
import { sideQuests } from "@/data/portfolio";

type GalleryImage = (typeof sideQuests.gallery)[number];

const carouselImages = [...sideQuests.gallery, ...sideQuests.gallery];

export default function SideQuestGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!selectedImage) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <div className="overflow-hidden rounded-lg">
        <div className="animate-carousel flex w-max gap-4 pr-4">
          {carouselImages.map((image, index) => (
            <button
              aria-label={`Open ${image.alt}`}
              className="group w-[78vw] max-w-[360px] shrink-0 overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-600/30 dark:border-white/10 dark:bg-white/8 sm:w-[44vw] lg:w-[calc((100vw-8rem)/4)] lg:max-w-[19rem]"
              key={`${image.src}-${index}`}
              onClick={() => setSelectedImage(image)}
              type="button"
            >
              <img
                alt={image.alt}
                className={`aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105 ${
                  index % 3 === 0 ? "object-top" : "object-center"
                }`}
                loading={index < sideQuests.gallery.length ? "eager" : "lazy"}
                src={image.src}
              />
            </button>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-4 backdrop-blur-sm"
          role="dialog"
        >
          <button
            aria-label="Close image preview"
            className="absolute inset-0 cursor-default"
            onClick={() => setSelectedImage(null)}
            type="button"
          />
          <div className="relative max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-lg border border-white/20 bg-black shadow-soft-dark">
            <img
              alt={selectedImage.alt}
              className="max-h-[88vh] w-full object-contain"
              src={selectedImage.src}
            />
            <button
              aria-label="Close image preview"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sm font-black text-zinc-900 transition hover:bg-emerald-100"
              onClick={() => setSelectedImage(null)}
              type="button"
            >
              x
            </button>
          </div>
        </div>
      )}
    </>
  );
}
