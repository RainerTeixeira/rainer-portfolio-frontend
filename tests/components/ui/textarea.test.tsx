/**
 * Testes para componente Textarea
 */

import { Textarea } from '@rainersoft/ui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Textarea', () => {
  it('deve renderizar um textarea', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('deve aceitar placeholder', () => {
    render(<Textarea placeholder="Digite aqui" />);
    expect(screen.getByPlaceholderText('Digite aqui')).toBeInTheDocument();
  });

  it('deve aceitar value', () => {
    render(<Textarea value="Teste" readOnly />);
    expect(screen.getByDisplayValue('Teste')).toBeInTheDocument();
  });

  it('deve estar desabilitado quando disabled é true', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('deve aceitar className customizada', () => {
    render(<Textarea className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('deve chamar onChange quando o valor muda', async () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');

    await userEvent.type(textarea, 'test');

    expect(handleChange).toHaveBeenCalled();
  });

  it('deve aceitar rows', () => {
    render(<Textarea rows={5} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5');
  });
});
