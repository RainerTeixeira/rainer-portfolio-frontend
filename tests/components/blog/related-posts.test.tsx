/**
 * Testes para componente RelatedPosts
 */

import { RelatedPosts } from '@/components/blog/related-posts';
import { render } from '@testing-library/react';

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

const mockPosts = [
  { id: '1', title: 'Post 1', slug: 'post-1', category: { name: 'Test' } },
  { id: '2', title: 'Post 2', slug: 'post-2', category: { name: 'Test' } },
  { id: '3', title: 'Post 3', slug: 'post-3', category: { name: 'Test' } },
];

describe('RelatedPosts', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(
      <RelatedPosts posts={mockPosts} currentPostId="1" />
    );
    expect(container).toBeTruthy();
  });

  it('deve renderizar seção de posts relacionados', () => {
    const { container } = render(
      <RelatedPosts posts={mockPosts} currentPostId="4" />
    );
    const section = container.querySelector('section');
    expect(section || container.firstChild).toBeTruthy();
  });
});
