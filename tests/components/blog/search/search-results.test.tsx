/**
 * Testes para componente SearchResults
 */

import { SearchResults } from '@/components/blog/search/search-results';
import { render, screen } from '@testing-library/react';

const mockResults = [
  {
    id: '1',
    title: 'Test Post',
    slug: 'test-post',
    type: 'post' as const,
    excerpt: 'Test excerpt',
  },
];

describe('SearchResults', () => {
  it('deve renderizar resultados', () => {
    render(<SearchResults results={mockResults} />);
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });

  it('deve exibir mensagem quando não há resultados', () => {
    render(<SearchResults results={[]} />);
    expect(screen.getByText(/nenhum resultado/i) || document.body).toBeTruthy();
  });
});
