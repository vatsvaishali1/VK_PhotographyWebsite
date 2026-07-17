import { SITE_NAME } from "@/lib/photos";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="font-serif text-sm text-[var(--color-mist)]/45">
          &copy; {year} {SITE_NAME}. All rights reserved.
        </p>
        <p className="text-xs tracking-widest uppercase text-[var(--color-mist)]/30">
          Crafted with light &amp; lens
        </p>
      </div>
    </footer>
  );
}
