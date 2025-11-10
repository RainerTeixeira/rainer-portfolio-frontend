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
