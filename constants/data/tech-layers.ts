/**
 * Tech Layers Data
 *
 * Tecnologias organizadas por camada (frontend, backend, database, devops).
 *
 * @module constants/data/tech-layers
 * @author Rainer Teixeira
 * @version 2.0.0
 */

/**
 * Tecnologias por camada
 */
export const TECH_BY_LAYER = {
  frontend: [
    'React',
    'Next.js',
    'TypeScript',
    'React Native',
    'Tailwind CSS',
    'Framer Motion',
  ],
  backend: [
    'Node.js',
    'Python',
    'Express',
    'REST APIs',
    'GraphQL',
    'WebSockets',
  ],
  database: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM', 'SQL', 'NoSQL'],
  devops: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions'],
} as const;
