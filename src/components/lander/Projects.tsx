import { PROJECTS, type Project } from "~/data/projects";
import { Section, cardClass } from "./Section";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <article className={`fade-up delay-${Math.min(index + 1, 4)} ${cardClass}`}>
    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">{project.kicker}</p>
    <h3 className="mt-1 text-lg font-semibold text-white">{project.title}</h3>
    <p className="text-sm text-zinc-300">{project.tagline}</p>
    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.body}</p>
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {project.stack.map((s) => (
        <li
          key={s}
          className="rounded-none border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.7rem] text-zinc-300"
        >
          {s}
        </li>
      ))}
    </ul>
    {project.links.length > 0 && (
      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        {project.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-[#33ccff] transition-colors hover:text-white"
          >
            {l.label} →
          </a>
        ))}
      </div>
    )}
  </article>
);

export const Projects = () => (
  <Section title="Projects" blurb="What each one is, why it exists, and how it was built.">
    <div className="grid gap-4 md:grid-cols-2">
      {PROJECTS.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} />
      ))}
    </div>
  </Section>
);
