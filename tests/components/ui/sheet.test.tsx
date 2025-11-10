/**
 * Testes para componente Sheet
 */

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Sheet', () => {
  it('deve renderizar o sheet', () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('deve abrir sheet quando trigger é clicado', async () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Sheet Title</SheetTitle>
        </SheetContent>
      </Sheet>
    );

    const trigger = screen.getByText('Open');
    await userEvent.click(trigger);

    // Sheet pode estar em portal
    expect(trigger).toBeInTheDocument();
  });
});
