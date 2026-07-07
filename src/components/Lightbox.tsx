"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import type { PhotoWithUrl } from "@/types/photo";

interface LightboxProps {
  photo: PhotoWithUrl;
  onClose: () => void;
}

export default function Lightbox({ photo, onClose }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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
        className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/30 hover:text-white"
        aria-label="Close lightbox"
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

      <div
        className="relative max-h-[85vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
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
          <Link
            href={`/photo/${photo.slug}`}
            className="mt-4 inline-block text-xs tracking-widest uppercase text-white/40 underline-offset-4 transition-colors hover:text-white/70 hover:underline"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
