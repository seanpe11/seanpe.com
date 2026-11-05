import { useEffect, useRef, useState } from "react";

type LazyIframeProps = {
  src: string;
  title: string;
  height: number;
  className?: string;
};

/**
 * An iframe that is not created until its box is on screen. The deck's panels
 * are clipped by `overflow: hidden`, and IntersectionObserver respects that
 * clipping, so a frame on an off-screen panel stays unmounted until the panel
 * slides in and the frame scrolls into view (the trackmap's budget rule).
 * Once mounted it stays mounted. A fixed-height placeholder holds the space.
 */
export const LazyIframe = ({ src, title, height, className = "" }: LazyIframeProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setVisible(true);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <div ref={boxRef} style={{ height }} className={`w-full bg-white/[0.03] ${className}`}>
      {visible && (
        <iframe
          src={src}
          title={title}
          width="100%"
          height={height}
          loading="lazy"
          style={{ border: 0 }}
          className="block"
        />
      )}
    </div>
  );
};
