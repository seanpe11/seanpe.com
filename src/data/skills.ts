/**
 * Skill groups, reconciled with the résumé's Skills section. Static because
 * this never changes at runtime.
 */
export type SkillGroup = {
  title: string;
  items: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Infrastructure",
    items: [
      "Linux (Fedora, Ubuntu)",
      "Kubernetes (k3s)",
      "Docker",
      "Flux CD",
      "PostgreSQL (CloudNativePG)",
      "Nginx",
      "systemd",
      "Cloudflare Tunnels & DNS",
      "Tailscale",
      "SSH / tmux",
      "TCP/IP",
      "GitLab CI/CD",
      "AWS Lightsail",
    ],
  },
  {
    title: "Languages",
    items: [
      "Python",
      "TypeScript / JavaScript",
      "Go",
      "Rust",
      "C++",
      "Bash",
      "PowerShell",
      "SQL",
    ],
  },
  {
    title: "Web",
    items: ["React", "Next.js", "FastAPI", "Express.js", "Vue.js", "Tailwind CSS"],
  },
  {
    title: "Clinical",
    items: ["Epic EHR"],
  },
];
