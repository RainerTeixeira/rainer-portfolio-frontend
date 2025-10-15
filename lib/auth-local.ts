/**
 * Sistema de Autenticação Local
 * 
 * Implementação completa de autenticação local para desenvolvimento.
 * Simula um backend real com localStorage.
 * 
 * @fileoverview Local Authentication System
 * @author Rainer Teixeira
 */

interface User {
  id: string
  name: string
  username: string
  email: string
  password: string // Em produção, seria hash
  createdAt: string
  avatar?: string
  bio?: string
}

interface ResetToken {
  token: string
  email: string
  expiresAt: number
}

const USERS_KEY = 'dashboard_users'
const RESET_TOKENS_KEY = 'dashboard_reset_tokens'

/**
 * Classe LocalAuth
 * Sistema completo de autenticação local
 */
class LocalAuth {
  /**
   * Registrar novo usuário
   */
  async register(data: {
    name: string
    username: string
    email: string
    password: string
  }): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      // Buscar usuários existentes
      const users = this.getUsers()

      // Verificar se username já existe
      if (users.find(u => u.username === data.username)) {
        return {
          success: false,
          message: 'Username já está em uso'
        }
      }

      // Verificar se email já existe
      if (users.find(u => u.email === data.email)) {
        return {
          success: false,
          message: 'Email já cadastrado'
        }
      }

      // Criar novo usuário
      const newUser: User = {
        id: Date.now().toString(),
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password, // Em produção: bcrypt.hash(data.password, 10)
        createdAt: new Date().toISOString()
      }

      // Salvar
      users.push(newUser)
      localStorage.setItem(USERS_KEY, JSON.stringify(users))

      // Retornar usuário sem a senha
      const { password, ...userWithoutPassword } = newUser

      return {
        success: true,
        message: 'Conta criada com sucesso!',
        user: userWithoutPassword as User
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Erro ao criar conta'
      }
    }
  }

  /**
   * Login de usuário
   */
  async login(username: string, password: string): Promise<{
    success: boolean
    message: string
    user?: Omit<User, 'password'>
  }> {
    try {
      const users = this.getUsers()

      // Buscar usuário
      const user = users.find(
        u => u.username === username || u.email === username
      )

      if (!user) {
        return {
          success: false,
          message: 'Usuário não encontrado'
        }
      }

      // Verificar senha
      if (user.password !== password) {
        // Em produção: bcrypt.compare(password, user.password)
        return {
          success: false,
          message: 'Senha incorreta'
        }
      }

      // Retornar usuário sem senha
      const { password: _, ...userWithoutPassword } = user

      return {
        success: true,
        message: 'Login realizado com sucesso!',
        user: userWithoutPassword
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Erro ao fazer login'
      }
    }
  }

  /**
   * Solicitar reset de senha
   */
  async forgotPassword(email: string): Promise<{
    success: boolean
    message: string
    token?: string
  }> {
    try {
      const users = this.getUsers()

      // Verificar se email existe
      const user = users.find(u => u.email === email)

      if (!user) {
        // Por segurança, não revelar se email existe
        return {
          success: true,
          message: 'Se o email existir, você receberá instruções de recuperação.'
        }
      }

      // Gerar token
      const token = 'reset-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
      const expiresAt = Date.now() + (60 * 60 * 1000) // 1 hora

      // Salvar token
      const resetTokens = this.getResetTokens()
      resetTokens.push({
        token,
        email,
        expiresAt
      })
      localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(resetTokens))

      console.log('🔗 Link de reset:', `http://localhost:3000/dashboard/login/reset-password/${token}`)

      return {
        success: true,
        message: 'Email de recuperação enviado! Verifique sua caixa de entrada.',
        token // Em produção, NÃO retornar o token
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Erro ao enviar email'
      }
    }
  }

  /**
   * Reset de senha com token
   */
  async resetPassword(token: string, newPassword: string): Promise<{
    success: boolean
    message: string
  }> {
    try {
      const resetTokens = this.getResetTokens()

      // Buscar token
      const resetToken = resetTokens.find(t => t.token === token)

      if (!resetToken) {
        return {
          success: false,
          message: 'Token inválido'
        }
      }

      // Verificar expiração
      if (Date.now() > resetToken.expiresAt) {
        return {
          success: false,
          message: 'Token expirado. Solicite um novo link de recuperação.'
        }
      }

      // Buscar usuário
      const users = this.getUsers()
      const userIndex = users.findIndex(u => u.email === resetToken.email)

      if (userIndex === -1) {
        return {
          success: false,
          message: 'Usuário não encontrado'
        }
      }

      // Atualizar senha
      users[userIndex].password = newPassword // Em produção: bcrypt.hash(newPassword, 10)
      localStorage.setItem(USERS_KEY, JSON.stringify(users))

      // Invalidar token
      const newResetTokens = resetTokens.filter(t => t.token !== token)
      localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(newResetTokens))

      return {
        success: true,
        message: 'Senha redefinida com sucesso!'
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Erro ao redefinir senha'
      }
    }
  }

  /**
   * Obter todos os usuários
   */
  private getUsers(): User[] {
    if (typeof window === 'undefined') return []
    
    const usersData = localStorage.getItem(USERS_KEY)
    if (!usersData) {
      // Criar usuário admin padrão
      const defaultUser: User = {
        id: '1',
        name: 'Administrador',
        username: 'admin',
        email: 'admin@rainersoft.com',
        password: 'admin',
        createdAt: new Date().toISOString()
      }
      localStorage.setItem(USERS_KEY, JSON.stringify([defaultUser]))
      return [defaultUser]
    }
    return JSON.parse(usersData)
  }

  /**
   * Obter tokens de reset
   */
  private getResetTokens(): ResetToken[] {
    if (typeof window === 'undefined') return []
    
    const tokensData = localStorage.getItem(RESET_TOKENS_KEY)
    if (!tokensData) return []
    return JSON.parse(tokensData)
  }

  /**
   * Limpar tokens expirados
   */
  cleanExpiredTokens(): void {
    const tokens = this.getResetTokens()
    const validTokens = tokens.filter(t => Date.now() <= t.expiresAt)
    localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(validTokens))
  }
}

export const localAuth = new LocalAuth()

