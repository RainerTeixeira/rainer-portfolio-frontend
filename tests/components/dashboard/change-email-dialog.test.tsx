/**
 * Testes para componente ChangeEmailDialog
 */

import { ChangeEmailDialog } from '@/components/domain/dashboard/change-email-dialog';
import { render } from '@testing-library/react';

// Mock do auth context
jest.mock('@/components/providers/auth-context-provider', () => ({
  useAuthContext: jest.fn(() => ({
    user: { email: 'test@test.com' },
  })),
}));

describe('ChangeEmailDialog', () => {
  it('deve renderizar o dialog de mudança de email', () => {
    const { container } = render(
      <ChangeEmailDialog open={false} onOpenChange={jest.fn()} />
    );
    expect(container).toBeTruthy();
  });

  it('deve renderizar quando aberto', () => {
    const { container } = render(
      <ChangeEmailDialog open={true} onOpenChange={jest.fn()} />
    );
    expect(container).toBeTruthy();
  });
});
