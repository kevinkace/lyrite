# Lyrite Dev

## Install supabase cli

Powershell
- `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- `Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression`
- `scoop bucket add supabase https://github.com/supabase/scoop-bucket.git`
- `scoop install supabase`
- `supabase init`
- start docker desktop

Gitbash
- `npm i -D supabase`
- `npx supabase init`
- `npx supabase start`
- `npx supabase login`
- `npx supabase link --project-ref lxmanhiksmhndffciunk`
- `npx supabase db pull`
- `npx supabase migration up` - update live supabase

- grab github creds from supabase admin and add to `config.toml`
- open http://localhost:54323 for web data ui

## Publish a tagged release

Run this from the branch that should be released, usually `v2`:

```bash
npm ci
npm run lint
npx tsc --noEmit
```

Choose the version increment, then let npm update `package.json`, create the release commit, and create the `v`-prefixed Git tag:

```bash
npm version patch   # bug fix, for example 2.2.1
npm version minor   # new backwards-compatible feature
npm version major   # breaking change
```

Publish the commit and tag together:

```bash
git push origin v2 --follow-tags
```

Check the new tag on GitHub and confirm that the Netlify production deploy succeeds. If the release needs notes, create a GitHub Release from the tag.
