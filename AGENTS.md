# AGENTS.md

## Stack
Next.js (App Router) + TypeScript, hosted on Netlify. Supabase provides Postgres, Auth, and Storage.

## Commands
```bash
npm run dev              # dev server
npm run build            # production build
npm run lint             # lint
npx tsc --noEmit         # type-check
npm run test:rls         # Vitest database/RLS tests (requires Supabase env vars)
npm run test:e2e         # Playwright end-to-end tests
npm run test:e2e:ui      # Playwright UI mode
npm run test:e2e:debug   # Playwright debug mode
```
There is no `npm run test`. Vitest (`test:rls`) covers database/RLS behavior, and Playwright (`test:e2e*`) covers browser behavior.

**Before finishing any task:** run `npm run lint` and `npx tsc --noEmit`. Run `npm run test:rls` for database/RLS changes and `npm run test:e2e` for changes touching auth, songs, or tier logic.

## Conventions
- Server Components by default; add `"use client"` only when you need state, effects, or browser APIs.
- Enforce access control with Supabase RLS/policies — never rely on app-level checks alone.
- All schema changes go through `supabase/migrations/`; no dashboard-edited schema drift.
- Keep the Supabase service role key server-only — never in client code, logs, or committed files.
- Secrets live in Netlify env vars or an uncommitted local `.env`.
- Keep UI/route changes aligned with the existing `src/app/` structure.

## Database schema
- `public.user_tier_name` enum: `free`, `pro`, `premium`.
- `public.tiers` — plan definitions (`price_cents`, `billing_period`), seeded for all three tiers.
- `public.profiles` — one row per authenticated user; tier stored in `tier_name`.
- `public.songs` — user-owned songs; RLS-enforced, with per-tier limits on row count and lyrics length.

| Tier    | Max songs | Max lyrics chars |
|---------|-----------|-------------------|
| free    | 10        | 2000              |
| pro     | 100       | 5000              |
| premium | 1000      | 9999              |

Schema changes are versioned migrations only — no dashboard edits, no bypassing migration history.

## Don't
- Disable RLS to work around a bug — fix the policy or query.
- Hardcode API keys, credentials, or tokens.
- Run destructive Supabase operations without confirmation.
- Run linting after every step, ask to run it at the end of work
- Use Radix text components like <Text>

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
