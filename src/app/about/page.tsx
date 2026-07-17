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
    <div className="bg-[var(--color-surface)]">
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 md:pt-40 md:pb-20">
        <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-[var(--color-accent)]">
          About
        </p>
        <h1 className="mt-4 max-w-2xl font-serif text-5xl font-light italic leading-[1.15] tracking-[0.01em] text-[var(--color-mist)] md:text-7xl">
          Behind the lens
        </h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-[var(--color-mist)]/55 md:text-base">
          Stories told through light — maternity, city, and landscape
          photography crafted with intention.
        </p>
      </section>

      <div className="site-bridge-hero" aria-hidden="true" />

      <section className="bg-[var(--color-panel)]">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-16 md:py-20 lg:gap-20">
          {profilePhoto ? (
            <div className="relative mx-auto w-full max-w-md md:mx-0 md:max-w-none">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-black/10">
                <Image
                  src={profilePhoto.imageUrl}
                  alt={profilePhoto.alt_text || SITE_NAME}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  priority
                />
              </div>
              <p className="mt-4 font-serif text-sm tracking-wide text-[var(--color-ink)]/80">
                {SITE_NAME}
              </p>
            </div>
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center bg-black/10 font-serif text-[var(--color-ink)]/60">
              {SITE_NAME}
            </div>
          )}

          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-3xl font-light text-[var(--color-ink)] md:text-4xl">
              A quieter way of seeing
            </h2>

            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-[var(--color-ink)]/75 md:text-base">
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

      <section className="border-t border-[var(--color-ink)]/10 bg-[var(--color-panel-deep)]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-end md:gap-16">
            <div>
              <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-[var(--color-mist)]/70">
                Get in touch
              </p>
              <h2 className="mt-3 font-serif text-3xl font-light text-[var(--color-mist)] md:text-4xl">
                Let&apos;s create something lasting
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--color-mist)]/65">
                Available for commissions, editorial work, and print inquiries.
              </p>
            </div>

            <div className="space-y-5">
              <a
                href={`mailto:${EMAIL}`}
                className="block font-serif text-xl text-[var(--color-mist)] transition-colors hover:text-[var(--color-accent)] md:text-2xl"
              >
                {EMAIL}
              </a>
              <a
                href={PHONE_HREF}
                className="block text-sm tracking-[0.08em] text-[var(--color-mist)]/70 transition-colors hover:text-[var(--color-mist)]"
              >
                {PHONE}
              </a>

              <div className="flex flex-wrap gap-3 pt-2">
                <ContactEmailButton className="inline-flex items-center bg-[var(--color-mist)] px-6 py-3 text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink)] transition-colors hover:bg-white">
                  Send a message
                </ContactEmailButton>
                <Link
                  href="/#gallery"
                  className="inline-flex items-center border border-[var(--color-mist)]/30 px-6 py-3 text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--color-mist)]/85 transition-colors hover:border-[var(--color-mist)]/60"
                >
                  View gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="h-24 bg-gradient-to-b from-[var(--color-panel-deep)] via-[#3f3a34] to-[var(--color-surface)]"
        aria-hidden="true"
      />
    </div>
  );
}
