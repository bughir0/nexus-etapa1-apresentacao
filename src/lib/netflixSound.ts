/**
 * Sting cinematográfico original (arquivo em /public/sounds/tudum.mp3).
 * Não usa o áudio proprietário “tudum” da Netflix.
 */

let sharedAudio: HTMLAudioElement | null = null;
let unlocked = false;

function getAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!sharedAudio) {
    sharedAudio = new Audio("/sounds/tudum.mp3");
    sharedAudio.preload = "auto";
    sharedAudio.volume = 1;
  }
  return sharedAudio;
}

/** Precisa ser chamado no clique do usuário para liberar áudio no browser. */
export async function unlockAudio(): Promise<void> {
  const audio = getAudio();
  if (!audio) return;
  try {
    audio.muted = true;
    audio.currentTime = 0;
    await audio.play();
    audio.pause();
    audio.currentTime = 0;
    audio.muted = false;
    unlocked = true;
  } catch {
    /* autoplay bloqueado — tentará de novo no playTaDum */
  }
}

/** Toca o sting da intro. */
export async function playTaDum(): Promise<void> {
  const audio = getAudio();
  if (!audio) return;

  try {
    if (!unlocked) await unlockAudio();
    audio.pause();
    audio.currentTime = 0;
    audio.muted = false;
    audio.volume = 1;
    await audio.play();
    await new Promise<void>((resolve) => {
      const done = () => {
        audio.removeEventListener("ended", done);
        resolve();
      };
      audio.addEventListener("ended", done);
      // fallback se ended não disparar
      window.setTimeout(done, 1600);
    });
  } catch {
    /* ignore */
  }
}

/** Mantido por compatibilidade — whoosh leve via volume curto do mesmo sting. */
export async function playLogoWhoosh(): Promise<void> {
  /* intencionalmente vazio: o sting principal já cobre a intro */
}
