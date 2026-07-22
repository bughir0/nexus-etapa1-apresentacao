"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NetflixHome } from "@/components/NetflixHome";
import { Presentation } from "@/components/Presentation";
import { ProfileGate } from "@/components/ProfileGate";
import type { Profile } from "@/data/profiles";

type Mode = "profiles" | "home" | "player";

export function App() {
  const [mode, setMode] = useState<Mode>("profiles");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  const selectProfile = useCallback((p: Profile) => {
    setProfile(p);
    setMode("home");
  }, []);

  const switchProfile = useCallback(() => {
    setMode("profiles");
  }, []);

  const play = useCallback((index: number) => {
    setStartIndex(index);
    setMode("player");
  }, []);

  const exit = useCallback(() => {
    setMode("home");
  }, []);

  return (
    <AnimatePresence mode="wait">
      {mode === "profiles" ? (
        <motion.div
          key="profiles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <ProfileGate onSelect={selectProfile} />
        </motion.div>
      ) : mode === "home" && profile ? (
        <motion.div
          key={`home-${profile.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <NetflixHome
            profile={profile}
            onPlay={play}
            onSwitchProfile={switchProfile}
          />
        </motion.div>
      ) : (
        <motion.div
          key="player"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Presentation startIndex={startIndex} onExit={exit} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
