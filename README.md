# Yamin public website

The marketing site for Yamin, marketing intelligence that reads every channel, audit and creative in one place. Built by Lyxel & Flamingo.

It is a Next.js 16 App Router application with React 19, TypeScript, Tailwind CSS v4, PrimeReact v10, Redux Toolkit, and Jest.

For route ownership, folder conventions, metadata flow, and AI working notes, see [`docs/AI_CONTEXT.md`](docs/AI_CONTEXT.md).

## Routes

- `/`: the cinematic home page (content in `src/app/(public)/_lib/content.ts`)
- `/sitemap.html`: HTML list of public pages
- `/sitemap.xml`: XML sitemap for crawlers
- `/robots.txt`: blocks all crawlers until `SITE_INDEXABLE=true` (see `.env.example`)

About and Contact pages are removed for now. There is no contact or audit API yet: the audit form validates the address, then tells the visitor audits are not open, and sends nothing.

## Architecture

`src/app` holds route files, layouts, boundaries, styles, and page-specific `_components`, `_hooks`, `_lib`, and `_metadata` folders. Shared UI, layout pieces, store, utilities, hooks, and types live directly under `src`. The `(public)` route group owns the public shell without changing URLs. The root layout is the only document layout.

Server Components call data functions directly. PrimeReact is used through unstyled `App*` wrappers in `src/components/ui`, styled with Tailwind. Icons come from one sprite (`public/icons/sprite.svg`) via `<Icon />`. Favicons (`favicon.ico`, `icon.svg`, `apple-icon.png`) live in `src/app` and use the Yamin logo mark. Redux creates one store per provider instance through `makeStore`; the RTK Query base API is ready for future client interactions. There is no authentication or dark mode.

## Commands

```bash
npm install
npm run dev
npm run lint
npx tsc --noEmit
npm test
npm run test:coverage
npm run build
npm run format:check
```

Copy `.env.example` to `.env.local` if you want to customize public configuration. `NEXT_PUBLIC_SITE_NAME` is optional and validated by `src/lib/env.ts`. Set `SITE_URL` to the deployed website origin (for example, `https://www.your-domain.com`) before a production build. Local development defaults to `http://localhost:3000`.

Use Node.js 22 LTS or 24 LTS for supported tooling engines.
