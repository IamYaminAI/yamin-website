<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project conventions

- Read `docs/AI_CONTEXT.md` for the current route map, folder roles, metadata flow, and known environment limits.
- Use the App Router only. Keep one root layout at `src/app/layout.tsx`.
- Keep route files and page-specific `_components`, `_hooks`, `_lib`, and `_metadata` in `src/app`; put shared code in top-level `src` folders.
- Add page metadata and keep pages and layouts thin. Move page-specific components to `src/components` when reused.
- Keep Server Components as the default. Put PrimeReact and Redux hooks in the smallest possible client components.
- Call page-specific `_lib` or shared `src/lib` functions directly from server-rendered pages. Use RTK Query for client interactions only.
- Create Redux stores with `makeStore()` per provider instance; never define a singleton store or read Redux in Server Components.
- Use `@/` imports, strict TypeScript, PascalCase component files, and adjacent `__tests__` folders.
- Run `npm run lint && npx tsc --noEmit && npm test && npm run build` before completion.
- Keep this public-only scope free of authentication, private pages, proxy, and dark mode until separately requested.
