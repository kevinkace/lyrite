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

- grab github creds from supabase admin and add to config.toml
