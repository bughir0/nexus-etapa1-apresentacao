"use client";

import { motion } from "framer-motion";
import { profiles, type Profile } from "@/data/profiles";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProfileGate({
  onSelect,
}: {
  onSelect: (profile: Profile) => void;
}) {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center bg-nfxbg px-4 py-16 text-white">
      <motion.span
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="mb-10 select-none font-[family-name:var(--font-display)] text-3xl font-black tracking-tight text-nfxred md:text-4xl"
      >
        NEXUS
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05, ease }}
        className="mb-10 text-center font-[family-name:var(--font-display)] text-3xl font-medium text-white/95 md:mb-14 md:text-5xl"
      >
        Quem está assistindo?
      </motion.h1>

      <ul className="flex max-w-5xl flex-wrap items-start justify-center gap-6 md:gap-8">
        {profiles.map((profile, i) => (
          <motion.li
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease }}
          >
            <button
              type="button"
              onClick={() => onSelect(profile)}
              className="group flex w-[110px] flex-col items-center gap-3 outline-none md:w-[140px]"
            >
              <span
                className="relative grid aspect-square w-full place-items-center overflow-hidden rounded-md text-4xl font-bold text-white shadow-[0_8px_28px_rgba(0,0,0,0.45)] ring-0 transition duration-200 group-hover:scale-[1.04] group-hover:ring-4 group-hover:ring-white group-focus-visible:ring-4 group-focus-visible:ring-white md:text-5xl"
                style={{ background: profile.avatar }}
              >
                {profile.initials}
              </span>
              <span className="text-sm text-nfxgray transition group-hover:text-white md:text-base">
                {profile.name}
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="mt-14 text-center text-xs tracking-wide text-white/35 md:mt-16"
      >
        Equipe de Consultoria · Etapa 1 — Comunicação Interna e Feedback
      </motion.p>
    </main>
  );
}
