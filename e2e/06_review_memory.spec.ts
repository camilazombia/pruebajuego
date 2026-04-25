/**
 * 06 — Review: Une las Palabras (Match game)
 */
import { test, expect } from '@playwright/test';
import { gotoWithProgress } from './helpers';

async function startTopic(page: import('@playwright/test').Page, idx = 0) {
  await gotoWithProgress(page, '/review/memory');
  const cards = page.locator('[class*="topicCard"]');
  await expect(cards.first()).toBeVisible({ timeout: 8000 });
  const card = cards.nth(idx);
  await card.scrollIntoViewIfNeeded();
  await card.click({ force: true });
  await page.waitForTimeout(800);
}

test.describe('MemoryPage — selector de temas', () => {
  test('Muestra la pantalla de temas con instrucciones', async ({ page }) => {
    await gotoWithProgress(page, '/review/memory');
    await expect(page.getByText(/une las palabras/i)).toBeVisible();
  });

  test('Muestra al menos 8 temas', async ({ page }) => {
    await gotoWithProgress(page, '/review/memory');
    const topicCards = page.locator('[class*="topicCard"]');
    await expect(topicCards.first()).toBeVisible();
    const count = await topicCards.count();
    expect(count).toBeGreaterThanOrEqual(8);
  });

  test('Instrucción de juego es visible', async ({ page }) => {
    await gotoWithProgress(page, '/review/memory');
    const howTo = page.locator('[class*="howTo"]');
    await expect(howTo).toBeVisible();
  });
});

test.describe('MemoryPage — juego (desktop)', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('Al seleccionar un tema aparecen dos columnas', async ({ page }) => {
    await startTopic(page);
    await expect(page.locator('[class*="matchArea"]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[class*="wordCard"]').first()).toBeVisible();
    await expect(page.locator('[class*="emojiCard"]').first()).toBeVisible();
  });

  test('Muestra 6 palabras en inglés y 6 emojis en español', async ({ page }) => {
    await startTopic(page);
    await expect(page.locator('[class*="wordCard"]').first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[class*="wordCard"]')).toHaveCount(6);
    await expect(page.locator('[class*="emojiCard"]')).toHaveCount(6);
  });

  test('Barra de progreso empieza en 0/6', async ({ page }) => {
    await startTopic(page);
    await expect(page.getByText('0/6')).toBeVisible({ timeout: 5000 });
  });

  test('Seleccionar palabra en inglés la resalta', async ({ page }) => {
    await startTopic(page);
    const firstWord = page.locator('[class*="wordCard"]').first();
    await firstWord.click({ force: true });
    await page.waitForTimeout(300);
    await expect(firstWord).toHaveClass(/selectedCard/, { timeout: 3000 });
  });

  test('Seleccionar misma palabra la deselecciona', async ({ page }) => {
    await startTopic(page);
    const firstWord = page.locator('[class*="wordCard"]').first();
    await firstWord.click({ force: true });
    await page.waitForTimeout(200);
    await firstWord.click({ force: true });
    await page.waitForTimeout(200);
    await expect(firstWord).not.toHaveClass(/selectedCard/);
  });

  test('Match correcto sube el progreso', async ({ page }) => {
    await startTopic(page);
    const wordCards = page.locator('[class*="wordCard"]');
    const emojiCards = page.locator('[class*="emojiCard"]');

    await wordCards.first().click({ force: true });
    await page.waitForTimeout(200);

    for (let i = 0; i < 6; i++) {
      const emojiCard = emojiCards.nth(i);
      await emojiCard.click({ force: true });
      await page.waitForTimeout(700);
      const matchedCards = page.locator('[class*="matchedCard"]');
      if (await matchedCards.count() > 0) {
        await expect(page.getByText(/1\/6/)).toBeVisible({ timeout: 3000 });
        break;
      }
      if (i < 5) await wordCards.first().click({ force: true });
    }
  });

  test('Botón reiniciar resetea el juego', async ({ page }) => {
    await startTopic(page);
    await page.locator('[class*="restartBtn"]').click({ force: true });
    await page.waitForTimeout(300);
    await expect(page.getByText('0/6')).toBeVisible({ timeout: 5000 });
  });

  test('Botón Temas regresa al selector', async ({ page }) => {
    await startTopic(page);
    await page.getByRole('button', { name: /temas/i }).click({ force: true });
    await expect(page.getByText(/une las palabras/i)).toBeVisible({ timeout: 5000 });
  });

  test('Los 9 temas inician el juego correctamente', async ({ page }) => {
    test.setTimeout(70000);
    // Navigate only once, then use "Temas" button (React state, no full reload)
    await gotoWithProgress(page, '/review/memory');
    const topicCards = page.locator('[class*="topicCard"]');
    await expect(topicCards.first()).toBeVisible({ timeout: 8000 });
    for (let i = 0; i < 9; i++) {
      await topicCards.nth(i).scrollIntoViewIfNeeded();
      await topicCards.nth(i).click({ force: true });
      await page.waitForTimeout(800);
      await expect(page.locator('[class*="wordCard"]').first()).toBeVisible({ timeout: 6000 });
      await expect(page.locator('[class*="wordCard"]')).toHaveCount(6);
      await page.getByRole('button', { name: /temas/i }).click({ force: true });
      await page.waitForTimeout(300);
    }
  });
});

test.describe('MemoryPage — mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('El selector de temas cabe sin scroll horizontal', async ({ page }) => {
    await gotoWithProgress(page, '/review/memory');
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5);
  });

  test('Las dos columnas caben en pantalla móvil', async ({ page }) => {
    await startTopic(page);
    await expect(page.locator('[class*="matchArea"]')).toBeVisible({ timeout: 10000 });
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5);
  });

  test('Las tarjetas son tocables en móvil', async ({ page }) => {
    await startTopic(page);
    const firstWord = page.locator('[class*="wordCard"]').first();
    await expect(firstWord).toBeVisible({ timeout: 10000 });
    await firstWord.click({ force: true });
    await page.waitForTimeout(600);
    await expect(firstWord).toHaveClass(/selectedCard/, { timeout: 5000 });
  });
});
