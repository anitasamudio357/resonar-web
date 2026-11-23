"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Search, Disc3 } from "lucide-react";
import { Mood, Track } from "@/data/catalog";

interface PlaylistClientProps {
  mood: Mood;
  tracks: Track[];
}

export function PlaylistClient({ mood, tracks }: PlaylistClientProps) {
  const [query, setQuery] = useState("");

  const filteredTracks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tracks;
    return tracks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.prompt.toLowerCase().includes(q) ||
        t.composer.toLowerCase().includes(q)
    );
  }, [query, tracks]);

  return (
    <div className="flex-1 flex flex-col pb-10">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#f1e4ce]/95 backdrop-blur-md flex items-center justify-between px-3 py-4">
        <Link
          href="/"
          aria-label="Volver al inicio"
          className="size-10 rounded-full flex items-center justify-center text-[#52525c] hover:bg-black/5 transition-colors"
        >
          <ChevronLeft size={24} />
        </Link>
        <span className="text-[14px] font-medium tracking-[1.4px] uppercase text-[#18181b]">
          Playlist
        </span>
        <div className="size-10" aria-hidden="true" />
      </header>

      <div className="px-5 pt-4 flex flex-col gap-6">
        {/* Mood Heading */}
        <div className="flex flex-col gap-2 px-1">
          <h1 className="text-[30px] font-bold leading-[36px] tracking-[-0.75px] text-[#bc195c]">
            {mood.name}
          </h1>
          <p className="text-[14px] leading-[20px] text-[#71717b]">
            {mood.subtitle}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9f9fa9]"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar..."
            aria-label="Buscar canciones en esta playlist"
            className="w-full h-[47px] pl-11 pr-4 rounded-[16px] bg-white/60 border-[1.366px] border-[rgba(188,25,92,0.2)] text-[14px] text-[#18181b] placeholder:text-[#9f9fa9] shadow-sm focus:outline-none focus:border-[#bc195c]"
          />
        </div>

        {/* Track List */}
        <div className="flex flex-col gap-4">
          {filteredTracks.length === 0 ? (
            <p className="text-center text-[14px] text-[#71717b] py-10">
              No se encontraron canciones para &ldquo;{query}&rdquo;.
            </p>
          ) : (
            filteredTracks.map((track) => (
              <Link
                key={track.id}
                href={`/cancion/${track.id}`}
                className="flex items-center gap-4 p-3 rounded-[16px] bg-white/40 border-[1.366px] border-white/20 shadow-sm hover:bg-white/65 transition-colors active:scale-[0.99]"
              >
                <div className="relative size-16 shrink-0 rounded-[14px] overflow-hidden bg-[#e4e4e7]">
                  <img
                    src={track.coverImage}
                    alt={track.title}
                    className="size-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-black/10"
                  />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <h2 className="text-[18px] font-semibold leading-[24px] text-[#bc195c] truncate">
                    {track.title}
                  </h2>
                  <p className="text-[12px] leading-[16px] text-[#71717b] line-clamp-1 mt-0.5">
                    {track.prompt}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Disc3 size={12} className="text-[#f9c958] shrink-0" />
                    <span className="text-[10px] font-medium leading-[15px] text-[#9f9fa9] truncate">
                      {track.composer}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
