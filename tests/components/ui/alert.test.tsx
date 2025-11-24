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
    // Usa classes do design system de status de sucesso
    expect(successAlert.className).toContain('status-success');

    rerender(<Alert variant="warning">Warning</Alert>);
    const warningAlert = screen.getByRole('alert');
    expect(warningAlert.className).toContain('status-warning');

    rerender(<Alert variant="info">Info</Alert>);
    const infoAlert = screen.getByRole('alert');
    expect(infoAlert.className).toContain('status-info');
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
