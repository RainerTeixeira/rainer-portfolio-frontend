import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { postsService } from '@/lib/api';

// Mock dos serviços da API
jest.mock('@/lib/api', () => ({
  postsService: {
    getPosts: jest.fn(),
  },
}));

describe('Home Page', () => {
  // Dados de exemplo para os posts
  const mockPosts = [
    {
      id: '1',
      title: 'Test Post 1',
      slug: 'test-post-1',
      excerpt: 'This is a test post',
      content: {},
      status: 'PUBLISHED',
      viewCount: 100,
      likeCount: 10,
      commentCount: 5,
      allowComments: true,
      featured: true,
      pinned: false,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    },
  ];

  beforeEach(() => {
    // Resetar os mocks antes de cada teste
    jest.clearAllMocks();
    
    // Configurar o mock para retornar posts de exemplo
    (postsService.getPosts as jest.Mock).mockResolvedValue({
      data: mockPosts,
      meta: {
        total: 1,
        page: 1,
        limit: 3,
        totalPages: 1,
      },
    });
  });

  it('deve renderizar a página inicial sem erros', async () => {
    // Renderizar o componente
    render(await HomePage());
    
    // Verificar se os elementos principais estão presentes
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('deve exibir a seção Hero', async () => {
    render(await HomePage());
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
  });

  it('deve carregar e exibir posts em destaque', async () => {
    render(await HomePage());
    
    // Verificar se a função de busca foi chamada
    expect(postsService.getPosts).toHaveBeenCalledWith({
      status: 'PUBLISHED',
      featured: true,
      limit: 3,
      page: 1,
      sortBy: 'publishedAt',
      sortOrder: 'desc',
    });

    // Verificar se o post mockado está sendo exibido
    const postTitle = await screen.findByText('Test Post 1');
    expect(postTitle).toBeInTheDocument();
  });

  it('deve exibir a seção de contato', async () => {
    render(await HomePage());
    expect(screen.getByTestId('contact-section')).toBeInTheDocument();
  });
});
