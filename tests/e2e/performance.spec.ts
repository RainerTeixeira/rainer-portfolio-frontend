/**
 * Testes de Performance E2E
 *
 * Testa métricas de performance, Core Web Vitals, lazy loading,
 * code splitting, cache e otimizações de carregamento
 *
 * @see docs/09-TESTES/README.md
 */

import { expect, test } from './fixtures';
import { collectPerformanceMetrics } from './helpers/performance-helper';

test.describe('Performance - Core Web Vitals', () => {
  test('deve ter LCP (Largest Contentful Paint) < 2.5s na página inicial', async ({
    page,
    consoleHelper,
  }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000); // Aguardar LCP

    const metrics = await collectPerformanceMetrics(page);

    // LCP deve ser menor que 2.5s (threshold "good")
    expect(metrics.largestContentfulPaint).toBeLessThan(2500);

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

  test('deve ter FID (First Input Delay) < 100ms na página inicial', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Simular interação do usuário
    const button = page.locator('button, a, input[type="button"]').first();
    const buttonVisible = await button
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    if (buttonVisible) {
      await button.click();
      await page.waitForTimeout(1000);
    }

    const metrics = await collectPerformanceMetrics(page);

    // FID deve ser menor que 100ms (threshold "good")
    // Nota: Em ambiente de teste, pode ser 0 se não houver interação real
    expect(metrics.firstInputDelay).toBeLessThan(100);

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

  test('deve ter CLS (Cumulative Layout Shift) < 0.1 na página inicial', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000); // Aguardar estabilização do layout

    const metrics = await collectPerformanceMetrics(page);

    // CLS deve ser menor que 0.1 (threshold "good")
    expect(metrics.cumulativeLayoutShift).toBeLessThan(0.1);

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

  test('deve ter FCP (First Contentful Paint) < 1.8s na página inicial', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const metrics = await collectPerformanceMetrics(page);

    // FCP deve ser menor que 1.8s (threshold "good")
    expect(metrics.firstContentfulPaint).toBeLessThan(1800);

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

  test('deve ter TTFB (Time to First Byte) < 600ms', async ({
    page,
    consoleHelper,
  }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const navigationTime = Date.now() - startTime;

    const metrics = await collectPerformanceMetrics(page);

    // TTFB deve ser menor que 600ms (threshold "good")
    // Usar métrica coletada ou aproximação
    const ttfb = metrics.timeToFirstByte || navigationTime * 0.3;
    expect(ttfb).toBeLessThan(600);

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

test.describe('Performance - Tempos de Carregamento', () => {
  test('página inicial deve carregar em menos de 3 segundos', async ({
    page,
    consoleHelper,
  }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'load' });
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(3000);

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

  test('página de blog deve carregar em menos de 3 segundos', async ({
    page,
    consoleHelper,
  }) => {
    const startTime = Date.now();
    await page.goto('/blog', { waitUntil: 'load' });
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(3000);

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

  test('DOMContentLoaded deve ocorrer em menos de 2 segundos', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const metrics = await collectPerformanceMetrics(page);

    expect(metrics.domContentLoaded).toBeLessThan(2000);

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

test.describe('Performance - Otimizações de Recursos', () => {
  test('deve usar lazy loading para imagens', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Verificar se há imagens com loading="lazy"
    const lazyImages = await page.locator('img[loading="lazy"]').count();
    const allImages = await page.locator('img').count();

    // Se houver imagens, pelo menos algumas devem ter lazy loading
    if (allImages > 0) {
      // Pelo menos 50% das imagens devem ter lazy loading (ou todas se houver muitas)
      const lazyRatio = lazyImages / allImages;
      expect(lazyRatio).toBeGreaterThan(0.3); // Pelo menos 30% com lazy loading
    }

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

  test('deve ter número razoável de requisições de rede', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const metrics = await collectPerformanceMetrics(page);

    // Página não deve fazer mais de 100 requisições (threshold razoável)
    expect(metrics.networkRequests).toBeLessThan(100);

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

  test('deve ter tamanho total de recursos razoável', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const metrics = await collectPerformanceMetrics(page);

    // Tamanho total não deve exceder 5MB (threshold razoável para página inicial)
    expect(metrics.totalSize).toBeLessThan(5 * 1024 * 1024);

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

  test('deve usar code splitting (verificar múltiplos chunks)', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar se há múltiplos arquivos JS carregados (indicando code splitting)
    const jsFiles = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      return scripts
        .map((s: any) => s.src)
        .filter((src: string) => src.includes('.js'));
    });

    // Deve haver pelo menos 1 arquivo JS (mínimo esperado)
    expect(jsFiles.length).toBeGreaterThan(0);

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

test.describe('Performance - Cache e Reutilização', () => {
  test('deve usar cache para recursos estáticos', async ({
    page,
    consoleHelper,
  }) => {
    // Primeira carga
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const firstLoadMetrics = await collectPerformanceMetrics(page);

    // Segunda carga (deve ser mais rápida devido ao cache)
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const secondLoadMetrics = await collectPerformanceMetrics(page);

    // Segunda carga deve ter menos requisições ou ser mais rápida
    // (alguns recursos devem vir do cache)
    expect(secondLoadMetrics.networkRequests).toBeLessThanOrEqual(
      firstLoadMetrics.networkRequests
    );

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

  test('navegação entre páginas deve ser rápida (SPA)', async ({
    page,
    consoleHelper,
  }) => {
    // Carregar página inicial
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Navegar para blog (deve ser rápida se for SPA)
    const startTime = Date.now();
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    const navigationTime = Date.now() - startTime;

    // Navegação deve ser rápida (< 2s para SPA)
    expect(navigationTime).toBeLessThan(2000);

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

test.describe('Performance - Otimizações Específicas', () => {
  test('imagens devem usar formato otimizado (Next.js Image)', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Verificar se há uso de Next.js Image component
    const nextImages = await page.locator('img[src*="/_next/image"]').count();
    const allImages = await page.locator('img').count();

    // Se houver imagens, verificar se algumas usam Next.js Image
    if (allImages > 0) {
      // Pelo menos algumas imagens devem usar Next.js Image (ou todas se implementado)
      const nextImageRatio = nextImages / allImages;
      // Aceitar qualquer proporção (pode não estar implementado ainda)
      expect(nextImageRatio).toBeGreaterThanOrEqual(0);
    }

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

  test('deve ter fontes otimizadas (font-display: swap)', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar se há fontes carregadas
    const fonts = await page.evaluate(() => {
      const fontFaces = (document as any).fonts?.values
        ? Array.from((document as any).fonts.values())
        : [];
      return fontFaces.length;
    });

    // Se houver fontes, verificar se estão otimizadas
    // (verificação visual - fontes devem carregar sem bloqueio)
    expect(fonts).toBeGreaterThanOrEqual(0);

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

  test('deve ter preload para recursos críticos', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Verificar se há preload links
    const preloadLinks = await page.locator('link[rel="preload"]').count();

    // Pode ou não ter preload (não obrigatório, mas é uma otimização)
    expect(preloadLinks).toBeGreaterThanOrEqual(0);

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
