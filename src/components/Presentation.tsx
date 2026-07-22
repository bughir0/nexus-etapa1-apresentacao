"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { slides } from "@/data/slides";
import { SlideView } from "@/components/SlideView";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

export function Presentation({
  startIndex = 0,
  onExit,
}: {
  startIndex?: number;
  onExit?: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = slides.length;
  const slide = slides[index];

  const go = useCallback(
    (n: number) => {
      setIndex(Math.max(0, Math.min(total - 1, n)));
    },
    [total],
  );

  const revealControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), 3000);
  }, []);

  useEffect(() => {
    revealControls();
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [revealControls]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      revealControls();
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        go(index + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(index - 1);
      }
      if (e.key === "Home") go(0);
      if (e.key === "End") go(total - 1);
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          void document.exitFullscreen?.();
        } else {
          onExit?.();
        }
      }
      if (e.key.toLowerCase() === "f") {
        if (!document.fullscreenElement) {
          void document.documentElement.requestFullscreen?.();
        } else {
          void document.exitFullscreen?.();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, total, onExit, revealControls]);

  useEffect(() => {
    let startX: number | null = null;
    const onStart = (e: TouchEvent) => {
      startX = e.changedTouches[0]?.screenX ?? null;
    };
    const onEnd = (e: TouchEvent) => {
      revealControls();
      if (startX == null) return;
      const dx = (e.changedTouches[0]?.screenX ?? startX) - startX;
      if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [go, index, revealControls]);

  return (
    <main
      onMouseMove={revealControls}
      className="relative h-dvh w-full overflow-hidden bg-nfxbg text-white"
    >
      {/* Barra de progresso vermelha estilo Netflix (topo) */}
      <div className="fixed inset-x-0 top-0 z-40 h-1 bg-white/15">
        <div
          className="h-full bg-nfxred transition-[width] duration-300"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      {/* Topo: voltar + contador (auto-hide) */}
      <motion.div
        initial={false}
        animate={{ opacity: controlsVisible ? 1 : 0, y: controlsVisible ? 0 : -8 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-x-0 top-0 z-30 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent px-4 pb-8 pt-4 md:px-8"
      >
        <button
          type="button"
          onClick={() => onExit?.()}
          className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-black/70"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Voltar
        </button>
        <span className="hidden max-w-[40vw] truncate text-sm font-semibold text-white/85 md:inline">
          {slide.title}
        </span>
        <span className="rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </motion.div>

      <div className="relative h-full">
        <SlideView slide={slide} />
      </div>

      {/* Setas laterais */}
      <motion.button
        type="button"
        aria-label="Slide anterior"
        onClick={() => go(index - 1)}
        disabled={index === 0}
        initial={false}
        animate={{ opacity: controlsVisible ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="fixed left-2 top-1/2 z-30 hidden -translate-y-1/2 grid-cols-1 place-items-center rounded-full bg-black/40 p-3 text-white backdrop-blur transition hover:bg-black/70 disabled:pointer-events-none disabled:opacity-0 md:grid"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </motion.button>
      <motion.button
        type="button"
        aria-label="Próximo slide"
        onClick={() => go(index + 1)}
        disabled={index === total - 1}
        initial={false}
        animate={{ opacity: controlsVisible ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="fixed right-2 top-1/2 z-30 hidden -translate-y-1/2 grid-cols-1 place-items-center rounded-full bg-black/40 p-3 text-white backdrop-blur transition hover:bg-black/70 disabled:pointer-events-none disabled:opacity-0 md:grid"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </motion.button>

      {/* Rodapé: dots + navegação (auto-hide) */}
      <motion.nav
        initial={false}
        animate={{ opacity: controlsVisible ? 1 : 0, y: controlsVisible ? 0 : 12 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[auto_1fr_auto] items-center gap-4 bg-gradient-to-t from-black/85 to-transparent px-4 pb-4 pt-10 md:px-8"
      >
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="rounded bg-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/25 disabled:cursor-default disabled:opacity-35"
        >
          Anterior
        </button>

        <div className="flex flex-wrap justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Ir para slide ${i + 1}`}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-nfxred"
                  : "w-2.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === total - 1}
          className="rounded bg-nfxred px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-nfxreddark disabled:cursor-default disabled:opacity-35"
        >
          Próximo
        </button>
      </motion.nav>
    </main>
  );
}
