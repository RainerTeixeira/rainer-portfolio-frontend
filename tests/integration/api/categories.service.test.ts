import { categoriesService } from '@/lib/api';
import { mockFetchOnce, resetFetchMock } from '../../utils/mockFetch';

describe('categoriesService', () => {
  afterEach(() => resetFetchMock());

  test('listCategories normaliza { success, data }', async () => {
    mockFetchOnce({
      success: true,
      data: [
        {
          id: 'c1',
          name: 'Tech',
          slug: 'tech',
          createdAt: '',
          updatedAt: '',
        },
      ],
    });
    const res = await categoriesService.listCategories();
    const list = Array.isArray(res) ? res : (res as any).data;
    expect(list[0].slug).toBe('tech');
  });

  test('getCategoryBySlug retorna categoria', async () => {
    mockFetchOnce({
      success: true,
      data: {
        id: 'c1',
        fullName: 'Tech',
        slug: 'tech',
        createdAt: '',
        updatedAt: '',
      },
    });
    const cat = await categoriesService.getCategoryBySlug('tech');
    expect(cat.slug).toBe('tech');
  });
});
