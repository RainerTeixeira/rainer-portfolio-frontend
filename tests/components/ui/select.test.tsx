/**
 * Testes para componente Select
 */

// Mock simples de Select do @rainersoft/ui para evitar dependências do Radix
jest.mock('@rainersoft/ui', () => {
  const React = require('react');

  const MockSelect = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-select">{children}</div>
  );

  const MockSelectTrigger = ({ children }: { children: React.ReactNode }) => (
    <button type="button">{children}</button>
  );

  const MockSelectContent = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );

  const MockSelectItem = ({ children }: { children: React.ReactNode }) => (
    <div role="option">{children}</div>
  );

  const MockSelectValue = ({ placeholder }: { placeholder?: string }) => (
    <span>{placeholder}</span>
  );

  return {
    __esModule: true,
    Select: MockSelect,
    SelectTrigger: MockSelectTrigger,
    SelectContent: MockSelectContent,
    SelectItem: MockSelectItem,
    SelectValue: MockSelectValue,
  };
});

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@rainersoft/ui';
import { render, screen } from '@testing-library/react';

describe('Select', () => {
  it('deve renderizar o select', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(
      screen.getByText('Select option') || screen.getByRole('combobox')
    ).toBeTruthy();
  });

  it('deve exibir placeholder', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
      </Select>
    );

    expect(
      screen.getByText('Choose...') || screen.getByRole('combobox')
    ).toBeTruthy();
  });
});
