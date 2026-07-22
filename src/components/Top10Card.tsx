"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { PlayIcon } from "@/components/icons";

/**
 * Card estilo "Top 10" da Netflix — número gigante + poster.
 */
export function Top10Card({
  slide,
  index,
  rank,
  onPlay,
  onInfo,
}: {
  slide: Slide;
  index: number;
  rank: number;
  onPlay: (index: number) => void;
  onInfo?: (index: number) => void;
}) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Top ${rank}: ${slide.title}`}
      onClick={() => onPlay(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPlay(index);
        }
      }}
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-[160px] w-[220px] shrink-0 cursor-pointer items-end outline-none md:h-[210px] md:w-[300px]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-0 select-none font-[family-name:var(--font-display)] text-[140px] font-black leading-none text-transparent [-webkit-text-stroke:3px_#808080] md:text-[190px]"
        style={{
          WebkitTextStroke: "3px #808080",
          paintOrder: "stroke fill",
        }}
      >
        {rank}
      </span>

      <div className="relative ml-auto h-full w-[58%] overflow-hidden rounded-md shadow-[0_12px_32px_rgba(0,0,0,0.55)] ring-1 ring-white/10 transition group-hover:ring-white/40">
        <Image
          src={slide.card.src}
          alt={slide.image?.alt ?? slide.title}
          fill
          sizes="180px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-2.5">
          <p className="line-clamp-2 text-xs font-bold text-white md:text-sm">
            {slide.title}
          </p>
        </div>
        <span className="absolute inset-0 grid place-items-center bg-black/35 opacity-0 transition group-hover:opacity-100">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-black">
            <PlayIcon className="h-4 w-4 translate-x-px" />
          </span>
        </span>
        {onInfo ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInfo(index);
            }}
            className="absolute right-2 top-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/80 opacity-0 transition group-hover:opacity-100 hover:bg-black/80"
          >
            Info
          </button>
        ) : null}
      </div>
    </motion.div>
  );
}
