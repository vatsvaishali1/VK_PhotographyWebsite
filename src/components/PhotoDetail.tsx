"use client";

import Image from "next/image";
import { useState } from "react";
import type { PhotoWithUrl } from "@/types/photo";
import Lightbox from "@/components/Lightbox";

interface PhotoDetailProps {
  photo: PhotoWithUrl;
}

export default function PhotoDetail({ photo }: PhotoDetailProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const formattedDate = new Date(photo.taken_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <article className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="group relative block w-full overflow-hidden rounded-sm"
          aria-label={`Open full-size view of ${photo.title}`}
        >
          <Image
            src={photo.imageUrl}
            alt={photo.alt_text}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 1024px) 100vw, 80vw"
            priority
            className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
            <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs tracking-widest uppercase text-white/0 backdrop-blur-sm transition-all duration-300 group-hover:text-white/80">
              View fullscreen
            </span>
          </div>
        </button>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="font-serif text-3xl text-white md:text-4xl">
              {photo.title}
            </h1>
            <p className="mt-4 leading-relaxed text-white/60">
              {photo.description}
            </p>
          </div>

          <aside className="space-y-4 border-t border-white/5 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <div>
              <dt className="text-xs tracking-widest uppercase text-white/30">
                Category
              </dt>
              <dd className="mt-1 capitalize text-white/70">
                {photo.category}
              </dd>
            </div>
            {photo.location && (
              <div>
                <dt className="text-xs tracking-widest uppercase text-white/30">
                  Location
                </dt>
                <dd className="mt-1 text-white/70">{photo.location}</dd>
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
      </article>

      {lightboxOpen && (
        <Lightbox photo={photo} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
}
