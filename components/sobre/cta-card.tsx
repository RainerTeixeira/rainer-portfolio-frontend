/**
 * CTA Card Component
 *
 * Componente de card para call-to-action (Download CV, Contato, Redes Sociais).
 * Usado na página sobre para ações principais.
 *
 * @module components/sobre/cta-card
 * @fileoverview Card de CTA
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
import { cn } from '@/lib/portfolio';
import * as React from 'react';

interface CTACardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action: React.ReactNode;
  gradient: string;
  iconGradient: string;
  borderColor: string;
  shadowColor: string;
  titleColor?: string;
  className?: string;
  children?: React.ReactNode;
}

export function CTACard({
  icon: Icon,
  title,
  description,
  action,
  gradient,
  iconGradient,
  borderColor,
  shadowColor,
  titleColor = 'dark:text-cyan-200',
  className,
  children,
}: CTACardProps) {
  return (
    <Card
      className={cn(
        'group/cta relative overflow-hidden transition-all duration-500',
        'bg-card/80 dark:bg-black/40 backdrop-blur-sm',
        'border-border/50',
        borderColor,
        `hover:shadow-2xl ${shadowColor}`,
        className
      )}
    >
      {/* Brilho de fundo no hover */}
      <div
        className={cn(
          'absolute inset-0 transition-all duration-500',
          `bg-linear-to-br ${gradient} group-hover/cta:opacity-10`
        )}
      />

      <CardHeader className="space-y-2 relative z-10">
        <div className="relative mb-4">
          <div
            className={cn(
              'absolute inset-0 rounded-full blur-lg opacity-30 transition-transform duration-300',
              `bg-linear-to-br ${iconGradient}`
            )}
          />
          <div
            className={cn(
              'relative inline-flex p-4 rounded-full shadow-xl transition-transform duration-300 group-hover/cta:scale-110',
              `bg-linear-to-br ${iconGradient}`
            )}
          >
            <Icon className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
        </div>

        <CardTitle
          className={cn(
            'font-black text-xl mb-3 group-hover/cta:text-cyan-600 dark:group-hover/cta:text-cyan-300 transition-colors',
            titleColor
          )}
        >
          {title}
        </CardTitle>

        <CardDescription className="leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      {children && (
        <CardContent className="relative z-10 space-y-4">
          {children}
        </CardContent>
      )}

      <CardContent className="relative z-10">{action}</CardContent>
    </Card>
  );
}


