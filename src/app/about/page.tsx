import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/photos";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE_NAME} — the photographer behind the lens and the story behind the portfolio.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-xs tracking-[0.3em] uppercase text-white/40">
        About
      </p>
      <h1 className="mt-3 font-serif text-4xl text-white md:text-5xl">
        Behind the lens
      </h1>

      <div className="mt-10 space-y-6 leading-relaxed text-white/60">
        <p>
          Welcome to {SITE_NAME}. I&apos;m a photographer drawn to the quiet
          moments — the light that only lasts a few minutes, the expression
          that appears once, the landscape that feels untouched.
        </p>
        <p>
          This portfolio spans maternity, city, and landscape work. Each image is captured with care and presented
          with full alt-text descriptions for accessibility and search engine
          visibility.
        </p>
        <p>
          The site is built with Next.js for blazing-fast image delivery via
          Cloudinary&apos;s CDN, with photo metadata stored in Supabase
          PostgreSQL. Images are lazy-loaded as you scroll, optimized to
          WebP/AVIF, and served in responsive layouts that adapt to any screen.
        </p>
      </div>

      <div className="mt-12 border-t border-white/5 pt-10">
        <h2 className="font-serif text-xl text-white">Get in touch</h2>
        <p className="mt-3 text-white/50">
          Available for commissions, editorial work, and print inquiries.
        </p>
        <a
          href="mailto:hello@lenscraft.studio"
          className="mt-4 inline-block text-sm tracking-widest uppercase text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          hello@lenscraft.studio
        </a>
      </div>

      <Link
        href="/"
        className="mt-12 inline-block text-xs tracking-widest uppercase text-white/30 transition-colors hover:text-white/60"
      >
        &larr; Back to gallery
      </Link>
    </div>
  );
}
