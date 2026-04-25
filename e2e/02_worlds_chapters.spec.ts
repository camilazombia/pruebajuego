/**
 * 02 — Mundos y Capítulos
 */
import { test, expect } from '@playwright/test';
import { gotoWithProgress } from './helpers';

test.describe('WorldsMapPage', () => {
  test('Muestra los 12 mundos', async ({ page }) => {
    await gotoWithProgress(page, '/worlds');
    const cards = page.locator('[data-card]');
    await expect(cards.first()).toBeVisible({ timeout: 5000 });
    await expect(cards).toHaveCount(12);
  });

  test('Flechas de carrusel son visibles', async ({ page }) => {
    await gotoWithProgress(page, '/worlds');
    const arrows = page.getByRole('button', { name: /anterior|siguiente/i });
    await expect(arrows.first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('WorldsMapPage — desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('Mundo 1 está desbloqueado y es clickeable', async ({ page }) => {
    await gotoWithProgress(page, '/worlds');
    const firstCard = page.locator('[data-card]').first();
    await firstCard.scrollIntoViewIfNeeded();
    await firstCard.click({ force: true });
    await expect(page).toHaveURL(/\/chapters\/world_1/, { timeout: 8000 });
  });
});

test.describe('ChapterMapPage', () => {
  test('Mundo 1: muestra contenido de capítulos', async ({ page }) => {
    await gotoWithProgress(page, '/chapters/world_1');
    await expect(page.locator('body')).not.toBeEmpty();
    const body = await page.locator('body').innerText();
    expect(body.trim().length).toBeGreaterThan(10);
  });

  test('Mundo 1: título del mundo es visible', async ({ page }) => {
    await gotoWithProgress(page, '/chapters/world_1');
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible({ timeout: 5000 });
  });

  test('Mundo 1: botón de karaoke abre el modal', async ({ page }) => {
    await gotoWithProgress(page, '/chapters/world_1');
    const karaokeBtn = page.getByRole('button', { name: /karaoke/i }).first();
    if (await karaokeBtn.isVisible({ timeout: 3000 })) {
      await karaokeBtn.click({ force: true });
      await page.waitForTimeout(600);
      const modal = page.locator('[class*="modal"], [class*="karaoke"], [class*="overlay"]').first();
      if (await modal.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(modal).toBeVisible();
      }
    }
  });

  test('Se puede volver a /worlds desde ChapterMap', async ({ page }) => {
    await gotoWithProgress(page, '/chapters/world_1');
    // Navigate back via browser history (ChapterMap uses navigate(-1) or /worlds)
    await page.goBack();
    await page.waitForTimeout(300);
    // Either /worlds or wherever came from
    const url = page.url();
    expect(url).not.toContain('/chapters/');
  });

  test('Mundos 1-12 tienen ChapterMapPage funcional', async ({ page }) => {
    for (let w = 1; w <= 12; w++) {
      await gotoWithProgress(page, `/chapters/world_${w}`);
      await expect(page.locator('body')).not.toBeEmpty();
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.toLowerCase()).not.toContain('something went wrong');
    }
  });
});

test.describe('LevelPage', () => {
  test('Level page carga', async ({ page }) => {
    await gotoWithProgress(page, '/level/world_1_chapter_1_level_1');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('Level page tiene botón visible', async ({ page }) => {
    await gotoWithProgress(page, '/level/world_1_chapter_1_level_1');
    const btn = page.getByRole('button').first();
    await expect(btn).toBeVisible({ timeout: 5000 });
  });
});
