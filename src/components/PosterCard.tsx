"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { PlayIcon } from "@/components/icons";

/** Poster vertical estilo capa de série */
export function PosterCard({
  slide,
  index,
  onPlay,
  onInfo,
}: {
  slide: Slide;
  index: number;
  onPlay: (index: number) => void;
  onInfo?: (index: number) => void;
}) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Capa: ${slide.title}`}
      onClick={() => onPlay(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPlay(index);
        }
      }}
      whileHover={{ scale: 1.06, y: -8, zIndex: 20 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="group relative aspect-[2/3] w-[130px] shrink-0 cursor-pointer overflow-hidden rounded-md bg-[#1a1a1a] shadow-[0_12px_32px_rgba(0,0,0,0.55)] outline-none ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-white sm:w-[150px] md:w-[170px]"
    >
      <Image
        src={slide.image?.src ?? slide.card.src}
        alt={slide.image?.alt ?? slide.title}
        fill
        sizes="170px"
        className="object-cover transition duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {slide.badges?.includes("original") ? (
        <span className="absolute left-2 top-2 rounded bg-nfxred px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
          Original
        </span>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 p-2.5">
        <p className="line-clamp-2 text-xs font-bold leading-snug text-white md:text-sm">
          {slide.title}
        </p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/45">
          Ep. {String(index + 1).padStart(2, "0")}
        </p>
      </div>

      <span className="absolute inset-0 grid place-items-center bg-black/35 opacity-0 transition group-hover:opacity-100">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-black">
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
          className="absolute right-2 top-2 rounded bg-black/65 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/80 opacity-0 transition group-hover:opacity-100"
        >
          Info
        </button>
      ) : null}
    </motion.div>
  );
}
