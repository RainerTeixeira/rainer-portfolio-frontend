/**
 * Skill Layer Card Component
 *
 * Componente de card para exibir competências por camada (frontend, backend, etc).
 * Usado na página sobre para mostrar expertise full-stack.
 *
 * @module components/sobre/skill-layer-card
 * @fileoverview Card de camada de skills
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { Badge } from '@rainersoft/ui';
import { Card, CardContent } from '@rainersoft/ui';
import { cn } from '@/lib/portfolio';
import { ComponentType } from 'react';

interface SkillLayerCardProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  technologies: readonly string[];
  gradient: string;
  iconGradient: string;
  borderColor: string;
  shadowColor: string;
  badgeColor: string;
  className?: string;
}

export function SkillLayerCard({
  icon: Icon,
  title,
  subtitle,
  description,
  technologies,
  gradient,
  iconGradient,
  borderColor,
  shadowColor,
  badgeColor,
  className,
}: SkillLayerCardProps) {
  return (
    <Card
      className={cn(
        'group/layer relative overflow-hidden transition-all duration-500',
        'bg-card/80 dark:bg-black/40 backdrop-blur-sm',
        'border-border/50',
        borderColor,
        `hover:shadow-2xl ${shadowColor}`,
        className
      )}
    >
      {/* Brilho de fundo */}
      <div
        className={cn(
          'absolute inset-0 transition-all duration-500',
          `bg-linear-to-br ${gradient} group-hover/layer:opacity-10`
        )}
      />

      <CardContent className="p-8 relative z-10">
        {/* Header com ícone grande */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <div
              className={cn(
                'absolute inset-0 rounded-xl blur-md opacity-40 transition-transform duration-300',
                `bg-linear-to-br ${iconGradient}`
              )}
            />
            <div
              className={cn(
                'relative p-4 rounded-xl shadow-xl transition-transform duration-300 group-hover/layer:scale-110',
                `bg-linear-to-br ${iconGradient}`
              )}
            >
              <Icon className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-foreground dark:text-cyan-200 mb-2 group-hover/layer:text-cyan-600 dark:group-hover/layer:text-cyan-300 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground dark:text-gray-400 font-medium">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Descrição */}
        <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-300 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Tecnologias */}
        <div className="flex flex-wrap gap-2">
          {technologies.map(tech => (
            <Badge
              key={tech}
              variant="secondary"
              className={cn(
                'px-3 py-1.5 text-xs font-bold border transition-colors',
                badgeColor
              )}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


