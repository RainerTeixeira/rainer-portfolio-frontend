/**
 * Testes para componente Command
 */

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { render } from '@testing-library/react';

// Mock scrollIntoView
Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  value: jest.fn(),
  writable: true,
});

describe('Command', () => {
  it('deve renderizar o command', () => {
    const { container } = render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup>
            <CommandItem>Item 1</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    expect(container).toBeTruthy();
  });

  it('deve exibir itens do comando', () => {
    const { container } = render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem>Item 1</CommandItem>
            <CommandItem>Item 2</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    expect(container.textContent).toContain('Item 1');
    expect(container.textContent).toContain('Item 2');
  });
});
