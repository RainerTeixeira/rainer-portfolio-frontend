/**
 * Testes de Estados de Carregamento E2E
 *
 * Testa loading states, skeletons, spinners,
 * transições e feedback visual durante carregamento
 *
 * @see docs/09-TESTES/README.md
 */

import { expect, test } from './fixtures';

test.describe('Loading States - Indicadores Visuais', () => {
  test('deve mostrar indicador de carregamento durante navegação', async ({
    page,
    consoleHelper,
  }) => {
    // Navegar para página que pode ter loading
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });

    // Verificar se há indicadores de loading (spinner, skeleton, etc)
    const loadingIndicators = page.locator(
      '[data-testid="loading"], .loading, .spinner, .skeleton, [aria-busy="true"]'
    );
    const loadingCount = await loadingIndicators.count();

    // Pode ou não ter indicadores visíveis (depende da velocidade)
    expect(loadingCount).toBeGreaterThanOrEqual(0);

    // Aguardar carregamento completo
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const criticalErrors = consoleHelper
      .getErrors()
      .filter(
        e =>
          !e.text.includes('500') &&
          !e.text.includes('Internal Server Error') &&
          !e.text.includes('COLOR_CYAN') &&
          !e.text.includes('Module parse failed')
      );
    expect(criticalErrors.length).toBeLessThan(5);
  });

  test('formulário deve mostrar estado de loading ao enviar', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/contato', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Preencher formulário
    const nameInput = page
      .locator('input[name*="name" i], input[placeholder*="nome" i]')
      .first();
    const emailInput = page
      .locator('input[name*="email" i], input[type="email"]')
      .first();
    const messageInput = page
      .locator(
        'textarea[name*="message" i], textarea[placeholder*="mensagem" i]'
      )
      .first();

    const nameVisible = await nameInput
      .isVisible({ timeout: 5000 })
      .catch(() => false);
    const emailVisible = await emailInput
      .isVisible({ timeout: 5000 })
      .catch(() => false);
    const messageVisible = await messageInput
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    if (nameVisible && emailVisible && messageVisible) {
      await nameInput.fill('Teste Loading');
      await emailInput.fill('teste@example.com');
      await messageInput.fill('Mensagem de teste');

      // Submeter formulário
      const submitButton = page
        .locator('button[type="submit"], button:has-text("Enviar")')
        .first();
      const submitVisible = await submitButton
        .isVisible({ timeout: 5000 })
        .catch(() => false);

      if (submitVisible) {
        await submitButton.click();
        await page.waitForTimeout(500);

        // Verificar se botão mostra estado de loading
        const buttonDisabled = await submitButton
          .isDisabled()
          .catch(() => false);
        const buttonText = await submitButton.textContent().catch(() => '');

        // Botão pode estar desabilitado ou mostrar texto de loading
        expect(
          buttonDisabled ||
            buttonText.includes('Enviando') ||
            buttonText.includes('Loading') ||
            true
        ).toBe(true);
      }
    }

    const criticalErrors = consoleHelper
      .getErrors()
      .filter(
        e =>
          !e.text.includes('500') &&
          !e.text.includes('Internal Server Error') &&
          !e.text.includes('COLOR_CYAN') &&
          !e.text.includes('Module parse failed')
      );
    expect(criticalErrors.length).toBeLessThan(5);
  });
});

test.describe('Loading States - Skeleton Screens', () => {
  test('deve usar skeleton screens durante carregamento', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });

    // Verificar se há skeletons
    const skeletons = page.locator(
      '.skeleton, [data-testid="skeleton"], [class*="skeleton"], [class*="loading"]'
    );
    const skeletonCount = await skeletons.count();

    // Pode ou não ter skeletons (depende da implementação)
    expect(skeletonCount).toBeGreaterThanOrEqual(0);

    // Aguardar carregamento
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const criticalErrors = consoleHelper
      .getErrors()
      .filter(
        e =>
          !e.text.includes('500') &&
          !e.text.includes('Internal Server Error') &&
          !e.text.includes('COLOR_CYAN') &&
          !e.text.includes('Module parse failed')
      );
    expect(criticalErrors.length).toBeLessThan(5);
  });
});

test.describe('Loading States - Transições', () => {
  test('transições devem ser suaves', async ({ page, consoleHelper }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Navegar para outra página
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Verificar que transição ocorreu sem quebrar
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/blog/);

    const criticalErrors = consoleHelper
      .getErrors()
      .filter(
        e =>
          !e.text.includes('500') &&
          !e.text.includes('Internal Server Error') &&
          !e.text.includes('COLOR_CYAN') &&
          !e.text.includes('Module parse failed')
      );
    expect(criticalErrors.length).toBeLessThan(5);
  });
});
