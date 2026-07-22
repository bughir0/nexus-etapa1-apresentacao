"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NetflixHome } from "@/components/NetflixHome";
import { NexusSplash } from "@/components/NexusSplash";
import { Presentation } from "@/components/Presentation";
import { ProfileGate } from "@/components/ProfileGate";
import { TitleIntro } from "@/components/TitleIntro";
import { unlockAudio } from "@/lib/netflixSound";
import { slides } from "@/data/slides";
import type { Profile } from "@/data/profiles";

type Mode = "profiles" | "splash" | "home" | "intro" | "player";

export function App() {
  const [mode, setMode] = useState<Mode>("profiles");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  const selectProfile = useCallback((p: Profile) => {
    void unlockAudio();
    setProfile(p);
    setMode("splash");
  }, []);

  const splashDone = useCallback(() => {
    setMode("home");
  }, []);

  const switchProfile = useCallback(() => {
    setMode("profiles");
  }, []);

  /** Abre a intro cinematográfica + som antes do player */
  const play = useCallback((index: number) => {
    void unlockAudio();
    setStartIndex(index);
    setMode("intro");
  }, []);

  const introDone = useCallback(() => {
    setMode("player");
  }, []);

  const exit = useCallback(() => {
    setMode(profile ? "home" : "profiles");
  }, [profile]);

  const introSlide = slides[startIndex] ?? slides[0];

  return (
    <AnimatePresence mode="wait">
      {mode === "profiles" ? (
        <motion.div
          key="profiles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ProfileGate onSelect={selectProfile} />
        </motion.div>
      ) : mode === "splash" ? (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <NexusSplash onDone={splashDone} />
        </motion.div>
      ) : mode === "home" && profile ? (
        <motion.div
          key={`home-${profile.id}`}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NetflixHome
            profile={profile}
            onPlay={play}
            onSwitchProfile={switchProfile}
          />
        </motion.div>
      ) : mode === "intro" ? (
        <motion.div
          key={`intro-${startIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TitleIntro
            title="Comunicação Interna e Feedback"
            episodeLabel={`T1 · E${String(startIndex + 1).padStart(2, "0")} · ${introSlide.title}`}
            onDone={introDone}
          />
        </motion.div>
      ) : mode === "player" ? (
        <motion.div
          key="player"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Presentation startIndex={startIndex} onExit={exit} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
