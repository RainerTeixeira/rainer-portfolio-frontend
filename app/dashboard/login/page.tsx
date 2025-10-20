/**
 * Página de Login do Dashboard
 * 
 * Página dedicada para autenticação de usuários.
 * Preparada para integração futura com AWS Cognito.
 * 
 * @fileoverview Dashboard Login Page
 * @author Rainer Teixeira
 * @version 3.0.0
 */

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  LogIn, 
  Eye, 
  EyeOff, 
  Loader2, 
  AlertCircle,
  CheckCircle2,
  Lock,
  User,
  ArrowRight,
  Shield
} from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BackToTop } from "@/components/ui"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

/**
 * Página de Login
 * 
 * Design moderno com split-screen.
 * Preparada para AWS Cognito (hooks e estrutura prontos).
 */
export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated, isLoading: authLoading } = useAuth()
  
  // Form states
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  
  // UI states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  /**
   * Redireciona se já estiver autenticado
   */
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, authLoading, router])

  /**
   * Handler de submit do formulário
   * 
   * TODO: Integrar com AWS Cognito
   * - Usar AWS Amplify Auth
   * - Implementar MFA
   * - Session management
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validações
    if (!username.trim()) {
      setError("Digite seu usuário")
      return
    }

    if (!password.trim()) {
      setError("Digite sua senha")
      return
    }

    setIsLoading(true)

    try {
      // TODO: Substituir por AWS Cognito
      // const cognitoUser = await Auth.signIn(username, password)
      
      const loginSuccess = await login(username, password)
      
      if (loginSuccess) {
        setSuccess(true)
        toast.success("Login realizado com sucesso!")
        
        // TODO: Salvar preferência "Remember Me"
        if (rememberMe) {
          // localStorage.setItem('rememberMe', 'true')
        }
        
        // Delay para mostrar mensagem de sucesso
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      } else {
        setError("Usuário ou senha incorretos")
        toast.error("Credenciais inválidas")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao fazer login. Tente novamente."
      setError(errorMessage)
      console.error("Erro no login:", err)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * TODO: Implementar login social com Cognito
   */
  const handleSocialLogin = (provider: 'google' | 'github') => {
    // await Auth.federatedSignIn({ provider })
    console.log(`Login com ${provider} - TODO: Implementar`)
  }

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    )
  }

  // Já autenticado
  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Lado Esquerdo: Branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-white">
        <div>
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold mb-2">Rainer Soft</h1>
          </Link>
          <p className="text-cyan-100 text-lg">Dashboard de Administração</p>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur rounded-lg border border-white/20">
              <Shield className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Autenticação Segura</h3>
                <p className="text-sm text-cyan-100">
                  Preparado para integração com AWS Cognito para máxima segurança
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-start gap-4 p-6 bg-white/10 backdrop-blur rounded-lg border border-white/20">
              <Lock className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Gerenciamento Completo</h3>
                <p className="text-sm text-cyan-100">
                  Controle total sobre conteúdo, posts e configurações
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Lado Direito: Formulário */}
      <div className="flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Header Mobile */}
          <div className="lg:hidden text-center">
            <Link href="/">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                Rainer Soft
              </h1>
            </Link>
          </div>

          {/* Card de Login */}
          <Card className="border-2 shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <LogIn className="w-6 h-6 text-cyan-500" />
                Bem-vindo de Volta
              </CardTitle>
              <CardDescription>
                Entre com suas credenciais para acessar o dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo de Usuário */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Usuário
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Digite seu usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    className={cn(
                      "h-11",
                      "dark:bg-black/50 dark:border-cyan-400/30 dark:focus:border-cyan-400"
                    )}
                    autoComplete="username"
                    autoFocus
                  />
                </div>

                {/* Campo de Senha */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Senha
                    </Label>
                    <Link 
                      href="/dashboard/login/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className={cn(
                        "h-11 pr-10",
                        "dark:bg-black/50 dark:border-cyan-400/30 dark:focus:border-cyan-400"
                      )}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm cursor-pointer text-muted-foreground"
                  >
                    Manter-me conectado
                  </label>
                </div>

                {/* Mensagens */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-500 bg-green-500/10">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700 dark:text-green-400">
                      Login realizado com sucesso! Redirecionando...
                    </AlertDescription>
                  </Alert>
                )}

                {/* Dica de Credenciais (DEV) */}
                <Alert className="bg-cyan-500/10 border-cyan-500/30">
                  <AlertDescription className="text-xs text-cyan-700 dark:text-cyan-400 font-mono">
                    💡 <strong>DEV:</strong> Use admin/admin para acesso
                  </AlertDescription>
                </Alert>

                {/* Botão de Login */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full h-11 text-base gap-2",
                    "dark:bg-cyan-600 dark:hover:bg-cyan-700"
                  )}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      Entrar
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou continue com
                  </span>
                </div>
              </div>

              {/* Social Login (TODO: Cognito) */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin('github')}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </Button>
              </div>

              {/* Link para Registro */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Não tem uma conta? </span>
                <Link 
                  href="/dashboard/login/register"
                  className="text-primary font-medium hover:underline"
                >
                  Criar conta
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Link para Home */}
          <div className="text-center">
            <Link 
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Voltar para home
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Back to Top */}
      <BackToTop />
    </div>
  )
}

