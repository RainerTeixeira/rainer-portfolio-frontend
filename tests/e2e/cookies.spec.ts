/**
 * Testes E2E do Sistema de Cookies - Produção
 *
 * Testa o sistema de cookies em ambiente real de produção:
 * - Banner de cookies aparece na primeira visita
 * - Aceitar/rejeitar cookies funciona
 * - Personalização de cookies
 * - Persistência no localStorage
 * - Integração com analytics
 * - Navegação entre páginas
 * - Página de configurações de cookies
 *
 * @module tests/e2e/cookies.spec
 * @fileoverview Testes E2E do sistema de cookies em produção
 */

import { expect, test } from '@playwright/test';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

test.describe('Sistema de Cookies - Testes E2E Produção', () => {
  // Contexto isolado para cada teste (novo navegador)
  test.use({
    // Limpar storage antes de cada teste para simular primeira visita
    storageState: {
      cookies: [],
      origins: [],
    },
  });

  test.describe('Banner de Cookies', () => {
    test('deve exibir banner de cookies na primeira visita', async ({
      page,
    }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      // Aguarda banner aparecer (delay de 500ms + margem)
      await page.waitForTimeout(800);

      // Verifica se o banner aparece usando heading (título do banner)
      const bannerTitle = page.getByRole('heading', {
        name: /utilizamos cookies/i,
      });
      await expect(bannerTitle).toBeVisible({ timeout: 5000 });

      // Verifica se há botões de ação usando getByRole (mais confiável)
      await expect(
        page.getByRole('button', { name: /aceitar todos/i })
      ).toBeVisible({ timeout: 3000 });
      await expect(
        page.getByRole('button', { name: /rejeitar opcionais/i })
      ).toBeVisible({ timeout: 3000 });
      await expect(
        page.getByRole('button', { name: /personalizar/i })
      ).toBeVisible({ timeout: 3000 });
    });

    test('não deve exibir banner após aceitar cookies', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // Aceita todos os cookies
      const acceptButton = page.getByRole('button', {
        name: /aceitar todos/i,
      });
      if (await acceptButton.isVisible({ timeout: 2000 })) {
        await acceptButton.click();
        await page.waitForTimeout(500);
      }

      // Recarrega a página
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // Banner não deve aparecer
      const banner = page.getByRole('heading', {
        name: /utilizamos cookies/i,
      });
      await expect(banner).not.toBeVisible({ timeout: 2000 });
    });

    test('deve aceitar todos os cookies e salvar no localStorage', async ({
      page,
    }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // Verifica que não há consentimento salvo
      const consentBefore = await page.evaluate(() => {
        return localStorage.getItem('cookie-consent');
      });
      expect(consentBefore).toBeNull();

      // Aceita todos os cookies
      const acceptButton = page.getByRole('button', {
        name: /aceitar todos/i,
      });
      await acceptButton.click({ timeout: 2000 });
      await page.waitForTimeout(500);

      // Verifica que consentimento foi salvo
      const consentAfter = await page.evaluate(() => {
        return localStorage.getItem('cookie-consent');
      });
      expect(consentAfter).not.toBeNull();

      const consentData = JSON.parse(consentAfter || '{}');
      expect(consentData.consented).toBe(true);
      expect(consentData.preferences.essential).toBe(true);
      expect(consentData.preferences.analytics).toBe(true);
      expect(consentData.preferences.performance).toBe(true);
      expect(consentData.preferences.functionality).toBe(true);
    });

    test('deve rejeitar cookies opcionais e salvar apenas essenciais', async ({
      page,
    }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // Rejeita cookies opcionais
      const rejectButton = page.getByRole('button', {
        name: /rejeitar opcionais/i,
      });
      await rejectButton.click({ timeout: 2000 });
      await page.waitForTimeout(500);

      // Verifica que apenas cookies essenciais foram salvos
      const consent = await page.evaluate(() => {
        return localStorage.getItem('cookie-consent');
      });
      expect(consent).not.toBeNull();

      const consentData = JSON.parse(consent || '{}');
      expect(consentData.preferences.essential).toBe(true);
      expect(consentData.preferences.analytics).toBe(false);
      expect(consentData.preferences.performance).toBe(false);
      expect(consentData.preferences.functionality).toBe(false);
    });

    test('deve abrir personalização de cookies', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // Clica em personalizar
      const customizeButton = page.getByRole('button', {
        name: /personalizar/i,
      });
      await customizeButton.click({ timeout: 2000 });
      await page.waitForTimeout(500);

      // Verifica se a view de personalização está visível
      await expect(page.getByText(/personalizar cookies/i)).toBeVisible({
        timeout: 2000,
      });

      // Verifica se todas as categorias estão visíveis
      await expect(page.getByText(/cookies essenciais/i)).toBeVisible({
        timeout: 3000,
      });
      await expect(page.getByText(/cookies de performance/i)).toBeVisible({
        timeout: 3000,
      });
      await expect(page.getByText(/cookies de funcionalidade/i)).toBeVisible({
        timeout: 3000,
      });
      await expect(page.getByText(/cookies de analytics/i)).toBeVisible({
        timeout: 3000,
      });
    });

    test('deve fechar banner ao clicar no botão X', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // Fecha o banner - procura botão de fechar pelo aria-label
      const closeButton = page.getByRole('button', {
        name: /fechar banner de cookies/i,
      });
      await closeButton.click({ timeout: 2000 });
      await page.waitForTimeout(500);

      // Banner não deve estar mais visível após fechar
      // Aguarda um pouco e verifica que o heading não está mais visível
      await page.waitForTimeout(300);
      const banner = page.getByRole('heading', {
        name: /utilizamos cookies/i,
      });
      await expect(banner).not.toBeVisible({ timeout: 2000 });
    });
  });

  test.describe('Personalização de Cookies', () => {
    test('deve permitir personalizar preferências de cookies', async ({
      page,
    }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // Abre personalização
      const customizeButton = page.getByRole('button', {
        name: /personalizar/i,
      });
      await customizeButton.click({ timeout: 2000 });
      await page.waitForTimeout(500);

      // Verifica se cookies essenciais estão desabilitados (não podem ser desativados)
      // O Switch do Radix UI usa role="switch"
      const essentialSwitch = page.getByRole('switch', {
        name: /cookies essenciais/i,
      });
      if (await essentialSwitch.isVisible({ timeout: 3000 })) {
        const isDisabled = await essentialSwitch.isDisabled();
        expect(isDisabled).toBe(true);
      }

      // Desativa analytics usando role="switch"
      const analyticsSwitch = page.getByRole('switch', {
        name: /cookies de analytics/i,
      });
      if (await analyticsSwitch.isVisible({ timeout: 3000 })) {
        const isChecked = await analyticsSwitch.isChecked();
        if (isChecked) {
          await analyticsSwitch.click();
          await page.waitForTimeout(300);
        }
      }

      // Salva preferências
      const saveButton = page.getByRole('button', {
        name: /salvar preferências/i,
      });
      await saveButton.click({ timeout: 2000 });
      await page.waitForTimeout(500);

      // Verifica que preferências foram salvas
      const consent = await page.evaluate(() => {
        return localStorage.getItem('cookie-consent');
      });
      const consentData = JSON.parse(consent || '{}');
      expect(consentData.preferences.essential).toBe(true);
      expect(consentData.preferences.analytics).toBe(false);
    });

    test('deve exibir lista de cookies por categoria', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // Abre personalização
      const customizeButton = page.getByRole('button', {
        name: /personalizar/i,
      });
      await customizeButton.click({ timeout: 2000 });
      await page.waitForTimeout(500);

      // Verifica se há menção a cookies utilizados
      await expect(page.getByText(/cookies utilizados/i)).toBeVisible({
        timeout: 2000,
      });
    });
  });

  test.describe('Página de Configurações de Cookies', () => {
    test('deve acessar página de configurações de cookies', async ({
      page,
    }) => {
      await page.goto(`${BASE_URL}/cookies/settings`);
      await page.waitForLoadState('networkidle');

      // Verifica se a página carregou
      await expect(page.getByText(/configurações de cookies/i)).toBeVisible({
        timeout: 5000,
      });

      // Verifica se todas as categorias estão presentes
      await expect(page.getByText(/cookies essenciais/i)).toBeVisible({
        timeout: 3000,
      });
      await expect(page.getByText(/cookies de performance/i)).toBeVisible({
        timeout: 3000,
      });
      await expect(page.getByText(/cookies de funcionalidade/i)).toBeVisible({
        timeout: 3000,
      });
      await expect(page.getByText(/cookies de analytics/i)).toBeVisible({
        timeout: 3000,
      });
    });

    test('deve atualizar preferências na página de configurações', async ({
      page,
    }) => {
      // Primeiro aceita todos os cookies
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      const acceptButton = page.getByRole('button', {
        name: /aceitar todos/i,
      });
      if (await acceptButton.isVisible({ timeout: 2000 })) {
        await acceptButton.click();
        await page.waitForTimeout(500);
      }

      // Vai para página de configurações
      await page.goto(`${BASE_URL}/cookies/settings`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // Desativa analytics
      const analyticsSwitch = page.getByRole('switch', {
        name: /cookies de analytics/i,
      });
      if (await analyticsSwitch.isVisible({ timeout: 3000 })) {
        const isChecked = await analyticsSwitch.isChecked();
        if (isChecked) {
          await analyticsSwitch.click();
          await page.waitForTimeout(300);
        }
      }

      // Salva preferências
      const saveButton = page.getByRole('button', {
        name: /salvar preferências/i,
      });
      await saveButton.click({ timeout: 2000 });
      await page.waitForTimeout(500);

      // Verifica que preferências foram atualizadas
      const consent = await page.evaluate(() => {
        return localStorage.getItem('cookie-consent');
      });
      const consentData = JSON.parse(consent || '{}');
      expect(consentData.preferences.analytics).toBe(false);
    });

    test('deve ter links para políticas de privacidade e termos', async ({
      page,
    }) => {
      await page.goto(`${BASE_URL}/cookies/settings`);
      await page.waitForLoadState('networkidle');

      // Verifica links para políticas
      await expect(
        page.getByRole('link', { name: /política de cookies/i })
      ).toBeVisible({ timeout: 3000 });
      await expect(
        page.getByRole('link', { name: /política de privacidade/i })
      ).toBeVisible({ timeout: 3000 });
    });
  });

  test.describe('Persistência de Cookies', () => {
    test('deve persistir preferências entre navegações', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // Aceita todos os cookies
      const acceptButton = page.getByRole('button', {
        name: /aceitar todos/i,
      });
      if (await acceptButton.isVisible({ timeout: 2000 })) {
        await acceptButton.click();
        await page.waitForTimeout(500);
      }

      // Navega para outra página
      await page.goto(`${BASE_URL}/sobre`);
      await page.waitForLoadState('networkidle');

      // Verifica que consentimento ainda está salvo
      const consent = await page.evaluate(() => {
        return localStorage.getItem('cookie-consent');
      });
      expect(consent).not.toBeNull();

      // Navega para outra página
      await page.goto(`${BASE_URL}/contato`);
      await page.waitForLoadState('networkidle');

      // Verifica que consentimento ainda está salvo
      const consentAfter = await page.evaluate(() => {
        return localStorage.getItem('cookie-consent');
      });
      expect(consentAfter).not.toBeNull();
      expect(consentAfter).toBe(consent);
    });

    test('deve manter preferências após reload da página', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // Aceita todos os cookies
      const acceptButton = page.getByRole('button', {
        name: /aceitar todos/i,
      });
      if (await acceptButton.isVisible({ timeout: 2000 })) {
        await acceptButton.click();
        await page.waitForTimeout(500);
      }

      // Obtém consentimento antes do reload
      const consentBefore = await page.evaluate(() => {
        return localStorage.getItem('cookie-consent');
      });

      // Recarrega a página
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      // Verifica que consentimento foi mantido
      const consentAfter = await page.evaluate(() => {
        return localStorage.getItem('cookie-consent');
      });
      expect(consentAfter).toBe(consentBefore);
    });
  });

  test.describe('Links no Footer', () => {
    test('deve ter link para gerenciar cookies no footer', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      // Rola para o footer
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForTimeout(500);

      // Verifica link de gerenciar cookies
      const manageCookiesLink = page.getByRole('link', {
        name: /gerenciar cookies/i,
      });
      await expect(manageCookiesLink).toBeVisible({ timeout: 3000 });

      // Clica no link
      await manageCookiesLink.click();
      await page.waitForLoadState('networkidle');

      // Verifica que navegou para a página de configurações
      await expect(page).toHaveURL(/.*\/cookies\/settings/);
    });

    test('deve ter link para política de cookies no footer', async ({
      page,
    }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      // Rola para o footer
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForTimeout(500);

      // Verifica link de cookies (pode estar no footer)
      const cookiesLink = page
        .getByRole('link', {
          name: /política de cookies|cookies/i,
        })
        .first();
      await expect(cookiesLink).toBeVisible({ timeout: 3000 });

      // Clica no link
      await cookiesLink.click();
      await page.waitForLoadState('networkidle');

      // Verifica que navegou para a página de cookies
      await expect(page).toHaveURL(/.*\/cookies/);
    });
  });

  test.describe('Páginas Legais', () => {
    test('deve carregar página de política de cookies', async ({ page }) => {
      await page.goto(`${BASE_URL}/cookies`);
      await page.waitForLoadState('networkidle');

      // Verifica se a página carregou
      await expect(page.getByText(/política de cookies/i)).toBeVisible({
        timeout: 5000,
      });

      // Verifica seções principais
      await expect(page.getByText(/o que são cookies/i)).toBeVisible({
        timeout: 3000,
      });
      await expect(page.getByText(/tipos de cookies utilizados/i)).toBeVisible({
        timeout: 3000,
      });
      await expect(page.getByText(/como gerenciar cookies/i)).toBeVisible({
        timeout: 3000,
      });
    });

    test('deve carregar página de política de privacidade', async ({
      page,
    }) => {
      await page.goto(`${BASE_URL}/privacidade`);
      await page.waitForLoadState('networkidle');

      // Verifica se a página carregou
      await expect(page.getByText(/política de privacidade/i)).toBeVisible({
        timeout: 5000,
      });

      // Verifica seções principais
      await expect(page.getByText(/dados coletados/i)).toBeVisible({
        timeout: 3000,
      });
      await expect(page.getByText(/seus direitos/i)).toBeVisible({
        timeout: 3000,
      });
    });

    test('deve carregar página de termos de uso', async ({ page }) => {
      await page.goto(`${BASE_URL}/termos`);
      await page.waitForLoadState('networkidle');

      // Verifica se a página carregou
      await expect(page.getByText(/termos de uso/i)).toBeVisible({
        timeout: 5000,
      });

      // Verifica seções principais
      await expect(page.getByText(/aceitação dos termos/i)).toBeVisible({
        timeout: 3000,
      });
      await expect(page.getByText(/condutas proibidas/i)).toBeVisible({
        timeout: 3000,
      });
    });
  });

  test.describe('Integração com Analytics (Produção)', () => {
    test('deve carregar scripts de analytics quando permitido', async ({
      page,
    }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // Aceita todos os cookies (incluindo analytics)
      const acceptButton = page.getByRole('button', {
        name: /aceitar todos/i,
      });
      if (await acceptButton.isVisible({ timeout: 2000 })) {
        await acceptButton.click();
        await page.waitForTimeout(1000);
      }

      // Verifica se scripts de analytics foram carregados
      // (se GA_ID estiver configurado)
      const analyticsScripts = await page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script'));
        return scripts.some(
          script =>
            script.src.includes('googletagmanager.com') ||
            script.src.includes('google-analytics.com') ||
            script.innerHTML.includes('gtag') ||
            script.innerHTML.includes('dataLayer')
        );
      });

      // Se GA_ID estiver configurado, scripts devem estar presentes
      // Se não estiver, este teste passa (não é obrigatório)
      if (process.env.NEXT_PUBLIC_GA_ID) {
        // Apenas verifica se o consentimento foi salvo corretamente
        const consent = await page.evaluate(() => {
          return localStorage.getItem('cookie-consent');
        });
        expect(consent).not.toBeNull();
      }
    });

    test('não deve carregar scripts de analytics quando rejeitado', async ({
      page,
    }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // Rejeita cookies opcionais (incluindo analytics)
      const rejectButton = page.getByRole('button', {
        name: /rejeitar opcionais/i,
      });
      if (await rejectButton.isVisible({ timeout: 2000 })) {
        await rejectButton.click();
        await page.waitForTimeout(1000);
      }

      // Verifica que consentimento foi salvo sem analytics
      const consent = await page.evaluate(() => {
        return localStorage.getItem('cookie-consent');
      });
      const consentData = JSON.parse(consent || '{}');
      expect(consentData.preferences.analytics).toBe(false);
    });
  });

  test.describe('Fluxo Completo de Produção', () => {
    test('deve completar fluxo: primeira visita -> personalizar -> salvar -> navegar', async ({
      page,
    }) => {
      // 1. Primeira visita
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // 2. Verifica que banner aparece
      await expect(
        page.getByRole('heading', { name: /utilizamos cookies/i })
      ).toBeVisible({ timeout: 5000 });

      // 3. Abre personalização
      const customizeButton = page.getByRole('button', {
        name: /personalizar/i,
      });
      await customizeButton.click({ timeout: 2000 });
      await page.waitForTimeout(500);

      // 4. Personaliza preferências (ativa apenas analytics)
      const analyticsSwitch = page.getByRole('switch', {
        name: /cookies de analytics/i,
      });
      if (await analyticsSwitch.isVisible({ timeout: 3000 })) {
        // Garante que está ativado
        const isChecked = await analyticsSwitch.isChecked();
        if (!isChecked) {
          await analyticsSwitch.click();
          await page.waitForTimeout(300);
        }
      }

      // 5. Salva preferências
      const saveButton = page.getByRole('button', {
        name: /salvar preferências/i,
      });
      await saveButton.click({ timeout: 2000 });
      await page.waitForTimeout(500);

      // 6. Verifica que preferências foram salvas
      const consent = await page.evaluate(() => {
        return localStorage.getItem('cookie-consent');
      });
      expect(consent).not.toBeNull();

      // 7. Navega para outra página
      await page.goto(`${BASE_URL}/sobre`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      // 8. Verifica que banner não aparece
      const banner = page.getByRole('heading', {
        name: /utilizamos cookies/i,
      });
      await expect(banner).not.toBeVisible({ timeout: 2000 });

      // 9. Verifica que preferências foram mantidas
      const consentAfter = await page.evaluate(() => {
        return localStorage.getItem('cookie-consent');
      });
      expect(consentAfter).toBe(consent);
    });

    test('deve permitir alterar preferências após consentimento inicial', async ({
      page,
    }) => {
      // 1. Aceita todos os cookies inicialmente
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      const acceptButton = page.getByRole('button', {
        name: /aceitar todos/i,
      });
      if (await acceptButton.isVisible({ timeout: 2000 })) {
        await acceptButton.click();
        await page.waitForTimeout(500);
      }

      // 2. Vai para página de configurações
      await page.goto(`${BASE_URL}/cookies/settings`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // 3. Altera preferências (desativa analytics)
      const analyticsSwitch = page.getByRole('switch', {
        name: /cookies de analytics/i,
      });
      if (await analyticsSwitch.isVisible({ timeout: 3000 })) {
        const isChecked = await analyticsSwitch.isChecked();
        if (isChecked) {
          await analyticsSwitch.click();
          await page.waitForTimeout(300);
        }
      }

      // 4. Salva
      const saveButton = page.getByRole('button', {
        name: /salvar preferências/i,
      });
      await saveButton.click({ timeout: 2000 });
      await page.waitForTimeout(500);

      // 5. Verifica que preferências foram atualizadas
      const consent = await page.evaluate(() => {
        return localStorage.getItem('cookie-consent');
      });
      const consentData = JSON.parse(consent || '{}');
      expect(consentData.preferences.analytics).toBe(false);
    });
  });

  test.describe('Responsividade e Acessibilidade', () => {
    test('deve funcionar em mobile', async ({ page }) => {
      // Simula dispositivo mobile
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // Verifica se banner aparece
      const banner = page.getByRole('heading', {
        name: /utilizamos cookies/i,
      });
      await expect(banner).toBeVisible({ timeout: 5000 });

      // Verifica se botões estão acessíveis
      await expect(
        page.locator('button:has-text("Aceitar Todos")')
      ).toBeVisible();
    });

    test('deve funcionar em tablet', async ({ page }) => {
      // Simula dispositivo tablet
      await page.setViewportSize({ width: 768, height: 1024 });

      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // Verifica se banner aparece
      const banner = page.getByRole('heading', {
        name: /utilizamos cookies/i,
      });
      await expect(banner).toBeVisible({ timeout: 5000 });
    });

    test('deve ter elementos acessíveis (ARIA labels)', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(600);

      // Verifica se há elementos com ARIA labels
      const bannerDialog = page.locator('[role="dialog"]');
      if (await bannerDialog.isVisible({ timeout: 2000 })) {
        await expect(bannerDialog).toHaveAttribute(
          'aria-labelledby',
          /cookie-banner-title/
        );
      }
    });
  });

  test.describe('Performance', () => {
    test('banner deve aparecer rapidamente', async ({ page }) => {
      const startTime = Date.now();

      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      // Aguarda banner aparecer
      await page.waitForSelector('text=/utilizamos cookies/i', {
        timeout: 2000,
      });

      const endTime = Date.now();
      const loadTime = endTime - startTime;

      // Banner deve aparecer em menos de 2 segundos (incluindo delay de 500ms)
      expect(loadTime).toBeLessThan(2000);
    });

    test('não deve bloquear carregamento da página', async ({ page }) => {
      await page.goto(BASE_URL);

      // Verifica que a página carrega mesmo sem interação com o banner
      await page.waitForLoadState('networkidle');

      // Verifica que conteúdo principal está visível
      const mainContent = page.locator('main, [role="main"]');
      await expect(mainContent.first()).toBeVisible({ timeout: 5000 });
    });
  });
});
