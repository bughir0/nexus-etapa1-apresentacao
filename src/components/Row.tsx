"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { slides } from "@/data/slides";
import { Card } from "@/components/Card";
import { Top10Card } from "@/components/Top10Card";
import { PosterCard } from "@/components/PosterCard";
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
  variant?: "default" | "top10" | "posters";
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease }}
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
            className="no-scrollbar flex gap-2.5 overflow-x-auto scroll-smooth px-4 py-8 md:gap-3 md:px-12"
          >
            {slideIndices.map((slideIndex, i) => {
              const slide = slides[slideIndex];
              if (variant === "top10") {
                return (
                  <motion.div
                    key={`${title}-${slideIndex}-${i}`}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease }}
                  >
                    <Top10Card
                      slide={slide}
                      index={slideIndex}
                      rank={i + 1}
                      onPlay={onPlay}
                      onInfo={onInfo}
                    />
                  </motion.div>
                );
              }
              if (variant === "posters") {
                return (
                  <motion.div
                    key={`${title}-${slideIndex}-${i}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease }}
                  >
                    <PosterCard
                      slide={slide}
                      index={slideIndex}
                      onPlay={onPlay}
                      onInfo={onInfo}
                    />
                  </motion.div>
                );
              }
              return (
                <motion.div
                  key={`${title}-${slideIndex}-${i}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4, ease }}
                >
                  <Card
                    slide={slide}
                    index={slideIndex}
                    position={slideIndex + 1}
                    onPlay={onPlay}
                    onInfo={onInfo}
                    progress={continueProgress?.[slideIndex]}
                  />
                </motion.div>
              );
            })}
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
