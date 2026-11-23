"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Zap, Info } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/retos", label: "Retos", icon: Zap },
  { href: "/sobre", label: "Sobre", icon: Info },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="sticky bottom-0 z-30 mt-auto w-full h-[80px] bg-[#f1e4ce]/95 backdrop-blur-md border-t border-[rgba(188,25,92,0.2)] shadow-[0_-4px_20px_rgba(188,25,92,0.06)] flex items-center justify-around px-6 sm:rounded-b-[32px]"
    >
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 transition-colors"
            aria-current={isActive ? "page" : undefined}
          >
            <Icon
              size={24}
              strokeWidth={1.9}
              className={isActive ? "text-[#bc195c]" : "text-[#9f9fa9]"}
            />
            <span
              className={`text-[10px] font-medium tracking-[0.25px] leading-[15px] ${
                isActive ? "text-[#bc195c]" : "text-[#9f9fa9]"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
