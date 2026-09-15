import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title: string;
  blurb?: string;
  children: ReactNode;
};

/** A titled block inside a panel. */
export const Section = ({ id, title, blurb, children }: SectionProps) => (
  <section id={id} className="py-5 sm:py-6">
    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#33ccff]">
      {title}
    </h2>
    {blurb && <p className="mt-1 max-w-2xl text-sm text-zinc-400">{blurb}</p>}
    <div className="mt-4">{children}</div>
  </section>
);

export const cardClass =
  "rounded-none border border-white/10 bg-white/5 p-5 transition-colors duration-200 hover:border-white/20";
