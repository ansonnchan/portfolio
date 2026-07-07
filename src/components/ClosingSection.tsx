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
          <p className="handwritten-display closing-kicker">last section :(</p>
          <h2 className="closing-title hero-greeting text-emerald-700 dark:text-emerald-300">
            Bye Bye!<span aria-hidden="true"></span>
          </h2>
        </header>

        <div className="closing-copy mx-auto mt-8 max-w-3xl space-y-5 text-center text-base leading-7 text-zinc-700 dark:text-zinc-300 sm:text-lg sm:leading-8">
  <br></br>
  <p>Thank you for stopping by my little corner of the internet. 🌸</p>

  <p>
    Hopefully you found something you enjoyed, whether it was a project, a fun
    fact, or a song from the playlist (you have excellent taste if you liked the same
    ones I do).
  </p>

  <p>
    I hope to always continue learning, building, and most importantly, have fun while doing so.
     Maybe the next time you're here, a few more boxes below will be checked off. 
  </p>

  <p>
    Until then, take care. 👋
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
<br></br>
        <p className="handwritten-display mt-7 text-center text-2xl text-zinc-800 dark:text-zinc-100">
          "Better to have a short life that is full of what you like doing than a long life spent in a miserable way." - Alan Watts
        </p>

      </div>
    </section>
  );
}
