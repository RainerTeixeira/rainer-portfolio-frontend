/**
 * Testes para serviços públicos de categorias (sem legado)
 */
import { publicBlogCategories } from '@/lib/api';

jest.mock('@/lib/api/clients/public-client', () => ({
  publicClient: {
    get: jest.fn(),
  },
}));

describe('publicBlogCategories', () => {
  it('deve ter método getPublicCategories', () => {
    expect(typeof publicBlogCategories.getPublicCategories).toBe('function');
  });

  it('deve ter método getMainCategories', () => {
    expect(typeof publicBlogCategories.getMainCategories).toBe('function');
  });
});
