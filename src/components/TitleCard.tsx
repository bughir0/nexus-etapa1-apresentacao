"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ease } from "@/components/ui";

export function TitleCard({
  visible,
  episode,
  total,
  title,
  category,
}: {
  visible: boolean;
  episode: number;
  total: number;
  title: string;
  category: string;
}) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key={`${episode}-${title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease }}
          className="pointer-events-none fixed inset-0 z-50 grid place-items-center bg-black/50"
        >
          <div className="px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.35, ease }}
              className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em] text-nfxred"
            >
              Episódio {String(episode).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45, ease }}
              className="font-[family-name:var(--font-display)] text-3xl font-black tracking-[-0.02em] text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.75)] md:text-5xl"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.22, duration: 0.35 }}
              className="mt-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/50"
            >
              {category}
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
