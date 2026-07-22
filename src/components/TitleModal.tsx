"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { slides } from "@/data/slides";
import { ease } from "@/components/ui";
import { PlayIcon, PlusIcon, CloseIcon } from "@/components/icons";

export function TitleModal({
  openIndex,
  onClose,
  onPlay,
}: {
  openIndex: number | null;
  onClose: () => void;
  onPlay: (index: number) => void;
}) {
  const slide = openIndex != null ? slides[openIndex] : null;

  useEffect(() => {
    if (openIndex == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex, onClose]);

  return (
    <AnimatePresence>
      {slide && openIndex != null ? (
        <motion.div
          key="title-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/70 px-3 py-8 backdrop-blur-sm md:px-6 md:py-12"
          onClick={onClose}
        >
          <motion.article
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-[#181818] shadow-[0_28px_80px_rgba(0,0,0,0.7)]"
          >
            <div className="relative aspect-video w-full">
              <Image
                src={slide.image?.src ?? slide.card.src}
                alt={slide.image?.alt ?? slide.title}
                fill
                sizes="768px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/25 to-transparent" />

              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[#181818] text-white transition hover:bg-black"
              >
                <CloseIcon className="h-4 w-4" />
              </button>

              <div className="absolute inset-x-0 bottom-0 space-y-3 p-5 md:p-7">
                <span className="inline-flex rounded bg-nfxred px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                  Nexus Original
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-black leading-tight tracking-[-0.02em] text-white md:text-4xl">
                  {slide.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onPlay(openIndex)}
                    className="inline-flex items-center gap-2 rounded bg-white px-5 py-2 text-sm font-bold text-black transition hover:bg-white/85"
                  >
                    <PlayIcon className="h-4 w-4 translate-x-px" />
                    Assistir
                  </button>
                  <button
                    type="button"
                    aria-label="Adicionar à lista"
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/45 text-white transition hover:border-white"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-5 px-5 py-5 md:grid-cols-[1.45fr_0.75fr] md:gap-8 md:px-7 md:py-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-white/70">
                  <span className="text-mint">2026</span>
                  <span className="rounded border border-white/25 px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
                    Ep. {String(openIndex + 1).padStart(2, "0")}
                  </span>
                  <span>{slide.category}</span>
                </div>
                <p className="text-sm leading-relaxed text-white/80 md:text-[15px]">
                  {slide.synopsis}
                </p>
              </div>
              <aside className="space-y-2 text-sm text-white/50">
                <p>
                  <span className="text-white/30">Temporada: </span>Etapa 1
                </p>
                <p>
                  <span className="text-white/30">Gênero: </span>
                  {slide.eyebrow}
                </p>
              </aside>
            </div>

            <div className="border-t border-white/10 px-5 py-5 md:px-7 md:py-6">
              <h3 className="mb-3 text-base font-bold text-white">Episódios</h3>
              <ul className="grid max-h-[260px] gap-1 overflow-y-auto pr-1">
                {slides.map((ep, i) => (
                  <li key={ep.id}>
                    <button
                      type="button"
                      onClick={() => onPlay(i)}
                      className={`group grid w-full grid-cols-[28px_1fr] items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-white/10 sm:grid-cols-[28px_96px_1fr] ${
                        i === openIndex ? "bg-white/10" : ""
                      }`}
                    >
                      <span className="text-center text-sm font-bold text-white/35">
                        {i + 1}
                      </span>
                      <div className="relative hidden h-14 overflow-hidden rounded sm:block">
                        <Image
                          src={ep.card.src}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                        <span className="absolute inset-0 grid place-items-center bg-black/35 opacity-0 transition group-hover:opacity-100">
                          <PlayIcon className="h-4 w-4 text-white" />
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {ep.title}
                        </p>
                        <p className="line-clamp-1 text-xs text-white/40">
                          {ep.synopsis}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
