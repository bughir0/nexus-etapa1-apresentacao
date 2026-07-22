"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slides } from "@/data/slides";
import { SlideView } from "@/components/SlideView";
import { TitleCard } from "@/components/TitleCard";
import { ease } from "@/components/ui";
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
  const progress = ((index + 1) / total) * 100;

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
    hideTimer.current = setTimeout(() => setControlsVisible(false), 3500);
  }, []);

  useEffect(() => {
    setTitleCardVisible(true);
    if (titleTimer.current) clearTimeout(titleTimer.current);
    titleTimer.current = setTimeout(() => setTitleCardVisible(false), 1400);
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
        if (episodesOpen) setEpisodesOpen(false);
        else if (document.fullscreenElement) void document.exitFullscreen?.();
        else onExit?.();
      }
      if (e.key.toLowerCase() === "f") {
        if (!document.fullscreenElement)
          void document.documentElement.requestFullscreen?.();
        else void document.exitFullscreen?.();
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
    if (!document.fullscreenElement)
      void document.documentElement.requestFullscreen?.();
    else void document.exitFullscreen?.();
  };

  return (
    <main
      onMouseMove={revealControls}
      className="relative h-dvh w-full overflow-hidden bg-black text-white"
    >
      <TitleCard
        visible={titleCardVisible}
        episode={index + 1}
        total={total}
        title={slide.title}
        category={slide.category}
      />

      {/* Voltar — sempre clicável (fora do chrome que auto-esconde) */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onExit?.();
        }}
        className="absolute left-4 top-5 z-[60] inline-flex items-center gap-2 rounded-full bg-black/55 px-3.5 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/80 md:left-10"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Voltar à Home</span>
      </button>

      {/* Top chrome */}
      <motion.header
        initial={false}
        animate={{
          opacity: controlsVisible ? 1 : 0,
          y: controlsVisible ? 0 : -10,
        }}
        transition={{ duration: 0.25 }}
        className={`absolute inset-x-0 top-0 z-40 bg-gradient-to-b from-black/90 via-black/50 to-transparent px-4 pb-20 pt-5 md:px-10 ${
          controlsVisible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Espaço reservado ao botão Voltar fixo */}
          <div className="w-[140px] sm:w-[160px]" aria-hidden />

          <div className="min-w-0 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-nfxred">
              Nexus · T1
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-white/90">
              E{String(index + 1).padStart(2, "0")} · {slide.title}
            </p>
          </div>

          <div className="justify-self-end text-right text-xs font-semibold tabular-nums tracking-wide text-white/55">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>
      </motion.header>

      <div className="relative h-full">
        <SlideView slide={slide} direction={direction} />
      </div>

      {/* Side nav — desktop */}
      <motion.button
        type="button"
        aria-label="Episódio anterior"
        onClick={() => go(index - 1)}
        disabled={index === 0 || !controlsVisible}
        initial={false}
        animate={{ opacity: controlsVisible && index > 0 ? 1 : 0 }}
        className={`absolute left-3 top-1/2 z-40 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/70 md:grid ${
          controlsVisible && index > 0
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </motion.button>
      <motion.button
        type="button"
        aria-label="Próximo episódio"
        onClick={() => go(index + 1)}
        disabled={index === total - 1 || !controlsVisible}
        initial={false}
        animate={{ opacity: controlsVisible && index < total - 1 ? 1 : 0 }}
        className={`absolute right-3 top-1/2 z-40 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/70 md:grid ${
          controlsVisible && index < total - 1
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </motion.button>

      {/* Episodes drawer */}
      <AnimatePresence>
        {episodesOpen ? (
          <motion.aside
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 28 }}
            transition={{ duration: 0.28, ease }}
            className="absolute bottom-28 right-4 top-24 z-50 flex w-[min(340px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#141414]/97 shadow-2xl backdrop-blur-xl md:right-10"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
              <h3 className="text-sm font-bold text-white">Episódios</h3>
              <button
                type="button"
                onClick={() => setEpisodesOpen(false)}
                className="text-xs font-semibold text-white/45 transition hover:text-white"
              >
                Fechar
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto p-2">
              {slides.map((ep, i) => (
                <li key={ep.id}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-white/10 ${
                      i === index ? "bg-white/10" : ""
                    }`}
                  >
                    <span className="mt-0.5 w-5 shrink-0 text-center text-xs font-bold text-white/35">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">
                        {ep.title}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-white/40">
                        {ep.synopsis}
                      </p>
                    </div>
                    {i === index ? (
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nfxred" />
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      {/* Bottom chrome */}
      <motion.footer
        initial={false}
        animate={{
          opacity: controlsVisible ? 1 : 0,
          y: controlsVisible ? 0 : 16,
        }}
        transition={{ duration: 0.25 }}
        className={`absolute inset-x-0 bottom-0 z-40 bg-gradient-to-t from-black via-black/85 to-transparent px-4 pb-5 pt-20 md:px-10 ${
          controlsVisible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-[1400px]">
          {/* Next-up + scrubber row */}
          <div className="mb-4 flex items-end justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="mb-1 truncate text-sm font-semibold text-white md:text-base">
                {slide.title}
              </p>
              <p className="truncate text-[11px] text-white/45 md:text-xs">
                Episódio {index + 1} de {total} · {slide.category}
              </p>
            </div>

            {nextSlide ? (
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="hidden max-w-[220px] shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left backdrop-blur transition hover:bg-white/10 md:block"
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                  A seguir · Ep. {String(index + 2).padStart(2, "0")}
                </p>
                <p className="mt-0.5 truncate text-xs font-semibold text-white/85">
                  {nextSlide.title}
                </p>
              </button>
            ) : null}
          </div>

          {/* Scrubber */}
          <div
            role="slider"
            aria-valuenow={index + 1}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-label="Progresso da temporada"
            className="group/scrub mb-4 h-1 cursor-pointer rounded-full bg-white/20"
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
              <span className="absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-nfxred opacity-0 shadow-md transition group-hover/scrub:opacity-100" />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index === total - 1}
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-black transition hover:bg-white/85 disabled:opacity-30"
              aria-label="Próximo episódio"
            >
              <PlayIcon className="h-4 w-4 translate-x-px" />
            </button>

            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              className="grid h-9 w-9 place-items-center text-white/80 transition hover:text-white disabled:opacity-25"
              aria-label="Anterior"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index === total - 1}
              className="grid h-9 w-9 place-items-center text-white/80 transition hover:text-white disabled:opacity-25"
              aria-label="Avançar"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="grid h-9 w-9 place-items-center text-white/80 transition hover:text-white"
              aria-label={muted ? "Ativar som" : "Silenciar"}
            >
              {muted ? (
                <MuteIcon className="h-5 w-5" />
              ) : (
                <VolumeIcon className="h-5 w-5" />
              )}
            </button>

            <div className="flex-1" />

            <button
              type="button"
              onClick={() => setEpisodesOpen((o) => !o)}
              className={`inline-flex items-center gap-2 rounded px-3 py-2 text-xs font-semibold transition ${
                episodesOpen
                  ? "bg-white text-black"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <EpisodesIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Episódios</span>
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="grid h-9 w-9 place-items-center text-white/80 transition hover:text-white"
              aria-label="Tela cheia"
            >
              <FullscreenIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
