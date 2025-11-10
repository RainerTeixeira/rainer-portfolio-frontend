/**
 * Testes para componente Separator
 */

import { Separator } from '@/components/ui/separator';
import { render } from '@testing-library/react';

describe('Separator', () => {
  it('deve renderizar um separador horizontal por padrão', () => {
    const { container } = render(<Separator />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass('h-[1px]', 'w-full');
  });

  it('deve renderizar separador vertical quando orientation é vertical', () => {
    const { container } = render(<Separator orientation="vertical" />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveClass('h-full', 'w-[1px]');
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
