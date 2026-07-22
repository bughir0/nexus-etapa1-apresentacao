"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { slides } from "@/data/slides";
import { Card } from "@/components/Card";
import { Top10Card } from "@/components/Top10Card";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Row({
  title,
  slideIndices,
  onPlay,
  onInfo,
  variant = "default",
  continueProgress,
}: {
  title: string;
  slideIndices: number[];
  onPlay: (index: number) => void;
  onInfo?: (index: number) => void;
  variant?: "default" | "top10";
  /** mapa slideIndex → progresso 0–1 para "Continue assistindo" */
  continueProgress?: Record<number, number>;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByDir = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <motion.section
      className="group/row relative"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease }}
    >
      <h2 className="mb-2 px-4 text-lg font-bold text-white/90 transition group-hover/row:text-white md:px-12 md:text-xl">
        {title}
      </h2>

      <div className="relative">
        <button
          type="button"
          aria-label="Rolar para a esquerda"
          onClick={() => scrollByDir(-1)}
          className="absolute left-0 top-0 z-40 hidden h-full w-12 items-center justify-center bg-gradient-to-r from-black/90 via-black/50 to-transparent text-white opacity-0 transition-opacity duration-200 group-hover/row:opacity-100 md:flex"
        >
          <ChevronLeftIcon className="h-8 w-8 drop-shadow" />
        </button>

        <div
          ref={trackRef}
          className="no-scrollbar flex gap-2 overflow-x-auto scroll-smooth px-4 py-10 md:gap-3 md:px-12"
        >
          {slideIndices.map((slideIndex, i) =>
            variant === "top10" ? (
              <Top10Card
                key={`${title}-${slideIndex}-${i}`}
                slide={slides[slideIndex]}
                index={slideIndex}
                rank={i + 1}
                onPlay={onPlay}
                onInfo={onInfo}
              />
            ) : (
              <Card
                key={`${title}-${slideIndex}-${i}`}
                slide={slides[slideIndex]}
                index={slideIndex}
                position={slideIndex + 1}
                onPlay={onPlay}
                onInfo={onInfo}
                progress={continueProgress?.[slideIndex]}
              />
            ),
          )}
        </div>

        <button
          type="button"
          aria-label="Rolar para a direita"
          onClick={() => scrollByDir(1)}
          className="absolute right-0 top-0 z-40 hidden h-full w-12 items-center justify-center bg-gradient-to-l from-black/90 via-black/50 to-transparent text-white opacity-0 transition-opacity duration-200 group-hover/row:opacity-100 md:flex"
        >
          <ChevronRightIcon className="h-8 w-8 drop-shadow" />
        </button>
      </div>
    </motion.section>
  );
}
