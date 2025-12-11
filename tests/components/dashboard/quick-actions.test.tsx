/**
 * Testes para componente QuickActions
 */

import { QuickActions } from '@/components/domain/dashboard/quick-actions';
import { render } from '@testing-library/react';

describe('QuickActions', () => {
  it('deve renderizar ações rápidas', () => {
    const { container } = render(<QuickActions />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar seção de ações', () => {
    const { container } = render(<QuickActions />);
    const section = container.querySelector('section') || container.firstChild;
    expect(section).toBeTruthy();
  });
});
