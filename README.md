What's Built
Stack

Next.js 15 with App Router and next/image (WebP/AVIF, lazy loading)
Tailwind CSS 4 for a dark, minimal gallery layout
Supabase integration for photo metadata (titles, descriptions, dates, alt text)
Cloudinary integration for CDN image delivery and transforms
12 demo photos from Unsplash so the site works immediately without credentials
Features

Masonry gallery — responsive 1/2/3-column grid that reflows by screen size
Lazy loading — images load as you scroll (loading="lazy" + Next.js optimization)
Category filters — Landscape, Portrait, Street, Wildlife, Architecture
Lightbox — fullscreen view on photo detail pages
SEO — per-page metadata, Open Graph tags, and alt_text on every image
Hero section — featured photo banner on the homepage
About page — photographer bio and contact


Connect Your Own Photos
Supabase — Create a project, run supabase/schema.sql in the SQL Editor, then add your keys to .env.local
Cloudinary — Upload photos, note the public_id, and insert rows into the photos table with matching alt_text
Copy .env.example → .env.local and fill in your credentials
Until those are configured, the site uses the built-in demo gallery so you can preview everything right away.

C:\Users\kaush\Projects\startup-valuator\
├── package.json              # Dependencies & scripts (npm run dev)
├── next.config.ts            # Next.js config (image domains)
├── tsconfig.json             # TypeScript config
├── postcss.config.mjs        # Tailwind/PostCSS
├── eslint.config.mjs
├── .env.example              # Env var template (Supabase, Cloudinary)
├── .gitignore
│
├── src/                      # ← Most of your app code
│   ├── app/                  # Pages & routes
│   │   ├── page.tsx          # Homepage (gallery)
│   │   ├── layout.tsx        # Site shell, SEO metadata
│   │   ├── globals.css       # Global styles
│   │   ├── about/page.tsx    # About page
│   │   ├── photo/[slug]/     # Individual photo pages
│   │   └── api/photos/       # JSON API endpoint
│   │
│   ├── components/           # UI components
│   │   ├── CategoryFilter.tsx  # Maternity / City / Landscape menu
│   │   ├── PhotoGallery.tsx
│   │   ├── PhotoCard.tsx
│   │   ├── PhotoDetail.tsx
│   │   ├── Lightbox.tsx
│   │   ├── Hero.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   │
│   ├── lib/                  # Data & integrations
│   │   ├── photos.ts         # Demo photos + category list
│   │   ├── supabase.ts       # Supabase client
│   │   └── cloudinary.ts     # Cloudinary image URLs
│   │
│   └── types/
│       └── photo.ts          # TypeScript types
│
├── supabase/
│   └── schema.sql            # Database schema for Supabase
│
├── node_modules/             # Installed packages (auto-generated)
└── .next/                    # Next.js build cache (auto-generated)
