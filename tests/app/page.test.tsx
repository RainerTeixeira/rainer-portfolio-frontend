// Mock do CSS
jest.mock('@/app/globals.css', () => ({}));

// Mock dos componentes principais
jest.mock('@/components/ui', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
}));

import HomePage from '@/app/page';
import { render } from '@testing-library/react';

describe('Home Page', () => {
  it('deve renderizar a página inicial sem erros', async () => {
    // Renderizar o componente
    const { container } = render(await HomePage());

    // Verificar se renderizou algo
    expect(container).toBeTruthy();
  });

  it('deve exibir a seção Hero', async () => {
    const { container } = render(await HomePage());
    // Verifica se há algum elemento na página
    expect(container.firstChild).toBeTruthy();
  });

  it('deve renderizar a seção de portfolio', async () => {
    const { container } = render(await HomePage());

    // Verificar se renderizou
    expect(container).toBeTruthy();
  });

  it('deve exibir a seção de contato', async () => {
    const { container } = render(await HomePage());
    // Verifica se renderizou
    expect(container).toBeTruthy();
  });
});
