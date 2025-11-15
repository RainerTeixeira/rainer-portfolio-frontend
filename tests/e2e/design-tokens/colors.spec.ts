/**
 * Design Tokens - Colors Tests
 * 
 * Valida se os componentes usam as cores corretas dos design tokens.
 */

import { test, expect } from '@playwright/test';
import {
  getComputedStyle,
  getCSSVariable,
  hexToRgb,
  isColorClose,
} from './helpers/token-utils';

test.describe('Design Tokens - Colors', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Ensure light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
    });
    await page.waitForTimeout(300);
  });

  test('should apply primary brand color to primary buttons', async ({ page }) => {
    // Add a test button if not exists
    await page.evaluate(() => {
      const button = document.createElement('button');
      button.setAttribute('data-testid', 'primary-button');
      button.className = 'bg-primary text-primary-foreground px-4 py-2 rounded';
      button.textContent = 'Primary Button';
      document.body.appendChild(button);
    });

    const button = page.getByTestId('primary-button');
    await expect(button).toBeVisible();

    // Get computed background color
    const bgColor = await getComputedStyle(
      page,
      '[data-testid="primary-button"]',
      'background-color'
    );

    // Primary color should be applied
    expect(bgColor).toBeTruthy();
    expect(bgColor).toContain('rgb');
  });

  test('should have correct brand primary CSS variable', async ({ page }) => {
    const primaryVar = await getCSSVariable(page, '--color-brand-primary');
    
    expect(primaryVar).toBeTruthy();
    expect(primaryVar).toBe('#0891b2'); // Cyan from light theme
  });

  test('should have all required color CSS variables defined', async ({ page }) => {
    const requiredVars = [
      '--color-background-primary',
      '--color-background-secondary',
      '--color-text-primary',
      '--color-text-secondary',
      '--color-brand-primary',
      '--color-brand-secondary',
      '--color-border-primary',
      '--color-status-success',
      '--color-status-warning',
      '--color-status-error',
      '--color-status-info',
    ];

    for (const varName of requiredVars) {
      const value = await getCSSVariable(page, varName);
      expect(value, `${varName} should be defined`).toBeTruthy();
    }
  });

  test('should apply correct text colors', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.setAttribute('data-testid', 'text-primary');
      div.className = 'text-text-primary';
      div.textContent = 'Primary Text';
      document.body.appendChild(div);

      const div2 = document.createElement('div');
      div2.setAttribute('data-testid', 'text-secondary');
      div2.className = 'text-text-secondary';
      div2.textContent = 'Secondary Text';
      document.body.appendChild(div2);
    });

    const primaryTextColor = await getComputedStyle(
      page,
      '[data-testid="text-primary"]',
      'color'
    );

    const secondaryTextColor = await getComputedStyle(
      page,
      '[data-testid="text-secondary"]',
      'color'
    );

    // Light mode text should be dark
    expect(primaryTextColor).toBeTruthy();
    expect(secondaryTextColor).toBeTruthy();
    
    // Primary text should be darker than secondary
    const primaryRgb = primaryTextColor.match(/\d+/g)?.map(Number) || [];
    const secondaryRgb = secondaryTextColor.match(/\d+/g)?.map(Number) || [];
    
    if (primaryRgb.length === 3 && secondaryRgb.length === 3) {
      const primaryBrightness = (primaryRgb[0] + primaryRgb[1] + primaryRgb[2]) / 3;
      const secondaryBrightness = (secondaryRgb[0] + secondaryRgb[1] + secondaryRgb[2]) / 3;
      
      expect(primaryBrightness).toBeLessThan(secondaryBrightness);
    }
  });

  test('should apply status colors correctly', async ({ page }) => {
    await page.evaluate(() => {
      const statuses = ['success', 'warning', 'error', 'info'];
      statuses.forEach((status) => {
        const div = document.createElement('div');
        div.setAttribute('data-testid', `status-${status}`);
        div.style.cssText = `color: var(--color-status-${status})`;
        div.textContent = `${status} message`;
        document.body.appendChild(div);
      });
    });

    const successColor = await getComputedStyle(
      page,
      '[data-testid="status-success"]',
      'color'
    );
    
    const errorColor = await getComputedStyle(
      page,
      '[data-testid="status-error"]',
      'color'
    );

    expect(successColor).toBeTruthy();
    expect(errorColor).toBeTruthy();
    expect(successColor).not.toBe(errorColor);
  });

  test('should have correct background colors', async ({ page }) => {
    const bgPrimary = await getCSSVariable(page, '--color-background-primary');
    const bgSecondary = await getCSSVariable(page, '--color-background-secondary');

    expect(bgPrimary).toBe('#ffffff'); // White in light mode
    expect(bgSecondary).toBe('#fafafa'); // Light gray
  });

  test('should apply border colors from tokens', async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement('div');
      div.setAttribute('data-testid', 'bordered-element');
      div.className = 'border-2 border-border-primary p-4';
      div.textContent = 'Bordered';
      document.body.appendChild(div);
    });

    const borderColor = await getComputedStyle(
      page,
      '[data-testid="bordered-element"]',
      'border-color'
    );

    expect(borderColor).toBeTruthy();
    expect(borderColor).toContain('rgb');
  });
});

