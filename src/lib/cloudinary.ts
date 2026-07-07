const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function isCloudinaryConfigured(): boolean {
  return Boolean(CLOUD_NAME && !CLOUD_NAME.includes("your-cloud"));
}

export function buildCloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    crop?: "fill" | "fit" | "scale" | "limit";
  } = {}
): string {
  const { width, height, quality = 80, crop = "limit" } = options;

  if (!isCloudinaryConfigured()) {
    return publicId;
  }

  const transforms: string[] = [`q_${quality}`, `f_auto`, `c_${crop}`];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(",")}/${publicId}`;
}

export function getPhotoUrls(publicId: string, width: number, height: number) {
  return {
    imageUrl: buildCloudinaryUrl(publicId, { width: 1600, quality: 85 }),
    thumbnailUrl: buildCloudinaryUrl(publicId, {
      width: 600,
      height: Math.round((600 * height) / width),
      crop: "fill",
      quality: 75,
    }),
  };
}
