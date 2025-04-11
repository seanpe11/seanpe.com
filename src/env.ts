import { z } from "zod";
import { env as clientEnv } from "~/env.client";

const schema: {
  client: typeof clientEnv;
  server: z.ZodObject<{
    DATABASE_URL: z.ZodString;
    NODE_ENV: z.ZodOptional<z.ZodString>;
  }>;
} = {
  client: clientEnv,
  server: z.object({
    DATABASE_URL: z.string(),
    NODE_ENV: z.string().optional(),
  }),
} as const;

type ENV = z.infer<typeof schema['client']> & z.infer<typeof schema['server']>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends ENV {}
  }
}

export const env = {
  client: clientEnv,
  server: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
} as const; 