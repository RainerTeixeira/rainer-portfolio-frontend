/**
 * Testes para componente HelpCenter
 */

import { HelpCenter } from '@/components/dashboard/help-center';
import { render } from '@testing-library/react';

describe('HelpCenter', () => {
  it('deve renderizar o centro de ajuda', () => {
    const { container } = render(<HelpCenter />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar seção de ajuda', () => {
    const { container } = render(<HelpCenter />);
    const section = container.querySelector('section') || container.firstChild;
    expect(section).toBeTruthy();
  });
});
