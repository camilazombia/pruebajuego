import type { Page } from '@playwright/test';

/** Seed localStorage so all worlds/chapters are unlocked for testing */
export async function seedProgress(page: Page) {
  await page.addInitScript(() => {
    const worldIds = Array.from({ length: 12 }, (_, i) => `world_${i + 1}`);
    const chapterIds = worldIds.flatMap((w) =>
      Array.from({ length: 5 }, (_, i) => `${w}_chapter_${i + 1}`)
    );
    const levelIds = chapterIds.flatMap((c) =>
      Array.from({ length: 4 }, (_, i) => `${c}_level_${i + 1}`)
    );
    const missionIds = Array.from({ length: 36 }, (_, i) => `mission_${i + 1}`);

    const progress = {
      version: 1,
      unlockedWorlds: worldIds,
      unlockedChapters: chapterIds,
      completedWorlds: [],
      completedChapters: [],
      completedLevels: [],
      completedMissions: [],
      levelStars: {},
      magicCoins: 250,
      unlockedItems: [
        'skin_light', 'skin_medium', 'skin_dark', 'skin_olive',
        'body_slim', 'body_average', 'body_athletic',
        'hair_short', 'hair_long', 'hair_curly', 'hair_wavy',
        'eyes_open', 'eyes_sparkle', 'eyes_stars',
        'eyebrows_normal', 'eyebrows_thick', 'eyebrows_angry',
        'mouth_smile', 'mouth_laugh', 'mouth_kiss',
        'top_tshirt', 'top_red_shirt', 'top_shirt', 'top_sweater', 'top_hoodie',
        'bottom_pants', 'bottom_jeans', 'bottom_shorts', 'bottom_skirt',
        'shoes_sneakers', 'shoes_boots', 'shoes_sandals',
        'hat_beanie', 'hat_cap', 'glasses_sunglasses', 'glasses_nerd',
        'acc_scarf', 'acc_bag',
        // premium rewards items
        'hat_crown', 'hat_witch', 'acc_wings', 'acc_cape',
      ],
      levelStarsMap: Object.fromEntries(levelIds.map((id) => [id, 3])),
    };
    localStorage.setItem('mundo_magico_user_progress', JSON.stringify(progress));
    localStorage.setItem('__e2e_no_orientation_alert__', '1');
  });
}

/** Wait for page to be visually stable (no spinners) */
export async function waitForStable(page: Page) {
  await page.waitForLoadState('networkidle');
}

/** Navigate to a route with progress seeded */
export async function gotoWithProgress(page: Page, path: string) {
  await seedProgress(page);
  await page.goto(path);
  await waitForStable(page);
}
