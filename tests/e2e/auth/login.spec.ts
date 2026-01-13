import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('deve carregar a página de login sem erros', async ({ page }) => {
    // Capturar erros de console
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Capturar erros de página (uncaught exceptions)
    const pageErrors: string[] = [];
    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });

    // Navegar para página de login
    await page.goto('http://localhost:3000/dashboard/login');

    // Aguardar página carregar completamente
    await page.waitForLoadState('networkidle');

    // Verificar se a página carregou
    await expect(page).toHaveTitle(/Login/i);

    // Verificar se o formulário está presente
    const emailInput = page.getByPlaceholder(/email ou usuário/i);
    const passwordInput = page.getByPlaceholder(/senha/i);
    const submitButton = page.getByRole('button', { name: /entrar/i });

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    // Verificar se não há erros
    expect(pageErrors).toEqual([]);
    expect(consoleErrors.filter(err => 
      err.includes('TRANSITIONS') || 
      err.includes('BORDER_RADIUS') ||
      err.includes('is not defined')
    )).toEqual([]);

    console.log('✅ Página carregou sem erros de TRANSITIONS ou BORDER_RADIUS');
  });

  test('deve permitir preencher o formulário de login', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/login');
    await page.waitForLoadState('networkidle');

    // Preencher formulário
    await page.getByPlaceholder(/email ou usuário/i).fill('cahew94994@nyfhk.com');
    await page.getByPlaceholder(/senha/i).fill('R@iner98152749');

    // Verificar se os campos foram preenchidos
    const emailInput = page.getByPlaceholder(/email ou usuário/i);
    const passwordInput = page.getByPlaceholder(/senha/i);

    await expect(emailInput).toHaveValue('cahew94994@nyfhk.com');
    await expect(passwordInput).toHaveValue('R@iner98152749');

    console.log('✅ Formulário preenchido com sucesso');
  });

  test('deve submeter o formulário de login', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/login');
    await page.waitForLoadState('networkidle');

    // Preencher e submeter
    await page.getByPlaceholder(/email ou usuário/i).fill('cahew94994@nyfhk.com');
    await page.getByPlaceholder(/senha/i).fill('R@iner98152749');
    
    // Clicar no botão de login
    await page.getByRole('button', { name: /entrar/i }).click();

    // Aguardar resposta (pode ser sucesso ou erro)
    await page.waitForTimeout(2000);

    console.log('✅ Formulário submetido');
  });
});
