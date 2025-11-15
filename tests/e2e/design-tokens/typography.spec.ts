/**
 * Design Tokens - Typography Tests
 *
 * Valida se a tipografia (font-family, font-size, font-weight) está conforme tokens.
 */

import { expect, test } from '@playwright/test';
import { getCSSVariable, getComputedStyle } from './helpers/token-utils';

test.describe('Design Tokens - Typography', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct font families defined', async ({ page }) => {
    const fontFamilies = {
      '--font-sans': 'ui-sans-serif',
      '--font-serif': 'ui-serif',
      '--font-mono': 'ui-monospace',
    };

    for (const [varName, expectedStart] of Object.entries(fontFamilies)) {
      const value = await getCSSVariable(page, varName);
      expect(value, `${varName} should be defined`).toBeTruthy();
      expect(value, `${varName} should start with ${expectedStart}`).toContain(
        expectedStart
      );
    }
  });

  test('should apply correct font sizes', async ({ page }) => {
    await page.evaluate(() => {
      const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '4xl'];
      sizes.forEach(size => {
        const div = document.createElement('div');
        div.setAttribute('data-testid', `text-${size}`);
        div.className = `text-${size}`;
        div.textContent = `Text ${size}`;
        document.body.appendChild(div);
      });
    });

    // Base should be 1rem (16px)
    const baseFontSize = await getComputedStyle(
      page,
      '[data-testid="text-base"]',
      'font-size'
    );
    expect(baseFontSize).toBe('16px');

    // XS should be smaller than base
    const xsFontSize = await getComputedStyle(
      page,
      '[data-testid="text-xs"]',
      'font-size'
    );
    expect(parseFloat(xsFontSize)).toBeLessThan(16);

    // XL should be larger than base
    const xlFontSize = await getComputedStyle(
      page,
      '[data-testid="text-xl"]',
      'font-size'
    );
    expect(parseFloat(xlFontSize)).toBeGreaterThan(16);

    // 4xl should be even larger
    const fourxlFontSize = await getComputedStyle(
      page,
      '[data-testid="text-4xl"]',
      'font-size'
    );
    expect(parseFloat(fourxlFontSize)).toBeGreaterThan(parseFloat(xlFontSize));
  });

  test('should apply correct font weights', async ({ page }) => {
    await page.evaluate(() => {
      const weights = [
        { class: 'font-light', weight: '300' },
        { class: 'font-normal', weight: '400' },
        { class: 'font-medium', weight: '500' },
        { class: 'font-semibold', weight: '600' },
        { class: 'font-bold', weight: '700' },
      ];

      weights.forEach(({ class: className }) => {
        const div = document.createElement('div');
        div.setAttribute('data-testid', className);
        div.className = className;
        div.textContent = `Text ${className}`;
        document.body.appendChild(div);
      });
    });

    const normalWeight = await getComputedStyle(
      page,
      '[data-testid="font-normal"]',
      'font-weight'
    );
    expect(normalWeight).toBe('400');

    const boldWeight = await getComputedStyle(
      page,
      '[data-testid="font-bold"]',
      'font-weight'
    );
    expect(boldWeight).toBe('700');

    const lightWeight = await getComputedStyle(
      page,
      '[data-testid="font-light"]',
      'font-weight'
    );
    expect(lightWeight).toBe('300');
  });

  test('should apply correct line heights', async ({ page }) => {
    await page.evaluate(() => {
      const lineHeights = [
        'leading-none',
        'leading-tight',
        'leading-normal',
        'leading-loose',
      ];
      lineHeights.forEach(lh => {
        const div = document.createElement('div');
        div.setAttribute('data-testid', lh);
        div.className = lh;
        div.textContent = 'Text with line height';
        document.body.appendChild(div);
      });
    });

    const noneLineHeight = await getComputedStyle(
      page,
      '[data-testid="leading-none"]',
      'line-height'
    );
    const normalLineHeight = await getComputedStyle(
      page,
      '[data-testid="leading-normal"]',
      'line-height'
    );
    const looseLineHeight = await getComputedStyle(
      page,
      '[data-testid="leading-loose"]',
      'line-height'
    );

    // None should be smallest
    expect(parseFloat(noneLineHeight)).toBeLessThan(
      parseFloat(normalLineHeight)
    );

    // Loose should be largest
    expect(parseFloat(looseLineHeight)).toBeGreaterThan(
      parseFloat(normalLineHeight)
    );
  });

  test('should apply correct letter spacing', async ({ page }) => {
    await page.evaluate(() => {
      const spacings = [
        'tracking-tighter',
        'tracking-normal',
        'tracking-wider',
      ];
      spacings.forEach(spacing => {
        const div = document.createElement('div');
        div.setAttribute('data-testid', spacing);
        div.className = spacing;
        div.textContent = 'Text with letter spacing';
        document.body.appendChild(div);
      });
    });

    const normalSpacing = await getComputedStyle(
      page,
      '[data-testid="tracking-normal"]',
      'letter-spacing'
    );
    expect(normalSpacing).toBe('0px');

    const tighterSpacing = await getComputedStyle(
      page,
      '[data-testid="tracking-tighter"]',
      'letter-spacing'
    );
    // Should be negative
    expect(parseFloat(tighterSpacing)).toBeLessThan(0);

    const widerSpacing = await getComputedStyle(
      page,
      '[data-testid="tracking-wider"]',
      'letter-spacing'
    );
    // Should be positive
    expect(parseFloat(widerSpacing)).toBeGreaterThan(0);
  });

  test('should have heading styles applied', async ({ page }) => {
    const h1FontSize = await getComputedStyle(page, 'h1', 'font-size');
    const h2FontSize = await getComputedStyle(page, 'h2', 'font-size');
    const h3FontSize = await getComputedStyle(page, 'h3', 'font-size');

    // H1 should be larger than H2
    if (parseFloat(h1FontSize) > 0 && parseFloat(h2FontSize) > 0) {
      expect(parseFloat(h1FontSize)).toBeGreaterThanOrEqual(
        parseFloat(h2FontSize)
      );
    }

    // H2 should be larger than H3
    if (parseFloat(h2FontSize) > 0 && parseFloat(h3FontSize) > 0) {
      expect(parseFloat(h2FontSize)).toBeGreaterThanOrEqual(
        parseFloat(h3FontSize)
      );
    }
  });

  test('should maintain font hierarchy', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h1 data-testid="hierarchy-h1">Heading 1</h1>
        <h2 data-testid="hierarchy-h2">Heading 2</h2>
        <p data-testid="hierarchy-p">Paragraph</p>
        <small data-testid="hierarchy-small">Small text</small>
      `;
      document.body.appendChild(div);
    });

    const h1Size = parseFloat(
      await getComputedStyle(page, '[data-testid="hierarchy-h1"]', 'font-size')
    );
    const h2Size = parseFloat(
      await getComputedStyle(page, '[data-testid="hierarchy-h2"]', 'font-size')
    );
    const pSize = parseFloat(
      await getComputedStyle(page, '[data-testid="hierarchy-p"]', 'font-size')
    );
    const smallSize = parseFloat(
      await getComputedStyle(
        page,
        '[data-testid="hierarchy-small"]',
        'font-size'
      )
    );

    // Validate hierarchy: h1 > h2 > p > small
    expect(h1Size).toBeGreaterThanOrEqual(h2Size);
    expect(h2Size).toBeGreaterThanOrEqual(pSize);
    expect(pSize).toBeGreaterThanOrEqual(smallSize);
  });
});
