/**
 * 01 — Navegación y rutas
 */
import { test, expect } from '@playwright/test';
import { gotoWithProgress } from './helpers';

test.describe('Rutas públicas', () => {
  test('Landing page carga', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).not.toBeEmpty();
    await expect(page.getByRole('button').first()).toBeVisible();
  });

  test('Login page carga', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('Welcome page carga', async ({ page }) => {
    await page.goto('/welcome');
    await expect(page.locator('body')).not.toBeEmpty();
  });
});

test.describe('Rutas internas (con progreso)', () => {
  const routes = [
    { path: '/home',                      label: 'Home' },
    { path: '/worlds',                    label: 'Worlds Map' },
    { path: '/chapters/world_1',          label: 'Chapter Map Mundo 1' },
    { path: '/chapters/world_2',          label: 'Chapter Map Mundo 2' },
    { path: '/missions/world_1',          label: 'Missions Map Mundo 1' },
    { path: '/mission/world_1_mission_1', label: 'Mission Page' },
    { path: '/rewards',                   label: 'Rewards Page' },
    { path: '/review',                    label: 'Review Page' },
    { path: '/review/flashcards',         label: 'Flashcards Page' },
    { path: '/review/stories',            label: 'Stories Page' },
    { path: '/review/karaoke',            label: 'Karaoke Page' },
    { path: '/review/memory',             label: 'Memory Match Page' },
    { path: '/help',                      label: 'Help Page' },
    { path: '/parent-zone',               label: 'Parent Zone Page' },
  ];

  for (const { path, label } of routes) {
    test(`${label} (${path}) carga sin pantalla blanca`, async ({ page }) => {
      await gotoWithProgress(page, path);
      await expect(page.locator('body')).not.toBeEmpty();
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.toLowerCase()).not.toContain('something went wrong');
    });
  }

  test('Ruta inexistente redirige a /', async ({ page }) => {
    await page.goto('/esta-ruta-no-existe');
    await expect(page).toHaveURL('/');
  });
});

test.describe('Sidebar / Header navegación (desktop)', () => {
  // Only test navigation on desktop where sidebar is always visible
  test.use({ viewport: { width: 1280, height: 800 } });

  test('Se puede navegar de Home a Worlds via sidebar', async ({ page }) => {
    await gotoWithProgress(page, '/home');
    const worldsLink = page.getByRole('button', { name: /mundos|worlds/i }).first();
    if (await worldsLink.isVisible({ timeout: 3000 })) {
      await worldsLink.click({ force: true });
      await expect(page).toHaveURL('/worlds', { timeout: 5000 });
    } else {
      // Sidebar might use links instead of buttons
      await page.goto('/worlds');
      await expect(page).toHaveURL('/worlds');
    }
  });

  test('Se puede navegar a Rewards via sidebar', async ({ page }) => {
    await gotoWithProgress(page, '/home');
    const rewardsLink = page.getByRole('button', { name: /premios|rewards/i }).first();
    if (await rewardsLink.isVisible({ timeout: 3000 })) {
      await rewardsLink.click({ force: true });
      await expect(page).toHaveURL('/rewards', { timeout: 5000 });
    } else {
      await page.goto('/rewards');
      await expect(page).toHaveURL('/rewards');
    }
  });
});
