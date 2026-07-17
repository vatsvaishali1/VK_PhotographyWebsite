"use client";

import Image from "next/image";
import Link from "next/link";
import type { PhotoWithUrl } from "@/types/photo";

interface PhotoCardProps {
  photo: PhotoWithUrl;
  priority?: boolean;
}

export default function PhotoCard({ photo, priority = false }: PhotoCardProps) {
  return (
    <Link
      href={`/photo/${encodeURIComponent(photo.slug)}`}
      className="group relative mb-4 block break-inside-avoid overflow-hidden rounded-sm bg-neutral-900"
    >
      <Image
        src={photo.thumbnailUrl}
        alt={photo.alt_text}
        width={photo.width}
        height={photo.height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="font-serif text-base text-white">{photo.title}</h3>
        {photo.location && (
          <p className="mt-1 text-xs tracking-wider uppercase text-white/60">
            {photo.location}
          </p>
        )}
      </div>
    </Link>
  );
}
