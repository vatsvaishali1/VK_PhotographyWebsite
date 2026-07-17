import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PhotoDetail from "@/components/PhotoDetail";
import { getGalleryPhotos, getPhotoBySlug, SITE_NAME } from "@/lib/photos";

interface PhotoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const photos = await getGalleryPhotos();
  return photos.map((photo) => ({ slug: photo.slug }));
}

export async function generateMetadata({
  params,
}: PhotoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const photo = await getPhotoBySlug(slug);

  if (!photo) return { title: "Photo Not Found" };

  return {
    title: photo.title,
    description: photo.description,
    openGraph: {
      title: `${photo.title} | ${SITE_NAME}`,
      description: photo.description,
      images: [
        {
          url: photo.imageUrl,
          width: photo.width,
          height: photo.height,
          alt: photo.alt_text,
        },
      ],
    },
  };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { slug } = await params;
  const [photo, photos] = await Promise.all([
    getPhotoBySlug(slug),
    getGalleryPhotos(),
  ]);

  if (!photo) notFound();

  return (
    <div className="mx-auto max-w-7xl px-6 pt-28 pb-12">
      <PhotoDetail photo={photo} photos={photos} />
    </div>
  );
}
