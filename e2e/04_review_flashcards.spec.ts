/**
 * 04 — Review: Flashcards
 */
import { test, expect } from '@playwright/test';
import { gotoWithProgress } from './helpers';

test.describe('Flashcards — selector de temas', () => {
  test('Muestra la pantalla de temas', async ({ page }) => {
    await gotoWithProgress(page, '/review/flashcards');
    const topicCards = page.locator('[role="listitem"]');
    await expect(topicCards.first()).toBeVisible({ timeout: 5000 });
  });

  test('Al menos 14 temas disponibles', async ({ page }) => {
    await gotoWithProgress(page, '/review/flashcards');
    const cards = page.locator('[role="listitem"]');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(14);
  });
});

test.describe('Flashcards — juego (desktop)', () => {
  // These tests require carousel interaction — only run reliably on desktop
  test.use({ viewport: { width: 1280, height: 800 } });

  async function selectFirstTopic(page: import('@playwright/test').Page) {
    await gotoWithProgress(page, '/review/flashcards');
    const firstCard = page.locator('[role="listitem"]').first();
    await expect(firstCard).toBeVisible({ timeout: 5000 });
    await firstCard.click({ force: true });
    await page.waitForTimeout(600);
  }

  test('Muestra la primera tarjeta en inglés', async ({ page }) => {
    await selectFirstTopic(page);
    await expect(page.getByText('English')).toBeVisible({ timeout: 6000 });
  });

  test('Flip de tarjeta muestra el español', async ({ page }) => {
    await selectFirstTopic(page);
    const flashcard = page.locator('[class*="flashcard"]').first();
    await flashcard.click({ force: true });
    await expect(page.getByText('Español')).toBeVisible({ timeout: 5000 });
  });

  test('Botón siguiente avanza la tarjeta', async ({ page }) => {
    await selectFirstTopic(page);
    const nextBtn = page.locator('[aria-label="Siguiente tarjeta"]');
    if (await nextBtn.isVisible({ timeout: 3000 })) {
      const wordBefore = await page.locator('[class*="word"]').first().innerText();
      await nextBtn.click({ force: true });
      await page.waitForTimeout(400);
      const wordAfter = await page.locator('[class*="word"]').first().innerText();
      expect(wordAfter).not.toBe(wordBefore);
    }
  });

  test('Botón de sonido está presente', async ({ page }) => {
    await selectFirstTopic(page);
    const soundBtn = page.locator('[class*="soundButton"]').first();
    await expect(soundBtn).toBeVisible({ timeout: 5000 });
  });

  test('Barra de progreso con contador visible', async ({ page }) => {
    await selectFirstTopic(page);
    await expect(page.getByText(/\d+ de \d+/)).toBeVisible({ timeout: 5000 });
  });

  test('Botón volver regresa al selector de temas', async ({ page }) => {
    await selectFirstTopic(page);
    const backBtn = page.locator('[class*="backButton"]').first();
    await expect(backBtn).toBeVisible({ timeout: 3000 });
    await backBtn.click({ force: true });
    await expect(page.locator('[role="listitem"]').first()).toBeVisible({ timeout: 5000 });
  });
});
