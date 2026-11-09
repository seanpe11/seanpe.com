import { Fragment } from "react";
import { PAPERS, SHOW_PAPER_PDFS, type Paper } from "~/data/papers";
import { Section, cardClass } from "./Section";

const PaperCard = ({ paper }: { paper: Paper }) => (
  <article className={cardClass}>
    <p className="flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">
      <span>{paper.year}</span>
    </p>
    <h3 className="mt-1 text-base font-semibold leading-snug text-white">{paper.title}</h3>
    <p className="mt-1 text-sm text-zinc-400">
      {paper.authors.map((a, i) => (
        <Fragment key={a.name}>
          {i > 0 && ", "}
          {a.self ? <span className="font-semibold text-zinc-100">{a.name}</span> : a.name}
        </Fragment>
      ))}
    </p>
    <p className="mt-0.5 text-xs text-zinc-500">{paper.context}</p>
    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{paper.summary}</p>
    {paper.contribution && (
      <p className="mt-2 text-sm text-zinc-300">
        <span className="text-zinc-500">My part: </span>
        {paper.contribution}
      </p>
    )}
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {paper.tools.map((t) => (
        <li
          key={t}
          className="rounded-none border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.7rem] text-zinc-300"
        >
          {t}
        </li>
      ))}
    </ul>
    {SHOW_PAPER_PDFS && paper.pdf && (
      <div className="mt-3 text-sm">
        <a href={paper.pdf} className="text-[#33ccff] transition-colors hover:text-white">
          PDF →
        </a>
      </div>
    )}
  </article>
);

export const Papers = () => (
  <Section title="Papers" blurb="Group papers from De La Salle University. My name is in bold.">
    <div className="flex flex-col gap-4">
      {PAPERS.map((p) => (
        <PaperCard key={p.slug} paper={p} />
      ))}
    </div>
  </Section>
);
