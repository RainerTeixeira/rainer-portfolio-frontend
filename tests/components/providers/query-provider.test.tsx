/**
 * Testes para QueryProvider
 */

import { QueryProvider } from '@/components/providers/query-provider';
import { render } from '@testing-library/react';

describe('QueryProvider', () => {
  it('deve renderizar o provider', () => {
    const { container } = render(
      <QueryProvider>
        <div>Test</div>
      </QueryProvider>
    );
    expect(container).toBeTruthy();
  });

  it('deve renderizar children', () => {
    const { getByText } = render(
      <QueryProvider>
        <div>Test Content</div>
      </QueryProvider>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
