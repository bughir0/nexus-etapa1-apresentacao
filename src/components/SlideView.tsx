"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Slide } from "@/data/slides";

const ease = [0.22, 1, 0.36, 1] as const;

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded bg-nfxred px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
      {children}
    </span>
  );
}

function Meta({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/55">
      {children}
    </p>
  );
}

function Panel({
  title,
  items,
  body,
  tone = "default",
}: {
  title: string;
  items: string[];
  body?: string;
  tone?: "default" | "danger";
}) {
  const accent = tone === "danger" ? "text-nfxred" : "text-white";
  const bullet = tone === "danger" ? "bg-nfxred" : "bg-white/70";
  const border =
    tone === "danger" ? "border-nfxred/40" : "border-white/10";

  return (
    <div
      className={`rounded-md border ${border} bg-black/55 p-5 backdrop-blur-md transition duration-300 hover:bg-black/70`}
    >
      <h3
        className={`mb-3 text-[13px] font-bold uppercase tracking-[0.14em] ${accent}`}
      >
        {title}
      </h3>
      {body ? (
        <p className="text-base leading-relaxed text-white/80 md:text-lg">
          {body}
        </p>
      ) : null}
      {items.length > 0 ? (
        <ul className="grid gap-3">
          {items.map((item) => (
            <li
              key={item}
              className="relative pl-5 text-base leading-relaxed text-white/80 md:text-lg"
            >
              <span
                className={`absolute left-0 top-[0.55em] h-2 w-2 rounded-full ${bullet}`}
              />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function BillboardBackdrop({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="absolute inset-0">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-nfxbg via-nfxbg/40 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
    </div>
  );
}

function SidePoster({
  src,
  alt,
  tag,
}: {
  src: string;
  alt: string;
  tag: string;
}) {
  return (
    <div className="relative min-h-[240px] overflow-hidden rounded-md bg-[#222] shadow-[0_20px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10 md:min-h-[380px]">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.3, ease }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 42vw"
          className="object-cover"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <span className="absolute bottom-4 left-4 z-10 rounded bg-black/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
        {tag}
      </span>
    </div>
  );
}

function SlideBody({ slide }: { slide: Slide }) {
  if (slide.kind === "hero") {
    const img = slide.image ?? {
      src: slide.card.src,
      alt: slide.title,
      tag: slide.category,
    };

    if (slide.id === "capa") {
      return (
        <div className="relative flex h-full items-end pb-8 md:items-center md:pb-0">
          <BillboardBackdrop src={img.src} alt={img.alt} />
          <div className="relative z-10 max-w-2xl space-y-5">
            <Badge>Nexus Original · {slide.category}</Badge>
            <p className="text-lg font-semibold text-nfxred md:text-xl">
              Nexus Serviços & Logística
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] md:text-6xl lg:text-7xl">
              {slide.title}
            </h1>
            <Meta>{slide.eyebrow}</Meta>
            {slide.lead ? (
              <p className="max-w-[42ch] text-lg leading-relaxed text-white/85 md:text-xl">
                {slide.lead}
              </p>
            ) : null}
          </div>
        </div>
      );
    }

    return (
      <div className="grid h-full items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
        <div className="space-y-5">
          <Badge>{slide.category}</Badge>
          <Meta>{slide.eyebrow}</Meta>
          <h1 className="max-w-[14ch] font-[family-name:var(--font-display)] text-4xl font-black leading-[1.08] tracking-[-0.02em] text-white md:text-5xl lg:text-6xl">
            {slide.title}
          </h1>
          {slide.lead ? (
            <p className="max-w-[42ch] text-lg leading-relaxed text-white/80 md:text-xl">
              {slide.lead}
            </p>
          ) : null}
          {slide.panels ? (
            <div className="grid gap-3 pt-1 md:grid-cols-2">
              {slide.panels.map((panel) => (
                <Panel key={panel.title} {...panel} />
              ))}
            </div>
          ) : null}
        </div>
        <SidePoster {...img} />
      </div>
    );
  }

  if (slide.kind === "split" || slide.kind === "rules") {
    return (
      <div className="space-y-6">
        <Badge>{slide.category}</Badge>
        <Meta>{slide.eyebrow}</Meta>
        <h2 className="font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.02em] text-white md:text-5xl">
          {slide.title}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {slide.panels?.map((panel) => (
            <Panel key={panel.title} {...panel} />
          ))}
        </div>
      </div>
    );
  }

  if (slide.kind === "sci") {
    return (
      <div className="space-y-7">
        <Badge>{slide.category}</Badge>
        <Meta>{slide.eyebrow}</Meta>
        <h2 className="font-[family-name:var(--font-display)] text-4xl font-black text-white md:text-5xl">
          {slide.title}
        </h2>
        {slide.lead ? (
          <p className="max-w-[42ch] text-lg text-white/75 md:text-xl">
            {slide.lead}
          </p>
        ) : null}
        <div className="grid gap-4">
          {slide.sci?.map((item, i) => (
            <motion.div
              key={item.letter}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.45, ease }}
              className="grid grid-cols-[64px_1fr] items-start gap-4 rounded-md border border-white/10 bg-black/50 p-4 backdrop-blur md:grid-cols-[80px_1fr]"
            >
              <div className="grid h-14 w-14 place-items-center rounded bg-nfxred font-[family-name:var(--font-display)] text-3xl font-black text-white shadow-[0_8px_24px_rgba(229,9,20,0.35)] md:h-16 md:w-16 md:text-4xl">
                {item.letter}
              </div>
              <div>
                <p className="text-lg font-bold text-white">{item.title}</p>
                <p className="text-base text-white/75 md:text-lg">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.kind === "quotes") {
    return (
      <div className="space-y-6">
        <Badge>{slide.category}</Badge>
        <Meta>{slide.eyebrow}</Meta>
        <h2 className="font-[family-name:var(--font-display)] text-4xl font-black text-white md:text-5xl">
          {slide.title}
        </h2>
        <div className="grid gap-3">
          {slide.quotes?.map((q, i) => (
            <motion.blockquote
              key={q.letter}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.4, ease }}
              className="rounded-md border-l-4 border-nfxred bg-black/55 px-5 py-4 text-base text-white/90 backdrop-blur md:text-lg"
            >
              <span className="mr-2 font-black text-nfxred">{q.letter}</span>
              {q.text}
            </motion.blockquote>
          ))}
        </div>
      </div>
    );
  }

  if (slide.kind === "enactment") {
    const img = slide.image ?? {
      src: slide.card.src,
      alt: slide.title,
      tag: slide.category,
    };

    return (
      <div className="relative flex h-full items-end pb-4 md:items-center md:pb-0">
        <BillboardBackdrop src={img.src} alt={img.alt} />
        <div className="relative z-10 grid w-full items-center gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-xl space-y-5">
            <Badge>{slide.category}</Badge>
            <Meta>{slide.eyebrow}</Meta>
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-black text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] md:text-5xl">
              {slide.title}
            </h2>
            {slide.lead ? (
              <p className="text-lg text-white/85">{slide.lead}</p>
            ) : null}
            <ol className="grid gap-2.5">
              {slide.steps?.map((step, i) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.08, duration: 0.4, ease }}
                  className="grid grid-cols-[40px_1fr] items-center gap-3 rounded-md border border-white/10 bg-black/55 px-3 py-2.5 backdrop-blur"
                >
                  <span className="grid h-8 w-8 place-items-center rounded bg-nfxred text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-base text-white/85">{step}</p>
                </motion.li>
              ))}
            </ol>
            {slide.hint ? (
              <p className="rounded-md border border-nfxred/40 bg-nfxred/15 px-3 py-2 text-sm text-white/90">
                {slide.hint}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  if (slide.kind === "theory") {
    return (
      <div className="space-y-6">
        <Badge>{slide.category}</Badge>
        <Meta>{slide.eyebrow}</Meta>
        <h2 className="font-[family-name:var(--font-display)] text-4xl font-black text-white md:text-5xl">
          {slide.title}
        </h2>
        {slide.lead ? (
          <p className="max-w-[46ch] text-lg text-white/75">{slide.lead}</p>
        ) : null}
        <div className="rounded-md border border-white/10 bg-black/55 p-5 backdrop-blur">
          <h3 className="mb-3 text-[13px] font-bold uppercase tracking-[0.14em] text-nfxred">
            Modelo de citação
          </h3>
          <p className="text-base leading-relaxed text-white/90 md:text-lg">
            Segundo <strong className="text-white">[AUTOR]</strong>, em “
            <strong className="text-white">[TÍTULO]</strong>” (ano, p. X),
            “[trecho sobre comunicação assertiva ou escuta ativa]”.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {slide.panels?.map((panel) => (
            <Panel key={panel.title} {...panel} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <Badge>{slide.category}</Badge>
      <Meta>{slide.eyebrow}</Meta>
      {slide.finalLine ? (
        <p className="max-w-[20ch] font-[family-name:var(--font-display)] text-3xl font-black leading-snug text-white md:text-5xl">
          {slide.finalLine}
        </p>
      ) : null}
      <div className="grid max-w-xl gap-2.5">
        {slide.checklist?.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease }}
            className="flex items-center gap-3 rounded-md border border-white/10 bg-black/55 px-3.5 py-3 text-white backdrop-blur"
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-sm bg-nfxred text-xs font-bold">
              ✓
            </span>
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function SlideView({ slide }: { slide: Slide }) {
  const hasBillboard =
    slide.kind === "enactment" ||
    (slide.kind === "hero" && slide.id === "capa");

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={slide.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease }}
        className="absolute inset-0 overflow-hidden bg-nfxbg"
      >
        {!hasBillboard ? (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_0%,rgba(229,9,20,0.18),transparent_55%),linear-gradient(180deg,#141414_0%,#0b0b0b_100%)]" />
        ) : null}

        <div
          className={`relative z-10 mx-auto flex h-full w-full max-w-[1200px] flex-col justify-center px-5 pb-28 pt-20 md:px-14 md:pb-28 md:pt-24 ${
            hasBillboard ? "max-w-none px-5 md:px-14" : ""
          }`}
        >
          <SlideBody slide={slide} />
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
