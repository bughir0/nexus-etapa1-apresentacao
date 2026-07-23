import type { SVGProps } from "react";

export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M5 3.5v17a1 1 0 0 0 1.53.85l13.4-8.5a1 1 0 0 0 0-1.7L6.53 2.65A1 1 0 0 0 5 3.5Z" />
    </svg>
  );
}

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <path
        d="M12 5v14M5 12h14"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InfoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <circle cx={12} cy={12} r={9} strokeWidth={2} />
      <path d="M12 11v5" strokeWidth={2} strokeLinecap="round" />
      <circle cx={12} cy={7.8} r={1.15} fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <path d="M15 5 8 12l7 7" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <path d="M9 5l7 7-7 7" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <path
        d="M11 5 4 12l7 7M4 12h16"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <path d="M6 6l12 12M18 6 6 18" strokeWidth={2.2} strokeLinecap="round" />
    </svg>
  );
}

export function VolumeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <path
        d="M4 10v4h3.5L12 18V6L7.5 10H4Z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M15.5 9.5a4 4 0 0 1 0 5M18 7a7 7 0 0 1 0 10"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MuteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <path
        d="M4 10v4h3.5L12 18V6L7.5 10H4Z"
        fill="currentColor"
        stroke="none"
      />
      <path d="m16 9 5 6M21 9l-5 6" strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
}

export function FullscreenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <path
        d="M8 4H4v4M16 4h4v4M4 16v4h4M20 16v4h-4"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EpisodesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden {...props}>
      <rect x={3} y={5} width={18} height={4} rx={1} strokeWidth={1.8} />
      <rect x={3} y={11} width={18} height={4} rx={1} strokeWidth={1.8} />
      <rect x={3} y={17} width={12} height={3} rx={1} strokeWidth={1.8} />
    </svg>
  );
}
