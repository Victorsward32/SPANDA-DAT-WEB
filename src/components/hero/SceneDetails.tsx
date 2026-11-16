import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { SceneSlide } from '@/types/hero';

interface Props {
  slide: SceneSlide;
  onOpen: () => void;
}

export default function SceneDetails({ slide, onOpen }: Props) {
  const titleId = `${slide.id}-details-title`;

  return (
    <Popover onOpenChange={(open) => {
      if (open) onOpen();
    }}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="scene-details-toggle" aria-label={`About ${slide.label}`}>
          <Info aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="scene-details"
        side="bottom"
        align="start"
        sideOffset={10}
        collisionPadding={16}
        aria-labelledby={titleId}
      >
        <p className="scene-kicker">
          <span className="signal-dot" aria-hidden="true" />
          {slide.kicker}
        </p>
        <h3 id={titleId}>{slide.title}</h3>
        <p className="scene-description">{slide.description}</p>
        <ul className="scene-chips" aria-label="Features">
          {slide.chips.map((chip) => <li key={chip}>{chip}</li>)}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
