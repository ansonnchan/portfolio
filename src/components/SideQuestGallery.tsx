import { sideQuests } from "@/data/portfolio";

export default function SideQuestGallery() {
  return (
    <div className="mx-auto w-full max-w-[20rem] sm:max-w-[22rem] lg:ml-auto lg:mr-0 lg:max-w-[22rem]">
      {sideQuests.shows.map((show) => (
        <figure
          className="side-device"
          key={show.src}
        >
          <svg
            aria-hidden="true"
            className="side-earphones"
            viewBox="0 0 220 100"
          >
            <path
              className="side-earphone-cable"
              d="M110 98 C110 82 109 72 108 62 C106 43 85 36 72 42 C58 48 55 66 66 74 C75 80 86 76 88 66"
            />
            <path
              className="side-earphone-cable"
              d="M110 98 C110 82 111 72 112 62 C114 43 135 36 148 42 C162 48 165 66 154 74 C145 80 134 76 132 66"
            />
            <path
              className="side-earphone-cable"
              d="M108 62 C104 49 103 39 103 24"
            />
            <path
              className="side-earphone-cable"
              d="M112 62 C116 49 117 39 117 24"
            />
            <path
              className="side-earbud"
              d="M97 20 C97 12 103 7 110 9 C116 11 119 17 116 24 L106 28 C101 29 97 26 97 20Z"
            />
            <path
              className="side-earbud"
              d="M123 20 C123 12 117 7 110 9 C104 11 101 17 104 24 L114 28 C119 29 123 26 123 20Z"
            />
          </svg>
          <span aria-hidden="true" className="side-device-jack" />
          <span aria-hidden="true" className="side-device-speaker" />
          <div className="side-device-screen">
            <img
              alt={show.alt}
              className="h-full w-full object-cover"
              loading="lazy"
              src={show.src}
            />

            <div aria-hidden="true" className="side-effect side-effect-your-lie">
              <span className="sakura-petal sakura-petal-one">✿</span>
              <span className="sakura-petal sakura-petal-two">✿</span>
              <span className="sakura-petal sakura-petal-three">♪</span>
            </div>

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
          <span aria-hidden="true" className="side-device-home" />
        </figure>
      ))}
    </div>
  );
}
