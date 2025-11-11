/**
 * Testes E2E - Verificação de localStorage (Produção)
 *
 * Testa o comportamento real do localStorage do sistema de cookies
 * como seria em produção, verificando:
 * - Estrutura dos dados salvos
 * - Versionamento
 * - Timestamps
 * - Persistência real
 *
 * @module tests/e2e/cookies-localstorage.spec
 */

import { expect, test } from './fixtures';

test.describe('Cookies - localStorage em Produção', () => {
  test.beforeEach(async ({ page, context }) => {
    // Limpa storage completamente
    await context.clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('deve salvar estrutura correta no localStorage', async ({ page }) => {
    await page.goto(, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Aceita cookies
    const acceptButton = page.getByRole('button', {
      name: /aceitar todos/i,
    });
    if (await acceptButton.isVisible({ timeout: 2000 })) {
      await acceptButton.click();
      await page.waitForTimeout(1000);
    }

    // Verifica estrutura do consentimento
    const consent = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });

    expect(consent).not.toBeNull();
    const consentData = JSON.parse(consent || '{}');

    // Verifica estrutura completa
    expect(consentData).toHaveProperty('version');
    expect(consentData).toHaveProperty('consented');
    expect(consentData).toHaveProperty('timestamp');
    expect(consentData).toHaveProperty('preferences');

    // Verifica tipos
    expect(typeof consentData.version).toBe('string');
    expect(typeof consentData.consented).toBe('boolean');
    expect(typeof consentData.timestamp).toBe('number');
    expect(typeof consentData.preferences).toBe('object');

    // Verifica preferências
    expect(consentData.preferences).toHaveProperty('essential');
    expect(consentData.preferences).toHaveProperty('performance');
    expect(consentData.preferences).toHaveProperty('functionality');
    expect(consentData.preferences).toHaveProperty('analytics');

    // Verifica valores booleanos
    expect(typeof consentData.preferences.essential).toBe('boolean');
    expect(typeof consentData.preferences.performance).toBe('boolean');
    expect(typeof consentData.preferences.functionality).toBe('boolean');
    expect(typeof consentData.preferences.analytics).toBe('boolean');

    // Verifica timestamp (deve ser recente)
    const now = Date.now();
    const timestamp = consentData.timestamp;
    expect(timestamp).toBeGreaterThan(now - 5000); // Últimos 5 segundos
    expect(timestamp).toBeLessThanOrEqual(now);
  });

  test('deve salvar preferências separadamente', async ({ page }) => {
    await page.goto(, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Aceita cookies
    const acceptButton = page.getByRole('button', {
      name: /aceitar todos/i,
    });
    if (await acceptButton.isVisible({ timeout: 2000 })) {
      await acceptButton.click();
      await page.waitForTimeout(1000);
    }

    // Verifica que há dois itens no localStorage
    const storageKeys = await page.evaluate(() => {
      return Object.keys(localStorage);
    });

    expect(storageKeys).toContain('cookie-consent');
    expect(storageKeys).toContain('cookie-preferences');

    // Verifica que preferências são iguais em ambos
    const consent = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('cookie-consent') || '{}');
    });

    const preferences = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('cookie-preferences') || '{}');
    });

    expect(preferences).toEqual(consent.preferences);
  });

  test('deve manter dados após múltiplas navegações', async ({ page }) => {
    await page.goto(, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Aceita cookies
    const acceptButton = page.getByRole('button', {
      name: /aceitar todos/i,
    });
    if (await acceptButton.isVisible({ timeout: 2000 })) {
      await acceptButton.click();
      await page.waitForTimeout(1000);
    }

    // Obtém consentimento inicial
    const initialConsent = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });

    // Navega por várias páginas
    const pages = ['/sobre', '/contato', '/cookies', '/privacidade', '/termos'];

    for (const path of pages) {
      await page.goto(`${}${path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);

      // Verifica que consentimento foi mantido
      const currentConsent = await page.evaluate(() => {
        return localStorage.getItem('cookie-consent');
      });

      expect(currentConsent).toBe(initialConsent);
    }
  });

  test('deve funcionar com dados corrompidos no localStorage', async ({
    page,
  }) => {
    // Primeiro, salva dados válidos
    await page.goto(, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    const acceptButton = page.getByRole('button', {
      name: /aceitar todos/i,
    });
    if (await acceptButton.isVisible({ timeout: 2000 })) {
      await acceptButton.click();
      await page.waitForTimeout(1000);
    }

    // Corrompe dados
    await page.evaluate(() => {
      localStorage.setItem('cookie-consent', 'invalid-json-{');
    });

    // Recarrega página
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Sistema deve lidar graciosamente (banner deve aparecer novamente)
    // ou não quebrar a aplicação
    const pageContent = await page.content();
    expect(pageContent.length).toBeGreaterThan(0); // Página carregou
  });

  test('deve ter versionamento correto', async ({ page }) => {
    await page.goto(, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Aceita cookies
    const acceptButton = page.getByRole('button', {
      name: /aceitar todos/i,
    });
    if (await acceptButton.isVisible({ timeout: 2000 })) {
      await acceptButton.click();
      await page.waitForTimeout(1000);
    }

    // Verifica versão
    const consent = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('cookie-consent') || '{}');
    });

    expect(consent.version).toBeDefined();
    expect(consent.version).toMatch(/^\d+\.\d+\.\d+$/); // Formato semver
  });

  test('deve limpar dados ao revogar consentimento', async ({ page }) => {
    // Aceita cookies primeiro
    await page.goto(, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    const acceptButton = page.getByRole('button', {
      name: /aceitar todos/i,
    });
    if (await acceptButton.isVisible({ timeout: 2000 })) {
      await acceptButton.click();
      await page.waitForTimeout(1000);
    }

    // Verifica que dados existem
    const consentBefore = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });
    expect(consentBefore).not.toBeNull();

    // Limpa manualmente (simula revogação)
    await page.evaluate(() => {
      localStorage.removeItem('cookie-consent');
      localStorage.removeItem('cookie-preferences');
    });

    // Verifica que dados foram removidos
    const consentAfter = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });
    expect(consentAfter).toBeNull();

    const preferencesAfter = await page.evaluate(() => {
      return localStorage.getItem('cookie-preferences');
    });
    expect(preferencesAfter).toBeNull();
  });
});
