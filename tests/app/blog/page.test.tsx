/**
 * Testes para página de Blog
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

import BlogPage from '@/app/blog/page';
import { render, screen, waitFor } from '@testing-library/react';

// Mock do framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
  },
}));

// Mock do postsService
jest.mock('@/lib/api/services', () => ({
  postsService: {
    listPosts: jest.fn(() =>
      Promise.resolve({
        posts: [],
        pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
      })
    ),
  },
}));

// Mock dos componentes do blog
jest.mock('@/components/blog', () => ({
  BlogStatCard: () => <div data-testid="blog-stat-card">Stat Card</div>,
  CategoryFilter: () => (
    <div data-testid="category-filter">Category Filter</div>
  ),
  EmptyState: () => <div data-testid="empty-state">Empty State</div>,
  FeaturedPostsSection: () => (
    <div data-testid="featured-posts">Featured Posts</div>
  ),
  NewsletterBox: () => <div data-testid="newsletter-box">Newsletter</div>,
  PostCard: () => <div data-testid="post-card">Post Card</div>,
  SearchBar: () => <div data-testid="search-bar">Search Bar</div>,
  SortControls: () => <div data-testid="sort-controls">Sort Controls</div>,
}));

// Mock dos componentes UI
jest.mock('@rainersoft/ui', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
  PageHeader: ({ children, title, description }: any) => (
    <div data-testid="page-header">
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  ),
  ParticlesEffect: () => <div data-testid="particles-effect">Particles</div>,
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: any) => (
    <div data-testid="card-content">{children}</div>
  ),
  Skeleton: () => <div data-testid="skeleton">Skeleton</div>,
}));

describe('Blog Page', () => {
  it('deve renderizar a página de blog', () => {
    const { container } = render(<BlogPage />);
    expect(container).toBeTruthy();
  });

  it('deve exibir search bar', async () => {
    render(<BlogPage />);
    await waitFor(
      () => {
        expect(screen.getByTestId('search-bar')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('deve renderizar componentes principais', async () => {
    const { container } = render(<BlogPage />);
    await waitFor(
      () => {
        // Verifica se algum conteúdo foi renderizado
        expect(container.textContent).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });
});
