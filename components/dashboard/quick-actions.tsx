/**
 * Quick Actions Component
 *
 * Componente de ações rápidas para o dashboard. Exibe botões de acesso rápido
 * para ações principais (novo post, ver posts, estatísticas, configurações)
 * com animações suaves e hover effects.
 *
 * @module components/dashboard/quick-actions
 * @fileoverview Botões de ações rápidas do dashboard
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <QuickActions
 *   onNewPost={() => router.push('/dashboard?mode=new')}
 *   onViewPosts={() => router.push('/dashboard?view=all')}
 *   onViewStats={() => router.push('/dashboard?view=stats')}
 *   onSettings={() => router.push('/dashboard/settings')}
 * />
 * ```
 *
 * Características:
 * - Grid de 2 colunas com botões de ação
 * - Ícones com gradientes coloridos
 * - Animações staggered suaves
 * - Hover effects premium
 * - Callbacks opcionais para cada ação
 * - Layout responsivo
 */

'use client';

// ============================================================================
// IMPORTS
// ============================================================================

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { BarChart, FileText, Plus, Settings } from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

/**
 * Configuração de uma ação rápida
 *
 * @interface Action
 * @property {React.ReactNode} icon - Ícone da ação
 * @property {string} label - Label descritivo da ação
 * @property {string} description - Descrição curta da ação
 * @property {string} color - Classes CSS de gradiente de cor
 * @property {() => void} [onClick] - Callback executado ao clicar
 */
interface Action {
  icon: React.ReactNode;
  label: string;
  description: string;
  color: string;
  onClick?: () => void;
}

/**
 * Props do componente QuickActions
 *
 * @interface QuickActionsProps
 * @property {() => void} [onNewPost] - Callback para criar novo post
 * @property {() => void} [onViewPosts] - Callback para ver todos os posts
 * @property {() => void} [onViewStats] - Callback para ver estatísticas
 * @property {() => void} [onSettings] - Callback para abrir configurações
 */
interface QuickActionsProps {
  onNewPost?: () => void;
  onViewPosts?: () => void;
  onViewStats?: () => void;
  onSettings?: () => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Delay entre animações de entrada de botões (em segundos)
 * @type {number}
 * @constant
 */
const STAGGER_DELAY_SECONDS = 0.1;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * QuickActions Component
 *
 * Renderiza card com grid de botões de ações rápidas.
 * Cada botão possui ícone, label, descrição e callback opcional com
 * animações suaves e hover effects premium.
 *
 * @component
 * @param {QuickActionsProps} props - Propriedades do componente
 * @returns {JSX.Element} Card com ações rápidas
 *
 * @remarks
 * Este componente utiliza:
 * - Framer Motion para animações staggered
 * - Botões com gradientes coloridos
 * - Design system com Tailwind CSS
 * - Layout responsivo em grid 2 colunas
 */
export function QuickActions({
  onNewPost,
  onViewPosts,
  onViewStats,
  onSettings,
}: QuickActionsProps) {
  // ========================================================================
  // COMPUTED VALUES
  // ========================================================================

  /**
   * Array de ações configuradas
   * @type {Action[]}
   */
  const actions: Action[] = [
    {
      icon: <Plus className="w-5 h-5" />,
      label: 'Novo Post',
      description: 'Criar novo artigo',
      color: 'from-cyan-500 to-blue-500',
      onClick: onNewPost,
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: 'Meus Posts',
      description: 'Ver todos os posts',
      color: 'from-purple-500 to-pink-500',
      onClick: onViewPosts,
    },
    {
      icon: <BarChart className="w-5 h-5" />,
      label: 'Estatísticas',
      description: 'Análise e métricas',
      color: 'from-orange-500 to-red-500',
      onClick: onViewStats,
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: 'Configurações',
      description: 'Ajustes do blog',
      color: 'from-green-500 to-emerald-500',
      onClick: onSettings,
    },
  ];

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  return (
    <Card role="region" aria-labelledby="quick-actions-heading">
      <CardHeader>
        <CardTitle id="quick-actions-heading">Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * STAGGER_DELAY_SECONDS }}
            >
              <Button
                onClick={action.onClick}
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-start gap-2 hover:border-cyan-400/50 dark:hover:bg-cyan-400/5"
                aria-label={`${action.label}: ${action.description}`}
              >
                <div
                  className={`p-2 rounded-lg bg-linear-to-br ${action.color} text-white`}
                  aria-hidden="true"
                >
                  {action.icon}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">{action.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
