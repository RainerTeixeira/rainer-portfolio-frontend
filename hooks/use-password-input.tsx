'use client';

import { usePasswordStrength } from '@rainersoft/utils';
import { cn } from '@rainersoft/ui';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

/**
 * Props para o hook usePasswordInput
 * 
 * @interface UsePasswordInputProps
 * @property {string} value - Valor atual do campo de senha
 * @property {(value: string) => void} onChange - Callback chamado quando o valor muda
 * @property {string} [placeholder] - Texto placeholder do input
 * @property {boolean} [disabled] - Se o input está desabilitado
 * @property {boolean} [showStrengthIndicator] - Se deve mostrar o indicador de força
 * @property {string} [name] - Nome do campo para formulários
 * @property {string} [id] - ID do elemento input
 */
export interface UsePasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  showStrengthIndicator?: boolean;
  name?: string;
  id?: string;
}

/**
 * Hook para gerenciar campos de entrada de senha
 * 
 * Fornece funcionalidades para:
 * - Alternar visibilidade da senha
 * - Calcular força da senha
 * - Props prontas para input e botão de toggle
 * 
 * @param {UsePasswordInputProps} props - Propriedades do hook
 * @returns {object} Objeto contendo inputProps, buttonProps, icon, passwordStrength, showPassword e showStrengthIndicator
 * 
 * @example
 * ```tsx
 * const passwordInput = usePasswordInput({
 *   value: password,
 *   onChange: setPassword,
 *   showStrengthIndicator: true,
 * });
 * 
 * return (
 *   <div className="relative">
 *     <Input {...passwordInput.inputProps} />
 *     <button {...passwordInput.buttonProps}>
 *       {passwordInput.icon}
 *     </button>
 *   </div>
 * );
 * ```
 */
export function usePasswordInput({
  value,
  onChange,
  placeholder = '••••••••',
  disabled = false,
  showStrengthIndicator = false,
  name,
  id,
}: UsePasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordStrength = usePasswordStrength(value, {
    labels: {
      veryWeak: 'Muito Fraca',
      weak: 'Fraca',
      fair: 'Razoável',
      good: 'Boa',
      strong: 'Forte',
      enterPassword: 'Digite uma senha',
      useMinLength: `Use pelo menos 8 caracteres`,
      addUppercase: 'Adicione letras maiúsculas',
      addLowercase: 'Adicione letras minúsculas',
      addNumbers: 'Adicione números',
      addSpecialChars: 'Adicione caracteres especiais (!@#$%)',
      avoidRepeating: 'Evite caracteres repetidos',
      avoidCommon: 'Evite senhas comuns ou padrões óbvios'
    }
  });

  /** Alterna a visibilidade da senha entre texto e pontos */
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  /** Props para o elemento input */
  const inputProps = {
    type: showPassword ? 'text' : 'password',
    placeholder,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    disabled,
    name,
    id,
    className: cn('h-9 sm:h-10 pr-10'),
  };

  /** Props para o botão de toggle de visibilidade */
  const buttonProps = {
    type: 'button' as const,
    onClick: togglePasswordVisibility,
    disabled,
    tabIndex: -1,
    'aria-label': showPassword ? 'Ocultar senha' : 'Mostrar senha',
    className: cn(
      'absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20',
      'transition-colors duration-200 ease-in-out'
    ),
  };

  /** Ícone de olho baseado no estado de visibilidade */
  const icon = showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />;

  return {
    inputProps,
    buttonProps,
    icon,
    passwordStrength,
    showPassword,
    showStrengthIndicator,
  };
}
