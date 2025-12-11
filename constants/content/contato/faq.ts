/**
 * @fileoverview Perguntas frequentes
 * @module constants/content/contato/faq
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Lista de perguntas e respostas mais
 * comuns sobre os serviços.
 */

/**
 * Interface para item de FAQ
 * @interface
 */
export interface FAQItem {
  readonly value: string;
  readonly question: string;
  readonly answer: string;
}

/**
 * Perguntas técnicas frequentes
 * @constant
 * @description FAQ focado em questões técnicas e de desenvolvimento
 */
export const FAQ: ReadonlyArray<FAQItem> = [
  {
    value: 'item-1',
    question: 'Qual sua experiência comprovada com React e Next.js?',
    answer: 'Desenvolvo com React há 3+ anos, atualmente na versão 19. Tenho projetos em produção com Next.js 15, ' +
            'incluindo este portfolio com Lighthouse Score 98+. Crioção de bibliotecas NPM publicadas: ' +
            '@rainersoft/ui (componentes React) e sistema completo com SSR, ISR e App Router.',
  },
  {
    value: 'item-2',
    question: 'Como você garante a qualidade do código?',
    answer: 'Aplico TDD com 100% de cobertura em projetos críticos. Uso TypeScript strict mode, ESLint e Prettier. ' +
            'Todos os meus projetos open source têm CI/CD com GitHub Actions. Documentação clara com JSDoc ' +
            'e README detalhado. Code review e testes automatizados são padrão.',
  },
  {
    value: 'item-3',
    question: 'Você tem experiência com backend e bancos de dados?',
    answer: 'Sim, desenvolvo APIs REST com Node.js e NestJS. Trabalho com PostgreSQL e MongoDB, ' +
            'incluindo Prisma ORM e queries otimizadas. Implemento autenticação JWT, OAuth2 e ' +
            'documentação com Swagger. Este portfolio tem backend completo com 20+ endpoints.',
  },
  {
    value: 'item-4',
    question: 'Como você lida com performance e otimização?',
    answer: 'Foco em Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1. ' +
            'Implemento code splitting, lazy loading e otimização de bundle. ' +
            'Uso cache strategies, CDN e compressão. Todos os meus projetos têm ' +
            'Lighthouse Score 95+ comprovado.',
  },
  {
    value: 'item-5',
    question: 'Qual sua stack técnica principal?',
    answer: 'Frontend: React 19, Next.js 15, TypeScript 5, TailwindCSS. ' +
            'Backend: Node.js, NestJS, Express, PostgreSQL, MongoDB. ' +
            'Ferramentas: Git, Jest, Docker, GitHub Actions, Vercel. ' +
            'Padrões: Clean Code, SOLID, TDD, CI/CD. Sempre nas versões mais recentes e estáveis.',
  },
  {
    value: 'item-6',
    question: 'Você trabalha com metodologias ágeis?',
    answer: 'Sim, uso Scrum adaptado com sprints curtas (1-2 semanas) e entregas incrementais. ' +
            'Commits semânticos, versionamento organizado e documentação contínua. ' +
            'Feedback constante e adaptação rápida. Transparência total no processo de desenvolvimento.',
  },
  {
    value: 'item-7',
    question: 'Quais projetos você já desenvolveu?',
    answer: '3 bibliotecas NPM publicadas (@rainersoft/design-tokens, ui, utils), ' +
            'todas com 100% de cobertura de testes. Portfolio full-stack com Next.js 15 + NestJS. ' +
            'Token Editor web (ferramenta visual). Todos com código aberto no GitHub ' +
            'para análise técnica.',
  },
  {
    value: 'item-8',
    question: 'Como posso validar sua expertise técnica?',
    answer: 'Todo meu código está disponível no GitHub. Bibliotecas publicadas no NPM para instalação e teste. ' +
            'Este portfolio é uma demonstração ao vivo das minhas capacidades. ' +
            'Posso fazer live coding ou discussão técnica detalhada sobre qualquer projeto.',
  },
] as const;

