import type { Photo, PhotoCategory, PhotoWithUrl } from "@/types/photo";
import { getPhotoUrls } from "@/lib/cloudinary";
import {
  fetchPhotoBySlugFromDb,
  fetchPhotosFromDb,
} from "@/lib/supabase";

const DEMO_PHOTOS: Photo[] = [
  {
    id: "1",
    slug: "misty-mountain-dawn",
    title: "Misty Mountain Dawn",
    description:
      "Golden light breaks through morning fog over the alpine ridge, painting the valley in soft amber tones.",
    alt_text:
      "Sunrise over misty mountain peaks with golden light filtering through clouds",
    category: "landscape",
    cloudinary_public_id:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    width: 1600,
    height: 1067,
    location: "Swiss Alps",
    taken_at: "2025-03-15",
    featured: true,
    created_at: "2025-03-15T08:00:00Z",
  },
  {
    id: "2",
    slug: "urban-reflections",
    title: "Urban Reflections",
    description:
      "Rain-slicked streets mirror neon signs in a quiet downtown alley after midnight.",
    alt_text:
      "City street at night with neon lights reflecting on wet pavement",
    category: "city",
    cloudinary_public_id:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1600&q=80",
    width: 1600,
    height: 1067,
    location: "Tokyo, Japan",
    taken_at: "2025-02-20",
    featured: true,
    created_at: "2025-02-20T22:00:00Z",
  },
  {
    id: "3",
    slug: "portrait-in-golden-hour",
    title: "Portrait in Golden Hour",
    description:
      "A candid portrait captured during the last minutes of daylight, with warm backlight creating a natural halo.",
    alt_text:
      "Woman portrait during golden hour with warm backlight and soft bokeh",
    category: "maternity",
    cloudinary_public_id:
      "https://images.unsplash.com/photo-1531746020798-e6953b6e72e2?w=1600&q=80",
    width: 1600,
    height: 2400,
    location: "Brooklyn, NY",
    taken_at: "2025-01-10",
    featured: false,
    created_at: "2025-01-10T17:30:00Z",
  },
  {
    id: "4",
    slug: "desert-silence",
    title: "Desert Silence",
    description:
      "Endless dunes stretch toward the horizon under a vast, cloudless sky — pure stillness.",
    alt_text: "Sand dunes in a desert landscape under a clear blue sky",
    category: "landscape",
    cloudinary_public_id:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80",
    width: 1600,
    height: 1067,
    location: "Sahara, Morocco",
    taken_at: "2024-11-05",
    featured: false,
    created_at: "2024-11-05T06:00:00Z",
  },
  {
    id: "5",
    slug: "eagle-in-flight",
    title: "Eagle in Flight",
    description:
      "A bald eagle soars against a dramatic sky, wings fully extended in a moment of raw power.",
    alt_text: "Bald eagle soaring through the sky with wings spread wide",
    category: "landscape",
    cloudinary_public_id:
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1600&q=80",
    width: 1600,
    height: 1067,
    location: "Yellowstone, WY",
    taken_at: "2024-10-18",
    featured: true,
    created_at: "2024-10-18T14:00:00Z",
  },
  {
    id: "6",
    slug: "glass-and-steel",
    title: "Glass and Steel",
    description:
      "Modern architecture meets geometry — converging lines of a glass facade create an abstract urban composition.",
    alt_text:
      "Modern glass building facade with geometric lines and reflections",
    category: "city",
    cloudinary_public_id:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    width: 1600,
    height: 2400,
    location: "Chicago, IL",
    taken_at: "2024-09-22",
    featured: false,
    created_at: "2024-09-22T11:00:00Z",
  },
  {
    id: "7",
    slug: "coastal-waves",
    title: "Coastal Waves",
    description:
      "Long-exposure capture of ocean waves crashing against rugged coastal cliffs at dusk.",
    alt_text:
      "Ocean waves crashing against rocky cliffs during sunset long exposure",
    category: "landscape",
    cloudinary_public_id:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&q=80",
    width: 1600,
    height: 1067,
    location: "Big Sur, CA",
    taken_at: "2024-08-14",
    featured: false,
    created_at: "2024-08-14T19:45:00Z",
  },
  {
    id: "8",
    slug: "market-morning",
    title: "Market Morning",
    description:
      "Vendors arrange fresh produce as early light filters through the canopy of a bustling street market.",
    alt_text:
      "Street market vendors arranging produce in early morning light",
    category: "city",
    cloudinary_public_id:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80",
    width: 1600,
    height: 1067,
    location: "Marrakech, Morocco",
    taken_at: "2024-07-30",
    featured: false,
    created_at: "2024-07-30T07:15:00Z",
  },
  {
    id: "9",
    slug: "forest-path",
    title: "Forest Path",
    description:
      "A winding trail disappears into dense woodland, dappled sunlight creating patterns on the forest floor.",
    alt_text: "Winding forest trail with dappled sunlight through tree canopy",
    category: "landscape",
    cloudinary_public_id:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80",
    width: 1600,
    height: 1067,
    location: "Pacific Northwest",
    taken_at: "2024-06-12",
    featured: false,
    created_at: "2024-06-12T10:00:00Z",
  },
  {
    id: "10",
    slug: "studio-portrait",
    title: "Studio Portrait",
    description:
      "Minimal studio portrait with dramatic side lighting and a deep charcoal backdrop.",
    alt_text:
      "Studio portrait of a person with dramatic side lighting on dark background",
    category: "maternity",
    cloudinary_public_id:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80",
    width: 1600,
    height: 2400,
    location: "Studio — New York",
    taken_at: "2024-05-08",
    featured: false,
    created_at: "2024-05-08T15:00:00Z",
  },
  {
    id: "11",
    slug: "cathedral-interior",
    title: "Cathedral Interior",
    description:
      "Light streams through stained glass, casting colorful patterns across ancient stone pillars.",
    alt_text:
      "Cathedral interior with stained glass windows casting colorful light on stone pillars",
    category: "city",
    cloudinary_public_id:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=1600&q=80",
    width: 1600,
    height: 2400,
    location: "Barcelona, Spain",
    taken_at: "2024-04-19",
    featured: false,
    created_at: "2024-04-19T12:30:00Z",
  },
  {
    id: "12",
    slug: "fox-in-snow",
    title: "Fox in Snow",
    description:
      "A red fox pauses in fresh snowfall, its amber fur a vivid contrast against the white landscape.",
    alt_text: "Red fox standing in fresh snow with amber fur against white background",
    category: "landscape",
    cloudinary_public_id:
      "https://images.unsplash.com/photo-1474511320723-9a752ddbc191?w=1600&q=80",
    width: 1600,
    height: 1067,
    location: "Hokkaido, Japan",
    taken_at: "2024-03-02",
    featured: false,
    created_at: "2024-03-02T09:00:00Z",
  },
];

function enrichPhoto(photo: Photo): PhotoWithUrl {
  const isDemo = photo.cloudinary_public_id.startsWith("https://");

  if (isDemo) {
    const base = photo.cloudinary_public_id;
    return {
      ...photo,
      imageUrl: base,
      thumbnailUrl: base.replace("w=1600", "w=600"),
    };
  }

  const urls = getPhotoUrls(
    photo.cloudinary_public_id,
    photo.width,
    photo.height
  );

  return { ...photo, ...urls };
}

export async function getAllPhotos(): Promise<PhotoWithUrl[]> {
  const dbPhotos = await fetchPhotosFromDb();
  const photos = dbPhotos ?? DEMO_PHOTOS;
  return photos.map(enrichPhoto);
}

export async function getPhotoBySlug(
  slug: string
): Promise<PhotoWithUrl | null> {
  const dbPhoto = await fetchPhotoBySlugFromDb(slug);
  const photo = dbPhoto ?? DEMO_PHOTOS.find((p) => p.slug === slug) ?? null;
  return photo ? enrichPhoto(photo) : null;
}

export async function getPhotosByCategory(
  category: PhotoCategory
): Promise<PhotoWithUrl[]> {
  const all = await getAllPhotos();
  return all.filter((p) => p.category === category);
}

export async function getFeaturedPhotos(): Promise<PhotoWithUrl[]> {
  const all = await getAllPhotos();
  return all.filter((p) => p.featured);
}

export const CATEGORIES: { value: PhotoCategory; label: string }[] = [
  { value: "maternity", label: "Maternity" },
  { value: "city", label: "City" },
  { value: "landscape", label: "Landscape" },
];

export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "LensCraft";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
