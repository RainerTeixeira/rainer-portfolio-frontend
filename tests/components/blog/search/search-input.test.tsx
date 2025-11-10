/**
 * Testes para componente SearchInput
 */

import { SearchInput } from '@/components/blog/search/search-input';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SearchInput', () => {
  it('deve renderizar o input de busca', () => {
    render(<SearchInput />);
    const input =
      screen.getByRole('textbox') || screen.getByPlaceholderText(/buscar/i);
    expect(input || document.querySelector('input')).toBeTruthy();
  });

  it('deve aceitar valor digitado', async () => {
    render(<SearchInput />);
    const input =
      (screen.getByRole('textbox') as HTMLInputElement) ||
      (document.querySelector('input') as HTMLInputElement);
    if (input) {
      await userEvent.type(input, 'test');
      expect(input.value).toBe('test');
    }
  });
});
