/**
 * Password Input Component
 *
 * Componente de input de senha com toggle de visibilidade e indicador de força
 * da senha. Integração com react-hook-form e validação em tempo real via hook
 * usePasswordStrength.
 *
 * @module components/dashboard/login/password-input
 * @fileoverview Input de senha com indicador de força
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <PasswordInput
 *   value={password}
 *   onChange={setPassword}
 *   showStrengthIndicator
 *   placeholder="Digite sua senha"
 * />
 * ```
 *
 * Características:
 * - Toggle de visibilidade (mostrar/ocultar senha)
 * - Indicador visual de força da senha (opcional)
 * - Integração com react-hook-form
 * - Validação em tempo real
 * - Integração com hook usePasswordStrength
 * - Acessibilidade completa
 * - Suporte a desabilitado
 */

'use client';

import { usePasswordStrength } from '@/components/dashboard/hooks';
import { Input } from '@rainersoft/ui';
import { cn } from '@/lib/utils';
// Design tokens via CSS variables (imported in globals.css)
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  showStrengthIndicator?: boolean;
  name?: string;
  id?: string;
}

/**
 * PasswordInput Component
 *
 * Input de senha com funcionalidades avançadas:
 * - Toggle de visibilidade (mostrar/ocultar senha)
 * - Indicador de força da senha (opcional)
 * - Compatível com react-hook-form
 *
 * @param {PasswordInputProps} props - Propriedades do componente
 * @returns {JSX.Element} Componente renderizado
 *
 * @example
 * <PasswordInput
 *   value={password}
 *   onChange={setPassword}
 *   showStrengthIndicator
 *   placeholder="Digite sua senha"
 * />
 */
export function PasswordInput({
  value,
  onChange,
  placeholder = '••••••••',
  disabled = false,
  showStrengthIndicator = false,
  name,
  id,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordStrength = usePasswordStrength(value);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          disabled={disabled}
          name={name}
          id={id}
          className="h-9 sm:h-10 pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20',
            'transition-colors duration-200 ease-in-out'
          )}
          disabled={disabled}
          tabIndex={-1}
          aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Indicador de força da senha */}
      {showStrengthIndicator && value && (
        <div className="space-y-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1 flex-1',
                  'rounded-full',
                  'transition-colors duration-200 ease-in-out',
                  i < passwordStrength.strength
                    ? passwordStrength.color
                    : 'bg-muted'
                )}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Força: <span className="font-medium">{passwordStrength.label}</span>
          </p>
        </div>
      )}
    </div>
  );
}
