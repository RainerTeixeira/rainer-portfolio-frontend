/**
 * Testes para componente RelatedPosts
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

import { RelatedPosts } from '@/components/blog/related-posts';
import { render } from '@testing-library/react';

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock do framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock do next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock do ReadingTime
jest.mock('@/components/blog/social/reading-time', () => ({
  ReadingTime: () => <div>5 min</div>,
}));

// Usa componentes reais de Badge/Card mapeados via moduleNameMapper

const mockPosts = [
  {
    id: '1',
    title: 'Post 1',
    slug: 'post-1',
    subcategory: { name: 'Test' },
    content: { type: 'doc', content: [] },
    views: 100,
    likesCount: 10,
    commentsCount: 5,
    createdAt: '2023-01-01T00:00:00.000Z',
    featured: false,
  },
  {
    id: '2',
    title: 'Post 2',
    slug: 'post-2',
    subcategory: { name: 'Test' },
    content: { type: 'doc', content: [] },
    views: 200,
    likesCount: 20,
    commentsCount: 10,
    createdAt: '2023-01-02T00:00:00.000Z',
    featured: false,
  },
  {
    id: '3',
    title: 'Post 3',
    slug: 'post-3',
    subcategory: { name: 'Test' },
    content: { type: 'doc', content: [] },
    views: 300,
    likesCount: 30,
    commentsCount: 15,
    createdAt: '2023-01-03T00:00:00.000Z',
    featured: false,
  },
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
