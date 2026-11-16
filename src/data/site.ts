export const navigation = [
  { label: 'Product', target: 'what-is-spanda-dat' },
  { label: 'Experience', target: 'group-learning' },
  { label: 'Training', target: 'immersive-learning' },
  { label: 'Configurations', target: 'configurations' },
  { label: 'Support', target: 'support' },
] as const;

export const configurations = [
  { value: 'sovereign', label: 'Complete DAT Sovereign Ecosystem' },
  { value: 'spk-core', label: 'DAT SPK Core — Speaker-based Trainer' },
  { value: 'spk-pro', label: 'DAT SPK Pro — High-Fidelity Speaker' },
  { value: 'spk-elite', label: 'DAT SPK Elite — Manikin + Speaker' },
  { value: 'rec', label: 'DAT REC — Receiver-based Trainer' },
  { value: 'hybrid', label: 'DAT Hybrid — Speaker + Receivers' },
  { value: 'live', label: 'DAT Live — Live Bedside Rounds' },
  { value: 'all-inclusive', label: 'DAT All-Inclusive Institutional Suite' },
];
