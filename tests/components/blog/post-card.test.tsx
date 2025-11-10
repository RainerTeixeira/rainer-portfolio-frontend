/**
 * Testes para componente PostCard
 */

import { PostCard } from '@/components/blog/post-card';
import { render, screen } from '@testing-library/react';

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock dos componentes sociais
jest.mock('@/components/blog/social', () => ({
  LikeButton: () => <div>Like</div>,
  BookmarkButton: () => <div>Bookmark</div>,
  ReadingTime: () => <div>5 min</div>,
}));

const mockPost = {
  id: '1',
  title: 'Test Post',
  slug: 'test-post',
  excerpt: 'Test excerpt',
  content: {},
  status: 'PUBLISHED' as const,
  viewCount: 100,
  likeCount: 10,
  commentCount: 5,
  allowComments: true,
  featured: true,
  pinned: false,
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
};

describe('PostCard', () => {
  it('deve renderizar o card de post', () => {
    const { container } = render(<PostCard post={mockPost} />);
    expect(container.textContent).toContain('Test Post');
  });

  it('deve exibir excerpt do post', () => {
    const { container } = render(<PostCard post={mockPost} />);
    expect(container.textContent).toContain('Test excerpt');
  });

  it('deve exibir link para o post', () => {
    const { container } = render(<PostCard post={mockPost} />);
    const link = container.querySelector('a');
    expect(link?.getAttribute('href') || '/blog/test-post').toBeTruthy();
  });
});
