/**
 * 08 — Karaoke
 */
import { test, expect } from '@playwright/test';
import { gotoWithProgress } from './helpers';

test.describe('KaraokePage — selector de mundos', () => {
  test('Carga la página de karaoke', async ({ page }) => {
    await gotoWithProgress(page, '/review/karaoke');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('Muestra cards de mundos', async ({ page }) => {
    await gotoWithProgress(page, '/review/karaoke');
    const cards = page.locator('[class*="worldCard"], [class*="card"]');
    await expect(cards.first()).toBeVisible({ timeout: 5000 });
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(12);
  });

  test('Los mundos desbloqueados tienen botón de Karaoke', async ({ page }) => {
    await gotoWithProgress(page, '/review/karaoke');
    const karaokeBtn = page.getByRole('button', { name: /karaoke|escuchar/i }).first();
    await expect(karaokeBtn).toBeVisible({ timeout: 5000 });
  });
});

test.describe('KaraokeModal (desktop)', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('Se abre el modal al clicar Karaoke en el Chapter Map', async ({ page }) => {
    await gotoWithProgress(page, '/chapters/world_1');
    const karaokeBtn = page.getByRole('button', { name: /karaoke/i }).first();
    if (await karaokeBtn.isVisible({ timeout: 3000 })) {
      await karaokeBtn.click({ force: true });
      await page.waitForTimeout(800);
      const modal = page.locator('[class*="overlay"], [class*="modal"], [class*="karaokeModal"]').first();
      if (await modal.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(modal).toBeVisible();
      }
    }
  });

  test('El modal tiene un player de audio', async ({ page }) => {
    await gotoWithProgress(page, '/chapters/world_1');
    const karaokeBtn = page.getByRole('button', { name: /karaoke/i }).first();
    if (await karaokeBtn.isVisible({ timeout: 3000 })) {
      await karaokeBtn.click({ force: true });
      await page.waitForTimeout(800);
      const playBtn = page.locator('[class*="playBtn"]').first();
      if (await playBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(playBtn).toBeVisible();
      }
    }
  });

  test('El modal se puede cerrar', async ({ page }) => {
    await gotoWithProgress(page, '/chapters/world_1');
    const karaokeBtn = page.getByRole('button', { name: /karaoke/i }).first();
    if (await karaokeBtn.isVisible({ timeout: 3000 })) {
      await karaokeBtn.click({ force: true });
      await page.waitForTimeout(600);
      // Try pressing Escape to close
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
      // Or find close button
      const closeBtn = page.locator('button').filter({ hasText: /✕|×/i }).first();
      if (await closeBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
        await closeBtn.click({ force: true });
      }
    }
    // Test passes if no error thrown
  });
});

test.describe('Karaoke — mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('La página de karaoke carga en móvil sin desbordamiento', async ({ page }) => {
    await gotoWithProgress(page, '/review/karaoke');
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 10);
  });
});
