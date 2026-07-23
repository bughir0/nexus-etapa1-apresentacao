"use client";

import { useState } from "react";
import type { Profile } from "@/data/profiles";
import { withBasePath } from "@/lib/basePath";

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
  // next/image com unoptimized NÃO prefixa basePath — usar path absoluto do Pages.
  const photoSrc = profile.photo ? withBasePath(profile.photo) : undefined;

  const box =
    size === "sm"
      ? "h-8 w-8 text-xs"
      : "aspect-square w-full text-3xl md:text-5xl";

  return (
    <span
      className={`relative grid place-items-center overflow-hidden rounded-md font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.4)] ${box} ${className}`}
      style={showPhoto ? undefined : { background: profile.avatar }}
    >
      {showPhoto && photoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export + GitHub Pages basePath
        <img
          src={photoSrc}
          alt={profile.name}
          className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
          onError={() => setFailed(true)}
        />
      ) : (
        profile.initials
      )}
    </span>
  );
}
