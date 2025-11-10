/**
 * Testes para categoriesService
 */

import { categoriesService } from '@/lib/api';

// Mock do api client
jest.mock('@/lib/api/client', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('categoriesService', () => {
  it('deve ter método listCategories', () => {
    expect(typeof categoriesService.listCategories).toBe('function');
  });

  it('deve ter método getSubcategoriesOnly', () => {
    expect(typeof categoriesService.getSubcategoriesOnly).toBe('function');
  });
});
