/**
 * Testes para componente NewsletterSection
 */

import { NewsletterSection } from '@/components/home/newsletter-section';
import { render } from '@testing-library/react';

describe('NewsletterSection', () => {
  it('deve renderizar o componente', () => {
    const { container } = render(<NewsletterSection />);
    expect(container).toBeTruthy();
  });

  it('deve renderizar seção de newsletter', () => {
    const { container } = render(<NewsletterSection />);
    const section = container.querySelector('section');
    expect(section).toBeTruthy();
  });
});
