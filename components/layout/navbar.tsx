/**
 * Navigation Bar Component
 *
 * Barra de navegação principal responsiva. Suporta autenticação, tema claro/escuro,
 * menu mobile responsivo, avatar dinâmico de perfil e efeito glassmorphism ao
 * fazer scroll.
 *
 * @module components/layout/navbar
 * @fileoverview Componente de navegação global da aplicação
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Usado automaticamente no layout.tsx
 * <Navbar />
 * ```
 *
 * Características:
 * - Menu desktop com dropdown de usuário autenticado
 * - Menu mobile responsivo usando Sheet component
 * - Avatar dinâmico de perfil quando autenticado
 * - Efeito glassmorphism ao fazer scroll
 * - Acessibilidade completa (ARIA, keyboard navigation)
 * - Animações suaves com Framer Motion
 * - Integração com sistema de autenticação
 * - Toggle de tema claro/escuro
 */

'use client';

// ============================================================================
// React & Next.js Imports
// ============================================================================

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// ============================================================================
// Third-party Libraries
// ============================================================================

import { motion } from 'framer-motion';
import { LayoutDashboard, LogIn, LogOut, Menu, Settings } from 'lucide-react';

// ============================================================================
// Internal Components
// ============================================================================

import { ThemeToggle } from '@rainersoft/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@rainersoft/ui';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@rainersoft/ui';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@rainersoft/ui';

// ============================================================================
// Providers & Utils
// ============================================================================

import { useAuthContext } from '@/components/providers/auth-context-provider';
import { NAVIGATION, SITE_CONFIG } from '@/constants';
import { cn } from '@/lib/portfolio';

// ============================================================================
// Constants
// ============================================================================

/**
 * Limite de scroll para ativar efeito glassmorphism
 */
const SCROLL_THRESHOLD_PX = 10;

/**
 * Configuração de animação de entrada da navbar
 */
const NAVBAR_ANIMATION_CONFIG = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
  delay: 0.1,
} as const;

/**
 * Máximo de caracteres para iniciais do avatar
 */
const MAX_AVATAR_INITIALS = 2;

// ============================================================================
// Types
// ============================================================================

interface UserData {
  readonly nickname: string;
  readonly role: string;
  readonly avatarUrl?: string;
}

interface UserMenuProps {
  readonly user: UserData | null;
  readonly logout: () => void;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Extrai iniciais do nome de usuário para avatar
 *
 * Pega as primeiras letras de cada palavra do nome, converte para
 * maiúsculas e limita a MAX_AVATAR_INITIALS caracteres.
 *
 * @param {string} name - Nome completo do usuário
 * @returns {string} Iniciais em uppercase (máximo 2 caracteres)
 *
 * @example
 * ```ts
 * getUserInitials("Rainer Teixeira") // returns "RT"
 * getUserInitials("John Doe Smith") // returns "JD"
 * ```
 */
function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, MAX_AVATAR_INITIALS);
}

/**
 * Retorna label de role traduzido para português
 *
 * Converte role do sistema (manager/user) para labels
 * amigáveis em português para exibição na UI.
 *
 * @param {string} role - Role do usuário (manager | user)
 * @returns {string} Label em português
 *
 * @example
 * ```ts
 * getUserRoleLabel("manager") // returns "Administrador"
 * getUserRoleLabel("user") // returns "Usuário"
 * ```
 */
function getUserRoleLabel(role: string): string {
  switch (role) {
    case 'ADMIN':
      return 'Administrador';
    case 'EDITOR':
      return 'Editor';
    case 'AUTHOR':
      return 'Autor';
    case 'SUBSCRIBER':
      return 'Assinante';
    case 'manager':
      return 'Administrador';
    case 'user':
      return 'Usuário';
    default:
      return 'Usuário';
  }
}

// ============================================================================
// Sub-components
// ============================================================================

/**
 * UserMenu Component
 *
 * Menu de usuário para desktop que exibe botão de login ou dropdown
 * com avatar e opções do usuário autenticado. Inclui navegação para
 * dashboard, configurações e logout.
 *
 * @component
 * @param {UserMenuProps} props - Propriedades do menu de usuário
 * @returns {JSX.Element} Menu de usuário renderizado
 *
 * @remarks
 * Este componente renderiza:
 * - Botão de login se usuário não autenticado
 * - Dropdown com avatar e opções se usuário autenticado
 * - Links para dashboard e configurações
 * - Botão de logout com estilo de destaque
 */
function UserMenu({ user, logout }: UserMenuProps) {
  // Exibir botão de login se usuário não autenticado
  if (!user) {
    return (
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="gap-2 dark:text-cyan-400 dark:hover:bg-cyan-400/10"
        aria-label="Fazer login"
      >
        <Link href="/dashboard/login">
          <LogIn className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">Login</span>
        </Link>
      </Button>
    );
  }

  const userInitials = getUserInitials(user.nickname);
  const userRoleLabel = getUserRoleLabel(user.role);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'relative h-10 w-10 rounded-full p-0',
            'ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'dark:ring-offset-black dark:focus-visible:ring-cyan-400',
            'transition-all duration-200 hover:scale-105 active:scale-95'
          )}
          aria-label={`Menu do usuário ${user.nickname}`}
        >
          <Avatar
            className={cn(
              'h-9 w-9 border-2 transition-colors',
              'border-border/60 dark:border-cyan-400/50',
              'hover:border-primary dark:hover:border-cyan-400'
            )}
          >
            <AvatarImage
              src={
                user.avatarUrl ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${user.nickname}`
              }
              alt={`Avatar de ${user.nickname}`}
              className="object-cover"
            />
            <AvatarFallback
              className={cn(
                'bg-linear-to-br from-primary/10 to-primary/5',
                'dark:from-cyan-400/10 dark:to-cyan-400/5',
                'text-primary dark:text-cyan-400',
                'font-semibold text-sm'
              )}
            >
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className={cn(
          'w-56 p-2',
          'bg-popover/98 backdrop-blur-xl border-border/60 shadow-lg',
          'dark:bg-black/95 dark:border-cyan-400/30 dark:shadow-cyan-500/5',
          'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2'
        )}
      >
        {/* Informações do usuário */}
        <DropdownMenuLabel
          className={cn(
            'font-normal px-2 py-1.5',
            'text-foreground dark:text-cyan-200'
          )}
        >
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-semibold leading-none tracking-tight">
              {user.nickname}
            </p>
            <p
              className={cn(
                'text-xs leading-none font-medium',
                'text-muted-foreground/80 dark:text-cyan-400/70'
              )}
            >
              {userRoleLabel}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1 dark:bg-cyan-400/20" />

        {/* Link para Dashboard */}
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className={cn(
              'cursor-pointer flex items-center gap-2 px-2 py-2 rounded-md',
              'text-foreground dark:text-gray-300',
              'hover:bg-accent hover:text-accent-foreground',
              'dark:hover:bg-cyan-400/10 dark:hover:text-cyan-300',
              'focus:bg-accent dark:focus:bg-cyan-400/10',
              'transition-colors duration-150'
            )}
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="font-medium">Dashboard</span>
          </Link>
        </DropdownMenuItem>

        {/* Configurações (desabilitado) */}
        <DropdownMenuItem
          disabled
          className={cn(
            'flex items-center gap-2 px-2 py-2 opacity-50 cursor-not-allowed',
            'dark:text-gray-500'
          )}
        >
          <Settings className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="font-medium">Configurações</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 dark:bg-cyan-400/20" />

        {/* Botão de Logout */}
        <DropdownMenuItem
          onClick={logout}
          className={cn(
            'cursor-pointer flex items-center gap-2 px-2 py-2 rounded-md',
            'text-red-600 dark:text-red-400',
            'hover:bg-red-50 hover:text-red-700',
            'dark:hover:bg-red-400/10 dark:hover:text-red-300',
            'focus:bg-red-50 dark:focus:bg-red-400/10',
            'transition-colors duration-150'
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="font-medium">Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * Navbar Component
 *
 * Componente principal da barra de navegação que renderiza
 * header fixo responsivo com múltiplas funcionalidades avançadas.
 *
 * @component
 * @returns {JSX.Element} Barra de navegação global da aplicação
 *
 * @remarks
 * Este componente renderiza:
 * - Animação de entrada suave com Framer Motion
 * - Glassmorphism effect ao fazer scroll
 * - Menu desktop com links e dropdown de usuário
 * - Menu mobile responsivo usando Sheet component
 * - Suporte a autenticação e tema
 * - Acessibilidade completa (ARIA, keyboard navigation)
 * - Integração com sistema de autenticação
 * - Toggle de tema claro/escuro
 *
 * @see {@link useAuth} Hook de autenticação
 * @see {@link ThemeToggle} Componente de toggle de tema
 * @see {@link UserMenu} Componente de menu de usuário
 */
export function Navbar() {
  // ============================================================================
  // State & Hooks
  // ============================================================================

  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { user, isAuthenticated, logout } = useAuthContext();

  const navbarUser: UserData | null =
    isAuthenticated && user
      ? {
          nickname:
            user.nickname ||
            user.fullName ||
            user.email ||
            'Usuário',
          role: user.role,
          avatarUrl: user.avatar,
        }
      : null;

  const handleLogoutClick = () => {
    void logout();
  };

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Detecta quando componente está montado no cliente
   * Previne erros de hidratação com Radix UI gerando IDs diferentes
   */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /**
   * Detecta scroll para ativar efeito glassmorphism
   */
  useEffect(() => {
    const handleScrollEvent = () => {
      setHasScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };

    window.addEventListener('scroll', handleScrollEvent, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={NAVBAR_ANIMATION_CONFIG}
      className={cn(
        // Posicionamento e layout
        'sticky top-0 inset-x-0 z-50 w-full',
        // Backdrop blur premium
        'backdrop-blur-2xl backdrop-saturate-150',
        'bg-background/95 dark:bg-black/80',
        // Suporte condicional para backdrop-filter
        'supports-backdrop-filter:bg-background/90',
        'dark:supports-backdrop-filter:bg-black/60',
        // Sombras sutis (sem borda inferior visível)
        hasScrolled
          ? 'shadow-lg dark:shadow-cyan-500/10'
          : '',
        // Transições suaves
        'transition-all duration-300 ease-in-out',
        // Estados scrolled
        hasScrolled &&
          cn(
            'shadow-xl shadow-black/5 dark:shadow-cyan-500/10',
            'bg-background/98 dark:bg-black/85',
            ''
          ),
        // Performance hints
        'will-change-transform'
      )}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo e nome do site */}
          <Link
            href="/"
            className={cn(
              'group flex items-center gap-2 rounded-md px-1 -ml-1',
              'ring-offset-background focus-visible:outline-none',
              'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'dark:ring-offset-black dark:focus-visible:ring-cyan-400',
              'transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
            )}
            aria-label="Ir para página inicial"
          >
            <Image
              src="/logo.png"
              alt={`${SITE_CONFIG.fullName} - Logo`}
              width={32}
              height={32}
              className={cn(
                'w-8 h-8 object-contain',
                'transition-all duration-300 ease-in-out',
                'group-hover:scale-110 group-active:scale-95',
                'dark:brightness-0 dark:invert dark:contrast-200 dark:hue-rotate-180'
              )}
              priority
            />
            <span
              className={cn(
                'text-lg font-bold hidden sm:block',
                'bg-linear-to-r from-foreground to-foreground/80 bg-clip-text',
                'dark:from-cyan-200 dark:to-cyan-400 dark:bg-clip-text',
                'dark:font-mono dark:tracking-wider',
                'transition-all duration-200'
              )}
            >
              {SITE_CONFIG.fullName}
            </span>
          </Link>

          {/* Desktop Navigation - Usando Navigation Menu (shadcn/ui) */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Menu principal"
          >
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {NAVIGATION.map(item => (
                  <NavigationMenuItem key={item.fullName}>
                    <NavigationMenuLink
                      href={item.href}
                      className={cn(
                        // Layout e tipografia
                        'relative px-3 py-2 text-sm font-medium',
                        // Cores base
                        'text-muted-foreground hover:text-foreground',
                        'dark:text-gray-300 dark:hover:text-cyan-300 dark:font-mono',
                        // Estados de foco e hover
                        'rounded-md transition-all duration-200 ease-in-out',
                        'hover:bg-accent/50 dark:hover:bg-cyan-400/10',
                        // Focus styles
                        'ring-offset-background focus-visible:outline-none',
                        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        'dark:ring-offset-black dark:focus-visible:ring-cyan-400',
                        // Animações
                        'active:scale-95',
                        // Underline effect
                        'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2',
                        'after:h-0.5 after:w-0 after:bg-primary dark:after:bg-cyan-400',
                        'after:transition-all after:duration-300 after:ease-in-out',
                        'hover:after:w-3/4'
                      )}
                    >
                      {item.fullName}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border/40 dark:border-cyan-400/20">
              <ThemeToggle />
              <UserMenu user={navbarUser} logout={handleLogoutClick} />
            </div>
          </nav>

          {/* Menu mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            {isMounted && (
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'md:hidden h-10 w-10',
                      'text-foreground dark:text-cyan-300',
                      'hover:bg-accent/50 dark:hover:bg-cyan-400/10',
                      'hover:text-accent-foreground dark:hover:text-cyan-200',
                      'ring-offset-background focus-visible:outline-none',
                      'focus-visible:ring-2 focus-visible:ring-ring',
                      'dark:ring-offset-black dark:focus-visible:ring-cyan-400',
                      'transition-all duration-200 active:scale-95'
                    )}
                    aria-label="Abrir menu"
                  >
                    <Menu className="h-5 w-5 transition-transform duration-200" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className={cn(
                    'w-80 max-w-[85vw] p-0',
                    'bg-background/98 backdrop-blur-2xl backdrop-saturate-150',
                    'border-l border-border/60',
                    'dark:bg-black/95 dark:border-cyan-400/20',
                    'shadow-2xl dark:shadow-cyan-500/5'
                  )}
                >
                  <SheetHeader
                    className={cn(
                      'px-6 py-4 border-b border-border/60 dark:border-cyan-400/20',
                      'text-left space-y-0'
                    )}
                  >
                    <SheetTitle
                      className={cn(
                        'text-lg font-semibold',
                        'text-foreground dark:text-cyan-200 dark:font-mono'
                      )}
                    >
                      Menu
                    </SheetTitle>
                  </SheetHeader>

                  {/* Informações do usuário mobile */}
                  {isAuthenticated && navbarUser && (
                    <div
                      className={cn(
                        'mx-4 mt-4 mb-2 p-4 rounded-xl',
                        'flex items-center gap-3',
                        'bg-linear-to-br from-accent/90 to-accent/70',
                        'dark:from-cyan-400/5 dark:to-cyan-400/10',
                        'border border-border/60 dark:border-cyan-400/20',
                        'shadow-sm dark:shadow-cyan-500/5',
                        'transition-all duration-200 hover:shadow-md'
                      )}
                    >
                      <Avatar
                        className={cn(
                          'h-12 w-12 shrink-0',
                          'border-2 transition-colors',
                          'border-border/60 dark:border-cyan-400/50'
                        )}
                      >
                        <AvatarImage
                          src={
                            navbarUser.avatarUrl ||
                            `https://api.dicebear.com/7.x/initials/svg?seed=${navbarUser.nickname}`
                          }
                          alt={`Avatar de ${navbarUser.nickname}`}
                          className="object-cover"
                        />
                        <AvatarFallback
                          className={cn(
                            'bg-linear-to-br from-primary/10 to-primary/5',
                            'dark:from-cyan-400/10 dark:to-cyan-400/5',
                            'text-primary dark:text-cyan-400',
                            'font-semibold text-sm'
                          )}
                        >
                          {getUserInitials(navbarUser.nickname)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            'text-sm font-semibold truncate',
                            'text-foreground dark:text-cyan-200'
                          )}
                        >
                          {navbarUser.nickname}
                        </p>
                        <p
                          className={cn(
                            'text-xs font-medium',
                            'text-muted-foreground/80 dark:text-cyan-400/70'
                          )}
                        >
                          {getUserRoleLabel(navbarUser.role)}
                        </p>
                      </div>
                    </div>
                  )}

                  <nav
                    className="flex flex-col gap-1 px-4 py-2"
                    aria-label="Menu principal mobile"
                  >
                    {NAVIGATION.map(item => (
                      <Link
                        key={item.fullName}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          // Layout
                          'group flex items-center gap-3 px-4 py-3 rounded-lg',
                          // Tipografia
                          'text-sm font-medium',
                          'text-foreground dark:text-gray-300 dark:font-mono',
                          // Estados hover e focus
                          'hover:bg-accent hover:text-accent-foreground',
                          'dark:hover:bg-cyan-400/10 dark:hover:text-cyan-300',
                          'ring-offset-background focus-visible:outline-none',
                          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
                          'dark:focus-visible:ring-cyan-400',
                          // Transições
                          'transition-all duration-200 ease-in-out',
                          'active:scale-[0.98]',
                          // Indicador visual
                          'relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2',
                          'before:h-0 before:w-1 before:bg-primary dark:before:bg-cyan-400',
                          'before:rounded-r-full before:transition-all before:duration-300',
                          'hover:before:h-8 hover:pl-5'
                        )}
                      >
                        {item.fullName}
                      </Link>
                    ))}
                  </nav>

                  {/* Ações do usuário mobile */}
                  <div
                    className={cn(
                      'mt-auto px-4 py-4 space-y-2',
                      'border-t border-border/60 dark:border-cyan-400/20'
                    )}
                  >
                    {isAuthenticated ? (
                      <>
                        {/* Botão Dashboard */}
                        <Button
                          asChild
                          variant="outline"
                          className={cn(
                            'w-full gap-2 justify-start font-medium',
                            'border-border/60 hover:bg-accent hover:text-accent-foreground',
                            'dark:border-cyan-400/30 dark:hover:bg-cyan-400/10 dark:text-cyan-400 dark:hover:text-cyan-300',
                            'transition-all duration-200 active:scale-[0.98]'
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-2"
                          >
                            <LayoutDashboard
                              className="w-4 h-4 shrink-0"
                              aria-hidden="true"
                            />
                            <span>Dashboard</span>
                          </Link>
                        </Button>

                        {/* Botão Sair */}
                        <Button
                          onClick={() => {
                            logout();
                            setIsMobileMenuOpen(false);
                          }}
                          variant="outline"
                          className={cn(
                            'w-full gap-2 justify-start font-medium',
                            'border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300',
                            'dark:border-red-400/30 dark:text-red-400 dark:hover:bg-red-400/10 dark:hover:text-red-300 dark:hover:border-red-400/50',
                            'transition-all duration-200 active:scale-[0.98]'
                          )}
                        >
                          <LogOut
                            className="w-4 h-4 shrink-0"
                            aria-hidden="true"
                          />
                          <span>Sair</span>
                        </Button>
                      </>
                    ) : (
                      /* Botão Login */
                      <Button
                        asChild
                        variant="outline"
                        className={cn(
                          'w-full gap-2 justify-start font-medium',
                          'border-border/60 hover:bg-accent hover:text-accent-foreground',
                          'dark:border-cyan-400/30 dark:hover:bg-cyan-400/10 dark:text-cyan-400 dark:hover:text-cyan-300',
                          'transition-all duration-200 active:scale-[0.98]'
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link
                          href="/dashboard/login"
                          className="flex items-center gap-2"
                        >
                          <LogIn
                            className="w-4 h-4 shrink-0"
                            aria-hidden="true"
                          />
                          <span>Fazer Login</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}


