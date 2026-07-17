"use client";

import { useState } from "react";
import type { PhotoCategory, PhotoWithUrl } from "@/types/photo";
import PhotoCard from "@/components/PhotoCard";
import CategoryFilter from "@/components/CategoryFilter";

interface PhotoGalleryProps {
  photos: PhotoWithUrl[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [activeCategory, setActiveCategory] =
    useState<PhotoCategory>("maternity");

  const filtered = photos.filter((p) => p.category === activeCategory);

  return (
    <div>
      <div className="mb-10">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-[var(--color-ink)]/50">
          No photos in this category yet.
        </p>
      ) : (
        <div
          className="columns-1 gap-4 sm:columns-2 lg:columns-3"
          role="list"
          aria-label="Photo gallery"
        >
          {filtered.map((photo, index) => (
            <div key={photo.id} role="listitem">
              <PhotoCard photo={photo} priority={index < 3} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
