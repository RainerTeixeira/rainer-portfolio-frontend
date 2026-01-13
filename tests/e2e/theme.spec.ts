import { test, expect } from '@playwright/test';

test.describe('Tema Claro/Escuro', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/test-theme');
  });

  test('deve carregar com tema inicial', async ({ page }) => {
    // Verifica se a página carregou
    await expect(page.locator('h1')).toContainText('Teste de Tema');
    
    // Verifica se o botão de toggle está presente
    await expect(page.locator('button[aria-label*="tema"]')).toBeVisible();
  });

  test('deve alternar para modo escuro', async ({ page }) => {
    // Verifica tema inicial
    const html = page.locator('html');
    await expect(html).not.toHaveClass('dark');
    
    // Clica no botão de toggle
    await page.locator('button[aria-label*="tema"]').click();
    
    // Verifica se a classe dark foi adicionada
    await expect(html).toHaveClass('dark');
    
    // Verifica se o texto do botão mudou
    await expect(page.locator('button[aria-label*="claro"]')).toBeVisible();
  });

  test('deve alternar de volta para modo claro', async ({ page }) => {
    // Primeiro alterna para modo escuro
    await page.locator('button[aria-label*="tema"]').click();
    await expect(page.locator('html')).toHaveClass('dark');
    
    // Clica novamente para voltar ao modo claro
    await page.locator('button[aria-label*="claro"]').click();
    
    // Verifica se a classe dark foi removida
    await expect(page.locator('html')).not.toHaveClass('dark');
    
    // Verifica se o texto do botão voltou
    await expect(page.locator('button[aria-label*="escuro"]')).toBeVisible();
  });

  test('deve mudar as cores dos elementos', async ({ page }) => {
    // Captura as cores iniciais (modo claro)
    const body = page.locator('body');
    const initialBgColor = await body.evaluate((el) => {
      return getComputedStyle(el).backgroundColor;
    });
    
    // Alterna para modo escuro
    await page.locator('button[aria-label*="tema"]').click();
    
    // Aguarda a transição
    await page.waitForTimeout(300);
    
    // Captura as cores do modo escuro
    const darkBgColor = await body.evaluate((el) => {
      return getComputedStyle(el).backgroundColor;
    });
    
    // Verifica se as cores são diferentes
    expect(initialBgColor).not.toBe(darkBgColor);
    
    // Verifica se o fundo está escuro
    expect(darkBgColor).toBe('rgb(10, 10, 15)'); // #0a0a0f do tema dark
  });

  test('deve persistir o tema na navegação', async ({ page }) => {
    // Alterna para modo escuro
    await page.locator('button[aria-label*="tema"]').click();
    await expect(page.locator('html')).toHaveClass('dark');
    
    // Navega para outra página
    await page.goto('http://localhost:3000');
    
    // Verifica se o tema foi mantido
    await expect(page.locator('html')).toHaveClass('dark');
    
    // Volta para a página de teste
    await page.goto('http://localhost:3000/test-theme');
    
    // Verifica se o tema ainda está escuro
    await expect(page.locator('html')).toHaveClass('dark');
  });

  test('deve funcionar com preferência do sistema', async ({ page }) => {
    // Simula preferência do sistema para modo escuro
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('http://localhost:3000/test-theme');
    
    // Verifica se o tema escuro foi aplicado automaticamente
    await expect(page.locator('html')).toHaveClass('dark');
    
    // Simula preferência do sistema para modo claro
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('http://localhost:3000/test-theme');
    
    // Verifica se o tema claro foi aplicado
    await expect(page.locator('html')).not.toHaveClass('dark');
  });

  test('deve mostrar ícone correto conforme o tema', async ({ page }) => {
    // Modo claro deve mostrar ícone de sol
    await expect(page.locator('svg')).toHaveAttribute('aria-hidden', 'true');
    
    // Alterna para modo escuro
    await page.locator('button[aria-label*="tema"]').click();
    
    // Modo escuro deve mostrar ícone de lua
    const moonIcon = page.locator('button svg').first();
    await expect(moonIcon).toBeVisible();
  });
});
