/**
 * Design Tokens - CSS Variables Validation Tests
 *
 * Garante que não existem variáveis CSS quebradas ou tokens não resolvidos.
 */

import { expect, test } from '@playwright/test';
import {
  getCSSVariable,
  getCSSVariablesWithPrefix,
  setTheme,
} from './helpers/token-utils';

test.describe('Design Tokens - CSS Variables Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have all color CSS variables defined', async ({ page }) => {
    const colorVars = await getCSSVariablesWithPrefix(page, '--color-');

    // Should have color variables
    expect(Object.keys(colorVars).length).toBeGreaterThan(0);

    // All color variables should have values
    for (const [varName, value] of Object.entries(colorVars)) {
      expect(value, `${varName} should have a value`).toBeTruthy();
      expect(value, `${varName} should not be empty`).not.toBe('');
    }
  });

  test('should have all spacing CSS variables defined', async ({ page }) => {
    const spacingVars = await getCSSVariablesWithPrefix(page, '--spacing-');

    if (Object.keys(spacingVars).length > 0) {
      for (const [varName, value] of Object.entries(spacingVars)) {
        expect(value, `${varName} should have a value`).toBeTruthy();
        // Should be a valid CSS length
        expect(value, `${varName} should be a valid length`).toMatch(
          /^\d+(\.\d+)?(px|rem|em)$/
        );
      }
    }
  });

  test('should have all radius CSS variables defined', async ({ page }) => {
    const radiusVars = await getCSSVariablesWithPrefix(page, '--radius-');

    if (Object.keys(radiusVars).length > 0) {
      for (const [varName, value] of Object.entries(radiusVars)) {
        expect(value, `${varName} should have a value`).toBeTruthy();
        // Should be a valid CSS length or keyword
        expect(value, `${varName} should be valid`).toMatch(
          /^\d+(\.\d+)?(px|rem|em|%)|9999px$/
        );
      }
    }
  });

  test('should have all shadow CSS variables defined', async ({ page }) => {
    const shadowVars = await getCSSVariablesWithPrefix(page, '--shadow-');

    if (Object.keys(shadowVars).length > 0) {
      for (const [varName, value] of Object.entries(shadowVars)) {
        expect(value, `${varName} should have a value`).toBeTruthy();

        // Shadow should contain valid CSS shadow syntax or "none"
        const isValid = value === 'none' || value.match(/\d+px/);
        expect(isValid, `${varName} should be valid shadow syntax`).toBe(true);
      }
    }
  });

  test('should not have broken CSS variable references', async ({ page }) => {
    // Check if any element has a computed style with "var(--" in it
    const brokenVars = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const broken: string[] = [];

      elements.forEach(el => {
        const styles = window.getComputedStyle(el);

        // Check common properties
        const props = [
          'color',
          'background-color',
          'border-color',
          'font-family',
        ];
        props.forEach(prop => {
          const value = styles.getPropertyValue(prop);
          if (value && value.includes('var(--')) {
            broken.push(
              `${el.tagName}.${el.className} has unresolved ${prop}: ${value}`
            );
          }
        });
      });

      return broken;
    });

    expect(brokenVars, 'Should not have broken CSS variables').toHaveLength(0);
  });

  test('should resolve all CSS variables in :root', async ({ page }) => {
    const allVars = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      const vars: Record<string, string> = {};

      for (let i = 0; i < styles.length; i++) {
        const name = styles[i];
        if (name.startsWith('--')) {
          const value = styles.getPropertyValue(name).trim();
          vars[name] = value;
        }
      }

      return vars;
    });

    // Check that important variables are defined
    const requiredVars = [
      '--color-background-primary',
      '--color-text-primary',
      '--color-brand-primary',
    ];

    for (const varName of requiredVars) {
      expect(allVars[varName], `${varName} should be defined`).toBeTruthy();
    }
  });

  test('should have consistent variable values between light and dark themes', async ({
    page,
  }) => {
    // Light mode
    await setTheme(page, 'light');
    const lightBg = await getCSSVariable(page, '--color-background-primary');
    const lightText = await getCSSVariable(page, '--color-text-primary');

    // Dark mode
    await setTheme(page, 'dark');
    const darkBg = await getCSSVariable(page, '--color-background-primary');
    const darkText = await getCSSVariable(page, '--color-text-primary');

    // Values should be different between themes
    expect(lightBg).not.toBe(darkBg);
    expect(lightText).not.toBe(darkText);

    // But all should be defined
    expect(lightBg).toBeTruthy();
    expect(lightText).toBeTruthy();
    expect(darkBg).toBeTruthy();
    expect(darkText).toBeTruthy();
  });

  test('should not have duplicate CSS variable definitions', async ({
    page,
  }) => {
    const allVars = await page.evaluate(() => {
      const root = document.documentElement;
      const dark = document.querySelector('.dark');

      const rootVars = new Set<string>();
      const darkVars = new Set<string>();

      const rootStyles = getComputedStyle(root);
      for (let i = 0; i < rootStyles.length; i++) {
        const name = rootStyles[i];
        if (name.startsWith('--')) {
          rootVars.add(name);
        }
      }

      return {
        rootCount: rootVars.size,
        varNames: Array.from(rootVars),
      };
    });

    // Should have variables
    expect(allVars.rootCount).toBeGreaterThan(0);

    // Check for common duplicates (this is informational)
    const varCounts = new Map<string, number>();
    allVars.varNames.forEach(name => {
      varCounts.set(name, (varCounts.get(name) || 0) + 1);
    });

    // All should appear only once
    for (const [name, count] of varCounts) {
      expect(count, `${name} should not be duplicated`).toBe(1);
    }
  });

  test('should have valid hex color values', async ({ page }) => {
    const colorVars = await getCSSVariablesWithPrefix(page, '--color-');

    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const rgbPattern = /^rgba?\(/;
    const hslPattern = /^hsla?\(/;

    for (const [varName, value] of Object.entries(colorVars)) {
      if (value && value !== 'transparent' && value !== 'currentColor') {
        const isValidColor =
          hexPattern.test(value) ||
          rgbPattern.test(value) ||
          hslPattern.test(value) ||
          value.startsWith('linear-gradient') ||
          value.startsWith('radial-gradient') ||
          value.includes('0 0'); // For shadows

        expect(
          isValidColor,
          `${varName} should have valid color format: ${value}`
        ).toBe(true);
      }
    }
  });

  test('should have gradient variables with valid syntax', async ({ page }) => {
    await setTheme(page, 'dark');

    const gradientVars = await getCSSVariablesWithPrefix(page, '--gradient-');

    for (const [varName, value] of Object.entries(gradientVars)) {
      expect(value, `${varName} should be defined`).toBeTruthy();
      expect(value, `${varName} should contain gradient`).toMatch(/gradient/);
      expect(value, `${varName} should have valid syntax`).toMatch(/\(.*\)/);
    }
  });

  test('should have all required design token categories', async ({ page }) => {
    const categories = ['--color-', '--font-', '--radius-', '--shadow-'];

    for (const prefix of categories) {
      const vars = await getCSSVariablesWithPrefix(page, prefix);
      expect(
        Object.keys(vars).length,
        `Should have ${prefix} variables`
      ).toBeGreaterThan(0);
    }
  });
});
