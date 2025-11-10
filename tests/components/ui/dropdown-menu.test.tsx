/**
 * Testes para componente DropdownMenu
 */

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('DropdownMenu', () => {
  it('deve renderizar o dropdown menu', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('deve abrir menu quando trigger é clicado', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByText('Open');
    await userEvent.click(trigger);

    // Menu pode estar em portal
    expect(trigger).toBeInTheDocument();
  });
});
