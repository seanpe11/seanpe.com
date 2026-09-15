import { CERTIFICATIONS, EDUCATION } from "~/data/experience";
import { PROFILE } from "~/data/profile";
import { Skills } from "~/components/Skills";
import { Section, cardClass } from "./Section";

export const About = () => (
  <>
    <Section title="About">
      <div className="grid gap-4 md:grid-cols-[3fr_2fr]">
        <article className={cardClass}>
          <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
            {PROFILE.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </article>
        <article className={cardClass}>
          <dl className="space-y-3 text-sm">
            {PROFILE.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs uppercase tracking-[0.15em] text-zinc-500">{f.label}</dt>
                <dd className="mt-0.5 text-zinc-200">{f.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </Section>

    <Section title="Skills">
      <div className={cardClass}>
        <Skills />
      </div>
    </Section>

    <Section title="Education & certifications">
      <div className="grid gap-4 md:grid-cols-2">
        <article className={cardClass}>
          <h3 className="font-semibold text-white">{EDUCATION.degree}</h3>
          <p className="text-sm text-zinc-300">
            {EDUCATION.school} <span className="text-zinc-500">· {EDUCATION.location}</span>
          </p>
          <p className="mt-1 font-mono text-xs text-zinc-400">{EDUCATION.date}</p>
          <p className="mt-3 text-xs leading-relaxed text-zinc-400">
            <span className="text-zinc-300">Coursework:</span> {EDUCATION.coursework}
          </p>
        </article>
        <article className={cardClass}>
          <ul className="space-y-3">
            {CERTIFICATIONS.map((c) => (
              <li key={c.name}>
                <p className="font-semibold text-white">{c.name}</p>
                <p className="text-sm text-zinc-400">
                  {c.issuer} · {c.year}
                </p>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  </>
);
