/**
 * Contact Info Card Component
 *
 * Componente de card para exibir informações de contato de forma elegante.
 * Usado na página de contato para mostrar horário, localização, telefone e email.
 *
 * @module components/domain/contato/contact-info-card
 * @fileoverview Card de informações de contato
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

export const dynamic = 'force-dynamic';

import { Card, CardContent } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { ComponentType } from 'react';

interface ContactInfoCardProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  primary: string;
  secondary?: string | null;
  href?: string;
  iconColor?: string;
  borderColor?: string;
  hoverBorder?: string;
  textColor?: string;
  hoverText?: string;
  className?: string;
}

export function ContactInfoCard({
  icon: Icon,
  title,
  primary,
  secondary,
  href,
  iconColor = 'text-cyan-400',
  borderColor = 'dark:border-cyan-400/20',
  hoverBorder = 'hover:border-cyan-400/40',
  textColor = 'dark:text-cyan-200',
  hoverText = 'dark:hover:text-cyan-300',
  className,
}: ContactInfoCardProps) {
  const hasLink = Boolean(href);
  const hasSecondary = Boolean(secondary);

  const cardContent = (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300',
        'dark:bg-black/40 dark:border-cyan-400/20',
        'hover:shadow-lg hover:shadow-cyan-400/10',
        borderColor,
        hoverBorder,
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <div
            className={cn(
              'rounded-full p-3 transition-transform duration-300',
              'bg-primary/10 dark:bg-cyan-400/10',
              'group-hover:scale-110 group-hover:bg-primary/20 dark:group-hover:bg-cyan-400/20'
            )}
          >
            <Icon className={cn('h-6 w-6', iconColor)} aria-hidden="true" />
          </div>

          {/* Title */}
          <h3 className={cn('font-semibold text-base', textColor)}>{title}</h3>

          {/* Content */}
          <div className="space-y-1">
            {hasLink ? (
              <a
                href={href}
                className={cn(
                  'block text-sm font-medium transition-colors',
                  'text-muted-foreground hover:text-primary',
                  'underline-offset-2 hover:underline',
                  hoverText
                )}
                aria-label={`${title}: ${primary}`}
              >
                {primary}
              </a>
            ) : (
              <p className="text-sm font-medium text-muted-foreground dark:text-gray-300">
                {primary}
              </p>
            )}

            {/* Secondary Content */}
            {hasSecondary && (
              <p
                className={cn(
                  'text-xs',
                  secondary?.includes('WhatsApp')
                    ? 'text-green-500 dark:text-green-400 font-medium'
                    : 'text-muted-foreground dark:text-gray-400'
                )}
              >
                {secondary}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return cardContent;
}



