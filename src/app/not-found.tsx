import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-28 text-center">
      <p className="text-xs tracking-[0.3em] uppercase text-white/30">404</p>
      <h1 className="mt-3 font-serif text-3xl text-white">Photo not found</h1>
      <p className="mt-3 text-sm text-white/40">
        The image you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 border border-white/15 px-6 py-2.5 text-xs tracking-widest uppercase text-white/60 transition-colors hover:border-white/30 hover:text-white"
      >
        Return to gallery
      </Link>
    </div>
  );
}
