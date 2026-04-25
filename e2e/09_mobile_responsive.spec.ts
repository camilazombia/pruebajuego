/**
 * 09 — Responsividad Móvil y Tablet
 */
import { test, expect } from '@playwright/test';
import { gotoWithProgress } from './helpers';

const VIEWPORTS = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 14', width: 390, height: 844 },
  { name: 'Pixel 5',   width: 393, height: 851 },
  { name: 'iPad Mini', width: 768, height: 1024 },
];

const PAGES = [
  { path: '/home',               label: 'Home' },
  { path: '/worlds',             label: 'Worlds Map' },
  { path: '/chapters/world_1',   label: 'Chapter Map' },
  { path: '/missions/world_1',   label: 'Missions Map' },
  { path: '/rewards',            label: 'Rewards' },
  { path: '/review',             label: 'Review' },
  { path: '/review/flashcards',  label: 'Flashcards' },
  { path: '/review/stories',     label: 'Stories' },
  { path: '/review/memory',      label: 'Memory Match' },
  { path: '/review/karaoke',     label: 'Karaoke' },
];

for (const vp of VIEWPORTS) {
  test.describe(`Viewport ${vp.name} (${vp.width}×${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const pg of PAGES) {
      test(`${pg.label} — sin scroll horizontal`, async ({ page }) => {
        await gotoWithProgress(page, pg.path);
        const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
        const clientWidth = await page.evaluate(() => document.body.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5);
      });
    }
  });
}

test.describe('Tamaño mínimo de botones táctiles', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('Botones de mundo son >= 44px', async ({ page }) => {
    await gotoWithProgress(page, '/worlds');
    const firstCard = page.locator('[data-card]').first();
    const box = await firstCard.boundingBox();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.width).toBeGreaterThanOrEqual(44);
    }
  });

  test('Botones de actividad en Review son >= 60px altura', async ({ page }) => {
    await gotoWithProgress(page, '/review');
    const cards = page.locator('[class*="activityCard"]');
    await expect(cards.first()).toBeVisible({ timeout: 5000 });
    const count = await cards.count();
    expect(count).toBe(4);
    for (let i = 0; i < count; i++) {
      const box = await cards.nth(i).boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(60);
      }
    }
  });
});

test.describe('Navegación Review (desktop)', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('Click en Flashcards navega correctamente', async ({ page }) => {
    await gotoWithProgress(page, '/review');
    const flashcardsCard = page.locator('[class*="activityCard"]').first();
    await flashcardsCard.click({ force: true });
    await expect(page).toHaveURL('/review/flashcards', { timeout: 5000 });
  });

  test('Click en todas las actividades navega correctamente', async ({ page }) => {
    const paths = ['/review/flashcards', '/review/stories', '/review/karaoke', '/review/memory'];
    for (const path of paths) {
      await gotoWithProgress(page, '/review');
      const cards = page.locator('[class*="activityCard"]');
      await expect(cards.first()).toBeVisible();
      const count = await cards.count();
      // Find the card that navigates to this path
      for (let i = 0; i < count; i++) {
        const card = cards.nth(i);
        await card.click({ force: true });
        if (page.url().includes(path.split('/').pop()!)) break;
        await page.goto('/review');
        await page.waitForTimeout(300);
      }
    }
  });
});
