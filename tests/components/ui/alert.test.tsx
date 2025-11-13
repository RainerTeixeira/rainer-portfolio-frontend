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
    const destructiveAlert = screen.getByRole('alert');
    expect(destructiveAlert.className).toContain('border-destructive');

    rerender(<Alert variant="success">Success</Alert>);
    const successAlert = screen.getByRole('alert');
    expect(successAlert.className).toContain('border-green-500');

    rerender(<Alert variant="warning">Warning</Alert>);
    const warningAlert = screen.getByRole('alert');
    expect(warningAlert.className).toContain('border-yellow-500');

    rerender(<Alert variant="info">Info</Alert>);
    const infoAlert = screen.getByRole('alert');
    expect(infoAlert.className).toContain('border-blue-500');
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
