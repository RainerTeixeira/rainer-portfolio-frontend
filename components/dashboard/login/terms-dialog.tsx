/**
 * Dialog de Termos e Privacidade
 * 
 * Modal para exibir termos e política de privacidade
 * 
 * @fileoverview Terms and Privacy Dialog
 * @author Rainer Teixeira
 */

"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { FileText, Shield, Lock, Eye, Database, UserCheck } from "lucide-react"

interface TermsDialogProps {
  children: React.ReactNode
  type: "terms" | "privacy"
}

export function TermsDialog({ children, type }: TermsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center gap-3">
            {type === "terms" ? (
              <FileText className="w-6 h-6 text-cyan-500" />
            ) : (
              <Shield className="w-6 h-6 text-cyan-500" />
            )}
            <DialogTitle className="text-2xl dark:text-cyan-200">
              {type === "terms" ? "Termos de Uso" : "Política de Privacidade"}
            </DialogTitle>
          </div>
          <DialogDescription>
            Última atualização: 14 de outubro de 2025
            {type === "privacy" && (
              <span className="block mt-2 text-cyan-600 dark:text-cyan-400 font-medium">
                Conforme LGPD - Lei nº 13.709/2018
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(90vh-120px)] px-6 pb-6">
          {type === "terms" ? <TermsContent /> : <PrivacyContent />}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function TermsContent() {
  return (
    <div className="space-y-6 text-sm">
      {/* Introdução */}
      <section>
        <h3 className="text-lg font-bold mb-3 dark:text-cyan-200">1. Introdução</h3>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Bem-vindo à <strong className="text-foreground">Rainer Soft</strong>. Estes Termos de Uso 
            (&quot;Termos&quot;) regem o seu acesso e uso de nossos serviços, website e plataforma de blog.
          </p>
          <p>
            Ao acessar ou usar nossos serviços, você concorda em ficar vinculado a estes Termos. 
            Se você não concordar com qualquer parte destes termos, não utilize nossos serviços.
          </p>
        </div>
      </section>

      <Separator />

      {/* Definições */}
      <section>
        <h3 className="text-lg font-bold mb-3 dark:text-cyan-200">2. Definições</h3>
        <div className="space-y-2 text-muted-foreground">
          <p><strong className="text-foreground">&quot;Serviço&quot;</strong>: website, plataforma de blog e dashboard administrativo da Rainer Soft.</p>
          <p><strong className="text-foreground">&quot;Usuário&quot;</strong>: qualquer pessoa que acesse ou utilize nossos Serviços.</p>
          <p><strong className="text-foreground">&quot;Conteúdo&quot;</strong>: textos, imagens, vídeos, códigos e outros materiais publicados no Serviço.</p>
          <p><strong className="text-foreground">&quot;Conta&quot;</strong>: registro de usuário necessário para acessar funcionalidades restritas.</p>
        </div>
      </section>

      <Separator />

      {/* Uso do Serviço */}
      <section>
        <h3 className="text-lg font-bold mb-3 dark:text-cyan-200">3. Uso do Serviço</h3>
        <div className="space-y-3 text-muted-foreground">
          <div>
            <h4 className="font-semibold text-foreground mb-2">3.1 Elegibilidade</h4>
            <p>
              Você deve ter pelo menos 18 anos de idade para criar uma conta. 
              Ao criar uma conta, você declara que todas as informações fornecidas são verdadeiras e precisas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">3.2 Conta de Usuário</h4>
            <p>
              Você é responsável por manter a confidencialidade de sua senha e conta. 
              Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">3.3 Uso Aceitável</h4>
            <p>Você concorda em NÃO:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Violar leis ou regulamentos aplicáveis</li>
              <li>Publicar conteúdo ofensivo, difamatório ou ilegal</li>
              <li>Tentar hackear ou comprometer a segurança do Serviço</li>
              <li>Fazer scraping ou uso automatizado sem autorização</li>
              <li>Personificar outras pessoas ou entidades</li>
              <li>Transmitir vírus, malware ou código malicioso</li>
            </ul>
          </div>
        </div>
      </section>

      <Separator />

      {/* Propriedade Intelectual */}
      <section>
        <h3 className="text-lg font-bold mb-3 dark:text-cyan-200">4. Propriedade Intelectual</h3>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Todo o conteúdo original publicado no Rainer Soft, incluindo mas não limitado a textos, 
            códigos, designs, gráficos e logotipos, é propriedade de Rainer Teixeira e está protegido 
            por leis de direitos autorais brasileiras e internacionais.
          </p>
        </div>
      </section>

      <Separator />

      {/* LGPD */}
      <section>
        <h3 className="text-lg font-bold mb-3 dark:text-cyan-200 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          5. Privacidade e Proteção de Dados (LGPD)
        </h3>
        <div className="space-y-3 text-muted-foreground">
          <p>
            A Rainer Soft está comprometida com a proteção de seus dados pessoais em conformidade com a 
            Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>
          
          <div>
            <h4 className="font-semibold text-foreground mb-2">5.1 Dados Coletados</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Nome completo</li>
              <li>Nome de usuário</li>
              <li>Endereço de email</li>
              <li>Senha (armazenada com hash seguro)</li>
              <li>Dados de navegação (cookies, IP, browser)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">5.2 Seus Direitos (LGPD)</h4>
            <p>Você tem direito a:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Confirmação de existência de tratamento</li>
              <li>Acesso aos seus dados</li>
              <li>Correção de dados incompletos ou inexatos</li>
              <li>Anonimização, bloqueio ou eliminação de dados</li>
              <li>Portabilidade dos dados</li>
              <li>Eliminação dos dados (direito ao esquecimento)</li>
              <li>Revogação do consentimento</li>
            </ul>
          </div>

          <p className="mt-3">
            Para exercer seus direitos: <strong className="text-cyan-500">dpo@rainersoft.com.br</strong>
          </p>
        </div>
      </section>

      <Separator />

      {/* Contato */}
      <section>
        <h3 className="text-lg font-bold mb-3 dark:text-cyan-200">6. Contato</h3>
        <div className="space-y-2 text-muted-foreground">
          <p><strong className="text-foreground">Email:</strong> suporte@rainersoft.com.br</p>
          <p><strong className="text-foreground">Telefone:</strong> +55 24 99913-7382</p>
          <p><strong className="text-foreground">Endereço:</strong> Volta Redonda, RJ, Brasil</p>
        </div>
      </section>

      <div className="pt-4 text-center text-xs text-muted-foreground">
        <p>© 2025 Rainer Soft - Todos os direitos reservados.</p>
      </div>
    </div>
  )
}

function PrivacyContent() {
  return (
    <div className="space-y-6 text-sm">
      {/* Introdução */}
      <section>
        <h3 className="text-lg font-bold mb-3 dark:text-cyan-200">1. Introdução</h3>
        <div className="space-y-3 text-muted-foreground">
          <p>
            A <strong className="text-foreground">Rainer Soft</strong> valoriza sua privacidade e está 
            comprometida em proteger seus dados pessoais em conformidade com a Lei Geral de Proteção de 
            Dados (LGPD - Lei nº 13.709/2018).
          </p>
        </div>
      </section>

      <Separator />

      {/* Dados Coletados */}
      <section>
        <h3 className="text-lg font-bold mb-3 dark:text-cyan-200 flex items-center gap-2">
          <Database className="w-5 h-5" />
          2. Dados Pessoais Coletados
        </h3>
        <div className="space-y-3 text-muted-foreground">
          <div>
            <h4 className="font-semibold text-foreground mb-2">2.1 Dados Fornecidos por Você</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong className="text-foreground">Nome completo</strong>: para identificação e personalização</li>
              <li><strong className="text-foreground">Nome de usuário</strong>: para autenticação única</li>
              <li><strong className="text-foreground">Endereço de email</strong>: para comunicação e recuperação de conta</li>
              <li><strong className="text-foreground">Senha</strong>: armazenada com hash criptográfico (bcrypt/Cognito)</li>
              <li><strong className="text-foreground">Comentários e conteúdo</strong>: publicados por você no blog</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">2.2 Dados Coletados Automaticamente</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Dados de navegação: páginas visitadas, tempo de permanência</li>
              <li>Informações técnicas: endereço IP, tipo de navegador, sistema operacional</li>
              <li>Cookies: preferências de tema, sessão de usuário</li>
            </ul>
          </div>
        </div>
      </section>

      <Separator />

      {/* Como Usamos */}
      <section>
        <h3 className="text-lg font-bold mb-3 dark:text-cyan-200">3. Como Usamos Seus Dados</h3>
        <div className="space-y-2 text-muted-foreground">
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Fornecer, manter e melhorar nossos serviços</li>
            <li>Autenticar você e gerenciar sua conta</li>
            <li>Personalizar sua experiência no site</li>
            <li>Enviar comunicações importantes sobre o serviço</li>
            <li>Analisar uso e tendências para melhorias</li>
            <li>Detectar e prevenir fraudes e abusos</li>
            <li>Cumprir obrigações legais e regulatórias</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* Base Legal */}
      <section>
        <h3 className="text-lg font-bold mb-3 dark:text-cyan-200">4. Base Legal (LGPD Art. 7º)</h3>
        <div className="space-y-2 text-muted-foreground">
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong className="text-foreground">Consentimento</strong> (Art. 7º, I): ao criar sua conta</li>
            <li><strong className="text-foreground">Execução de contrato</strong> (Art. 7º, V): para fornecer os serviços</li>
            <li><strong className="text-foreground">Legítimo interesse</strong> (Art. 7º, IX): melhoria e segurança do serviço</li>
            <li><strong className="text-foreground">Cumprimento legal</strong> (Art. 7º, II): obrigações legais</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* Compartilhamento */}
      <section>
        <h3 className="text-lg font-bold mb-3 dark:text-cyan-200">5. Compartilhamento de Dados</h3>
        <div className="space-y-3 text-muted-foreground">
          <p className="font-semibold text-foreground">NÃO vendemos seus dados pessoais a terceiros.</p>
          <p>Podemos compartilhar dados apenas com:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Prestadores de serviço: AWS (hospedagem), serviços de email</li>
            <li>Autoridades: quando exigido por lei ou ordem judicial</li>
            <li>Com seu consentimento: em casos específicos</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* Segurança */}
      <section>
        <h3 className="text-lg font-bold mb-3 dark:text-cyan-200 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          6. Segurança dos Dados
        </h3>
        <div className="space-y-2 text-muted-foreground">
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Criptografia SSL/TLS em todas as transmissões</li>
            <li>Senhas armazenadas com hash bcrypt ou AWS Cognito</li>
            <li>Autenticação de dois fatores disponível</li>
            <li>Logs de acesso e auditoria</li>
            <li>Backups regulares e seguros</li>
            <li>Monitoramento de segurança 24/7</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* Direitos do Titular */}
      <section>
        <h3 className="text-lg font-bold mb-3 dark:text-cyan-200 flex items-center gap-2">
          <UserCheck className="w-5 h-5" />
          7. Seus Direitos (LGPD Art. 18)
        </h3>
        <div className="space-y-3 text-muted-foreground">
          <p>De acordo com a LGPD, você tem os seguintes direitos:</p>
          
          <div className="grid gap-3">
            <div className="p-3 bg-muted dark:bg-cyan-400/5 rounded-lg">
              <h5 className="font-semibold text-foreground text-xs mb-1">I. Confirmação e Acesso</h5>
              <p className="text-xs text-muted-foreground">Confirmar a existência de tratamento e acessar seus dados</p>
            </div>

            <div className="p-3 bg-muted dark:bg-cyan-400/5 rounded-lg">
              <h5 className="font-semibold text-foreground text-xs mb-1">II. Correção</h5>
              <p className="text-xs text-muted-foreground">Corrigir dados incompletos, inexatos ou desatualizados</p>
            </div>

            <div className="p-3 bg-muted dark:bg-cyan-400/5 rounded-lg">
              <h5 className="font-semibold text-foreground text-xs mb-1">III. Anonimização ou Eliminação</h5>
              <p className="text-xs text-muted-foreground">Solicitar anonimização ou eliminação de dados desnecessários</p>
            </div>

            <div className="p-3 bg-muted dark:bg-cyan-400/5 rounded-lg">
              <h5 className="font-semibold text-foreground text-xs mb-1">IV. Portabilidade</h5>
              <p className="text-xs text-muted-foreground">Receber seus dados em formato estruturado e interoperável</p>
            </div>

            <div className="p-3 bg-muted dark:bg-cyan-400/5 rounded-lg">
              <h5 className="font-semibold text-foreground text-xs mb-1">V. Revogação do Consentimento</h5>
              <p className="text-xs text-muted-foreground">Revogar seu consentimento a qualquer momento</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg">
            <h5 className="font-semibold text-foreground mb-2 text-xs">Como Exercer Seus Direitos:</h5>
            <p className="text-xs">
              Entre em contato: <strong className="text-cyan-500">dpo@rainersoft.com.br</strong>
            </p>
            <p className="mt-2 text-xs">
              Responderemos em até 15 dias corridos, conforme estabelecido pela LGPD.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Cookies */}
      <section>
        <h3 className="text-lg font-bold mb-3 dark:text-cyan-200">8. Cookies</h3>
        <div className="space-y-2 text-muted-foreground">
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong className="text-foreground">Essenciais</strong>: autenticação, segurança</li>
            <li><strong className="text-foreground">Preferência</strong>: tema (claro/escuro), idioma</li>
            <li><strong className="text-foreground">Analíticos</strong>: entender como você usa o site</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* DPO */}
      <section>
        <h3 className="text-lg font-bold mb-3 dark:text-cyan-200">9. Encarregado de Dados (DPO)</h3>
        <div className="space-y-2 text-muted-foreground">
          <p><strong className="text-foreground">Nome:</strong> Rainer Teixeira</p>
          <p><strong className="text-foreground">Email:</strong> dpo@rainersoft.com.br</p>
          <p><strong className="text-foreground">Telefone:</strong> +55 24 99913-7382</p>
        </div>
      </section>

      <Separator />

      {/* Consentimento */}
      <section className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-4">
        <h3 className="text-base font-bold mb-3 text-foreground flex items-center gap-2">
          <Eye className="w-5 h-5 text-cyan-500" />
          Seu Consentimento
        </h3>
        <div className="space-y-2">
          <p className="text-foreground font-medium text-xs">
            Ao usar nossos serviços e criar uma conta, você consente com:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-xs">
            <li>A coleta e uso de seus dados conforme descrito</li>
            <li>O tratamento de seus dados para as finalidades especificadas</li>
            <li>O compartilhamento limitado conforme descrito</li>
            <li>O uso de cookies</li>
          </ul>
        </div>
      </section>

      <div className="pt-4 text-center text-xs text-muted-foreground">
        <p>© 2025 Rainer Soft - Todos os direitos reservados.</p>
      </div>
    </div>
  )
}

