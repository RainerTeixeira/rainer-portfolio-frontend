/**
 * Formulário de Reset de Senha
 * 
 * Formulário para redefinir senha com token
 * 
 * @fileoverview Reset password form component
 * @author Rainer Teixeira
 */

"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2, Loader2, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { PasswordInput } from "../password-input"

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Senha deve conter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "Senha deve conter pelo menos um caractere especial"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

interface ResetPasswordFormProps {
  token: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: ResetPasswordFormValues) {
    setIsLoading(true)
    setError(null)

    try {
      const { localAuth } = await import('@/components/dashboard/lib/auth-local')
      
      const result = await localAuth.resetPassword(token, data.password)

      if (!result.success) {
        throw new Error(result.message)
      }

      setSuccess(true)
      
      // Redirecionar para login após 2s
      setTimeout(() => {
        router.push("/dashboard/login")
      }, 2000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao redefinir senha. Tente novamente."
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Alert className="border-green-500">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-700 dark:text-green-400">
          Senha redefinida com sucesso! Redirecionando para login...
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Redefinir Senha
        </h2>
        <p className="text-sm text-muted-foreground">
          Digite sua nova senha abaixo
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Nova senha */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova Senha</FormLabel>
                <FormControl>
                  <PasswordInput 
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                    showStrengthIndicator
                    name={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirmar nova senha */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Nova Senha</FormLabel>
                <FormControl>
                  <PasswordInput 
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                    name={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Redefinir Senha
          </Button>
        </form>
      </Form>
    </div>
  )
}

