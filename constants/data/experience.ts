/**
 * Experience Data
 *
 * Dados de experiência profissional.
 *
 * @module constants/data/experience
 * @author Rainer Teixeira
 * @version 2.0.0
 */

/**
 * Item de experiência profissional
 */
export interface ExperienceItem {
  period: string;
  role: string;
  description: string;
}

/**
 * Histórico de experiência profissional
 */
export const EXPERIENCE: ReadonlyArray<ExperienceItem> = [
  {
    period: 'Projetos Atuais',
    role: 'Desenvolvedor Full-Stack | Portfolio Técnico Comprovado',
    description:
      'Desenvolvi aplicações web completas e profissionais que demonstram domínio técnico avançado: ' +
      '**Portfólio Enterprise** (Next.js 15 + React 19 + TypeScript) com PWA, sistema de blog com ' +
      'editor Tiptap WYSIWYG, dashboard administrativo, autenticação completa preparada para AWS Cognito, ' +
      'animações cyberpunk customizadas, carousel modular com 6 componentes, 100% documentado com JSDoc, ' +
      'Lighthouse 95+, WCAG AA e LGPD compliant. **Dashboard Crypto** com backend Node.js + NestJS, ' +
      'integração com APIs de criptomoedas, gráficos em tempo real com Recharts, autenticação JWT, ' +
      'banco PostgreSQL com Prisma ORM e Docker containerizado. **Planejador Financeiro** full-stack ' +
      'com frontend React e backend robusto. **Sistema de Controle** integrado com Supabase. Todos com ' +
      'Git flow profissional, deploy automatizado e código limpo seguindo princípios SOLID.',
  },
  {
    period: 'Formação Técnica',
    role: 'Stack Moderna & Arquitetura Profissional',
    description:
      'Domínio técnico completo da stack moderna de desenvolvimento web: Frontend avançado ' +
      '(React 19 com Hooks customizados, Context API, state management com Zustand, TypeScript types ' +
      'e interfaces complexas, Tailwind CSS com design system, Framer Motion para animações fluidas, ' +
      'shadcn/ui e Radix UI para componentes acessíveis), Backend profissional (Node.js 20+, NestJS ' +
      'framework enterprise, Express.js, APIs RESTful bem estruturadas, autenticação JWT/OAuth2, ' +
      'validação com Zod), Banco de Dados (PostgreSQL com Prisma ORM, queries otimizadas, modelagem ' +
      'de dados, migrations), DevOps (Git/GitHub com feature branches e pull requests, deploy CI/CD ' +
      'automatizado, Docker containerização, Vercel deployments) e Qualidade (ESLint + Prettier, ' +
      'TypeScript strict mode, documentação JSDoc completa, SonarQube code quality). Arquitetura ' +
      'componentizada, reutilizável e escalável aplicada em todos os projetos.',
  },
  {
    period: 'Base Técnica',
    role: 'Fundamentos Sólidos & Aprendizado Acelerado',
    description:
      'Base técnica sólida conquistada através de aprendizado intensivo e prática constante: Lógica ' +
      'de programação avançada, algoritmos e estruturas de dados, JavaScript ES6+ moderno ' +
      '(async/await, promises, destructuring, spread operators, arrow functions), HTML5 semântico, ' +
      'CSS3 avançado (Flexbox, Grid, animations, transitions), responsividade mobile-first e design ' +
      'acessível. Aprendi através de documentação oficial (React Docs, Next.js Docs, TypeScript ' +
      'Handbook), cursos técnicos estruturados, análise de código open source e muita prática ' +
      'construindo projetos reais. Desenvolvi mentalidade de resolução de problemas, debugging ' +
      'sistemático, leitura de stack traces, Git para versionamento profissional e capacidade de ' +
      'aprender tecnologias novas rapidamente através de documentação técnica.',
  },
] as const;
