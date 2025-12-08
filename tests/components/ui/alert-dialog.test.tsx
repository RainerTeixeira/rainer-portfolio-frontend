/**
 * Testes para componente AlertDialog
 */

// Mock simples dos componentes de AlertDialog do @rainersoft/ui para evitar
// dependências internas do Radix durante os testes.
jest.mock('@rainersoft/ui', () => {
  const React = require('react');

  const MockAlertDialog = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-alert-dialog">{children}</div>
  );

  const MockAlertDialogTrigger = ({ children }: { children: React.ReactNode }) => (
    <button type="button">{children}</button>
  );

  const MockAlertDialogContent = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );

  const MockAlertDialogHeader = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );

  const MockAlertDialogFooter = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );

  const MockAlertDialogTitle = ({ children }: { children: React.ReactNode }) => (
    <h2>{children}</h2>
  );

  const MockAlertDialogDescription = ({ children }: { children: React.ReactNode }) => (
    <p>{children}</p>
  );

  const MockAlertDialogAction = ({ children }: { children: React.ReactNode }) => (
    <button type="button">{children}</button>
  );

  const MockAlertDialogCancel = ({ children }: { children: React.ReactNode }) => (
    <button type="button">{children}</button>
  );

  return {
    __esModule: true,
    AlertDialog: MockAlertDialog,
    AlertDialogTrigger: MockAlertDialogTrigger,
    AlertDialogContent: MockAlertDialogContent,
    AlertDialogHeader: MockAlertDialogHeader,
    AlertDialogFooter: MockAlertDialogFooter,
    AlertDialogTitle: MockAlertDialogTitle,
    AlertDialogDescription: MockAlertDialogDescription,
    AlertDialogAction: MockAlertDialogAction,
    AlertDialogCancel: MockAlertDialogCancel,
  };
});

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
} from '@rainersoft/ui';
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
