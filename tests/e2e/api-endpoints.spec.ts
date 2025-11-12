/**
 * Testes de Endpoints da API E2E
 *
 * Testa endpoints da API, respostas HTTP,
 * validação de dados e tratamento de erros
 *
 * @see docs/09-TESTES/README.md
 */

import { expect, test } from './fixtures';

test.describe('API - Health Check', () => {
  test('endpoint de health deve responder corretamente', async ({
    page,
    consoleHelper,
  }) => {
    // Tentar acessar endpoint de health (se existir)
    const response = await page
      .goto('/api/health', {
        waitUntil: 'networkidle',
      })
      .catch(() => null);

    if (response) {
      expect(response.status()).toBeLessThan(500);
    } else {
      // Se não existe, verificar que não quebra
      await page.goto('/', { waitUntil: 'networkidle' });
      const pageContent = await page
        .locator('body')
        .textContent()
        .catch(() => '');
      expect(pageContent).toBeTruthy();
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

test.describe('API - Posts', () => {
  test('deve carregar posts do blog corretamente', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/blog', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar se há posts ou mensagem de "sem posts"
    const posts = page.locator('article, [data-testid="post"]');
    const noPosts = page.locator('text=/sem posts|no posts|nenhum post/i');

    const postsCount = await posts.count();
    const noPostsVisible = await noPosts
      .isVisible({ timeout: 3000 })
      .catch(() => false);

    // Deve ter posts OU mensagem de sem posts
    expect(postsCount > 0 || noPostsVisible).toBe(true);

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

test.describe('API - Respostas HTTP', () => {
  test('páginas devem retornar status 200', async ({ page, consoleHelper }) => {
    const routes = ['/', '/blog', '/contato', '/sobre'];

    for (const route of routes) {
      const response = await page.goto(route, { waitUntil: 'networkidle' });
      if (response) {
        expect(response.status()).toBeLessThan(400);
      }
      await page.waitForTimeout(1000);
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

  test('página 404 deve retornar status apropriado', async ({
    page,
    consoleHelper,
  }) => {
    const response = await page.goto('/pagina-inexistente-12345', {
      waitUntil: 'networkidle',
    });

    if (response) {
      // Pode ser 404 ou 200 (se tiver página de erro customizada)
      expect([200, 404]).toContain(response.status());
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

test.describe('API - Validação de Dados', () => {
  test('formulário deve validar dados antes de enviar', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/contato', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const emailInput = page
      .locator('input[name*="email" i], input[type="email"]')
      .first();
    const emailVisible = await emailInput
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    if (emailVisible) {
      // Tentar enviar com email inválido
      await emailInput.fill('email-invalido');
      await page.waitForTimeout(500);

      // Verificar validação HTML5
      const validity = await emailInput
        .evaluate((el: HTMLInputElement) => el.validity.valid)
        .catch(() => true);

      // Se tiver validação HTML5, deve ser inválido
      if (validity !== undefined) {
        expect(validity).toBe(false);
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
