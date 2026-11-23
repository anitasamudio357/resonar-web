import { Suspense } from "react";
import { LaboratorioClient } from "@/components/laboratorio-client";

export default function LaboratorioPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center text-[14px] text-[#71717b]">
          Cargando laboratorio...
        </div>
      }
    >
      <LaboratorioClient />
    </Suspense>
  );
}
