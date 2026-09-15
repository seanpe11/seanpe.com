import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Modal from "~/components/TattooModal";
import { TabBar, type Tab } from "~/components/lander/TabBar";
import { Deck } from "~/components/lander/Deck";
import { Hero } from "~/components/lander/Hero";
import { About } from "~/components/lander/About";
import { Experience } from "~/components/lander/Experience";
import { Projects } from "~/components/lander/Projects";
import { QuoteBlock } from "~/components/lander/QuoteBlock";
import { PROFILE } from "~/data/profile";

const TABS: Tab[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
];

const indexFromHash = (hash: string) => {
  const i = TABS.findIndex((t) => `#${t.id}` === hash);
  return i === -1 ? 0 : i;
};

const Home: NextPage = () => {
  const router = useRouter();
  const scanned = router.query.scanned;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (scanned) setIsModalOpen(true);
  }, [scanned]);

  // Deep links like /#experience open on that panel.
  useEffect(() => {
    setActive(indexFromHash(window.location.hash));
  }, []);

  const goTo = useCallback((i: number) => {
    setActive(i);
    const id = TABS[i]?.id ?? "home";
    window.history.replaceState(null, "", i === 0 ? window.location.pathname : `#${id}`);
  }, []);

  const panels = [
    {
      id: "home",
      content: (
        <>
          <Hero onShowWork={() => goTo(2)} />
          <div className="h-10" />
          <QuoteBlock />
        </>
      ),
    },
    { id: "about", content: <About /> },
    {
      id: "experience",
      content: (
        <>
          <Projects />
          <Experience />
        </>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>{`${PROFILE.name} · ${PROFILE.headline}`}</title>
        <meta
          name="description"
          content="Sean Pe, full-stack developer in Houston, TX. Projects, experience, résumé, and contact."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative isolate flex h-[100dvh] flex-col overflow-hidden bg-gradient-to-b from-[#1c1c1c] to-[#040404]">
        {/* One soft accent blob */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-[#33ccff] opacity-[0.08] sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)" }}
          />
        </div>

        {/* overflow + scrollbar-gutter reserve the same gutter the panels have, so the tabs line up with panel content */}
        <header className="w-full shrink-0 overflow-y-auto [scrollbar-gutter:stable]">
          <div className="mx-auto max-w-4xl px-6 pb-2 pt-6 sm:pt-10">
            <TabBar tabs={TABS} active={active} onChange={goTo} />
          </div>
        </header>
        <div className="min-h-0 flex-1">
          <Deck panels={panels} active={active} onChange={goTo} />
        </div>
      </main>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">QR Code Scanned!</h2>
          <p>You&apos;ve successfully scanned the QR code.</p>
        </div>
      </Modal>
    </>
  );
};

export default Home;
