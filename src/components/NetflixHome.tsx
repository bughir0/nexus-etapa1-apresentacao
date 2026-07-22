"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { rows, slides } from "@/data/slides";
import type { Profile } from "@/data/profiles";
import { Row } from "@/components/Row";
import { PlayIcon, InfoIcon } from "@/components/icons";

const ease = [0.22, 1, 0.36, 1] as const;
const navItems = ["Início", "Etapa 1", "Sobre"];

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
        <span className="select-none font-[family-name:var(--font-display)] text-2xl font-black tracking-tight text-nfxred md:text-3xl">
          NEXUS
        </span>
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

function Billboard({ onPlay }: { onPlay: (index: number) => void }) {
  const hero = slides[0];

  return (
    <section className="relative h-[78vh] min-h-[520px] w-full">
      <div className="absolute inset-0">
        <Image
          src={hero.image?.src ?? hero.card.src}
          alt={hero.image?.alt ?? hero.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradientes de billboard: escurece para baixo e para a esquerda */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-nfxbg via-nfxbg/20 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full max-w-2xl flex-col justify-end px-4 pb-24 md:px-12 md:pb-28">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-4 inline-flex w-fit items-center gap-2 rounded bg-nfxred px-2.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white"
        >
          Etapa 1
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
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
          <span className="text-mint">2026</span>
          <span className="text-white/40">·</span>
          <span>Consultoria Administrativa</span>
          <span className="text-white/40">·</span>
          <span>Gestão de Pessoas</span>
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
            className="inline-flex items-center gap-2 rounded bg-white px-6 py-2.5 text-base font-bold text-black transition hover:bg-white/80"
          >
            <PlayIcon className="h-5 w-5 translate-x-px" />
            Apresentar
          </button>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("rows")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 rounded bg-white/20 px-6 py-2.5 text-base font-bold text-white backdrop-blur transition hover:bg-white/30"
          >
            <InfoIcon className="h-5 w-5" />
            Mais informações
          </button>
        </motion.div>
      </div>
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
  return (
    <main className="min-h-dvh w-full bg-nfxbg pb-16 text-white">
      <Navbar profile={profile} onSwitchProfile={onSwitchProfile} />
      <Billboard onPlay={onPlay} />

      <div id="rows" className="relative z-10 -mt-16 space-y-4 md:-mt-24 md:space-y-6">
        {rows.map((row) => (
          <Row
            key={row.title}
            title={row.title}
            slideIndices={row.slideIndices}
            onPlay={onPlay}
          />
        ))}
      </div>

      <footer className="mt-10 px-4 text-center text-xs text-white/40 md:px-12">
        Olá, {profile.name} · Nexus Serviços & Logística · Etapa 1
      </footer>
    </main>
  );
}
