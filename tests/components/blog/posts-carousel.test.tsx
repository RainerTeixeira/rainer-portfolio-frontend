/**
 * Testes para componente PostsCarousel
 */

import { PostsCarousel } from '@/components/blog/posts-carousel';
import { render } from '@testing-library/react';

describe('PostsCarousel', () => {
  const mockPosts = [
    {
      id: '1',
      title: 'Test Post',
      slug: 'test-post',
      excerpt: 'Test excerpt',
      coverImage: '/test.jpg',
      createdAt: '2023-01-01',
      views: 100,
      likesCount: 10,
    },
  ];

  it('deve renderizar o componente', () => {
    const { container } = render(<PostsCarousel posts={mockPosts} />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar seção de carousel', () => {
    const { container } = render(<PostsCarousel posts={mockPosts} />);
    const section = container.querySelector('section');
    expect(section).toBeTruthy();
  });

  it('deve retornar null quando não há posts', () => {
    const { container } = render(<PostsCarousel posts={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
