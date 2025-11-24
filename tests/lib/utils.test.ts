/**
 * Testes para lib/utils.ts
 */

import {
  ANIMATION_DELAYS,
  CARD_CLASSES,
  SECTION_CLASSES,
  cn,
} from '@/lib/utils';

describe('lib/utils', () => {
  describe('cn', () => {
    it('deve combinar classes CSS corretamente', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('deve lidar com classes condicionais', () => {
      expect(cn('foo', true && 'bar', false && 'baz')).toBe('foo bar');
    });

    it('deve remover classes duplicadas do Tailwind', () => {
      expect(cn('p-4', 'p-6')).toBe('p-6');
    });

    it('deve lidar com arrays de classes', () => {
      expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
    });

    it('deve lidar com objetos condicionais', () => {
      expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
    });

    it('deve lidar com valores undefined e null', () => {
      expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
    });
  });

  describe('SECTION_CLASSES', () => {
    it('deve ter propriedade container definida', () => {
      expect(SECTION_CLASSES.container).toBeDefined();
      expect(typeof SECTION_CLASSES.container).toBe('string');
    });

    it('deve ter propriedade spacing definida', () => {
      expect(SECTION_CLASSES.spacing).toBeDefined();
      expect(typeof SECTION_CLASSES.spacing).toBe('string');
    });
  });

  describe('CARD_CLASSES', () => {
    it('deve ter propriedade base definida', () => {
      expect(CARD_CLASSES.base).toBeDefined();
      expect(typeof CARD_CLASSES.base).toBe('string');
    });

    it('deve ter propriedade hover definida', () => {
      expect(CARD_CLASSES.hover).toBeDefined();
      expect(typeof CARD_CLASSES.hover).toBe('string');
    });

    it('deve ter propriedade full definida', () => {
      expect(CARD_CLASSES.full).toBeDefined();
      expect(typeof CARD_CLASSES.full).toBe('string');
    });
  });

  describe('ANIMATION_DELAYS', () => {
    it('deve ter delays de partículas definidos', () => {
      expect(ANIMATION_DELAYS.particle1).toBeDefined();
      expect(ANIMATION_DELAYS.particle2).toBeDefined();
      expect(ANIMATION_DELAYS.particle3).toBeDefined();
    });

    it('deve ter delays de variação definidos', () => {
      expect(ANIMATION_DELAYS.short).toBeDefined();
      expect(ANIMATION_DELAYS.medium).toBeDefined();
      expect(ANIMATION_DELAYS.long).toBeDefined();
    });
  });
});
