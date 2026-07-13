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

      {/* Soft bridge from dark hero into gallery stone */}
      <div
        className="h-28 bg-gradient-to-b from-neutral-950 via-[#5c564e] to-[#c4bcb2] sm:h-36"
        aria-hidden="true"
      />

      <section id="gallery" className="bg-[#c4bcb2]">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-4">
          <div className="mb-14 text-center">
            <h2 className="font-serif text-4xl font-medium tracking-wide text-[#3f342b] md:text-5xl">
              Gallery
            </h2>
            <p className="mt-3 text-sm text-neutral-700/70">
              Browse the full collection — filter by category to explore.
            </p>
          </div>

          <PhotoGallery photos={photos} />
        </div>
      </section>

      {/* Soft bridge from gallery into dark footer */}
      <div
        className="h-20 bg-gradient-to-b from-[#c4bcb2] to-neutral-950"
        aria-hidden="true"
      />
    </>
  );
}
