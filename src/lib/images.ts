import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import type { OptimizedImage } from '@/types/hero';

export async function optimizeImage(
  image: ImageMetadata,
  widths: number[],
  sizes: string,
): Promise<OptimizedImage> {
  // Avoid larger downloads that only upscale the source image.
  const outputWidths = [...new Set(widths.map((width) => Math.min(width, image.width)))];
  const variants = await Promise.all(outputWidths.map(async (width) => {
    const result = await getImage({ src: image, width, format: 'webp', quality: 85 });
    return { src: result.src, width, height: Number(result.attributes.height) };
  }));
  const largest = variants[variants.length - 1];

  return {
    ...largest,
    srcSet: variants.map((variant) => `${variant.src} ${variant.width}w`).join(', '),
    sizes,
  };
}
