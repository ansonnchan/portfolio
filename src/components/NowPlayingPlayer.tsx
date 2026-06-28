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
  audioSrc: string;
  duration: string;
  title: string;
};

type PlayerStyle = CSSProperties & {
  "--marquee-distance"?: string;
  "--marquee-duration"?: string;
};

const playlist: PlaylistTrack[] = [
  {
    albumArt: "/assets/playlist/album/gidle_fate.jpg",
    artist: "(G)I-DLE",
    audioSrc: "/assets/playlist/soundtrack/gidle_fate.mp3",
    duration: "2:42",
    title: "Fate"
  },
  {
    albumArt: "/assets/playlist/album/enhypen_polaroid_love.webp",
    artist: "ENHYPEN",
    audioSrc: "/assets/playlist/soundtrack/polaroid_love.mp3",
    duration: "3:05",
    title: "Polaroid Love"
  },
  {
    albumArt: "/assets/playlist/album/illit_midnight_fiction.jpg",
    artist: "ILLIT",
    audioSrc: "/assets/playlist/soundtrack/Midnight Fiction.mp3",
    duration: "2:48",
    title: "Midnight Fiction"
  },
  {
    albumArt: "/assets/playlist/album/ikon_love_scenario.jpeg",
    artist: "iKON",
    audioSrc: "/assets/playlist/soundtrack/love_scenario.mp3",
    duration: "3:31",
    title: "Love Scenario"
  },
  {
    albumArt: "/assets/playlist/album/fifty_fifty_cupid.jpg",
    artist: "FIFTY FIFTY",
    audioSrc: "/assets/playlist/soundtrack/cupid.mp3",
    duration: "2:50",
    title: "Cupid"
  },
  {
    albumArt: "/assets/playlist/album/qwer_tbh.jpg",
    artist: "QWER",
    audioSrc: "/assets/playlist/soundtrack/qwer_tbh.mp3",
    duration: "2:55",
    title: "TBH"
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
  const audioRef = useRef<HTMLAudioElement>(null);
  const resumeAfterTrackChangeRef = useRef(false);
  const titleViewportRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackChangeKey, setTrackChangeKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(68);
  const [isExpanded, setIsExpanded] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(() =>
    durationToSeconds(playlist[0].duration)
  );
  const [albumArtFailed, setAlbumArtFailed] = useState(false);
  const [marqueeDistance, setMarqueeDistance] = useState(0);
  const track = playlist[trackIndex];
  const fallbackDurationSeconds = durationToSeconds(track.duration);
  const progressPercent =
    durationSeconds > 0 ? (elapsedSeconds / durationSeconds) * 100 : 0;
  const shouldMarquee = marqueeDistance > 0 && !shouldReduceMotion;

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const shouldResume = resumeAfterTrackChangeRef.current;
    resumeAfterTrackChangeRef.current = false;
    setElapsedSeconds(0);
    setDurationSeconds(fallbackDurationSeconds);
    audio.load();

    if (!shouldResume) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    const resumePlayback = () => {
      void audio.play().catch(() => setIsPlaying(false));
    };

    if (audio.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      resumePlayback();
      return;
    }

    audio.addEventListener("canplay", resumePlayback, { once: true });
    return () => audio.removeEventListener("canplay", resumePlayback);
  }, [fallbackDurationSeconds, trackChangeKey, trackIndex]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.muted = isMuted;
      audio.volume = volume / 100;
    }
  }, [isMuted, volume]);

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
  const displayedVolume = isMuted ? 0 : volume;
  const volumeStyle = {
    background: `linear-gradient(to right, #16803f 0%, #16803f ${displayedVolume}%, #dedbd5 ${displayedVolume}%, #dedbd5 100%)`
  };

  const handleTogglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (!audio.paused) {
      audio.pause();
      return;
    }

    if (audio.currentTime >= durationSeconds) {
      audio.currentTime = 0;
      setElapsedSeconds(0);
    }

    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  };

  const handleShuffle = () => {
    resumeAfterTrackChangeRef.current = isPlaying;
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

  const handleVolumeChange = (nextVolume: number) => {
    setVolume(nextVolume);

    if (nextVolume > 0) {
      setIsMuted(false);
    }
  };

  const handleSeek = (nextTime: number) => {
    const audio = audioRef.current;

    if (audio) {
      audio.currentTime = nextTime;
    }

    setElapsedSeconds(nextTime);
  };

  return (
    <>
      <audio
        onDurationChange={(event) => {
          const actualDuration = event.currentTarget.duration;
          setDurationSeconds(
            Number.isFinite(actualDuration) && actualDuration > 0
              ? actualDuration
              : fallbackDurationSeconds
          );
        }}
        onEnded={() => {
          setElapsedSeconds(durationSeconds);
          setIsPlaying(false);
        }}
        onError={() => setDurationSeconds(fallbackDurationSeconds)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={(event) => setElapsedSeconds(event.currentTarget.currentTime)}
        preload="metadata"
        ref={audioRef}
        src={track.audioSrc}
      />

      <div className="pointer-events-none fixed inset-x-4 bottom-4 z-40 flex justify-end sm:bottom-5 sm:left-auto sm:right-5 sm:w-auto">
        <AnimatePresence initial={false} mode="popLayout">
        {isExpanded ? (
          <motion.aside
            aria-label="Music player"
            className="pointer-events-auto relative w-full max-w-[26rem] overflow-hidden border border-[#e2ded7] bg-[#faf8f4] text-zinc-900 shadow-[0_18px_45px_rgba(38,34,29,0.13)] sm:w-[26rem]"
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
              <div className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden bg-white text-emerald-700 shadow-sm">
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

              <div className="min-w-0">
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
                      key={`expanded-title-${trackChangeKey}`}
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
                <p className="mt-1 truncate text-xs text-zinc-500">{track.artist}</p>
              </div>

              <div className="flex flex-col items-end pr-1">
                <div className="flex items-center justify-end gap-1">
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
                      <Pause
                        aria-hidden="true"
                        className="h-5 w-5"
                        fill="currentColor"
                      />
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
                      <VolumeX
                        aria-hidden="true"
                        className="h-[1.15rem] w-[1.15rem]"
                      />
                    ) : (
                      <Volume2
                        aria-hidden="true"
                        className="h-[1.15rem] w-[1.15rem]"
                      />
                    )}
                  </motion.button>
                </div>
                <input
                  aria-label="Player volume"
                  className="music-volume-slider mt-1.5 w-24"
                  max="100"
                  min="0"
                  onChange={(event) => handleVolumeChange(Number(event.target.value))}
                  step="1"
                  style={volumeStyle}
                  type="range"
                  value={displayedVolume}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 pt-2 pb-3 font-mono text-[11px] text-zinc-500">
              <time className="w-8 shrink-0">{formatTime(elapsedSeconds)}</time>
              <input
                aria-label="Playback position"
                className="music-progress-slider min-w-0 flex-1"
                max={durationSeconds}
                min="0"
                onChange={(event) => handleSeek(Number(event.target.value))}
                step="0.1"
                style={progressStyle}
                type="range"
                value={elapsedSeconds}
              />
              <time className="w-8 shrink-0 text-right">
                {formatTime(durationSeconds)}
              </time>
            </div>
          </motion.aside>
        ) : (
          <motion.aside
            aria-label="Minimized music player"
            className="pointer-events-auto flex h-16 w-full max-w-[26rem] items-center gap-3 border border-[#e2ded7] bg-[#faf8f4] px-2.5 text-zinc-900 shadow-[0_14px_35px_rgba(38,34,29,0.13)] sm:w-[26rem]"
            key="minimized-player"
            layout
            layoutId="now-playing-player"
            transition={transition}
          >
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden bg-white text-emerald-700 shadow-sm">
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

            <div className="min-w-0 flex-1">
              <div
                className="music-title-viewport min-w-0 overflow-hidden"
                ref={titleViewportRef}
              >
                <span
                  className={`flex w-max items-center whitespace-nowrap font-mono text-sm font-bold ${
                    shouldMarquee ? "music-title-marquee-track" : ""
                  }`}
                  key={`minimized-title-${trackChangeKey}`}
                  style={marqueeStyle}
                >
                  <span ref={titleTextRef}>{track.title}</span>
                  {shouldMarquee && (
                    <span aria-hidden="true" className="ml-12">
                      {track.title}
                    </span>
                  )}
                </span>
              </div>
              <p className="mt-0.5 truncate text-xs text-zinc-500">{track.artist}</p>
            </div>

            <motion.button
              {...buttonMotion}
              aria-label="Shuffle playlist"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-emerald-700"
              onClick={handleShuffle}
              title="Shuffle"
              type="button"
            >
              <Shuffle aria-hidden="true" className="h-4 w-4" />
            </motion.button>
            <motion.button
              {...buttonMotion}
              aria-label={isPlaying ? "Pause playlist" : "Play playlist"}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-800 transition-colors hover:text-emerald-700"
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
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-emerald-700"
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
            <motion.button
              {...buttonMotion}
              aria-label="Maximize music player"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-500 transition-colors hover:text-emerald-700"
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
    </>
  );
}
