/**
 * Testes para componente NameAvailability
 */

import { NameAvailability } from '@/components/domain/dashboard/login/name-availability';
import { render } from '@testing-library/react';

// Mock do authService
jest.mock('@/lib/api/services/auth.service', () => ({
  authService: {
    checkName: jest.fn(() => Promise.resolve(true)),
  },
}));

describe('NameAvailability', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<NameAvailability name="Test Name" />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar com nome vazio', () => {
    const { container } = render(<NameAvailability name="" />);
    expect(container).toBeTruthy();
  });
});
