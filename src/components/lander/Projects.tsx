import { PROJECTS, type Project } from "~/data/projects";
import { dashboardBySlug } from "~/data/dashboards";
import { LazyIframe } from "~/components/LazyIframe";
import { Section, cardClass } from "./Section";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const embed = project.embed ? dashboardBySlug(project.embed) : undefined;
  if (project.embed && !embed) throw new Error(`projects.ts: no dashboard "${project.embed}" in dashboards.ts`);
  return (
  <article className={`fade-up delay-${Math.min(index + 1, 4)} ${cardClass} ${embed ? "md:col-span-2" : ""}`}>
    {project.image && (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.image.src}
        alt={project.image.alt}
        loading="lazy"
        className="mb-4 aspect-video w-full border border-white/10 object-cover"
      />
    )}
    <p className="flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">
      <span>{project.kicker}</span>
      {project.status && (
        <span className="border border-[#33ccff]/40 px-1.5 py-0.5 normal-case tracking-normal text-[#33ccff]/80">
          {project.status}
        </span>
      )}
    </p>
    <h3 className="mt-1 text-lg font-semibold text-white">{project.title}</h3>
    <p className="text-sm text-zinc-300">{project.tagline}</p>
    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.body}</p>
    {embed && <LazyIframe src={embed.src} title={embed.title} height={embed.height} className="mt-4" />}
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
};

export const Projects = () => (
  <Section title="Projects" blurb="What each one is, why it exists, and how it was built.">
    <div className="grid gap-4 md:grid-cols-2">
      {PROJECTS.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} />
      ))}
    </div>
  </Section>
);
