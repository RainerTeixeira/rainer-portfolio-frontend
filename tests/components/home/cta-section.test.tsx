/**
 * Testes para componente CTASection
 */

import { CTASection } from '@/components/domain/home/cta-section';
import { render } from '@testing-library/react';

// Mock do design tokens
jest.mock('@rainersoft/design-tokens', () => ({
  tokens: {
    primitives: {
      breakpointsPrimitive: {
        '3xl': '1920px',
        '2xl': '1536px',
        xl: '1280px',
        lg: '1024px',
        md: '768px',
        sm: '640px',
      },
      spacing: {
        '0': '0px',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
      },
    },
  },
}));

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
