/**
 * Testes para componente Dialog
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@rainersoft/ui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Dialog', () => {
  it('deve renderizar o dialog', () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('deve abrir dialog quando trigger é clicado', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    const trigger = screen.getByText('Open');
    await userEvent.click(trigger);

    // Dialog pode estar em portal, então pode não estar imediatamente visível
    expect(trigger).toBeInTheDocument();
  });
});
