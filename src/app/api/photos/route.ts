import { NextResponse } from "next/server";
import { getAllPhotos } from "@/lib/photos";

export async function GET() {
  const photos = await getAllPhotos();

  return NextResponse.json(
    photos.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      alt_text: p.alt_text,
      thumbnailUrl: p.thumbnailUrl,
      taken_at: p.taken_at,
    }))
  );
}
