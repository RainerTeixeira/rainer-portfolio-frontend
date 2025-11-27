/**
 * Testes para componente Input
 */

import { Input } from '@rainersoft/ui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
  it('deve renderizar um input', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('deve aceitar placeholder', () => {
    render(<Input placeholder="Digite aqui" />);
    expect(screen.getByPlaceholderText('Digite aqui')).toBeInTheDocument();
  });

  it('deve aceitar diferentes tipos', () => {
    const { rerender } = render(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" />);
    expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password');
  });

  it('deve aceitar value', () => {
    render(<Input value="Teste" readOnly />);
    expect(screen.getByDisplayValue('Teste')).toBeInTheDocument();
  });

  it('deve estar desabilitado quando disabled é true', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('deve aceitar className customizada', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('deve chamar onChange quando o valor muda', async () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'test');

    expect(handleChange).toHaveBeenCalled();
  });
});
