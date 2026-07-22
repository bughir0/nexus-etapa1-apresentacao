"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { slides } from "@/data/slides";
import { Card } from "@/components/Card";
import { Top10Card } from "@/components/Top10Card";
import { ease } from "@/components/ui";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

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
  continueProgress?: Record<number, number>;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByDir = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  return (
    <motion.section
      className="group/row relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="mx-auto max-w-[1600px]">
        <h2 className="mb-1 px-4 text-base font-bold text-white/90 md:px-12 md:text-lg">
          {title}
        </h2>

        <div className="relative">
          <button
            type="button"
            aria-label="Rolar para a esquerda"
            onClick={() => scrollByDir(-1)}
            className="absolute left-0 top-0 z-40 hidden h-full w-11 items-center justify-center bg-gradient-to-r from-nfxbg via-nfxbg/70 to-transparent text-white opacity-0 transition-opacity duration-200 group-hover/row:opacity-100 md:flex"
          >
            <ChevronLeftIcon className="h-7 w-7" />
          </button>

          <div
            ref={trackRef}
            className="no-scrollbar flex gap-2 overflow-x-auto scroll-smooth px-4 py-8 md:gap-2.5 md:px-12"
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
            className="absolute right-0 top-0 z-40 hidden h-full w-11 items-center justify-center bg-gradient-to-l from-nfxbg via-nfxbg/70 to-transparent text-white opacity-0 transition-opacity duration-200 group-hover/row:opacity-100 md:flex"
          >
            <ChevronRightIcon className="h-7 w-7" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
