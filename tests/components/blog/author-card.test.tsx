/**
 * Testes para componente AuthorCard
 */

import { AuthorCard } from '@/components/blog/author-card';
import { render } from '@testing-library/react';

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock leve de '@/constants' para evitar carregar módulos que dependem
// diretamente de design tokens (ex: constants/home/servicos)
jest.mock('@/constants', () => ({
  SITE_CONFIG: {
    github: 'https://github.com/test',
    linkedin: 'https://linkedin.com/in/test',
    url: 'https://example.com',
  },
}));

describe('AuthorCard', () => {
  it('deve renderizar o card de autor com props', () => {
    const { container } = render(
      <AuthorCard
        fullName="Test Author"
        bio="Test bio"
        avatar="/avatar.jpg"
        role="Developer"
        social={{
          github: 'https://github.com/test',
          twitter: 'https://twitter.com/test',
        }}
      />
    );
    expect(container).toBeTruthy();
  });

  it('deve renderizar com valores padrão', () => {
    const { container } = render(<AuthorCard />);
    expect(container).toBeTruthy();
  });
});
