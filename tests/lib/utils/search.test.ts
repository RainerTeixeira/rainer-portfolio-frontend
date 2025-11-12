/**
 * Testes para lib/utils/search.ts
 */

import { searchContent } from '@/lib/utils/search';

describe('lib/utils/search', () => {
  describe('searchContent', () => {
    it('deve buscar conteúdo por query', () => {
      const results = searchContent('Next.js');
      expect(results.length).toBeGreaterThan(0);
    });

    it('deve retornar array vazio quando query é muito curta', () => {
      const results = searchContent('a');
      expect(results).toEqual([]);
    });

    it('deve retornar array vazio quando query está vazia', () => {
      const results = searchContent('');
      expect(results).toEqual([]);
    });

    it('deve buscar por título', () => {
      const results = searchContent('React');
      expect(results.length).toBeGreaterThan(0);
    });

    it('deve buscar por categoria', () => {
      const results = searchContent('TypeScript');
      expect(results.length).toBeGreaterThan(0);
    });
  });
});

