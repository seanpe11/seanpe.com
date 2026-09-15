/**
 * Skill groups: the résumé's Skills section plus what the projects on this
 * site demonstrate. Static because this never changes at runtime.
 */
export type SkillGroup = {
  title: string;
  items: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Web",
    items: ["React", "Next.js", "tRPC", "Drizzle", "NextAuth", "FastAPI", "Express.js", "Vue.js", "Tailwind CSS", "Tauri"],
  },
  {
    title: "Infrastructure",
    items: [
      "Linux (Fedora, Ubuntu)",
      "Kubernetes (k3s)",
      "Docker",
      "Flux CD",
      "Ansible",
      "PostgreSQL (CloudNativePG)",
      "Supabase",
      "GCP Cloud Run",
      "AWS Lightsail",
      "Cloudflare Tunnels, Pages & Workers",
      "Tailscale",
      "Nginx",
      "systemd",
      "GitHub Actions / GitLab CI",
      "SSH / tmux",
    ],
  },
  {
    title: "Languages",
    items: ["Python", "TypeScript / JavaScript", "Go", "Rust", "C++", "SQL", "Bash", "PowerShell"],
  },
  {
    title: "Data & ML",
    items: ["pandas", "NumPy", "Jupyter", "Whisper", "pytest"],
  },
  {
    title: "Clinical",
    items: ["Epic EHR"],
  },
];
