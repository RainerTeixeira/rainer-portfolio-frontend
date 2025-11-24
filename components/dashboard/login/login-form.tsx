/**
 * @fileoverview Componente de Formulário de Login
 * 
 * @description
 * Componente profissional de formulário de login com suporte a autenticação
 * tradicional (email/senha). Inclui validação, estados de carregamento,
 * feedback visual e animações suaves integradas com o design system.
 * 
 * Recursos:
 * - Validação de campos em tempo real
 * - Toggle de visibilidade de senha
 * - Opção "Manter-me conectado"
 * - Feedback de erro e sucesso com animações
 * - Totalmente acessível (WCAG 2.1 AA)
 * - Design responsivo mobile-first
 * - Integração completa com design tokens
 * 
 * @module components/dashboard/login/login-form
 * @version 3.0.0
 * @author Rainer Teixeira
 * @since 1.0.0
 * 
 * @example
 * ```tsx
 * import { LoginForm } from '@/components/dashboard/login/login-form';
 * 
 * function LoginPage() {
 *   const handleLogin = async (email: string, password: string) => {
 *     // Lógica de autenticação
 *   };
 * 
 *   return (
 *     <LoginForm 
 *       onSubmit={handleLogin}
 *       isLoading={false}
 *     />
 *   );
 * }
 * ```
 */

'use client';

import { Alert, AlertDescription } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { Label } from '@rainersoft/ui';
import { cn } from '@/lib/utils';
import { 
  MOTION, 
  SHADOWS, 
  motionTokens,
  spacingTokens,
} from '@rainersoft/design-tokens';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Converte um easing em string `cubic-bezier(...)` para array numérico aceito pelo Motion
 */
function parseCubicBezier(
  easing: string | undefined
): [number, number, number, number] | undefined {
  if (!easing) return undefined;
  const match = easing.match(/cubic-bezier\(([^)]+)\)/);
  if (!match) return undefined;
  const parts = match[1]
    .split(',')
    .map(value => Number.parseFloat(value.trim()));
  if (parts.length !== 4 || parts.some(Number.isNaN)) return undefined;
  return parts as [number, number, number, number];
}

/**
 * Configurações de animação do Framer Motion
 * 
 * @description
 * Configurações reutilizáveis para animações usando tokens do design system.
 * Garante consistência nas durações e easings em todo o componente.
 * 
 * @constant
 * @readonly
 */
const ANIMATION_CONFIG = {
  /** Duração padrão das animações em segundos */
  duration: Number(motionTokens.duration.normal.replace('ms', '')) / 1000,
  /** Duração rápida para micro-interações */
  fastDuration: Number(motionTokens.duration.fast.replace('ms', '')) / 1000,
  /** Easing suave para entrada de elementos */
  easeOut: parseCubicBezier(motionTokens.easing.easeOut) ?? 'easeOut',
  /** Easing suave para saída de elementos */
  easeInOut: parseCubicBezier(motionTokens.easing.easeInOut) ?? 'easeInOut',
} as const;

/**
 * Classes CSS para estilos de input
 * 
 * @description
 * Classes Tailwind CSS organizadas e reutilizáveis para inputs do formulário.
 * Usa tokens do design system para garantir consistência visual.
 * 
 * @constant
 * @readonly
 */
const INPUT_STYLES = {
  /** Classes base para todos os inputs */
  base: 'h-9 sm:h-10 text-sm',
  /** Classes de borda e foco */
  border: 'border-border',
  /** Classes de foco com efeitos visuais */
  focus: 'focus:border-primary focus:ring-2 focus:ring-primary/30 focus:shadow-lg focus:shadow-primary/10',
  /** Classes de hover no grupo */
  hover: 'group-hover:border-primary/50',
  /** Classes de background com blur */
  background: 'bg-background/50 backdrop-blur-sm',
  /** Transição suave usando token */
  transition: MOTION.TRANSITION.DEFAULT,
} as const;

/**
 * Classes CSS para efeitos de glow
 * 
 * @description
 * Classes para efeitos de brilho (glow) que aparecem no foco dos inputs.
 * Cria uma experiência visual premium e moderna.
 * 
 * @constant
 * @readonly
 */
const GLOW_EFFECT_STYLES = {
  /** Container do efeito de glow */
  container: 'absolute inset-0 rounded-md opacity-0',
  /** Background do glow */
  background: 'bg-primary/5 blur-xl',
  /** Transição de opacidade */
  transition: 'transition-opacity duration-300',
  /** Não interativo */
  nonInteractive: 'pointer-events-none',
  /** Opacidade visível no foco do grupo */
  visible: 'group-focus-within:opacity-100',
} as const;

/**
 * Propriedades do componente LoginForm
 * 
 * @interface LoginFormProps
 * 
 * @property {Function} onSubmit - Função callback chamada ao submeter o formulário.
 *   Recebe email e senha como parâmetros e deve retornar uma Promise.
 *   
 * @property {boolean} [isLoading=false] - Indica se a autenticação está em andamento.
 *   Quando true, o formulário fica desabilitado e mostra spinner de carregamento.
 *   
 * @property {string} [error] - Mensagem de erro a ser exibida.
 *   Quando presente, um alert vermelho é renderizado com a mensagem.
 *   
 * @property {boolean} [success] - Indica se o login foi bem-sucedido.
 *   Quando true, um alert verde é renderizado informando sucesso.
 *   
 * @property {string} [className] - Classes CSS adicionais para o formulário.
 *   Útil para customização e ajustes de layout específicos.
 *   
 * @example
 * ```tsx
 * <LoginForm
 *   onSubmit={async (email, password) => {
 *     await authenticate(email, password);
 *   }}
 *   isLoading={isAuthenticating}
 *   error={authError}
 * />
 * ```
 */
interface LoginFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  success?: boolean;
  className?: string;
}

/**
 * Componente LoginForm
 * 
 * @description
 * Renderiza um formulário profissional de login com todos os recursos necessários
 * para uma experiência de autenticação moderna e acessível.
 * 
 * O componente gerencia seu próprio estado interno (campos, visibilidade de senha,
 * remember me) e delega a lógica de autenticação para o componente pai através
 * do callback onSubmit.
 * 
 * Recursos implementados:
 * - Estado gerenciado com React Hooks
 * - Animações suaves com Framer Motion
 * - Feedback visual de erro/sucesso
 * - Toggle de visibilidade de senha
 * - Validação de campos obrigatórios
 * - Efeitos visuais premium (glow, shadows)
 * - Totalmente tipado com TypeScript
 * - Acessibilidade completa (labels, aria-labels, foco)
 * 
 * @component
 * @param {LoginFormProps} props - Propriedades do componente
 * @returns {JSX.Element} Formulário de login renderizado
 * 
 * @example
 * ```tsx
 * <LoginForm
 *   onSubmit={handleLogin}
 *   isLoading={loading}
 *   error={errorMessage}
 *   success={isSuccess}
 * />
 * ```
 */
export function LoginForm({
  onSubmit,
  isLoading = false,
  error,
  success,
  className,
}: LoginFormProps) {
  // ==================== Estado do Componente ====================
  
  /** Valor do campo de email/usuário */
  const [username, setUsername] = useState<string>('');
  
  /** Valor do campo de senha */
  const [password, setPassword] = useState<string>('');
  
  /** Controla a visibilidade da senha (texto ou asteriscos) */
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  /** Estado do checkbox "Manter-me conectado" */
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // ==================== Handlers ====================
  
  /**
   * Handler do submit do formulário
   * 
   * @description
   * Previne o comportamento padrão do formulário e chama o callback
   * onSubmit passado via props com os valores dos campos.
   * 
   * @param {React.FormEvent} e - Evento de submit do formulário
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await onSubmit(username, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-4 sm:space-y-5', className)}
    >
      {/* ==================== Alertas de Feedback ==================== */}
      
      {/** 
       * Alert de Erro
       * 
       * @description
       * Exibe mensagem de erro quando a autenticação falha.
       * Animação de entrada suave com escala e posição.
       */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: ANIMATION_CONFIG.duration, 
            ease: ANIMATION_CONFIG.easeOut 
          }}
        >
          <Alert
            variant="destructive"
            className={cn(
              'py-2.5 border-red-500/50',
              'bg-red-50/80 dark:bg-red-950/20',
              'backdrop-blur-sm',
              SHADOWS.LARGE,
              'shadow-red-500/10',
              'rounded-md' // radiusTokens.md
            )}
          >
            {/** Ícone de erro com animação de rotação */}
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ 
                duration: ANIMATION_CONFIG.duration * 2.5,
              }}
            >
              <AlertCircle className="h-4 w-4" />
            </motion.div>
            <AlertDescription className="text-sm whitespace-pre-line wrap-break-word">
              {error}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/** 
       * Alert de Sucesso
       * 
       * @description
       * Exibe mensagem de sucesso após autenticação bem-sucedida.
       * Ícone pulsa infinitamente para chamar atenção.
       */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: ANIMATION_CONFIG.duration, 
            ease: ANIMATION_CONFIG.easeOut 
          }}
        >
          <Alert
            className={cn(
              'border-green-500/50 bg-green-50/80 dark:bg-green-950/20',
              'backdrop-blur-sm py-2.5',
              SHADOWS.LARGE,
              'shadow-green-500/10',
              'rounded-md' // radiusTokens.md
            )}
          >
            {/** Ícone de sucesso com animação de pulso */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: Number(motionTokens.duration.slower.replace('ms', '')) / 1000, 
                repeat: Infinity, 
                repeatDelay: 2 
              }}
            >
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            </motion.div>
            <AlertDescription className="text-sm text-green-700 dark:text-green-400">
              Login realizado com sucesso! Redirecionando...
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* ==================== Campo de Email/Usuário ==================== */}
      
      {/** 
       * Campo de Email/Usuário
       * 
       * @description
       * Input para email ou nome de usuário com:
       * - Animação de entrada lateral
       * - Efeito de glow no foco
       * - Validação visual de preenchimento
       * - Auto-focus para melhor UX
       */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          delay: Number(motionTokens.delay.short.replace('ms', '')) / 1000,
          duration: ANIMATION_CONFIG.duration,
          ease: ANIMATION_CONFIG.easeOut,
        }}
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
              INPUT_STYLES.base,
              INPUT_STYLES.border,
              INPUT_STYLES.focus,
              INPUT_STYLES.transition,
              INPUT_STYLES.hover,
              INPUT_STYLES.background
            )}
            autoComplete="username"
            autoFocus
          />
          {/** Efeito de glow que aparece no foco */}
          <div
            className={cn(
              GLOW_EFFECT_STYLES.container,
              GLOW_EFFECT_STYLES.background,
              GLOW_EFFECT_STYLES.transition,
              GLOW_EFFECT_STYLES.nonInteractive,
              GLOW_EFFECT_STYLES.visible
            )}
          />
        </div>
      </motion.div>

      {/* ==================== Campo de Senha ==================== */}
      
      {/** 
       * Campo de Senha
       * 
       * @description
       * Input de senha com recursos avançados:
       * - Toggle de visibilidade (mostrar/ocultar)
       * - Link para recuperação de senha
       * - Animação de entrada com delay
       * - Efeito de glow no foco
       * - Botão com micro-animações (hover/tap)
       */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          delay: Number(motionTokens.delay.medium.replace('ms', '')) / 1000,
          duration: ANIMATION_CONFIG.duration,
          ease: ANIMATION_CONFIG.easeOut,
        }}
        className="space-y-2"
      >
        {/** Header do campo com label e link de recuperação */}
        <div className="flex items-center justify-between">
          <Label
            htmlFor="password"
            className="text-sm font-normal text-foreground"
          >
            Senha
          </Label>
          {/** Link "Esqueceu a senha?" com underline animado */}
          <Link
            href="/dashboard/login/forgot-password"
            className={cn(
              'text-xs text-primary hover:text-primary/80 hover:underline',
              'focus:outline-none focus:ring-2 focus:ring-primary/20',
              'relative group/link',
              MOTION.TRANSITION.COLOR
            )}
          >
            <span className="relative z-10">Esqueceu?</span>
            {/** Underline animado no hover */}
            <span
              className={cn(
                'absolute bottom-0 left-0 w-0 h-0.5 bg-primary',
                'group-hover/link:w-full',
                MOTION.TRANSITION.DEFAULT
              )}
            />
          </Link>
        </div>
        
        {/** Container do input com botão de toggle */}
        <div className="relative group">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Digite sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={isLoading}
            className={cn(
              INPUT_STYLES.base,
              'pr-10', // Espaço para o botão de toggle
              INPUT_STYLES.border,
              INPUT_STYLES.focus,
              INPUT_STYLES.transition,
              INPUT_STYLES.hover,
              INPUT_STYLES.background
            )}
            autoComplete="current-password"
          />
          
          {/** Efeito de glow que aparece no foco */}
          <div
            className={cn(
              GLOW_EFFECT_STYLES.container,
              GLOW_EFFECT_STYLES.background,
              GLOW_EFFECT_STYLES.transition,
              GLOW_EFFECT_STYLES.nonInteractive,
              GLOW_EFFECT_STYLES.visible
            )}
          />
          
          {/** 
           * Botão de toggle de visibilidade
           * 
           * @description
           * Botão que alterna entre mostrar e ocultar a senha.
           * Micro-animações de escala no hover e tap para feedback tátil.
           */}
          <motion.button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2',
              'text-muted-foreground hover:text-foreground',
              'p-1 rounded-sm',
              'hover:bg-accent/50',
              MOTION.TRANSITION.DEFAULT,
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

      {/* ==================== Checkbox Remember Me ==================== */}
      
      {/** 
       * Checkbox "Manter-me conectado"
       * 
       * @description
       * Permite ao usuário optar por manter a sessão ativa.
       * Inclui micro-animações de escala para feedback visual.
       */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          delay: Number(motionTokens.delay.long.replace('ms', '')) / 1000,
          duration: ANIMATION_CONFIG.duration,
          ease: ANIMATION_CONFIG.easeOut,
        }}
        className="flex items-center pt-1"
      >
        {/** Container do checkbox com animações de interação */}
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
              'rounded-sm', // radiusTokens.sm
              'border-border text-primary',
              'focus:ring-2 focus:ring-primary/30',
              'focus:shadow-md focus:shadow-primary/20',
              'cursor-pointer',
              'hover:border-primary/70',
              MOTION.TRANSITION.DEFAULT,
              'accent-primary'
            )}
            disabled={isLoading}
          />
        </motion.div>
        {/** Label do checkbox com transição de cor */}
        <label
          htmlFor="remember"
          className={cn(
            'ml-2 text-sm text-foreground cursor-pointer',
            'hover:text-primary/80',
            MOTION.TRANSITION.COLOR
          )}
        >
          Manter-me conectado
        </label>
      </motion.div>

      {/* ==================== Dica de Desenvolvimento ==================== */}
      
      {/** 
       * Dica de Credenciais de Desenvolvimento
       * 
       * @description
       * Exibe sugestão de credenciais apenas em ambiente de desenvolvimento.
       * Útil para facilitar testes durante o desenvolvimento.
       * Automaticamente oculto em produção.
       */}
      {process.env.NODE_ENV === 'development' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: ANIMATION_CONFIG.duration,
            duration: ANIMATION_CONFIG.duration,
            ease: ANIMATION_CONFIG.easeOut,
          }}
          className={cn(
            'rounded-md', // radiusTokens.md
            'bg-cyan-50/80 dark:bg-cyan-950/20',
            'border border-cyan-200/50 dark:border-cyan-800/50',
            'backdrop-blur-sm',
            'p-3',
            SHADOWS.SMALL,
            MOTION.TRANSITION.DEFAULT,
            'hover:shadow-md hover:border-cyan-300/50 dark:hover:border-cyan-700/50'
          )}
        >
          <p className="text-xs text-cyan-700 dark:text-cyan-300 font-mono">
            💡 <strong>DEV:</strong> Use admin/admin para acesso
          </p>
        </motion.div>
      )}

      {/* ==================== Botão de Submit ==================== */}
      
      {/** 
       * Botão de Login
       * 
       * @description
       * Botão principal de submit do formulário com:
       * - Validação visual (desabilitado se campos vazios)
       * - Efeito de brilho animado durante loading
       * - Spinner de carregamento
       * - Micro-animações de escala (hover/tap)
       * - Shadow dinâmico com tokens
       * - Estados visuais claros (normal, hover, disabled, loading)
       */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: ANIMATION_CONFIG.duration,
          duration: ANIMATION_CONFIG.duration,
          ease: ANIMATION_CONFIG.easeOut,
        }}
        className="mt-4"
      >
        {/** Container com micro-animações de interação */}
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
              SHADOWS.LARGE,
              'shadow-primary/20',
              'hover:shadow-xl hover:shadow-primary/30',
              MOTION.TRANSITION.DEFAULT,
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'group'
            )}
          >
            {/** 
             * Efeito de brilho animado (shimmer)
             * 
             * @description
             * Animação de brilho que percorre o botão durante o loading.
             * Cria uma experiência visual premium e indica progresso.
             */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
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
            
            {/** Conteúdo do botão (texto ou spinner) */}
            <span className="relative z-10 flex items-center justify-center">
              {isLoading ? (
                <>
                  {/** Spinner de carregamento */}
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
