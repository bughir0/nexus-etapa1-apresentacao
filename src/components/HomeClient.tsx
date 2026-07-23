"use client";

import dynamic from "next/dynamic";

function BootScreen() {
  return (
    <main
      suppressHydrationWarning
      className="grid min-h-dvh place-items-center bg-[#141414] text-white"
    >
      <span
        suppressHydrationWarning
        className="select-none text-3xl font-black tracking-tight text-[#e50914] md:text-4xl"
        style={{ fontFamily: "var(--font-fraunces), serif" }}
      >
        NEXUS
      </span>
    </main>
  );
}

/** App 100% client-side — evita mismatch com extensões (Bitdefender bis_skin_checked). */
const App = dynamic(() => import("@/components/App").then((m) => m.App), {
  ssr: false,
  loading: () => <BootScreen />,
});

export function HomeClient() {
  return <App />;
}
