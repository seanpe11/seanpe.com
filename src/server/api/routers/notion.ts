// import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

import getRandomQuote from "~/utils/notion/quote";


export const notionRouter = createTRPCRouter({
  getQuote: publicProcedure
    .query(async () => {
      return {
        quote: await getRandomQuote()
      }
    }),
});
