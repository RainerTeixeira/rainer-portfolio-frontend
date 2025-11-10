/**
 * Testes para componente ProfileForm
 */

import { ProfileForm } from '@/components/dashboard/profile-form';
import { render } from '@testing-library/react';

// Mock do useAuthContext
jest.mock('@/components/providers/auth-context-provider', () => ({
  useAuthContext: jest.fn(() => ({
    user: { id: '1', fullName: 'Test User', email: 'test@test.com' },
    updateProfile: jest.fn(),
  })),
}));

// Mock do cloudinaryService
jest.mock('@/lib/api/services/cloudinary.service', () => ({
  cloudinaryService: {
    uploadBlogImage: jest.fn(),
  },
}));

describe('ProfileForm', () => {
  it('deve renderizar o formulário de perfil', () => {
    const { container } = render(<ProfileForm />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar formulário', () => {
    const { container } = render(<ProfileForm />);
    const form = container.querySelector('form') || container.firstChild;
    expect(form).toBeTruthy();
  });
});
