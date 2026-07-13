import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactEmailButton from "@/components/ContactEmailButton";
import { getPhotoBySlug, SITE_NAME } from "@/lib/photos";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE_NAME} — the photographer behind the lens and the story behind the portfolio.`,
};

const EMAIL = "vatsvaishali1@gmail.com";
const PHONE = "+1 (437) 247-9297";
const PHONE_HREF = "tel:+14372479297";

export default async function AboutPage() {
  const profilePhoto = await getPhotoBySlug("profilePicture");

  return (
    <div className="bg-neutral-950">
      {/* Intro */}
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 md:pt-40 md:pb-20">
        <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-[#c4a574]">
          About
        </p>
        <h1 className="mt-4 max-w-2xl font-serif text-5xl font-light italic leading-[1.15] tracking-[0.01em] text-[#f2ece3] md:text-7xl">
          Behind the lens
        </h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/50 md:text-base">
          Stories told through light — maternity, city, and landscape
          photography crafted with intention.
        </p>
      </section>

      {/* Soft transition into content */}
      <div
        className="h-24 bg-gradient-to-b from-neutral-950 via-[#5c564e] to-[#c4bcb2] sm:h-28"
        aria-hidden="true"
      />

      {/* Portrait + bio */}
      <section className="bg-[#c4bcb2]">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-16 md:py-20 lg:gap-20">
          {profilePhoto ? (
            <div className="relative mx-auto w-full max-w-md md:mx-0 md:max-w-none">
              <div className="group relative aspect-[4/5] overflow-hidden bg-neutral-500/20">
                <Image
                  src={profilePhoto.imageUrl}
                  alt={profilePhoto.alt_text || SITE_NAME}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  priority
                />
              </div>
              <p className="mt-4 font-serif text-sm tracking-wide text-neutral-700">
                {SITE_NAME}
              </p>
            </div>
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center bg-neutral-500/20 font-serif text-neutral-600">
              {SITE_NAME}
            </div>
          )}

          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-3xl font-light text-neutral-900 md:text-4xl">
              A quieter way of seeing
            </h2>

            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-neutral-700 md:text-base">
              <p>
                Welcome to {SITE_NAME}. I am a photographer drawn to what most
                people walk past — the light that lingers for a minute before it
                is gone, the expression that shows up once and never again, the
                landscape that still feels like a secret.
              </p>
              <p>
                My work moves easily between maternity, portraits, weddings,
                personal events big and small, city stories, and the wild
                landscapes of British Columbia. Different subjects, same
                intention: slow down, pay attention, and hold onto what matters.
              </p>
            </div>

            <p className="mt-10 font-serif text-xl font-light italic text-[#5c3d2e]">
              — {SITE_NAME}
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-neutral-900/10 bg-[#bdb5aa]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-end md:gap-16">
            <div>
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-neutral-700">
                Get in touch
              </p>
              <h2 className="mt-3 font-serif text-3xl font-light text-neutral-900 md:text-4xl">
                Let&apos;s create something lasting
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-700">
                Available for commissions, editorial work, and print inquiries.
              </p>
            </div>

            <div className="space-y-5">
              <a
                href={`mailto:${EMAIL}`}
                className="block font-serif text-xl text-neutral-900 transition-colors hover:text-[#5c3d2e] md:text-2xl"
              >
                {EMAIL}
              </a>
              <a
                href={PHONE_HREF}
                className="block text-sm tracking-[0.08em] text-neutral-700 transition-colors hover:text-neutral-900"
              >
                {PHONE}
              </a>

              <div className="flex flex-wrap gap-3 pt-2">
                <ContactEmailButton className="inline-flex items-center bg-neutral-900 px-6 py-3 text-[11px] font-medium tracking-[0.2em] uppercase text-[#c4bcb2] transition-colors hover:bg-neutral-800">
                  Send a message
                </ContactEmailButton>
                <Link
                  href="/#gallery"
                  className="inline-flex items-center border border-neutral-900/25 px-6 py-3 text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-800 transition-colors hover:border-neutral-900/50 hover:text-neutral-950"
                >
                  View gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="h-16 bg-gradient-to-b from-[#bdb5aa] to-neutral-950"
        aria-hidden="true"
      />
    </div>
  );
}
