/**
 * Página de Reset de Senha - Dashboard
 * 
 * Página para redefinir senha com token
 * 
 * @fileoverview Reset password page
 * @author Rainer Teixeira
 */

import { Metadata } from "next"
import Link from "next/link"
import { ResetPasswordForm } from "@/components/dashboard/login"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BackToTop } from "@/components/ui"

export const metadata: Metadata = {
  title: "Redefinir Senha | Dashboard",
  description: "Crie uma nova senha para sua conta",
}

interface ResetPasswordPageProps {
  params: {
    token: string
  }
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
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
            <ResetPasswordForm token={params.token} />
          </CardContent>
        </Card>
      </div>

      {/* Back to Top */}
      <BackToTop />
    </div>
  )
}

