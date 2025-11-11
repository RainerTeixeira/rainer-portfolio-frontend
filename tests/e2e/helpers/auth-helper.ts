/**
 * Helper de Autenticação para Testes E2E
 *
 * Fornece funções auxiliares para autenticação nos testes do dashboard.
 * Usa credenciais padrão de desenvolvimento: admin/admin
 */

import { Page } from '@playwright/test';

/**
 * Credenciais padrão para desenvolvimento
 */
export const DEV_CREDENTIALS = {
  username: 'admin',
  password: 'admin',
} as const;

/**
 * Realiza login no dashboard
 *
 * @param page - Instância do Playwright Page
 * @param username - Nome de usuário (padrão: admin)
 * @param password - Senha (padrão: admin)
 */
export async function loginToDashboard(
  page: Page,
  username: string = DEV_CREDENTIALS.username,
  password: string = DEV_CREDENTIALS.password
): Promise<void> {
  // Verificar se já está autenticado
  const alreadyAuth = await isAuthenticated(page);
  if (alreadyAuth) {
    return;
  }

  // Navegar para página de login
  await page.goto('/dashboard/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Preencher formulário de login - tentar múltiplos seletores
  const usernameInput = page
    .locator(
      'input[name*="username" i], input[type="text"]:not([type="password"]), input[placeholder*="usuário" i], input[placeholder*="email" i], input[placeholder*="username" i]'
    )
    .first();

  const passwordInput = page
    .locator('input[name*="password" i], input[type="password"]')
    .first();

  // Aguardar campos aparecerem
  await usernameInput
    .waitFor({ state: 'visible', timeout: 15000 })
    .catch(() => {
      throw new Error('Campo de usuário não encontrado na página de login');
    });
  await passwordInput
    .waitFor({ state: 'visible', timeout: 15000 })
    .catch(() => {
      throw new Error('Campo de senha não encontrado na página de login');
    });

  // Preencher credenciais
  await usernameInput.fill(username);
  await passwordInput.fill(password);
  await page.waitForTimeout(500);

  // Clicar no botão de login
  const loginButton = page
    .locator(
      'button[type="submit"], button:has-text("Entrar"), button:has-text("Login"), button:has-text("Log in"), button:has-text("Sign in")'
    )
    .first();

  const buttonVisible = await loginButton
    .isVisible({ timeout: 5000 })
    .catch(() => false);
  if (!buttonVisible) {
    throw new Error('Botão de login não encontrado');
  }

  await loginButton.click();

  // Aguardar redirecionamento ou sucesso
  await page.waitForTimeout(3000);

  // Verificar se foi redirecionado para dashboard
  const currentUrl = page.url();

  // Se ainda está na página de login, verificar se login foi bem-sucedido via localStorage
  if (currentUrl.includes('/login')) {
    await page.waitForTimeout(2000);
    const authUser = await page.evaluate(() => {
      return localStorage.getItem('auth_user');
    });

    if (authUser) {
      // Login bem-sucedido, mas ainda na página de login - aguardar redirecionamento
      await page.waitForTimeout(2000);
    } else {
      // Verificar se há mensagem de erro
      const errorMessage = page.locator(
        'text=/erro|error|incorreto|inválido|não encontrado/i, [role="alert"], .error'
      );
      const hasError = await errorMessage
        .isVisible({ timeout: 3000 })
        .catch(() => false);

      if (hasError) {
        const errorText = await errorMessage.textContent().catch(() => '');
        throw new Error(`Falha no login: ${errorText}`);
      }

      // Tentar novamente ou verificar se precisa criar usuário
      throw new Error(
        'Login falhou - verifique se o usuário admin/admin existe'
      );
    }
  }

  // Verificar autenticação final
  const finalAuth = await isAuthenticated(page);
  if (!finalAuth) {
    throw new Error('Autenticação não foi estabelecida após login');
  }
}

/**
 * Verifica se está autenticado
 *
 * @param page - Instância do Playwright Page
 * @returns true se autenticado, false caso contrário
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  const authUser = await page.evaluate(() => {
    return localStorage.getItem('auth_user');
  });
  return !!authUser;
}

/**
 * Realiza logout
 *
 * @param page - Instância do Playwright Page
 */
export async function logoutFromDashboard(page: Page): Promise<void> {
  // Procurar botão de logout
  const logoutButton = page
    .locator(
      'button:has-text("Sair"), button:has-text("Logout"), button[aria-label*="logout" i], button[aria-label*="sair" i]'
    )
    .first();

  const logoutVisible = await logoutButton
    .isVisible({ timeout: 3000 })
    .catch(() => false);

  if (logoutVisible) {
    await logoutButton.click();
    await page.waitForTimeout(1000);
  } else {
    // Limpar localStorage diretamente
    await page.evaluate(() => {
      localStorage.removeItem('auth_user');
    });
  }
}

/**
 * Garante que está autenticado antes de executar testes
 *
 * @param page - Instância do Playwright Page
 */
export async function ensureAuthenticated(page: Page): Promise<void> {
  const authenticated = await isAuthenticated(page);

  if (!authenticated) {
    await loginToDashboard(page);
    await page.waitForTimeout(1000);

    // Verificar novamente
    const stillNotAuthenticated = !(await isAuthenticated(page));
    if (stillNotAuthenticated) {
      throw new Error('Não foi possível autenticar no dashboard');
    }
  }
}
