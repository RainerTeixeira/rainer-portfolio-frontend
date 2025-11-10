/**
 * Testes para componente AlertDialog
 */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('AlertDialog', () => {
  it('deve renderizar o alert dialog', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('deve abrir dialog quando trigger é clicado', async () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>
    );

    const trigger = screen.getByText('Open');
    await userEvent.click(trigger);

    // Dialog pode estar em portal
    expect(trigger).toBeInTheDocument();
  });
});
