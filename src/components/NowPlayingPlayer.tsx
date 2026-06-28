"use client";

import {
  Maximize2,
  Minimize2,
  Music2,
  Pause,
  Play,
  Shuffle,
  Volume2,
  VolumeX
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type PlaylistTrack = {
  albumArt: string;
  artist: string;
  duration: string;
  mood: string;
  title: string;
};

type PlayerStyle = CSSProperties & {
  "--marquee-distance"?: string;
  "--marquee-duration"?: string;
};

const playlist: PlaylistTrack[] = [
  {
    albumArt: "/assets/music/diverseddie_pfp.jpg",
    artist: "diverseddie (舵)",
    duration: "3:34",
    mood: "chill vibes",
    title: "diverseddie (舵) - procrastination (拖延症)"
  }
];

function durationToSeconds(duration: string) {
  const [minutes, seconds] = duration.split(":").map(Number);
  return minutes * 60 + seconds;
}

function formatTime(timeInSeconds: number) {
  const roundedTime = Math.max(0, Math.floor(timeInSeconds));
  const minutes = Math.floor(roundedTime / 60);
  const seconds = String(roundedTime % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export default function NowPlayingPlayer() {
  const shouldReduceMotion = useReducedMotion();
  const titleViewportRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackChangeKey, setTrackChangeKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [albumArtFailed, setAlbumArtFailed] = useState(false);
  const [marqueeDistance, setMarqueeDistance] = useState(0);
  const track = playlist[trackIndex];
  const durationSeconds = durationToSeconds(track.duration);
  const progressPercent =
    durationSeconds > 0 ? (elapsedSeconds / durationSeconds) * 100 : 0;
  const shouldMarquee = marqueeDistance > 0 && !shouldReduceMotion;

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = window.setInterval(() => {
      setElapsedSeconds((current) => Math.min(current + 0.1, durationSeconds));
    }, 100);

    return () => window.clearInterval(interval);
  }, [durationSeconds, isPlaying]);

  useEffect(() => {
    if (elapsedSeconds >= durationSeconds && isPlaying) {
      setIsPlaying(false);
    }
  }, [durationSeconds, elapsedSeconds, isPlaying]);

  useEffect(() => {
    setAlbumArtFailed(false);
  }, [trackChangeKey]);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const viewport = titleViewportRef.current;
    const title = titleTextRef.current;

    if (!viewport || !title) {
      return;
    }

    const measureTitle = () => {
      const overflow = title.scrollWidth - viewport.clientWidth;
      setMarqueeDistance(overflow > 0 ? title.scrollWidth + 48 : 0);
    };

    measureTitle();
    const observer = new ResizeObserver(measureTitle);
    observer.observe(viewport);
    observer.observe(title);

    return () => observer.disconnect();
  }, [isExpanded, trackChangeKey]);

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };
  const buttonMotion = shouldReduceMotion
    ? {}
    : {
        whileHover: { opacity: 0.72, scale: 1.04 },
        whileTap: { scale: 0.94 }
      };
  const marqueeStyle: PlayerStyle = {
    "--marquee-distance": `-${marqueeDistance}px`,
    "--marquee-duration": `${Math.max(7, marqueeDistance / 24)}s`
  };
  const progressStyle = {
    background: `linear-gradient(to right, #16803f 0%, #16803f ${progressPercent}%, #dedbd5 ${progressPercent}%, #dedbd5 100%)`
  };

  const handleTogglePlay = () => {
    if (!isPlaying && elapsedSeconds >= durationSeconds) {
      setElapsedSeconds(0);
    }

    setIsPlaying((current) => !current);
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
    setElapsedSeconds(0);
  };

  return (
    <div className="pointer-events-none fixed inset-x-4 top-3 z-40 flex justify-start sm:right-auto sm:left-5 sm:top-4 sm:w-auto">
      <AnimatePresence initial={false} mode="popLayout">
        {isExpanded ? (
          <motion.aside
            aria-label="Music player"
            className="pointer-events-auto relative w-full max-w-[26rem] overflow-hidden rounded-[18px] border border-[#e2ded7] bg-[#faf8f4] text-zinc-900 shadow-[0_18px_45px_rgba(38,34,29,0.13)] sm:w-[26rem]"
            key="expanded-player"
            layout
            layoutId="now-playing-player"
            transition={transition}
          >
            <motion.button
              {...buttonMotion}
              aria-label="Minimize music player"
              className="absolute top-1.5 right-1.5 z-20 flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition-colors hover:text-zinc-700"
              onClick={() => setIsExpanded(false)}
              title="Minimize"
              type="button"
            >
              <Minimize2 aria-hidden="true" className="h-3.5 w-3.5" />
            </motion.button>

            <div className="grid min-h-[5.5rem] grid-cols-[4.5rem_minmax(0,1fr)_6.5rem] items-center gap-3 px-4 pt-3">
              <div className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden rounded-xl bg-white text-emerald-700 shadow-sm">
                <Music2 aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
                <AnimatePresence initial={false} mode="wait">
                  {!albumArtFailed && (
                    <motion.img
                      alt={`${track.title} album artwork`}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 h-full w-full object-cover"
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      key={`art-${trackChangeKey}`}
                      layoutId="now-playing-album"
                      onError={() => setAlbumArtFailed(true)}
                      src={track.albumArt || "/assets/spotify_logo.png"}
                      transition={transition}
                    />
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="music-title-viewport min-w-0 overflow-hidden"
                  exit={{ opacity: 0, y: -4 }}
                  initial={{ opacity: 0, y: 4 }}
                  key={`title-${trackChangeKey}`}
                  ref={titleViewportRef}
                  transition={transition}
                >
                  <span
                    className={`flex w-max items-center whitespace-nowrap font-mono text-sm font-bold ${
                      shouldMarquee ? "music-title-marquee-track" : ""
                    }`}
                    style={marqueeStyle}
                  >
                    <span ref={titleTextRef}>{track.title}</span>
                    {shouldMarquee && (
                      <span aria-hidden="true" className="ml-12">
                        {track.title}
                      </span>
                    )}
                  </span>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-end gap-1 pr-1">
                <motion.button
                  {...buttonMotion}
                  aria-label="Shuffle playlist"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-emerald-700"
                  onClick={handleShuffle}
                  title="Shuffle"
                  type="button"
                >
                  <Shuffle aria-hidden="true" className="h-4 w-4" />
                </motion.button>
                <motion.button
                  {...buttonMotion}
                  aria-label={isPlaying ? "Pause playlist" : "Play playlist"}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-800 transition-colors hover:text-emerald-700"
                  onClick={handleTogglePlay}
                  title={isPlaying ? "Pause" : "Play"}
                  type="button"
                >
                  {isPlaying ? (
                    <Pause aria-hidden="true" className="h-5 w-5" fill="currentColor" />
                  ) : (
                    <Play
                      aria-hidden="true"
                      className="ml-0.5 h-5 w-5"
                      fill="currentColor"
                    />
                  )}
                </motion.button>
                <motion.button
                  {...buttonMotion}
                  aria-label={isMuted ? "Unmute player" : "Mute player"}
                  aria-pressed={isMuted}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-emerald-700"
                  onClick={() => setIsMuted((current) => !current)}
                  title={isMuted ? "Unmute" : "Mute"}
                  type="button"
                >
                  {isMuted ? (
                    <VolumeX aria-hidden="true" className="h-[1.15rem] w-[1.15rem]" />
                  ) : (
                    <Volume2 aria-hidden="true" className="h-[1.15rem] w-[1.15rem]" />
                  )}
                </motion.button>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 pt-2 pb-3 font-mono text-[11px] text-zinc-500">
              <time className="w-8 shrink-0">{formatTime(elapsedSeconds)}</time>
              <input
                aria-label="Playback position"
                className="music-progress-slider min-w-0 flex-1"
                max={durationSeconds}
                min="0"
                onChange={(event) => setElapsedSeconds(Number(event.target.value))}
                step="0.1"
                style={progressStyle}
                type="range"
                value={elapsedSeconds}
              />
              <time className="w-8 shrink-0 text-right">{track.duration}</time>
            </div>
          </motion.aside>
        ) : (
          <motion.aside
            aria-label="Minimized music player"
            className="pointer-events-auto flex h-16 w-full max-w-[26rem] items-center gap-3 rounded-full border border-[#e2ded7] bg-[#faf8f4] px-2.5 text-zinc-900 shadow-[0_14px_35px_rgba(38,34,29,0.13)] sm:w-[26rem]"
            key="minimized-player"
            layout
            layoutId="now-playing-player"
            transition={transition}
          >
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white text-emerald-700 shadow-sm">
              <Music2 aria-hidden="true" className="h-5 w-5" />
              {!albumArtFailed && (
                <motion.img
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  layoutId="now-playing-album"
                  src={track.albumArt || "/assets/spotify_logo.png"}
                />
              )}
            </div>

            <span className="min-w-0 flex-1 truncate font-mono text-sm font-bold">
              {track.title}
            </span>

            <motion.button
              {...buttonMotion}
              aria-label={isPlaying ? "Pause playlist" : "Play playlist"}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-800 transition-colors hover:text-emerald-700"
              onClick={handleTogglePlay}
              title={isPlaying ? "Pause" : "Play"}
              type="button"
            >
              {isPlaying ? (
                <Pause aria-hidden="true" className="h-5 w-5" fill="currentColor" />
              ) : (
                <Play
                  aria-hidden="true"
                  className="ml-0.5 h-5 w-5"
                  fill="currentColor"
                />
              )}
            </motion.button>
            <motion.button
              {...buttonMotion}
              aria-label="Maximize music player"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-500 transition-colors hover:text-emerald-700"
              onClick={() => setIsExpanded(true)}
              title="Maximize"
              type="button"
            >
              <Maximize2 aria-hidden="true" className="h-4 w-4" />
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
