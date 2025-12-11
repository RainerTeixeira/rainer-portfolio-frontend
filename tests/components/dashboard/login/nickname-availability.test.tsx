/**
 * Testes para componente NicknameAvailability
 */

import { NicknameAvailability } from '@/components/domain/dashboard/login/nickname-availability';
import { render, waitFor } from '@testing-library/react';

// Mock do authService
jest.mock('@/lib/api/services/auth.service', () => ({
  authService: {
    checkNickname: jest.fn(() => Promise.resolve(true)),
  },
}));

describe('NicknameAvailability', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o componente', async () => {
    const { container } = render(<NicknameAvailability username="test" />);
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });

  it('deve renderizar com nickname vazio', () => {
    const { container } = render(<NicknameAvailability username="" />);
    // Quando vazio, não renderiza nada
    expect(container).toBeTruthy();
  });
});
