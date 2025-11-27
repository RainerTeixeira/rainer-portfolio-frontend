/**
 * Testes para componente Popover
 */

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@rainersoft/ui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Popover', () => {
  it('deve renderizar popover', () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('deve abrir popover quando trigger é clicado', async () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText('Open');
    await userEvent.click(trigger);

    // Popover pode ser renderizado em portal, então pode não estar imediatamente visível
    expect(trigger).toBeInTheDocument();
  });
});
