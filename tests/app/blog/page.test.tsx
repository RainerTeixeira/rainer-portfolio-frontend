/**
 * Testes para página de Blog
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

import BlogPage from '@/app/blog/page';
import { render, screen } from '@testing-library/react';

// Mock dos componentes
jest.mock('@/components/blog', () => ({
  PostsCarousel: () => <div data-testid="posts-carousel">Posts Carousel</div>,
  NewsletterBox: () => <div data-testid="newsletter-box">Newsletter</div>,
}));

jest.mock('@/components/ui', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
}));

describe('Blog Page', () => {
  it('deve renderizar a página de blog', async () => {
    const page = await BlogPage();
    const { container } = render(page);
    expect(container).toBeTruthy();
  });

  it('deve exibir carousel de posts', async () => {
    const page = await BlogPage();
    render(page);
    expect(screen.getByTestId('posts-carousel')).toBeInTheDocument();
  });

  it('deve exibir newsletter box', async () => {
    const page = await BlogPage();
    render(page);
    expect(screen.getByTestId('newsletter-box')).toBeInTheDocument();
  });
});
