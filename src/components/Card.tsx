"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { PlayIcon, PlusIcon, InfoIcon } from "@/components/icons";

const badgeLabel = {
  novo: "Novo",
  top: "Top 5",
  original: "Original",
} as const;

function Badges({ badges }: { badges?: Slide["badges"] }) {
  if (!badges?.length) return null;
  return (
    <div className="absolute right-2 top-2 z-10 flex flex-col items-end gap-1">
      {badges.map((b) => (
        <span
          key={b}
          className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white ${
            b === "original"
              ? "bg-nfxred"
              : b === "top"
                ? "bg-white text-black"
                : "bg-mint/90 text-black"
          }`}
        >
          {badgeLabel[b]}
        </span>
      ))}
    </div>
  );
}

export function Card({
  slide,
  index,
  position,
  onPlay,
  onInfo,
  progress,
}: {
  slide: Slide;
  index: number;
  position: number;
  onPlay: (index: number) => void;
  onInfo?: (index: number) => void;
  progress?: number;
}) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Abrir episódio ${position}: ${slide.title}`}
      onClick={() => onPlay(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPlay(index);
        }
      }}
      initial={false}
      whileHover={{ scale: 1.1, y: -10, zIndex: 30 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className="group relative aspect-video w-[200px] shrink-0 cursor-pointer overflow-hidden rounded-md bg-[#222] shadow-[0_10px_28px_rgba(0,0,0,0.5)] outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-[220px] md:w-[280px]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={slide.card.src}
          alt={slide.image?.alt ?? slide.title}
          fill
          sizes="(max-width: 768px) 220px, 280px"
          className="object-cover ken-burns-fast"
        />
      </div>

      {/* Preview overlay “trailer” no hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition duration-500 group-hover:opacity-40 group-hover:bg-[radial-gradient(circle_at_30%_20%,rgba(229,9,20,0.45),transparent_55%)]" />

      <span className="absolute left-2 top-2 z-10 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-white/90 backdrop-blur-sm">
        E{String(position).padStart(2, "0")}
      </span>

      <Badges badges={slide.badges} />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-2.5 pb-2.5 pt-10 transition-opacity duration-250 group-hover:opacity-0">
        <p className="line-clamp-1 text-sm font-bold text-white">{slide.title}</p>
        {typeof progress === "number" ? (
          <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-nfxred"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/75 to-black/5 p-3 opacity-0 transition-opacity duration-250 group-hover:opacity-100">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-nfxred">
          {slide.category}
        </p>
        <h3 className="mt-1 line-clamp-1 text-sm font-bold leading-tight text-white md:text-base">
          {slide.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/60">
          {slide.synopsis}
        </p>
        <div className="pointer-events-auto mt-2.5 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPlay(index);
            }}
            aria-label={`Assistir ${slide.title}`}
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-black transition hover:bg-white/85 md:h-8 md:w-8"
          >
            <PlayIcon className="h-3.5 w-3.5 translate-x-px" />
          </button>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            aria-label="Adicionar à lista"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/50 text-white transition hover:border-white md:h-8 md:w-8"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
          {onInfo ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInfo(index);
              }}
              aria-label="Mais informações"
              className="ml-auto grid h-9 w-9 place-items-center rounded-full border border-white/50 text-white transition hover:border-white md:h-8 md:w-8"
            >
              <InfoIcon className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
