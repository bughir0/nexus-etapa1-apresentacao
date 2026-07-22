"use client";

import { useEffect, useState } from "react";

/**
 * Evita hydration mismatch causado por extensões do navegador
 * (ex.: Bitdefender injeta bis_skin_checked no HTML antes do React hidratar).
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="grid min-h-dvh place-items-center bg-nfxbg text-white">
        <span className="select-none font-[family-name:var(--font-display)] text-3xl font-black tracking-tight text-nfxred md:text-4xl">
          NEXUS
        </span>
      </main>
    );
  }

  return <>{children}</>;
}
