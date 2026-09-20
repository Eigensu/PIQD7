# PIQD7

A pnpm workspace managed by Turborepo, with a NestJS API and a Next.js App
Router frontend.

## Requirements

- Node.js 20+
- pnpm 9+

## Getting started

```bash
pnpm install
pnpm dev
```

The frontend runs at `http://localhost:3000` and the backend health endpoint
runs at `http://localhost:4000/`.

Run the other workspace tasks with:

```bash
pnpm build
pnpm lint
pnpm type-check
pnpm test
pnpm test:e2e
pnpm format
pnpm format:check
```

Commits automatically run Prettier and ESLint on staged files, followed by a
workspace type-check. Pull requests and pushes run the same checks plus the
test suites and the production build through GitHub Actions.

## Tests

The backend is covered by Jest. Unit specs live beside the code they cover in
`apps/backend/src`, and end-to-end specs live in `apps/backend/test`, where
supertest drives the running Nest application over HTTP.

```bash
pnpm --filter backend test          # unit specs
pnpm --filter backend test:watch    # unit specs, watch mode
pnpm --filter backend test:cov      # unit specs with coverage
pnpm --filter backend test:e2e      # end-to-end specs
```

## Layout

- `apps/backend`: NestJS service on port 4000
- `apps/web`: Next.js frontend on port 3000
- `packages/eslint-config`: shared ESLint flat config
- `packages/tsconfig`: shared TypeScript compiler settings

## Original design pages

The standalone pages this repository started from are preserved unchanged at
the root:

- `piqd-landing.html`: the "Ink Voltage" landing page
- `palette-options.html`: the colour palette explorations

They are plain, self-contained HTML with no build step — open either file in a
browser to view it. They are deliberately excluded from Prettier so they stay
exactly as authored, and they are independent of the workspace above. To serve
one through the Next.js app instead, move it into `apps/web/public/` and it
will be available at `/<filename>`.
