import { SKILL_GROUPS } from "~/data/skills";

const Pill = ({ label }: { label: string }) => (
  <span className="rounded-none border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-200 transition-colors hover:border-[#33ccff]/50 hover:text-white">
    {label}
  </span>
);

export const Skills = () => (
  <div className="space-y-4">
    {SKILL_GROUPS.map((group) => (
      <div key={group.title}>
        <h3 className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
          {group.title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {group.items.map((item) => (
            <Pill key={item} label={item} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default Skills;
