"use client";

import { useCallback, useEffect, useRef } from "react";

export default function ClosingSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const syncVideoToLoop = useCallback(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.playbackRate = 1;

    if (Number.isFinite(video.duration) && video.duration > 0) {
      const loopTime = (Date.now() / 1000) % video.duration;

      if (Math.abs(video.currentTime - loopTime) > 0.6) {
        video.currentTime = loopTime;
      }
    }

    video.play().catch(() => {
      // Some browsers defer autoplay until the tab is visible or interacted with.
    });
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const syncWhenVisible = () => {
      if (!document.hidden) {
        syncVideoToLoop();
      }
    };

    video.defaultMuted = true;
    video.muted = true;
    video.addEventListener("loadedmetadata", syncVideoToLoop);
    document.addEventListener("visibilitychange", syncWhenVisible);
    const syncInterval = window.setInterval(syncVideoToLoop, 8000);

    syncVideoToLoop();

    return () => {
      video.removeEventListener("loadedmetadata", syncVideoToLoop);
      document.removeEventListener("visibilitychange", syncWhenVisible);
      window.clearInterval(syncInterval);
    };
  }, [syncVideoToLoop]);

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
          <p>Thank you for stopping by my little corner of the internet. 🌸</p>

          <p>
            Hopefully you found something interesting, whether it was a project, a fun
            fact, or a song from the playlist (you have excellent taste if you liked the
            same ones I do).
          </p>

          <p>Before you take off, here's a question I get asked quite a bit:</p>

          <blockquote className="closing-question-quote">
            “Where do you see yourself in 5 years?”
          </blockquote>

          <p>
           I'm honestly not sure. I don't have a specific picture of where I'll be in five years, and I think that's okay. Whether it's 5, 10, or 15 years from now, I just hope I'm still curious, building things that excite me, becoming a better engineer, and still enjoying coding.
           </p>

          <p>Until then, take care and keep flying 🐈‍⬛ </p>
        </div>

        <div className="closing-video-frame relative mx-auto mt-10">
          <video
            autoPlay
            className="closing-video"
            loop
            muted
            onCanPlay={syncVideoToLoop}
            onPause={syncVideoToLoop}
            playsInline
            preload="auto"
            ref={videoRef}
            src="/assets/closing/kiki.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>
<br></br>
        <p className="handwritten-display mt-7 text-center text-2xl text-zinc-800 dark:text-zinc-100">
          "Better to have a short life that is full of what you like doing than a long life spent in a miserable way." - Alan Watts
        </p>

      </div>
    </section>
  );
}
