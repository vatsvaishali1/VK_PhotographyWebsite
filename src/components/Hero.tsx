import Image from "next/image";
import Link from "next/link";
import type { PhotoWithUrl } from "@/types/photo";
import { SITE_NAME } from "@/lib/photos";

interface HeroProps {
  featuredPhotos: PhotoWithUrl[];
}

const FALLBACK_HERO = {
  imageUrl:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=80",
  alt_text: "Misty mountain peaks at dawn",
};

export default function Hero({ featuredPhotos }: HeroProps) {
  const preferred =
    featuredPhotos.find((photo) => photo.category === "landscape") ??
    featuredPhotos[0];

  const heroPhoto = preferred
    ? { imageUrl: preferred.imageUrl, alt_text: preferred.alt_text }
    : FALLBACK_HERO;

  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroPhoto.imageUrl}
          alt={heroPhoto.alt_text}
          fill
          sizes="100vw"
          priority
          className="hero-image object-cover object-center"
        />
      </div>

      {/* Cinematic overlays — keep the photo readable without flattening it */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.35)_70%,rgba(10,10,10,0.75)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/55 to-neutral-950/25" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-neutral-950/70 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-36 md:pb-28">
        <div className="hero-copy max-w-3xl">
          <h1 className="font-serif text-6xl font-light tracking-[0.04em] text-[#f2ece3] md:text-8xl md:tracking-[0.06em]">
            {SITE_NAME}
          </h1>

          <p className="mt-5 max-w-xl font-serif text-2xl font-light italic leading-snug text-[#ebe4d8]/90 md:text-3xl">
            Capturing moments that tell stories
          </p>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55 md:text-base">
            Maternity, city, and landscape photography — crafted with
            intention.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#gallery"
              className="inline-flex items-center bg-[#f2ece3] px-7 py-3 text-[11px] font-medium tracking-[0.22em] uppercase text-neutral-950 transition-colors duration-300 hover:bg-white"
            >
              Explore Gallery
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center border border-white/25 px-7 py-3 text-[11px] font-medium tracking-[0.22em] uppercase text-[#f2ece3]/80 transition-colors duration-300 hover:border-white/50 hover:text-[#f2ece3]"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
