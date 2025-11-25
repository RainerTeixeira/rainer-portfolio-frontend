/**
 * Testes para componente Label
 */

import { Label } from '@rainersoft/ui';
import { render, screen } from '@testing-library/react';

describe('Label', () => {
  it('deve renderizar um label', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('deve aceitar htmlFor', () => {
    render(<Label htmlFor="input-id">Label Text</Label>);
    const label = screen.getByText('Label Text');
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('deve aceitar className customizada', () => {
    render(<Label className="custom-class">Label</Label>);
    expect(screen.getByText('Label')).toHaveClass('custom-class');
  });
});
