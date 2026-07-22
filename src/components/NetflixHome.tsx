"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { rows, slides } from "@/data/slides";
import type { Profile } from "@/data/profiles";
import { Row } from "@/components/Row";
import { TitleModal } from "@/components/TitleModal";
import { PlayIcon, InfoIcon, MuteIcon, VolumeIcon } from "@/components/icons";

const ease = [0.22, 1, 0.36, 1] as const;
const navItems = ["Início", "Séries", "Etapa 1", "Minha lista"];

/** Progresso fake para "Continue assistindo" */
const continueProgress: Record<number, number> = {
  0: 0.35,
  3: 0.62,
  6: 0.18,
};

function Navbar({
  profile,
  onSwitchProfile,
}: {
  profile: Profile;
  onSwitchProfile: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-nfxbg/95 shadow-[0_2px_16px_rgba(0,0,0,0.5)] backdrop-blur"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="flex items-center gap-6 px-4 py-3 md:px-12">
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className="select-none font-[family-name:var(--font-display)] text-2xl font-black tracking-tight text-nfxred md:text-3xl"
        >
          NEXUS
        </motion.span>
        <nav className="hidden items-center gap-5 text-sm text-white/80 md:flex">
          {navItems.map((item, i) => (
            <a
              key={item}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`transition hover:text-white ${
                i === 0 ? "font-semibold text-white" : ""
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden rounded border border-white/25 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:inline">
            Nexus Serviços & Logística
          </span>
          <button
            type="button"
            onClick={onSwitchProfile}
            title="Trocar de perfil"
            className="group flex items-center gap-2 rounded outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span
              className="grid h-8 w-8 place-items-center rounded text-xs font-bold text-white shadow ring-0 transition group-hover:ring-2 group-hover:ring-white"
              style={{ background: profile.avatar }}
            >
              {profile.initials}
            </span>
            <span className="hidden text-sm text-white/80 transition group-hover:text-white md:inline">
              {profile.name}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Billboard({
  onPlay,
  onInfo,
}: {
  onPlay: (index: number) => void;
  onInfo: (index: number) => void;
}) {
  const hero = slides[0];
  const [muted, setMuted] = useState(true);

  return (
    <section className="relative h-[82vh] min-h-[560px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "linear" }}
          className="absolute inset-0 ken-burns"
        >
          <Image
            src={hero.image?.src ?? hero.card.src}
            alt={hero.image?.alt ?? hero.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-nfxbg via-nfxbg/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.55)]" />
      </div>

      <div className="relative z-10 flex h-full max-w-2xl flex-col justify-end px-4 pb-28 md:px-12 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-3 flex items-center gap-2"
        >
          <span className="inline-flex items-center gap-2 rounded bg-nfxred px-2.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
            Nexus Original
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Série · Etapa 1
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05, ease }}
          className="font-[family-name:var(--font-display)] text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] md:text-6xl lg:text-7xl"
        >
          {hero.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-white/80"
        >
          <span className="text-mint">98% match</span>
          <span className="text-white/40">·</span>
          <span className="text-mint">2026</span>
          <span className="rounded border border-white/35 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-white/75">
            9 eps
          </span>
          <span>Consultoria Administrativa</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease }}
          className="mt-4 max-w-xl text-base leading-relaxed text-white/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] md:text-lg"
        >
          {hero.synopsis}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          <button
            type="button"
            onClick={() => onPlay(0)}
            className="inline-flex items-center gap-2 rounded bg-white px-7 py-2.5 text-base font-bold text-black transition hover:bg-white/80"
          >
            <PlayIcon className="h-5 w-5 translate-x-px" />
            Assistir
          </button>
          <button
            type="button"
            onClick={() => onInfo(0)}
            className="inline-flex items-center gap-2 rounded bg-white/20 px-6 py-2.5 text-base font-bold text-white backdrop-blur transition hover:bg-white/30"
          >
            <InfoIcon className="h-5 w-5" />
            Mais informações
          </button>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Ativar som" : "Silenciar"}
        className="absolute bottom-28 right-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur transition hover:bg-black/60 md:bottom-36 md:right-12"
      >
        {muted ? (
          <MuteIcon className="h-4 w-4" />
        ) : (
          <VolumeIcon className="h-4 w-4" />
        )}
      </button>
    </section>
  );
}

export function NetflixHome({
  profile,
  onPlay,
  onSwitchProfile,
}: {
  profile: Profile;
  onPlay: (index: number) => void;
  onSwitchProfile: () => void;
}) {
  const [infoIndex, setInfoIndex] = useState<number | null>(null);

  return (
    <main className="min-h-dvh w-full bg-nfxbg pb-16 text-white">
      <Navbar profile={profile} onSwitchProfile={onSwitchProfile} />
      <Billboard onPlay={onPlay} onInfo={setInfoIndex} />

      <div id="rows" className="relative z-10 -mt-20 space-y-2 md:-mt-28 md:space-y-4">
        {rows.map((row) => (
          <Row
            key={row.title}
            title={row.title}
            slideIndices={row.slideIndices}
            variant={row.variant}
            onPlay={onPlay}
            onInfo={setInfoIndex}
            continueProgress={
              row.title.startsWith("Continue") ? continueProgress : undefined
            }
          />
        ))}
      </div>

      <footer className="mt-12 px-4 text-center text-xs text-white/40 md:px-12">
        <p className="mb-2 font-[family-name:var(--font-display)] text-lg font-black tracking-wide text-white/20">
          NEXUS
        </p>
        Olá, {profile.name} · Nexus Serviços & Logística · Etapa 1 · Temporada 1
      </footer>

      <TitleModal
        openIndex={infoIndex}
        onClose={() => setInfoIndex(null)}
        onPlay={onPlay}
      />
    </main>
  );
}
