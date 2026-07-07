import Link from "next/link";
import { SITE_NAME } from "@/lib/photos";

const NAV_LINKS = [
  { href: "/", label: "Gallery" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-white/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-white/70"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M12 2v2M12 20v2M2 12h2M20 12h2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="font-serif text-lg tracking-wide text-white">
            {SITE_NAME}
          </span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm tracking-widest uppercase text-white/50 transition-colors hover:text-white"
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
