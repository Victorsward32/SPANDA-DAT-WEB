import type { OptimizedImage, OverviewSlide as OverviewSlideData } from '@/types/hero';
import HeroImage from './HeroImage';

interface Props {
  slide: OverviewSlideData;
  madeInIndia: OptimizedImage;
  priority: boolean;
}

export default function OverviewSlide({ slide, madeInIndia, priority }: Props) {
  return (
    <div className="overview-slide">
      <div className="overview-copy">
        <div className="product-pill" data-reveal="eyebrow">
          <span className="signal-dot" aria-hidden="true" />
          <span className="product-pill-name">Spanda DAT</span>
          <span className="product-pill-divider" aria-hidden="true">|</span>
          <span>Digital Auscultation Trainer</span>
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
