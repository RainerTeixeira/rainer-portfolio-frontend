/**
 * Testes para componente AboutSection
 */

import { AboutSection } from '@/components/domain/home/about-section';
import { render } from '@testing-library/react';

describe('AboutSection', () => {
  it('deve renderizar a seção sobre', () => {
    const { container } = render(<AboutSection />);
    expect(container).toBeTruthy();
  });

  it('deve exibir conteúdo da seção', () => {
    const { container } = render(<AboutSection />);
    // Verifica se há algum conteúdo renderizado
    expect(container.textContent || container.innerHTML).toBeTruthy();
  });
});
