"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { PhotoWithUrl } from "@/types/photo";
import Lightbox from "@/components/Lightbox";

interface PhotoDetailProps {
  photo: PhotoWithUrl;
  photos: PhotoWithUrl[];
}

export default function PhotoDetail({ photo, photos }: PhotoDetailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const gallery = useMemo(() => {
    const sameCategory = photos.filter(
      (item) =>
        item.category === photo.category &&
        item.slug &&
        !/\s/.test(item.slug)
    );
    if (sameCategory.length > 0) return sameCategory;

    const safePhotos = photos.filter(
      (item) => item.slug && !/\s/.test(item.slug)
    );
    if (safePhotos.length > 0) return safePhotos;

    return [photo];
  }, [photos, photo]);

  const initialIndex = useMemo(() => {
    const index = gallery.findIndex((item) => item.slug === photo.slug);
    return index >= 0 ? index : 0;
  }, [gallery, photo.slug]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const currentPhoto = gallery[currentIndex] ?? photo;
  const hasMultiple = gallery.length > 1;

  const prevIndex = hasMultiple
    ? (currentIndex - 1 + gallery.length) % gallery.length
    : null;
  const nextIndex = hasMultiple
    ? (currentIndex + 1) % gallery.length
    : null;

  const prevPhoto = prevIndex !== null ? gallery[prevIndex] : null;
  const nextPhoto = nextIndex !== null ? gallery[nextIndex] : null;

  const goToIndex = useCallback(
    (index: number) => {
      const target = gallery[index];
      if (!target) return;

      setCurrentIndex(index);
      // Update the URL locally — no full page/server reload on each click
      window.history.replaceState(
        null,
        "",
        `/photo/${encodeURIComponent(target.slug)}`
      );
    },
    [gallery]
  );

  const goPrev = useCallback(() => {
    if (prevIndex === null) return;
    goToIndex(prevIndex);
  }, [goToIndex, prevIndex]);

  const goNext = useCallback(() => {
    if (nextIndex === null) return;
    goToIndex(nextIndex);
  }, [goToIndex, nextIndex]);

  // Prefetch neighboring images in the browser cache
  useEffect(() => {
    if (typeof window === "undefined") return;

    [prevPhoto, nextPhoto].forEach((neighbor) => {
      if (!neighbor?.imageUrl) return;
      const img = new window.Image();
      img.src = neighbor.imageUrl;
    });
  }, [prevPhoto, nextPhoto]);

  useEffect(() => {
    if (lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext, lightboxOpen]);

  const formattedDate = new Date(currentPhoto.taken_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <>
      <article className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href="/#gallery"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/45 transition-colors hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Close / Gallery
          </Link>

          {hasMultiple && (
            <p className="text-xs tracking-[0.2em] uppercase text-white/35">
              {currentIndex + 1} / {gallery.length}
            </p>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group relative block w-full overflow-hidden rounded-sm"
            aria-label={`Open full-size view of ${currentPhoto.title}`}
          >
            <Image
              key={currentPhoto.id}
              src={currentPhoto.imageUrl}
              alt={currentPhoto.alt_text}
              width={currentPhoto.width}
              height={currentPhoto.height}
              sizes="(max-width: 1024px) 100vw, 80vw"
              priority
              className="w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
              <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs tracking-widest uppercase text-white/0 backdrop-blur-sm transition-all duration-300 group-hover:text-white/80">
                View fullscreen
              </span>
            </div>
          </button>

          {/* Hidden prefetch for next/prev via next/image */}
          {prevPhoto && (
            <Image
              src={prevPhoto.imageUrl}
              alt=""
              width={prevPhoto.width}
              height={prevPhoto.height}
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="pointer-events-none absolute h-0 w-0 opacity-0"
              aria-hidden="true"
            />
          )}
          {nextPhoto && (
            <Image
              src={nextPhoto.imageUrl}
              alt=""
              width={nextPhoto.width}
              height={nextPhoto.height}
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="pointer-events-none absolute h-0 w-0 opacity-0"
              aria-hidden="true"
            />
          )}

          {prevPhoto && (
            <button
              type="button"
              onClick={goPrev}
              className="absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white transition-colors hover:border-white/50 hover:bg-black/70 md:left-4"
              aria-label={`Previous photo: ${prevPhoto.title}`}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {nextPhoto && (
            <button
              type="button"
              onClick={goNext}
              className="absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white transition-colors hover:border-white/50 hover:bg-black/70 md:right-4"
              aria-label={`Next photo: ${nextPhoto.title}`}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="font-serif text-3xl text-white md:text-4xl">
              {currentPhoto.title}
            </h1>
            <p className="mt-4 leading-relaxed text-white/60">
              {currentPhoto.description}
            </p>
          </div>

          <aside className="space-y-4 border-t border-white/5 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <div>
              <dt className="text-xs tracking-widest uppercase text-white/30">
                Category
              </dt>
              <dd className="mt-1 capitalize text-white/70">
                {currentPhoto.category}
              </dd>
            </div>
            {currentPhoto.location && (
              <div>
                <dt className="text-xs tracking-widest uppercase text-white/30">
                  Location
                </dt>
                <dd className="mt-1 text-white/70">{currentPhoto.location}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs tracking-widest uppercase text-white/30">
                Date
              </dt>
              <dd className="mt-1 text-white/70">{formattedDate}</dd>
            </div>
          </aside>
        </div>

        {(prevPhoto || nextPhoto) && (
          <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/5 pt-6">
            {prevPhoto ? (
              <button
                type="button"
                onClick={goPrev}
                className="text-left text-xs tracking-[0.18em] uppercase text-white/45 transition-colors hover:text-white"
              >
                ← {prevPhoto.title}
              </button>
            ) : (
              <span />
            )}
            {nextPhoto ? (
              <button
                type="button"
                onClick={goNext}
                className="text-right text-xs tracking-[0.18em] uppercase text-white/45 transition-colors hover:text-white"
              >
                {nextPhoto.title} →
              </button>
            ) : (
              <span />
            )}
          </div>
        )}
      </article>

      {lightboxOpen && (
        <Lightbox
          photos={gallery}
          initialIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
