# TT Medik Next.js

## Setup

1. Use Node.js 20+ (recommended 22):

```bash
nvm use || nvm install
```

2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env.local` and fill:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-03-06
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

4. Start app:

```bash
npm run dev
```

## Sanity

- Start Studio:

```bash
npm run studio
```

- Seed data from `/content`:

```bash
npm run sanity:seed
```

## Supabase Auth + Portal

- Auth pages:
  - `/login`
  - `/register`
  - `/forgot-password`
- Protected pages:
  - `/nalog` (requires login)
  - `/portal` (requires login)
  - `/portal/strucni` (requires `medical_status = 'approved'`)

### Apply DB migration

Run SQL in Supabase SQL Editor:

- [`supabase/migrations/0001_profiles.sql`](./supabase/migrations/0001_profiles.sql)

### Admin approval (MVP)

1. Open Supabase Dashboard -> `Table Editor` -> `profiles`.
2. Find the user row.
3. Set `medical_status` to `approved`.
4. Save changes.

Only approved users can access `/portal/strucni`. Checking the registration declaration checkbox alone does not grant access.
