import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { HeroSlide, OptimizedImage } from '@/types/hero';

interface Props {
  logo: OptimizedImage;
  slides: HeroSlide[];
  onNavigate: (target: string) => void;
  onRequestDemo: () => void;
  inactive: boolean;
}

const resources = [
  { label: 'System configurations', target: 'configurations' },
  { label: 'Institutional support', target: 'support' },
];

export default function SiteFooter({ logo, slides, onNavigate, onRequestDemo, inactive }: Props) {
  return (
    <footer className="site-footer" inert={inactive} aria-hidden={inactive ? true : undefined}>
      <div className="footer-inner">
        <div className="footer-invitation">
          <div>
            <p className="footer-eyebrow">A better way to listen. A better way to learn.</p>
            <h2>Bring learning to life.</h2>
            <p>Explore Spanda DAT for your clinical skills lab and bedside teaching.</p>
          </div>
          <Button className="footer-demo" onClick={onRequestDemo}>Request a demonstration<ArrowUpRight aria-hidden="true" /></Button>
        </div>
        <div className="footer-grid">
          <div className="footer-brand">
            <a href={import.meta.env.BASE_URL} className="brand" aria-label="Spanda DAT home"><img {...logo} alt="Spanda DAT" loading="lazy" /></a>
            <p>Digital Auscultation Trainer</p>
            <p className="footer-description">One system. Multiple possibilities.<br />Learn, practice, and listen together.</p>
          </div>
          <nav className="footer-links" aria-label="Explore Spanda DAT">
            <h3>Explore</h3>
            {slides.map((slide) => <button type="button" key={slide.id} onClick={() => onNavigate(slide.id)}>{slide.label}</button>)}
          </nav>
          <nav className="footer-links" aria-label="Institutional resources">
            <h3>For your institution</h3>
            {resources.map((item) => <button type="button" key={item.target} onClick={() => onNavigate(item.target)}>{item.label}</button>)}
            <button type="button" onClick={onRequestDemo}>Arrange a demonstration<ArrowUpRight aria-hidden="true" /></button>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Spanda DAT. All rights reserved.</p>
          <span className="footer-origin"><span className="signal-dot" aria-hidden="true" />Made in India</span>
          <button type="button" onClick={() => onNavigate(slides[0]?.id ?? '')}>Back to top<ArrowUp aria-hidden="true" /></button>
        </div>
      </div>
    </footer>
  );
}
