/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  eslint: {
    // This will now be read by the build process
    ignoreDuringBuilds: true,
  },

  // Static HTML export for Cloudflare Pages. `pnpm build` emits ./out.
  // Redirects live in public/_redirects (Pages reads that file).
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default config;
