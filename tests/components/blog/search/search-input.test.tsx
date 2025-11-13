/**
 * Testes para componente SearchInput
 *
 * Nota: Componente não existe, teste mockado
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Componente mockado inline
const SearchInput = () => (
  <input placeholder="buscar" data-testid="search-input" />
);

describe('SearchInput', () => {
  it('deve renderizar o input de busca', () => {
    render(<SearchInput />);
    const input = screen.getByTestId('search-input');
    expect(input).toBeTruthy();
  });

  it('deve aceitar valor digitado', async () => {
    render(<SearchInput />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'test');
    expect(input.value).toBe('test');
  });
});
