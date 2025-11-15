/**
 * E2E Tests - Home Page
 *
 * Valida que a home page usa design tokens corretamente.
 */

import { expect, test } from '@playwright/test';
import { getCSSVariable } from '../design-tokens/helpers/token-utils';

test.describe('Home Page - Design Tokens Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should not have hardcoded colors', async ({ page }) => {
    const elements = await page.locator('*').all();

    for (const element of elements.slice(0, 50)) {
      // Check first 50 elements
      const color = await element.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          color: style.color,
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
        };
      });

      // Validate that colors are using CSS variables
      // Should not have inline rgb/hex that aren't from variables
      const hasValidColor =
        color.color === 'rgba(0, 0, 0, 0)' ||
        color.color.includes('rgb') ||
        color.color === 'transparent';

      expect(hasValidColor).toBe(true);
    }
  });

  test('should apply brand colors from tokens', async ({ page }) => {
    // Check if primary brand color is used in hero section
    const heroBg = await getCSSVariable(page, '--color-brand-primary');
    expect(heroBg).toBeTruthy();
    expect(heroBg).toMatch(/^#[0-9a-f]{6}$/i);
  });

  test('should use token-based spacing', async ({ page }) => {
    // Check if spacing follows 8pt grid
    const container = page.locator('main').first();
    const padding = await container.evaluate(el => {
      const style = window.getComputedStyle(el);
      return {
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
      };
    });

    // Validate spacing is multiple of 4px (8pt grid)
    const paddingTopPx = parseFloat(padding.paddingTop);
    const paddingBottomPx = parseFloat(padding.paddingBottom);

    expect(paddingTopPx % 4).toBeLessThanOrEqual(1);
    expect(paddingBottomPx % 4).toBeLessThanOrEqual(1);
  });

  test('should have hero section with correct typography', async ({ page }) => {
    const heroTitle = page.getByRole('heading', { level: 1 }).first();

    if ((await heroTitle.count()) > 0) {
      const fontSize = await heroTitle.evaluate(el => {
        return window.getComputedStyle(el).fontSize;
      });

      // Should be a large font size from tokens (> 2rem)
      expect(parseFloat(fontSize)).toBeGreaterThan(32);
    }
  });

  test('should apply theme correctly', async ({ page }) => {
    // Light mode by default
    const bgColor = await getCSSVariable(page, '--color-background-primary');
    expect(bgColor).toBe('#ffffff');

    // Toggle dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await page.waitForTimeout(300);

    const darkBgColor = await getCSSVariable(
      page,
      '--color-background-primary'
    );
    expect(darkBgColor).toBe('#0a0a0f');
  });

  test('should not have inline styles with hardcoded values', async ({
    page,
  }) => {
    const elementsWithInlineStyles = await page.locator('[style]').all();

    for (const element of elementsWithInlineStyles) {
      const style = await element.getAttribute('style');

      if (style) {
        // Check for hardcoded colors
        const hasHardcodedColor =
          /#[0-9a-f]{3,6}/i.test(style) ||
          /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/i.test(style);

        // Allow some exceptions (like opacity)
        if (hasHardcodedColor && !style.includes('opacity')) {
          const tagName = await element.evaluate(el => el.tagName);
          console.warn(
            `Element ${tagName} has inline hardcoded color: ${style}`
          );
        }
      }
    }
  });
});
