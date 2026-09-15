import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PROFILE } from "~/data/profile";
import { randomQuote } from "~/data/quotes";

/**
 * One quote from the baked-in Notion list, picked on the client after mount
 * so the static HTML and the hydrated tree agree. Sits at the bottom of the
 * Home panel.
 */
export const QuoteBlock = () => {
  const [quote, setQuote] = useState<string | null>(null);

  useEffect(() => {
    setQuote(randomQuote());
  }, []);

  return (
    <footer className="mt-auto border-t border-white/10 pt-6 text-center">
      <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">{PROFILE.quoteCaption}</p>
      <div className="mx-auto mt-2 min-h-[2.5rem] max-w-2xl">
        <AnimatePresence mode="wait">
          {quote && (
            <motion.p
              key={quote}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-sm italic leading-relaxed text-zinc-400"
            >
              {quote}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={() => setQuote((q) => randomQuote(q ?? undefined))}
        className="mt-2 text-xs text-zinc-500 transition-colors hover:text-[#33ccff]"
      >
        another ↻
      </button>
    </footer>
  );
};
