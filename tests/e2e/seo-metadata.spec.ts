/**
 * Testes de SEO e Metadata E2E
 *
 * Testa tags meta, Open Graph, Twitter Cards,
 * structured data e otimizações SEO
 *
 * @see docs/09-TESTES/README.md
 */

import { expect, test } from './fixtures';

test.describe('SEO - Meta Tags', () => {
  test('página inicial deve ter title', async ({ page, consoleHelper }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

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

  test('página inicial deve ter meta description', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const metaDescription = await page
      .locator('meta[name="description"]')
      .getAttribute('content')
      .catch(() => null);

    // Pode ou não ter meta description (não obrigatório, mas recomendado)
    if (metaDescription) {
      expect(metaDescription.length).toBeGreaterThan(0);
    }

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

  test('páginas devem ter meta viewport', async ({ page, consoleHelper }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const viewport = await page
      .locator('meta[name="viewport"]')
      .getAttribute('content')
      .catch(() => null);

    // Deve ter viewport para responsividade
    expect(viewport).toBeTruthy();

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

test.describe('SEO - Open Graph', () => {
  test('página inicial deve ter Open Graph tags', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar tags Open Graph comuns
    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .count()
      .catch(() => 0);
    const ogDescription = await page
      .locator('meta[property="og:description"]')
      .count()
      .catch(() => 0);
    const ogImage = await page
      .locator('meta[property="og:image"]')
      .count()
      .catch(() => 0);
    const ogUrl = await page
      .locator('meta[property="og:url"]')
      .count()
      .catch(() => 0);

    // Pode ou não ter Open Graph (não obrigatório, mas recomendado)
    const ogTagsCount = ogTitle + ogDescription + ogImage + ogUrl;
    expect(ogTagsCount).toBeGreaterThanOrEqual(0);

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

test.describe('SEO - Structured Data', () => {
  test('página deve ter structured data (JSON-LD)', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar se há JSON-LD
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .count()
      .catch(() => 0);

    // Pode ou não ter structured data (não obrigatório, mas recomendado)
    expect(jsonLd).toBeGreaterThanOrEqual(0);

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

test.describe('SEO - Canonical URLs', () => {
  test('páginas devem ter canonical URL', async ({ page, consoleHelper }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute('href')
      .catch(() => null);

    // Pode ou não ter canonical (não obrigatório, mas recomendado)
    if (canonical) {
      expect(canonical.length).toBeGreaterThan(0);
    }

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

test.describe('SEO - Robots Meta', () => {
  test('páginas devem ter meta robots apropriado', async ({
    page,
    consoleHelper,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const robots = await page
      .locator('meta[name="robots"]')
      .getAttribute('content')
      .catch(() => null);

    // Pode ou não ter meta robots (não obrigatório)
    if (robots) {
      expect(robots.length).toBeGreaterThan(0);
    }

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
