# Spanda DAT

Astro 7 website implementing the supplied Stitch hero design, with React islands, Tailwind CSS v4, shadcn/ui (Radix), and Embla Carousel.

## Development

Use a supported even-numbered Node.js release, version 22.23.4 or newer, and npm 9.6.5 or newer.

```sh
npm install
npm run dev
```

Open the local URL printed by Astro, normally http://localhost:4321.

```sh
npm run check    # Astro and TypeScript diagnostics
npm run build    # Static production build in dist/
npm run preview  # Preview the production build locally
```

## Editing the website

- `src/data/hero-slides.ts`: all four slide labels, copy, features, metrics, image references, and display variants
- `src/data/site.ts`: shared navigation and system configurations
- `src/types/hero.ts`: discriminated slide types for overview and scene layouts
- `src/components/hero/`: reusable overview, scene, and responsive-image components
- `src/components/HeroSlider.tsx`: chapter navigation, stage, arrows, and pagination
- `src/hooks/use-hero-carousel.ts`: selection, looping, autoplay, reduced motion, and interaction handling
- `src/components/site/`: responsive header, inquiry dialog, and demo request form
- `src/components/HomeExperience.tsx`: shared coordination between navigation, carousel, and dialogs
- `src/lib/images.ts`: build-time responsive WebP generation, capped at the original image resolution
- `src/styles/global.css`: brand tokens, locally hosted fonts, layout, and responsive styles
- `src/styles/motion.css`: shared easing, staged reveals, hover feedback, and reduced-motion-safe animation
- `src/hooks/use-scroll-threshold.ts`: passive scroll detection for header styling
- `src/layouts/Layout.astro`: document metadata and the accessible skip link

The homepage composes these parts in one hydrated React island so navigation and the carousel share state. The inquiry dialog is loaded on demand. Content and repeating lists are data-driven; new scene slides use the existing renderer rather than copied markup.

## Hero behavior

The slide order is What is Spanda DAT, Group Learning, Immersive Learning, and Live Patient Auscultation. Chapter links, dots, swipe, and arrow controls share the same carousel state. The slide dots are centered below the hero image. The slideshow advances every 6.5 seconds and pauses on hover, keyboard focus, manual navigation, dragging, or a hidden browser tab. After interaction, continue with the chapters, dots, arrows, or swipe gestures. Reduced-motion users start with autoplay off and instant transitions. Inactive slides are hidden from assistive technology and keyboard focus.

## Motion

Premium motion uses CSS and the existing Embla carousel, without an additional animation library. Text and feature cards reveal in sequence on slide selection; the product enters with a subtle lift. Scene photos retain full brightness; only the small caption has a local readability background. A shared chapter indicator glides between active labels and updates after responsive resizing. The header gains definition after scrolling, and hover feedback is limited to precise pointing devices. Reduced-motion preferences disable entrance and hover transforms, animated underlines, and autoplay.

## Demo inquiry

The dialog validates required fields and email format, prepares a local request summary, and offers a text-file download. Editing a prepared request retains the entered details. Closing the dialog clears the draft. No information is sent to a server or saved to browser storage, and the UI explicitly identifies the form as a preview. A delivery endpoint must be integrated before enabling live submissions.

## Assets and performance

`src/assets/stitch/` contains the images referenced by the supplied `stitch_spanda_dat_hero_ui.zip`. They are served locally and converted into responsive WebP variants during the build. The first hero image is preloaded; subsequent scenes are lazy-loaded. Images retain intrinsic dimensions to reserve layout space. Scene photos fill the slide width at their original proportions without cropping or stretching. The main slider uses 95% of its base responsive width and overview height through `--showcase-scale`, with a maximum width of 1520px. Scene images scale proportionally with the container. The base layout uses 48px desktop side margins, 32px on tablets, and 18px on phones (14px on narrow phones) before the 5% reduction. Compact captions sit over open background areas selected per slide; tablets and phones show only the slide title. An optional compact title keeps longer labels readable on phones. Full descriptions and feature chips are available through the info button beside each scene's overlaid title; opening it pauses playback, and changing slides closes it. No full-image gradient is applied. Embla Auto Height tracks the image itself, so captions do not add vertical space. Source photographs remain unchanged, and the surrounding layout does not add empty space to fill the viewport.

Scene WebP widths are 480, 800, 1120, 1440, and up to 1920 pixels, capped at each original's width. The `sizes` attribute follows the site's desktop, tablet, and phone gutters, so the browser can choose an appropriate file. Source PNGs remain unchanged. Manrope and JetBrains Mono are self-hosted Latin variable fonts, with no runtime Google Fonts or Tailwind CDN requests.

The Group Learning, Immersive Learning, and Live Patient Auscultation slides use the supplied originals in `spanda-assets/learning/`, processed through the same responsive WebP pipeline. The original curated product assets in `spanda-assets/` are preserved. Product figures and metrics follow the supplied design content and can be updated centrally in `src/data/hero-slides.ts`.

## UI components

`src/components/ui/` contains 31 editable shadcn/ui primitives. Import them using the `@/` alias:

```tsx
import { Button } from '@/components/ui/button';
```

Keep components that share React context in the same hydrated island. Wrap tooltips in `TooltipProvider`. For toast notifications, mount `Toaster` from `@/components/ui/sonner` in a hydrated island and call `toast` from `sonner`.

```sh
npx shadcn@latest add <component>
```

The header sun/moon button switches between light and dark themes. The site follows the system preference until a choice is saved in `localStorage` under `spanda-theme`; an early head script restores it before painting. System changes and choices from other tabs stay synchronized, and toggling still works when storage is unavailable. Theme colors cover navigation, hero copy, captions, and dialogs while photos retain their original brightness. The production build is static and needs no Node.js server to serve it.
