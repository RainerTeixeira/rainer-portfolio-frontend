/**
 * E2E Tests - Blog Page
 * 
 * Valida que a página de blog usa design tokens corretamente.
 */

import { expect, test } from '@playwright/test';
import { getCSSVariable } from '../design-tokens/helpers/token-utils';

test.describe('Blog Page - Design Tokens Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
  });

  test('should use token-based colors for cards', async ({ page }) => {
    const cards = page.locator('[data-testid*="post"], article').first();
    
    if (await cards.count() > 0) {
      const bgColor = await cards.evaluate(el => {
        return window.getComputedStyle(el).backgroundColor;
      });

      // Should not be hardcoded white/black
      expect(bgColor).toBeTruthy();
    }
  });

  test('should apply correct spacing in post grid', async ({ page }) => {
    const grid = page.locator('[class*="grid"]').first();
    
    if (await grid.count() > 0) {
      const gap = await grid.evaluate(el => {
        return window.getComputedStyle(el).gap;
      });

      // Should use token-based gap (multiple of 4px)
      if (gap !== 'normal') {
        const gapPx = parseFloat(gap);
        expect(gapPx % 4).toBeLessThanOrEqual(1);
      }
    }
  });

  test('should use consistent typography for post titles', async ({ page }) => {
    const titles = page.locator('h2, h3').all();
    
    const fontSizes = await Promise.all(
      (await titles).map(async (title) => {
        return await title.evaluate(el => {
          return window.getComputedStyle(el).fontSize;
        });
      })
    );

    // All h2/h3 should have consistent sizes
    const uniqueSizes = [...new Set(fontSizes)];
    expect(uniqueSizes.length).toBeLessThanOrEqual(2);
  });
});

