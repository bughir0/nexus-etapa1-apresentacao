"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { PlayIcon } from "@/components/icons";

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
      whileHover={{ scale: 1.03, y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-[150px] w-[210px] shrink-0 cursor-pointer items-end outline-none focus-visible:ring-2 focus-visible:ring-white md:h-[190px] md:w-[280px]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[-6px] left-0 z-0 select-none font-[family-name:var(--font-display)] text-[120px] font-black leading-none text-transparent md:text-[160px]"
        style={{ WebkitTextStroke: "2.5px #6b6b6b" }}
      >
        {rank}
      </span>

      <div className="relative ml-auto h-full w-[56%] overflow-hidden rounded-md shadow-[0_12px_28px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition group-hover:ring-white/35">
        <Image
          src={slide.card.src}
          alt={slide.image?.alt ?? slide.title}
          fill
          sizes="160px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-2">
          <p className="line-clamp-2 text-[11px] font-bold leading-snug text-white md:text-xs">
            {slide.title}
          </p>
        </div>
        <span className="absolute inset-0 grid place-items-center bg-black/30 opacity-0 transition group-hover:opacity-100">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-black">
            <PlayIcon className="h-3.5 w-3.5 translate-x-px" />
          </span>
        </span>
        {onInfo ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInfo(index);
            }}
            className="absolute right-1.5 top-1.5 rounded bg-black/65 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/80 opacity-0 transition group-hover:opacity-100 hover:bg-black/85"
          >
            Info
          </button>
        ) : null}
      </div>
    </motion.div>
  );
}
