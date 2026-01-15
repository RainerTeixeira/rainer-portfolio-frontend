/**
 * Icons Provider
 *
 * Provider e utilitário para exibir qualquer ícone do site
 * a partir de um nome em string (vindo das constantes).
 *
 * @module components/providers/icons-provider
 */

'use client';

import React, { createContext, useContext, useMemo } from 'react';
import {
  BarChart,
  BookOpen,
  Briefcase,
  Code,
  FileCode,
  Globe,
  Home,
  Mail,
  Package,
  Server,
  Shield,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react';

import { SKILL_ICONS } from '@/components/icons/skills';

/** Tipo genérico de componente de ícone */
export type IconComponent = React.ComponentType<{ className?: string }>;

/** Registro de ícones disponíveis no site */
type IconRegistry = Readonly<Record<string, IconComponent>>;

/**
 * Mapa padrão de ícones do site
 * Combina ícones do Lucide + ícones customizados de skills
 */
const DEFAULT_ICONS: IconRegistry = {
  // Ícones de navegação e UI geral
  Home,
  User,
  Briefcase,
  BookOpen,
  Mail,
  Globe,
  BarChart,
  Zap,
  Server,
  Code,
  Shield,
  TrendingUp,
  FileCode,
  Package,

  // Ícones de skills personalizados (React, NextJS, etc.)
  ...SKILL_ICONS,
};

const IconsContext = createContext<IconRegistry>(DEFAULT_ICONS);

export interface IconsProviderProps {
  /** Componentes filhos que terão acesso ao registro de ícones */
  children: React.ReactNode;
  /** Permite sobrescrever ou adicionar ícones ao registro padrão */
  icons?: Partial<IconRegistry>;
}

/**
 * Provider para o registro de ícones do site
 *
 * @example
 * ```tsx
 * <IconsProvider>
 *   <App />
 * </IconsProvider>
 * ```
 */
export function IconsProvider({ children, icons }: IconsProviderProps) {
  const value = useMemo<IconRegistry>(
    () => {
      if (!icons) return DEFAULT_ICONS;
      // Filter out undefined values
      const filteredIcons = Object.fromEntries(
        Object.entries(icons).filter(([, value]) => value !== undefined)
      );
      return { ...DEFAULT_ICONS, ...filteredIcons } as IconRegistry;
    },
    [icons]
  );

  return <IconsContext.Provider value={value}>{children}</IconsContext.Provider>;
}

/** Hook para acessar o registro de ícones */
export function useIcons(): IconRegistry {
  return useContext(IconsContext);
}

export interface SiteIconProps {
  /** Nome do ícone definido nas constantes (ex: "Globe", "Code", "React") */
  name: string;
  /** Classe CSS opcional para dimensionamento/cores */
  className?: string;
  /** Nome de ícone opcional para fallback caso o principal não exista */
  fallbackName?: string;
}

/** Fallback padrão para ícones não encontrados */
const DefaultFallback: IconComponent = ({ className }) => (
  <span className={className}>?</span>
);

/**
 * Componente simples para exibir um ícone a partir do nome em string
 *
 * @example
 * ```tsx
 * <SiteIcon name="Globe" className="w-6 h-6 text-blue-500" />
 * ```
 */
export function SiteIcon({ name, className, fallbackName }: SiteIconProps) {
  const registry = useIcons();

  const fallbackComponent: IconComponent =
    (fallbackName && registry[fallbackName]) || DefaultFallback;

  const IconComponent = registry[name] || fallbackComponent;

  return <IconComponent className={className} />;
}

// Alias mais curto se quiser usar apenas <Icon name="..." />
export { SiteIcon as Icon };
