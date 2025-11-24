/**
 * Icons Provider
 *
 * Provider e componente utilitário para exibir qualquer ícone do site
 * a partir de um nome em string (vindo das constantes).
 *
 * @module components/providers/icons-provider
 */

'use client';

import React, { createContext, useContext } from 'react';
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
type IconRegistry = Record<string, IconComponent>;

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
 */
export function IconsProvider({ children, icons }: IconsProviderProps) {
  const value: IconRegistry = icons
    ? ({ ...DEFAULT_ICONS, ...icons } as IconRegistry)
    : DEFAULT_ICONS;
  return <IconsContext.Provider value={value}>{children}</IconsContext.Provider>;
}

/** Hook interno para acessar o registro de ícones */
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

/**
 * Componente simples para exibir um ícone a partir do nome em string
 */
export function SiteIcon({ name, className, fallbackName }: SiteIconProps) {
  const registry = useIcons();

  const DefaultFallback: IconComponent = props => (
    <span className={props.className ?? className}>?</span>
  );

  const fallbackComponent: IconComponent =
    (fallbackName && registry[fallbackName]) || DefaultFallback;
  const IconComponent = registry[name] || fallbackComponent;

  return <IconComponent className={className} />;
}

// Alias mais curto se quiser usar apenas <Icon name="..." />
export { SiteIcon as Icon };

