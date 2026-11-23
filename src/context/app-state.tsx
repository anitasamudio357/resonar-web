"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Challenge, SOUND_PADS } from "@/data/catalog";

export interface SavedMix {
  id: string;
  name: string;
  padIds: string[];
  createdAt: string;
  challengeId?: string;
}

interface AppStateContextValue {
  likedTrackIds: string[];
  toggleLikeTrack: (trackId: string) => void;
  savedMixes: SavedMix[];
  saveMix: (name: string, padIds: string[], challengeId?: string) => SavedMix;
  completedChallengeIds: string[];
  isChallengeSatisfied: (challenge: Challenge, activePadIds: string[]) => boolean;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

const STORAGE_KEY = "resonar_app_state_v1";

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [likedTrackIds, setLikedTrackIds] = useState<string[]>([]);
  const [savedMixes, setSavedMixes] = useState<SavedMix[]>([]);
  const [completedChallengeIds, setCompletedChallengeIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.likedTrackIds)) setLikedTrackIds(parsed.likedTrackIds);
          if (Array.isArray(parsed.savedMixes)) setSavedMixes(parsed.savedMixes);
          if (Array.isArray(parsed.completedChallengeIds)) {
            setCompletedChallengeIds(parsed.completedChallengeIds);
          }
        }
      } catch {
        // Ignore storage read errors in restricted browsers
      }
      setHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          likedTrackIds,
          savedMixes,
          completedChallengeIds,
        })
      );
    } catch {
      // Ignore storage write errors
    }
  }, [hydrated, likedTrackIds, savedMixes, completedChallengeIds]);

  const toggleLikeTrack = useCallback((trackId: string) => {
    setLikedTrackIds((prev) =>
      prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId]
    );
  }, []);

  const isChallengeSatisfied = useCallback(
    (challenge: Challenge, activePadIds: string[]) => {
      if (activePadIds.length < challenge.minLayers) return false;
      if (!challenge.requiredCategories || challenge.requiredCategories.length === 0) {
        return true;
      }
      const activeCategories = new Set(
        activePadIds
          .map((id) => SOUND_PADS.find((p) => p.id === id)?.category)
          .filter(Boolean)
      );
      return challenge.requiredCategories.every((cat) => activeCategories.has(cat));
    },
    []
  );

  const saveMix = useCallback(
    (name: string, padIds: string[], challengeId?: string): SavedMix => {
      const mix: SavedMix = {
        id: `mix-${Date.now()}`,
        name: name.trim() || `Mezcla #${savedMixes.length + 1}`,
        padIds,
        createdAt: new Date().toISOString(),
        challengeId,
      };
      setSavedMixes((prev) => [mix, ...prev]);

      if (challengeId) {
        setCompletedChallengeIds((prev) =>
          prev.includes(challengeId) ? prev : [...prev, challengeId]
        );
      }

      return mix;
    },
    [savedMixes.length]
  );

  return (
    <AppStateContext.Provider
      value={{
        likedTrackIds,
        toggleLikeTrack,
        savedMixes,
        saveMix,
        completedChallengeIds,
        isChallengeSatisfied,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return ctx;
}
