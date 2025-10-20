import { postsService } from '@/lib/api';

// Dados de exemplo para os testes
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

describe('Posts Service', () => {
  // Armazenar o ambiente original
  const originalEnv = process.env;

  beforeAll(() => {
    // Configurar variáveis de ambiente para os testes
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000';
  });

  afterAll(() => {
    // Restaurar o ambiente original
    process.env = originalEnv;
  });

  describe('getPosts', () => {
    it('deve fazer uma requisição GET para /posts com os parâmetros corretos', async () => {
      // Mock da função fetch global
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            data: [mockPost],
            message: 'Posts encontrados',
            success: true,
          }),
          headers: new Headers({ 'content-type': 'application/json' }),
        } as Response)
      ) as jest.Mock;

      const params = {
        page: 1,
        limit: 10,
        status: 'PUBLISHED',
        sortBy: 'publishedAt',
        sortOrder: 'desc' as const,
      };

      const result = await postsService.getPosts(params);

      // Verificar se a URL está correta
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/posts?page=1&limit=10&status=PUBLISHED&sortBy=publishedAt&sortOrder=desc'),
        expect.any(Object)
      );

      // Verificar o resultado
      expect(result.data).toHaveLength(1);
      expect(result.data[0].title).toBe('Test Post');
    });
  });

  describe('getPostBySlug', () => {
    it('deve fazer uma requisição GET para /posts/slug/:slug', async () => {
      const slug = 'test-post';
      
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            data: { ...mockPost, slug },
            message: 'Post encontrado',
            success: true,
          }),
          headers: new Headers({ 'content-type': 'application/json' }),
        } as Response)
      ) as jest.Mock;

      const result = await postsService.getPostBySlug(slug);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/posts/slug/${slug}`),
        expect.any(Object)
      );
      
      expect(result.slug).toBe(slug);
    });
  });

  describe('createPost', () => {
    it('deve fazer uma requisição POST para /posts', async () => {
      const newPost = {
        title: 'New Test Post',
        slug: 'new-test-post',
        content: { type: 'doc', content: [] },
        categoryId: 'test-category',
      };

      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            data: { ...mockPost, ...newPost, id: 'new-post-id' },
            message: 'Post criado com sucesso',
            success: true,
          }),
          headers: new Headers({ 'content-type': 'application/json' }),
        } as Response)
      ) as jest.Mock;

      const result = await postsService.createPost(newPost);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/posts'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newPost),
        })
      );
      
      expect(result.title).toBe(newPost.title);
      expect(result.id).toBe('new-post-id');
    });
  });
});
