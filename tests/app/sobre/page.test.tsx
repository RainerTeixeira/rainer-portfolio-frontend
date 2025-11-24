/**
 * Testes para página Sobre
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

// Mock das fontes do Next.js
jest.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
  Orbitron: () => ({ variable: '--font-orbitron' }),
  Rajdhani: () => ({ variable: '--font-rajdhani' }),
}));

// Mock de variáveis de ambiente
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:4000';

import AboutPage from '@/app/sobre/page';
import { render, screen } from '@testing-library/react';

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

jest.mock('@/components/ui/separator', () => ({
  Separator: () => <hr data-testid="separator" />,
}));

jest.mock('@/components/ui/card', () => ({
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  CardHeader: ({ children }: any) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children }: any) => (
    <h3 data-testid="card-title">{children}</h3>
  ),
  CardDescription: ({ children }: any) => (
    <p data-testid="card-description">{children}</p>
  ),
  CardContent: ({ children }: any) => (
    <div data-testid="card-content">{children}</div>
  ),
}));

jest.mock('@/components/skills/skills-with-icons', () => ({
  SKILLS: [
    {
      fullName: 'React',
      icon: null,
      color: 'from-blue-500 to-blue-600',
    },
  ],
}));

jest.mock('@/components/ui/badge', () => ({
  Badge: ({ children }: any) => <span data-testid="badge">{children}</span>,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  ),
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

jest.mock('@/components/sobre/cta-card', () => ({
  CTACard: ({ title, description }: any) => (
    <div data-testid="cta-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

jest.mock('@/components/sobre/experience-card', () => ({
  ExperienceCard: ({ period, role, description }: any) => (
    <div data-testid="experience-card">
      <p>{period}</p>
      <h3>{role}</h3>
      <p>{description}</p>
    </div>
  ),
}));

jest.mock('@/components/sobre/metric-card', () => ({
  MetricCard: ({ value, label }: any) => (
    <div data-testid="metric-card">
      <span>{value}</span>
      <span>{label}</span>
    </div>
  ),
}));

jest.mock('@/components/sobre/skill-layer-card', () => ({
  SkillLayerCard: ({ title, subtitle, technologies }: any) => (
    <div data-testid="skill-layer-card">
      <h3>{title}</h3>
      <p>{subtitle}</p>
      {technologies?.map((tech: string) => (
        <span key={tech}>{tech}</span>
      ))}
    </div>
  ),
}));

jest.mock('@/components/sobre/tech-stack-card', () => ({
  TechStackCard: ({ skills }: any) => (
    <div data-testid="tech-stack-card">
      <h3>Tech Stack</h3>
      {skills?.map((skill: any) => (
        <span key={skill.fullName}>{skill.fullName}</span>
      ))}
    </div>
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
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
    PROFESSIONAL_METRICS: [
      {
        label: 'Anos',
        value: '10+',
        icon: () => <div>Icon</div>,
        gradient: 'from-blue-500 to-blue-600',
        iconColor: 'text-blue-500',
      },
      {
        label: 'Projetos',
        value: '50K+',
        icon: () => <div>Icon</div>,
        gradient: 'from-green-500 to-green-600',
        iconColor: 'text-green-500',
      },
      {
        label: 'Clientes',
        value: '20+',
        icon: () => <div>Icon</div>,
        gradient: 'from-purple-500 to-purple-600',
        iconColor: 'text-purple-500',
      },
      {
        label: 'Satisfação',
        value: '95+',
        icon: () => <div>Icon</div>,
        gradient: 'from-pink-500 to-pink-600',
        iconColor: 'text-pink-500',
      },
    ],
    TECH_BY_LAYER: {
      frontend: ['React', 'Next.js'],
      backend: ['Node.js', 'Express'],
      database: ['PostgreSQL', 'MongoDB'],
      devops: ['Docker', 'AWS'],
    },
    SITE_CONFIG: {
      contact: {
        email: {
          address: 'test@example.com',
        },
        phone: {
          number: '+55 24 99999-9999',
          whatsapp: false,
        },
        location: {
          city: 'Volta Redonda',
          state: 'RJ',
          country: 'Brasil',
        },
      },
    },
  };
});

describe('About Page', () => {
  it('deve renderizar a página sobre', () => {
    render(<AboutPage />);
    // Verifica que a página foi renderizada através do título
    const titleElements = screen.queryAllByText(/Rainer Teixeira/i);
    const pageHeader = screen.queryByTestId('page-header');
    expect(titleElements.length > 0 || pageHeader).toBeTruthy();
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
