const STORAGE_KEY = "nexus-watch-progress-v1";

export type WatchProgress = Record<number, number>; // slideIndex → 0..1

export function loadProgress(): WatchProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as WatchProgress;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveProgress(progress: WatchProgress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    /* ignore quota */
  }
}

export function setEpisodeProgress(index: number, value: number) {
  const all = loadProgress();
  all[index] = Math.max(0, Math.min(1, value));
  saveProgress(all);
  return all;
}

/** Marca episódio como ~visto ao avançar / sair */
export function markEpisodeSeen(index: number, ratio = 0.85) {
  return setEpisodeProgress(index, ratio);
}

export function continueIndices(progress: WatchProgress): number[] {
  return Object.entries(progress)
    .map(([k, v]) => ({ i: Number(k), v }))
    .filter((x) => x.v > 0.05 && x.v < 0.98)
    .sort((a, b) => b.v - a.v)
    .map((x) => x.i);
}
