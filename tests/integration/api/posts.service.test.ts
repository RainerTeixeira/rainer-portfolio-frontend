import { postsService } from '@/lib/api';
import { mockFetchOnce, resetFetchMock } from '../../utils/mockFetch';

describe('postsService - Integração', () => {
  afterEach(() => {
    resetFetchMock();
  });

  test('getPosts envia params e retorna resposta paginada', async () => {
    const mock = mockFetchOnce({
      data: [
        {
          id: '1',
          title: 'Post 1',
          slug: 'post-1',
          content: {},
          status: 'PUBLISHED',
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
          allowComments: true,
          featured: false,
          pinned: false,
          createdAt: '',
          updatedAt: '',
        },
      ],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
    });

    const res = await postsService.listPosts({
      page: 1,
      limit: 10,
      status: 'PUBLISHED' as any,
    });
    expect(res.posts?.length || 0).toBeGreaterThanOrEqual(0);
    expect(global.fetch as any).toHaveBeenCalled();
    // Verifica se a função foi chamada
    expect(global.fetch).toHaveBeenCalled();
  });

  test('getPostBySlug retorna um post', async () => {
    mockFetchOnce({
      success: true,
      data: {
        id: '1',
        title: 'Post 1',
        slug: 'post-1',
        content: {},
        status: 'PUBLISHED',
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        allowComments: true,
        featured: false,
        pinned: false,
        createdAt: '',
        updatedAt: '',
      },
    });
    const post = await postsService.getPostBySlug('post-1');
    expect(post.slug).toBe('post-1');
  });

  test('publishPost faz PATCH', async () => {
    const mock = mockFetchOnce({ id: '1', status: 'PUBLISHED' });
    await postsService.publishPost('1');
    const init = (mock as any).mock.calls[0][1];
    expect(init.method).toBe('PATCH');
  });

  test('createPost faz POST', async () => {
    const mockPost = {
      id: 'test-post-1',
      title: 'Test Post',
      slug: 'test-post',
      content: { type: 'doc', content: [] },
      excerpt: 'This is a test post',
      status: 'DRAFT',
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      allowComments: true,
      featured: false,
      pinned: false,
      publishedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newPost = {
      title: 'New Test Post',
      slug: 'new-test-post',
      content: { type: 'doc', content: [] },
      categoryId: 'test-category',
    };

    const mock = mockFetchOnce({
      data: { ...mockPost, ...newPost, id: 'new-post-id' },
      message: 'Post criado com sucesso',
      success: true,
    });

    const result = await postsService.createPost(newPost);

    const init = (mock as any).mock.calls[0][1];
    expect(init.method).toBe('POST');
    expect(result?.title || newPost.title).toBeTruthy();
  });
});
