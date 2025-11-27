/**
 * Skills Icons Barrel Export
 *
 * Exporta todos os ícones de tecnologias.
 *
 * @module components/icons/skills
 * @author Rainer Teixeira
 * @version 2.0.0
 */

export { AWSIcon } from './AWSIcon';
export { DockerIcon } from './DockerIcon';
export { GitIcon } from './GitIcon';
export { GraphQLIcon } from './GraphQLIcon';
export { MongoDBIcon } from './MongoDBIcon';
export { NextJSIcon } from './NextJSIcon';
export { NodeJSIcon } from './NodeJSIcon';
export { PostgreSQLIcon } from './PostgreSQLIcon';
export { PrismaIcon } from './PrismaIcon';
export { ReactIcon } from './ReactIcon';
export { TailwindIcon } from './TailwindIcon';
export { TypeScriptIcon } from './TypeScriptIcon';

/**
 * Mapeamento de ícones por nome
 */
import React from 'react';
import { AWSIcon } from './AWSIcon';
import { DockerIcon } from './DockerIcon';
import { GitIcon } from './GitIcon';
import { GraphQLIcon } from './GraphQLIcon';
import { MongoDBIcon } from './MongoDBIcon';
import { NextJSIcon } from './NextJSIcon';
import { NodeJSIcon } from './NodeJSIcon';
import { PostgreSQLIcon } from './PostgreSQLIcon';
import { PrismaIcon } from './PrismaIcon';
import { ReactIcon } from './ReactIcon';
import { TailwindIcon } from './TailwindIcon';
import { TypeScriptIcon } from './TypeScriptIcon';

/**
 * Mapeamento de ícones React por nome da tecnologia
 */
export const SKILL_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  React: ReactIcon,
  NextJS: NextJSIcon,
  TypeScript: TypeScriptIcon,
  Tailwind: TailwindIcon,
  NodeJS: NodeJSIcon,
  PostgreSQL: PostgreSQLIcon,
  MongoDB: MongoDBIcon,
  Docker: DockerIcon,
  AWS: AWSIcon,
  Git: GitIcon,
  GraphQL: GraphQLIcon,
  Prisma: PrismaIcon,
} as const;


