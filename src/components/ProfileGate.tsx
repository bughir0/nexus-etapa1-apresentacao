"use client";

import { motion } from "framer-motion";
import { profiles, type Profile } from "@/data/profiles";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { ease } from "@/components/ui";

export function ProfileGate({
  onSelect,
}: {
  onSelect: (profile: Profile) => void;
}) {
  return (
    <main className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-nfxbg px-4 py-16 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_35%_at_50%_15%,rgba(229,9,20,0.1),transparent_70%)]"
      />

      <motion.span
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="mb-8 select-none font-[family-name:var(--font-display)] text-3xl font-black tracking-tight text-nfxred md:mb-10 md:text-4xl"
      >
        NEXUS
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05, ease }}
        className="mb-2 text-center text-3xl font-medium text-white/95 md:text-5xl"
      >
        Quem está assistindo?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.35 }}
        className="mb-10 text-center text-sm text-white/40 md:mb-14"
      >
        Escolha um perfil para entrar na temporada Etapa 1
      </motion.p>

      <ul className="flex max-w-5xl flex-wrap items-start justify-center gap-5 md:gap-8">
        {profiles.map((profile, i) => (
          <motion.li
            key={profile.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease }}
          >
            <button
              type="button"
              onClick={() => onSelect(profile)}
              className="group flex w-[100px] flex-col items-center gap-3 outline-none md:w-[130px]"
            >
              <ProfileAvatar
                profile={profile}
                className="transition duration-200 group-hover:scale-[1.05] group-hover:ring-4 group-hover:ring-white group-focus-visible:ring-4 group-focus-visible:ring-white"
              />
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
        transition={{ delay: 0.5, duration: 0.35 }}
        className="mt-14 text-center text-xs tracking-wide text-white/30 md:mt-16"
      >
        Equipe de Consultoria · Etapa 1 — Comunicação Interna e Feedback
      </motion.p>
    </main>
  );
}
