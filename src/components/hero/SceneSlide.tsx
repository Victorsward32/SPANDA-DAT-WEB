import type { SceneSlide as SceneSlideData } from '@/types/hero';
import HeroImage from './HeroImage';
import SceneDetails from './SceneDetails';

interface Props {
  slide: SceneSlideData;
  active: boolean;
  onDetailsOpen: () => void;
}

export default function SceneSlide({ slide, active, onDetailsOpen }: Props) {
  return (
    <div className={`scene-slide scene-slide--${slide.id}`}>
      <div className="scene-media">
        <HeroImage image={slide.image} alt={slide.imageAlt} className="scene-image" />
      </div>
      <div className="scene-caption" data-placement={slide.captionPlacement} data-reveal="eyebrow">
        <div className="scene-caption-title">
          <h2 aria-label={slide.label}>
            <span className={slide.compactLabel ? 'scene-title-full' : undefined}>{slide.label}</span>
            {slide.compactLabel && <span className="scene-title-compact" aria-hidden="true">{slide.compactLabel}</span>}
          </h2>
          {active && <SceneDetails slide={slide} onOpen={onDetailsOpen} />}
        </div>
        <p>{slide.subtitle}</p>
      </div>
    </div>
  );
}
