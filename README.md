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
