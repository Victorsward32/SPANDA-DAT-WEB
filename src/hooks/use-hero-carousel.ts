import { useCallback, useEffect, useState } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';

export function useHeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const pause = useCallback(function pause(): void {
    setIsPlaying(false);
  }, []);

  const goTo = useCallback(function goTo(index: number): void {
    setIsPlaying(false);
    if (api) {
      const count = api.scrollSnapList().length;
      api.scrollTo(((index % count) + count) % count);
    }
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const carousel = api;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function updateSelected(): void {
      setSelected(carousel.selectedScrollSnap());
    }

    function updateMotion(): void {
      carousel.reInit({ duration: motion.matches ? 0 : 32 });
      if (motion.matches) pause();
    }

    function handleVisibility(): void {
      if (document.hidden) pause();
    }

    updateSelected();
    updateMotion();
    setIsPlaying(!motion.matches);
    carousel.on('select', updateSelected);
    carousel.on('reInit', updateSelected);
    carousel.on('pointerDown', pause);
    motion.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      carousel.off('select', updateSelected);
      carousel.off('reInit', updateSelected);
      carousel.off('pointerDown', pause);
      motion.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [api, pause]);

  useEffect(() => {
    if (!api || !isPlaying) return;
    const timer = window.setInterval(() => api.scrollNext(), 6500);
    return () => window.clearInterval(timer);
  }, [api, isPlaying]);

  return { setApi, selected, isPlaying, goTo, pause };
}

export type HeroController = ReturnType<typeof useHeroCarousel>;
