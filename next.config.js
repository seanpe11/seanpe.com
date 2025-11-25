/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
console.log("USING JS NOT MJS")

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    // This will now be read by the build process
    ignoreDuringBuilds: true,
  },
  output: 'standalone'
};

export default config;
