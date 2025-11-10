/**
 * Testes para componente PageHeader
 */

import { PageHeader } from '@/components/ui/page-header';
import { render, screen } from '@testing-library/react';

describe('PageHeader', () => {
  it('deve renderizar o header', () => {
    render(<PageHeader title="Test Title" description="Test description" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('deve exibir descrição', () => {
    render(<PageHeader title="Test" description="Description" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('deve renderizar children', () => {
    render(
      <PageHeader title="Test">
        <div>Child content</div>
      </PageHeader>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
