/**
 * Testes para componente Select
 */

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
