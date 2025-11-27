/**
 * Metric Card Component
 *
 * Componente de card para exibir métricas profissionais de forma elegante.
 * Usado na página sobre para mostrar estatísticas impressionantes.
 *
 * @module components/sobre/metric-card
 * @fileoverview Card de métrica profissional
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { Card, CardContent } from '@rainersoft/ui';
import { cn } from '@/lib/portfolio';
import { ComponentType } from 'react';

interface MetricCardProps {
  icon: ComponentType<{ className?: string }>;
  value: string;
  label: string;
  gradient: string;
  iconColor: string;
  className?: string;
}

export function MetricCard({
  icon: Icon,
  value,
  label,
  gradient,
  iconColor,
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        'group/metric relative overflow-hidden transition-all duration-300',
        'bg-card/80 dark:bg-black/60 backdrop-blur-sm',
        'border-border/50 dark:border-cyan-400/30',
        'hover:shadow-lg hover:shadow-cyan-500/10',
        'hover:scale-105',
        className
      )}
    >
      <CardContent className="p-6 text-center">
        <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4">
          <div
            className={cn(
              'absolute inset-0 rounded-2xl rotate-6 transition-transform duration-300 opacity-20',
              `bg-linear-to-br ${iconColor}`
            )}
            style={{
              transform: 'rotate(6deg)',
            }}
          />
          <div
            className={cn(
              'relative rounded-2xl p-4 shadow-xl transition-transform duration-300',
              'bg-linear-to-br',
              iconColor,
              'group-hover/metric:scale-110'
            )}
          >
            <Icon className="w-8 h-8 text-white" aria-hidden="true" />
          </div>
        </div>
        <div
          className={cn(
            'text-3xl sm:text-4xl font-black mb-2 bg-clip-text text-transparent',
            `bg-linear-to-r ${gradient}`
          )}
        >
          {value}
        </div>
        <div className="text-sm sm:text-base font-semibold text-muted-foreground dark:text-gray-300">
          {label}
        </div>
      </CardContent>
    </Card>
  );
}


