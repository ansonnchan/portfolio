"use client";

import { AudioLines, Music2, Pause, Play, Shuffle, SkipForward } from "lucide-react";
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

const rotationMilliseconds = 10_000;
const progressTickMilliseconds = 250;
const waveformHeights = [
  42, 68, 36, 78, 52, 88, 46, 64, 32, 72, 56, 92, 48, 76, 38, 82, 58, 96, 44, 70,
  34, 80, 54, 90, 40, 66, 50, 84, 36, 74, 60, 94
];

export default function NowPlayingPlayer() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isEqualizerActive, setIsEqualizerActive] = useState(true);
  const [progress, setProgress] = useState(0);
  const [albumArtFailed, setAlbumArtFailed] = useState(false);
  const track = playlist[trackIndex];

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = window.setInterval(() => {
      setProgress((current) =>
        Math.min(
          current + (progressTickMilliseconds / rotationMilliseconds) * 100,
          100
        )
      );
    }, progressTickMilliseconds);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (progress < 100) {
      return;
    }

    setTrackIndex((current) => (current + 1) % playlist.length);
    setProgress(0);
  }, [progress]);

  useEffect(() => {
    setAlbumArtFailed(false);
  }, [trackIndex]);

  const handleNext = () => {
    setTrackIndex((current) => (current + 1) % playlist.length);
    setProgress(0);
  };

  const handleShuffle = () => {
    if (playlist.length === 1) {
      setProgress(0);
      return;
    }

    setTrackIndex((current) => {
      const offset = Math.floor(Math.random() * (playlist.length - 1)) + 1;
      return (current + offset) % playlist.length;
    });
    setProgress(0);
  };

  return (
    <aside
      aria-label="Now playing"
      className="relative z-20 mt-5 w-full overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white text-zinc-900 shadow-[0_14px_35px_rgba(15,23,42,0.12)] lg:ml-auto lg:max-w-[25rem]"
    >
      <div className="flex min-h-[5.25rem] items-center gap-3 px-3 pt-3 pb-2">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-emerald-50 text-emerald-700">
          <Music2 aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
          {!albumArtFailed && (
            <img
              alt={`${track.title} album art`}
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setAlbumArtFailed(true)}
              src={track.albumArt || "/assets/spotify_logo.png"}
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[10px] font-bold uppercase text-emerald-700">
              Now playing · {track.mood}
            </p>
            <button
              aria-label="Toggle equalizer animation"
              aria-pressed={isEqualizerActive}
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition hover:bg-emerald-50 hover:text-emerald-700 ${
                isEqualizerActive ? "text-emerald-700" : "text-zinc-400"
              }`}
              onClick={() => setIsEqualizerActive((current) => !current)}
              title="Toggle equalizer animation"
              type="button"
            >
              <AudioLines aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <p className="truncate text-sm font-bold" title={track.title}>
            {track.title}
          </p>
          <p className="truncate text-xs text-zinc-500">
            {track.artist} · {track.duration}
          </p>

          <div className="mt-1.5 flex items-center gap-1">
            <button
              aria-label="Shuffle playlist"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-emerald-50 hover:text-emerald-700"
              onClick={handleShuffle}
              title="Shuffle"
              type="button"
            >
              <Shuffle aria-hidden="true" className="h-3.5 w-3.5" />
            </button>
            <button
              aria-label={isPlaying ? "Pause playlist" : "Play playlist"}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-800"
              onClick={() => setIsPlaying((current) => !current)}
              title={isPlaying ? "Pause" : "Play"}
              type="button"
            >
              {isPlaying ? (
                <Pause aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor" />
              ) : (
                <Play
                  aria-hidden="true"
                  className="ml-0.5 h-3.5 w-3.5"
                  fill="currentColor"
                />
              )}
            </button>
            <button
              aria-label="Play next song"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-emerald-50 hover:text-emerald-700"
              onClick={handleNext}
              title="Next"
              type="button"
            >
              <SkipForward aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      <div
        aria-label={`${Math.round(progress)} percent played`}
        className="flex h-7 items-end gap-1 px-3 pb-3"
        role="progressbar"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={Math.round(progress)}
      >
        {waveformHeights.map((height, index) => {
          const barProgress = ((index + 1) / waveformHeights.length) * 100;
          const isPlayed = barProgress <= progress;

          return (
            <span
              aria-hidden="true"
              className={`now-playing-wave-bar min-w-0 flex-1 rounded-full ${
                isPlayed ? "bg-emerald-600" : "bg-zinc-200"
              } ${
                isPlayed && isPlaying && isEqualizerActive
                  ? "now-playing-wave-bar-active"
                  : ""
              }`}
              key={`${height}-${index}`}
              style={{
                animationDelay: `${(index % 6) * 80}ms`,
                height: `${height}%`
              }}
            />
          );
        })}
      </div>
    </aside>
  );
}
