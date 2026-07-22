/**
 * Som cinematográfico estilo “ta-dum” (síntese própria via Web Audio API).
 * Não usa o áudio proprietário da Netflix.
 */

let sharedCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  if (!sharedCtx || sharedCtx.state === "closed") {
    sharedCtx = new AC();
  }
  return sharedCtx;
}

function hit(
  ctx: AudioContext,
  time: number,
  {
    freq,
    dur,
    gain,
    type = "sine",
  }: { freq: number; dur: number; gain: number; type?: OscillatorType },
) {
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, time);
  osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.35), time + dur);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(800, time);
  filter.frequency.exponentialRampToValueAtTime(120, time + dur);

  amp.gain.setValueAtTime(0.0001, time);
  amp.gain.exponentialRampToValueAtTime(gain, time + 0.012);
  amp.gain.exponentialRampToValueAtTime(0.0001, time + dur);

  osc.connect(filter);
  filter.connect(amp);
  amp.connect(ctx.destination);

  osc.start(time);
  osc.stop(time + dur + 0.02);
}

function rumble(ctx: AudioContext, time: number, dur: number, gain: number) {
  const length = Math.floor(ctx.sampleRate * dur);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  }

  const src = ctx.createBufferSource();
  src.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 90;

  const amp = ctx.createGain();
  amp.gain.setValueAtTime(0.0001, time);
  amp.gain.exponentialRampToValueAtTime(gain, time + 0.02);
  amp.gain.exponentialRampToValueAtTime(0.0001, time + dur);

  src.connect(filter);
  filter.connect(amp);
  amp.connect(ctx.destination);
  src.start(time);
  src.stop(time + dur);
}

/** Desbloqueia o AudioContext no clique do usuário (obrigatório nos browsers). */
export async function unlockAudio(): Promise<void> {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      /* ignore */
    }
  }
}

/** Toca o “ta-dum” cinematográfico. Retorna Promise quando terminar. */
export async function playTaDum(): Promise<void> {
  const ctx = getCtx();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      return;
    }
  }

  const t = ctx.currentTime + 0.02;

  // Primeiro golpe (TA)
  hit(ctx, t, { freq: 95, dur: 0.45, gain: 0.85, type: "triangle" });
  hit(ctx, t, { freq: 55, dur: 0.55, gain: 0.55, type: "sine" });
  rumble(ctx, t, 0.5, 0.35);

  // Segundo golpe (DUM) — ~220ms depois
  const t2 = t + 0.22;
  hit(ctx, t2, { freq: 70, dur: 0.7, gain: 0.95, type: "triangle" });
  hit(ctx, t2, { freq: 42, dur: 0.9, gain: 0.7, type: "sine" });
  rumble(ctx, t2, 0.85, 0.45);

  await new Promise((r) => setTimeout(r, 1100));
}

/** Whoosh curto para o splash da logo. */
export async function playLogoWhoosh(): Promise<void> {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      return;
    }
  }

  const t = ctx.currentTime + 0.01;
  const length = Math.floor(ctx.sampleRate * 0.45);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.sin((i / length) * Math.PI);
  }

  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(400, t);
  filter.frequency.exponentialRampToValueAtTime(2200, t + 0.35);
  filter.Q.value = 0.7;

  const amp = ctx.createGain();
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(0.28, t + 0.05);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);

  src.connect(filter);
  filter.connect(amp);
  amp.connect(ctx.destination);
  src.start(t);
  src.stop(t + 0.45);
}
