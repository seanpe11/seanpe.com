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

  // Emits .next/standalone, which the Dockerfile runner stage copies.
  output: "standalone",

  async redirects() {
    return [
      {
        source: "/tattoo",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default config;
