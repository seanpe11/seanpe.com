import { useEffect, useRef } from "react";
import { LAP, fmtLapTime, lapTimeNow, speedAt } from "./TrackMap";

type LapBarProps = {
  focus: boolean;
  onToggle: () => void;
};

/**
 * The strip under the panels: what lap is playing, the live readout, and the
 * switch that brings the lap map to the foreground. The readout is written
 * straight to the DOM a few times a second, so nothing re-renders.
 */
export const LapBar = ({ focus, onToggle }: LapBarProps) => {
  const readout = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 100) return; // 10 Hz is plenty for text
      last = now;
      const t = lapTimeNow();
      if (readout.current) readout.current.textContent = `${Math.round(speedAt(t))} km/h  ${fmtLapTime(t)}`;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={focus}
      className="group flex h-7 w-full shrink-0 items-center justify-between border-t border-white/5 px-3 font-mono text-[10px] uppercase tracking-wider text-zinc-500 transition-colors hover:text-zinc-300 sm:text-[11px]"
    >
      <span className="truncate">
        {LAP.circuit} · {LAP.year} {LAP.session} · {LAP.driver} {LAP.lapTime}
        <span className="ml-3 normal-case text-zinc-600 group-hover:text-[#33ccff]">
          {focus ? "✕ close" : "▲ focus lap"}
        </span>
      </span>
      <span ref={readout} className="shrink-0 normal-case tabular-nums text-[#33ccff]/70" />
    </button>
  );
};
