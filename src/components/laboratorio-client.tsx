"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  RotateCcw,
  Play,
  Pause,
  Save,
  Car,
  Footprints,
  Siren,
  Drum,
  Music,
  CloudRain,
  Wind,
  Radio,
  Award,
  CheckCircle2,
} from "lucide-react";
import {
  PAD_CATEGORIES,
  SOUND_PADS,
  CHALLENGES,
  PadCategoryId,
  SoundPad,
} from "@/data/catalog";
import { useAppState } from "@/context/app-state";

const WAVE_BARS = [
  24, 48, 32, 64, 40, 84, 52, 96, 44, 72, 36, 88, 56, 40, 62, 28,
];

function PadIcon({ name, active }: { name: SoundPad["iconName"]; active: boolean }) {
  const cls = active ? "text-white" : "text-[#71717b]";
  switch (name) {
    case "car":
      return <Car size={24} className={cls} />;
    case "footprints":
      return <Footprints size={24} className={cls} />;
    case "siren":
      return <Siren size={24} className={cls} />;
    case "drum":
      return <Drum size={24} className={cls} />;
    case "music":
      return <Music size={24} className={cls} />;
    case "cloud-rain":
      return <CloudRain size={24} className={cls} />;
    case "wind":
      return <Wind size={24} className={cls} />;
    case "radio":
      return <Radio size={24} className={cls} />;
  }
}

export function LaboratorioClient() {
  const searchParams = useSearchParams();
  const retoId = searchParams.get("reto");
  const activeChallenge = CHALLENGES.find((c) => c.id === retoId);

  const { saveMix, isChallengeSatisfied, completedChallengeIds } = useAppState();

  const [activeTab, setActiveTab] = useState<PadCategoryId>("urbano");
  const [activePadIds, setActivePadIds] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const hasPads = activePadIds.length > 0;
  const challengeReady = activeChallenge
    ? isChallengeSatisfied(activeChallenge, activePadIds)
    : false;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const togglePad = (padId: string) => {
    setActivePadIds((prev) => {
      const exists = prev.includes(padId);
      const next = exists ? prev.filter((id) => id !== padId) : [...prev, padId];
      if (!exists && next.length === 1) {
        setIsPlaying(true);
      } else if (next.length === 0) {
        setIsPlaying(false);
      }
      return next;
    });
  };

  const handleReset = () => {
    setActivePadIds([]);
    setIsPlaying(false);
  };

  const handleSave = () => {
    if (!hasPads) {
      showToast("Activa al menos un pad antes de guardar");
      return;
    }

    const challengeToComplete =
      activeChallenge && challengeReady ? activeChallenge.id : undefined;

    const mixName = activeChallenge
      ? `${activeChallenge.title} (${activePadIds.length} capas)`
      : `Mezcla (${activePadIds.length} capas)`;

    saveMix(mixName, activePadIds, challengeToComplete);

    if (challengeToComplete) {
      showToast(`¡Reto "${activeChallenge?.title}" completado! Badge desbloqueado`);
    } else {
      showToast("Mezcla guardada en tu colección");
    }
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const nextIndex =
      e.key === "ArrowRight"
        ? (index + 1) % PAD_CATEGORIES.length
        : (index - 1 + PAD_CATEGORIES.length) % PAD_CATEGORIES.length;
    setActiveTab(PAD_CATEGORIES[nextIndex].id);
  };

  return (
    <div className="flex-1 flex flex-col justify-between min-h-dvh sm:min-h-[min(92dvh,956px)]">
      {/* Header */}
      <header className="flex items-center justify-between px-3 pt-6 pb-2">
        <Link
          href={activeChallenge ? "/retos" : "/"}
          aria-label="Volver"
          className="size-10 rounded-full flex items-center justify-center text-[#52525c] hover:bg-black/5 transition-colors"
        >
          <ChevronLeft size={24} />
        </Link>
        <span className="text-[14px] font-medium tracking-[1.4px] uppercase text-[#18181b]">
          Laboratorio
        </span>
        <div className="size-10" aria-hidden="true" />
      </header>

      {/* Active Challenge Banner (optional) */}
      {activeChallenge && (
        <div className="mx-5 mt-2 rounded-[16px] bg-white/75 border border-[rgba(188,25,92,0.2)] px-4 py-3 flex items-center gap-3 shadow-sm">
          <Award
            size={20}
            className={challengeReady ? "text-[#16a34a] shrink-0" : "text-[#bc195c] shrink-0"}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-[13px] font-bold text-[#18181b] truncate">
                Reto: {activeChallenge.title}
              </p>
              {completedChallengeIds.includes(activeChallenge.id) && (
                <CheckCircle2 size={14} className="text-[#16a34a] shrink-0" />
              )}
            </div>
            <p className="text-[11px] text-[#52525c] leading-[15px]">
              {challengeReady
                ? "¡Listo! Pulsa Guardar para reclamar tu badge."
                : activeChallenge.hint}
            </p>
          </div>
        </div>
      )}

      {/* Center Stage: Waveform & Prompt */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-5">
        <div
          aria-hidden="true"
          className="flex items-center justify-center gap-[6px] h-[128px]"
        >
          {WAVE_BARS.map((maxH, idx) => {
            const activeHeight = hasPads
              ? Math.max(16, Math.round((maxH * (0.55 + (activePadIds.length % 4) * 0.12))))
              : 3;

            return (
              <span
                key={idx}
                className={`w-[8px] rounded-full bg-[rgba(188,25,92,0.8)] transition-all duration-300 ${
                  hasPads && isPlaying ? "animate-lab-wave" : ""
                }`}
                style={{
                  height: `${activeHeight}px`,
                  opacity: hasPads ? 0.85 : 0.45 + (idx % 3) * 0.15,
                  animationDelay: `${idx * 0.07}s`,
                }}
              />
            );
          })}
        </div>

        {!hasPads ? (
          <p className="text-[14px] text-[#71717b] text-center">
            Toca un pad para añadir un sonido
          </p>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-[340px]">
            {activePadIds.map((id) => {
              const pad = SOUND_PADS.find((p) => p.id === id);
              if (!pad) return null;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => togglePad(id)}
                  className="px-3 py-1 rounded-full bg-[#bc195c]/10 border border-[#bc195c]/25 text-[#bc195c] text-[12px] font-medium hover:bg-[#bc195c]/20 transition-colors"
                >
                  {pad.label} ×
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Sheet: Category Tabs + Pads + Transport */}
      <section
        aria-label="Controles de mezcla"
        className="bg-white/65 backdrop-blur-md border-t border-[rgba(188,25,92,0.1)] rounded-t-[32px] shadow-[0px_-10px_40px_0px_rgba(188,25,92,0.06)] pt-6 pb-6 flex flex-col gap-6"
      >
        {/* Accessible Tablist (modern-web-guidance: tabs) */}
        <div
          role="tablist"
          aria-label="Categorías de sonido"
          className="flex items-center gap-6 px-5 overflow-x-auto no-scrollbar"
        >
          {PAD_CATEGORIES.map((cat, index) => {
            const selected = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(cat.id)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`relative shrink-0 pb-2 text-[14px] font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-[#bc195c] focus-visible:outline-offset-2 rounded-sm ${
                  selected
                    ? "text-[#bc195c] after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:border-b-2 after:border-[#bc195c]"
                    : "text-[#9f9fa9] hover:text-[#52525c]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        <div className="px-5">
          {PAD_CATEGORIES.map((cat) => {
            const pads = SOUND_PADS.filter((p) => p.category === cat.id);
            const isSelected = activeTab === cat.id;
            return (
              <div
                key={cat.id}
                role="tabpanel"
                aria-labelledby={`tab-${cat.id}`}
                hidden={!isSelected}
                className={isSelected ? "grid grid-cols-3 gap-3" : "hidden"}
              >
                {pads.map((pad) => {
                  const active = activePadIds.includes(pad.id);
                  return (
                    <button
                      key={pad.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => togglePad(pad.id)}
                      className={`aspect-square rounded-[16px] border-[1.366px] flex flex-col items-center justify-center gap-2 p-2 transition-all active:scale-95 ${
                        active
                          ? "bg-[#bc195c] border-[#bc195c] text-white shadow-[0_6px_20px_rgba(188,25,92,0.3)]"
                          : "bg-white border-[rgba(188,25,92,0.1)] text-[#71717b] hover:border-[rgba(188,25,92,0.3)]"
                      }`}
                    >
                      <PadIcon name={pad.iconName} active={active} />
                      <span
                        className={`text-[11px] font-medium leading-[13px] text-center ${
                          active ? "text-white" : "text-[#71717b]"
                        }`}
                      >
                        {pad.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Transport Controls */}
        <div className="flex items-center justify-between px-8 pt-2">
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reiniciar mezcla"
            className="size-12 rounded-full flex items-center justify-center text-[#71717b] hover:bg-black/5 transition-colors"
          >
            <RotateCcw size={20} />
          </button>

          <button
            type="button"
            onClick={() => hasPads && setIsPlaying((p) => !p)}
            disabled={!hasPads}
            aria-label={isPlaying ? "Pausar mezcla" : "Reproducir mezcla"}
            className={`size-16 rounded-full flex items-center justify-center shadow-lg transition-all ${
              hasPads
                ? "bg-[#bc195c] text-white hover:bg-[#a61550] active:scale-95"
                : "bg-[#d4d4d8] text-[#71717b] cursor-not-allowed"
            }`}
          >
            {isPlaying ? (
              <Pause size={26} fill="currentColor" />
            ) : (
              <Play size={26} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={handleSave}
            aria-label="Guardar mezcla"
            className={`size-12 rounded-full flex items-center justify-center transition-colors ${
              hasPads
                ? "text-[#bc195c] hover:bg-[#bc195c]/10"
                : "text-[#9f9fa9] hover:bg-black/5"
            }`}
          >
            <Save size={20} />
          </button>
        </div>
      </section>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-full bg-[#18181b] text-white text-[12px] font-medium shadow-lg whitespace-nowrap"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
