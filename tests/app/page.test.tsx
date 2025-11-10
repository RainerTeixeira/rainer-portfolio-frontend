import HomePage from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Home Page', () => {
  it('deve renderizar a página inicial sem erros', async () => {
    // Renderizar o componente
    render(await HomePage());

    // Verificar se os elementos principais estão presentes
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('deve exibir a seção Hero', async () => {
    render(await HomePage());
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
  });

  it('deve renderizar a seção de portfolio', async () => {
    render(await HomePage());

    // Verificar se a seção de portfolio está presente (pela estrutura)
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();

    // Verificar se existe uma seção com id portfolio
    const portfolioSection = main.querySelector('#portfolio');
    expect(portfolioSection).toBeInTheDocument();
  });

  it('deve exibir a seção de contato', async () => {
    render(await HomePage());
    expect(screen.getByTestId('contact-section')).toBeInTheDocument();
  });
});
