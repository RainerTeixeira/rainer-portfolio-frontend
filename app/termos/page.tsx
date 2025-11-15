/**
 * Terms of Use Page Component
 *
 * Página de termos de uso completa e profissional.
 * Inclui condições de uso, responsabilidades e direitos dos usuários.
 *
 * @module app/termos/page
 * @fileoverview Página de termos de uso
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

'use client';

// ============================================================================
// Next.js Imports
// ============================================================================

// ============================================================================
// Icons
// ============================================================================

import {
  AlertCircle,
  Ban,
  CheckCircle,
  Copyright,
  FileText,
  Mail,
  Shield,
} from 'lucide-react';

// ============================================================================
// UI Components
// ============================================================================

import { BackToTop, PageHeader, ParticlesEffect } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// ============================================================================
// DESIGN TOKENS
// ============================================================================

import { cn } from '@/lib/utils';
// Design tokens via CSS variables (imported in globals.css)

// ============================================================================
// Constants
// ============================================================================

import { POLICIES_LAST_UPDATED, SITE_CONFIG } from '@/constants';

// ============================================================================
// Main Component
// ============================================================================

export default function TermsOfUsePage() {
  return (
    <div className={cn('min-h-screen bg-background dark:bg-black')}>
      <ParticlesEffect variant="alt1" />

      <PageHeader
        title="Termos de Uso"
        description="Condições gerais de uso dos serviços oferecidos pela RainerSoft. Leia atentamente antes de utilizar nossos serviços."
      >
        <div className="flex items-center justify-center gap-3 mt-4">
          <FileText className="h-8 w-8 text-primary dark:text-cyan-400" />
          <span className="text-sm text-muted-foreground">
            Última atualização:{' '}
            {new Date(POLICIES_LAST_UPDATED).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </PageHeader>

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <div className="space-y-8">
          {/* Aceitação dos Termos */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <CheckCircle className="h-6 w-6 text-primary dark:text-cyan-400" />
                Aceitação dos Termos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Ao acessar e utilizar os serviços da {SITE_CONFIG.fullName},
                você concorda em cumprir e estar vinculado a estes Termos de
                Uso. Se você não concorda com qualquer parte destes termos, não
                deve utilizar nossos serviços.
              </p>
              <p>
                Estes termos constituem um acordo legal entre você e a{' '}
                {SITE_CONFIG.fullName}. Recomendamos a leitura cuidadosa deste
                documento antes de utilizar nossos serviços.
              </p>
            </CardContent>
          </Card>

          {/* Descrição dos Serviços */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <FileText className="h-6 w-6 text-primary dark:text-cyan-400" />
                Descrição dos Serviços
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A {SITE_CONFIG.fullName} oferece serviços de desenvolvimento de
                software, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Desenvolvimento de aplicações web full-stack</li>
                <li>Criação de dashboards e painéis administrativos</li>
                <li>Desenvolvimento de APIs REST</li>
                <li>Consultoria em tecnologia e arquitetura de software</li>
                <li>Manutenção e suporte técnico</li>
              </ul>
              <p>
                Reservamo-nos o direito de modificar, suspender ou descontinuar
                qualquer aspecto dos serviços a qualquer momento, com ou sem
                aviso prévio.
              </p>
            </CardContent>
          </Card>

          {/* Uso Adequado */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <CheckCircle className="h-6 w-6 text-primary dark:text-cyan-400" />
                Uso Adequado dos Serviços
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Você concorda em utilizar nossos serviços apenas para fins
                legítimos e de acordo com estes termos. Você se compromete a:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fornecer informações precisas e atualizadas</li>
                <li>
                  Manter a confidencialidade de suas credenciais de acesso
                </li>
                <li>
                  Notificar-nos imediatamente sobre qualquer uso não autorizado
                </li>
                <li>Respeitar os direitos de propriedade intelectual</li>
                <li>Cumprir todas as leis e regulamentações aplicáveis</li>
              </ul>
            </CardContent>
          </Card>

          {/* Condutas Proibidas */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Ban className="h-6 w-6 text-primary dark:text-cyan-400" />
                Condutas Proibidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>É expressamente proibido:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Utilizar os serviços para atividades ilegais ou não
                  autorizadas
                </li>
                <li>Violar direitos de propriedade intelectual de terceiros</li>
                <li>Transmitir vírus, malware ou código malicioso</li>
                <li>
                  Tentar acessar áreas restritas ou sistemas sem autorização
                </li>
                <li>Interferir ou interromper o funcionamento dos serviços</li>
                <li>
                  Realizar engenharia reversa ou descompilação do software
                </li>
                <li>
                  Utilizar robôs, scripts ou métodos automatizados para acessar
                  os serviços
                </li>
                <li>Coletar informações de outros usuários sem autorização</li>
              </ul>
            </CardContent>
          </Card>

          {/* Propriedade Intelectual */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Copyright className="h-6 w-6 text-primary dark:text-cyan-400" />
                Propriedade Intelectual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Todo o conteúdo disponível nos serviços, incluindo textos,
                gráficos, logos, ícones, imagens, áudios, downloads digitais e
                compilações de dados, é de propriedade da {SITE_CONFIG.fullName}{' '}
                ou de seus fornecedores de conteúdo e está protegido por leis de
                direitos autorais brasileiras e internacionais.
              </p>
              <p>
                O software desenvolvido pela {SITE_CONFIG.fullName} é protegido
                por leis de direitos autorais e outras leis de propriedade
                intelectual. Você não pode copiar, modificar, distribuir, vender
                ou alugar qualquer parte dos serviços ou software, nem fazer uso
                comercial dos mesmos sem autorização prévia por escrito.
              </p>
            </CardContent>
          </Card>

          {/* Limitação de Responsabilidade */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <AlertCircle className="h-6 w-6 text-primary dark:text-cyan-400" />
                Limitação de Responsabilidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Na medida máxima permitida por lei, a {SITE_CONFIG.fullName} não
                será responsável por:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Danos diretos, indiretos, incidentais ou consequenciais</li>
                <li>Perda de lucros, dados ou oportunidades de negócio</li>
                <li>Interrupção de serviços ou falhas técnicas</li>
                <li>Ações de terceiros ou conteúdo gerado por usuários</li>
                <li>Links para sites externos ou conteúdo de terceiros</li>
              </ul>
              <p>
                Nossos serviços são fornecidos &quot;como estão&quot; e
                &quot;conforme disponível&quot;, sem garantias de qualquer tipo,
                expressas ou implícitas.
              </p>
            </CardContent>
          </Card>

          {/* Indenização */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Shield className="h-6 w-6 text-primary dark:text-cyan-400" />
                Indenização
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Você concorda em indenizar e isentar a {SITE_CONFIG.fullName},
                seus diretores, funcionários e agentes de quaisquer reclamações,
                danos, obrigações, perdas, passivos, custos ou dívidas, e
                despesas (incluindo honorários advocatícios) decorrentes de:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Seu uso dos serviços</li>
                <li>Sua violação destes Termos de Uso</li>
                <li>Sua violação de quaisquer direitos de terceiros</li>
                <li>Qualquer conteúdo que você forneça através dos serviços</li>
              </ul>
            </CardContent>
          </Card>

          {/* Modificações dos Termos */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <FileText className="h-6 w-6 text-primary dark:text-cyan-400" />
                Modificações dos Termos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Reservamo-nos o direito de modificar estes Termos de Uso a
                qualquer momento. As alterações entrarão em vigor imediatamente
                após a publicação nesta página. Recomendamos que você revise
                periodicamente estes termos para se manter informado sobre
                quaisquer alterações.
              </p>
              <p>
                O uso continuado dos serviços após a publicação de alterações
                constitui sua aceitação dos termos revisados.
              </p>
            </CardContent>
          </Card>

          {/* Lei Aplicável */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <FileText className="h-6 w-6 text-primary dark:text-cyan-400" />
                Lei Aplicável e Jurisdição
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Estes Termos de Uso são regidos pelas leis da República
                Federativa do Brasil. Qualquer disputa relacionada a estes
                termos será submetida à jurisdição exclusiva dos tribunais
                competentes de {SITE_CONFIG.contact.location.city},{' '}
                {SITE_CONFIG.contact.location.country}.
              </p>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Mail className="h-6 w-6 text-primary dark:text-cyan-400" />
                Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Se você tiver dúvidas sobre estes Termos de Uso, entre em
                contato conosco:
              </p>
              <div className="space-y-2">
                <p>
                  <strong className="text-foreground">E-mail:</strong>{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email.address}`}
                    className="text-primary hover:underline dark:text-cyan-400"
                  >
                    {SITE_CONFIG.contact.email.address}
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Telefone:</strong>{' '}
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.number.replace(/\s/g, '')}`}
                    className="text-primary hover:underline dark:text-cyan-400"
                  >
                    {SITE_CONFIG.contact.phone.number}
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Localização:</strong>{' '}
                  {SITE_CONFIG.contact.location.city},{' '}
                  {SITE_CONFIG.contact.location.country}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BackToTop />
    </div>
  );
}
