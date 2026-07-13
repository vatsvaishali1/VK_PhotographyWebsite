export type PhotoCategory = "maternity" | "city" | "landscape";

export interface Photo {
  id: string;
  slug: string;
  title: string;
  description: string;
  alt_text: string;
  category: PhotoCategory;
  cloudinary_public_id: string;
  image_url?: string | null;
  image_path?: string | null;
  thumbnail_url?: string | null;
  thumbnail_path?: string | null;
  width: number;
  height: number;
  location: string | null;
  taken_at: string;
  featured: boolean;
  created_at: string;
}

export interface PhotoWithUrl extends Photo {
  imageUrl: string;
  thumbnailUrl: string;
}