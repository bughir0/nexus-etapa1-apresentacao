"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Splash cinematográfica estilo Netflix ao entrar na home.
 * Logo NEXUS com sweep vermelho + fade para o conteúdo.
 */
export function NexusSplash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease }}
    >
      {/* Glow de fundo */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.55, 0.25] }}
        transition={{ duration: 1.8, ease }}
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(229,9,20,0.45), transparent 70%)",
        }}
      />

      <div className="relative">
        <motion.h1
          initial={{ scale: 1.35, opacity: 0, letterSpacing: "0.4em" }}
          animate={{ scale: 1, opacity: 1, letterSpacing: "0.08em" }}
          transition={{ duration: 0.9, ease }}
          className="select-none font-[family-name:var(--font-display)] text-6xl font-black tracking-tight text-nfxred drop-shadow-[0_0_40px_rgba(229,9,20,0.55)] md:text-8xl"
        >
          NEXUS
        </motion.h1>

        {/* Sweep horizontal estilo intro Netflix */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-[-20%] left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          initial={{ x: "-120%", opacity: 0 }}
          animate={{ x: "320%", opacity: [0, 1, 0] }}
          transition={{ duration: 0.85, delay: 0.55, ease }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.45, ease }}
          className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.35em] text-white/55"
        >
          Original · Etapa 1
        </motion.p>
      </div>
    </motion.div>
  );
}
