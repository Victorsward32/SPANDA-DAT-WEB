import type { ImageMetadata } from 'astro';
import type { HeroSlide } from '@/types/hero';
import manikin from '../../spanda-assets/manikin/spanda-dat/front.png';
import group from '../../spanda-assets/learning/group-learning.png';
import immersive from '../../spanda-assets/learning/immersive-learning.png';
import patient from '../../spanda-assets/learning/live-patient-auscultation.png';

export const heroSlides: HeroSlide<ImageMetadata>[] = [
  {
    kind: 'overview',
    id: 'what-is-spanda-dat',
    label: 'What is Spanda DAT?',
    title: 'One System.',
    accentTitle: 'Multiple Possibilities.',
    image: manikin,
    imageAlt: 'Spanda DAT anatomical manikin with illuminated auscultation sites',
    features: [
      {
        title: 'Two Environments',
        description: 'Manikin-Based Simulation meets Real-Patient Auscultation.',
        tone: 'blue',
      },
      {
        title: 'Two Ways to Learn',
        description: 'Speaker Group Learning meets Receiver-Based Immersive Learning.',
        tone: 'green',
      },
    ],
    metrics: [
      { value: '34', label: 'Calibrated Sites', detail: 'Optical torso guidance' },
      { value: '300', suffix: '+', label: 'Validated Sounds', detail: 'Curated clinical library' },
    ],
  },
  {
    kind: 'scene',
    id: 'group-learning',
    captionPlacement: 'top-left',
    label: 'Group Learning',
    kicker: 'Simulation Suite · Shared Listening',
    title: 'Learn together. Listen together.',
    subtitle: 'One sound. A shared understanding.',
    description: 'Bring the whole group into the same auscultation experience with speaker-based learning, guided by the clinical instructor.',
    chips: ['Speaker-Based Learning', 'Tablet Scenario Manager'],
    image: group,
    imageAlt: 'Instructor demonstrating Spanda DAT to a group of medical students in a training lab',
  },
  {
    kind: 'scene',
    id: 'immersive-learning',
    captionPlacement: 'top-left',
    label: 'Immersive Learning',
    kicker: 'Individual Receivers · Focused Listening',
    title: 'A shared experience. A personal connection.',
    subtitle: 'Immersive, receiver-based learning.',
    description: 'Listen through individual stethoscope receivers while following the same guided auscultation session. Two ways to listen, built around your learning environment.',
    chips: ['Individual Stethoscope Receivers', 'Independent Gain Control'],
    image: immersive,
    imageAlt: 'Medical students listening through individual Spanda receivers during an instructor-led manikin demonstration',
  },
  {
    kind: 'scene',
    id: 'live-patient-auscultation',
    captionPlacement: 'top-center',
    label: 'Live Patient Auscultation',
    compactLabel: 'Live Patient',
    kicker: 'From Simulation to the Bedside',
    title: 'Bedside to broadcaster.',
    subtitle: 'Direct real-world sound capture.',
    description: 'Transition from the simulator to the clinical ward. Share real cardiac and pulmonary sounds with the student cohort during live patient auscultation.',
    chips: ['Live Patient Auscultation', 'Shared Clinical Learning'],
    image: patient,
    imageAlt: 'Clinical instructor examining a patient with medical students listening through Spanda receivers',
  },
];
