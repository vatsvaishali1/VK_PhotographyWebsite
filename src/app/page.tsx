import Hero from "@/components/Hero";
import PhotoGallery from "@/components/PhotoGallery";
import { getGalleryPhotos, getFeaturedPhotos } from "@/lib/photos";

export default async function HomePage() {
  const [photos, featured] = await Promise.all([
    getGalleryPhotos(),
    getFeaturedPhotos(),
  ]);

  return (
    <>
      <Hero featuredPhotos={featured} />

      <div className="site-bridge-hero" aria-hidden="true" />

      <section id="gallery" className="bg-[var(--color-panel)]">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-2">
          <div className="mb-14 text-center">
            <h2 className="font-serif text-4xl font-medium tracking-wide text-[var(--color-ink)] md:text-5xl">
              Gallery
            </h2>
            <p className="mt-3 text-sm text-[var(--color-surface)]/70">
              Browse the full collection — filter by category to explore.
            </p>
          </div>

          <PhotoGallery photos={photos} />
        </div>
      </section>

      <div className="site-bridge-footer" aria-hidden="true" />
    </>
  );
}
