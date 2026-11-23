import Link from "next/link";
import { Activity, Plus, Play } from "lucide-react";
import { MOODS, CHALLENGES } from "@/data/catalog";
import { BottomNav } from "@/components/bottom-nav";

export default function HomePage() {
  const featuredChallenges = CHALLENGES.slice(0, 2);

  return (
    <>
      <main className="flex-1 px-5 pt-10 pb-8 flex flex-col gap-7">
        {/* Header Logo */}
        <header className="px-2">
          <img
            src="/assets/logo-home.svg"
            alt="ReSonar"
            className="w-[152px] h-[46px] object-contain"
          />
        </header>

        {/* Hero Banner */}
        <section aria-label="Bienvenida">
          <div className="relative w-full overflow-hidden rounded-[20px] shadow-sm">
            <img
              src="/assets/banner-home.png"
              alt="Cada sonido cuenta una historia"
              className="w-full h-auto aspect-[398/205] object-cover block"
            />
          </div>
        </section>

        {/* Laboratorio Sonoro Card */}
        <section aria-label="Laboratorio Sonoro">
          <Link
            href="/laboratorio"
            className="group relative flex items-center justify-between gap-4 rounded-[24px] bg-white border-[1.366px] border-[rgba(188,25,92,0.2)] px-6 py-5 shadow-[0px_8px_30px_0px_rgba(188,25,92,0.12)] overflow-hidden transition-transform active:scale-[0.99]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-10 size-40 rounded-full bg-[rgba(188,25,92,0.15)] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-10 -top-5 size-40 rounded-full bg-[rgba(249,201,88,0.25)] blur-3xl"
            />

            <div className="relative z-10 flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <Activity size={20} className="text-[#bc195c] shrink-0" />
                <h2 className="text-[20px] font-bold leading-[28px] text-[#18181b] truncate">
                  Laboratorio Sonoro
                </h2>
              </div>
              <p className="text-[14px] leading-[20px] text-[#71717b]">
                Mezcla capas y crea tu propio ambiente
              </p>
            </div>

            <div className="relative z-10 size-12 shrink-0 rounded-full bg-[#c92e6e] flex items-center justify-center shadow-[0_4px_12px_rgba(188,25,92,0.3)] group-hover:bg-[#bc195c] transition-colors">
              <Plus size={24} className="text-white" />
            </div>
          </Link>
        </section>

        {/* Mood Grid */}
        <section aria-labelledby="moods-heading" className="flex flex-col gap-5">
          <h1
            id="moods-heading"
            className="text-[32px] font-extrabold leading-[34px] text-[#bc195c] max-w-[300px]"
          >
            ¿Cómo suena tu día hoy?
          </h1>

          <div className="grid grid-cols-2 gap-4">
            {MOODS.map((mood) => (
              <Link
                key={mood.id}
                href={`/playlist/${mood.id}`}
                className="group flex flex-col gap-2 focus-visible:outline-2 focus-visible:outline-[#bc195c] focus-visible:outline-offset-4 rounded-[16px]"
              >
                <div
                  className="relative aspect-square w-full overflow-hidden rounded-[16px] shadow-sm transition-transform group-hover:scale-[1.02] group-active:scale-[0.98]"
                  style={{ backgroundColor: mood.bgColor }}
                >
                  <img
                    src={mood.bgImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 size-full object-cover"
                  />
                  {mood.hasOverlay && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-black/10"
                    />
                  )}
                  <img
                    src={mood.characterImage}
                    alt={mood.name}
                    className="relative z-10 size-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold leading-[20px] text-[#bc195c]">
                    {mood.name}
                  </span>
                  <span className="text-[12px] leading-[16px] text-[#71717b]">
                    {mood.duration}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Retos Creativos Preview */}
        <section aria-labelledby="retos-preview-heading" className="flex flex-col gap-4 pt-1">
          <div className="flex items-center justify-between">
            <h2
              id="retos-preview-heading"
              className="text-[20px] font-semibold leading-[28px] text-[#18181b]"
            >
              Retos Creativos
            </h2>
            <Link
              href="/retos"
              className="text-[12px] font-semibold text-[#bc195c] hover:underline"
            >
              Ver todos
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {featuredChallenges.map((challenge) => (
              <Link
                key={challenge.id}
                href={`/laboratorio?reto=${challenge.id}`}
                className="flex items-center gap-4 rounded-[16px] bg-white/60 border-[1.366px] border-[rgba(188,25,92,0.1)] p-[13px] shadow-sm hover:bg-white/80 transition-colors"
              >
                <div
                  className="size-12 shrink-0 rounded-[14px] flex items-center justify-center"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(188, 25, 92, 0.1) 0%, rgba(249, 201, 88, 0.15) 100%)",
                  }}
                >
                  <Play size={18} className="text-[#bc195c] ml-0.5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-medium leading-[20px] text-[#18181b] truncate">
                    {challenge.title}
                  </span>
                  <span className="text-[12px] leading-[16px] text-[#71717b]">
                    {challenge.shortSubtitle}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
