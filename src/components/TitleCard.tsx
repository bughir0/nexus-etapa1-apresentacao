"use client";

import { AnimatePresence, motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Cartão de título de episódio — aparece brevemente ao trocar de slide,
 * como o card "Episódio X" da Netflix.
 */
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
          transition={{ duration: 0.35, ease }}
          className="pointer-events-none fixed inset-0 z-50 grid place-items-center bg-black/55 backdrop-blur-[2px]"
        >
          <div className="px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.4, ease }}
              className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-nfxred"
            >
              Episódio {String(episode).padStart(2, "0")} · {String(total).padStart(2, "0")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.5, ease }}
              className="font-[family-name:var(--font-display)] text-3xl font-black text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.8)] md:text-5xl"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.4 }}
              className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/55"
            >
              {category}
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
