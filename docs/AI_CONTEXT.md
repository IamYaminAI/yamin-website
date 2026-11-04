# Yamin website: context for future AI work

Read `AGENTS.md` first. It contains the project rules and the instruction to consult the installed Next.js documentation before changing code. This file records how the current project is organized; check the source files when a detail may have changed.

## What exists now

This is a public Next.js 16 App Router site using React 19, strict TypeScript, Tailwind CSS 4, PrimeReact 10, Redux Toolkit, and Jest. It currently has no authentication, private routes, contact or audit API, or dark mode. The About and Contact pages were removed for now; walkthrough CTAs point to the closing `#walkthrough` section. The RTK Query API slice has no endpoints yet.

| URL             | Source                                   | Purpose                         |
| --------------- | ---------------------------------------- | ------------------------------- |
| `/`             | `src/app/(public)/page.tsx`              | Cinematic marketing home page   |
| `/sitemap.html` | `src/app/(public)/sitemap.html/page.tsx` | Human-readable public page list |
| `/sitemap.xml`  | `src/app/sitemap.ts`                     | XML sitemap                     |
| `/robots.txt`   | `src/app/robots.ts`                      | Crawler rules and sitemap URL   |

The `(public)` route group does not appear in URLs. Home lives at the route group's root, so its page-specific folders are directly under `src/app/(public)/`.

## Layouts and shared components

- `src/app/layout.tsx` is the only root layout. It owns `<html>`, `<body>`, global CSS, providers, and site-wide metadata.
- `src/app/(public)/layout.tsx` is a nested layout for the public header, main region, and footer. It does not create another root document.
- `src/components/layout/` holds the brand `Header` (fixed pill nav linking to home sections as `/#product` etc.), `Footer`, and `MobileMenu`. The header is fixed, so non-home pages start their content with `pt-36`. This folder is not a Next.js route or layout convention.
- `src/app/providers.tsx` is the client boundary for Redux and PrimeReact. Keep pages and layouts as Server Components unless a specific interaction requires a small client component.

## Where code belongs

Page-specific files live beside the page in private folders:

- `_components/`: UI used by that page. About, Contact, and the HTML sitemap keep their `page.tsx` files thin by rendering a component from here.
- `_lib/`: page-owned data or helpers. Home list content (modules, plans, FAQs) is in `src/app/(public)/_lib/content.ts`; unconfirmed values are `null` or empty and the UI hides them instead of showing placeholders. The hero particle-eye math is in `_lib/eye-field.ts`.
- `_hooks/`: hooks for page-owned client interactions. Do not add a hook just to fill one.
- `_metadata/`: the page's metadata object. Each `page.tsx` imports and exports it as `metadata`, which Next.js reads.

Put code used by multiple pages in top-level `src` folders. Shared UI is in `src/components`, shared helpers in `src/lib`, shared hooks in `src/hooks`, and types in `src/types`. Use `@/` imports, PascalCase component filenames, and adjacent `__tests__` folders. Tests should cover behavior, not merely repeat implementation details.

## Brand UI and home page

The design reference for the home page was a static "cinematic" mockup; it is rebuilt here as Server Components with small client islands.

- **Tokens:** colours, fonts, and breakpoints live in `src/app/globals.css` (`@theme`). Fonts are loaded with `next/font/google` in the root layout. Custom breakpoints: `xs` (560px) and `tablet` (900px). Shared utilities: `text-display`, `text-accent-serif`, `text-label`, `bg-dots-cream`, `bg-dots-ink`, `scene-pin`.
- **Styling rule:** Tailwind only; there are no CSS Modules. Use arbitrary values/properties and variants (`before:`, `group-open:`, `has-[…]`, `max-tablet:`, `[@media(…)]:`, `motion-reduce:`) before writing CSS. Keyframes are the one exception: define them in `globals.css` `@theme` as `--animate-*` tokens and pair `animate-*` with `motion-reduce:animate-none`. Write responsive classes mobile-first (`base tablet:…`) and avoid two utilities setting the same property on one element, since their order in the CSS output decides the winner.
- **PrimeReact rule:** PrimeReact is imported only by `App*` wrappers in `src/components/ui` (plus `providers.tsx` and test helpers); ESLint `no-restricted-imports` enforces this. Prefer a PrimeReact wrapper; build a custom component only when PrimeReact cannot meet the need. PrimeReact runs **unstyled** (no theme CSS): each wrapper styles itself with Tailwind and `pt`. Current wrappers: `AppButton`, `AppInputText`, `AppSelectButton`, `AppMessage`, `AppTag`, `AppSkeleton`, `AppSidebar`. Note that PrimeReact `Skeleton` ignores `style`, and unstyled `Button` needs `flex-row-reverse` for `iconPos="right"` (handled in `AppButton`).
- **Deliberately custom:** `ButtonLink` (PrimeReact Button cannot render a link; it shares `buttonStyles.ts` with `AppButton`), `FaqAccordion` (PrimeReact Accordion unmounts collapsed panels, which would drop FAQ answers from the HTML), plan/module cards (PrimeReact Card titles are not headings), and the scroll-driven progress bars (a `ProgressBar` value would re-render on every frame). Other brand primitives with no PrimeReact equivalent: `Eyebrow`, `DisplayHeading`, `Accent`, `Container`, `Section`, `CheckList`, `Logo`, `Marquee`.
- **Icons:** UI icons are drawn once as `<symbol>`s in `public/icons/sprite.svg` and rendered with `<Icon name="…" />` (`src/components/ui/Icon.tsx`), which references the cached sprite via `<use>`. Colour comes from `currentColor` or a `stroke-*`/`fill-*` class; stroke width from `strokeWidth`. To add an icon, add a paint-free `<symbol>` to the sprite and register its name, paint type and default size in `Icon.tsx`. Do not paste inline `<svg>` icons; one-off illustrations (e.g. the analytics chart) may stay inline. Logos are shared files used through `Logo`.
- **Forms** (`src/components/forms`): `AuditForm` validates a website with `src/lib/website-url.ts`. With no audit API or contact page yet, a valid address is not sent anywhere; the form shows an info message saying audits are not open. Connect a submission endpoint in `AuditForm` before launch.
- **Scroll motion** (`src/components/motion`, `src/lib/scroll-scenes.ts`): `ScrollScenes` runs one animation-frame loop that writes `--p` (0→1) on every `[data-scene]` inside it, plus `--vh`, `--mx/--my`, and `--dist` for `[data-scene-track]`. Tailwind arbitrary utilities turn `--p` into motion (e.g. `[--h:clamp(0,calc(var(--p)/0.26),1)]` on the stage, then `opacity-[calc(1-var(--h)*1.15)]`), so React never re-renders on scroll. Register a section with `<Section scene={{ kind: "pin" | "view", rest }}>`; `rest` is the value used before hydration and on very tall screens. `Reveal` is the standard fade-up. All keyframe animations stop under `prefers-reduced-motion`.
- **Home sections** live in `src/app/(public)/_components/` (`hero/`, `product/`, `pricing/`, and one file per other section). Only `HeroEyeCanvas`, `PricingPlans`, `AuditForm`/`TypewriterInput`, and `ScrollScenes` are client components.
- **Structured data:** `src/lib/structured-data.ts` builds Organization, WebSite, SoftwareApplication, and FAQPage JSON-LD; render it with `src/components/seo/JsonLd.tsx`, which escapes `<`.

## Metadata, sitemaps, and site URL

`src/lib/seo.ts` builds page title, description, canonical URL, Open Graph, and Twitter metadata. `src/app/layout.tsx` sets the metadata base, title template, application name, and indexing policy. The page-specific `_metadata/metadata.ts` files supply each route's values.

`src/lib/site.ts` is the shared public page list used by the XML and HTML sitemaps. When adding, removing, or renaming a public page, update that list, its page metadata, navigation as appropriate, and tests. The HTML sitemap is linked from the footer.

`SITE_URL` must be set to the **public origin** for production builds, such as `https://www.your-domain.com`, without a path. It supplies absolute sitemap URLs, the robots sitemap reference, and canonical/Open Graph URLs through `metadataBase`. No production domain is stored in this repository. In local development and tests, `getSiteUrl()` defaults to `http://localhost:3000`. `NEXT_PUBLIC_SITE_NAME` is optional and defaults to `Yamin`. See `.env.example` and `src/lib/env.ts`.

Favicons follow the file conventions in `src/app`: `favicon.ico` (16/32/48px), `icon.svg`, and `apple-icon.png` (180px on the navy background), all drawn from the logo mark (the gold disc and cream dot in `public/brand/*.svg`). `next.config.ts` disables the `X-Powered-By: Next.js` header and the dev-mode route badge.

`src/app/opengraph-image.tsx` generates the site-wide social card. Because a page's `openGraph` object replaces the root one, `createPageMetadata` references `/opengraph-image` explicitly; keep that in sync if the image route moves.

Next.js generates `/sitemap.xml` from `src/app/sitemap.ts` and `/robots.txt` from `src/app/robots.ts`; they are not hand-written files under `public/`. `robots.txt` disallows all crawlers unless `SITE_INDEXABLE=true` was set at build time (see `.env.example`); set it at launch and rebuild. `/sitemap.html` is a normal App Router page.

## State and data flow

Server-rendered pages call their data helpers directly. Use RTK Query for future client interactions. The Redux store is created with `makeStore()` inside each `StoreProvider` instance; do not introduce a singleton store or read Redux state from a Server Component. `MobileMenu` owns the current Redux interaction, and `AppSidebar` wraps the PrimeReact sidebar in a client component.

## Working and verification steps

1. Check `git status` before editing. Preserve unrelated work.
2. Read the relevant guide in `node_modules/next/dist/docs/` before changing Next.js code; this installed version may differ from familiar Next.js behavior.
3. Keep route files thin, use the existing page folders, and update imports when moving code.
4. Run `npm run lint && npx tsc --noEmit && npm test && npm run build` before completion. Set `SITE_URL` for a production build.
5. For route or metadata work, inspect the generated output or rendered route as well as static checks. A successful type check alone does not confirm a sitemap URL or HTML metadata tag.

In this workspace, previous `next build` attempts using Turbopack failed when a build worker tried to bind a local port (`Operation not permitted`), including after command escalation. `SITE_URL=https://example.com npx next build --webpack` succeeded and generated the public routes. Treat this as an observed environment limitation, not as proof that Turbopack fails elsewhere. The example domain was used only for verification and is not the production URL.
