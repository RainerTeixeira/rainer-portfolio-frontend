/**
 * Testes para componente TableOfContents
 */

import { TableOfContents } from '@/components/domain/blog/table-of-contents';
import { render } from '@testing-library/react';

// Mock do hook
jest.mock('@/components/domain/blog/hooks/use-table-of-contents', () => ({
  useTableOfContents: jest.fn(() => ({
    headings: [],
    activeId: null,
    scrollToHeading: jest.fn(),
  })),
}));

describe('TableOfContents', () => {
  it('deve renderizar null quando não há headings', () => {
    const { container } = render(<TableOfContents />);
    // Quando não há headings, retorna null
    expect(container.firstChild).toBeNull();
  });
});
