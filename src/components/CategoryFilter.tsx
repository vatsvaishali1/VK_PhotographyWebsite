"use client";

import type { PhotoCategory } from "@/types/photo";
import { CATEGORIES } from "@/lib/photos";

interface CategoryFilterProps {
  active: PhotoCategory;
  onChange: (category: PhotoCategory) => void;
}

export default function CategoryFilter({
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-1 sm:gap-2"
      role="group"
      aria-label="Filter photos by category"
    >
      {CATEGORIES.map((cat, index) => (
        <div key={cat.value} className="flex items-center gap-1 sm:gap-2">
          {index > 0 && (
            <span
              className="mx-1 hidden h-3 w-px bg-neutral-900/30 sm:block"
              aria-hidden="true"
            />
          )}
          <button
            type="button"
            onClick={() => onChange(cat.value)}
            aria-pressed={active === cat.value}
            className={`px-4 py-2 font-serif text-sm font-medium tracking-[0.12em] uppercase transition-colors duration-300 md:text-base ${
              active === cat.value
                ? "text-neutral-900 underline decoration-neutral-900/50 decoration-1 underline-offset-8"
                : "text-neutral-700 hover:text-neutral-900"
            }`}
          >
            {cat.label}
          </button>
        </div>
      ))}
    </div>
  );
}
