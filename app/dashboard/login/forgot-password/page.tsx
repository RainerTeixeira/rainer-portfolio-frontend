/**
 * Página de Recuperação de Senha - Dashboard
 * 
 * Página para solicitar reset de senha
 * 
 * @fileoverview Forgot password page
 * @author Rainer Teixeira
 */

import { Metadata } from "next"
import Link from "next/link"
import { ForgotPasswordForm } from "@/components/dashboard/login"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BackToTop } from "@/components/ui"

export const metadata: Metadata = {
  title: "Recuperar Senha | Dashboard",
  description: "Recupere o acesso à sua conta",
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Brand */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Rainer Soft - Dashboard
            </h1>
          </Link>
        </div>

        {/* Form Card */}
        <Card className="border-2">
          <CardHeader className="pb-4">
            {/* Conteúdo do header está no form */}
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
        </Card>
      </div>

      {/* Back to Top */}
      <BackToTop />
    </div>
  )
}

