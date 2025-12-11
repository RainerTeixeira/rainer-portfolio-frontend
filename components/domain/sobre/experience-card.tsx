/**
 * Experience Card Component
 *
 * Componente de card para exibir experiência profissional na timeline.
 * Usado na página sobre para mostrar jornada técnica.
 *
 * @module components/domain/sobre/experience-card
 * @fileoverview Card de experiência profissional
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { Badge } from '@rainersoft/ui';
import { Card, CardContent } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { Calendar } from 'lucide-react';

interface ExperienceCardProps {
  period: string;
  role: string;
  description: string;
  className?: string;
}

export function ExperienceCard({
  period,
  role,
  description,
  className,
}: ExperienceCardProps) {
  return (
    <Card
      className={cn(
        'group/exp relative overflow-hidden transition-all duration-300',
        'bg-card/80 dark:bg-black/40 backdrop-blur-sm',
        'border-border/50 dark:border-cyan-400/20',
        'hover:border-primary dark:hover:border-cyan-400/50',
        'hover:shadow-2xl hover:shadow-cyan-500/10',
        className
      )}
    >
      {/* Brilho de fundo no hover */}
      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 dark:from-cyan-400/0 dark:via-purple-400/0 dark:to-pink-400/0 group-hover/exp:from-cyan-500/5 group-hover/exp:via-purple-500/5 group-hover/exp:to-pink-500/5 dark:group-hover/exp:from-cyan-400/10 dark:group-hover/exp:via-purple-400/5 dark:group-hover/exp:to-pink-400/5 transition-all duration-500" />

      <CardContent className="p-6 sm:p-8 relative z-10">
        {/* Barra lateral colorida */}
        <div className="absolute -left-8 top-0 bottom-0 w-1 bg-linear-to-b from-cyan-400 via-purple-400 to-pink-400 rounded-full" />

        {/* Badge de período */}
        <Badge
          variant="secondary"
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-linear-to-r from-cyan-500/10 to-purple-500/10 dark:from-cyan-400/20 dark:to-purple-400/20 border border-cyan-400/30"
        >
          <Calendar className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span className="text-sm font-bold text-cyan-700 dark:text-cyan-300">
            {period}
          </span>
        </Badge>

        {/* Título */}
        <h3 className="text-xl sm:text-2xl font-bold text-foreground dark:text-white mb-4 group-hover/exp:text-cyan-600 dark:group-hover/exp:text-cyan-300 transition-colors">
          {role}
        </h3>

        {/* Descrição */}
        <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}


