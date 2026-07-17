"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { PhotoWithUrl } from "@/types/photo";

interface LightboxProps {
  photos: PhotoWithUrl[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({
  photos,
  initialIndex,
  onClose,
}: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  const photo = photos[index] ?? photos[0];
  const hasMultiple = photos.length > 1;

  const goPrev = useCallback(() => {
    if (!hasMultiple) return;
    setIndex((current) => (current - 1 + photos.length) % photos.length);
  }, [hasMultiple, photos.length]);

  const goNext = useCallback(() => {
    if (!hasMultiple) return;
    setIndex((current) => (current + 1) % photos.length);
  }, [hasMultiple, photos.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    },
    [onClose, goPrev, goNext]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const counter = useMemo(
    () => `${index + 1} / ${photos.length}`,
    [index, photos.length]
  );

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${photo.title}`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white transition-colors hover:border-white/50 hover:bg-black/70"
        aria-label="Close fullscreen"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute top-1/2 left-3 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white transition-colors hover:border-white/50 hover:bg-black/70 md:left-6"
            aria-label="Previous photo"
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

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute top-1/2 right-3 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white transition-colors hover:border-white/50 hover:bg-black/70 md:right-6"
            aria-label="Next photo"
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
        </>
      )}

      <div
        className="relative max-h-[85vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={photo.id}
          src={photo.imageUrl}
          alt={photo.alt_text}
          width={photo.width}
          height={photo.height}
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="max-h-[85vh] w-auto object-contain"
          priority
        />

        <div className="mt-6 text-center">
          <h2 className="font-serif text-xl text-white">{photo.title}</h2>
          {photo.location && (
            <p className="mt-1 text-xs tracking-widest uppercase text-white/50">
              {photo.location}
            </p>
          )}
          {hasMultiple && (
            <p className="mt-3 text-xs tracking-widest uppercase text-white/40">
              {counter}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
