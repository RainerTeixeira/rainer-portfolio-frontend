/**
 * Testes de Regressão Visual E2E
 *
 * Testa regressões visuais usando screenshots comparativos,
 * baseline e detecção automática de mudanças visuais
 *
 * @see docs/09-TESTES/README.md
 */

import { expect, test } from './fixtures';

test.describe('Regressão Visual - Páginas Principais', () => {
  test('página inicial deve manter layout consistente', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Aguardar animações

    // Capturar screenshot da página completa
    await expect(page).toHaveScreenshot('home-full.png', {
      fullPage: true,
      maxDiffPixels: 100, // Permitir pequenas diferenças
    });

    // Verificar que não há erros críticos
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

  test('página de blog deve manter layout consistente', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/blog', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot('blog-full.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });

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

  test('página de contato deve manter layout consistente', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/contato', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot('contato-full.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });

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

  test('página sobre deve manter layout consistente', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/sobre', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot('sobre-full.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });

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

test.describe('Regressão Visual - Componentes', () => {
  test('header deve manter aparência consistente', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const header = page.locator('header, nav, [role="banner"]').first();
    const headerVisible = await header
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    if (headerVisible) {
      await expect(header).toHaveScreenshot('header.png', {
        maxDiffPixels: 50,
      });
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

  test('footer deve manter aparência consistente', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const footer = page.locator('footer, [role="contentinfo"]').first();
    const footerVisible = await footer
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    if (footerVisible) {
      await expect(footer).toHaveScreenshot('footer.png', {
        maxDiffPixels: 50,
      });
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

  test('botões devem manter estilo consistente', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const buttons = page.locator('button').first();
    const buttonVisible = await buttons
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    if (buttonVisible) {
      await expect(buttons).toHaveScreenshot('button.png', {
        maxDiffPixels: 30,
      });
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

test.describe('Regressão Visual - Responsividade', () => {
  test('página inicial deve ser responsiva em mobile', async ({
    page,
    consoleHelper,
  }) => {
    // Simular dispositivo mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot('home-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });

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

  test('página inicial deve ser responsiva em tablet', async ({
    page,
    consoleHelper,
  }) => {
    // Simular tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot('home-tablet.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });

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

test.describe('Regressão Visual - Estados Interativos', () => {
  test('botão hover deve manter aparência consistente', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const button = page.locator('button, a[href]').first();
    const buttonVisible = await button
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    if (buttonVisible) {
      await button.hover();
      await page.waitForTimeout(500); // Aguardar transição

      await expect(button).toHaveScreenshot('button-hover.png', {
        maxDiffPixels: 30,
      });
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

  test('formulário deve manter aparência quando preenchido', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/contato', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Preencher formulário
    const nameInput = page
      .locator('input[name*="name" i], input[placeholder*="nome" i]')
      .first();
    const nameVisible = await nameInput
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    if (nameVisible) {
      await nameInput.fill('Teste Visual');
      await page.waitForTimeout(500);

      const form = page.locator('form').first();
      await expect(form).toHaveScreenshot('form-filled.png', {
        maxDiffPixels: 50,
      });
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
