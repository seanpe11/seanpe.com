import { useEffect, useRef } from "react";
import lap from "~/data/lap.json";

type LapData = {
  circuit: string;
  location: string;
  year: number;
  session: string;
  driver: string;
  driverName: string;
  team: string;
  teamColour: string;
  lapTime: string;
  lapSeconds: number;
  points: [number, number, number][]; // x, y, seconds into the lap
  speed: [number, number][]; // seconds into the lap, km/h
  track: [number, number][] | null; // circuit centreline, same frame as points
  corners: { n: number; x: number; y: number; angle: number }[];
};

export const LAP = lap as unknown as LapData;
const ACCENT = "#33ccff";
const TAIL_SECONDS = 6;
const TRACK_WIDTH_UNITS = 150; // ~15 m of tarmac, in the feed's 0.1 m units

/** One shared lap clock so the map, the bar and any focus view agree on where the car is. */
let clockOrigin: number | null = null;
export const lapTimeNow = () => {
  if (clockOrigin === null) clockOrigin = performance.now();
  return ((performance.now() - clockOrigin) / 1000) % LAP.lapSeconds;
};

function interp(samples: readonly (readonly number[])[], t: number, ti: number, vi: number[]): number[] {
  let lo = 0;
  let hi = samples.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (samples[mid]![ti]! <= t) lo = mid;
    else hi = mid;
  }
  const a = samples[lo]!;
  const b = samples[hi]!;
  const span = b[ti]! - a[ti]! || 1;
  const k = Math.min(Math.max((t - a[ti]!) / span, 0), 1);
  return vi.map((i) => a[i]! + (b[i]! - a[i]!) * k);
}

/** Position on the lap at time t. */
export const positionAt = (t: number) => interp(LAP.points, t, 2, [0, 1]) as [number, number];
/** Speed in km/h at time t. */
export const speedAt = (t: number) => (LAP.speed.length ? interp(LAP.speed, t, 0, [1])[0]! : 0);

export const fmtLapTime = (t: number) => {
  const m = Math.floor(t / 60);
  const s = t - m * 60;
  return `${m}:${s.toFixed(1).padStart(4, "0")}`;
};

export type TrackMapVariant = "background" | "focus" | "inline";

type TrackMapProps = {
  className?: string;
  /** "background": faint, behind the page. "focus": bright, speed-coloured line, in front. "inline": a widget. */
  variant?: TrackMapVariant;
};

/**
 * A replay of one qualifying lap: the driver's own line traced from telemetry,
 * corner numbers, and a dot lapping it in real time with its speed alongside.
 * The static layer renders once to an offscreen canvas; each frame only blits
 * that and draws the car, so it is cheap enough for phones.
 */
export const TrackMap = ({ className = "", variant = "inline" }: TrackMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bg = variant === "background";
    const focus = variant === "focus";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches; // phones: half the frame rate
    const pts = LAP.points;
    const ref = LAP.track ?? pts.map((p) => [p[0], p[1]] as [number, number]);
    const minX = Math.min(...ref.map((p) => p[0]));
    const maxX = Math.max(...ref.map((p) => p[0]));
    const minY = Math.min(...ref.map((p) => p[1]));
    const maxY = Math.max(...ref.map((p) => p[1]));
    const speeds = LAP.speed.map((s) => s[1]);
    const vMin = speeds.length ? Math.min(...speeds) : 0;
    const vMax = speeds.length ? Math.max(...speeds) : 1;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let scale = 1;
    let offX = 0;
    let offY = 0;
    let rot = false; // portrait viewport + landscape track: turn the map 90° to use the height
    const layer = document.createElement("canvas");
    const lctx = layer.getContext("2d");
    if (!lctx) return;

    // feed y grows northwards; canvas y grows downwards
    const project = (x: number, y: number): [number, number] =>
      rot
        ? [offX + (maxY - y) * scale, offY + (x - minX) * scale]
        : [offX + (x - minX) * scale, offY + (maxY - y) * scale];

    /** Focus-view line colour: single hue, brightness and alpha rise with speed. */
    const speedColour = (v: number) => {
      const k = (v - vMin) / (vMax - vMin || 1);
      const r = Math.round(51 + (255 - 51) * k * 0.6);
      const g = Math.round(204 + (255 - 204) * k * 0.6);
      return `rgba(${r},${g},255,${0.3 + 0.65 * k})`;
    };

    const paintStatic = () => {
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lctx.clearRect(0, 0, width, height);
      lctx.lineJoin = "round";
      lctx.lineCap = "round";
      if (focus && LAP.track) {
        // tarmac band under the line, only when there is room to read it
        lctx.beginPath();
        LAP.track.forEach((p, i) => {
          const [x, y] = project(p[0], p[1]);
          if (i === 0) lctx.moveTo(x, y);
          else lctx.lineTo(x, y);
        });
        lctx.closePath();
        lctx.lineWidth = Math.max(6, TRACK_WIDTH_UNITS * scale);
        lctx.strokeStyle = "rgba(255,255,255,0.07)";
        lctx.stroke();
      }
      if (focus) {
        // the racing line coloured by speed, one short stroke per sample
        lctx.lineWidth = 3;
        for (let i = 0; i < pts.length; i++) {
          const a = pts[i]!;
          const b = pts[(i + 1) % pts.length]!;
          const [ax, ay] = project(a[0], a[1]);
          const [bx, by] = project(b[0], b[1]);
          lctx.beginPath();
          lctx.moveTo(ax, ay);
          lctx.lineTo(bx, by);
          lctx.strokeStyle = speedColour(speedAt(a[2]));
          lctx.stroke();
        }
      } else {
        // the original look: the line as a faint outline
        lctx.beginPath();
        pts.forEach((p, i) => {
          const [x, y] = project(p[0], p[1]);
          if (i === 0) lctx.moveTo(x, y);
          else lctx.lineTo(x, y);
        });
        lctx.closePath();
        lctx.lineWidth = bg ? 3 : 2;
        lctx.strokeStyle = bg ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.16)";
        lctx.stroke();
      }
      // start / finish tick
      const [sx, sy] = project(pts[0]![0], pts[0]![1]);
      lctx.fillStyle = focus ? "rgba(255,255,255,0.7)" : bg ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.45)";
      lctx.fillRect(sx - 1.5, sy - 7, 3, 14);
      // corner numbers, pushed outward along the circuit's label angle
      lctx.font = `${focus ? 11 : 9}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      lctx.textAlign = "center";
      lctx.textBaseline = "middle";
      lctx.fillStyle = focus ? "rgba(212,212,216,0.85)" : bg ? "rgba(161,161,170,0.2)" : "rgba(161,161,170,0.7)";
      const push = Math.max(10, TRACK_WIDTH_UNITS * scale * 0.5 + 8) / scale; // in track units, so rotation applies
      for (const c of LAP.corners) {
        const a = (c.angle * Math.PI) / 180;
        const [lx, ly] = project(c.x + Math.cos(a) * push, c.y + Math.sin(a) * push);
        lctx.fillText(String(c.n), lx, ly);
      }
    };

    const layout = () => {
      dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2); // phones: cheaper blits
      width = parent.clientWidth;
      height = parent.clientHeight;
      for (const c of [canvas, layer]) {
        c.width = Math.round(width * dpr);
        c.height = Math.round(height * dpr);
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const pad = focus ? Math.max(40, Math.min(width, height) * 0.1) : bg ? Math.max(24, Math.min(width, height) * 0.08) : 18;
      const trackW = maxX - minX;
      const trackH = maxY - minY;
      rot = height > width !== trackH > trackW; // viewport and track disagree on orientation
      const w = rot ? trackH : trackW;
      const h = rot ? trackW : trackH;
      scale = Math.min((width - pad * 2) / w, (height - pad * 2) / h);
      offX = (width - w * scale) / 2;
      offY = (height - h * scale) / 2;
      paintStatic();
    };

    const frame = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(layer, 0, 0, width, height);
      // trailing tail
      ctx.beginPath();
      const tailStart = Math.max(0, t - TAIL_SECONDS);
      const steps = 24;
      for (let i = 0; i <= steps; i++) {
        const [x, y] = project(...positionAt(tailStart + ((t - tailStart) * i) / steps));
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      // In the background the car goes grey and quiet so text stays readable over it;
      // the colour and the speed label are for the focus view.
      ctx.lineWidth = focus ? 4 : bg ? 3 : 2.5;
      ctx.lineCap = "round";
      ctx.strokeStyle = focus ? "rgba(51,204,255,0.7)" : bg ? "rgba(255,255,255,0.16)" : "rgba(51,204,255,0.6)";
      ctx.stroke();
      // the car
      const [cx, cy] = project(...positionAt(t));
      ctx.beginPath();
      ctx.arc(cx, cy, focus ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = bg ? "rgba(255,255,255,0.4)" : ACCENT;
      if (!coarse && !bg) {
        // the glow is the most expensive canvas op; skip it on phones
        ctx.shadowColor = ACCENT;
        ctx.shadowBlur = focus ? 18 : 10;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
      if (bg) return;
      // speed, riding alongside the car
      ctx.font = `${focus ? 13 : 11}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "middle";
      ctx.textAlign = cx > width / 2 ? "right" : "left";
      ctx.fillStyle = focus ? "rgba(255,255,255,0.95)" : ACCENT;
      ctx.fillText(`${Math.round(speedAt(t))} km/h`, cx + (cx > width / 2 ? -12 : 12), cy - 10);
    };

    layout();
    frame(lapTimeNow()); // paint immediately; the loop below takes over once frames tick
    let raf = 0;
    let odd = false;
    if (!reduceMotion) {
      const loop = () => {
        raf = requestAnimationFrame(loop);
        odd = !odd;
        if (coarse && odd) return; // ~30 fps on touch devices
        frame(lapTimeNow());
      };
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      layout();
      frame(lapTimeNow());
    });
    ro.observe(parent);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [variant]);

  return (
    <div
      className={`relative ${className}`}
      aria-label={`${LAP.driverName}'s ${LAP.lapTime} pole lap at ${LAP.circuit}, ${LAP.year}, replayed in real time`}
      role="img"
    >
      <canvas ref={canvasRef} className="fade-in delay-4 absolute inset-0" />
    </div>
  );
};
