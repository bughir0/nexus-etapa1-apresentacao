"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { playTaDum } from "@/lib/netflixSound";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Intro estilo Netflix ao abrir uma série/episódio:
 * slam da letra N + “ta-dum” + título da temporada.
 */
export function TitleIntro({
  title,
  episodeLabel,
  onDone,
}: {
  title: string;
  episodeLabel: string;
  onDone: () => void;
}) {
  const [phase, setPhase] = useState<"n" | "title" | "out">("n");

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // Som no impacto da N
      void playTaDum();

      await wait(900);
      if (cancelled) return;
      setPhase("title");

      await wait(1400);
      if (cancelled) return;
      setPhase("out");

      await wait(450);
      if (!cancelled) onDone();
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] grid place-items-center overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease }}
    >
      {/* Flash vermelho no impacto */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.55, 0.15, 0] }}
        transition={{ duration: 0.7, times: [0, 0.12, 0.35, 1], ease }}
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(229,9,20,0.75), transparent 70%)",
        }}
      />

      {/* Vinheta */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Letra N — slam */}
      <motion.div
        className="relative grid place-items-center"
        initial={{ scale: 3.2, opacity: 0, filter: "blur(12px)" }}
        animate={
          phase === "n"
            ? { scale: 1, opacity: 1, filter: "blur(0px)" }
            : { scale: 0.86, opacity: 0, filter: "blur(4px)" }
        }
        transition={{ duration: 0.55, ease }}
      >
        <span
          className="select-none font-[family-name:var(--font-display)] text-[9rem] font-black leading-none text-nfxred drop-shadow-[0_0_60px_rgba(229,9,20,0.7)] md:text-[12rem]"
          style={{ letterSpacing: "-0.06em" }}
        >
          N
        </span>

        {/* Sweep na N */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-[-10%] left-0 w-1/4 bg-gradient-to-r from-transparent via-white/70 to-transparent"
          initial={{ x: "-140%", opacity: 0 }}
          animate={{ x: "380%", opacity: [0, 1, 0] }}
          transition={{ duration: 0.55, delay: 0.28, ease }}
        />
      </motion.div>

      {/* Título da série após o slam */}
      <motion.div
        className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center px-6 text-center"
        initial={{ opacity: 0, y: 24, scale: 1.08 }}
        animate={
          phase === "title"
            ? { opacity: 1, y: 0, scale: 1 }
            : phase === "out"
              ? { opacity: 0, y: -10, scale: 0.98 }
              : { opacity: 0, y: 24, scale: 1.08 }
        }
        transition={{ duration: 0.5, ease }}
      >
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-nfxred">
          Nexus Original
        </p>
        <h1 className="max-w-[16ch] font-[family-name:var(--font-display)] text-4xl font-black leading-[1.05] tracking-[-0.03em] text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.8)] md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
          {episodeLabel}
        </p>
      </motion.div>

      {/* Linha de impacto inferior */}
      <motion.div
        aria-hidden
        className="absolute bottom-[22%] h-px w-[min(420px,70vw)] bg-gradient-to-r from-transparent via-nfxred to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: phase === "n" ? 1 : 0.6, opacity: phase === "out" ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease }}
      />
    </motion.div>
  );
}

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}
