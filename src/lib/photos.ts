import type { Photo, PhotoCategory, PhotoWithUrl } from "@/types/photo";
import {
  fetchPhotoBySlugFromDb,
  fetchPhotosFromDb,
} from "@/lib/supabase";

function isHttpUrl(value: string | null | undefined): boolean {
  return Boolean(value && /^https?:\/\//i.test(value));
}

function isLikelyImageValue(value: string | null | undefined): boolean {
  if (!value) return false;

  const trimmed = value.trim();
  return (
    isHttpUrl(trimmed) ||
    trimmed.startsWith("storage/") ||
    trimmed.startsWith("PhotographyWebsite/")
  );
}

function normalizeDisplayLocation(
  location: string | null | undefined
): string | null {
  if (!location) return null;
  return isLikelyImageValue(location) ? null : location;
}

function buildPublicUrl(value: string | null | undefined): string {
  if (!value) return "";

  const trimmed = value.trim();
  if (!trimmed) return "";

  if (isHttpUrl(trimmed)) {
    return trimmed;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl) {
    return trimmed;
  }

  return `${baseUrl}/storage/v1/object/public/${trimmed.replace(/^\/+/, "")}`;
}

function resolvePhotoUrl(photo: Photo): string {
  const candidates = [
    photo.location,
    photo.image_url,
    photo.image_path,
    photo.cloudinary_public_id,
    photo.thumbnail_url,
    photo.thumbnail_path,
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;

    const value = candidate.trim();
    if (!value) continue;

    if (isHttpUrl(value)) {
      return value;
    }

    if (value.startsWith("storage/") || value.startsWith("PhotographyWebsite/")) {
      return buildPublicUrl(value);
    }
  }

  return "";
}

function enrichPhoto(photo: Photo): PhotoWithUrl {
  const imageUrl = resolvePhotoUrl(photo);

  return {
    ...photo,
    imageUrl,
    thumbnailUrl: imageUrl,
    location: normalizeDisplayLocation(photo.location),
  };
}

export async function getAllPhotos(): Promise<PhotoWithUrl[]> {
  const dbPhotos = await fetchPhotosFromDb();
  return (dbPhotos ?? []).map(enrichPhoto);
}

export async function getPhotoBySlug(
  slug: string
): Promise<PhotoWithUrl | null> {
  const dbPhoto = await fetchPhotoBySlugFromDb(slug);
  return dbPhoto ? enrichPhoto(dbPhoto) : null;
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

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "LensCraft";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";