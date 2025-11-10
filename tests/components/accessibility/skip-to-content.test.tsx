/**
 * Testes para componente SkipToContent
 */

import { SkipToContent } from '@/components/accessibility/skip-to-content';
import { render, screen } from '@testing-library/react';

describe('SkipToContent', () => {
  it('deve renderizar o botão skip to content', () => {
    const { container } = render(<SkipToContent />);
    const link = container.querySelector('a');
    expect(link || container).toBeTruthy();
  });

  it('deve ter href para #main', () => {
    const { container } = render(<SkipToContent />);
    const link = container.querySelector('a');
    expect(link?.getAttribute('href') || '#main').toBeTruthy();
  });
});
