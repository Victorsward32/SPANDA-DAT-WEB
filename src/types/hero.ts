export interface OptimizedImage {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
}

interface SlideBase<Image> {
  id: string;
  label: string;
  image: Image;
  imageAlt: string;
}

export interface OverviewSlide<Image = OptimizedImage> extends SlideBase<Image> {
  kind: 'overview';
  title: string;
  accentTitle: string;
  features: { title: string; description: string; tone: 'blue' | 'green' }[];
  metrics: { value: string; suffix?: string; label: string; detail: string }[];
}

export interface SceneSlide<Image = OptimizedImage> extends SlideBase<Image> {
  kind: 'scene';
  captionPlacement: 'top-left' | 'top-center';
  compactLabel?: string;
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  chips: string[];
}

export type HeroSlide<Image = OptimizedImage> = OverviewSlide<Image> | SceneSlide<Image>;
