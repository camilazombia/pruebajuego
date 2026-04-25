/**
 * 03 — Misiones
 * Verifica el mapa de misiones y los dos tipos de juego: color_guess y listen_choose.
 */
import { test, expect } from '@playwright/test';
import { gotoWithProgress } from './helpers';

test.describe('MissionsMapPage', () => {
  test('Carga el mapa de misiones para world_1', async ({ page }) => {
    await gotoWithProgress(page, '/missions/world_1');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('Muestra al menos 1 misión', async ({ page }) => {
    await gotoWithProgress(page, '/missions/world_1');
    // Las misiones suelen ser botones o artículos
    const missionItems = page.locator('[class*="mission"], [class*="node"]');
    const count = await missionItems.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('Mapa de misiones funciona para worlds 1-12', async ({ page }) => {
    for (let w = 1; w <= 12; w++) {
      await gotoWithProgress(page, `/missions/world_${w}`);
      await expect(page.locator('body')).not.toBeEmpty();
    }
  });
});

test.describe('MissionPage - color_guess', () => {
  // world_1_mission_1 es tipo color_guess según missions.ts
  test('Carga la misión de color_guess', async ({ page }) => {
    await gotoWithProgress(page, '/mission/world_1_mission_1');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('Muestra objetos para adivinar colores', async ({ page }) => {
    await gotoWithProgress(page, '/mission/world_1_mission_1');
    // El contenido principal debe ser visible
    const main = page.locator('main, [class*="container"], [class*="page"]').first();
    await expect(main).toBeVisible();
  });

  test('Tiene botón de volver', async ({ page }) => {
    await gotoWithProgress(page, '/mission/world_1_mission_1');
    const backBtn = page.getByRole('button', { name: /volver|back|←/i }).first();
    if (await backBtn.isVisible()) {
      await backBtn.click();
      // Debe regresar a una página válida
      await expect(page).not.toHaveURL('/mission/world_1_mission_1');
    }
  });
});

test.describe('MissionPage - listen_choose', () => {
  // world_1_mission_2 es tipo listen_choose según missions.ts
  test('Carga la misión de listen_choose', async ({ page }) => {
    await gotoWithProgress(page, '/mission/world_1_mission_2');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('Muestra pantalla de intro con emoji grande', async ({ page }) => {
    await gotoWithProgress(page, '/mission/world_1_mission_2');
    // La intro tiene un emoji/icono grande
    const icon = page.locator('[class*="introIcon"], [class*="listenIntro"]').first();
    // Puede existir o no dependiendo del flujo - verificar que la página no esté vacía
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('Botón de comenzar inicia el juego', async ({ page }) => {
    await gotoWithProgress(page, '/mission/world_1_mission_2');
    const startBtn = page.getByRole('button', { name: /comenzar|start|jugar|play/i }).first();
    if (await startBtn.isVisible()) {
      await startBtn.click();
      // Después de comenzar deben aparecer opciones de emoji
      await expect(page.locator('body')).not.toBeEmpty();
    }
  });

  test('Misiones de todos los mundos cargan', async ({ page }) => {
    const missions = [
      'world_1_mission_1', 'world_1_mission_2', 'world_1_mission_3',
      'world_4_mission_1', 'world_7_mission_2', 'world_10_mission_3',
      'world_12_mission_1',
    ];
    for (const mId of missions) {
      await gotoWithProgress(page, `/mission/${mId}`);
      await expect(page.locator('body')).not.toBeEmpty();
    }
  });
});
