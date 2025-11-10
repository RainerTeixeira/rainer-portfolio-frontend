/**
 * Testes para página de Contato
 */

import ContactPage from '@/app/contato/page';
import { render, screen } from '@testing-library/react';

// Mock dos componentes
jest.mock('@/components/contato/contact-form', () => ({
  ContactForm: () => <div data-testid="contact-form">Contact Form</div>,
}));

jest.mock('@/components/ui', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
}));

describe('Contact Page', () => {
  it('deve renderizar a página de contato', () => {
    render(<ContactPage />);
    expect(
      screen.getByText(/Vamos Conversar Sobre Seu Projeto/i)
    ).toBeInTheDocument();
  });

  it('deve exibir o formulário de contato', () => {
    render(<ContactPage />);
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });

  it('deve exibir cards de informações de contato', () => {
    render(<ContactPage />);
    expect(screen.getByText(/Horário/i)).toBeInTheDocument();
    expect(screen.getByText(/Localização/i)).toBeInTheDocument();
    expect(screen.getByText(/Telefone/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
  });

  it('deve exibir informações de contato corretas', () => {
    render(<ContactPage />);
    expect(screen.getByText(/Volta Redonda, RJ/i)).toBeInTheDocument();
    expect(screen.getByText(/suporte@rainersoft.com.br/i)).toBeInTheDocument();
  });
});
