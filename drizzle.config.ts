import { type Config } from "drizzle-kit";

import { env } from "./src/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.server.DATABASE_URL,
  },
  tablesFilter: ["seanpecom_*"],
} satisfies Config;
