/**
 * Testes para componente Switch
 */

import { Switch } from '@rainersoft/ui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Switch', () => {
  it('deve renderizar um switch', () => {
    render(<Switch />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('deve estar desligado por padrão', () => {
    render(<Switch />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();
  });

  it('deve estar ligado quando checked é true', () => {
    render(<Switch checked />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();
  });

  it('deve estar desabilitado quando disabled é true', () => {
    render(<Switch disabled />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });

  it('deve chamar onCheckedChange quando clicado', async () => {
    const handleChange = jest.fn();
    render(<Switch onCheckedChange={handleChange} />);
    const switchElement = screen.getByRole('switch');

    await userEvent.click(switchElement);

    expect(handleChange).toHaveBeenCalled();
  });
});
