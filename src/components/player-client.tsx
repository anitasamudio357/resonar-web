"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  MoreHorizontal,
  Heart,
  Share2,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Download,
} from "lucide-react";
import { Track, formatSeconds } from "@/data/catalog";
import { useAppState } from "@/context/app-state";

interface PlayerClientProps {
  track: Track;
  playlistTracks: Track[];
}

const EQ_BAR_HEIGHTS = [10, 22, 12, 24, 8, 10, 28, 11, 14, 9, 8, 10];

export function PlayerClient({ track, playlistTracks }: PlayerClientProps) {
  const router = useRouter();
  const { likedTrackIds, toggleLikeTrack } = useAppState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  const isLiked = likedTrackIds.includes(track.id);
  const currentIndex = playlistTracks.findIndex((t) => t.id === track.id);
  const prevTrack =
    playlistTracks[(currentIndex - 1 + playlistTracks.length) % playlistTracks.length];
  const nextTrack =
    playlistTracks[(currentIndex + 1) % playlistTracks.length];

  // Visual playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev + 1 >= track.durationSeconds) {
          router.push(`/cancion/${nextTrack.id}`);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, track.durationSeconds, nextTrack.id, router]);

  // Sync CSS custom properties for native slider progress fill
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.style.setProperty("--attr-min", "0");
    el.style.setProperty("--attr-max", String(track.durationSeconds));
    el.style.setProperty("--control-value", String(currentTime));
  }, [currentTime, track.durationSeconds]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${track.title} — ReSonar`,
          text: `${track.title} (${track.composer}) en ReSonar`,
          url: shareUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        showToast("Enlace copiado al portapapeles");
      }
    } catch {
      showToast("Enlace listo para compartir");
    }
  };

  const handleDownload = () => {
    showToast(`"${track.title}" guardada para escuchar sin conexión`);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-5 pb-10 min-h-dvh sm:min-h-[min(92dvh,956px)]">
      {/* Header */}
      <header className="flex items-center justify-between">
        <Link
          href={`/playlist/${track.moodId}`}
          aria-label="Volver a la playlist"
          className="size-11 rounded-full flex items-center justify-center text-[#52525c] hover:bg-black/5 transition-colors"
        >
          <ChevronDown size={26} />
        </Link>
        <span className="text-[12px] font-semibold tracking-[1.2px] uppercase text-[#71717b] text-center">
          Reproduciendo desde tu barrio
        </span>
        <button
          type="button"
          onClick={() => showToast(`${track.composer} · ${track.prompt}`)}
          aria-label="Información de la canción"
          className="size-10 rounded-full flex items-center justify-center text-[#52525c] hover:bg-black/5 transition-colors"
        >
          <MoreHorizontal size={22} />
        </button>
      </header>

      {/* Cover Art + Equalizer */}
      <div className="flex flex-col items-center my-4">
        <div className="relative w-full max-w-[376px] aspect-square rounded-[24px] overflow-hidden shadow-[0px_20px_50px_-10px_rgba(188,25,92,0.25)]">
          <img
            src={track.coverImage}
            alt={track.title}
            className="size-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent flex items-end justify-center gap-1 pb-4">
            {EQ_BAR_HEIGHTS.map((height, idx) => (
              <span
                key={idx}
                className={`w-[6px] rounded-t-full bg-[#bc195c] opacity-90 transition-all ${
                  isPlaying ? "animate-eq-bar" : ""
                }`}
                style={{
                  height: isPlaying ? `${height}px` : "5px",
                  animationDelay: `${idx * 0.08}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Title, Favorite & Scrubber */}
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[28px] font-bold leading-[34px] text-[#bc195c] truncate">
              {track.title}
            </h1>
            <p className="text-[13px] text-[#71717b] mt-1 truncate">
              {track.composer}
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggleLikeTrack(track.id)}
            aria-label={isLiked ? "Quitar de favoritos" : "Agregar a favoritos"}
            aria-pressed={isLiked}
            className="size-11 shrink-0 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
          >
            <Heart
              size={26}
              className={
                isLiked
                  ? "text-[#bc195c] fill-[#bc195c]"
                  : "text-[#9f9fa9]"
              }
            />
          </button>
        </div>

        {/* Native accessible range slider */}
        <div className="flex flex-col gap-1">
          <label htmlFor="track-progress" className="sr-only">
            Progreso de reproducción
          </label>
          <input
            ref={sliderRef}
            id="track-progress"
            type="range"
            min={0}
            max={track.durationSeconds}
            step={1}
            value={currentTime}
            aria-valuetext={`${formatSeconds(currentTime)} de ${track.durationLabel}`}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="resonar-slider"
          />
          <div className="flex items-center justify-between text-[12px] font-medium text-[#9f9fa9]">
            <span>{formatSeconds(currentTime)}</span>
            <span>{track.durationLabel}</span>
          </div>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center justify-between px-2 pt-1">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Compartir canción"
            className="size-10 rounded-full flex items-center justify-center text-[#52525c] hover:bg-black/5 transition-colors"
          >
            <Share2 size={22} />
          </button>

          <div className="flex items-center gap-6">
            <Link
              href={`/cancion/${prevTrack.id}`}
              aria-label="Canción anterior"
              className="size-10 rounded-full flex items-center justify-center text-[#18181b] hover:bg-black/5 transition-colors"
            >
              <SkipBack size={28} fill="currentColor" />
            </Link>

            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
              className="size-20 rounded-full bg-[#bc195c] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(188,25,92,0.4)] hover:bg-[#a61550] active:scale-95 transition-all"
            >
              {isPlaying ? (
                <Pause size={32} fill="currentColor" />
              ) : (
                <Play size={32} fill="currentColor" className="ml-1" />
              )}
            </button>

            <Link
              href={`/cancion/${nextTrack.id}`}
              aria-label="Siguiente canción"
              className="size-10 rounded-full flex items-center justify-center text-[#18181b] hover:bg-black/5 transition-colors"
            >
              <SkipForward size={28} fill="currentColor" />
            </Link>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            aria-label="Guardar canción"
            className="size-10 rounded-full flex items-center justify-center text-[#52525c] hover:bg-black/5 transition-colors"
          >
            <Download size={22} />
          </button>
        </div>
      </div>

      {/* Toast feedback */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-full bg-[#18181b] text-white text-[12px] font-medium shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
