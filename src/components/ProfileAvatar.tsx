"use client";

import Image from "next/image";
import { useState } from "react";
import type { Profile } from "@/data/profiles";

export function ProfileAvatar({
  profile,
  size = "lg",
  className = "",
}: {
  profile: Profile;
  size?: "sm" | "lg";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(profile.photo) && !failed;

  const box =
    size === "sm"
      ? "h-8 w-8 text-xs"
      : "aspect-square w-full text-3xl md:text-5xl";

  return (
    <span
      className={`relative grid place-items-center overflow-hidden rounded-md font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.4)] ${box} ${className}`}
      style={showPhoto ? undefined : { background: profile.avatar }}
    >
      {showPhoto && profile.photo ? (
        <Image
          src={profile.photo}
          alt={profile.name}
          fill
          sizes={size === "sm" ? "32px" : "140px"}
          className="object-cover object-[center_20%]"
          onError={() => setFailed(true)}
        />
      ) : (
        profile.initials
      )}
    </span>
  );
}
