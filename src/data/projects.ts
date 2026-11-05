/**
 * Project cards. Each one tells a what / why / how story in a paragraph, then
 * lists the stack. Order is by how much each proves: shipped software with
 * users first, then infrastructure and measurement work, then smaller pieces.
 *
 * `image` is a screenshot under public/images/projects/ (16:9 works best).
 * `status` is a short honest state shown next to the kicker.
 * `embed` is the slug of a dashboard in src/data/dashboards.ts, rendered as a
 * lazily mounted iframe under the body; a card with one spans both columns,
 * because Grafana falls back to a stacked mobile layout below ~790 px.
 */
export type Project = {
  slug: string;
  title: string;
  kicker: string;
  status?: string;
  tagline: string;
  body: string;
  stack: string[];
  links: { label: string; href: string }[];
  image?: { src: string; alt: string };
  embed?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "197cpd",
    title: "197cpd",
    kicker: "web app",
    status: "relaunching",
    tagline: "Continuing-education platform for licensed professionals in the Philippines",
    body:
      "Licensed professionals in the Philippines have to log continuing professional development units to renew, and providers have no good way to sell courses toward them. 197cpd is the platform for both sides: provider and learner accounts with roles, a course catalogue, quizzes, certificates, and payments. Built on the T3 stack with Next.js, tRPC, Drizzle on Postgres, NextAuth with Google and Facebook sign-in, Tailwind and shadcn, deployed on Vercel with Supabase. It is being relaunched and is not fully up today; the code is private because a co-founder owns the brand.",
    stack: ["next.js", "trpc", "drizzle", "postgres", "supabase", "nextauth", "tailwind", "vercel"],
    links: [],
  },
  {
    slug: "f1lag",
    title: "f1lag",
    kicker: "data pipeline · measurement",
    status: "public soon",
    tagline: "How fast do prediction markets reprice after an F1 safety car, and is any of it fillable?",
    body:
      "F1's live timing feed is the reference clock; Kalshi and Polymarket are the markets. The pipeline parses F1's SignalR stream archive, fits a UTC anchor per session and asserts its error (median 0.131 s across 28 safety-car, VSC and red-flag events), times each event from its first machine-readable tell rather than the headline, and lines that up against microsecond-stamped venue trades. A systemd-supervised capture records the live order book at race weekends so that “fillable” is measured, not assumed. Six executed notebooks walk the research honestly, including one that kills its own strategy when the live spread turned out to be double the assumption. 27 async tests, no credentials needed. It does not trade.",
    stack: ["python", "pandas", "websockets", "fastf1", "systemd", "pytest", "jupyter"],
    links: [],
  },
  {
    slug: "ssp-transcription",
    title: "SSP AI Transcriptionist",
    kicker: "client work · ml service",
    status: "freelance",
    tagline: "Whisper transcription service and desktop editor for a medical-transcription business",
    body:
      "A medical-transcription business wanted its transcriptionists to start from a machine draft instead of a blank page. I built the service around Whisper on a GPU: a FastAPI inference API packaged in Docker and deployed to Google Cloud Run on an NVIDIA L4, a Cloudflare Worker in front of it, and a React editor that also ships as a Tauri desktop app with foot-pedal support for playback. Audio goes in, a timestamped draft comes out, the transcriptionist corrects it in place. Client work, so the code stays private; screenshots on request.",
    stack: ["fastapi", "whisper", "docker", "gcp cloud run", "nvidia l4", "cloudflare workers", "react", "tauri"],
    links: [],
  },
  {
    slug: "iol-calculator",
    title: "IOL Calculator Automation",
    kicker: "clinical tooling",
    status: "shipped · in use",
    tagline: "Batch-fills the ESCRS IOL calculator from a spreadsheet",
    body:
      "A clinical research team at Baylor was hand-typing every eye measurement into the ESCRS intraocular lens calculator, one case at a time. This tool loads their existing spreadsheet, steps through it row by row, and fills the web form for them. The CAPTCHA and the submit stay in human hands on purpose, because that is where the automation should stop. Results are written back into the same sheet. GitHub Actions builds the Windows executable so the researchers install nothing. It removed the manual data entry from the workflow and supported research the team has since published.",
    stack: ["python", "selenium", "excel", "github actions", "pyinstaller"],
    links: [{ label: "GitHub", href: "https://github.com/seanpe11/IOLCalculatorAutomation" }],
  },
  {
    slug: "homelab",
    title: "Kubernetes Homelab",
    kicker: "infrastructure",
    status: "running · public dashboard",
    tagline: "One OptiPlex, two k3s clusters, run the way production is run",
    body:
      "A Dell OptiPlex runs two k3s clusters: a family one on the host for the household's services, and a personal one in an Incus VM that I can break and rebuild from Git. Flux reconciles the personal cluster from a public repo, with SOPS-encrypted secrets and self-hosted Supabase on Postgres 17, which replaced CloudNativePG. Traffic arrives through a Cloudflare Tunnel, with Cloudflare Access in front of the private hosts and an explicit path allowlist on the public ones. Grafana queries Postgres through a read-only role, and its dashboards are shared publicly on this site.",
    stack: ["kubernetes (k3s)", "flux cd", "incus", "supabase (postgres 17)", "sops", "ansible", "cloudflare tunnel + access", "grafana"],
    links: [
      { label: "GitHub", href: "https://github.com/seanpe11/seanpe-homelab" },
      { label: "Live dashboards", href: "/dashboards" },
    ],
    // embed: "homelab-widget", // slug in src/data/dashboards.ts, once the widget is shared
  },
  {
    slug: "lap-replay",
    title: "F1 lap replay",
    kicker: "this site's background",
    status: "live",
    tagline: "Verstappen's COTA pole lap, replayed in real time behind this page",
    body:
      "The background of this site is a canvas replaying a qualifying pole lap: the driver's own line traced from telemetry, corner numbers from the circuit centreline, and a car lapping it at real pace. Click the bar at the bottom for the focus view, where the line is coloured by speed. Positions and car data come from OpenF1 and the circuit geometry from MultiViewer, pulled by a build-time script so the site stays fully static. The static layers render once to an offscreen canvas and each frame only draws the car; measured at about 14% main-thread time on a phone emulation with the CPU throttled four times, at 30 fps with no glow on touch devices.",
    stack: ["canvas 2d", "typescript", "next.js", "cloudflare pages", "openf1"],
    links: [{ label: "GitHub", href: "https://github.com/seanpe11/seanpe.com" }],
  },
  {
    slug: "seanpe-api",
    title: "seanpe-api",
    kicker: "backend",
    status: "small · running",
    tagline: "A Go API for the homelab",
    body:
      "The small backend behind my personal services: quotes, a notes index, and a few trackers, written in Go with Gin. Queries are generated from SQL with sqlc against PostgreSQL, the OpenAPI spec is generated from the handlers, and a multi-stage Dockerfile plus Kubernetes manifests deploy it to the cluster. My first Go service, kept deliberately boring.",
    stack: ["go", "gin", "sqlc", "postgres", "openapi", "docker", "kubernetes"],
    links: [{ label: "GitHub", href: "https://github.com/seanpe11/seanpe-api" }],
  },
  {
    slug: "prediction-arbitrage",
    title: "Prediction-market arbitrage",
    kicker: "research · killed with evidence",
    status: "parked",
    tagline: "A cross-venue arbitrage idea, measured until it died",
    body:
      "The hypothesis was that the same prediction market on different venues would misprice for long enough to trade. I built the collectors to find out: a Rust mempool watcher, Python collectors on systemd with heartbeats and a six-hourly Telegram status, and notebooks over the captured order books. The honest result is that the visible gap had almost no size behind it and the resolution-agreement risk ate the rest, so the project is parked with the verdict written down and what would reopen it. The tooling and the lesson carried straight into f1lag.",
    stack: ["rust", "python", "systemd", "docker", "jupyter"],
    links: [],
  },
  {
    slug: "connectsys",
    title: "ERP integrations at ConnectSys",
    kicker: "client work",
    status: "2023 – 2025",
    tagline: "A FastAPI backend and the pipelines behind a B2B ERP",
    body:
      "At ConnectSys I architected the API server for B2B clients from scratch: FastAPI on PostgreSQL, Docker, GitLab CI/CD, and AWS Lightsail, with cloud-based Python microservices automating the clients' data-processing workflows and integrations into their ERP and automation tooling. Client code, so nothing to link; the work is on the résumé.",
    stack: ["fastapi", "python", "postgres", "docker", "gitlab ci", "aws lightsail"],
    links: [],
  },
];
