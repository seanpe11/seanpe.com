/**
 * Quotes are pulled from Notion at build time (scripts/fetch-quotes.mjs) and
 * committed as JSON so the static export needs no server.
 */
import quotesJson from "./quotes.json";

export const QUOTES: string[] = quotesJson;

export function randomQuote(exclude?: string): string {
  const pool = QUOTES.length > 1 ? QUOTES.filter((q) => q !== exclude) : QUOTES;
  return pool[Math.floor(Math.random() * pool.length)] ?? "";
}
