/**
 * Testes para lib/utils/design-tokens.ts
 */

import {
  COLOR_HEX,
  hexToHSL,
  hexToRGB,
  hexToRGBA,
} from '@/lib/utils/design-tokens';

describe('lib/utils/design-tokens', () => {
  describe('hexToHSL', () => {
    it('deve converter HEX para HSL', () => {
      const hsl = hexToHSL('#0891b2');
      expect(hsl).toMatch(/^\d+ \d+\.\d+% \d+\.\d+%$/);
    });

    it('deve funcionar com ou sem #', () => {
      const hsl1 = hexToHSL('#0891b2');
      const hsl2 = hexToHSL('0891b2');
      expect(hsl1).toBe(hsl2);
    });
  });

  describe('hexToRGB', () => {
    it('deve converter HEX para RGB', () => {
      const rgb = hexToRGB('#0891b2');
      // hexToRGB retorna "r, g, b" (sem rgb() wrapper)
      expect(rgb).toMatch(/^\d+, \d+, \d+$/);
    });

    it('deve funcionar com ou sem #', () => {
      const rgb1 = hexToRGB('#0891b2');
      const rgb2 = hexToRGB('0891b2');
      expect(rgb1).toBe(rgb2);
    });
  });

  describe('hexToRGBA', () => {
    it('deve converter HEX para RGBA', () => {
      const rgba = hexToRGBA('#0891b2', 0.5);
      expect(rgba).toMatch(/^rgba\(\d+, \d+, \d+, 0\.\d+\)$/);
      expect(rgba).toContain('0.5');
    });

    it('deve usar alpha fornecido', () => {
      const rgba = hexToRGBA('#0891b2', 0.7);
      expect(rgba).toContain('0.7');
    });

    it('deve funcionar com ou sem #', () => {
      const rgba1 = hexToRGBA('#0891b2', 0.5);
      const rgba2 = hexToRGBA('0891b2', 0.5);
      expect(rgba1).toBe(rgba2);
    });
  });

  describe('COLOR_HEX', () => {
    it('deve ter cores definidas', () => {
      expect(COLOR_HEX).toBeDefined();
      expect(typeof COLOR_HEX).toBe('object');
    });

    it('deve ter cores principais', () => {
      expect(COLOR_HEX.blue).toBeDefined();
      expect(COLOR_HEX.cyan).toBeDefined();
      expect(COLOR_HEX.emerald).toBeDefined();
    });
  });
});
