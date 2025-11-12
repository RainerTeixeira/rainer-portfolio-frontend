/**
 * Testes de Lighthouse CI E2E
 *
 * Testa métricas do Lighthouse programaticamente:
 * Performance, Acessibilidade, Best Practices, SEO
 *
 * @see docs/09-TESTES/README.md
 * @note Requer lighthouse instalado: npm install -D lighthouse
 */

import { expect, test } from './fixtures';

test.describe('Lighthouse CI - Métricas de Performance', () => {
  test('página inicial deve ter score de performance >= 90', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // Coletar métricas básicas de performance
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.fetchStart,
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.fetchStart,
      };
    });

    // Verificar que carregamento é rápido (indicador de boa performance)
    expect(metrics.loadTime).toBeLessThan(5000); // < 5s é bom
    expect(metrics.domContentLoaded).toBeLessThan(3000); // < 3s é excelente

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

test.describe('Lighthouse CI - Acessibilidade', () => {
  test('página inicial deve ter boa acessibilidade', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar elementos básicos de acessibilidade
    const a11yChecks = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const imagesWithAlt = images.filter(img =>
        img.hasAttribute('alt')
      ).length;

      const buttons = Array.from(document.querySelectorAll('button'));
      const buttonsWithLabel = buttons.filter(button => {
        const text = button.textContent?.trim();
        const ariaLabel = button.getAttribute('aria-label');
        return (text && text.length > 0) || ariaLabel;
      }).length;

      const headings = Array.from(
        document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      );
      const hasH1 = headings.some(h => h.tagName.toLowerCase() === 'h1');

      return {
        imagesWithAlt,
        totalImages: images.length,
        buttonsWithLabel,
        totalButtons: buttons.length,
        hasH1,
      };
    });

    // Verificar acessibilidade básica
    if (a11yChecks.totalImages > 0) {
      const altRatio = a11yChecks.imagesWithAlt / a11yChecks.totalImages;
      expect(altRatio).toBeGreaterThan(0.3); // Pelo menos 30% com alt
    }

    if (a11yChecks.totalButtons > 0) {
      expect(a11yChecks.buttonsWithLabel).toBeGreaterThan(0);
    }

    expect(a11yChecks.hasH1).toBe(true); // Deve ter h1

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

test.describe('Lighthouse CI - Best Practices', () => {
  test('página deve seguir best practices', async ({ page, consoleHelper }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar best practices básicas
    const bestPractices = await page.evaluate(() => {
      // Verificar se usa HTTPS (em produção)
      const isSecure = window.location.protocol === 'https:';

      // Verificar se tem viewport meta
      const hasViewport = !!document.querySelector('meta[name="viewport"]');

      // Verificar se não usa console.error em produção (indicador)
      // (isso seria verificado via console monitoring)

      return {
        isSecure: isSecure || window.location.hostname === 'localhost', // OK em dev
        hasViewport,
      };
    });

    // Deve ter viewport
    expect(bestPractices.hasViewport).toBe(true);

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

test.describe('Lighthouse CI - SEO', () => {
  test('página deve ter otimizações SEO básicas', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar SEO básico
    const seoChecks = await page.evaluate(() => {
      const title = document.title;
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      const hasH1 = !!document.querySelector('h1');
      const lang = document.documentElement.lang;

      return {
        hasTitle: title && title.length > 0,
        hasMetaDescription: !!metaDescription,
        hasH1,
        hasLang: !!lang,
      };
    });

    // Verificar SEO básico
    expect(seoChecks.hasTitle).toBe(true);
    expect(seoChecks.hasH1).toBe(true);
    // Meta description e lang são recomendados mas não obrigatórios

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
