/**
 * Testes para componente TermsDialog
 */

import { TermsDialog } from '@/components/dashboard/login/terms-dialog';
import { render } from '@testing-library/react';

describe('TermsDialog', () => {
  it('deve renderizar o dialog de termos', () => {
    const { container } = render(
      <TermsDialog open={false} onOpenChange={jest.fn()} />
    );
    expect(container).toBeTruthy();
  });

  it('deve renderizar quando aberto', () => {
    const { container } = render(
      <TermsDialog open={true} onOpenChange={jest.fn()} />
    );
    expect(container).toBeTruthy();
  });
});
