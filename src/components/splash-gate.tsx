"use client";

import React, { useEffect, useState } from "react";

export function SplashGate({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("resonar_splash_seen") === "1";
    } catch {
      // Ignore sessionStorage restrictions
    }

    if (alreadySeen) {
      const immediate = setTimeout(() => setShowSplash(false), 0);
      return () => clearTimeout(immediate);
    }

    const fadeTimer = setTimeout(() => setFading(true), 1200);
    const hideTimer = setTimeout(() => {
      setShowSplash(false);
      try {
        sessionStorage.setItem("resonar_splash_seen", "1");
      } catch {
        // Ignore
      }
    }, 1600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const dismissNow = () => {
    setFading(true);
    setTimeout(() => {
      setShowSplash(false);
      try {
        sessionStorage.setItem("resonar_splash_seen", "1");
      } catch {
        // Ignore
      }
    }, 250);
  };

  return (
    <>
      {children}
      {showSplash && (
        <div
          onClick={dismissNow}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") dismissNow();
          }}
          aria-label="Pantalla de bienvenida ReSonar"
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[#bc195c] cursor-pointer transition-opacity duration-400 ${
            fading ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="w-[268px] h-[220px] flex items-center justify-center animate-pulse">
            <img
              src="/assets/logo-gold.svg"
              alt="ReSonar"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
