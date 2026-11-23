import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";

export default function SobrePage() {
  return (
    <>
      <main className="flex-1 px-5 pt-12 pb-8 flex flex-col gap-7">
        {/* Centered Magenta Logo */}
        <div className="flex justify-center py-2">
          <img
            src="/assets/logo-sobre.svg"
            alt="ReSonar"
            className="w-[161px] h-[132px] object-contain"
          />
        </div>

        {/* El Concepto */}
        <section className="rounded-[24px] bg-white/60 border-[1.366px] border-[rgba(188,25,92,0.1)] p-6 shadow-sm flex flex-col gap-3">
          <h1 className="text-[18px] font-semibold leading-[28px] text-[#18181b]">
            El Concepto
          </h1>
          <p className="text-[14px] leading-[22.75px] text-[#52525c]">
            ReSonar nace de la idea de que todo entorno tiene una musicalidad
            latente. No es una herramienta técnica, sino un lienzo para la
            experimentación audiovisual donde los sonidos urbanos y la música
            convergen.
          </p>
        </section>

        {/* Propósito */}
        <section className="rounded-[24px] bg-white/60 border-[1.366px] border-[rgba(188,25,92,0.1)] p-6 shadow-sm flex flex-col gap-3">
          <h2 className="text-[18px] font-semibold leading-[28px] text-[#18181b]">
            Propósito
          </h2>
          <p className="text-[14px] leading-[22.75px] text-[#52525c]">
            Queremos que te desconectes del ruido y te conectes con el sonido.
            Explora tus emociones, mezcla capas y crea atmósferas únicas que
            reflejen &ldquo;cómo suena tu día hoy&rdquo;.
          </p>
        </section>

        {/* Políticas de privacidad */}
        <Link
          href="/legal"
          className="rounded-[24px] bg-white/60 border-[1.366px] border-[rgba(188,25,92,0.1)] px-5 py-4 shadow-sm flex items-center justify-between hover:bg-white/80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[rgba(188,25,92,0.08)] flex items-center justify-center text-[#bc195c]">
              <FileText size={18} />
            </div>
            <span className="text-[16px] font-semibold text-[#18181b]">
              Políticas de privacidad
            </span>
          </div>
          <ChevronRight size={20} className="text-[#9f9fa9]" />
        </Link>

        {/* Social Links */}
        <section className="rounded-[24px] bg-white/60 border-[1.366px] border-[rgba(188,25,92,0.1)] p-6 shadow-sm flex flex-col items-center gap-4">
          <h2 className="text-[16px] font-semibold text-[#18181b] text-center">
            Síguenos en nuestras redes
          </h2>
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://www.instagram.com/resonar_ba?igsh=NG9sNTNzZHF1OXlw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de ReSonar"
              className="size-12 rounded-full bg-[#f1e4ce] shadow-sm flex items-center justify-center text-[#bc195c] hover:scale-105 transition-transform"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube de ReSonar"
              className="size-12 rounded-full bg-[#f1e4ce] shadow-sm flex items-center justify-center text-[#bc195c] hover:scale-105 transition-transform"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3v6Z" />
              </svg>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-1 pt-2 pb-4 text-center">
          <p className="text-[12px] text-[#71717b]">
            Diseñado para mentes inquietas y oídos atentos.
          </p>
          <p className="text-[12px] font-medium text-[#9f9fa9]">
            © 2026 ReSonar App
          </p>
        </footer>
      </main>

      <BottomNav />
    </>
  );
}
