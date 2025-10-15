/**
 * Hook para validação e análise de força de senha
 * 
 * Hook reutilizável que analisa a força de uma senha baseado em critérios
 * de segurança (tamanho, maiúsculas, minúsculas, números, caracteres especiais)
 * 
 * @fileoverview Hook para análise de força de senha
 * @author Rainer Teixeira
 * @version 1.0.0
 */

export interface PasswordStrength {
  strength: number
  label: string
  color: string
}

/**
 * Hook usePasswordStrength
 * 
 * Analisa a força de uma senha e retorna um objeto com:
 * - strength: nível de força (0-5)
 * - label: descrição textual da força
 * - color: classe de cor para exibição visual
 * 
 * @param {string} password - Senha a ser analisada
 * @returns {PasswordStrength} Objeto com informações sobre a força da senha
 * 
 * @example
 * import { usePasswordStrength } from '@/hooks/use-password-strength'
 * 
 * function MyForm() {
 *   const [password, setPassword] = useState('')
 *   const passwordStrength = usePasswordStrength(password)
 *   
 *   return (
 *     <div>
 *       <input value={password} onChange={(e) => setPassword(e.target.value)} />
 *       <p>Força: {passwordStrength.label}</p>
 *     </div>
 *   )
 * }
 */
export function usePasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { strength: 0, label: "", color: "" }
  }
  
  let strength = 0
  
  // Critérios de validação
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  const labels = ["Muito fraca", "Fraca", "Média", "Forte", "Muito forte"]
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500"
  ]

  return {
    strength,
    label: labels[strength - 1] || "",
    color: colors[strength - 1] || ""
  }
}

