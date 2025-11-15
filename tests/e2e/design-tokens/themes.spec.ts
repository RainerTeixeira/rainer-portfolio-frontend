/**
 * Design Tokens - Theme Switching Tests
 * 
 * Valida se o tema claro e escuro aplicam corretamente os tokens.
 */

import { test, expect } from '@playwright/test';
import {
  getComputedStyle,
  getCSSVariable,
  setTheme,
  hexToRgb,
  isColorClose,
} from './helpers/token-utils';

test.describe('Design Tokens - Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should switch from light to dark theme correctly', async ({ page }) => {
    // Start in light mode
    await setTheme(page, 'light');
    
    const lightBg = await getCSSVariable(page, '--color-background-primary');
    expect(lightBg).toBe('#ffffff');
    
    // Switch to dark mode
    await setTheme(page, 'dark');
    
    const darkBg = await getCSSVariable(page, '--color-background-primary');
    expect(darkBg).toBe('#0a0a0f'); // Void Black
    
    // Should be different
    expect(lightBg).not.toBe(darkBg);
  });

  test('should apply cyberpunk neon colors in dark mode', async ({ page }) => {
    await setTheme(page, 'dark');
    
    const neonCyan = await getCSSVariable(page, '--color-text-neon-cyan');
    const neonPink = await getCSSVariable(page, '--color-text-neon-pink');
    const neonPurple = await getCSSVariable(page, '--color-text-neon-purple');
    
    expect(neonCyan).toBe('#00e6ff');
    expect(neonPink).toBe('#ff00ff');
    expect(neonPurple).toBe('#7d00ff');
  });

  test('should apply glow effects in dark mode', async ({ page }) => {
    await setTheme(page, 'dark');
    
    const glowCyan = await getCSSVariable(page, '--shadow-glow-cyan');
    const glowPink = await getCSSVariable(page, '--shadow-glow-pink');
    
    expect(glowCyan).toContain('0 0 20px');
    expect(glowCyan).toContain('rgba(0, 230, 255');
    
    expect(glowPink).toContain('0 0 20px');
    expect(glowPink).toContain('rgba(255, 0, 255');
  });

  test('should apply gradients in dark mode', async ({ page }) => {
    await setTheme(page, 'dark');
    
    const gradientPrimary = await getCSSVariable(page, '--gradient-primary');
    const gradientSecondary = await getCSSVariable(page, '--gradient-secondary');
    
    expect(gradientPrimary).toContain('linear-gradient');
    expect(gradientPrimary).toContain('#00e6ff');
    expect(gradientPrimary).toContain('#7d00ff');
    
    expect(gradientSecondary).toContain('linear-gradient');
    expect(gradientSecondary).toContain('#ff00ff');
  });

  test('should apply glass effect in dark mode', async ({ page }) => {
    await setTheme(page, 'dark');
    
    const glass = await getCSSVariable(page, '--color-surface-glass');
    const glassHover = await getCSSVariable(page, '--color-surface-glass-hover');
    
    expect(glass).toContain('rgba');
    expect(glassHover).toContain('rgba');
  });

  test('should change text colors between themes', async ({ page }) => {
    // Light mode
    await setTheme(page, 'light');
    const lightTextPrimary = await getCSSVariable(page, '--color-text-primary');
    
    // Dark mode
    await setTheme(page, 'dark');
    const darkTextPrimary = await getCSSVariable(page, '--color-text-primary');
    
    // Should be different
    expect(lightTextPrimary).not.toBe(darkTextPrimary);
    
    // Light mode text should be dark (#171717)
    expect(lightTextPrimary).toBe('#171717');
    
    // Dark mode text should be light (#b3ffff)
    expect(darkTextPrimary).toBe('#b3ffff');
  });

  test('should change brand colors between themes', async ({ page }) => {
    // Light mode
    await setTheme(page, 'light');
    const lightBrand = await getCSSVariable(page, '--color-brand-primary');
    
    // Dark mode
    await setTheme(page, 'dark');
    const darkBrand = await getCSSVariable(page, '--color-brand-primary');
    
    // Light mode: Cyan (#0891b2)
    expect(lightBrand).toBe('#0891b2');
    
    // Dark mode: Neon Cyan (#00e6ff)
    expect(darkBrand).toBe('#00e6ff');
  });

  test('should persist theme in body class', async ({ page }) => {
    await setTheme(page, 'dark');
    
    const hasDarkClass = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    
    expect(hasDarkClass).toBe(true);
    
    await setTheme(page, 'light');
    
    const hasLightClass = await page.evaluate(() => {
      return !document.documentElement.classList.contains('dark');
    });
    
    expect(hasLightClass).toBe(true);
  });

  test('should apply theme to all color variables', async ({ page }) => {
    // Test in dark mode
    await setTheme(page, 'dark');
    
    const darkVars = {
      '--color-background-primary': '#0a0a0f',
      '--color-background-secondary': '#0f0f1a',
      '--color-text-primary': '#b3ffff',
      '--color-brand-primary': '#00e6ff',
      '--color-border-focus': '#00e6ff',
    };
    
    for (const [varName, expectedValue] of Object.entries(darkVars)) {
      const actualValue = await getCSSVariable(page, varName);
      expect(actualValue, `${varName} in dark mode`).toBe(expectedValue);
    }
    
    // Test in light mode
    await setTheme(page, 'light');
    
    const lightVars = {
      '--color-background-primary': '#ffffff',
      '--color-background-secondary': '#fafafa',
      '--color-text-primary': '#171717',
      '--color-brand-primary': '#0891b2',
      '--color-border-focus': '#0891b2',
    };
    
    for (const [varName, expectedValue] of Object.entries(lightVars)) {
      const actualValue = await getCSSVariable(page, varName);
      expect(actualValue, `${varName} in light mode`).toBe(expectedValue);
    }
  });

  test('should apply theme-specific shadows', async ({ page }) => {
    // Light mode
    await setTheme(page, 'light');
    const lightShadow = await getCSSVariable(page, '--shadow-md');
    expect(lightShadow).toContain('rgba(0, 0, 0, 0.1)');
    
    // Dark mode
    await setTheme(page, 'dark');
    const darkShadow = await getCSSVariable(page, '--shadow-md');
    expect(darkShadow).toContain('rgba(0, 0, 0, 0.5)');
  });
});

