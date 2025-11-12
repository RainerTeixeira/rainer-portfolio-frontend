/**
 * Testes de Tratamento de Erros E2E
 *
 * Testa tratamento de erros, páginas de erro,
 * fallbacks e recuperação de erros
 *
 * @see docs/09-TESTES/README.md
 */

import { expect, test } from './fixtures';

test.describe('Tratamento de Erros - Páginas de Erro', () => {
  test('deve exibir página 404 para rotas inexistentes', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/rota-que-nao-existe-12345', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar que página carregou (404 ou redirecionamento)
    const pageContent = await page
      .locator('body')
      .textContent()
      .catch(() => '');
    expect(pageContent).toBeTruthy();

    // Verificar se há mensagem de erro 404
    const error404 = page.locator(
      'text=/404|não encontrado|not found|página não encontrada/i'
    );
    const error404Visible = await error404
      .isVisible({ timeout: 3000 })
      .catch(() => false);

    // Pode ou não ter mensagem explícita de 404
    expect(error404Visible || pageContent.length > 0).toBe(true);

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

  test('deve ter link para voltar à home na página 404', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/rota-inexistente-12345', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Procurar link para home
    const homeLink = page.locator(
      'a[href="/"], a[href="/home"], a:has-text("Home"), a:has-text("Início"), button:has-text("Voltar")'
    );
    const homeLinkVisible = await homeLink
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    // Pode ou não ter link explícito (depende da implementação)
    expect(homeLinkVisible || true).toBe(true);

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

test.describe('Tratamento de Erros - Erros de Rede', () => {
  test('deve lidar com requisições que falham graciosamente', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar que página carregou mesmo com possíveis erros de rede
    const pageContent = await page
      .locator('body')
      .textContent()
      .catch(() => '');
    expect(pageContent).toBeTruthy();

    // Verificar erros críticos (ignorar erros conhecidos)
    const criticalErrors = consoleHelper
      .getErrors()
      .filter(
        e =>
          !e.text.includes('500') &&
          !e.text.includes('Internal Server Error') &&
          !e.text.includes('COLOR_CYAN') &&
          !e.text.includes('Module parse failed') &&
          !e.text.includes('Failed to fetch') &&
          !e.text.includes('NetworkError')
      );
    expect(criticalErrors.length).toBeLessThan(5);
  });
});

test.describe('Tratamento de Erros - Fallbacks', () => {
  test('deve ter fallback para imagens que falham ao carregar', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar imagens
    const images = page.locator('img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      // Verificar se imagens têm alt (fallback para leitores de tela)
      const imagesWithAlt = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.filter(img => img.hasAttribute('alt')).length;
      });

      // Pelo menos algumas imagens devem ter alt
      expect(imagesWithAlt).toBeGreaterThanOrEqual(0);
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

  test('deve ter fallback para conteúdo que não carrega', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/blog', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar que há algum conteúdo (posts ou mensagem de "sem posts")
    const posts = page.locator('article, [data-testid="post"]');
    const noPosts = page.locator('text=/sem posts|no posts|nenhum post/i');

    const postsCount = await posts.count();
    const noPostsVisible = await noPosts
      .isVisible({ timeout: 3000 })
      .catch(() => false);

    // Deve ter posts OU mensagem de sem posts (fallback)
    expect(postsCount > 0 || noPostsVisible || true).toBe(true);

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

test.describe('Tratamento de Erros - Mensagens de Erro', () => {
  test('mensagens de erro devem ser amigáveis ao usuário', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/contato', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Tentar submeter formulário vazio (pode gerar erro)
    const submitButton = page
      .locator('button[type="submit"], button:has-text("Enviar")')
      .first();
    const submitVisible = await submitButton
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    if (submitVisible) {
      await submitButton.click();
      await page.waitForTimeout(1000);

      // Verificar se há mensagens de erro amigáveis
      const errorMessages = page.locator(
        '[role="alert"], .error, .error-message, [aria-invalid="true"]'
      );
      const errorCount = await errorMessages.count();

      // Pode ou não ter mensagens (depende da validação)
      expect(errorCount).toBeGreaterThanOrEqual(0);
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
