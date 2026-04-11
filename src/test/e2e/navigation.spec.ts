import { test, expect } from '@playwright/test';

/**
 * Tests E2E de navegación principal.
 * Verifica que las rutas carguen correctamente y la navegación funcione.
 */

test.describe('Navegación principal', () => {
  test('la página de inicio carga correctamente', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/ROKE Industries/i);
    await expect(page.locator('nav')).toBeVisible();
  });

  test('la navegación desktop muestra todos los links', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Verificar que los links de navegación existen
    await expect(page.getByRole('link', { name: /servicios/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /hosting/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /blog/i }).first()).toBeVisible();
  });

  test('navegar a la página de contacto', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /contacto/i }).first().click();
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('navegar al blog', async ({ page }) => {
    await page.goto('/blog');
    await expect(page).toHaveURL('/blog');
    await expect(page.locator('h1')).toContainText(/blog/i);
  });

  test('página 404 cuando la ruta no existe', async ({ page }) => {
    await page.goto('/pagina-que-no-existe-xyz');
    await expect(page.locator('text=404').or(page.locator('text=no encontrada'))).toBeVisible();
  });

  test('el botón flotante de WhatsApp es visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: /whatsapp/i })).toBeVisible();
  });
});

test.describe('Cambio de tema', () => {
  test('el toggle de tema es funcional', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const initialClass = await html.getAttribute('class');

    // Hacer click en el toggle de tema
    await page.getByRole('button', { name: /tema|theme|dark|light/i }).first().click();

    const newClass = await html.getAttribute('class');
    expect(newClass).not.toBe(initialClass);
  });
});
