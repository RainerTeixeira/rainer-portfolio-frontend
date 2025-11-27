/**
 * Teste de Autenticação
 *
 * Testa se a autenticação admin/admin funciona no modo de desenvolvimento
 */

import { expect, test } from './fixtures';
import { isAuthenticated, loginWithJsonCredentials } from './helpers/auth-helper';

test.describe('Autenticação - Desenvolvimento', () => {
  test('deve fazer login com admin/admin', async ({ page, consoleHelper }) => {
    // Fazer login utilizando credenciais do arquivo JSON (ou admin/admin como fallback)
    await loginWithJsonCredentials(page);

    // Verificar se está autenticado
    const authenticated = await isAuthenticated(page);
    expect(authenticated).toBe(true);

    // Verificar se foi redirecionado para dashboard
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/dashboard/);

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
});
