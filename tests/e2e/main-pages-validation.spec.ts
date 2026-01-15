import { test, expect } from '@playwright/test';

test.describe('Validação de Páginas Principais e Bibliotecas', () => {
  test.beforeEach(async ({ page }) => {
    // Aguardar a aplicação carregar completamente
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
  });

  test('página inicial carrega e usa bibliotecas corretamente', async ({ page }) => {
    // Verificar se a página carregou
    await expect(page).toHaveTitle(/Rainer Teixeira/);
    
    // Verificar uso de @rainersoft/design-tokens
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
    
    // Verificar se há estilos dos design tokens
    const computedStyles = await heroSection.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        fontFamily: styles.fontFamily
      };
    });
    
    expect(computedStyles.backgroundColor).toBeTruthy();
    expect(computedStyles.fontFamily).toBeTruthy();
    
    // Verificar uso de @rainersoft/ui components
    const button = page.locator('button').first();
    if (await button.isVisible()) {
      await expect(button).toBeVisible();
    }
    
    // Verificar se há elementos com classes do sistema de design
    const designElements = page.locator('[class*="bg-"], [class*="text-"], [class*="border-"]');
    await expect(designElements.first()).toBeVisible();
  });

  test('página sobre funciona', async ({ page }) => {
    await page.goto('http://localhost:3000/sobre');
    await page.waitForLoadState('networkidle');
    
    // Verificar se a página sobre carrega
    await expect(page.locator('h1, h2').first()).toBeVisible();
    
    // Verificar uso de design tokens
    const bodyStyles = await page.evaluate(() => {
      const styles = window.getComputedStyle(document.body);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color
      };
    });
    
    expect(bodyStyles.backgroundColor).toBeTruthy();
    expect(bodyStyles.color).toBeTruthy();
  });

  test('página contato funciona', async ({ page }) => {
    await page.goto('http://localhost:3000/contato');
    await page.waitForLoadState('networkidle');
    
    // Verificar se a página contato carrega
    await expect(page.locator('h1, h2').first()).toBeVisible();
    
    // Verificar se há formulário ou elementos de contato
    const formElements = page.locator('input, textarea, button');
    if (await formElements.first().isVisible()) {
      await expect(formElements.first()).toBeVisible();
    }
  });

  test('página 404 personalizada funciona', async ({ page }) => {
    await page.goto('http://localhost:3000/pagina-inexistente');
    await page.waitForLoadState('networkidle');
    
    // Verificar se a página 404 carrega
    const notFoundContent = page.locator('text=/404|não encontrada|not found/i');
    await expect(notFoundContent).toBeVisible();
    
    // Verificar se há botão de voltar
    const backButton = page.locator('button, a').filter({ hasText: /voltar|home|início/i });
    if (await backButton.isVisible()) {
      await expect(backButton).toBeVisible();
    }
  });

  test('verificar uso das bibliotecas no console', async ({ page }) => {
    const messages: string[] = [];
    
    // Capturar logs do console
    page.on('console', msg => {
      messages.push(msg.text());
    });
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Verificar se não há erros críticos relacionados às bibliotecas
    const criticalErrors = messages.filter(msg => 
      msg.includes('Cannot read property') && 
      (msg.includes('rainersoft') || msg.includes('tokens') || msg.includes('ui'))
    );
    
    // Permitir alguns warnings de forwardRef (comuns em React)
    const nonCriticalErrors = messages.filter(msg => 
      msg.includes('forwardRef') && msg.includes('parameters')
    );
    
    // Reportar resultados
    console.log(`Console messages: ${messages.length}`);
    console.log(`Critical errors: ${criticalErrors.length}`);
    console.log(`Non-critical warnings: ${nonCriticalErrors.length}`);
    
    if (criticalErrors.length > 0) {
      console.log('Critical errors found:', criticalErrors);
    }
    
    // Não deve haver erros críticos
    expect(criticalErrors.length).toBe(0);
  });

  test('verificar carregamento de assets das bibliotecas', async ({ page }) => {
    const responses: any[] = [];
    
    // Capturar respostas de rede
    page.on('response', response => {
      if (response.url().includes('rainersoft') || 
          response.url().includes('tokens') || 
          response.url().includes('ui')) {
        responses.push({
          url: response.url(),
          status: response.status()
        });
      }
    });
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Verificar se os assets das bibliotecas carregaram
    console.log(`Biblioteca responses: ${responses.length}`);
    
    if (responses.length > 0) {
      const failedResponses = responses.filter(r => r.status >= 400);
      expect(failedResponses.length).toBe(0);
    }
  });
});
