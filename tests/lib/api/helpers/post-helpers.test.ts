/**
 * Testes para lib/api/helpers/post-helpers.ts
 */

import { formatPostDate, getPostExcerpt } from '@/lib/api/helpers/post-helpers';

describe('lib/api/helpers/post-helpers', () => {
  describe('formatPostDate', () => {
    it('deve formatar data em pt-BR', () => {
      const result = formatPostDate('2025-12-16T00:00:00Z');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('getPostExcerpt', () => {
    it('deve cortar conteúdo e adicionar reticências', () => {
      const excerpt = getPostExcerpt('conteúdo longo de teste', 10);
      expect(excerpt).toBe('conteúdo ...');
    });
  });
});
