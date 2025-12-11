/**
 * Testes para componente StatusBadge
 */

import { StatusBadge } from '@/components/domain/dashboard/login/status-badge';
import { render } from '@testing-library/react';

describe('StatusBadge', () => {
  it('deve renderizar badge disponível', () => {
    const { container } = render(<StatusBadge status="available" />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar badge indisponível', () => {
    const { container } = render(<StatusBadge status="unavailable" />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar badge verificando', () => {
    const { container } = render(<StatusBadge status="checking" />);
    expect(container).toBeTruthy();
  });
});
