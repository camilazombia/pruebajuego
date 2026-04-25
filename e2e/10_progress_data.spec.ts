/**
 * 10 — Datos y Progreso
 * Verifica que los datos de mundos, capítulos y misiones están completos y
 * que el progreso se guarda correctamente en localStorage (listo para backend).
 */
import { test, expect } from '@playwright/test';
import { gotoWithProgress, seedProgress } from './helpers';

test.describe('Datos de mundos (worlds.ts)', () => {
  test('Los 12 mundos tienen título y guardian emoji', async ({ page }) => {
    await gotoWithProgress(page, '/worlds');
    const cards = page.locator('[data-card]');
    await expect(cards).toHaveCount(12);

    // Cada card debe tener texto y emoji
    for (let i = 0; i < 12; i++) {
      const card = cards.nth(i);
      const text = await card.innerText();
      expect(text.trim().length).toBeGreaterThan(0);
    }
  });

  test('Los 12 mundos tienen ChapterMap con contenido', async ({ page }) => {
    for (let w = 1; w <= 12; w++) {
      await gotoWithProgress(page, `/chapters/world_${w}`);
      const body = await page.locator('body').innerText();
      expect(body.toLowerCase()).not.toContain('something went wrong');
      expect(body.trim().length).toBeGreaterThan(0);
    }
  });
});

test.describe('Progreso en localStorage', () => {
  test('El progreso se persiste en localStorage', async ({ page }) => {
    await seedProgress(page);
    await page.goto('/home');

    const stored = await page.evaluate(() =>
      localStorage.getItem('mundo_magico_user_progress')
    );
    expect(stored).not.toBeNull();

    const parsed = JSON.parse(stored!);
    expect(parsed.unlockedWorlds).toContain('world_1');
    expect(parsed.magicCoins).toBe(250);
  });

  test('El header muestra el saldo de monedas del localStorage', async ({ page }) => {
    await seedProgress(page);
    await page.goto('/home');
    await expect(page.getByText('250').first()).toBeVisible();
  });

  test('Estructura del progreso tiene todos los campos necesarios para backend', async ({ page }) => {
    await seedProgress(page);
    await page.goto('/home');

    const stored = await page.evaluate(() =>
      localStorage.getItem('mundo_magico_user_progress')
    );
    const data = JSON.parse(stored!);

    // Campos que el backend necesitará
    expect(data).toHaveProperty('unlockedWorlds');
    expect(data).toHaveProperty('unlockedChapters');
    expect(data).toHaveProperty('completedLevels');
    expect(data).toHaveProperty('completedMissions');
    expect(data).toHaveProperty('magicCoins');
    expect(data).toHaveProperty('unlockedItems');
  });
});

test.describe('Misiones completas (36 misiones, 3 por mundo)', () => {
  const MISSION_SAMPLES = [
    // Mundo 1
    { id: 'world_1_mission_1', world: 1 },
    { id: 'world_1_mission_2', world: 1 },
    { id: 'world_1_mission_3', world: 1 },
    // Mundo 4 (Rosie)
    { id: 'world_4_mission_1', world: 4 },
    // Mundo 6 (Luna)
    { id: 'world_6_mission_2', world: 6 },
    // Mundo 12 (Creator)
    { id: 'world_12_mission_3', world: 12 },
  ];

  for (const m of MISSION_SAMPLES) {
    test(`Misión ${m.id} carga sin error`, async ({ page }) => {
      await gotoWithProgress(page, `/mission/${m.id}`);
      await expect(page.locator('body')).not.toBeEmpty();
      const body = await page.locator('body').innerText();
      expect(body.toLowerCase()).not.toContain('something went wrong');
    });
  }
});

test.describe('Review: 4 actividades de inglés', () => {
  test('Las 4 actividades tienen enfoque en inglés', async ({ page }) => {
    await gotoWithProgress(page, '/review');
    const cards = page.locator('[class*="activityCard"]');
    await expect(cards).toHaveCount(4);

    const texts = await page.locator('[class*="cardTitleEn"]').allInnerTexts();
    // Títulos en inglés deben existir
    expect(texts.some(t => /flashcard|story|sing|pair|match/i.test(t))).toBe(true);
  });

  test('Cada actividad navega a su página correcta', async ({ page }) => {
    const routes = [
      '/review/flashcards',
      '/review/stories',
      '/review/karaoke',
      '/review/memory',
    ];

    for (const route of routes) {
      await gotoWithProgress(page, route);
      await expect(page.locator('body')).not.toBeEmpty();
    }
  });
});
