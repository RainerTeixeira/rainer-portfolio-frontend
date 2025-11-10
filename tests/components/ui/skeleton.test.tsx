/**
 * Testes para componente Skeleton
 */

import { Skeleton } from '@/components/ui/skeleton';
import { render } from '@testing-library/react';

describe('Skeleton', () => {
  it('deve renderizar um skeleton', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild;
    expect(skeleton).toBeInTheDocument();
  });

  it('deve aceitar className customizada', () => {
    const { container } = render(<Skeleton className="custom-class" />);
    const skeleton = container.firstChild;
    expect(skeleton).toHaveClass('custom-class');
  });

  it('deve aceitar children', () => {
    const { container } = render(
      <Skeleton>
        <div>Content</div>
      </Skeleton>
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
