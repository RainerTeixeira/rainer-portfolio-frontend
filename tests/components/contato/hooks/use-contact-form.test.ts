/**
 * Testes para hook useContactForm
 */

import { useContactForm } from '@/components/contato/hooks/use-contact-form';
import { act, renderHook } from '@testing-library/react';

// Mock do fetch
global.fetch = jest.fn();

describe('useContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('deve retornar estado inicial', () => {
    const { result } = renderHook(() => useContactForm());

    expect(result.current).toHaveProperty('formData');
    expect(result.current).toHaveProperty('handleChange');
    expect(result.current).toHaveProperty('handleSubmit');
    expect(typeof result.current.handleChange).toBe('function');
    expect(typeof result.current.handleSubmit).toBe('function');
  });

  it('deve atualizar formData quando handleChange é chamado', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Test User' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.formData.name).toBe('Test User');
  });
});
