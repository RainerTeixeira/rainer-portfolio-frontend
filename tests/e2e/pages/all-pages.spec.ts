/**
 * E2E Tests - All Pages
 * 
 * Valida que TODAS as páginas do site usam design tokens corretamente.
 */

import { expect, test } from '@playwright/test';
import { getCSSVariable, setTheme } from '../design-tokens/helpers/token-utils';

const pages = [
  { path: '/', name: 'Home' },
  { path: '/blog', name: 'Blog' },
  { path: '/sobre', name: 'Sobre' },
  { path: '/contato', name: 'Contato' },
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/termos', name: 'Termos' },
  { path: '/privacidade', name: 'Privacidade' },
  { path: '/cookies', name: 'Cookies' },
];

test.describe('All Pages - Design Tokens Validation', () => {
  for (const page of pages) {
    test.describe(page.name, () => {
      test.beforeEach(async ({ page: p }) => {
        await p.goto(page.path);
        await p.waitForLoadState('networkidle');
      });

      test('should not have hardcoded inline colors', async ({ page: p }) => {
        // Find elements with inline styles containing colors
        const elementsWithInlineColors = await p.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('[style]'));
          const issues: string[] = [];

          elements.forEach(el => {
            const style = el.getAttribute('style') || '';
            
            // Check for hardcoded colors (excluding opacity and safe values)
            if (
              /#[0-9a-f]{3,6}/i.test(style) ||
              /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/i.test(style)
            ) {
              // Exceptions
              if (!style.includes('opacity') && !style.includes('z-index')) {
                issues.push(`${el.tagName}: ${style}`);
              }
            }
          });

          return issues;
        });

        if (elementsWithInlineColors.length > 0) {
          console.warn(`Found ${elementsWithInlineColors.length} elements with inline hardcoded colors in ${page.name}`);
          console.warn(elementsWithInlineColors.slice(0, 5));
        }

        // Allow some inline styles but log them
        expect(elementsWithInlineColors.length).toBeLessThan(10);
      });

      test('should use CSS variables for colors', async ({ page: p }) => {
        const bgColor = await getCSSVariable(p, '--color-background-primary');
        const textColor = await getCSSVariable(p, '--color-text-primary');
        const brandColor = await getCSSVariable(p, '--color-brand-primary');

        expect(bgColor).toBeTruthy();
        expect(textColor).toBeTruthy();
        expect(brandColor).toBeTruthy();
      });

      test('should apply theme correctly', async ({ page: p }) => {
        // Light mode
        await setTheme(p, 'light');
        const lightBg = await getCSSVariable(p, '--color-background-primary');
        expect(lightBg).toBe('#ffffff');

        // Dark mode
        await setTheme(p, 'dark');
        const darkBg = await getCSSVariable(p, '--color-background-primary');
        expect(darkBg).toBe('#0a0a0f');
      });

      test('should use token-based spacing', async ({ page: p }) => {
        // Check main container spacing
        const mainElement = p.locator('main').first();
        
        if (await mainElement.count() > 0) {
          const spacing = await mainElement.evaluate(el => {
            const style = window.getComputedStyle(el);
            return {
              paddingTop: parseFloat(style.paddingTop),
              paddingBottom: parseFloat(style.paddingBottom),
              marginTop: parseFloat(style.marginTop),
              marginBottom: parseFloat(style.marginBottom),
            };
          });

          // Validate spacing follows 8pt grid (multiple of 4px with 2px tolerance)
          Object.values(spacing).forEach(value => {
            if (value > 0) {
              expect(value % 4).toBeLessThanOrEqual(2);
            }
          });
        }
      });

      test('should not have hardcoded font sizes', async ({ page: p }) => {
        const elementsWithInlineFontSize = await p.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('[style]'));
          return elements.filter(el => {
            const style = el.getAttribute('style') || '';
            return /font-size:\s*\d+px/i.test(style) || /font-size:\s*\d+rem/i.test(style);
          }).length;
        });

        expect(elementsWithInlineFontSize).toBeLessThan(5);
      });
    });
  }
});

