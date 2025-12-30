// Registry of skill icons (isolated to avoid import cycles)
import React from "react";
import { AWSIcon } from "./AWSIcon";
import { DockerIcon } from "./DockerIcon";
import { GitIcon } from "./GitIcon";
import { GraphQLIcon } from "./GraphQLIcon";
import { MongoDBIcon } from "./MongoDBIcon";
import { NextJSIcon } from "./NextJSIcon";
import { NodeJSIcon } from "./NodeJSIcon";
import { PostgreSQLIcon } from "./PostgreSQLIcon";
import { PrismaIcon } from "./PrismaIcon";
import { ReactIcon } from "./ReactIcon";
import { TailwindIcon } from "./TailwindIcon";
import { TypeScriptIcon } from "./TypeScriptIcon";

export const SKILL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
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
