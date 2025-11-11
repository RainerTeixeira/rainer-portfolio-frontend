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
    period: '2023 - Presente',
    role: 'Desenvolvedor Full-Stack | Projetos Reais e Comprovados',
    description:
      '**Portfólio Enterprise** (Next.js 15 + React 19 + TypeScript): PWA completo com sistema de ' +
      'blog, editor WYSIWYG Tiptap, dashboard administrativo, autenticação AWS Cognito, animações ' +
      'customizadas, design system com tokens, 100% documentado (JSDoc), Lighthouse 95+, WCAG AA e ' +
      'LGPD compliant. **Dashboard Crypto**: Backend NestJS + PostgreSQL/Prisma, integração com APIs ' +
      'de criptomoedas, gráficos em tempo real (Recharts), autenticação JWT, Docker containerizado. ' +
      '**Planejador Financeiro**: Full-stack com gestão de transações, categorias, relatórios e ' +
      'gráficos. **Sistema de Controle**: Integração Supabase, CRUD completo, autenticação e ' +
      'permissões. Todos os projetos seguem Git flow profissional, deploy automatizado (CI/CD), ' +
      'código limpo (SOLID), testes automatizados e documentação completa.',
  },
  {
    period: '2022 - 2023',
    role: 'Formação Técnica | Stack Moderna e Arquitetura Profissional',
    description:
      '**Frontend**: React 19 (Hooks customizados, Context API, Zustand), TypeScript (types/interfaces ' +
      'complexas), Tailwind CSS + Design System, Framer Motion, shadcn/ui, Radix UI, Next.js 15 (App ' +
      'Router, Server Components, API Routes). **Backend**: Node.js 20+, NestJS (módulos, controllers, ' +
      'services, guards), Express.js, APIs RESTful, autenticação JWT/OAuth2, validação Zod, tratamento ' +
      'de erros. **Banco de Dados**: PostgreSQL, MongoDB, Prisma ORM, queries otimizadas, modelagem ' +
      'relacional, migrations. **DevOps**: Git/GitHub (feature branches, PRs, code review), Docker, ' +
      'CI/CD, Vercel, AWS. **Qualidade**: ESLint, Prettier, TypeScript strict, testes (Jest, Vitest), ' +
      'documentação JSDoc, SonarQube. Arquitetura componentizada, reutilizável e escalável.',
  },
  {
    period: '2021 - 2022',
    role: 'Fundamentos Sólidos | Base Técnica e Aprendizado Contínuo',
    description:
      '**Fundamentos**: Lógica de programação, algoritmos, estruturas de dados, paradigmas (OOP, ' +
      'funcional). **JavaScript ES6+**: async/await, promises, destructuring, spread/rest operators, ' +
      'arrow functions, modules, classes. **Web**: HTML5 semântico, CSS3 (Flexbox, Grid, animations, ' +
      'transitions), responsividade mobile-first, acessibilidade (WCAG). **Aprendizado**: Documentação ' +
      'oficial (React Docs, Next.js Docs, TypeScript Handbook, MDN), cursos estruturados, análise de ' +
      'código open source, prática constante. **Habilidades**: Resolução de problemas, debugging ' +
      'sistemático, leitura de stack traces, Git profissional, capacidade de aprender novas tecnologias ' +
      'rapidamente através de documentação técnica.',
  },
] as const;
