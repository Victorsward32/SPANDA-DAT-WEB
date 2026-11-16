import type { OptimizedImage, OverviewSlide as OverviewSlideData } from '@/types/hero';
import HeroImage from './HeroImage';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Props {
  slide: OverviewSlideData;
  madeInIndia: OptimizedImage;
  priority: boolean;
  active: boolean;
  onDetailsOpen: () => void;
}

export default function OverviewSlide({ slide, madeInIndia, priority, active, onDetailsOpen }: Props) {
  return (
    <div className="overview-slide">
      <div className="overview-copy">
        <div className="product-pill" data-reveal="eyebrow">
          <span className="signal-dot" aria-hidden="true" />
          <span className="product-pill-name">Spanda DAT</span>
          <span className="product-pill-divider" aria-hidden="true">|</span>
          <span>Digital Auscultation Trainer</span>
          {active && <Popover onOpenChange={(open) => { if (open) onDetailsOpen(); }}>
            <PopoverTrigger asChild><Button variant="ghost" size="icon-xs" className="overview-info" aria-label="About Spanda DAT"><Info aria-hidden="true" /></Button></PopoverTrigger>
            <PopoverContent className="scene-details" side="bottom" collisionPadding={16} aria-label="Spanda DAT learning features">
              {slide.features.map((feature) => <div className="overview-detail" key={feature.title}><h3>{feature.title}</h3><p>{feature.description}</p></div>)}
            </PopoverContent>
          </Popover>}
        </div>
        <div className="overview-intro">
          <h2 data-reveal="heading">{slide.title}<br /><span>{slide.accentTitle}</span></h2>
          <div className="feature-grid">
            {slide.features.map((feature) => (
              <div className="feature-card" key={feature.title} data-reveal="feature">
                <h3><span className={`feature-dot feature-dot--${feature.tone}`} aria-hidden="true" />{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="proof-metrics" data-reveal="details">
          {slide.metrics.map((metric) => (
            <div className="proof-metric" key={metric.label}>
              <div className="proof-value">{metric.value}<span>{metric.suffix}</span></div>
              <p>{metric.label}</p>
              <small>{metric.detail}</small>
            </div>
          ))}
          <div className="origin-mark">
            <HeroImage image={madeInIndia} alt="Make in India" />
            <p>Made in <span>India</span></p>
          </div>
        </div>
      </div>
      <div className="overview-visual" data-reveal="product">
        <HeroImage image={slide.image} alt={slide.imageAlt} priority={priority} />
      </div>
    </div>
  );
}
