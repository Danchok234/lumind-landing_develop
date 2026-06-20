# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Lumind — a Next.js 16 (App Router) marketing/landing page ("Find the events that truly matter"). Currently a single-page site (`src/app/page.tsx`) built from Figma designs.

## Commands

```bash
npm run dev     # start dev server (localhost:3000)
npm run build   # production build
npm run start   # serve production build
npm run lint    # eslint (flat config via eslint-config-next)
```

There is no test runner configured in this repo.

## Architecture

- **App Router only** (`src/app`), no Pages Router.
- **Path alias**: `@/*` maps to `src/*` (see `tsconfig.json`).
- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`, via `babel-plugin-react-compiler`) — avoid manual memoization (`useMemo`/`useCallback`/`React.memo`) unless there's a specific reason; let the compiler handle it.
- **Components** live in `src/components/<Name>/`, each folder containing:
  - `<Name>.tsx` — the component
  - `<Name>.module.scss` — co-located SCSS module for styles
  - `index.ts` — re-exports the default (and any named types) so consumers import via `@/components/<Name>`
  - Components that need browser APIs/state/effects are marked `'use client'` (e.g. `Header`, `Button`); purely presentational ones are server components by default (e.g. `HeroSection`).
- **Styling**: Tailwind v4 is imported in `src/app/globals.css` (`@import "tailwindcss"`) but the codebase mostly relies on hand-written SCSS modules and CSS custom properties defined in `:root` in `globals.css`. Shared SCSS variables/mixins/breakpoints live in `src/styles/_variables.scss` and `_mixins.scss` — import these in component `.module.scss` files rather than re-declaring colors, breakpoints, or type scale values.
- **Design tokens** exist in two parallel places that must be kept in sync: CSS custom properties in `globals.css` (`--color-*`, `--radius-*`, etc.) and SCSS variables in `_variables.scss` (`$color-*`, `$radius-*`, etc.). Breakpoints are mobile-first (`$bp-xs` through `$bp-3xl`), matching Figma frames at 375px (mobile) and 1920px (desktop, 1420px content width).
- **Static assets** in `public/` are largely Figma MCP exports named by content hash (e.g. `22848b279413d10b17754c4fecc14d8e107c0815.svg`) — referenced directly by path from components, not re-exported through a barrel file.
- **Fonts**: Satoshi (primary, via `@font-face` + local font files) and Poppins (via `@fontsource/poppins`), exposed as `--font-satoshi` / `--font-poppins`.

## Next.js version note

This repo pins `next@16.2.9`, a version newer than what most training data covers. Before relying on App Router APIs you're unsure about, check `node_modules/next/dist/docs/01-app/` rather than assuming pre-16 behavior, per `AGENTS.md`.

## Existing Design System
- Variables: src/styles/_variables.scss — use ONLY these, never hardcode values
- Mixins: src/styles/_mixins.scss — check here before writing custom CSS
- Components: src/components/ — check here before creating new ones

## Rules
- Always check existing components before creating new ones
- Always use existing SCSS variables and mixins
- Never duplicate what already exists
- Import variables in every SCSS module: @use '@/styles/variables' as *