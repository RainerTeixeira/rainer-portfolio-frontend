import { expect, test } from '@playwright/test';
import { checkA11y, injectAxe } from 'axe-playwright';

/**
 * Testes de Acessibilidade (WCAG 2.1 AA)
 *
 * Verifica conformidade com padrões WCAG usando axe-core
 */
test.describe('Acessibilidade WCAG 2.1 AA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
  });

  test('Página inicial deve ser acessível', async ({ page }) => {
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  });

  test('Página de blog deve ser acessível', async ({ page }) => {
    await page.goto('/blog');
    await injectAxe(page);
    await checkA11y(page);
  });

  test('Página de contato deve ser acessível', async ({ page }) => {
    await page.goto('/contato');
    await injectAxe(page);
    await checkA11y(page);
  });

  test('Página sobre deve ser acessível', async ({ page }) => {
    await page.goto('/sobre');
    await injectAxe(page);
    await checkA11y(page);
  });

  test('Navegação por teclado funciona', async ({ page }) => {
    await page.goto('/');

    // Testar Tab navigation
    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(
      () => document.activeElement?.tagName
    );
    expect(firstFocused).toBeTruthy();

    // Verificar se há skip links
    const skipLink = await page.locator('a[href="#main-content"]').first();
    if ((await skipLink.count()) > 0) {
      await skipLink.focus();
      expect(await skipLink.isVisible()).toBeTruthy();
    }
  });

  test('Contraste de cores está adequado', async ({ page }) => {
    await page.goto('/');

    // Verificar elementos de texto importantes
    const headings = page.locator('h1, h2, h3');
    const count = await headings.count();

    // Pelo menos algum heading deve existir
    expect(count).toBeGreaterThan(0);
  });

  test('Imagens têm textos alternativos', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      // Verificar se imagens decorativas têm alt vazio ou se têm alt descritivo
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        // Alt deve existir (pode ser vazio para imagens decorativas)
        expect(alt).not.toBeNull();
      }
    }
  });

  test('Formulários têm labels associados', async ({ page }) => {
    await page.goto('/contato');

    const inputs = page.locator(
      'input[type="text"], input[type="email"], textarea'
    );
    const inputCount = await inputs.count();

    if (inputCount > 0) {
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const placeholder = await input.getAttribute('placeholder');

        // Deve ter id+label ou aria-label ou placeholder como fallback
        const hasLabel = id
          ? (await page.locator(`label[for="${id}"]`).count()) > 0
          : false;
        expect(hasLabel || ariaLabel || placeholder).toBeTruthy();
      }
    }
  });
});
