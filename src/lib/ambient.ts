/**
 * Ambientação suave para o billboard (drone baixo).
 * Desliga com mute.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let nodes: OscillatorNode[] = [];
let playing = false;

function getCtx() {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  if (!ctx || ctx.state === "closed") ctx = new AC();
  return ctx;
}

export async function startAmbient(volume = 0.045) {
  const audio = getCtx();
  if (!audio || playing) return;
  if (audio.state === "suspended") {
    try {
      await audio.resume();
    } catch {
      return;
    }
  }

  master = audio.createGain();
  master.gain.value = 0;
  master.connect(audio.destination);

  const freqs = [55, 82.5, 110];
  nodes = freqs.map((f, i) => {
    const osc = audio.createOscillator();
    const g = audio.createGain();
    osc.type = i === 0 ? "sine" : "triangle";
    osc.frequency.value = f;
    g.gain.value = i === 0 ? 0.55 : 0.22;
    osc.connect(g);
    g.connect(master!);
    osc.start();
    return osc;
  });

  const now = audio.currentTime;
  master.gain.linearRampToValueAtTime(volume, now + 1.2);
  playing = true;
}

export function setAmbientMuted(muted: boolean) {
  if (!master || !ctx) return;
  const now = ctx.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.linearRampToValueAtTime(muted ? 0 : 0.045, now + 0.35);
}

export function stopAmbient() {
  if (!playing) return;
  const audio = ctx;
  if (audio && master) {
    const now = audio.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.linearRampToValueAtTime(0, now + 0.4);
  }
  window.setTimeout(() => {
    nodes.forEach((n) => {
      try {
        n.stop();
        n.disconnect();
      } catch {
        /* */
      }
    });
    nodes = [];
    master?.disconnect();
    master = null;
    playing = false;
  }, 500);
}
