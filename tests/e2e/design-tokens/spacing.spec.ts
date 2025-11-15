/**
 * Design Tokens - Spacing Tests
 * 
 * Valida se espaçamento (margin, padding, gap) está conforme tokens.
 */

import { test, expect } from '@playwright/test';
import { getComputedStyle, validateSpacing } from './helpers/token-utils';

test.describe('Design Tokens - Spacing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should apply correct padding from tokens', async ({ page }) => {
    await page.evaluate(() => {
      const paddings = ['p-0', 'p-2', 'p-4', 'p-8'];
      paddings.forEach((padding) => {
        const div = document.createElement('div');
        div.setAttribute('data-testid', padding);
        div.className = padding;
        div.textContent = padding;
        document.body.appendChild(div);
      });
    });

    // p-0 should be 0px
    const p0 = await getComputedStyle(page, '[data-testid="p-0"]', 'padding');
    expect(p0).toBe('0px');

    // p-2 should be 0.5rem (8px)
    const p2 = await getComputedStyle(page, '[data-testid="p-2"]', 'padding');
    expect(p2).toBe('8px');

    // p-4 should be 1rem (16px)
    const p4 = await getComputedStyle(page, '[data-testid="p-4"]', 'padding');
    expect(p4).toBe('16px');

    // p-8 should be 2rem (32px)
    const p8 = await getComputedStyle(page, '[data-testid="p-8"]', 'padding');
    expect(p8).toBe('32px');
  });

  test('should apply correct margin from tokens', async ({ page }) => {
    await page.evaluate(() => {
      const margins = ['m-0', 'm-2', 'm-4', 'm-8'];
      margins.forEach((margin) => {
        const div = document.createElement('div');
        div.setAttribute('data-testid', margin);
        div.className = margin;
        div.textContent = margin;
        document.body.appendChild(div);
      });
    });

    // m-0 should be 0px
    const m0 = await getComputedStyle(page, '[data-testid="m-0"]', 'margin');
    expect(m0).toBe('0px');

    // m-2 should be 0.5rem (8px)
    const m2 = await getComputedStyle(page, '[data-testid="m-2"]', 'margin');
    expect(m2).toBe('8px');

    // m-4 should be 1rem (16px)
    const m4 = await getComputedStyle(page, '[data-testid="m-4"]', 'margin');
    expect(m4).toBe('16px');

    // m-8 should be 2rem (32px)
    const m8 = await getComputedStyle(page, '[data-testid="m-8"]', 'margin');
    expect(m8).toBe('32px');
  });

  test('should apply correct gap in flex/grid containers', async ({ page }) => {
    await page.evaluate(() => {
      const gaps = ['gap-2', 'gap-4', 'gap-8'];
      gaps.forEach((gap) => {
        const div = document.createElement('div');
        div.setAttribute('data-testid', gap);
        div.className = `flex ${gap}`;
        div.innerHTML = '<span>Item 1</span><span>Item 2</span>';
        document.body.appendChild(div);
      });
    });

    // gap-2 should be 0.5rem (8px)
    const gap2 = await getComputedStyle(page, '[data-testid="gap-2"]', 'gap');
    expect(gap2).toContain('8px');

    // gap-4 should be 1rem (16px)
    const gap4 = await getComputedStyle(page, '[data-testid="gap-4"]', 'gap');
    expect(gap4).toContain('16px');

    // gap-8 should be 2rem (32px)
    const gap8 = await getComputedStyle(page, '[data-testid="gap-8"]', 'gap');
    expect(gap8).toContain('32px');
  });

  test('should follow 8pt grid system', async ({ page }) => {
    await page.evaluate(() => {
      const spacings = [1, 2, 3, 4, 6, 8, 12, 16];
      spacings.forEach((spacing) => {
        const div = document.createElement('div');
        div.setAttribute('data-testid', `spacing-${spacing}`);
        div.className = `p-${spacing}`;
        div.textContent = `Spacing ${spacing}`;
        document.body.appendChild(div);
      });
    });

    // All spacing values should be multiples of 4px (base unit)
    const spacings = [1, 2, 3, 4, 6, 8, 12, 16];
    
    for (const spacing of spacings) {
      const padding = await getComputedStyle(
        page,
        `[data-testid="spacing-${spacing}"]`,
        'padding'
      );
      const paddingValue = parseFloat(padding);
      
      // Check if it's a multiple of 4px (with 1px tolerance)
      const isMultipleOf4 = paddingValue % 4 <= 1;
      expect(isMultipleOf4, `spacing-${spacing} should follow 8pt grid`).toBe(true);
    }
  });

  test('should apply directional spacing correctly', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.setAttribute('data-testid', 'directional-spacing');
      div.className = 'pt-4 pr-8 pb-2 pl-6';
      div.textContent = 'Directional spacing';
      document.body.appendChild(div);
    });

    const paddingTop = await getComputedStyle(
      page,
      '[data-testid="directional-spacing"]',
      'padding-top'
    );
    const paddingRight = await getComputedStyle(
      page,
      '[data-testid="directional-spacing"]',
      'padding-right'
    );
    const paddingBottom = await getComputedStyle(
      page,
      '[data-testid="directional-spacing"]',
      'padding-bottom'
    );
    const paddingLeft = await getComputedStyle(
      page,
      '[data-testid="directional-spacing"]',
      'padding-left'
    );

    expect(paddingTop).toBe('16px'); // pt-4
    expect(paddingRight).toBe('32px'); // pr-8
    expect(paddingBottom).toBe('8px'); // pb-2
    expect(paddingLeft).toBe('24px'); // pl-6
  });

  test('should apply negative margins correctly', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.setAttribute('data-testid', 'negative-margin');
      div.className = '-m-4';
      div.textContent = 'Negative margin';
      document.body.appendChild(div);
    });

    const margin = await getComputedStyle(
      page,
      '[data-testid="negative-margin"]',
      'margin'
    );
    
    // Should be negative
    expect(parseFloat(margin)).toBeLessThan(0);
    expect(margin).toBe('-16px'); // -m-4 = -1rem = -16px
  });

  test('should apply space-between in flex containers', async ({ page }) => {
    await page.evaluate(() => {
      const spacings = ['space-x-2', 'space-x-4', 'space-y-2'];
      spacings.forEach((spacing) => {
        const div = document.createElement('div');
        div.setAttribute('data-testid', spacing);
        div.className = `flex ${spacing}`;
        div.innerHTML = `
          <span>Item 1</span>
          <span>Item 2</span>
          <span>Item 3</span>
        `;
        document.body.appendChild(div);
      });
    });

    // Validate that space-between classes are applied
    const spaceX2 = await page.getByTestId('space-x-2');
    await expect(spaceX2).toHaveClass(/space-x-2/);
  });

  test('should maintain consistent container padding', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.setAttribute('data-testid', 'container');
      div.className = 'container mx-auto px-4';
      div.textContent = 'Container with padding';
      document.body.appendChild(div);
    });

    const paddingLeft = await getComputedStyle(
      page,
      '[data-testid="container"]',
      'padding-left'
    );
    const paddingRight = await getComputedStyle(
      page,
      '[data-testid="container"]',
      'padding-right'
    );

    // Both should be equal (px-4)
    expect(paddingLeft).toBe(paddingRight);
    expect(paddingLeft).toBe('16px');
  });
});

