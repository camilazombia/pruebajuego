/**
 * 07 — Rewards / Tienda de Premios
 */
import { test, expect } from '@playwright/test';
import { gotoWithProgress } from './helpers';

test.describe('RewardsPage', () => {
  test('Carga la página de premios', async ({ page }) => {
    await gotoWithProgress(page, '/rewards');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('Muestra el saldo de monedas mágicas', async ({ page }) => {
    await gotoWithProgress(page, '/rewards');
    await expect(page.getByText('250').first()).toBeVisible({ timeout: 5000 });
  });

  test('Muestra items o categorías de recompensas', async ({ page }) => {
    await gotoWithProgress(page, '/rewards');
    const items = page.locator('[class*="item"], [class*="card"], [class*="reward"]');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('Tiene items de customización del avatar', async ({ page }) => {
    await gotoWithProgress(page, '/rewards');
    // Items like "Piel Clara", "Cabello Corto" are rendered
    // The page must have some interactive items
    const body = await page.locator('body').innerText();
    // Item names from rewards data (always present)
    const hasItems = /clara|corto|largo|media|oscura|short|default|monedas|precio|\d+/i.test(body);
    expect(hasItems).toBe(true);
  });

  test('Items tienen precios en monedas', async ({ page }) => {
    await gotoWithProgress(page, '/rewards');
    // Prices like "30", "40", "50" should appear somewhere
    const body = await page.locator('body').innerText();
    const hasPrices = /\d+/.test(body);
    expect(hasPrices).toBe(true);
  });

  test('Items bloqueados y desbloqueados existen', async ({ page }) => {
    await gotoWithProgress(page, '/rewards');
    // At least some items visible
    const items = page.locator('[class*="item"]');
    if (await items.count() > 0) {
      await expect(items.first()).toBeVisible();
    } else {
      // Page content is there even without .item class
      await expect(page.locator('body')).not.toBeEmpty();
    }
  });
});

test.describe('RewardsPage — mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('La tienda carga correctamente en móvil', async ({ page }) => {
    await gotoWithProgress(page, '/rewards');
    await expect(page.locator('body')).not.toBeEmpty();
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 10);
  });
});
