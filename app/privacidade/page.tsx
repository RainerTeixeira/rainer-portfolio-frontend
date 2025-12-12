/**
 * Privacy Policy Page Component
 *
 * Página de política de privacidade completa e profissional, conforme LGPD.
 * Inclui informações sobre coleta, uso, armazenamento e proteção de dados.
 *
 * @module app/privacidade/page
 * @fileoverview Página de política de privacidade LGPD compliant
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

'use client';

import Link from 'next/link';
import { Database, Eye, FileCheck, Lock, Mail, Shield } from 'lucide-react';

import { BackToTop, PageHeader, ParticlesEffect } from '@rainersoft/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@rainersoft/ui';
import { cn } from '@rainersoft/ui';
import { POLICIES_LAST_UPDATED, SITE_CONFIG } from '../../constants';

export default function PrivacyPolicyPage() {
  return (
    <div className={cn('min-h-screen bg-background dark:bg-black')}>
      <ParticlesEffect variant="alt1" />

      <PageHeader
        title="Política de Privacidade"
        description="Transparência e compromisso com a proteção dos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)."
      >
        <div className="flex items-center justify-center gap-3 mt-4">
          <Shield className="h-8 w-8 text-primary dark:text-cyan-400" />
          <span className="text-sm text-muted-foreground">
            Última atualização:{' '}
            {new Date(POLICIES_LAST_UPDATED).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </PageHeader>

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <div className="space-y-8">
          {/* Introdução */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Lock className="h-6 w-6 text-primary dark:text-cyan-400" />
                Introdução
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A {SITE_CONFIG.fullName} está comprometida com a proteção da
                privacidade e dos dados pessoais de seus usuários. Esta Política
                de Privacidade descreve como coletamos, usamos, armazenamos e
                protegemos suas informações pessoais quando você utiliza nossos
                serviços.
              </p>
              <p>
                Ao utilizar nossos serviços, você concorda com as práticas
                descritas nesta política. Recomendamos a leitura atenta deste
                documento para entender como tratamos seus dados pessoais.
              </p>
            </CardContent>
          </Card>

          {/* Dados Coletados */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Database className="h-6 w-6 text-primary dark:text-cyan-400" />
                Dados Coletados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Coletamos os seguintes tipos de dados pessoais quando você
                  utiliza nossos serviços:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong className="text-foreground">
                      Dados de Identificação:
                    </strong>{' '}
                    Nome completo, endereço de e-mail, número de telefone
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Dados de Navegação:
                    </strong>{' '}
                    Endereço IP, tipo de navegador, páginas visitadas, tempo de
                    permanência
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Dados de Contato:
                    </strong>{' '}
                    Informações fornecidas através de formulários de contato
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Cookies e Tecnologias Similares:
                    </strong>{' '}
                    Utilizamos cookies para melhorar sua experiência (consulte
                    nossa{' '}
                    <Link
                      href="/cookies"
                      className="text-primary hover:underline dark:text-cyan-400"
                    >
                      Política de Cookies
                    </Link>
                    )
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Finalidade do Uso */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Eye className="h-6 w-6 text-primary dark:text-cyan-400" />
                Finalidade do Uso dos Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Utilizamos seus dados pessoais para as seguintes finalidades:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Prestação de serviços e atendimento ao cliente</li>
                  <li>
                    Envio de comunicações relacionadas aos nossos serviços
                  </li>
                  <li>Melhoria da experiência do usuário em nosso site</li>
                  <li>
                    Análise estatística e desenvolvimento de novos produtos e
                    serviços
                  </li>
                  <li>Cumprimento de obrigações legais e regulatórias</li>
                  <li>
                    Prevenção de fraudes e garantia da segurança dos nossos
                    serviços
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Compartilhamento de Dados */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Shield className="h-6 w-6 text-primary dark:text-cyan-400" />
                Compartilhamento de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Não vendemos, alugamos ou compartilhamos seus dados pessoais com
                terceiros, exceto nas seguintes situações:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Com seu consentimento explícito para fins específicos</li>
                <li>Para cumprir obrigações legais ou ordens judiciais</li>
                <li>
                  Com prestadores de serviços que atuam como nossos parceiros,
                  sujeitos a obrigações de confidencialidade
                </li>
                <li>
                  Em caso de fusão, aquisição ou reestruturação da empresa
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Segurança dos Dados */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Lock className="h-6 w-6 text-primary dark:text-cyan-400" />
                Segurança dos Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Implementamos medidas técnicas e organizacionais adequadas para
                proteger seus dados pessoais contra acesso não autorizado,
                alteração, divulgação ou destruição, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Criptografia de dados sensíveis</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento regular de segurança</li>
                <li>Backups regulares e sistemas de recuperação</li>
                <li>Treinamento de equipe em segurança de dados</li>
              </ul>
            </CardContent>
          </Card>

          {/* Direitos do Titular */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <FileCheck className="h-6 w-6 text-primary dark:text-cyan-400" />
                Seus Direitos (LGPD)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Conforme a Lei Geral de Proteção de Dados (LGPD), você possui os
                seguintes direitos em relação aos seus dados pessoais:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">
                    Confirmação e Acesso:
                  </strong>{' '}
                  Saber se tratamos seus dados e acessar seus dados pessoais
                </li>
                <li>
                  <strong className="text-foreground">Correção:</strong>{' '}
                  Solicitar correção de dados incompletos, inexatos ou
                  desatualizados
                </li>
                <li>
                  <strong className="text-foreground">
                    Anonimização, Bloqueio ou Eliminação:
                  </strong>{' '}
                  Solicitar a anonimização, bloqueio ou eliminação de dados
                  desnecessários ou excessivos
                </li>
                <li>
                  <strong className="text-foreground">Portabilidade:</strong>{' '}
                  Solicitar a portabilidade dos seus dados para outro fornecedor
                  de serviço
                </li>
                <li>
                  <strong className="text-foreground">Eliminação:</strong>{' '}
                  Solicitar a eliminação dos dados pessoais tratados com seu
                  consentimento
                </li>
                <li>
                  <strong className="text-foreground">
                    Revogação do Consentimento:
                  </strong>{' '}
                  Revogar seu consentimento a qualquer momento
                </li>
                <li>
                  <strong className="text-foreground">
                    Informação sobre Compartilhamento:
                  </strong>{' '}
                  Obter informações sobre entidades públicas e privadas com as
                  quais compartilhamos dados
                </li>
              </ul>
              <div className="mt-4 p-4 bg-primary/10 dark:bg-cyan-400/10 rounded-lg border border-primary/20 dark:border-cyan-400/20">
                <p className="text-sm">
                  Para exercer seus direitos, entre em contato conosco através
                  do e-mail{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email.comercial}`}
                    className="text-primary hover:underline dark:text-cyan-400 font-semibold"
                  >
                    {SITE_CONFIG.contact.email.comercial}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Retenção de Dados */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Database className="h-6 w-6 text-primary dark:text-cyan-400" />
                Retenção de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Mantemos seus dados pessoais apenas pelo tempo necessário para
                cumprir as finalidades para as quais foram coletados, ou
                conforme exigido por lei. Quando os dados não forem mais
                necessários, serão excluídos ou anonimizados de forma segura.
              </p>
            </CardContent>
          </Card>

          {/* Alterações na Política */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <FileCheck className="h-6 w-6 text-primary dark:text-cyan-400" />
                Alterações nesta Política
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente.
                Notificaremos você sobre alterações significativas publicando a
                nova política nesta página e atualizando a data de &quot;Última
                atualização&quot; no topo desta página.
              </p>
              <p>
                Recomendamos que você revise esta política periodicamente para
                se manter informado sobre como protegemos suas informações.
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
                Se você tiver dúvidas, preocupações ou solicitações relacionadas
                a esta Política de Privacidade ou ao tratamento de seus dados
                pessoais, entre em contato conosco:
              </p>
              <div className="space-y-2">
                <p>
                  <strong className="text-foreground">E-mail:</strong>{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email.comercial}`}
                    className="text-primary hover:underline dark:text-cyan-400"
                  >
                    {SITE_CONFIG.contact.email.comercial}
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Telefone:</strong>{' '}
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.comercial.replace(/\s/g, '')}`}
                    className="text-primary hover:underline dark:text-cyan-400"
                  >
                    {SITE_CONFIG.contact.phone.comercial}
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Localização:</strong>{' '}
                  {SITE_CONFIG.contact.location.headquarters.city},{' '}
                  {SITE_CONFIG.contact.location.headquarters.country}
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


