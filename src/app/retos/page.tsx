"use client";

import Link from "next/link";
import { Moon, Cloud, Sun, Sparkles, CheckCircle2 } from "lucide-react";
import { CHALLENGES, Challenge } from "@/data/catalog";
import { useAppState } from "@/context/app-state";
import { BottomNav } from "@/components/bottom-nav";

function ChallengeIcon({ name }: { name: Challenge["iconName"] }) {
  switch (name) {
    case "moon":
      return <Moon size={26} className="text-[#bc195c]" />;
    case "cloud":
      return <Cloud size={26} className="text-[#bc195c]" />;
    case "sun":
      return <Sun size={26} className="text-[#bc195c]" />;
    case "sparkles":
      return <Sparkles size={26} className="text-[#bc195c]" />;
  }
}

export default function RetosPage() {
  const { completedChallengeIds } = useAppState();

  return (
    <>
      <main className="flex-1 px-5 pt-12 pb-8 flex flex-col gap-7">
        <header className="flex flex-col gap-2">
          <h1 className="text-[30px] font-bold leading-[36px] tracking-[-0.75px] text-[#bc195c]">
            Retos Creativos
          </h1>
          <p className="text-[16px] leading-[24px] text-[#71717b]">
            Pon a prueba tu instinto musical y desbloquea nuevas capacidades.
          </p>
        </header>

        <section aria-label="Lista de retos" className="flex flex-col gap-5">
          {CHALLENGES.map((challenge) => {
            const isCompleted = completedChallengeIds.includes(challenge.id);
            return (
              <article
                key={challenge.id}
                className="relative overflow-hidden rounded-[24px] bg-white/60 border-[1.366px] border-[rgba(188,25,92,0.1)] p-5 shadow-sm flex flex-col gap-5"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-10 size-32 rounded-full opacity-15 blur-2xl"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${challenge.gradientFrom}, ${challenge.gradientTo})`,
                  }}
                />

                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className="size-14 shrink-0 rounded-[16px] bg-white/80 flex items-center justify-center"
                    style={{
                      boxShadow: `0px 4px 12px ${challenge.iconShadow}`,
                    }}
                  >
                    <ChallengeIcon name={challenge.iconName} />
                  </div>

                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-[20px] font-bold leading-[28px] text-[#18181b]">
                        {challenge.title}
                      </h2>
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-semibold shrink-0">
                          <CheckCircle2 size={12} />
                          Badge
                        </span>
                      )}
                    </div>
                    <p className="text-[14px] leading-[22px] text-[#52525c]">
                      {challenge.description}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/laboratorio?reto=${challenge.id}`}
                  className="relative z-10 w-full h-[54px] rounded-[50px] bg-[#bc195c] text-white text-[16px] font-medium flex items-center justify-center shadow-sm hover:bg-[#a61550] active:scale-[0.99] transition-all"
                >
                  {isCompleted ? "Volver a intentar" : "Comenzar reto"}
                </Link>
              </article>
            );
          })}
        </section>
      </main>

      <BottomNav />
    </>
  );
}
