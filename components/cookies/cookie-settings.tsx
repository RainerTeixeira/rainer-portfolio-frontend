/**
 * Cookie Settings Component
 *
 * Componente profissional para gerenciar configurações de cookies.
 * Permite ao usuário atualizar preferências de cookies a qualquer momento.
 * Similar ao que sites grandes como Google, Microsoft, etc. utilizam.
 *
 * @module components/cookies/cookie-settings
 * @fileoverview Componente de configurações de cookies profissional
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

'use client';

// ============================================================================
// React Hooks
// ============================================================================

import { useEffect, useState } from 'react';

// ============================================================================
// Next.js Imports
// ============================================================================

import Link from 'next/link';
import { GRADIENT_DIRECTIONS } from '@rainersoft/design-tokens';

// ============================================================================
// Icons
// ============================================================================

import {
  Check,
  Cookie,
  Database,
  Settings,
  Shield,
  TrendingUp,
  XCircle,
} from 'lucide-react';

// ============================================================================
// UI Components
// ============================================================================

import { Button } from '@rainersoft/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rainersoft/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@rainersoft/ui';
import { Label } from '@rainersoft/ui';
import { Separator } from '@rainersoft/ui';
import { Switch } from '@rainersoft/ui';

// ============================================================================
// Cookie Manager
// ============================================================================

import {
  getCookieManager,
  type CookiePreferences,
} from '@/lib/cookies/cookie-manager';

// ============================================================================
// Design Tokens
// ============================================================================

import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

interface CookieCategory {
  id: keyof CookiePreferences;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  required?: boolean;
  cookies?: string[];
}

// ============================================================================
// Constants
// ============================================================================

const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'essential',
    name: 'Cookies Essenciais',
    description:
      'Necessários para o funcionamento básico do site. Não podem ser desativados.',
    icon: Shield,
    required: true,
    cookies: ['session_id', 'csrf_token', 'auth_token'],
  },
  {
    id: 'performance',
    name: 'Cookies de Performance',
    description:
      'Coletam informações sobre como você utiliza o site para melhorar a performance.',
    icon: TrendingUp,
    cookies: ['performance_id', 'load_time', 'error_tracking'],
  },
  {
    id: 'functionality',
    name: 'Cookies de Funcionalidade',
    description:
      'Permitem que o site se lembre de suas preferências e ofereça funcionalidades aprimoradas.',
    icon: Settings,
    cookies: ['preferences', 'language', 'theme', 'user_settings'],
  },
  {
    id: 'analytics',
    name: 'Cookies de Analytics',
    description:
      'Coletam informações sobre como você utiliza o site para análise e melhorias.',
    icon: Database,
    cookies: ['_ga', '_gid', '_gat', 'analytics_id'],
  },
];

// ============================================================================
// Main Component
// ============================================================================

/**
 * CookieSettings Component
 *
 * Componente para gerenciar configurações de cookies.
 * Pode ser usado como dialog/modal ou página completa.
 *
 * @component
 * @param {Object} props - Propriedades do componente
 * @param {boolean} [props.asDialog=false] - Renderizar como dialog
 * @param {boolean} [props.open] - Controla se o dialog está aberto
 * @param {Function} [props.onOpenChange] - Callback quando o estado do dialog muda
 * @returns {JSX.Element} Componente de configurações de cookies
 */
export function CookieSettings({
  asDialog = false,
  open,
  onOpenChange,
}: {
  asDialog?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} = {}) {
  const cookieManager = getCookieManager();
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    performance: true,
    functionality: true,
    analytics: true,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Carrega preferências salvas
  useEffect(() => {
    const savedPreferences = cookieManager.getPreferences();
    if (savedPreferences) {
      setPreferences(savedPreferences);
    }
  }, [cookieManager]);

  // Handler para toggle de preferência
  const handleToggle = (category: keyof CookiePreferences) => {
    if (category === 'essential') return; // Essenciais não podem ser desativados

    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
    setHasChanges(true);
  };

  // Handler para salvar preferências
  const handleSave = () => {
    setIsSaving(true);
    cookieManager.updatePreferences(preferences);
    setHasChanges(false);
    setIsSaving(false);

    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  // Handler para aceitar todos
  const handleAcceptAll = () => {
    const allEnabled: CookiePreferences = {
      essential: true,
      performance: true,
      functionality: true,
      analytics: true,
    };
    setPreferences(allEnabled);
    setHasChanges(true);
    handleSave();
  };

  // Handler para rejeitar opcionais
  const handleRejectOptional = () => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      performance: false,
      functionality: false,
      analytics: false,
    };
    setPreferences(onlyEssential);
    setHasChanges(true);
    handleSave();
  };

  // Conteúdo do componente
  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'p-3 rounded-lg',
              'bg-primary/10 dark:bg-cyan-400/10',
              'border border-primary/20 dark:border-cyan-400/20'
            )}
          >
            <Cookie className="h-6 w-6 text-primary dark:text-cyan-400" />
          </div>
          <div>
            <h2
              className={cn(
                'text-xl',
                'font-bold',
                'dark:text-cyan-200'
              )}
            >
              Configurações de Cookies
            </h2>
            <p className={cn('text-sm', 'text-muted-foreground')}>
              Gerencie suas preferências de cookies e controle como seus dados
              são utilizados.
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Categorias de Cookies */}
      <div className="space-y-4">
        {COOKIE_CATEGORIES.map(category => {
          const Icon = category.icon;
          const isEnabled = preferences[category.id];

          return (
            <Card
              key={category.id}
              className={cn(
                'transition-all',
                isEnabled
                  ? 'border-primary/20 dark:border-cyan-400/20'
                  : 'border-border'
              )}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={cn(
                        'p-2.5 rounded-lg',
                        isEnabled
                          ? 'bg-primary/10 dark:bg-cyan-400/10'
                          : 'bg-muted'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-5 w-5',
                          isEnabled
                            ? 'text-primary dark:text-cyan-400'
                            : 'text-muted-foreground'
                        )}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor={category.id}
                          className={cn(
                            'text-base',
                            'font-semibold',
                            category.required
                              ? 'cursor-not-allowed'
                              : 'cursor-pointer'
                          )}
                        >
                          {category.name}
                        </Label>
                        {category.required && (
                          <span
                            className={cn(
                              'px-2 py-0.5 rounded text-xs',
                              `${GRADIENT_DIRECTIONS.TO_BR} from-primary/10 to-primary/20`,
                              'text-primary',
                              'font-semibold'
                            )}
                          >
                            Obrigatório
                          </span>
                        )}
                      </div>
                      <p className={cn('text-sm', 'text-muted-foreground')}>
                        {category.description}
                      </p>
                      {category.cookies && category.cookies.length > 0 && (
                        <div className="mt-2">
                          <p
                            className={cn(
                              'text-xs',
                              'text-muted-foreground mb-1'
                            )}
                          >
                            Cookies utilizados:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {category.cookies.map(cookie => (
                              <span
                                key={cookie}
                                className={cn(
                                  'px-2 py-0.5 rounded text-xs',
                                  'bg-muted text-muted-foreground',
                                  'font-mono'
                                )}
                              >
                                {cookie}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <Switch
                    id={category.id}
                    checked={isEnabled}
                    onCheckedChange={() => handleToggle(category.id)}
                    disabled={category.required}
                    aria-label={`${category.name} - ${isEnabled ? 'Ativado' : 'Desativado'}`}
                  />
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Informações Adicionais */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Para mais informações sobre como utilizamos cookies, consulte
              nossa{' '}
              <Link
                href="/cookies"
                className="text-primary hover:underline dark:text-cyan-400 font-semibold"
              >
                Política de Cookies
              </Link>{' '}
              e nossa{' '}
              <Link
                href="/privacidade"
                className="text-primary hover:underline dark:text-cyan-400 font-semibold"
              >
                Política de Privacidade
              </Link>
              .
            </p>
            <p className="text-xs">
              Suas preferências são salvas localmente no seu navegador e podem
              ser alteradas a qualquer momento.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          variant="outline"
          onClick={handleRejectOptional}
          className="w-full sm:w-auto"
        >
          <XCircle className="h-4 w-4 mr-2" />
          Rejeitar Opcionais
        </Button>
        <div className="flex-1" />
        {hasChanges && (
          <Button
            variant="outline"
            onClick={() => {
              const saved = cookieManager.getPreferences();
              if (saved) {
                setPreferences(saved);
                setHasChanges(false);
              }
            }}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
        )}
        <Button
          onClick={handleAcceptAll}
          variant="outline"
          className="w-full sm:w-auto"
        >
          <Check className="h-4 w-4 mr-2" />
          Aceitar Todos
        </Button>
        <Button
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className={cn(
            'w-full sm:w-auto',
            'bg-primary hover:bg-primary/90',
            'dark:bg-cyan-500 dark:hover:bg-cyan-600'
          )}
        >
          {isSaving ? 'Salvando...' : 'Salvar Preferências'}
        </Button>
      </div>
    </div>
  );

  // Renderizar como dialog ou conteúdo direto
  if (asDialog) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configurações de Cookies</DialogTitle>
            <DialogDescription>
              Gerencie suas preferências de cookies e controle como seus dados
              são utilizados.
            </DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
      <CardHeader>
        <CardTitle>Configurações de Cookies</CardTitle>
        <CardDescription>
          Gerencie suas preferências de cookies e controle como seus dados são
          utilizados.
        </CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}

/**
 * CookieSettingsButton Component
 *
 * Botão que abre o dialog de configurações de cookies.
 * Pode ser usado no footer ou em qualquer lugar do site.
 */
export function CookieSettingsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="text-muted-foreground hover:text-foreground"
      >
        <Settings className="h-4 w-4 mr-2" />
        Gerenciar Cookies
      </Button>
      <CookieSettings asDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
