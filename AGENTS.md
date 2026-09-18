# AGENTS.md

## Stack
Next.js (App Router) + TypeScript, hosted on Netlify. Supabase provides Postgres, Auth, and Storage.

## Commands
```bash
npm run dev              # dev server
npm run build            # production build
npm run lint             # lint
npx tsc --noEmit         # type-check
npm run test:e2e         # Playwright end-to-end tests
npm run test:e2e:ui      # Playwright UI mode
npm run test:e2e:debug   # Playwright debug mode
```
There is no `npm run test` — E2E via Playwright (`test:e2e*`) is the only test suite.

**Before finishing any task:** run `npm run lint` and `npx tsc --noEmit`. Run `npm run test:e2e` for changes touching auth, songs, or tier logic.

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
- Introduce a new test runner or assume `npm run test` exists.
- Run linting after every step, ask to run it at the end of work
