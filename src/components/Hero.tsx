import Image from "next/image";
import Link from "next/link";
import type { PhotoWithUrl } from "@/types/photo";

interface HeroProps {
  featuredPhotos: PhotoWithUrl[];
}

export default function Hero({ featuredPhotos }: HeroProps) {
  const heroPhoto = featuredPhotos[0];

  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden">
      {heroPhoto && (
        <Image
          src={heroPhoto.imageUrl}
          alt={heroPhoto.alt_text}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/20" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32">
        <p className="text-xs tracking-[0.3em] uppercase text-white/50">
          Photography Portfolio
        </p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight text-white md:text-6xl">
          Capturing moments that tell stories
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60">
          A curated collection of maternity, city, and landscape
          photography — each frame crafted with intention.
        </p>
        <Link
          href="#gallery"
          className="mt-8 inline-block border border-white/20 px-6 py-2.5 text-xs tracking-widest uppercase text-white/70 transition-all hover:border-white/40 hover:text-white"
        >
          Explore Gallery
        </Link>
      </div>
    </section>
  );
}
