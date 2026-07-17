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
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-[var(--color-surface)]">
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

      {/* Soft cinematic grade — keeps color in the photo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,23,20,0.08)_0%,rgba(26,23,20,0.42)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-surface)]/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/55 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-36 md:pb-20">
        <div className="hero-copy max-w-3xl">
          <h1 className="font-serif text-6xl font-light tracking-[0.04em] text-[var(--color-mist)] md:text-8xl md:tracking-[0.06em]">
            {SITE_NAME}
          </h1>

          <p className="mt-5 max-w-xl font-serif text-2xl font-light italic leading-snug text-[var(--color-mist)]/90 md:text-3xl">
            Capturing moments that tell stories
          </p>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--color-mist)]/60 md:text-base">
            Maternity, city, and landscape photography — crafted with
            intention.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#gallery"
              className="inline-flex items-center bg-[var(--color-mist)] px-7 py-3 text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-ink)] transition-colors duration-300 hover:bg-white"
            >
              Explore Gallery
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center border border-[var(--color-mist)]/30 px-7 py-3 text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-mist)]/85 transition-colors duration-300 hover:border-[var(--color-mist)]/60 hover:text-[var(--color-mist)]"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
