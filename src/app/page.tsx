import Hero from "@/components/Hero";
import PhotoGallery from "@/components/PhotoGallery";
import { getAllPhotos, getFeaturedPhotos } from "@/lib/photos";

export default async function HomePage() {
  const [photos, featured] = await Promise.all([
    getAllPhotos(),
    getFeaturedPhotos(),
  ]);

  return (
    <>
      <Hero featuredPhotos={featured} />

      <section id="gallery" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl text-white md:text-4xl">
            Gallery
          </h2>
          <p className="mt-3 text-sm text-white/40">
            Browse the full collection — filter by category to explore.
          </p>
        </div>

        <PhotoGallery photos={photos} />
      </section>
    </>
  );
}
