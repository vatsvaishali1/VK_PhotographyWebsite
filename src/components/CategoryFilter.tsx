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
      className="flex flex-wrap justify-center gap-2"
      role="group"
      aria-label="Filter photos by category"
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          type="button"
          onClick={() => onChange(cat.value)}
          aria-pressed={active === cat.value}
          className={`rounded-full px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-300 ${
            active === cat.value
              ? "bg-white text-neutral-950"
              : "border border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
