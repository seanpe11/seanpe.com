/**
 * Pull the quotes page from Notion into src/data/quotes.json.
 *
 * The site is a static export, so quotes are baked in at build time instead of
 * fetched at runtime. Run `NOTION_API_KEY=... pnpm quotes:fetch` whenever the
 * Notion page changes, then rebuild and deploy. Without the key the committed
 * JSON is used as-is.
 */
import { Client } from "@notionhq/client";
import { writeFileSync } from "node:fs";

const PAGE_ID = "5d43fa370eb24a89bbba1da3c192c49d";
const OUT = new URL("../src/data/quotes.json", import.meta.url);

if (!process.env.NOTION_API_KEY) {
  console.error("NOTION_API_KEY is not set; keeping the committed quotes.json");
  process.exit(0);
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const blocks = [];
let cursor;
do {
  const page = await notion.blocks.children.list({
    block_id: PAGE_ID,
    page_size: 100,
    start_cursor: cursor,
  });
  blocks.push(...page.results);
  cursor = page.has_more ? page.next_cursor : undefined;
} while (cursor);

const quotes = blocks.flatMap((b) => {
  if (!("type" in b)) return [];
  // Top-level paragraphs and quote blocks only. Nested paragraphs are commentary.
  const richText =
    b.type === "paragraph" ? b.paragraph.rich_text : b.type === "quote" ? b.quote.rich_text : null;
  if (!richText) return [];
  const text = richText.map((t) => t.plain_text).join("").trim();
  return text ? [text] : [];
});

writeFileSync(OUT, JSON.stringify(quotes, null, 2) + "\n");
console.log(`wrote ${quotes.length} quotes to src/data/quotes.json`);
