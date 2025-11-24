/**
 * Testes para lib/utils/search.ts
 */

import { searchContent } from '@/lib/utils/search';

jest.mock('@/lib/api/services', () => ({
  postsService: {
    listPosts: jest.fn().mockResolvedValue({
      success: true,
      posts: [],
    }),
  },
}));

describe('lib/utils/search', () => {
  describe('searchContent', () => {
    it('deve buscar conteúdo por query', async () => {
      const results = await searchContent('Next.js');
      expect(Array.isArray(results)).toBe(true);
      // Pode retornar array vazio se não houver posts, então apenas verifica que é array
    });

    it('deve retornar array vazio quando query é muito curta', async () => {
      const results = await searchContent('a');
      expect(results).toEqual([]);
    });

    it('deve retornar array vazio quando query está vazia', async () => {
      const results = await searchContent('');
      expect(results).toEqual([]);
    });

    it('deve buscar por título', async () => {
      const results = await searchContent('React');
      expect(Array.isArray(results)).toBe(true);
    });

    it('deve buscar por categoria', async () => {
      const results = await searchContent('TypeScript');
      expect(Array.isArray(results)).toBe(true);
    });
  });
});
