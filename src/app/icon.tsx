import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon NEXUS — N vermelha em fundo escuro */
export default function Icon() {
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
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#E50914",
            borderRadius: 6,
            color: "#fff",
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: -1,
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
