const DICEBEAR_BASE = 'https://api.dicebear.com/9.x/adventurer/svg';

// ── Skin → skinColor (hex sin #) ──────────────────────────────────
const SKIN_MAP: Record<string, string> = {
  skin_light:  'f2d3b1',
  skin_medium: 'd4a574',
  skin_dark:   '9e5622',
  skin_olive:  '7c9c59',
  skin_peach:  'ffa07a',
  skin_rose:   'ffb3ba',
  skin_golden: 'ffd700',
  skin_purple: 'd8b3ff',
  skin_blue:   '87ceeb',
  skin_teal:   '06b6d4',
};

// ── Hair → hair variant ────────────────────────────────────────────
const HAIR_MAP: Record<string, string> = {
  hair_short:    'short01',
  hair_long:     'long01',
  hair_curly:    'long05',
  hair_wavy:     'long10',
  hair_spiky:    'short07',
  hair_braid:    'long15',
  hair_pigtails: 'long20',
  hair_afro:     'short14',
};

const HAIR_COLOR_MAP: Record<string, string> = {
  hair_short:    '0e0e0e',
  hair_long:     '6a4e35',
  hair_curly:    'b9a05f',
  hair_wavy:     'd97706',
  hair_spiky:    'dc2626',
  hair_braid:    'e5d7a3',
  hair_pigtails: 'fbbf24',
  hair_afro:     '562306',
};

// ── Eyes → eyes variant ────────────────────────────────────────────
const EYES_MAP: Record<string, string> = {
  eyes_open:    'variant01',
  eyes_sparkle: 'variant05',
  eyes_stars:   'variant12',
  eyes_hearts:  'variant20',
};

// ── Eyebrows → eyebrows variant ────────────────────────────────────
const EYEBROWS_MAP: Record<string, string> = {
  eyebrows_normal: 'variant01',
  eyebrows_thick:  'variant05',
  eyebrows_angry:  'variant10',
};

// ── Mouth → mouth variant ──────────────────────────────────────────
const MOUTH_MAP: Record<string, string> = {
  mouth_smile:  'variant01',
  mouth_laugh:  'variant10',
  mouth_kiss:   'variant20',
  mouth_tongue: 'variant25',
};

// ── Glasses → glasses variant ──────────────────────────────────────
const GLASSES_MAP: Record<string, string> = {
  glasses_sunglasses: 'variant01',
  glasses_nerd:       'variant02',
  glasses_heart:      'variant03',
  glasses_star:       'variant04',
};

// ── Special → earrings / features (closest mapping) ────────────────
const SPECIAL_TO_EARRINGS: Record<string, string> = {
  special_fox_ears: 'variant03',
  special_cat_ears: 'variant05',
};

const SPECIAL_TO_FEATURES: Record<string, string> = {
  special_halo:  'blush',
  special_horns: 'birthmark',
};

export interface DiceBearAvatarOptions {
  skin?: string;
  hair?: string;
  eyes?: string;
  eyebrows?: string;
  mouth?: string;
  glasses?: string;
  special?: string;
  top?: string;
  bottom?: string;
  shoes?: string;
}

export function buildDiceBearUrl(
  opts: DiceBearAvatarOptions,
  size: number = 200
): string {
  const params = new URLSearchParams();

  const seedParts = [
    opts.skin  || 'skin_light',
    opts.hair  || 'hair_short',
    opts.top   || 'top_red_shirt',
    opts.bottom || 'bottom_pants',
  ];
  params.set('seed', seedParts.join('-'));
  params.set('size', String(size));
  params.set('radius', '50');
  params.set('backgroundColor', 'b6e3f4');
  params.set('scale', '90');

  const skinHex = SKIN_MAP[opts.skin || ''] || 'f2d3b1';
  params.set('skinColor', skinHex);

  const hairVariant = HAIR_MAP[opts.hair || ''] || 'short01';
  params.set('hair', hairVariant);

  const hairColorHex = HAIR_COLOR_MAP[opts.hair || ''] || '0e0e0e';
  params.set('hairColor', hairColorHex);

  params.set('hairProbability', '100');

  const eyesVariant = EYES_MAP[opts.eyes || ''] || 'variant01';
  params.set('eyes', eyesVariant);

  const eyebrowsVariant = EYEBROWS_MAP[opts.eyebrows || ''] || 'variant01';
  params.set('eyebrows', eyebrowsVariant);

  const mouthVariant = MOUTH_MAP[opts.mouth || ''] || 'variant01';
  params.set('mouth', mouthVariant);

  if (opts.glasses && GLASSES_MAP[opts.glasses]) {
    params.set('glasses', GLASSES_MAP[opts.glasses]);
    params.set('glassesProbability', '100');
  } else {
    params.set('glassesProbability', '0');
  }

  if (opts.special && SPECIAL_TO_EARRINGS[opts.special]) {
    params.set('earrings', SPECIAL_TO_EARRINGS[opts.special]);
    params.set('earringsProbability', '100');
  } else {
    params.set('earringsProbability', '0');
  }

  if (opts.special && SPECIAL_TO_FEATURES[opts.special]) {
    params.set('features', SPECIAL_TO_FEATURES[opts.special]);
    params.set('featuresProbability', '100');
  } else {
    params.set('featuresProbability', '0');
  }

  return `${DICEBEAR_BASE}?${params.toString()}`;
}

export function getPreviewUrl(
  category: string,
  itemId: string,
  currentOpts: DiceBearAvatarOptions,
  size: number = 80
): string {
  return buildDiceBearUrl({ ...currentOpts, [category]: itemId }, size);
}
