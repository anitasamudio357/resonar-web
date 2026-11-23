import type { Metadata, Viewport } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { AppStateProvider } from "@/context/app-state";
import { MobileShell } from "@/components/mobile-shell";
import { SplashGate } from "@/components/splash-gate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReSonar — Cada sonido cuenta una historia",
  description:
    "Lienzo de exploración sonora donde los sonidos urbanos y la música convergen.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#bc195c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-dvh flex flex-col">
        <AppStateProvider>
          <SplashGate>
            <MobileShell>{children}</MobileShell>
          </SplashGate>
        </AppStateProvider>
      </body>
    </html>
  );
}
