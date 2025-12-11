/**
 * Testes para componente CTASection
 */

import { CTASection } from '@/components/domain/home/cta-section';
import { render } from '@testing-library/react';

describe('CTASection', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<CTASection />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar seção CTA', () => {
    const { container } = render(<CTASection />);
    const section = container.querySelector('section');
    expect(section).toBeTruthy();
  });
});
