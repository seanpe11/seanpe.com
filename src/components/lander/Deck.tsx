import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, type ReactNode, type WheelEvent, type TouchEvent } from "react";

export type Panel = { id: string; content: ReactNode };

type DeckProps = {
  panels: Panel[];
  active: number;
  onChange: (index: number) => void;
};

const FLIP_DISTANCE = 140; // wheel pixels accumulated past a panel's edge before flipping
const ACC_RESET_MS = 500;
const WHEEL_LOCK_MS = 900;
const SWIPE_PX = 60;

/**
 * Three full-height panels side by side. A panel scrolls vertically like any
 * page; once it is at its top or bottom edge, a deliberate further push of
 * the wheel (FLIP_DISTANCE px within ACC_RESET_MS) moves sideways to the next
 * panel. Arrow keys, horizontal swipes and the tab bar always work.
 */
export const Deck = ({ panels, active, onChange }: DeckProps) => {
  const reduceMotion = useReducedMotion();
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wheelLock = useRef(false);
  const acc = useRef(0);
  const accTimer = useRef<number | undefined>(undefined);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const step = useCallback(
    (dir: 1 | -1) => {
      const next = Math.min(Math.max(active + dir, 0), panels.length - 1);
      if (next !== active) onChange(next);
    },
    [active, panels.length, onChange],
  );

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    const el = panelRefs.current[active];
    if (!el || wheelLock.current) return;
    const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const delta = horizontal ? e.deltaX : e.deltaY;
    if (delta === 0) return;
    const atTop = el.scrollTop <= 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    const canScroll = !horizontal && (delta > 0 ? !atBottom : !atTop);
    if (canScroll) {
      acc.current = 0;
      return; // the panel still has room: a normal scroll
    }
    // At an edge: accumulate until the push is deliberate, reset on direction change.
    if (Math.sign(acc.current) !== Math.sign(delta)) acc.current = 0;
    acc.current += delta;
    window.clearTimeout(accTimer.current);
    accTimer.current = window.setTimeout(() => {
      acc.current = 0;
    }, ACC_RESET_MS);
    if (Math.abs(acc.current) < FLIP_DISTANCE) return;
    acc.current = 0;
    wheelLock.current = true;
    step(delta > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLock.current = false;
    }, WHEEL_LOCK_MS);
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    touchStart.current = t ? { x: t.clientX, y: t.clientY } : null;
  };
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    const t = e.changedTouches[0];
    touchStart.current = null;
    if (!start || !t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy)) return;
    step(dx < 0 ? 1 : -1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  // A newly shown panel starts at its top; hidden panels leave the tab order.
  useEffect(() => {
    panelRefs.current.forEach((el, i) => {
      if (!el) return;
      el.toggleAttribute("inert", i !== active);
      if (i === active) el.scrollTo({ top: 0 });
    });
  }, [active]);

  return (
    <div
      className="h-full w-full overflow-hidden"
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <motion.div
        className="flex h-full"
        animate={{ x: `${-active * 100}%` }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.5 }
        }
      >
        {panels.map((p, i) => (
          <div
            key={p.id}
            id={`panel-${p.id}`}
            role="tabpanel"
            aria-hidden={i !== active}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className="h-full w-full shrink-0 overflow-y-auto overflow-x-hidden overscroll-y-contain [scrollbar-gutter:stable]"
          >
            <div className="mx-auto flex min-h-full max-w-4xl flex-col px-6 pb-10">{p.content}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
