/**
 * Componente de Input de Senha com Indicador de Força
 * 
 * Componente reutilizável que combina:
 * - Input de senha com toggle de visibilidade
 * - Indicador visual de força da senha
 * - Integração com react-hook-form
 * 
 * @fileoverview Password input component with strength indicator
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { usePasswordStrength } from "@/components/dashboard/hooks"

export interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  showStrengthIndicator?: boolean
  name?: string
  id?: string
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
  placeholder = "••••••••",
  disabled = false,
  showStrengthIndicator = false,
  name,
  id
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const passwordStrength = usePasswordStrength(value)

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input 
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          name={name}
          id={id}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          disabled={disabled}
          tabIndex={-1}
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
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i < passwordStrength.strength
                    ? passwordStrength.color
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Força: <span className="font-medium">{passwordStrength.label}</span>
          </p>
        </div>
      )}
    </div>
  )
}

