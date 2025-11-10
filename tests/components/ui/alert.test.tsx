/**
 * Testes para componente Alert
 */

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { render, screen } from '@testing-library/react';

describe('Alert', () => {
  it('deve renderizar um alert', () => {
    render(<Alert>Alert message</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Alert message')).toBeInTheDocument();
  });

  it('deve aceitar variantes', () => {
    const { rerender } = render(<Alert variant="destructive">Error</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('border-destructive');

    rerender(<Alert variant="success">Success</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('border-green-500');

    rerender(<Alert variant="warning">Warning</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('border-yellow-500');

    rerender(<Alert variant="info">Info</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('border-blue-500');
  });

  it('deve aceitar className customizada', () => {
    render(<Alert className="custom-class">Alert</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });

  it('deve renderizar AlertTitle', () => {
    render(
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
      </Alert>
    );
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
  });

  it('deve renderizar AlertDescription', () => {
    render(
      <Alert>
        <AlertDescription>Alert description</AlertDescription>
      </Alert>
    );
    expect(screen.getByText('Alert description')).toBeInTheDocument();
  });
});
