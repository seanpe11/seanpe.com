# syntax=docker.io/docker/dockerfile:1
FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat openssl # needed for prisma

# Corepack resolves the pnpm version from package.json's "packageManager" field.
# Without that pin it fetches latest (pnpm 11+), which needs a newer Node than
# this image ships and fails with ERR_UNKNOWN_BUILTIN_MODULE.
ENV PNPM_HOME=/pnpm
ENV PATH="$PNPM_HOME:$PATH"
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable

# 1. Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma
# needed for build
RUN pnpm i --frozen-lockfile

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# .env is excluded via .dockerignore so it never lands in a pushed layer.
# Validation is deferred to runtime, where compose injects the real values.
ENV SKIP_ENV_VALIDATION=1
# This will create the .next/standalone folder
RUN pnpm run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
# Bind all interfaces, not just loopback, so the port is reachable from outside the container.
ENV HOSTNAME=0.0.0.0
# server.js is created by next build from the standalone output
CMD ["node", "server.js"]
