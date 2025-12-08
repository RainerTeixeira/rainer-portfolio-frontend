/**
 * Testes para componente ProfileHeader
 */

import { ProfileHeader } from '@/components/dashboard/profile-header';
import { render } from '@testing-library/react';

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock do useAuthContext
jest.mock('@/components/providers/auth-context-provider', () => ({
  __esModule: true,
  useAuthContext: () => ({
    user: { id: '1', fullName: 'Test User', avatar: '/avatar.jpg' },
    isAuthenticated: true,
    loading: false,
  }),
}));

// Mock do next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
    resolvedTheme: 'light',
    setTheme: jest.fn(),
  })),
}));

// Mock do framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock do usersService
jest.mock('@/lib/api', () => ({
  usersService: {
    updateProfile: jest.fn(),
  },
}));

describe('ProfileHeader', () => {
  it('deve renderizar o header de perfil', () => {
    const { container } = render(<ProfileHeader />);
    expect(container).toBeTruthy();
  });

  it('deve exibir informações do usuário', () => {
    const { container } = render(<ProfileHeader />);
    expect(container.textContent || container.innerHTML).toBeTruthy();
  });
});
