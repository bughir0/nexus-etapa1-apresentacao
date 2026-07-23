"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { Badge, FadeIn, Meta, Panel, ease } from "@/components/ui";

function BillboardBackdrop({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0">
      <motion.div
        initial={{ scale: 1.08, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease }}
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
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease }}
      className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-lg bg-[#1a1a1a] shadow-[0_24px_64px_rgba(0,0,0,0.55)] ring-1 ring-white/10 md:aspect-auto md:min-h-[360px] md:max-w-none"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 900px) 100vw, 40vw"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
      <span className="absolute bottom-4 left-4 z-10 rounded bg-black/65 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
        {tag}
      </span>
    </motion.div>
  );
}

function SlideShell({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`relative z-10 mx-auto flex h-full w-full flex-col justify-center ${
        wide ? "max-w-[1400px]" : "max-w-[1100px]"
      } px-5 py-28 md:px-12 md:py-32 lg:px-16`}
    >
      {children}
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
        <div className="relative h-full">
          <BillboardBackdrop src={img.src} alt={img.alt} />
          <SlideShell wide>
            <div className="max-w-xl space-y-4 md:space-y-5">
              <FadeIn>
                <Badge>Nexus Original</Badge>
              </FadeIn>
              <FadeIn delay={0.08}>
                <p className="text-sm font-semibold text-nfxred md:text-base">
                  Nexus Serviços & Logística
                </p>
              </FadeIn>
              <FadeIn delay={0.14}>
                <h1 className="font-[family-name:var(--font-display)] text-[2.5rem] font-black leading-[1.05] tracking-[-0.03em] text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.7)] md:text-6xl lg:text-7xl">
                  {slide.title}
                </h1>
              </FadeIn>
              <FadeIn delay={0.22}>
                <Meta>{slide.eyebrow}</Meta>
              </FadeIn>
              {slide.lead ? (
                <FadeIn delay={0.28}>
                  <p className="max-w-[40ch] text-base leading-relaxed text-white/80 md:text-lg">
                    {slide.lead}
                  </p>
                </FadeIn>
              ) : null}
              <FadeIn delay={0.36}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-sm font-semibold text-white/65">
                  <span className="text-mint">98% match</span>
                  <span className="text-white/25">·</span>
                  <span className="rounded border border-white/25 px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
                    T1
                  </span>
                  <span>9 episódios</span>
                  <span className="text-white/25">·</span>
                  <span>HD</span>
                </div>
              </FadeIn>
            </div>
          </SlideShell>
        </div>
      );
    }

    return (
      <SlideShell>
        <div className="grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-12">
          <div className="space-y-4 md:space-y-5">
            <FadeIn>
              <Badge>{slide.category}</Badge>
            </FadeIn>
            <FadeIn delay={0.06}>
              <Meta>{slide.eyebrow}</Meta>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h1 className="max-w-[14ch] font-[family-name:var(--font-display)] text-4xl font-black leading-[1.08] tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
            </FadeIn>
            {slide.lead ? (
              <FadeIn delay={0.18}>
                <p className="max-w-[40ch] text-base leading-relaxed text-white/75 md:text-lg">
                  {slide.lead}
                </p>
              </FadeIn>
            ) : null}
            {slide.panels ? (
              <div className="grid gap-3 pt-1 sm:grid-cols-2">
                {slide.panels.map((panel, i) => (
                  <FadeIn key={panel.title} delay={0.26 + i * 0.08}>
                    <Panel {...panel} />
                  </FadeIn>
                ))}
              </div>
            ) : null}
          </div>
          <SidePoster {...img} />
        </div>
      </SlideShell>
    );
  }

  if (slide.kind === "split" || slide.kind === "rules") {
    return (
      <SlideShell>
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-3">
            <FadeIn>
              <Badge>{slide.category}</Badge>
            </FadeIn>
            <FadeIn delay={0.06}>
              <Meta>{slide.eyebrow}</Meta>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h2 className="max-w-[18ch] font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.03em] text-white md:text-5xl">
                {slide.title}
              </h2>
            </FadeIn>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {slide.panels?.map((panel, i) => (
              <FadeIn key={panel.title} delay={0.2 + i * 0.1}>
                <Panel {...panel} />
              </FadeIn>
            ))}
          </div>
        </div>
      </SlideShell>
    );
  }

  if (slide.kind === "sci") {
    return (
      <SlideShell>
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-3">
            <FadeIn>
              <Badge>{slide.category}</Badge>
            </FadeIn>
            <FadeIn delay={0.06}>
              <Meta>{slide.eyebrow}</Meta>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.03em] text-white md:text-5xl">
                {slide.title}
              </h2>
            </FadeIn>
            {slide.lead ? (
              <FadeIn delay={0.18}>
                <p className="max-w-[42ch] text-base text-white/70 md:text-lg">
                  {slide.lead}
                </p>
              </FadeIn>
            ) : null}
          </div>
          <div className="grid gap-3">
            {slide.sci?.map((item, i) => (
              <motion.div
                key={item.letter}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.22 + i * 0.1, duration: 0.45, ease }}
                className="grid grid-cols-[56px_1fr] items-center gap-4 rounded-lg bg-white/[0.06] p-4 ring-1 ring-inset ring-white/10 md:grid-cols-[72px_1fr] md:gap-5 md:p-5"
              >
                <div className="grid h-14 w-14 place-items-center rounded-md bg-nfxred font-[family-name:var(--font-display)] text-3xl font-black text-white md:h-16 md:w-16 md:text-4xl">
                  {item.letter}
                </div>
                <div className="min-w-0">
                  <p className="text-base font-bold text-white md:text-lg">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[15px] leading-relaxed text-white/70 md:text-base">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SlideShell>
    );
  }

  if (slide.kind === "quotes") {
    return (
      <SlideShell>
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-3">
            <FadeIn>
              <Badge>{slide.category}</Badge>
            </FadeIn>
            <FadeIn delay={0.06}>
              <Meta>{slide.eyebrow}</Meta>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.03em] text-white md:text-5xl">
                {slide.title}
              </h2>
            </FadeIn>
          </div>
          <div className="grid gap-3">
            {slide.quotes?.map((q, i) => (
              <motion.blockquote
                key={q.letter}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.1, duration: 0.4, ease }}
                className="rounded-r-lg border-l-[3px] border-nfxred bg-white/[0.05] px-5 py-4 text-[15px] leading-relaxed text-white/85 md:text-lg"
              >
                <span className="mr-2 font-black text-nfxred">{q.letter}</span>
                {q.text}
              </motion.blockquote>
            ))}
          </div>
        </div>
      </SlideShell>
    );
  }

  if (slide.kind === "enactment") {
    const img = slide.image ?? {
      src: slide.card.src,
      alt: slide.title,
      tag: slide.category,
    };

    return (
      <div className="relative h-full">
        <BillboardBackdrop src={img.src} alt={img.alt} />
        <SlideShell wide>
          <div className="max-w-2xl space-y-5 md:space-y-6">
            <div className="space-y-3">
              <FadeIn>
                <Badge>{slide.category}</Badge>
              </FadeIn>
              <FadeIn delay={0.06}>
                <Meta>{slide.eyebrow}</Meta>
              </FadeIn>
              <FadeIn delay={0.12}>
                <h2 className="font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.03em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.75)] md:text-5xl lg:text-6xl">
                  {slide.title}
                </h2>
              </FadeIn>
              {slide.lead ? (
                <FadeIn delay={0.18}>
                  <p className="max-w-[42ch] text-base text-white/80 md:text-lg">
                    {slide.lead}
                  </p>
                </FadeIn>
              ) : null}
            </div>

            <ol className="grid gap-2">
              {slide.steps?.map((step, i) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.24 + i * 0.08, duration: 0.4, ease }}
                  className="grid grid-cols-[36px_1fr] items-center gap-3 rounded-lg bg-black/45 px-3 py-2.5 ring-1 ring-inset ring-white/10 backdrop-blur-md md:grid-cols-[40px_1fr] md:gap-3.5 md:px-4 md:py-3"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-nfxred text-sm font-bold md:h-9 md:w-9">
                    {i + 1}
                  </span>
                  <p className="text-[15px] leading-snug text-white/90 md:text-base">
                    {step}
                  </p>
                </motion.li>
              ))}
            </ol>

            {slide.hint ? (
              <FadeIn delay={0.6}>
                <p className="rounded-lg border border-nfxred/35 bg-nfxred/10 px-4 py-3 text-sm leading-relaxed text-white/90">
                  <span className="font-bold text-nfxred">Não fazer: </span>
                  {slide.hint.replace(/^Não fazer:\s*/i, "")}
                </p>
              </FadeIn>
            ) : null}
          </div>
        </SlideShell>
      </div>
    );
  }

  if (slide.kind === "theory") {
    return (
      <SlideShell>
        <div className="space-y-5 md:space-y-7">
          <div className="space-y-3">
            <FadeIn>
              <Badge>{slide.category}</Badge>
            </FadeIn>
            <FadeIn delay={0.06}>
              <Meta>{slide.eyebrow}</Meta>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-black tracking-[-0.03em] text-white md:text-5xl">
                {slide.title}
              </h2>
            </FadeIn>
            {slide.lead ? (
              <FadeIn delay={0.18}>
                <p className="max-w-[46ch] text-base text-white/70 md:text-lg">
                  {slide.lead}
                </p>
              </FadeIn>
            ) : null}
          </div>

          {slide.citation ? (
            <FadeIn delay={0.24}>
              <blockquote className="rounded-lg border-l-[3px] border-nfxred bg-white/[0.06] p-5 ring-1 ring-inset ring-white/10 md:p-6">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-nfxred">
                  Citação · {slide.citation.theme ?? "Livro"}
                </p>
                <p className="text-[15px] leading-relaxed text-white/90 md:text-base">
                  “{slide.citation.text}”
                </p>
              </blockquote>
            </FadeIn>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            {slide.panels?.map((panel, i) => (
              <FadeIn key={panel.title} delay={0.32 + i * 0.08}>
                <Panel {...panel} />
              </FadeIn>
            ))}
          </div>
        </div>
      </SlideShell>
    );
  }

  return (
    <SlideShell>
      <div className="space-y-6 md:space-y-8">
        <div className="space-y-3">
          <FadeIn>
            <Badge>{slide.category}</Badge>
          </FadeIn>
          <FadeIn delay={0.06}>
            <Meta>{slide.eyebrow}</Meta>
          </FadeIn>
        </div>
        {slide.finalLine ? (
          <FadeIn delay={0.14}>
            <p className="max-w-[18ch] font-[family-name:var(--font-display)] text-3xl font-black leading-[1.15] tracking-[-0.02em] text-white md:text-5xl">
              {slide.finalLine}
            </p>
          </FadeIn>
        ) : null}
        <div className="grid max-w-lg gap-2.5">
          {slide.checklist?.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 + i * 0.08, duration: 0.4, ease }}
              className="flex items-center gap-3 rounded-lg bg-white/[0.06] px-4 py-3 ring-1 ring-inset ring-white/10"
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded bg-nfxred text-xs font-bold">
                ✓
              </span>
              <span className="text-[15px] text-white/90 md:text-base">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 40 : dir < 0 ? -40 : 0,
    scale: 1.02,
  }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -28 : dir < 0 ? 28 : 0,
    scale: 0.99,
  }),
};

export function SlideView({
  slide,
  direction = 0,
}: {
  slide: Slide;
  direction?: number;
}) {
  const hasBillboard =
    slide.kind === "enactment" ||
    (slide.kind === "hero" && slide.id === "capa");

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.section
        key={slide.id}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.45, ease }}
        className="absolute inset-0 overflow-hidden bg-nfxbg"
      >
        {!hasBillboard ? (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_75%_-5%,rgba(229,9,20,0.14),transparent_55%),linear-gradient(180deg,#141414_0%,#0a0a0a_100%)]" />
        ) : null}
        <SlideBody slide={slide} />
      </motion.section>
    </AnimatePresence>
  );
}
