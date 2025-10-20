/**
 * Página de Registro - Dashboard
 * 
 * Página para cadastro de novos usuários
 * 
 * @fileoverview Register page
 * @author Rainer Teixeira
 */

import { Metadata } from "next"
import Link from "next/link"
import { RegisterForm, TermsDialog } from "@/components/dashboard/login"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackToTop } from "@/components/ui"

export const metadata: Metadata = {
  title: "Criar Conta | Dashboard",
  description: "Crie sua conta para acessar o dashboard",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-lg space-y-6">
        {/* Logo/Brand */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Rainer Soft - Dashboard
            </h1>
          </Link>
          <p className="text-muted-foreground">
            Crie sua conta para acessar o dashboard
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Criar Conta</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Ao criar uma conta, você concorda com nossos{" "}
          <TermsDialog type="terms">
            <button className="text-cyan-500 hover:underline font-medium cursor-pointer">
              Termos de Uso
            </button>
          </TermsDialog>{" "}
          e{" "}
          <TermsDialog type="privacy">
            <button className="text-cyan-500 hover:underline font-medium cursor-pointer">
              Política de Privacidade
            </button>
          </TermsDialog>
        </p>
      </div>

      {/* Back to Top */}
      <BackToTop />
    </div>
  )
}

