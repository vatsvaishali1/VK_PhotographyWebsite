-- Local development seed data for the photos table.
-- Uses public Unsplash URLs placed in `location` so the app resolves real
-- images without Cloudinary configured. Safe to re-run (idempotent upsert).

-- Grant table access to the API roles. On hosted Supabase these grants are
-- applied automatically; the local stack needs them explicitly so the anon
-- key (used by the app) can read photos and insert leads under RLS.
grant usage on schema public to anon, authenticated;
grant select on table photos to anon, authenticated;
grant insert on table leads to anon, authenticated;

insert into photos (slug, title, description, alt_text, category, cloudinary_public_id, width, height, location, taken_at, featured)
values
  ('golden-hour-ridge', 'Golden Hour Ridge', 'Warm light spilling across a mountain ridge at dusk.', 'Mountain ridge glowing at golden hour', 'landscape', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 1600, 1067, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80', '2025-06-01', true),
  ('misty-forest', 'Misty Forest', 'Fog drifting between tall evergreens at first light.', 'Foggy evergreen forest at dawn', 'landscape', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', 1600, 1067, 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80', '2025-05-18', false),
  ('city-lights', 'City Lights', 'Downtown skyline shimmering after nightfall.', 'City skyline illuminated at night', 'city', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000', 1600, 1067, 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=80', '2025-04-22', true),
  ('rainy-street', 'Rainy Street', 'Reflections on a rain-soaked city street.', 'Rain-soaked city street with reflections', 'city', 'https://images.unsplash.com/photo-1493514789931-586cb221d7a7', 1600, 1067, 'https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=1600&q=80', '2025-03-30', false),
  ('new-beginnings', 'New Beginnings', 'A tender maternity portrait in soft window light.', 'Expectant mother in soft natural light', 'maternity', 'https://images.unsplash.com/photo-1519689680058-324335c77eba', 1600, 1067, 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1600&q=80', '2025-02-14', true),
  ('quiet-moment', 'Quiet Moment', 'A calm, candid maternity moment at home.', 'Candid maternity portrait at home', 'maternity', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4', 1600, 1067, 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1600&q=80', '2025-01-09', false)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  alt_text = excluded.alt_text,
  category = excluded.category,
  cloudinary_public_id = excluded.cloudinary_public_id,
  width = excluded.width,
  height = excluded.height,
  location = excluded.location,
  taken_at = excluded.taken_at,
  featured = excluded.featured;
