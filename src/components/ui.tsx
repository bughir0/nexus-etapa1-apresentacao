"use client";

import { motion } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded bg-nfxred px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
      {children}
    </span>
  );
}

export function Meta({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50 md:text-xs">
      {children}
    </p>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Panel({
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
  const bullet = tone === "danger" ? "bg-nfxred" : "bg-white/60";

  return (
    <div className="rounded-lg bg-white/[0.06] p-5 ring-1 ring-inset ring-white/10 backdrop-blur-md md:p-6">
      <h3
        className={`mb-3.5 text-[11px] font-bold uppercase tracking-[0.18em] ${accent}`}
      >
        {title}
      </h3>
      {body ? (
        <p className="text-[15px] leading-relaxed text-white/75 md:text-base">
          {body}
        </p>
      ) : null}
      {items.length > 0 ? (
        <ul className="grid gap-2.5">
          {items.map((item) => (
            <li
              key={item}
              className="relative pl-4 text-[15px] leading-relaxed text-white/80 md:text-base"
            >
              <span
                className={`absolute left-0 top-[0.55em] h-1.5 w-1.5 rounded-full ${bullet}`}
              />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
