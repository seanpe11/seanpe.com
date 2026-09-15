/** Work history and education, copied from the résumé. Keep the two in sync. */
export type Role = {
  org: string;
  title: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export const EXPERIENCE: Role[] = [
  {
    org: "Baylor College of Medicine",
    title: "Front Desk Specialist I",
    location: "Houston, TX",
    start: "Sep 2025",
    end: "Present",
    bullets: [
      "Run clinical administrative work: patient intake, appointment scheduling, and secure records management in Epic EHR.",
      "Coordinate directly with physicians and medical staff to triage patient needs and keep the clinic moving.",
      "Volunteer on technical projects that improve clinical workflows, working with physicians to find and fix the pain points.",
    ],
  },
  {
    org: "DataAnnotation",
    title: "AI Trainer, Software Engineering (Contract)",
    location: "Remote",
    start: "Jun 2024",
    end: "Present",
    bullets: [
      "Train large language models to write better code across Python and TypeScript/JavaScript tasks, from fresh problems to reviews of model-written solutions.",
      "Write reference solutions and explanatory snippets, and grade AI-generated code for correctness, performance, and quality.",
    ],
  },
  {
    org: "ConnectSys",
    title: "Fullstack Software Engineer",
    location: "Manila, Philippines",
    start: "Dec 2023",
    end: "Mar 2025",
    bullets: [
      "Architected a FastAPI API server from scratch, with CI/CD on GitLab, PostgreSQL, AWS Lightsail, and Docker, for B2B clients.",
      "Wrote cloud-based Python microservices that automated data processing workflows and pipelines.",
      "Worked in an Agile team with a focus on development and DevOps practice.",
    ],
  },
];

export const EDUCATION = {
  school: "De La Salle University",
  degree: "BS in Computer Science",
  location: "Manila, Philippines",
  date: "June 2024",
  coursework:
    "UI/UX, Data Structures and Algorithms, Web Development, Machine Learning, Data Science, Distributed Computing, Operating Systems and Architecture",
};

export const CERTIFICATIONS = [
  { name: "Claude Code Certified Developer", issuer: "Anthropic", year: "2026" },
  { name: "Wood Badge", issuer: "Scouts BSA", year: "2026" },
];
