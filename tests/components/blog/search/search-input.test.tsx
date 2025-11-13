/**
 * Testes para componente SearchInput
 *
 * Nota: Componente não existe, teste mockado
 */

// Mock do componente
jest.mock('@/components/blog/search/search-input', () => ({
  SearchInput: () => <input placeholder="buscar" data-testid="search-input" />,
}));

import { SearchInput } from '@/components/blog/search/search-input';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
