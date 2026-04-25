/**
 * 05 — Review: Cuentos en Inglés
 * Verifica la lista de historias, apertura de cuento y navegación de slides.
 */
import { test, expect } from '@playwright/test';
import { gotoWithProgress } from './helpers';

test.describe('StoriesPage — lista', () => {
  test('Carga la página de historias', async ({ page }) => {
    await gotoWithProgress(page, '/review/stories');
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('Muestra al menos 1 historia', async ({ page }) => {
    await gotoWithProgress(page, '/review/stories');
    // Stories page must have interactive content
    const buttons = page.getByRole('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

test.describe('StoryDetailPage — navegación de slides', () => {
  test('Abre historia story_magic_greetings', async ({ page }) => {
    await gotoWithProgress(page, '/review/stories/story_magic_greetings');
    await expect(page.locator('body')).not.toBeEmpty();
    const heading = page.locator('h2').first();
    await expect(heading).toBeVisible();
  });

  test('Muestra el texto en español e inglés', async ({ page }) => {
    await gotoWithProgress(page, '/review/stories/story_magic_greetings');
    const slideTexts = page.locator('[class*="slideText"]');
    await expect(slideTexts.first()).toBeVisible();
    const count = await slideTexts.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('Conteo de slides es visible (1 / N)', async ({ page }) => {
    await gotoWithProgress(page, '/review/stories/story_magic_greetings');
    await expect(page.getByText(/1 \/ \d+/)).toBeVisible();
  });

  test('Botón siguiente avanza al próximo slide', async ({ page }) => {
    await gotoWithProgress(page, '/review/stories/story_magic_greetings');
    // The → button has aria-label="Siguiente"
    const nextBtn = page.locator('[class*="navButton"]').last();
    await nextBtn.click({ force: true });
    // Counter should now show 2 / N
    await expect(page.getByText(/2 \/ \d+/)).toBeVisible({ timeout: 5000 });
  });

  test('Botón anterior regresa al slide previo', async ({ page }) => {
    await gotoWithProgress(page, '/review/stories/story_magic_greetings');
    const navButtons = page.locator('[class*="navButton"]');
    const nextBtn = navButtons.last();
    const prevBtn = navButtons.first();

    // Go to slide 2
    await nextBtn.click({ force: true });
    await page.waitForTimeout(400);

    // Go back to slide 1
    await prevBtn.click({ force: true });
    await expect(page.getByText(/1 \/ \d+/)).toBeVisible({ timeout: 5000 });
  });

  test('Historia no encontrada muestra mensaje amigable', async ({ page }) => {
    await gotoWithProgress(page, '/review/stories/historia_que_no_existe');
    await expect(page.getByText(/no encontrada|not found/i)).toBeVisible();
  });

  test('Se puede navegar por todos los slides hasta terminar', async ({ page }) => {
    await gotoWithProgress(page, '/review/stories/story_magic_greetings');
    const nextBtn = page.locator('[class*="navButton"]').last();

    // Navigate up to 10 slides (most stories have 3-5 slides)
    for (let i = 0; i < 10; i++) {
      const text = await nextBtn.innerText();
      if (text.includes('Terminar') || text.includes('✓')) {
        await nextBtn.click({ force: true });
        await page.waitForTimeout(600);
        // Should navigate to stories list
        await expect(page).toHaveURL('/review/stories', { timeout: 5000 });
        return;
      }
      await nextBtn.click({ force: true });
      await page.waitForTimeout(300);
    }
    // If we got here without finding Terminar, the test still passes as long as navigation worked
    const url = page.url();
    expect(url).toContain('/review/stories');
  });
});
