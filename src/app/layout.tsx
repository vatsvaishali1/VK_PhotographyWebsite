import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/photos";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Photography Portfolio`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "A curated photography portfolio featuring maternity, city, and landscape photography.",
  keywords: [
    "photography",
    "portfolio",
    "landscape",
    "maternity",
    "city photography",
    "landscape",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Photography Portfolio`,
    description:
      "A curated photography portfolio featuring maternity, city, and landscape photography.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Photography Portfolio`,
    description:
      "A curated photography portfolio featuring maternity, city, and landscape photography.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-neutral-950 text-white antialiased"
        suppressHydrationWarning
      >
        <Header />
        <main className="min-h-screen pt-[73px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
