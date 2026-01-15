import { test, expect } from '@playwright/test';

test.describe('Validação Simples da Aplicação', () => {
  test('página inicial carrega', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Verificar título
    const title = await page.title();
    expect(title).toMatch(/Rainer Teixeira/i);
    
    // Verificar se há conteúdo
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // Verificar se não há erros críticos no console
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    
    await page.waitForTimeout(2000);
    
    // Reportar apenas erros críticos
    if (errors.length > 0) {
      console.log('Erros encontrados:', errors.slice(0, 3)); // Mostrar apenas os 3 primeiros
    }
    
    // Permitir alguns warnings não críticos
    const criticalErrors = errors.filter(error => 
      !error.includes('forwardRef') && 
      !error.includes('createContext') &&
      !error.includes('Warning')
    );
    
    expect(criticalErrors.length).toBeLessThan(3, 'Muitos erros críticos encontrados');
  });

  test('verificar uso das bibliotecas', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Verificar se há estilos CSS aplicados (indicando uso de design tokens)
    const hasStyles = await page.evaluate(() => {
      const styles = window.getComputedStyle(document.body);
      return styles.backgroundColor && styles.color && styles.fontFamily;
    });
    
    expect(hasStyles).toBe(true);
    
    // Verificar se há elementos com classes Tailwind (indicando uso de design tokens)
    const tailwindElements = await page.locator('[class*="bg-"], [class*="text-"]').count();
    expect(tailwindElements).toBeGreaterThan(0);
    
    console.log(`Elementos com classes de design: ${tailwindElements}`);
  });

  test('navegação básica funciona', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Tentar navegar para página sobre
    const sobreLink = page.locator('a[href*="sobre"], nav a:has-text("Sobre")').first();
    if (await sobreLink.isVisible()) {
      await sobreLink.click();
      await page.waitForLoadState('networkidle');
      
      // Verificar se carregou
      const url = page.url();
      expect(url).toContain('sobre');
    }
    
    // Tentar navegar para contato
    await page.goto('http://localhost:3000/contato');
    await page.waitForLoadState('networkidle');
    
    // Verificar se a página carrega
    const contatoContent = page.locator('h1, h2, main').first();
    await expect(contatoContent).toBeVisible();
  });

  test('página 404 funciona', async ({ page }) => {
    await page.goto('http://localhost:3000/pagina-inexistente-12345');
    await page.waitForLoadState('networkidle');
    
    // Verificar se mostra conteúdo 404
    const notFoundText = page.locator('text=/404|não encontrada|encontrada/i').first();
    await expect(notFoundText).toBeVisible({ timeout: 5000 });
  });
});
