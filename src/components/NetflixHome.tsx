"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { rows, slides } from "@/data/slides";
import type { Profile } from "@/data/profiles";
import { Row } from "@/components/Row";
import { TitleModal } from "@/components/TitleModal";
import { ease } from "@/components/ui";
import { PlayIcon, InfoIcon, MuteIcon, VolumeIcon } from "@/components/icons";
import {
  continueIndices,
  loadProgress,
  type WatchProgress,
} from "@/lib/progress";
import { setAmbientMuted, startAmbient, stopAmbient } from "@/lib/ambient";
import { unlockAudio } from "@/lib/netflixSound";

const navItems = ["Início", "Séries", "Etapa 1", "Minha lista"];

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
          ? "bg-nfxbg/95 shadow-[0_2px_16px_rgba(0,0,0,0.45)] backdrop-blur-md"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center gap-6 px-4 py-3.5 md:px-12">
        <span className="nfx-glow select-none font-[family-name:var(--font-display)] text-3xl font-black tracking-[-0.04em] text-nfxred md:text-4xl">
          NEXUS
        </span>
        <nav className="hidden items-center gap-5 text-sm text-white/75 md:flex">
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
          <span className="hidden rounded border border-white/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60 lg:inline">
            Nexus Serviços & Logística
          </span>
          <button
            type="button"
            onClick={onSwitchProfile}
            title="Trocar de perfil"
            className="group flex items-center gap-2 rounded outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span
              className="grid h-8 w-8 place-items-center rounded text-xs font-bold text-white transition group-hover:ring-2 group-hover:ring-white"
              style={{ background: profile.avatar }}
            >
              {profile.initials}
            </span>
            <span className="hidden text-sm text-white/75 transition group-hover:text-white md:inline">
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
  const [loadingPlay, setLoadingPlay] = useState(false);

  useEffect(() => {
    return () => stopAmbient();
  }, []);

  const toggleMute = async () => {
    const next = !muted;
    setMuted(next);
    if (!next) {
      await unlockAudio();
      await startAmbient(0.045);
      setAmbientMuted(false);
    } else {
      setAmbientMuted(true);
    }
  };

  const handlePlay = () => {
    setLoadingPlay(true);
    window.setTimeout(() => onPlay(0), 480);
  };

  return (
    <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden md:h-[86vh]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 ken-burns">
          <Image
            src={hero.image?.src ?? hero.card.src}
            alt={hero.image?.alt ?? hero.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-nfxbg via-nfxbg/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] items-end px-4 pb-24 md:px-12 md:pb-28">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="mb-2 font-[family-name:var(--font-display)] text-2xl font-black tracking-[0.12em] text-nfxred drop-shadow-[0_0_24px_rgba(229,9,20,0.45)] md:text-3xl"
          >
            NEXUS
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease }}
            className="mb-3 flex flex-wrap items-center gap-2"
          >
            <span className="rounded bg-nfxred px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Nexus Original
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Série · Etapa 1
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease }}
            className="font-[family-name:var(--font-display)] text-4xl font-black leading-[1.05] tracking-[-0.03em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] md:text-6xl lg:text-7xl"
          >
            {hero.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease }}
            className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-white/75"
          >
            <span className="text-mint">98% match</span>
            <span className="text-white/25">·</span>
            <span>2026</span>
            <span className="rounded border border-white/30 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-white/70">
              9 eps
            </span>
            <span>Consultoria</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="mt-4 max-w-[42ch] text-base leading-relaxed text-white/80 md:text-lg"
          >
            {hero.synopsis}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={handlePlay}
              disabled={loadingPlay}
              className="relative inline-flex items-center gap-2 overflow-hidden rounded bg-white px-6 py-3 text-base font-bold text-black transition hover:bg-white/85 disabled:opacity-90 md:py-2.5"
            >
              {loadingPlay ? <span className="shimmer absolute inset-0" /> : null}
              <PlayIcon className="relative h-5 w-5 translate-x-px" />
              <span className="relative">{loadingPlay ? "Abrindo…" : "Assistir"}</span>
            </button>
            <button
              type="button"
              onClick={() => onInfo(0)}
              className="inline-flex items-center gap-2 rounded bg-white/20 px-5 py-3 text-base font-bold text-white backdrop-blur-sm transition hover:bg-white/30 md:py-2.5"
            >
              <InfoIcon className="h-5 w-5" />
              Mais informações
            </button>
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => void toggleMute()}
        aria-label={muted ? "Ativar som ambiente" : "Silenciar"}
        className="absolute bottom-28 right-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 md:bottom-32 md:right-12 md:h-10 md:w-10"
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
  const [progress, setProgress] = useState<WatchProgress>({});

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const displayRows = useMemo(() => {
    const cont = continueIndices(progress);
    const continueRow =
      cont.length > 0
        ? { title: "Continue assistindo", slideIndices: cont.slice(0, 8) }
        : rows.find((r) => r.title.startsWith("Continue")) ?? rows[0];

    const rest = rows.filter((r) => !r.title.startsWith("Continue"));
    return [continueRow, ...rest];
  }, [progress]);

  return (
    <main className="min-h-dvh w-full bg-nfxbg pb-20 text-white">
      <Navbar profile={profile} onSwitchProfile={onSwitchProfile} />
      <Billboard onPlay={onPlay} onInfo={setInfoIndex} />

      <div
        id="rows"
        className="relative z-10 -mt-16 space-y-1 md:-mt-24 md:space-y-2"
      >
        {displayRows.map((row) => (
          <Row
            key={row.title}
            title={row.title}
            slideIndices={row.slideIndices}
            variant={row.variant}
            onPlay={onPlay}
            onInfo={setInfoIndex}
            continueProgress={
              row.title.startsWith("Continue") ? progress : undefined
            }
          />
        ))}
      </div>

      <footer className="mx-auto mt-14 max-w-[1600px] px-4 text-center md:px-12">
        <p className="mb-2 font-[family-name:var(--font-display)] text-xl font-black tracking-[0.22em] text-white/15">
          NEXUS
        </p>
        <p className="text-xs text-white/35">
          Olá, {profile.name} · Nexus Serviços & Logística · Etapa 1 · Temporada
          1
        </p>
      </footer>

      <TitleModal
        openIndex={infoIndex}
        onClose={() => setInfoIndex(null)}
        onPlay={onPlay}
      />
    </main>
  );
}
