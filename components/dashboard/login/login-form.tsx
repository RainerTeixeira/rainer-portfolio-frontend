/**
 * Login Form Component
 *
 * Formulário de login com email/senha, validação e estados de loading.
 * Design minimalista inspirado no GitHub.
 *
 * @module components/dashboard/login/login-form
 * @fileoverview Formulário de login
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { BORDER_RADIUS, TRANSITIONS } from '@rainer/design-tokens';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface LoginFormProps {
  /** Handler de submit do formulário */
  onSubmit: (username: string, password: string) => Promise<void>;
  /** Se o formulário está carregando */
  isLoading?: boolean;
  /** Mensagem de erro */
  error?: string;
  /** Se o login foi bem-sucedido */
  success?: boolean;
  /** Classes customizadas */
  className?: string;
}

/**
 * LoginForm Component
 *
 * Formulário de login com:
 * - Campos de email/usuário e senha
 * - Toggle de visibilidade de senha
 * - Checkbox "Remember me"
 * - Validação e estados de erro/sucesso
 * - Design responsivo
 *
 * @param {LoginFormProps} props - Propriedades do componente
 * @returns {JSX.Element} Formulário de login
 */
export function LoginForm({
  onSubmit,
  isLoading = false,
  error,
  success,
  className,
}: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(username, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-4 sm:space-y-5', className)}
    >
      {/* Mensagens de Erro/Sucesso */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Alert
            variant="destructive"
            className={cn(
              'py-2.5 border-red-500/50',
              'bg-red-50/80 dark:bg-red-950/20',
              'backdrop-blur-sm',
              'shadow-lg shadow-red-500/10',
              BORDER_RADIUS.MD
            )}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <AlertCircle className="h-4 w-4" />
            </motion.div>
            <AlertDescription className="text-sm whitespace-pre-line wrap-break-word">
              {error}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Alert
            className={cn(
              'border-green-500/50 bg-green-50/80 dark:bg-green-950/20',
              'backdrop-blur-sm py-2.5',
              'shadow-lg shadow-green-500/10',
              BORDER_RADIUS.MD
            )}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
            >
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            </motion.div>
            <AlertDescription className="text-sm text-green-700 dark:text-green-400">
              Login realizado com sucesso! Redirecionando...
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Campo de Usuário/Email */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <Label
          htmlFor="username"
          className="text-sm font-normal text-foreground"
        >
          Email ou usuário
        </Label>
        <div className="relative group">
          <Input
            id="username"
            type="text"
            placeholder="Digite seu email ou usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            disabled={isLoading}
            className={cn(
              'h-9 sm:h-10 text-sm',
              'border-border',
              'focus:border-primary focus:ring-2 focus:ring-primary/30',
              'focus:shadow-lg focus:shadow-primary/10',
              TRANSITIONS.ALL_EASE_IN_OUT,
              'group-hover:border-primary/50',
              'bg-background/50 backdrop-blur-sm'
            )}
            autoComplete="username"
            autoFocus
          />
          {/* Glow effect no focus */}
          <div
            className={cn(
              'absolute inset-0 rounded-md opacity-0',
              'bg-primary/5 blur-xl',
              'transition-opacity duration-300',
              'pointer-events-none',
              'group-focus-within:opacity-100'
            )}
          />
        </div>
      </motion.div>

      {/* Campo de Senha */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-between">
          <Label
            htmlFor="password"
            className="text-sm font-normal text-foreground"
          >
            Senha
          </Label>
          <Link
            href="/dashboard/login/forgot-password"
            className={cn(
              'text-xs text-primary hover:text-primary/80 hover:underline',
              'focus:outline-none focus:ring-2 focus:ring-primary/20',
              'relative group/link',
              TRANSITIONS.COLORS
            )}
          >
            <span className="relative z-10">Esqueceu?</span>
            <span
              className={cn(
                'absolute bottom-0 left-0 w-0 h-0.5 bg-primary',
                'group-hover/link:w-full',
                TRANSITIONS.ALL_EASE_IN_OUT
              )}
            />
          </Link>
        </div>
        <div className="relative group">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Digite sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={isLoading}
            className={cn(
              'h-9 sm:h-10 text-sm pr-10',
              'border-border',
              'focus:border-primary focus:ring-2 focus:ring-primary/30',
              'focus:shadow-lg focus:shadow-primary/10',
              TRANSITIONS.ALL_EASE_IN_OUT,
              'group-hover:border-primary/50',
              'bg-background/50 backdrop-blur-sm'
            )}
            autoComplete="current-password"
          />
          {/* Glow effect no focus */}
          <div
            className={cn(
              'absolute inset-0 rounded-md opacity-0',
              'bg-primary/5 blur-xl',
              'transition-opacity duration-300',
              'pointer-events-none',
              'group-focus-within:opacity-100'
            )}
          />
          <motion.button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2',
              'text-muted-foreground hover:text-foreground',
              'p-1 rounded-sm',
              'hover:bg-accent/50',
              TRANSITIONS.ALL_EASE_IN_OUT,
              'z-10'
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            tabIndex={-1}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Remember Me */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.18 }}
        className="flex items-center pt-1"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
            className={cn(
              'h-4 w-4',
              BORDER_RADIUS.SM,
              'border-border text-primary',
              'focus:ring-2 focus:ring-primary/30',
              'focus:shadow-md focus:shadow-primary/20',
              'cursor-pointer',
              'hover:border-primary/70',
              TRANSITIONS.ALL_EASE_IN_OUT,
              'accent-primary'
            )}
            disabled={isLoading}
          />
        </motion.div>
        <label
          htmlFor="remember"
          className={cn(
            'ml-2 text-sm text-foreground cursor-pointer',
            'hover:text-primary/80',
            TRANSITIONS.COLORS
          )}
        >
          Manter-me conectado
        </label>
      </motion.div>

      {/* Dica de Credenciais (DEV) */}
      {process.env.NODE_ENV === 'development' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            BORDER_RADIUS.MD,
            'bg-cyan-50/80 dark:bg-cyan-950/20',
            'border border-cyan-200/50 dark:border-cyan-800/50',
            'backdrop-blur-sm',
            'p-3',
            'shadow-sm',
            TRANSITIONS.ALL_EASE_IN_OUT,
            'hover:shadow-md hover:border-cyan-300/50 dark:hover:border-cyan-700/50'
          )}
        >
          <p className="text-xs text-cyan-700 dark:text-cyan-300 font-mono">
            💡 <strong>DEV:</strong> Use admin/admin para acesso
          </p>
        </motion.div>
      )}

      {/* Botão de Login */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative"
        >
          <Button
            type="submit"
            disabled={isLoading || !username.trim() || !password.trim()}
            className={cn(
              'w-full h-9 sm:h-10 relative overflow-hidden',
              'text-sm font-medium',
              'bg-primary hover:bg-primary/90',
              'text-primary-foreground',
              'shadow-lg shadow-primary/20',
              'hover:shadow-xl hover:shadow-primary/30',
              TRANSITIONS.ALL_EASE_IN_OUT,
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'group'
            )}
          >
            {/* Efeito de brilho animado */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{
                x: isLoading ? ['100%', '-100%'] : '100%',
              }}
              transition={{
                duration: 2,
                repeat: isLoading ? Infinity : 0,
                ease: 'linear',
              }}
            />
            <span className="relative z-10 flex items-center justify-center">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </form>
  );
}
