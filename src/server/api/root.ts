import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { notionRouter } from "~/server/api/routers/notion";
import { portfolioRouter } from "~/server/api/routers/portfolio";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  notion: notionRouter,
  portfolio: portfolioRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
