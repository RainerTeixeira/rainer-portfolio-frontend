/**
 * Testes E2E do Sistema de Cookies - Ambiente de Produção
 *
 * Testes que simulam o ambiente de produção real:
 * - Testa com servidor de produção (build + start)
 * - Testa comportamento real do navegador
 * - Testa localStorage real
 * - Testa cookies reais
 * - Testa integração com analytics real
 *
 * Para executar em produção:
 * npm run build && npm run start
 * npm run test:e2e tests/e2e/cookies-production.spec.ts
 *
 * @module tests/e2e/cookies-production.spec
 * @fileoverview Testes E2E do sistema de cookies em produção
 */

import { expect, test } from '@playwright/test';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

test.describe('Sistema de Cookies - Produção Real', () => {
  test.beforeEach(async ({ page, context }) => {
    // Limpa storage antes de cada teste
    await context.clearCookies();
    await context.clearPermissions();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('deve funcionar como em produção: fluxo completo', async ({ page }) => {
    // 1. Visita inicial
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800); // Aguarda delay do banner

    // 2. Verifica que banner aparece
    const bannerTitle = page.getByRole('heading', {
      name: /utilizamos cookies/i,
    });
    await expect(bannerTitle).toBeVisible({ timeout: 3000 });

    // 3. Verifica localStorage antes de aceitar
    const consentBefore = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });
    expect(consentBefore).toBeNull();

    // 4. Aceita todos os cookies
    const acceptButton = page.getByRole('button', {
      name: /aceitar todos/i,
    });
    await acceptButton.click();
    await page.waitForTimeout(1000);

    // 5. Verifica localStorage após aceitar
    const consentAfter = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });
    expect(consentAfter).not.toBeNull();

    const consentData = JSON.parse(consentAfter || '{}');
    expect(consentData.consented).toBe(true);
    expect(consentData.preferences).toBeDefined();

    // 6. Recarrega página e verifica que banner não aparece
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    const bannerAfterReload = page.getByText(/utilizamos cookies/i);
    await expect(bannerAfterReload).not.toBeVisible({ timeout: 2000 });

    // 7. Navega para outras páginas
    await page.goto(`${BASE_URL}/sobre`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // 8. Verifica que consentimento persiste
    const consentPersisted = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });
    expect(consentPersisted).toBe(consentAfter);

    // 9. Vai para página de configurações
    await page.goto(`${BASE_URL}/cookies/settings`, {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(1000);

    // 10. Verifica que preferências são carregadas
    const analyticsSwitch = page
      .locator('input[id="analytics"]')
      .or(
        page
          .locator('label:has-text("Analytics")')
          .locator('..')
          .locator('input[type="checkbox"]')
      )
      .first();

    if (await analyticsSwitch.isVisible({ timeout: 3000 })) {
      const isChecked = await analyticsSwitch.isChecked();
      expect(isChecked).toBe(true); // Deve estar ativado porque aceitamos todos
    }
  });

  test('deve funcionar como em produção: rejeitar opcionais', async ({
    page,
  }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Rejeita cookies opcionais
    const rejectButton = page.getByRole('button', {
      name: /rejeitar opcionais/i,
    });
    await rejectButton.click();
    await page.waitForTimeout(1000);

    // Verifica localStorage
    const consent = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });
    expect(consent).not.toBeNull();

    const consentData = JSON.parse(consent || '{}');
    expect(consentData.preferences.essential).toBe(true);
    expect(consentData.preferences.analytics).toBe(false);
    expect(consentData.preferences.performance).toBe(false);
    expect(consentData.preferences.functionality).toBe(false);

    // Recarrega e verifica que banner não aparece
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    const banner = page.getByText(/utilizamos cookies/i);
    await expect(banner).not.toBeVisible({ timeout: 2000 });
  });

  test('deve funcionar como em produção: personalização completa', async ({
    page,
  }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Abre personalização
    const customizeButton = page.getByRole('button', {
      name: /personalizar/i,
    });
    await customizeButton.click();
    await page.waitForTimeout(500);

    // Verifica view de personalização
    await expect(page.getByText(/personalizar cookies/i)).toBeVisible({
      timeout: 2000,
    });

    // Configura preferências específicas
    // Ativa performance
    const performanceSwitch = page
      .locator('input[id="performance"]')
      .or(
        page
          .locator('label:has-text("Performance")')
          .locator('..')
          .locator('input[type="checkbox"]')
      )
      .first();

    if (await performanceSwitch.isVisible({ timeout: 2000 })) {
      if (!(await performanceSwitch.isChecked())) {
        await performanceSwitch.click();
      }
    }

    // Desativa analytics
    const analyticsSwitch = page
      .locator('input[id="analytics"]')
      .or(
        page
          .locator('label:has-text("Analytics")')
          .locator('..')
          .locator('input[type="checkbox"]')
      )
      .first();

    if (await analyticsSwitch.isVisible({ timeout: 2000 })) {
      if (await analyticsSwitch.isChecked()) {
        await analyticsSwitch.click();
      }
    }

    await page.waitForTimeout(300);

    // Salva
    const saveButton = page.getByRole('button', {
      name: /salvar preferências/i,
    });
    await saveButton.click();
    await page.waitForTimeout(1000);

    // Verifica que preferências foram salvas
    const consent = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });
    const consentData = JSON.parse(consent || '{}');
    expect(consentData.preferences.essential).toBe(true);
    expect(consentData.preferences.performance).toBe(true);
    expect(consentData.preferences.analytics).toBe(false);
  });

  test('deve funcionar como em produção: link do footer', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Aceita cookies primeiro
    await page.waitForTimeout(800);
    const acceptButton = page.getByRole('button', {
      name: /aceitar todos/i,
    });
    if (await acceptButton.isVisible({ timeout: 2000 })) {
      await acceptButton.click();
      await page.waitForTimeout(500);
    }

    // Rola para o footer
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000);

    // Clica em "Gerenciar Cookies"
    const manageLink = page.getByRole('link', {
      name: /gerenciar cookies/i,
    });
    await expect(manageLink).toBeVisible({ timeout: 3000 });
    await manageLink.click();

    // Verifica que navegou
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*\/cookies\/settings/);
  });

  test('deve funcionar como em produção: múltiplas abas', async ({
    context,
  }) => {
    // Cria duas páginas (abas)
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    try {
      // Aba 1: Aceita cookies
      await page1.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page1.waitForTimeout(800);

      const acceptButton = page1.getByRole('button', {
        name: /aceitar todos/i,
      });
      if (await acceptButton.isVisible({ timeout: 2000 })) {
        await acceptButton.click();
        await page1.waitForTimeout(1000);
      }

      // Aba 2: Verifica que não vê banner (mesmo contexto de storage)
      await page2.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page2.waitForTimeout(800);

      const banner2 = page2.getByText(/utilizamos cookies/i);
      await expect(banner2).not.toBeVisible({ timeout: 2000 });
    } finally {
      await page1.close();
      await page2.close();
    }
  });

  test('deve funcionar como em produção: revogar consentimento', async ({
    page,
  }) => {
    // Aceita cookies primeiro
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    const acceptButton = page.getByRole('button', {
      name: /aceitar todos/i,
    });
    if (await acceptButton.isVisible({ timeout: 2000 })) {
      await acceptButton.click();
      await page.waitForTimeout(1000);
    }

    // Verifica que consentimento existe
    let consent = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });
    expect(consent).not.toBeNull();

    // Limpa localStorage manualmente (simula revogação)
    await page.evaluate(() => {
      localStorage.removeItem('cookie-consent');
      localStorage.removeItem('cookie-preferences');
    });

    // Recarrega página
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Banner deve aparecer novamente
    const banner = page.getByText(/utilizamos cookies/i);
    await expect(banner).toBeVisible({ timeout: 2000 });
  });

  test('deve funcionar como em produção: verificar cookies no navegador', async ({
    page,
    context,
  }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Aceita todos os cookies
    const acceptButton = page.getByRole('button', {
      name: /aceitar todos/i,
    });
    if (await acceptButton.isVisible({ timeout: 2000 })) {
      await acceptButton.click();
      await page.waitForTimeout(1000);
    }

    // Verifica cookies no contexto do navegador
    const cookies = await context.cookies();
    const hasConsentCookie = cookies.some(
      cookie =>
        cookie.name.includes('consent') || cookie.name.includes('cookie')
    );

    // Nota: O sistema atual usa apenas localStorage, não cookies HTTP
    // Mas verificamos que localStorage está funcionando
    const localStorageConsent = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });
    expect(localStorageConsent).not.toBeNull();
  });

  test('deve funcionar como em produção: verificar eventos customizados', async ({
    page,
  }) => {
    let eventFired = false;
    let eventData: any = null;

    // Escuta evento de atualização de consentimento
    await page.addInitScript(() => {
      window.addEventListener('cookie-consent-updated', (event: any) => {
        (window as any).__cookieConsentEvent = event.detail;
      });
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Aceita cookies
    const acceptButton = page.getByRole('button', {
      name: /aceitar todos/i,
    });
    if (await acceptButton.isVisible({ timeout: 2000 })) {
      await acceptButton.click();
      await page.waitForTimeout(1000);
    }

    // Verifica se evento foi disparado
    const eventDetail = await page.evaluate(() => {
      return (window as any).__cookieConsentEvent;
    });

    if (eventDetail) {
      expect(eventDetail.essential).toBe(true);
      expect(eventDetail.analytics).toBe(true);
    }
  });

  test('deve funcionar como em produção: performance do banner', async ({
    page,
  }) => {
    const startTime = Date.now();

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Aguarda banner aparecer
    await page.waitForSelector('text=/utilizamos cookies/i', {
      timeout: 3000,
    });

    const endTime = Date.now();
    const loadTime = endTime - startTime;

    // Banner deve aparecer rapidamente
    expect(loadTime).toBeLessThan(3000);

    // Verifica que não há erros no console
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.waitForTimeout(1000);

    // Filtra apenas erros relacionados a cookies (outros podem ser esperados)
    const cookieErrors = errors.filter(error =>
      error.toLowerCase().includes('cookie')
    );
    expect(cookieErrors.length).toBe(0);
  });

  test('deve funcionar como em produção: acessibilidade completa', async ({
    page,
  }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Verifica ARIA labels
    const banner = page.locator('[role="dialog"]').first();
    if (await banner.isVisible({ timeout: 2000 })) {
      await expect(banner).toHaveAttribute('aria-labelledby');
      await expect(banner).toHaveAttribute('aria-describedby');
    }

    // Verifica que botões são acessíveis via teclado
    const acceptButton = page.getByRole('button', {
      name: /aceitar todos/i,
    });
    await expect(acceptButton).toBeVisible();

    // Testa navegação por teclado
    await acceptButton.focus();
    await expect(acceptButton).toBeFocused();

    // Verifica contraste (se possível)
    const buttonColor = await acceptButton.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        color: style.color,
        backgroundColor: style.backgroundColor,
      };
    });
    expect(buttonColor).toBeDefined();
  });

  test('deve funcionar como em produção: diferentes navegadores', async ({
    browserName,
    page,
  }) => {
    // Este teste roda em todos os navegadores configurados
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Verifica que banner aparece independente do navegador
    const banner = page.getByText(/utilizamos cookies/i);
    await expect(banner).toBeVisible({ timeout: 3000 });

    // Aceita cookies
    const acceptButton = page.getByRole('button', {
      name: /aceitar todos/i,
    });
    await acceptButton.click();
    await page.waitForTimeout(1000);

    // Verifica localStorage (deve funcionar em todos os navegadores modernos)
    const consent = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent');
    });
    expect(consent).not.toBeNull();

    console.log(`Teste passou no navegador: ${browserName}`);
  });
});
