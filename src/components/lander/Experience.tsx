import { EXPERIENCE } from "~/data/experience";
import { Section, cardClass } from "./Section";

export const Experience = () => (
  <Section title="Work">
    <div className="space-y-4">
      {EXPERIENCE.map((role) => (
        <article key={`${role.org}-${role.start}`} className={cardClass}>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h3 className="font-semibold text-white">{role.title}</h3>
              <p className="text-sm text-zinc-300">
                {role.org} <span className="text-zinc-500">· {role.location}</span>
              </p>
            </div>
            <p className="font-mono text-xs text-zinc-400">
              {role.start} – {role.end}
            </p>
          </div>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-zinc-400">
            {role.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </Section>
);
