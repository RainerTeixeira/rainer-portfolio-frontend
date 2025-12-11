/**
 * Testes para componente ChangeUsernameDialog
 */

import { ChangeUsernameDialog } from '@/components/domain/dashboard/change-username-dialog';
import { render } from '@testing-library/react';

// Mock do auth context
jest.mock('@/components/providers/auth-context-provider', () => ({
  useAuthContext: jest.fn(() => ({
    user: { username: 'testuser' },
  })),
}));

describe('ChangeUsernameDialog', () => {
  it('deve renderizar o dialog de mudança de username', () => {
    const { container } = render(
      <ChangeUsernameDialog open={false} onOpenChange={jest.fn()} />
    );
    expect(container).toBeTruthy();
  });

  it('deve renderizar quando aberto', () => {
    const { container } = render(
      <ChangeUsernameDialog open={true} onOpenChange={jest.fn()} />
    );
    expect(container).toBeTruthy();
  });
});
