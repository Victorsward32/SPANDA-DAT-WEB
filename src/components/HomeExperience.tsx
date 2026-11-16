import { lazy, Suspense, useRef, useState } from 'react';
import type { HeroSlide, OptimizedImage } from '@/types/hero';
import { useHeroCarousel } from '@/hooks/use-hero-carousel';
import HeroSlider from './HeroSlider';
import SiteHeader from './site/SiteHeader';
import SiteFooter from './site/SiteFooter';
import type { InquiryView } from './site/InquiryDialog';

const InquiryDialog = lazy(() => import('./site/InquiryDialog'));

interface Props {
  slides: HeroSlide[];
  logo: OptimizedImage;
  madeInIndia: OptimizedImage;
}

export default function HomeExperience({ slides, logo, madeInIndia }: Props) {
  const controller = useHeroCarousel();
  const [inquiry, setInquiry] = useState<InquiryView | null>(null);
  const inquiryTrigger = useRef<HTMLElement | null>(null);

  function openInquiry(view: InquiryView): void {
    if (!inquiry) inquiryTrigger.current = document.activeElement as HTMLElement;
    controller.pause();
    setInquiry(view);
  }

  function restoreInquiryFocus(): void {
    const trigger = inquiryTrigger.current;
    if (trigger?.getClientRects().length) {
      trigger.focus({ preventScroll: true });
    } else {
      document.querySelector<HTMLButtonElement>('.request-demo-button')?.focus({ preventScroll: true });
    }
  }

  function navigate(target: string): void {
    if (target === 'configurations' || target === 'support') {
      openInquiry(target);
      return;
    }
    const index = slides.findIndex((slide) => slide.id === target);
    if (index !== -1) {
      controller.goTo(index);
      document.getElementById('main')?.scrollIntoView({
        block: 'start',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    }
  }

  return (
    <>
      <SiteHeader logo={logo} onNavigate={navigate} onRequestDemo={() => openInquiry('demo')} activeTarget={slides[controller.selected]?.id ?? ''} />
      <main id="main" tabIndex={-1} inert={inquiry !== null} aria-hidden={inquiry ? true : undefined}>
        <HeroSlider slides={slides} madeInIndia={madeInIndia} controller={controller} />
      </main>
      <SiteFooter logo={logo} slides={slides} onNavigate={navigate} onRequestDemo={() => openInquiry('demo')} inactive={inquiry !== null} />
      {inquiry && (
        <Suspense fallback={<p className="dialog-loading" role="status">Opening inquiry…</p>}>
          <InquiryDialog
            view={inquiry}
            onClose={() => setInquiry(null)}
            onRestoreFocus={restoreInquiryFocus}
            onRequestDemo={() => openInquiry('demo')}
          />
        </Suspense>
      )}
    </>
  );
}
