import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Ícone Apple Touch — NEXUS */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#141414",
        }}
      >
        <div
          style={{
            width: 148,
            height: 148,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#E50914",
            borderRadius: 32,
            color: "#fff",
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: -4,
            fontFamily: "Arial Black, Arial, sans-serif",
          }}
        >
          N
        </div>
      </div>
    ),
    { ...size },
  );
}
