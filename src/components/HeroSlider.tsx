import AutoHeight from 'embla-carousel-auto-height';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import type { HeroController } from '@/hooks/use-hero-carousel';
import type { HeroSlide, OptimizedImage } from '@/types/hero';
import OverviewSlide from './hero/OverviewSlide';
import SceneSlide from './hero/SceneSlide';

interface Props {
  slides: HeroSlide[];
  madeInIndia: OptimizedImage;
  controller: HeroController;
}

export default function HeroSlider({ slides, madeInIndia, controller }: Props) {
  const { setApi, selected, goTo, isPlaying, pause } = controller;
  const chapterNav = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const plugins = useMemo(() => [AutoHeight()], []);

  useEffect(() => {
    const nav = chapterNav.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current]');
    if (!nav || !active) return;

    function updateIndicator(): void {
      if (!nav || !active) return;
      setIndicator({ left: active.offsetLeft, width: active.offsetWidth });
      if (nav.scrollWidth <= nav.clientWidth) return;
      const offset = active.getBoundingClientRect().left - nav.getBoundingClientRect().left;
      nav.scrollTo({ left: nav.scrollLeft + offset - (nav.clientWidth - active.clientWidth) / 2 });
    }

    updateIndicator();
    const resize = new ResizeObserver(updateIndicator);
    resize.observe(nav);
    resize.observe(active);
    return () => resize.disconnect();
  }, [selected]);
  if (!slides.length) return null;

  return (
    <section className="hero-showcase" aria-label="Discover Spanda DAT" id="experience">
      <h1 className="sr-only">Spanda DAT — Digital Auscultation Trainer</h1>
      <Carousel
        setApi={setApi}
        opts={{ align: 'start', loop: true }}
        plugins={plugins}
        aria-label="Spanda DAT learning experiences"
        className="showcase-carousel"
        onFocusCapture={pause}
        onMouseEnter={pause}
      >
        <nav ref={chapterNav} className="chapter-nav" aria-label="Learning experiences">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.id}
              aria-current={selected === index ? 'true' : undefined}
              aria-controls={`slide-${slide.id}`}
              className="chapter-link"
              onClick={() => goTo(index)}
            >
              <span className="chapter-number">{String(index + 1).padStart(2, '0')}</span>
              {slide.label}
            </button>
          ))}
          <span
            className="chapter-indicator"
            aria-hidden="true"
            style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }}
          />
        </nav>
        <div className="hero-stage-shell">
          <div className="hero-stage">
            <CarouselContent className="hero-track ml-0 items-start" aria-live={isPlaying ? 'off' : 'polite'}>
              {slides.map((slide, index) => (
                <CarouselItem
                  key={slide.id}
                  id={`slide-${slide.id}`}
                  className="pl-0"
                  aria-label={`${index + 1} of ${slides.length}: ${slide.label}`}
                  aria-hidden={index !== selected}
                  inert={index !== selected}
                >
                  {slide.kind === 'overview'
                    ? <OverviewSlide slide={slide} madeInIndia={madeInIndia} priority={index === 0} />
                    : <SceneSlide slide={slide} active={index === selected} onDetailsOpen={pause} />}
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
          <CarouselPrevious
            className="hero-flank hero-flank--previous"
            onClick={() => goTo(selected - 1)}
          />
          <CarouselNext
            className="hero-flank hero-flank--next"
            onClick={() => goTo(selected + 1)}
          />
        </div>
        <div className="hero-pagination">
          <div className="hero-dots" aria-label="Choose a slide">
            {slides.map((slide, index) => (
              <button
                type="button"
                key={slide.id}
                aria-label={`Go to slide ${index + 1}: ${slide.label}`}
                aria-current={selected === index ? 'true' : undefined}
                className="hero-dot-button"
                onClick={() => goTo(index)}
              ><span /></button>
            ))}
          </div>
        </div>
      </Carousel>
    </section>
  );
}
