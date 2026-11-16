import type { OptimizedImage } from '@/types/hero';

interface Props {
  image: OptimizedImage;
  alt: string;
  priority?: boolean;
  className?: string;
}

export default function HeroImage({ image, alt, priority = false, className }: Props) {
  return (
    <img
      {...image}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      draggable={false}
    />
  );
}
