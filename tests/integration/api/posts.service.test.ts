import { postsService } from '@/lib/api';
import { mockFetchOnce, mockFetchOnceError, resetFetchMock } from '../../utils/mockFetch';

describe('postsService', () => {
  afterEach(() => {
    resetFetchMock();
  });

  test('getPosts envia params e retorna resposta paginada', async () => {
    const mock = mockFetchOnce({
      data: [
        { id: '1', title: 'Post 1', slug: 'post-1', content: {}, status: 'PUBLISHED', viewCount: 0, likeCount: 0, commentCount: 0, allowComments: true, featured: false, pinned: false, createdAt: '', updatedAt: '' },
      ],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
    });

    const res = await postsService.getPosts({ page: 1, limit: 10, status: 'PUBLISHED' as any });
    expect(res.data.length).toBe(1);
    expect((global.fetch as any)).toHaveBeenCalled();
    const url = new URL((mock as any).mock.calls[0][0]);
    expect(url.pathname.endsWith('/posts')).toBe(true);
    expect(url.searchParams.get('page')).toBe('1');
    expect(url.searchParams.get('limit')).toBe('10');
    expect(url.searchParams.get('status')).toBe('PUBLISHED');
  });

  test('getPostBySlug retorna um post', async () => {
    mockFetchOnce({ id: '1', title: 'Post 1', slug: 'post-1', content: {}, status: 'PUBLISHED', viewCount: 0, likeCount: 0, commentCount: 0, allowComments: true, featured: false, pinned: false, createdAt: '', updatedAt: '' });
    const post = await postsService.getPostBySlug('post-1');
    expect(post.slug).toBe('post-1');
  });

  test('publishPost faz PATCH', async () => {
    const mock = mockFetchOnce({ id: '1', status: 'PUBLISHED' });
    await postsService.publishPost('1');
    const init = (mock as any).mock.calls[0][1];
    expect(init.method).toBe('PATCH');
  });
});
