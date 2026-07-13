import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPhotoBySlug, SITE_NAME } from "@/lib/photos";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE_NAME} — the photographer behind the lens and the story behind the portfolio.`,
};

export default async function AboutPage() {
  const profilePhoto = await getPhotoBySlug("profilePicture");

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-xs tracking-[0.3em] uppercase text-white/40">
        About
      </p>
      <h1 className="mt-3 font-serif text-4xl text-white md:text-5xl">
        Behind the lens
      </h1>

      <div className="mt-14 flex flex-col gap-12 md:flex-row md:items-start md:gap-16">
        {profilePhoto && (
          <div className="group relative aspect-[4/5] w-full flex-shrink-0 overflow-hidden rounded-sm border border-white/10 shadow-2xl shadow-black/40 md:sticky md:top-28 md:w-72">
            <Image
              src={profilePhoto.imageUrl}
              alt={profilePhoto.alt_text || SITE_NAME}
              fill
              sizes="(max-width: 768px) 100vw, 288px"
              className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
              priority
            />
          </div>
        )}

        <div className="space-y-6 leading-relaxed text-white/60">
          <p>
            Welcome to LensCraft.
            I am a photographer drawn to what most people walk past —
            the light that lingers for a minute before it is gone,
            the expression that shows up once and never again,
            the landscape that still feels like a secret.
          </p>
          <p>
            My work moves easily between maternity, portraits, weddings,
            personal events big and small, city stories, and the wild
            landscapes of British Columbia. Different subjects, same intention:
            slow down, pay attention, and hold onto what matters.
          </p>
          <p className="font-serif text-lg italic text-white/40">
            — {SITE_NAME}
          </p>

          <div className="mt-4 border-t border-white/5 pt-10">
            <h2 className="text-xs tracking-[0.3em] uppercase text-white/40">
              Get in touch
            </h2>
            <p className="mt-3 text-white/50">
              Available for commissions, editorial work, and print inquiries.
            </p>
            <a
              href="mailto:hello@lenscraft.studio"
              className="mt-4 inline-block text-sm tracking-widest uppercase text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              vatsvaishali1@gmail.com
            </a>
            <p>
              Phone no - +14372479297
            </p>
          </div>
        </div>
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
