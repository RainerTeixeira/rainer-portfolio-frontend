/**
 * Testes para página Sobre
 */

import AboutPage from '@/app/sobre/page';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock dos componentes
jest.mock('@/components/ui', () => ({
  BackToTop: () => <div data-testid="back-to-top">Back to Top</div>,
  PageHeader: ({ children, title, description }: any) => (
    <div data-testid="page-header">
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  ),
  ParticlesEffect: () => <div data-testid="particles-effect">Particles</div>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, priority, ...props }: any) => (
    <img
      src={src}
      alt={alt}
      {...(priority && { priority: priority.toString() })}
      {...props}
    />
  ),
}));

jest.mock('@/constants', () => {
  const React = require('react');
  return {
    EXPERIENCE: [
      {
        period: '2020 - Presente',
        role: 'Desenvolvedor Full-Stack',
        description: 'Desenvolvimento de aplicações web completas',
      },
    ],
    SKILLS: [
      {
        fullName: 'React',
        icon: React.createElement('div', null, 'React'),
        color: 'from-blue-500 to-blue-600',
      },
    ],
  };
});

describe('About Page', () => {
  it('deve renderizar a página sobre', () => {
    render(<AboutPage />);
    expect(screen.getByText('Rainer Teixeira')).toBeInTheDocument();
  });

  it('deve exibir métricas profissionais', () => {
    render(<AboutPage />);
    expect(screen.getByText(/10\+/i)).toBeInTheDocument();
    expect(screen.getByText(/50K\+/i)).toBeInTheDocument();
    expect(screen.getByText(/20\+/i)).toBeInTheDocument();
    expect(screen.getByText(/95\+/i)).toBeInTheDocument();
  });

  it('deve exibir seções de competências', () => {
    render(<AboutPage />);
    expect(screen.getAllByText(/Frontend/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Backend/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Database/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/DevOps & Cloud/i)).toBeInTheDocument();
  });

  it('deve exibir tech stack', () => {
    render(<AboutPage />);
    expect(screen.getByText(/Tech Stack/i)).toBeInTheDocument();
  });
});
