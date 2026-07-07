const nextItems = [
  { text: "Ship another side project", note: "soon-ish" },
  { text: "Build an open-source project people actually use" },
  { text: "Learn more .NET", note: "tiny steps" },
  { text: "Build something weird with computer vision", marker: "spark" },
  { text: "Graduate from UBC" },
  { text: "Visit Japan during sakura season", note: "one day" },
  { text: "Add more songs to the playlist" },
  { text: "Keep this portfolio alive", marker: "star" }
];

export default function ClosingSection() {
  return (
    <section
      className="closing-section responsive-section scroll-fade scroll-mt-24 px-4 sm:px-6 lg:px-8"
      id="goodbyes"
    >
      <div className="mx-auto max-w-5xl">
        <header className="closing-header relative text-center">
          <p className="handwritten-display closing-kicker">last page</p>
          <h2 className="closing-title hero-greeting text-emerald-700 dark:text-emerald-300">
            See You Again <span aria-hidden="true">👋</span>
          </h2>
        </header>

        <div className="closing-copy mx-auto mt-8 max-w-3xl space-y-5 text-center text-base leading-7 text-zinc-700 dark:text-zinc-300 sm:text-lg sm:leading-8">
          <p>Thanks for stopping by my little corner of the internet.</p>
          <p>
            I hope you enjoyed exploring it and found something that resonated
            with you, whether it was a project, one of the tiny interactions
            scattered throughout the site, some random facts about me, or even a
            song from the playlist.
          </p>
          <p>
            There’s still so much I want to build and learn. Hopefully, the next
            time you visit, a few more of the goals below will have little
            checkmarks beside them.
          </p>
        </div>

        <div className="closing-notebook relative mx-auto mt-10 max-w-3xl overflow-hidden px-5 py-7 sm:px-8 sm:py-8">
          <span aria-hidden="true" className="closing-tape closing-tape-left" />
          <span aria-hidden="true" className="closing-tape closing-tape-right" />
          <span aria-hidden="true" className="closing-scribble closing-scribble-star">
            ✦
          </span>
          <span aria-hidden="true" className="closing-scribble closing-scribble-arrow">
            →
          </span>

          <h3 className="handwritten-display closing-checklist-title text-zinc-950">
            What’s Next?
          </h3>

          <ul className="closing-checklist mt-5 space-y-3 text-zinc-700">
            {nextItems.map((item) => (
              <li className="closing-checklist-item" key={item.text}>
                <span aria-hidden="true" className="closing-box" />
                <span className="closing-item-text">{item.text}</span>
                {item.note ? (
                  <span className="closing-item-note">{item.note}</span>
                ) : null}
                {item.marker === "spark" ? (
                  <span aria-hidden="true" className="closing-mini-mark">
                    ✧
                  </span>
                ) : null}
                {item.marker === "star" ? (
                  <span aria-hidden="true" className="closing-mini-mark">
                    ★
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <p className="handwritten-display mt-7 text-center text-3xl text-zinc-800 dark:text-zinc-100">
          — Anson
        </p>

        <p className="closing-final-note mx-auto mt-10 max-w-xs text-center text-sm font-semibold leading-6 text-zinc-500 dark:text-zinc-400">
          The End.
          <br />
          ...or maybe just the beginning.
        </p>
      </div>
    </section>
  );
}
