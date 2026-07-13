import Image from "next/image";
import Link from "next/link";
import { getPhotoBySlug, SITE_NAME } from "@/lib/photos";

const NAV_LINKS = [
  { href: "/#gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

export default async function Header() {
  const logoPhoto = await getPhotoBySlug("profilePicture");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-neutral-950/90 via-neutral-950/50 to-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="group flex items-center gap-3">
          {logoPhoto ? (
            <Image
              src={logoPhoto.imageUrl}
              alt={logoPhoto.alt_text || SITE_NAME}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover ring-1 ring-white/15 transition-opacity group-hover:opacity-90"
              priority
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors group-hover:border-white/30">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 text-white/70"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 2v2M12 20v2M2 12h2M20 12h2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}
          <span className="font-serif text-lg tracking-[0.08em] text-[#f2ece3]">
            {SITE_NAME}
          </span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[11px] tracking-[0.22em] uppercase text-white/55 transition-colors duration-300 hover:text-[#f2ece3]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
