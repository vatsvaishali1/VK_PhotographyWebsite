# AGENTS.md

## Cursor Cloud specific instructions

LensCraft is a single Next.js 15 (App Router, React 19, Tailwind 4, TypeScript) photography
portfolio. Standard commands live in `package.json`: `npm run dev`, `npm run build`,
`npm run start`, `npm run lint`.

### Services

| Service | Required | How to run | Notes |
|---|---|---|---|
| Next.js app | Yes | `npm run dev` (port 3000) | The product itself |
| Supabase (local, Dockerized) | Yes for data | `supabase start` | Backs the photo gallery (`photos`) and contact form (`leads`) |

The update script only runs `npm install`. Docker, the Supabase CLI, and `fuse-overlayfs`
are already installed in the VM image but must be (re)started each session — running
containers and the Docker daemon do NOT persist across VM boots.

### Non-obvious gotchas

- No demo/fallback photos exist in the code. `src/lib/photos.ts` reads only from Supabase, so
  without a running, seeded Supabase the gallery is empty and `POST /api/leads` returns 503.
  The README's "12 demo photos" note is stale.
- Docker needs `containerd-snapshotter: false` in `/etc/docker/daemon.json` so `fuse-overlayfs`
  works (Docker 29 defaults to the containerd snapshotter, which fails on this kernel).
- Start the daemon with `sudo dockerd` (run it in a background tmux session; there is no
  systemd). If the Docker socket gives "permission denied", run `sudo chmod 666 /var/run/docker.sock`.
- The local Supabase stack does NOT auto-grant table privileges to the `anon`/`authenticated`
  roles the way hosted Supabase does. `supabase/seed.sql` includes the required
  `grant select on photos` / `grant insert on leads` statements — always apply it after the schema.
- `.env.local` is gitignored and must be recreated each session. Point it at the local stack
  (`NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321` and the `ANON_KEY` from `supabase status -o json`).
  Restart `npm run dev` after writing `.env.local` — Next.js only reads env vars at startup.
- Cloudinary is optional and unconfigured locally; image URLs pass through. Seed photos use direct
  Unsplash URLs (in the `location` column, which `resolvePhotoUrl` checks first).

### One-time-per-session setup (after `npm install`)

```
sudo dockerd            # background tmux session
supabase start          # boots the local Postgres/PostgREST/etc. stack
# apply schema + leads + seeded demo photos & grants:
docker exec -i supabase_db_workspace psql -U postgres -d postgres < supabase/schema.sql
docker exec -i supabase_db_workspace psql -U postgres -d postgres < supabase/leads.sql
docker exec -i supabase_db_workspace psql -U postgres -d postgres < supabase/seed.sql
# write .env.local (see above) using: supabase status -o json
npm run dev
```

Verify: `curl localhost:3000/api/photos` returns a non-empty array, and a `POST` to
`/api/leads` returns `{"ok":true}`.
