/**
 * Testes para componente Checkbox
 */

import { Checkbox } from '@rainersoft/ui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Checkbox', () => {
  it('deve renderizar um checkbox', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('deve estar desmarcado por padrão', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('deve estar marcado quando checked é true', () => {
    render(<Checkbox checked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('deve estar desabilitado quando disabled é true', () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('deve chamar onChange quando clicado', async () => {
    const handleChange = jest.fn();
    render(<Checkbox onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');

    await userEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalled();
  });

  it('deve aceitar className customizada', () => {
    render(<Checkbox className="custom-class" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('custom-class');
  });
});
