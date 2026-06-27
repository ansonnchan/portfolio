"use client";

import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";

export default function TopLeftWidgets() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicExpanded, setIsMusicExpanded] = useState(false);
  const [volume, setVolume] = useState(0.32);
  const muteIcon = isMuted ? "/assets/music/mute_button.png" : "/assets/music/mute_button.png";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [isMuted, volume]);

  const handleTogglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const handleToggleMute = () => {
    setIsMuted((current) => !current);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number.parseFloat(event.target.value);
    setVolume(nextVolume);

    if (nextVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <aside className="absolute left-3 top-3 z-40 flex max-w-[calc(100vw-1.5rem)] flex-col gap-2 sm:left-5 sm:top-4">
      <audio loop preload="metadata" ref={audioRef} src="/assets/music/procrastination_diverseddie.mp3" />

      {isMusicExpanded ? (
        <div className="w-fit rounded-lg border border-black/10 bg-white/72 px-3 py-2 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#10140f]/72">
          <div className="flex items-start gap-3">
            <img
              alt="diverseddie (舵) - procrastination (拖延症)"
              className={`h-12 w-12 rounded-md object-cover shadow-sm ${isPlaying && !isMuted ? "music-pfp-beat" : ""}`}
              src="/assets/music/diverseddie_pfp.jpg"
            />
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-black tracking-[0.1em] text-emerald-700 dark:text-emerald-300">
                    chill vibes only 
                  </p>
                  <p className="mt-1 text-xs font-bold leading-5 text-zinc-700 dark:text-zinc-200">
                    diverseddie (舵) - procrastination (拖延症)
                    <br></br>
                    Used with permission from the artist. 
                
                  </p>
                </div>
                <button
                  aria-label="Minimize music player"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/70 text-xs font-black text-zinc-700 transition hover:border-emerald-600/30 hover:text-emerald-700 dark:border-white/10 dark:bg-white/10 dark:text-zinc-200 dark:hover:text-emerald-300"
                  onClick={() => setIsMusicExpanded(false)}
                  type="button"
                >
                  -
                </button>
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <button
              aria-label={isPlaying ? "Pause BGM" : "Play BGM"}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 p-1.5 transition hover:-translate-y-0.5 hover:bg-emerald-700 dark:bg-white dark:hover:bg-emerald-200"
              onClick={handleTogglePlay}
              type="button"
            >
              <img
                alt=""
                className="h-full w-full object-contain invert dark:invert-0"
                src={isPlaying ? "/assets/music/pause_button.png" : "/assets/music/play_button.png"}
              />
            </button>
            <button
              aria-label={isMuted ? "Unmute BGM" : "Mute BGM"}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white/70 p-1.5 transition hover:-translate-y-0.5 hover:border-emerald-600/30 dark:border-white/10 dark:bg-white/10"
              onClick={handleToggleMute}
              type="button"
            >
              <img alt="" className="h-full w-full object-contain dark:invert" src={muteIcon} />
            </button>
            <label className="sr-only" htmlFor="bgm-volume">
              BGM volume
            </label>
            <input
              aria-label="BGM volume"
              className="bgm-volume-slider w-20 sm:w-24"
              id="bgm-volume"
              max="1"
              min="0"
              onChange={handleVolumeChange}
              step="0.01"
              type="range"
              value={isMuted ? 0 : volume}
            />
          </div>
        </div>
      ) : (
        <button
          aria-label="Expand music player"
          className="group relative w-fit rounded-lg border border-black/10 bg-white/72 p-1.5 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-emerald-600/30 dark:border-white/10 dark:bg-[#10140f]/72"
          onClick={() => setIsMusicExpanded(true)}
          type="button"
        >
          <img
            alt=""
            className={`h-12 w-12 rounded-md object-cover ${isPlaying && !isMuted ? "music-pfp-beat" : ""}`}
            src="/assets/spotify_logo.png"
          />
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-950 text-xs font-black text-white shadow-sm transition group-hover:bg-emerald-700 dark:bg-white dark:text-[#10140f] dark:group-hover:bg-emerald-200">
            +
          </span>
        </button>
      )}

    </aside>
  );
}
