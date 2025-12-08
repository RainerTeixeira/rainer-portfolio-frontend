/**
 * Testes para componente PostCard
 */

import { PostCard } from '@/components/blog/post-card';
import { render } from '@testing-library/react';

// Mock de tokens de cores usados pelo PostCard
jest.mock('@/lib/utils/tokens', () => ({
  getLightColors: () => ({
    brand: {
      primary: '#0ea5e9',
      secondary: '#8b5cf6',
      tertiary: '#ec4899',
    },
    accent: {
      cyan: '#22d3ee',
      purple: '#a855f7',
      pink: '#ec4899',
    },
  }),
  getDarkColors: () => ({
    brand: {
      primary: '#0ea5e9',
      secondary: '#8b5cf6',
      tertiary: '#ec4899',
    },
    accent: {
      cyan: '#22d3ee',
      purple: '#a855f7',
      pink: '#ec4899',
    },
  }),
}));

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock dos componentes sociais
jest.mock('@/components/blog/social', () => ({
  LikeButton: () => <div>Like</div>,
  BookmarkButton: () => <div>Bookmark</div>,
  ShareButton: () => <div>Share</div>,
  ReadingTime: () => <div>5 min</div>,
}));

// Mock do framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    article: ({ children, ...props }: any) => (
      <article {...props}>{children}</article>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock do next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Usa componentes reais de Card/Badge mapeados via moduleNameMapper

const mockPost = {
  title: 'Test Post',
  description: 'Test excerpt',
  link: '/blog/test-post',
  date: '2023-01-01',
  category: 'Test',
};

describe('PostCard', () => {
  it('deve renderizar o card de post', () => {
    const { container } = render(<PostCard {...mockPost} />);
    expect(container.textContent).toContain('Test Post');
  });

  it('deve exibir excerpt do post', () => {
    const { container } = render(<PostCard {...mockPost} />);
    expect(container.textContent).toContain('Test excerpt');
  });

  it('deve exibir link para o post', () => {
    const { container } = render(<PostCard {...mockPost} />);
    const link = container.querySelector('a');
    expect(link?.getAttribute('href')).toBe('/blog/test-post');
  });
});
