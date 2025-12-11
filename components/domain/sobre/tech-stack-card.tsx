/**
 * Tech Stack Card Component
 *
 * Componente de card sticky para exibir tecnologias do tech stack.
 * Usado na página sobre para mostrar habilidades técnicas.
 *
 * @module components/domain/sobre/tech-stack-card
 * @fileoverview Card de tech stack sticky
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { Code2 } from 'lucide-react';

interface Skill {
  fullName: string;
  color: string;
  icon: React.ReactNode;
}

interface TechStackCardProps {
  skills: readonly Skill[];
  className?: string;
}

export function TechStackCard({ skills, className }: TechStackCardProps) {
  return (
    <Card
      className={cn(
        'sticky top-24 shadow-lg dark:shadow-cyan-400/10',
        'bg-card/80 dark:bg-black/40 backdrop-blur-sm',
        'border-border/50 dark:border-purple-400/20',
        className
      )}
    >
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary dark:text-purple-400" />
          Tech Stack
        </CardTitle>
        <CardDescription>
          Tecnologias que domino e utilizo diariamente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="group/skill flex items-center gap-3 p-3 rounded-xl bg-linear-to-br from-muted/50 to-transparent dark:from-purple-400/10 dark:to-transparent border border-border/30 dark:border-purple-400/20 hover:border-primary dark:hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 cursor-default"
            >
              {/* Ícone da tecnologia */}
              <div
                className={cn(
                  'w-10 h-10 rounded-lg p-2 shadow-md group-hover/skill:scale-110 transition-transform bg-linear-to-br',
                  skill.color
                )}
              >
                <div className="text-white w-full h-full flex items-center justify-center">
                  {skill.icon}
                </div>
              </div>
              {/* Nome */}
              <span className="text-sm font-bold text-foreground dark:text-gray-200 group-hover/skill:text-purple-600 dark:group-hover/skill:text-purple-300 transition-colors">
                {skill.fullName}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


