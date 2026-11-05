import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { LazyIframe } from "~/components/LazyIframe";
import { Section } from "~/components/lander/Section";
import { DASHBOARDS } from "~/data/dashboards";
import { PROFILE } from "~/data/profile";

/**
 * The dashboard gallery. dashboards.seanpe.io is only the full-screen host for
 * each shared dashboard; its root redirects here. Every entry comes from
 * src/data/dashboards.ts. The "Open full dashboard" link sits in the caption,
 * not on the iframe: clicks inside the iframe go to Grafana.
 */
const Dashboards: NextPage = () => (
  <>
    <Head>
      <title>{`Dashboards · ${PROFILE.name}`}</title>
      <meta
        name="description"
        content="Live Grafana dashboards from Sean Pe's homelab, shared publicly and read-only."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="min-h-[100dvh] bg-gradient-to-b from-[#1c1c1c] to-[#040404]">
      <div className="mx-auto max-w-4xl px-6 pb-16 pt-6 sm:pt-10">
        <Link href="/#experience" className="text-sm text-[#33ccff] transition-colors hover:text-white">
          ← seanpe.io
        </Link>
        <Section
          title="Dashboards"
          blurb="Live, read-only Grafana dashboards from my homelab. Each one runs only the queries pinned to its panels."
        >
          <div className="flex flex-col gap-8">
            {DASHBOARDS.map((d) => (
              <figure key={d.slug} id={d.slug} className="rounded-none border border-white/10 bg-[#0b0b0b]/75">
                <LazyIframe src={d.src} title={d.title} height={d.height} />
                <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-white/10 p-4">
                  <div>
                    <h3 className="text-base font-semibold text-white">{d.title}</h3>
                    <p className="text-sm text-zinc-400">{d.blurb}</p>
                  </div>
                  <a
                    href={d.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-sm text-[#33ccff] transition-colors hover:text-white"
                  >
                    Open full dashboard →
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      </div>
    </main>
  </>
);

export default Dashboards;
