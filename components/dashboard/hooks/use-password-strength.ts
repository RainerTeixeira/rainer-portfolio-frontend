/**
 * Hook para Validação e Análise de Força de Senha
 * 
 * Analisa a força de uma senha em tempo real baseado em múltiplos critérios
 * de segurança. Ideal para formulários de cadastro e alteração de senha.
 * 
 * Critérios de Avaliação:
 * - ✓ Comprimento mínimo (8 caracteres)
 * - ✓ Presença de letras maiúsculas (A-Z)
 * - ✓ Presença de letras minúsculas (a-z)
 * - ✓ Presença de números (0-9)
 * - ✓ Presença de caracteres especiais (!@#$%^&*, etc)
 * 
 * Níveis de Força:
 * - 0: Vazia (sem senha)
 * - 1: Muito fraca (vermelho)
 * - 2: Fraca (laranja)
 * - 3: Média (amarelo)
 * - 4: Forte (verde-limão)
 * - 5: Muito forte (verde)
 * 
 * Uso principal:
 * - Formulários de registro de usuário
 * - Páginas de alteração de senha
 * - Validação de segurança em dashboards
 * 
 * @fileoverview Hook para análise de força de senha com validação em tempo real
 * @author Rainer Teixeira
 * @version 1.0.0
 */

/**
 * Interface do resultado da análise de força da senha
 * 
 * @interface PasswordStrength
 * @property {number} strength - Nível de força da senha (0-5)
 * @property {string} label - Descrição textual da força ("Muito fraca", "Fraca", etc)
 * @property {string} color - Classe Tailwind CSS para cor do indicador (bg-red-500, etc)
 */
export interface PasswordStrength {
  strength: number
  label: string
  color: string
}

/**
 * Hook usePasswordStrength
 * 
 * Analisa a força de uma senha em tempo real e retorna informações
 * sobre seu nível de segurança, incluindo descrição e cor visual.
 * 
 * Cada critério atendido adiciona 1 ponto à força:
 * - Mínimo 8 caracteres: +1
 * - Letras maiúsculas: +1
 * - Letras minúsculas: +1
 * - Números: +1
 * - Caracteres especiais: +1
 * 
 * @param {string} password - Senha a ser analisada
 * 
 * @returns {PasswordStrength} Objeto com informações sobre a força da senha
 * @returns {number} strength - Nível de força (0 = vazia, 1-5 = muito fraca a muito forte)
 * @returns {string} label - Descrição textual em português
 * @returns {string} color - Classe CSS Tailwind para indicador visual
 * 
 * @example
 * // Uso básico com indicador visual
 * import { usePasswordStrength } from '@/components/dashboard/hooks'
 * 
 * function PasswordForm() {
 *   const [password, setPassword] = useState('')
 *   const { strength, label, color } = usePasswordStrength(password)
 *   
 *   return (
 *     <div>
 *       <input 
 *         type="password"
 *         value={password} 
 *         onChange={(e) => setPassword(e.target.value)} 
 *       />
 *       <div className="flex gap-1">
 *         {[...Array(5)].map((_, i) => (
 *           <div 
 *             key={i}
 *             className={`h-1 flex-1 ${i < strength ? color : 'bg-gray-200'}`}
 *           />
 *         ))}
 *       </div>
 *       <p>Força: {label}</p>
 *     </div>
 *   )
 * }
 * 
 * @example
 * // Uso com validação de formulário
 * function RegisterForm() {
 *   const [password, setPassword] = useState('')
 *   const { strength, label } = usePasswordStrength(password)
 *   
 *   const isPasswordStrong = strength >= 4
 *   
 *   return (
 *     <form>
 *       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
 *       <p className={isPasswordStrong ? 'text-green-500' : 'text-red-500'}>
 *         {label}
 *       </p>
 *       <button disabled={!isPasswordStrong}>Cadastrar</button>
 *     </form>
 *   )
 * }
 * 
 * @see {@link PasswordInput} - Componente que usa este hook
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

