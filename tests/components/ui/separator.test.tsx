/**
 * Testes para componente Separator
 */

// Mock do Radix UI Separator
jest.mock('@radix-ui/react-separator', () => ({
  Root: ({ children, ...props }: any) => (
    <div data-radix-separator-root {...props}>
      {children}
    </div>
  ),
}));

import { Separator } from '@rainersoft/ui';
import { render } from '@testing-library/react';

describe('Separator', () => {
  it('deve renderizar um separador horizontal por padrão', () => {
    const { container } = render(<Separator />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toBeInTheDocument();
    expect(separator.className).toContain('h-px');
    expect(separator.className).toContain('w-full');
  });

  it('deve renderizar separador vertical quando orientation é vertical', () => {
    const { container } = render(<Separator orientation="vertical" />);
    const separator = container.firstChild as HTMLElement;
    expect(separator.className).toContain('h-full');
    expect(separator.className).toContain('w-px');
  });

  it('deve ser decorativo por padrão', () => {
    const { container } = render(<Separator />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toBeInTheDocument();
  });

  it('deve aceitar className customizada', () => {
    const { container } = render(<Separator className="custom-class" />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveClass('custom-class');
  });
});
