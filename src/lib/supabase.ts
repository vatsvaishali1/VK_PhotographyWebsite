import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Photo } from "@/types/photo";

let supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes("your-project")) {
    return null;
  }

  if (!supabase) {
    supabase = createClient(url, key);
  }

  return supabase;
}

export async function fetchPhotosFromDb(): Promise<Photo[] | null> {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from("photos")
    .select("*")
    .order("taken_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error.message);
    return null;
  }

  return data as Photo[];
}

export async function fetchPhotoBySlugFromDb(
  slug: string
): Promise<Photo | null> {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from("photos")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Supabase fetch error:", error.message);
    return null;
  }

  return data as Photo;
}
