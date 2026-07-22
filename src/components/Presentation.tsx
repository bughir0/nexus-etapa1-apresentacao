"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slides } from "@/data/slides";
import { SlideView } from "@/components/SlideView";
import { TitleCard } from "@/components/TitleCard";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EpisodesIcon,
  FullscreenIcon,
  MuteIcon,
  PlayIcon,
  VolumeIcon,
} from "@/components/icons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Presentation({
  startIndex = 0,
  onExit,
}: {
  startIndex?: number;
  onExit?: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [muted, setMuted] = useState(true);
  const [titleCardVisible, setTitleCardVisible] = useState(true);
  const [episodesOpen, setEpisodesOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = slides.length;
  const slide = slides[index];
  const nextSlide = index < total - 1 ? slides[index + 1] : null;

  const go = useCallback(
    (n: number) => {
      const next = Math.max(0, Math.min(total - 1, n));
      if (next === index) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
      setEpisodesOpen(false);
    },
    [total, index],
  );

  const revealControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), 3200);
  }, []);

  // Title card a cada troca de episódio
  useEffect(() => {
    setTitleCardVisible(true);
    if (titleTimer.current) clearTimeout(titleTimer.current);
    titleTimer.current = setTimeout(() => setTitleCardVisible(false), 1600);
    return () => {
      if (titleTimer.current) clearTimeout(titleTimer.current);
    };
  }, [index]);

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
        if (episodesOpen) {
          setEpisodesOpen(false);
        } else if (document.fullscreenElement) {
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
      if (e.key.toLowerCase() === "m") setMuted((m) => !m);
      if (e.key.toLowerCase() === "e") setEpisodesOpen((o) => !o);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, total, onExit, revealControls, episodesOpen]);

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen?.();
    } else {
      void document.exitFullscreen?.();
    }
  };

  const progress = ((index + 1) / total) * 100;

  return (
    <main
      onMouseMove={revealControls}
      onClick={revealControls}
      className="relative h-dvh w-full overflow-hidden bg-black text-white"
    >
      {/* Progresso estilo player Netflix */}
      <div className="fixed inset-x-0 top-0 z-40 h-[3px] bg-white/10">
        <motion.div
          className="h-full bg-nfxred origin-left"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease }}
        />
      </div>

      <TitleCard
        visible={titleCardVisible}
        episode={index + 1}
        total={total}
        title={slide.title}
        category={slide.category}
      />

      {/* Topo player */}
      <motion.div
        initial={false}
        animate={{
          opacity: controlsVisible ? 1 : 0,
          y: controlsVisible ? 0 : -12,
        }}
        transition={{ duration: 0.28 }}
        className="pointer-events-none fixed inset-x-0 top-0 z-30 bg-gradient-to-b from-black/85 via-black/40 to-transparent px-4 pb-16 pt-4 md:px-8"
      >
        <div className="pointer-events-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onExit?.()}
            className="inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-black/75"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Voltar à Home
          </button>

          <div className="min-w-0 text-center">
            <p className="truncate text-[11px] font-bold uppercase tracking-[0.22em] text-nfxred">
              Nexus · Temporada 1
            </p>
            <p className="hidden truncate text-sm font-semibold text-white/90 md:block">
              E{String(index + 1).padStart(2, "0")} · {slide.title}
            </p>
          </div>

          <span className="rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </motion.div>

      <div className="relative h-full">
        <SlideView slide={slide} direction={direction} />
      </div>

      {/* Setas laterais */}
      <motion.button
        type="button"
        aria-label="Episódio anterior"
        onClick={() => go(index - 1)}
        disabled={index === 0}
        initial={false}
        animate={{ opacity: controlsVisible ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="fixed left-2 top-1/2 z-30 hidden -translate-y-1/2 place-items-center rounded-full bg-black/45 p-3 text-white backdrop-blur transition hover:bg-black/75 disabled:pointer-events-none disabled:opacity-0 md:grid"
      >
        <ChevronLeftIcon className="h-7 w-7" />
      </motion.button>
      <motion.button
        type="button"
        aria-label="Próximo episódio"
        onClick={() => go(index + 1)}
        disabled={index === total - 1}
        initial={false}
        animate={{ opacity: controlsVisible ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="fixed right-2 top-1/2 z-30 hidden -translate-y-1/2 place-items-center rounded-full bg-black/45 p-3 text-white backdrop-blur transition hover:bg-black/75 disabled:pointer-events-none disabled:opacity-0 md:grid"
      >
        <ChevronRightIcon className="h-7 w-7" />
      </motion.button>

      {/* Preview próximo episódio */}
      <AnimatePresence>
        {nextSlide && controlsVisible && index < total - 1 ? (
          <motion.button
            type="button"
            key={`next-${nextSlide.id}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.3, ease }}
            onClick={() => go(index + 1)}
            className="fixed bottom-28 right-4 z-30 hidden max-w-[240px] overflow-hidden rounded-md border border-white/15 bg-black/70 text-left shadow-2xl backdrop-blur md:block"
          >
            <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
              A seguir · Ep. {String(index + 2).padStart(2, "0")}
            </div>
            <div className="px-3 pb-3 pt-1">
              <p className="truncate text-sm font-bold text-white">
                {nextSlide.title}
              </p>
              <p className="mt-0.5 line-clamp-2 text-[11px] text-white/55">
                {nextSlide.synopsis}
              </p>
            </div>
          </motion.button>
        ) : null}
      </AnimatePresence>

      {/* Painel de episódios */}
      <AnimatePresence>
        {episodesOpen ? (
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3, ease }}
            className="fixed bottom-24 right-3 top-20 z-40 w-[min(360px,92vw)] overflow-hidden rounded-lg border border-white/10 bg-[#141414]/95 shadow-2xl backdrop-blur-md md:right-8"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <h3 className="text-sm font-bold text-white">Episódios · T1</h3>
              <button
                type="button"
                onClick={() => setEpisodesOpen(false)}
                className="text-xs font-semibold text-white/50 hover:text-white"
              >
                Fechar
              </button>
            </div>
            <ul className="max-h-full overflow-y-auto p-2 pb-4">
              {slides.map((ep, i) => (
                <li key={ep.id}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    className={`flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left transition hover:bg-white/10 ${
                      i === index ? "bg-white/10" : ""
                    }`}
                  >
                    <span className="mt-0.5 w-5 text-center text-xs font-bold text-white/40">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">
                        {ep.title}
                      </p>
                      <p className="line-clamp-2 text-[11px] text-white/45">
                        {ep.synopsis}
                      </p>
                    </div>
                    {i === index ? (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-nfxred" />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      {/* Controles inferiores estilo Netflix */}
      <motion.div
        initial={false}
        animate={{
          opacity: controlsVisible ? 1 : 0,
          y: controlsVisible ? 0 : 20,
        }}
        transition={{ duration: 0.28 }}
        className="fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black via-black/80 to-transparent px-4 pb-4 pt-16 md:px-8"
      >
        {/* Scrubber clicável */}
        <div
          className="group/scrub mb-3 h-1 cursor-pointer rounded-full bg-white/20 transition hover:h-1.5"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            go(Math.round(ratio * (total - 1)));
          }}
        >
          <div
            className="relative h-full rounded-full bg-nfxred transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          >
            <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-nfxred opacity-0 shadow transition group-hover/scrub:opacity-100" />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === total - 1}
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-black transition hover:bg-white/85 disabled:opacity-35"
            aria-label="Próximo"
          >
            <PlayIcon className="h-4 w-4 translate-x-px" />
          </button>

          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="hidden h-9 w-9 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25 disabled:opacity-35 md:grid"
            aria-label="Anterior"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === total - 1}
            className="hidden h-9 w-9 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25 disabled:opacity-35 md:grid"
            aria-label="Avançar"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label={muted ? "Ativar som" : "Silenciar"}
          >
            {muted ? (
              <MuteIcon className="h-4 w-4" />
            ) : (
              <VolumeIcon className="h-4 w-4" />
            )}
          </button>

          <div className="min-w-0 flex-1 px-1">
            <p className="truncate text-sm font-semibold text-white">
              {slide.title}
            </p>
            <p className="truncate text-[11px] text-white/45">
              Episódio {index + 1} de {total} · {slide.category}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setEpisodesOpen((o) => !o)}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition ${
              episodesOpen
                ? "bg-white text-black"
                : "bg-white/15 text-white hover:bg-white/25"
            }`}
          >
            <EpisodesIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Episódios</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Tela cheia"
          >
            <FullscreenIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Dots rápidos no mobile */}
        <div className="mt-3 flex justify-center gap-1.5 md:hidden">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Ir para episódio ${i + 1}`}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-nfxred" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </main>
  );
}
