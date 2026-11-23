import React from "react";

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh w-full sm:py-4 sm:px-4 flex justify-center items-start bg-[#18181b] max-[480px]:bg-[#f1e4ce]">
      <div className="relative w-full max-w-[440px] min-h-dvh sm:min-h-[min(92dvh,956px)] sm:rounded-[32px] bg-[#f1e4ce] shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-x-clip flex flex-col">
        {children}
      </div>
    </div>
  );
}
