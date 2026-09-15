/**
 * Project cards. Each one tells a what / why / how story in a paragraph, then
 * lists the stack. Order is by relevance to the roles being applied for.
 */
export type Project = {
  slug: string;
  title: string;
  kicker: string;
  tagline: string;
  body: string;
  stack: string[];
  links: { label: string; href: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "iol-calculator",
    title: "IOL Calculator Automation",
    kicker: "clinical tooling",
    tagline: "Batch-fills the ESCRS IOL calculator from a spreadsheet",
    body:
      "A clinical research team at Baylor was hand-typing every eye measurement into the ESCRS intraocular lens calculator, one case at a time. This tool loads their existing spreadsheet, steps through it row by row, and fills the web form for them. The CAPTCHA and the submit stay in human hands on purpose, because that is where the automation should stop. Results are written back into the same sheet. It removed the manual data entry from the workflow and supported research the team has since published.",
    stack: ["python", "selenium", "excel", "chrome"],
    links: [{ label: "GitHub", href: "https://github.com/seanpe11/IOLCalculatorAutomation" }],
  },
  {
    slug: "homelab",
    title: "Kubernetes Homelab",
    kicker: "infrastructure",
    tagline: "A multi-node k3s cluster run the way production is run",
    body:
      "A multi-node Kubernetes cluster that hosts my own services: this website, a PostgreSQL database, a media server, and local LLMs. Everything is declared in Git and reconciled by Flux CD, with Kustomize overlays per environment, CloudNativePG for the database, and SOPS-encrypted secrets in the repo. Remote access goes through Cloudflare Tunnels and Tailscale, so nothing is exposed directly. It exists so that I learn infrastructure by operating it, not by reading about it.",
    stack: ["kubernetes (k3s)", "flux cd", "kustomize", "cloudnativepg", "sops", "cloudflare tunnel", "tailscale", "linux"],
    links: [{ label: "GitHub", href: "https://github.com/seanpe11/seanpe-homelab" }],
  },
  {
    slug: "luna",
    title: "LUNA Doctor Recommender",
    kicker: "baccalaureate thesis",
    tagline: "Finds specialist doctors in the Philippines from symptoms and preferences",
    body:
      "Finding the right specialist in the Philippines usually means asking around. LUNA takes a patient's symptoms and preferences and recommends a ranked list of specialists to see. I built the Vue.js front end and the Express.js backend, with a Python data pipeline behind them, and applied UI/UX principles to keep the interface usable for people who are not well. The application and research paper earned a 4.0.",
    stack: ["vue.js", "express.js", "python", "recommender systems"],
    links: [{ label: "GitHub", href: "https://github.com/COMET-LUNA" }],
  },
  {
    slug: "this-site",
    title: "seanpe.io",
    kicker: "this website",
    tagline: "Static Next.js on Cloudflare Pages",
    body:
      "The site you are reading. A Next.js static export served from Cloudflare Pages, with no server to keep alive. The quotes on the front page come from a Notion page I have kept for years; a build-time script pulls them in, so the page stays static and the list stays mine to edit. A TypeRace toy lives at /race.",
    stack: ["next.js", "typescript", "tailwind css", "cloudflare pages"],
    links: [
      { label: "GitHub", href: "https://github.com/seanpe11/seanpe.com" },
      { label: "TypeRace", href: "/race" },
    ],
  },
];
