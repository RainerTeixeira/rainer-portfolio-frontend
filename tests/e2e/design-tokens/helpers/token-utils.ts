/**
 * Design Token Testing Utilities
 *
 * Helpers para validar aplicação de design tokens na UI.
 */

import { Page } from '@playwright/test';
import { tokens } from '@rainersoft/design-tokens';

/**
 * Converte HSL para RGB para comparação
 */
export function hslToRgb(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const r = Math.round(255 * f(0));
  const g = Math.round(255 * f(8));
  const b = Math.round(255 * f(4));

  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Converte hex para RGB
 */
export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '';

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Get computed style de um elemento
 */
export async function getComputedStyle(
  page: Page,
  selector: string,
  property: string
): Promise<string> {
  return await page.evaluate(
    ({ sel, prop }) => {
      const element = document.querySelector(sel);
      if (!element) throw new Error(`Element ${sel} not found`);
      return window.getComputedStyle(element).getPropertyValue(prop);
    },
    { sel: selector, prop: property }
  );
}

/**
 * Get CSS variable value
 */
export async function getCSSVariable(
  page: Page,
  variableName: string
): Promise<string> {
  return await page.evaluate(varName => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
  }, variableName);
}

/**
 * Valida se uma cor está próxima da esperada (tolerância para anti-aliasing)
 */
export function isColorClose(
  actual: string,
  expected: string,
  tolerance = 5
): boolean {
  const parseRgb = (rgb: string) => {
    const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return null;
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
    };
  };

  const actualRgb = parseRgb(actual);
  const expectedRgb = parseRgb(expected);

  if (!actualRgb || !expectedRgb) return false;

  return (
    Math.abs(actualRgb.r - expectedRgb.r) <= tolerance &&
    Math.abs(actualRgb.g - expectedRgb.g) <= tolerance &&
    Math.abs(actualRgb.b - expectedRgb.b) <= tolerance
  );
}

/**
 * Valida múltiplas CSS variables
 */
export async function validateCSSVariables(
  page: Page,
  variables: Record<string, string>
): Promise<{ valid: boolean; errors: string[] }> {
  const errors: string[] = [];

  for (const [varName, expectedValue] of Object.entries(variables)) {
    const actualValue = await getCSSVariable(page, varName);

    if (!actualValue) {
      errors.push(`CSS variable ${varName} not found`);
    } else if (
      actualValue !== expectedValue &&
      !isColorClose(actualValue, expectedValue)
    ) {
      errors.push(
        `CSS variable ${varName} mismatch: expected "${expectedValue}", got "${actualValue}"`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Toggle dark mode
 */
export async function toggleDarkMode(page: Page): Promise<void> {
  await page.evaluate(() => {
    document.documentElement.classList.toggle('dark');
  });

  // Wait for CSS transition
  await page.waitForTimeout(300);
}

/**
 * Set theme
 */
export async function setTheme(
  page: Page,
  theme: 'light' | 'dark'
): Promise<void> {
  await page.evaluate(t => {
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, theme);

  // Wait for CSS transition
  await page.waitForTimeout(300);
}

/**
 * Get all CSS variables starting with prefix
 */
export async function getCSSVariablesWithPrefix(
  page: Page,
  prefix: string
): Promise<Record<string, string>> {
  return await page.evaluate(pre => {
    const styles = getComputedStyle(document.documentElement);
    const variables: Record<string, string> = {};

    for (let i = 0; i < styles.length; i++) {
      const name = styles[i];
      if (name.startsWith(pre)) {
        variables[name] = styles.getPropertyValue(name).trim();
      }
    }

    return variables;
  }, prefix);
}

/**
 * Validate spacing value
 */
export function validateSpacing(actual: string, expected: string): boolean {
  // Convert both to pixels for comparison
  const actualPx = parseFloat(actual);
  const expectedPx = parseFloat(expected);

  // Allow 1px tolerance
  return Math.abs(actualPx - expectedPx) <= 1;
}

/**
 * Get design tokens for comparison
 */
export function getTokens() {
  return tokens;
}
