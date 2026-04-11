import { test, expect } from '@playwright/test';

/**
 * Tests E2E del formulario de contacto.
 * Verifica validaciones del lado cliente y UI de feedback.
 */

test.describe('Formulario de contacto', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('la página de contacto carga correctamente', async ({ page }) => {
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('form')).toBeVisible();
  });

  test('muestra errores cuando se envía el formulario vacío', async ({ page }) => {
    // Intentar enviar sin llenar nada
    await page.getByRole('button', { name: /enviar|send/i }).click();

    // Debe aparecer al menos un mensaje de error
    const errors = page.locator('[role="alert"], .text-destructive, .text-red-500');
    await expect(errors.first()).toBeVisible();
  });

  test('valida el formato de email incorrecto', async ({ page }) => {
    await page.getByLabel(/nombre|name/i).fill('Test Usuario');
    await page.getByLabel(/email/i).fill('no-es-un-email');
    await page.getByRole('button', { name: /enviar|send/i }).click();

    // Debe mostrar error de formato de email
    const emailError = page.locator('text=/email|correo/i').filter({ hasText: /inválido|invalid|formato/i });
    await expect(emailError).toBeVisible();
  });

  test('el campo de teléfono acepta formatos válidos', async ({ page }) => {
    const phoneInput = page.getByLabel(/teléfono|phone/i);
    if (await phoneInput.isVisible()) {
      await phoneInput.fill('+52 55 1234 5678');
      // No debe mostrar error de formato
      await expect(page.locator('text=/teléfono inválido/i')).not.toBeVisible();
    }
  });
});
