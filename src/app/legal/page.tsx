import Link from "next/link";
import { ChevronLeft, FileText } from "lucide-react";

export default function LegalPage() {
  return (
    <div className="flex-1 flex flex-col pb-12">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#f1e4ce]/95 backdrop-blur-md border-b border-[rgba(188,25,92,0.1)] flex items-center justify-between px-3 py-4">
        <Link
          href="/sobre"
          aria-label="Volver a Sobre"
          className="size-10 rounded-full flex items-center justify-center text-[#52525c] hover:bg-black/5 transition-colors"
        >
          <ChevronLeft size={24} />
        </Link>
        <span className="text-[14px] font-medium tracking-[1.4px] uppercase text-[#18181b]">
          Legal
        </span>
        <div className="size-10" aria-hidden="true" />
      </header>

      <main className="px-6 pt-8 flex flex-col gap-8">
        <div className="flex items-start gap-4">
          <div className="size-14 shrink-0 rounded-[16px] bg-white/70 shadow-sm flex items-center justify-center text-[#bc195c]">
            <FileText size={26} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[24px] font-bold leading-[32px] tracking-[-0.6px] text-[#18181b]">
              Política de Privacidad
            </h1>
            <p className="text-[14px] leading-[20px] text-[#71717b]">
              Última actualización: Mayo 2026
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-2">
            <h2 className="text-[16px] font-semibold leading-[24px] text-[#18181b]">
              1. Uso de la Aplicación
            </h2>
            <p className="text-[14px] leading-[22.75px] text-[#52525c]">
              ReSonar es una aplicación diseñada para fines de entretenimiento y
              exploración sonora. Al utilizar nuestra app, aceptas no darle un
              uso que infrinja las leyes de derechos de autor locales o
              internacionales con respecto a los audios generados o mezclados.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-[16px] font-semibold leading-[24px] text-[#18181b]">
              2. Privacidad de Datos
            </h2>
            <p className="text-[14px] leading-[22.75px] text-[#52525c]">
              Respetamos tu privacidad. ReSonar no recopila información personal
              identificable (PII) ni comparte tus hábitos de escucha con terceros
              con fines comerciales sin tu consentimiento explícito.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-[16px] font-semibold leading-[24px] text-[#18181b]">
              3. Contenido Generado por el Usuario
            </h2>
            <p className="text-[14px] leading-[22.75px] text-[#52525c]">
              Cualquier &ldquo;Reto Creativo&rdquo; que completes o mezcla que
              guardes localmente es de tu propiedad. Sin embargo, al compartir
              tus mezclas públicamente a través de nuestros canales, nos otorgas
              licencia para mostrar tu obra con los debidos créditos.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-[16px] font-semibold leading-[24px] text-[#18181b]">
              4. Limitación de Responsabilidad
            </h2>
            <p className="text-[14px] leading-[22.75px] text-[#52525c]">
              La app se proporciona &ldquo;tal cual&rdquo;, sin garantías de
              ningún tipo. No nos hacemos responsables de pérdidas de datos
              locales o posibles interrupciones del servicio o afectaciones
              auditivas por volumen excesivo.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
