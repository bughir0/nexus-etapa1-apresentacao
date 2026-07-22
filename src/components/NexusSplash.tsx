"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { playLogoWhoosh, playTaDum } from "@/lib/netflixSound";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Splash cinematográfica ao escolher o perfil:
 * N slam + ta-dum + logo NEXUS.
 */
export function NexusSplash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      void playTaDum();
      await wait(280);
      if (!cancelled) void playLogoWhoosh();

      await wait(2100);
      if (!cancelled) onDone();
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.65, 0.2] }}
        transition={{ duration: 1.6, times: [0, 0.15, 1], ease }}
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(229,9,20,0.55), transparent 70%)",
        }}
      />

      {/* N slam inicial */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute select-none font-[family-name:var(--font-display)] text-[10rem] font-black text-nfxred md:text-[14rem]"
        initial={{ scale: 2.8, opacity: 0, filter: "blur(10px)" }}
        animate={{ scale: [2.8, 1, 1.4], opacity: [0, 1, 0], filter: ["blur(10px)", "blur(0px)", "blur(6px)"] }}
        transition={{ duration: 0.85, times: [0, 0.45, 1], ease }}
        style={{ letterSpacing: "-0.06em" }}
      >
        N
      </motion.span>

      <div className="relative z-10">
        <motion.h1
          initial={{ scale: 1.4, opacity: 0, letterSpacing: "0.45em" }}
          animate={{ scale: 1, opacity: 1, letterSpacing: "0.1em" }}
          transition={{ duration: 0.85, delay: 0.55, ease }}
          className="select-none font-[family-name:var(--font-display)] text-6xl font-black tracking-tight text-nfxred drop-shadow-[0_0_48px_rgba(229,9,20,0.6)] md:text-8xl"
        >
          NEXUS
        </motion.h1>

        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-[-20%] left-0 w-1/3 bg-gradient-to-r from-transparent via-white/55 to-transparent"
          initial={{ x: "-120%", opacity: 0 }}
          animate={{ x: "320%", opacity: [0, 1, 0] }}
          transition={{ duration: 0.75, delay: 0.85, ease }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4, ease }}
          className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.35em] text-white/55"
        >
          Original · Etapa 1
        </motion.p>
      </div>
    </motion.div>
  );
}

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}
