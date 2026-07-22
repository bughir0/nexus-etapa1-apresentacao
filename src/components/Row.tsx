"use client";

import { useRef } from "react";
import { slides } from "@/data/slides";
import { Card } from "@/components/Card";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

export function Row({
  title,
  slideIndices,
  onPlay,
}: {
  title: string;
  slideIndices: number[];
  onPlay: (index: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByDir = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="group/row relative">
      <h2 className="mb-2 px-4 text-lg font-bold text-white/90 md:px-12 md:text-xl">
        {title}
      </h2>

      <div className="relative">
        <button
          type="button"
          aria-label="Rolar para a esquerda"
          onClick={() => scrollByDir(-1)}
          className="absolute left-0 top-0 z-40 hidden h-full w-10 items-center justify-center bg-gradient-to-r from-black/80 to-transparent text-white opacity-0 transition-opacity duration-200 group-hover/row:opacity-100 md:flex"
        >
          <ChevronLeftIcon className="h-7 w-7" />
        </button>

        <div
          ref={trackRef}
          className="no-scrollbar flex gap-2 overflow-x-auto scroll-smooth px-4 py-8 md:gap-2.5 md:px-12"
        >
          {slideIndices.map((slideIndex, i) => (
            <Card
              key={`${title}-${slideIndex}-${i}`}
              slide={slides[slideIndex]}
              index={slideIndex}
              position={slideIndex + 1}
              onPlay={onPlay}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Rolar para a direita"
          onClick={() => scrollByDir(1)}
          className="absolute right-0 top-0 z-40 hidden h-full w-10 items-center justify-center bg-gradient-to-l from-black/80 to-transparent text-white opacity-0 transition-opacity duration-200 group-hover/row:opacity-100 md:flex"
        >
          <ChevronRightIcon className="h-7 w-7" />
        </button>
      </div>
    </section>
  );
}
