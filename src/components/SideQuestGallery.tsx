import { sideQuests } from "@/data/portfolio";

export default function SideQuestGallery() {
  return (
    <div className="mx-auto w-full max-w-[20rem] sm:max-w-[22rem] lg:ml-auto lg:mr-0 lg:max-w-[22rem]">
      {sideQuests.shows.map((show) => (
        <figure
          className="side-polaroid"
          key={show.src}
        >
          <div className="side-polaroid-photo">
            <img
              alt={show.alt}
              className="h-full w-full object-cover"
              loading="lazy"
              src={show.src}
            />

            <div aria-hidden="true" className="side-effect side-effect-interstellar">
              <span className="stellar-orbit" />
              <span className="stellar-star">✦</span>
            </div>

            <div aria-hidden="true" className="side-effect side-effect-three-body">
              <span className="three-body-dot three-body-dot-one" />
              <span className="three-body-dot three-body-dot-two" />
              <span className="three-body-dot three-body-dot-three" />
            </div>
          </div>
          <figcaption className="handwritten-display mt-3 text-center text-lg leading-6 text-zinc-700">
            {show.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
