/**
 * Contexto de Autenticação
 * 
 * Context API para gerenciar estado de autenticação global.
 * Usa dados mockados (admin/admin) e localStorage para persistência.
 * 
 * @fileoverview Contexto de autenticação com login fake
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  username: string
  role: "manager" | "user"
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Hook useAuth
 * 
 * Hook personalizado para acessar contexto de autenticação.
 * Deve ser usado dentro de AuthProvider.
 * 
 * @returns {AuthContextType} Contexto de autenticação
 * @throws {Error} Se usado fora do AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

/**
 * AuthProvider
 * 
 * Provedor de contexto de autenticação.
 * Gerencia estado de login e persistência em localStorage.
 * 
 * Credenciais mockadas:
 * - Username: admin
 * - Password: admin
 * 
 * @param {AuthProviderProps} props - Props do provider
 * @returns {JSX.Element} Provider com children
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  /**
   * Effect: Carregar usuário do localStorage ao montar
   * Restaura sessão se houver usuário salvo
   */
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Erro ao carregar usuário:", error)
        localStorage.removeItem("auth_user")
      }
    }
    setIsLoading(false)
  }, [])

  /**
   * Função de login
   * 
   * Valida credenciais usando sistema local.
   * Suporta login com username ou email.
   * 
   * @param {string} username - Nome de usuário ou email
   * @param {string} password - Senha
   * @returns {Promise<boolean>} True se login bem-sucedido
   */
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const { localAuth } = await import('@/lib/auth-local')
      
      const result = await localAuth.login(username, password)

      if (result.success && result.user) {
        const newUser: User = {
          username: result.user.username,
          role: "manager"
        }
        setUser(newUser)
        localStorage.setItem("auth_user", JSON.stringify(newUser))
        return true
      }

      return false
    } catch (error) {
      console.error("Erro no login:", error)
      return false
    }
  }

  /**
   * Função de logout
   * 
   * Remove usuário do estado e localStorage.
   */
  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth_user")
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

