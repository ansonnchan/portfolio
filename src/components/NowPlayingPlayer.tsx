"use client";

import {
  AudioLines,
  Maximize2,
  Minimize2,
  Music2,
  Pause,
  Play,
  Shuffle,
  SkipBack,
  SkipForward
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type PlaylistTrack = {
  albumArt: string;
  artist: string;
  duration: string;
  mood: string;
  title: string;
};

const playlist: PlaylistTrack[] = [
  {
    albumArt: "/assets/music/diverseddie_pfp.jpg",
    artist: "diverseddie (舵)",
    duration: "3:34",
    mood: "chill vibes",
    title: "procrastination (拖延症)"
  }
];

const playerStateStorageKey = "portfolio-now-playing-expanded";

export default function NowPlayingPlayer() {
  const shouldReduceMotion = useReducedMotion();
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackChangeKey, setTrackChangeKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isEqualizerActive, setIsEqualizerActive] = useState(true);
  const [isExpanded, setIsExpanded] = useState<boolean | null>(null);
  const [albumArtFailed, setAlbumArtFailed] = useState(false);
  const track = playlist[trackIndex];

  useEffect(() => {
    const storedState = window.localStorage.getItem(playerStateStorageKey);

    if (storedState === "true" || storedState === "false") {
      setIsExpanded(storedState === "true");
      return;
    }

    setIsExpanded(!window.matchMedia("(max-width: 639px)").matches);
  }, []);

  useEffect(() => {
    setAlbumArtFailed(false);
  }, [trackChangeKey]);

  const updateExpandedState = (nextState: boolean) => {
    setIsExpanded(nextState);
    window.localStorage.setItem(playerStateStorageKey, String(nextState));
  };

  const changeTrack = (direction: 1 | -1) => {
    setTrackIndex(
      (current) => (current + direction + playlist.length) % playlist.length
    );
    setTrackChangeKey((current) => current + 1);
  };

  const handleShuffle = () => {
    setTrackIndex((current) => {
      if (playlist.length === 1) {
        return current;
      }

      const offset = Math.floor(Math.random() * (playlist.length - 1)) + 1;
      return (current + offset) % playlist.length;
    });
    setTrackChangeKey((current) => current + 1);
  };

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const };
  const buttonMotion = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.06, y: -1 },
        whileTap: { scale: 0.96 }
      };

  if (isExpanded === null) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-4 top-3 z-40 flex justify-start sm:right-auto sm:left-5 sm:top-4 sm:w-auto">
      <AnimatePresence initial={false} mode="popLayout">
        {isExpanded ? (
          <motion.aside
            aria-label="Now playing"
            className="pointer-events-auto w-full max-w-[25rem] overflow-hidden rounded-[18px] border border-[#e5e7eb] bg-white text-zinc-900 shadow-[0_18px_45px_rgba(15,23,42,0.16)] sm:w-[25rem]"
            key="expanded-player"
            layout
            layoutId="now-playing-player"
            transition={transition}
          >
            <div className="flex min-h-[6.5rem] items-center gap-3 px-3 py-3">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-emerald-50 text-emerald-700">
                <Music2 aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
                <AnimatePresence initial={false} mode="wait">
                  {!albumArtFailed && (
                    <motion.img
                      alt={`${track.title} album art`}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 h-full w-full object-cover"
                      exit={{ opacity: 0, scale: 1.03 }}
                      initial={{ opacity: 0, scale: 0.97 }}
                      key={`art-${trackChangeKey}`}
                      onError={() => setAlbumArtFailed(true)}
                      src={track.albumArt || "/assets/spotify_logo.png"}
                      transition={transition}
                    />
                  )}
                </AnimatePresence>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[10px] font-bold uppercase text-emerald-700">
                    Now playing · {track.mood}
                  </p>
                  <div className="flex shrink-0 items-center gap-0.5">
                    <motion.button
                      {...buttonMotion}
                      aria-label="Toggle equalizer animation"
                      aria-pressed={isEqualizerActive}
                      className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-emerald-50 hover:text-emerald-700 ${
                        isEqualizerActive ? "text-emerald-700" : "text-zinc-400"
                      }`}
                      onClick={() => setIsEqualizerActive((current) => !current)}
                      title="Toggle equalizer animation"
                      type="button"
                    >
                      <AudioLines aria-hidden="true" className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      {...buttonMotion}
                      aria-label="Minimize music player"
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                      onClick={() => updateExpandedState(false)}
                      title="Minimize"
                      type="button"
                    >
                      <Minimize2 aria-hidden="true" className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    initial={{ opacity: 0, y: 5 }}
                    key={`details-${trackChangeKey}`}
                    transition={transition}
                  >
                    <p className="truncate text-sm font-bold" title={track.title}>
                      {track.title}
                    </p>
                    <p className="truncate text-xs text-zinc-500">
                      {track.artist} · {track.duration}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-1.5 flex items-center gap-1">
                  <motion.button
                    {...buttonMotion}
                    aria-label="Shuffle playlist"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                    onClick={handleShuffle}
                    title="Shuffle"
                    type="button"
                  >
                    <Shuffle aria-hidden="true" className="h-3.5 w-3.5" />
                  </motion.button>
                  <motion.button
                    {...buttonMotion}
                    aria-label="Play previous song"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                    onClick={() => changeTrack(-1)}
                    title="Previous"
                    type="button"
                  >
                    <SkipBack
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                    />
                  </motion.button>
                  <motion.button
                    {...buttonMotion}
                    aria-label={isPlaying ? "Pause playlist" : "Play playlist"}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-white shadow-sm transition-colors hover:bg-emerald-800"
                    onClick={() => setIsPlaying((current) => !current)}
                    title={isPlaying ? "Pause" : "Play"}
                    type="button"
                  >
                    {isPlaying ? (
                      <Pause
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                        fill="currentColor"
                      />
                    ) : (
                      <Play
                        aria-hidden="true"
                        className="ml-0.5 h-3.5 w-3.5"
                        fill="currentColor"
                      />
                    )}
                  </motion.button>
                  <motion.button
                    {...buttonMotion}
                    aria-label="Play next song"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                    onClick={() => changeTrack(1)}
                    title="Next"
                    type="button"
                  >
                    <SkipForward
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                    />
                  </motion.button>
                </div>
              </div>
            </div>

          </motion.aside>
        ) : (
          <motion.div
            className="group pointer-events-auto relative flex h-16 w-full max-w-[25rem] items-center gap-3 rounded-full border border-[#e5e7eb] bg-white px-3 text-zinc-900 shadow-[0_14px_35px_rgba(15,23,42,0.16)] transition-colors hover:border-emerald-600/30 sm:w-[25rem]"
            key="minimized-player"
            layout
            layoutId="now-playing-player"
            transition={transition}
          >
            <span className="pointer-events-none relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <Music2 aria-hidden="true" className="h-5 w-5" />
            </span>

            <AnimatePresence initial={false} mode="wait">
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                className="pointer-events-none relative z-10 min-w-0 flex-1"
                exit={{ opacity: 0, y: -4 }}
                initial={{ opacity: 0, y: 4 }}
                key={`pill-details-${trackChangeKey}`}
                transition={transition}
              >
                <span className="block truncate text-sm font-bold">{track.title}</span>
                <span className="block truncate text-xs text-zinc-500">{track.artist}</span>
              </motion.span>
            </AnimatePresence>

            <motion.button
              {...buttonMotion}
              aria-label={isPlaying ? "Pause playlist" : "Play playlist"}
              className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white transition-colors hover:bg-emerald-800"
              onClick={() => setIsPlaying((current) => !current)}
              title={isPlaying ? "Pause" : "Play"}
              type="button"
            >
              {isPlaying ? (
                <Pause aria-hidden="true" className="h-4 w-4" fill="currentColor" />
              ) : (
                <Play
                  aria-hidden="true"
                  className="ml-0.5 h-4 w-4"
                  fill="currentColor"
                />
              )}
            </motion.button>
            <motion.button
              {...buttonMotion}
              aria-label="Expand music player"
              className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              onClick={() => updateExpandedState(true)}
              title="Expand"
              type="button"
            >
              <Maximize2 aria-hidden="true" className="h-4 w-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
