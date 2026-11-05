/**
 * Everything on the hero and the About panel. Source of truth is the résumé at
 * public/resume.pdf; the site should not claim anything the résumé does not.
 */
export const PROFILE = {
  name: "Sean Pe",
  headline: "Full-Stack Developer",
  subline: "Web apps, ML services, and the infrastructure under them.",
  location: "Houston, TX",
  email: "sean.m.s.pe@gmail.com",
  github: "https://github.com/seanpe11",
  linkedin: "https://www.linkedin.com/in/sean-pe-84b1401a4/",
  resume: "/resume.pdf",
  /** Public vault (Quartz). Links stay hidden until notesLive is true. */
  notes: "https://notes.seanpe.io",
  notesLive: false,
  /** Hero. Two short paragraphs, then the buttons. Leads with what's been built. */
  intro: [
    "I'm Sean, a software engineer in Houston. I've built a continuing-education platform for licensed professionals, a GPU-backed Whisper transcription service and desktop editor for a medical-transcription client, and a clinical tool that took manual data entry out of an ophthalmology research workflow. My own services run on a Kubernetes cluster I built and operate.",
    "Day to day I work inside a Baylor College of Medicine clinic, using Epic and building small tools for the physicians around me. Before that I built a FastAPI backend and Python data pipelines for B2B clients at ConnectSys.",
  ],
  /** About panel. Says what the hero doesn't. */
  about: [
    "My joy in writing software is to problem-solve. The first order framework I follow is to find the friction from people who do the work, build the fix with their input, and watch how they use it. At ConnectSys that was an API server and data pipelines. At Baylor it's spreadsheets and clinic workflows that shouldn't need a human to retype them.",
    "The homelab is where I learn infrastructure properly. Two k3s clusters, Flux CD reconciling from Git, SOPS-encrypted secrets, and Cloudflare Tunnels plus Tailscale for access. When it breaks late at night it's mine to fix, which is the point.",
  ],
  /** Short facts for the About panel's side card. */
  facts: [
    { label: "Now", value: "Front Desk Specialist, Baylor College of Medicine" },
    { label: "Also", value: "AI Trainer (software engineering), DataAnnotation" },
    { label: "Looking for", value: "Clinical systems / analyst or full-stack work inside a health system" },
    { label: "Based in", value: "Houston, TX" },
  ],
  quoteCaption: "From my notes",
} as const;
