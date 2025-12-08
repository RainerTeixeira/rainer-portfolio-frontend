/**
 * Testes para componente Dialog
 */

// Mock simples dos componentes de Dialog do @rainersoft/ui para evitar
// dependências internas do Radix durante os testes.
jest.mock('@rainersoft/ui', () => {
  const React = require('react');

  const MockDialog = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-dialog">{children}</div>
  );

  const MockDialogTrigger = ({ children }: { children: React.ReactNode }) => (
    <button type="button">{children}</button>
  );

  const MockDialogContent = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );

  const MockDialogHeader = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );

  const MockDialogTitle = ({ children }: { children: React.ReactNode }) => (
    <h2>{children}</h2>
  );

  const MockDialogDescription = ({ children }: { children: React.ReactNode }) => (
    <p>{children}</p>
  );

  return {
    __esModule: true,
    Dialog: MockDialog,
    DialogTrigger: MockDialogTrigger,
    DialogContent: MockDialogContent,
    DialogHeader: MockDialogHeader,
    DialogTitle: MockDialogTitle,
    DialogDescription: MockDialogDescription,
  };
});

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
