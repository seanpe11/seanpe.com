/**
 * Grafana dashboards shared publicly from the homelab, shown on /dashboards and
 * (by slug) embedded in project cards.
 *
 * Each `src` is the token URL from Grafana's *Share externally* dialog, with the
 * host swapped to dashboards.seanpe.io (Grafana prints grafana.seanpe.io, which
 * sits behind Cloudflare Access). The token lives in Grafana's database, not in
 * Git, so a cluster rebuild issues new tokens: re-share each dashboard and update
 * this file. It is the only place the URLs live.
 *
 * `height` is the iframe height in px. Grafana switches to a stacked mobile layout
 * below about 790 px wide, and its header and footer add about 95 px to any
 * shared dashboard; neither can be hidden.
 */
export type Dashboard = {
  slug: string;
  title: string;
  /** One sentence. */
  blurb: string;
  src: string;
  height: number;
};

export const DASHBOARDS: Dashboard[] = [
  {
    slug: "pipeline-health",
    title: "Pipeline health",
    blurb: "Liveness of the prediction-market collectors and the homelab hosts, from once-a-minute heartbeats written to Postgres.",
    src: "https://dashboards.seanpe.io/public-dashboards/8a12aa99128a4082aead4d9f19667503",
    height: 1250,
  },
  // Homelab widget (~200 px, built for embedding in the homelab project card).
  // URL comes from the homelab captain; uncomment and fill in, then set
  // `embed: "homelab-widget"` on the homelab entry in projects.ts.
  // {
  //   slug: "homelab-widget",
  //   title: "Homelab at a glance",
  //   blurb: "",
  //   src: "https://dashboards.seanpe.io/public-dashboards/<token>",
  //   height: 210,
  // },
];

export const dashboardBySlug = (slug: string) => DASHBOARDS.find((d) => d.slug === slug);
