"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { PlayIcon, PlusIcon } from "@/components/icons";

export function Card({
  slide,
  index,
  position,
  onPlay,
}: {
  slide: Slide;
  index: number;
  /** número exibido no card (1..9) referente à ordem real do slide */
  position: number;
  onPlay: (index: number) => void;
}) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Abrir slide ${position}: ${slide.title}`}
      onClick={() => onPlay(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPlay(index);
        }
      }}
      initial={false}
      whileHover={{ scale: 1.16, y: -6, zIndex: 30 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="group relative aspect-video w-[190px] shrink-0 cursor-pointer overflow-hidden rounded-md bg-steel/40 shadow-[0_8px_24px_rgba(0,0,0,0.45)] outline-none ring-nfxred/70 focus-visible:ring-2 md:w-[280px]"
    >
      <Image
        src={slide.card.src}
        alt={slide.image?.alt ?? slide.title}
        fill
        sizes="(max-width: 768px) 190px, 280px"
        className="object-cover transition duration-500 group-hover:scale-105"
      />

      {/* Faixa de cor da marca no topo */}
      <span
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ backgroundColor: slide.card.accent }}
      />

      {/* Número do slide */}
      <span className="absolute left-2 top-2 z-10 grid h-6 w-6 place-items-center rounded bg-black/60 text-xs font-bold text-white/90 backdrop-blur-sm">
        {String(position).padStart(2, "0")}
      </span>

      {/* Título base (some no hover) */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 transition-opacity duration-300 group-hover:opacity-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-nfxred">
          {slide.eyebrow.split("·")[0].trim()}
        </p>
        <p className="mt-0.5 line-clamp-1 text-sm font-bold text-white md:text-base">
          {slide.title}
        </p>
      </div>

      {/* Painel de informações no hover */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/70 to-black/10 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-nfxred md:text-[11px]">
          {slide.category}
        </p>
        <h3 className="mt-1 line-clamp-1 font-[family-name:var(--font-display)] text-base font-bold leading-tight text-white md:text-lg">
          {slide.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/70 md:text-xs">
          {slide.synopsis}
        </p>
        <div className="pointer-events-auto mt-2.5 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPlay(index);
            }}
            aria-label={`Apresentar a partir de ${slide.title}`}
            className="grid h-8 w-8 place-items-center rounded-full bg-white text-black transition hover:bg-white/85"
          >
            <PlayIcon className="h-3.5 w-3.5 translate-x-px" />
          </button>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            aria-label="Adicionar à lista"
            className="grid h-8 w-8 place-items-center rounded-full border-2 border-white/50 text-white transition hover:border-white"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
