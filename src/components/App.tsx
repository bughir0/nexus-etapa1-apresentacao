"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NetflixHome } from "@/components/NetflixHome";
import { NexusSplash } from "@/components/NexusSplash";
import { Presentation } from "@/components/Presentation";
import { ProfileGate } from "@/components/ProfileGate";
import { TitleIntro } from "@/components/TitleIntro";
import { unlockAudio } from "@/lib/netflixSound";
import { stopAmbient } from "@/lib/ambient";
import { slides } from "@/data/slides";
import type { Profile } from "@/data/profiles";

type Mode = "profiles" | "splash" | "home" | "intro" | "blackout" | "player";

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
    stopAmbient();
    setMode("profiles");
  }, []);

  const play = useCallback((index: number) => {
    void unlockAudio();
    stopAmbient();
    setStartIndex(index);
    setMode("intro");
  }, []);

  /** Fade to black cinematográfico antes do player */
  const introDone = useCallback(() => {
    setMode("blackout");
    window.setTimeout(() => setMode("player"), 700);
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
      ) : mode === "blackout" ? (
        <motion.div
          key="blackout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[130] bg-black"
        />
      ) : mode === "player" ? (
        <motion.div
          key="player"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
        >
          <Presentation
            startIndex={startIndex}
            onExit={exit}
            showPresenterScript={profile?.id === "gustavo"}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
